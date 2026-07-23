// lib/outreach-attribution.ts
//
// Shared attribution store for the CJ Studio outreach engine
// (docs/OUTREACH-ENGINE-PLAN.md §6, North-star). PURE server module — no fs; no
// network except the optional Upstash REST call inside the KV store. Captures the
// north-star funnel's numerator: a lead clicking "book a call" on their
// /demo/<slug> page. A demo request is INBOUND and opt-in (a lead asking us to
// build them a demo), so there is NO PECR/consent gate here — we just record the
// minimum honestly.
//
// Storage seam mirrors lib/outreach-unsubscribe.ts exactly: a durable Upstash
// Redis REST backend (plain fetch, NO npm dep) when REST creds are present in env,
// else an in-memory Map + console.warn no-op fallback so the /leads surface still
// renders honestly while durable KV is not yet provisioned. Redis HASH namespace
// `outreach:demo_requests`, field = lead slug, value = DemoRequest JSON.
//
// This same namespace is the foundation for the deferred Brick 7 Cal.com webhook,
// which will call markDemoBooked(slug) to transition a request -> booked.
//
// Durability is armed by setting the SAME Upstash/KV REST vars the unsubscribe
// module reads — invent no new env key:
//   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN   (Upstash-native), or
//   KV_REST_API_URL        + KV_REST_API_TOKEN          (Vercel-KV compat).

export type DemoRequestStatus = "requested" | "booked";

export interface DemoRequest {
  slug: string; // lead slug (join key; matches lib/demos.ts / lib/leads.ts)
  businessName: string; // display name (from the demo record)
  requestedAt: string; // ISO 8601 — earliest observed request time
  source: string; // origin of the capture, e.g. "demo-cta"
  status: DemoRequestStatus;
  bookedAt?: string; // ISO 8601 — present once status === "booked"
}

export interface FunnelSummary {
  requested: number; // total demo requests captured (funnel top)
  booked: number; // how many reached "booked" (funnel bottom)
  conversionPct: number; // booked / requested * 100, rounded; 0 when requested === 0
}

// Redis HASH holding every demo request, enumerable via HGETALL. Keep the name
// stable — the future Brick 7 webhook writes to the SAME namespace.
export const DEMO_REQUESTS_KV_KEY = "outreach:demo_requests";

const DEFAULT_SOURCE = "demo-cta";

// ── Pure funnel math (no store — trivially unit-testable) ────────────────────
export function summariseFunnel(requests: DemoRequest[]): FunnelSummary {
  const requested = requests.length;
  const booked = requests.filter((r) => r.status === "booked").length;
  const conversionPct =
    requested === 0 ? 0 : Math.round((booked / requested) * 100);
  return { requested, booked, conversionPct };
}

// ── Store seam (mirrors lib/outreach-unsubscribe.ts) ─────────────────────────
export interface AttributionStore {
  recordDemoRequest(
    slug: string,
    businessName?: string,
    source?: string,
  ): Promise<DemoRequest>;
  markDemoBooked(slug: string, bookedAt?: string): Promise<DemoRequest>;
  listDemoRequests(): Promise<DemoRequest[]>;
}

type EnvLike = Record<string, string | undefined>;
type FetchLike = typeof fetch;
type Clock = () => string;

function kvCreds(env: EnvLike): { url: string; token: string } | null {
  const url = env.UPSTASH_REDIS_REST_URL ?? env.KV_REST_API_URL;
  const token = env.UPSTASH_REDIS_REST_TOKEN ?? env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

function safeParse(raw: string): DemoRequest | null {
  try {
    const v = JSON.parse(raw) as DemoRequest;
    return v && typeof v.slug === "string" ? v : null;
  } catch {
    return null;
  }
}

// UPSERT: preserve the EARLIEST requestedAt and never revert a booked status.
function upsertRecord(
  existing: DemoRequest | null,
  slug: string,
  businessName: string,
  source: string,
  now: string,
): DemoRequest {
  if (!existing) {
    return { slug, businessName, requestedAt: now, source, status: "requested" };
  }
  // ISO strings compare chronologically; keep the earlier of the two.
  const requestedAt =
    existing.requestedAt && existing.requestedAt < now
      ? existing.requestedAt
      : now;
  return {
    ...existing, // preserves status + bookedAt (never clobber a booking)
    businessName: existing.businessName || businessName,
    requestedAt,
  };
}

function bookRecord(
  existing: DemoRequest | null,
  slug: string,
  bookedAt: string,
): DemoRequest {
  if (!existing) {
    // Defensive: a booking with no prior request — create it already-booked.
    return {
      slug,
      businessName: slug,
      requestedAt: bookedAt,
      source: DEFAULT_SOURCE,
      status: "booked",
      bookedAt,
    };
  }
  return { ...existing, status: "booked", bookedAt };
}

function memoryStore(now: Clock): AttributionStore {
  // Per-process only (won't survive serverless cold starts) — honest degradation
  // so the /leads funnel still renders while durable KV is not yet provisioned.
  const map = new Map<string, DemoRequest>();
  let warned = false;
  const warnOnce = () => {
    if (!warned) {
      console.warn(
        "[outreach-attribution] No Upstash/KV credentials — demo requests are NOT " +
          "durably stored (in-memory fallback). Add the free Upstash integration to " +
          "make the funnel durable.",
      );
      warned = true;
    }
  };
  return {
    async recordDemoRequest(slug, businessName, source) {
      warnOnce();
      const rec = upsertRecord(
        map.get(slug) ?? null,
        slug,
        businessName || slug,
        source || DEFAULT_SOURCE,
        now(),
      );
      map.set(slug, rec);
      return rec;
    },
    async markDemoBooked(slug, bookedAt) {
      warnOnce();
      const rec = bookRecord(map.get(slug) ?? null, slug, bookedAt || now());
      map.set(slug, rec);
      return rec;
    },
    async listDemoRequests() {
      return [...map.values()];
    },
  };
}

function kvStore(
  creds: { url: string; token: string },
  fetchImpl: FetchLike,
  now: Clock,
): AttributionStore {
  async function command<T>(cmd: unknown[]): Promise<T> {
    const res = await fetchImpl(creds.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${creds.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cmd),
      cache: "no-store",
    });
    const json = (await res.json().catch(() => ({}))) as {
      result?: unknown;
      error?: string;
    };
    if (!res.ok || json.error) {
      throw new Error(`KV ${String(cmd[0])} failed: ${json.error ?? res.status}`);
    }
    return json.result as T;
  }

  async function getRecord(slug: string): Promise<DemoRequest | null> {
    const raw = await command<string | null>(["HGET", DEMO_REQUESTS_KV_KEY, slug]);
    return typeof raw === "string" ? safeParse(raw) : null;
  }

  return {
    async recordDemoRequest(slug, businessName, source) {
      const next = (existing: DemoRequest | null) =>
        upsertRecord(
          existing,
          slug,
          businessName || slug,
          source || DEFAULT_SOURCE,
          now(),
        );
      try {
        const rec = next(await getRecord(slug));
        await command(["HSET", DEMO_REQUESTS_KV_KEY, slug, JSON.stringify(rec)]);
        return rec;
      } catch (err) {
        // Never throw into the route; capture is best-effort. Degrade quietly.
        console.error("[outreach-attribution] KV recordDemoRequest failed:", err);
        return next(null);
      }
    },
    async markDemoBooked(slug, bookedAt) {
      const when = bookedAt || now();
      try {
        const rec = bookRecord(await getRecord(slug), slug, when);
        await command(["HSET", DEMO_REQUESTS_KV_KEY, slug, JSON.stringify(rec)]);
        return rec;
      } catch (err) {
        console.error("[outreach-attribution] KV markDemoBooked failed:", err);
        return bookRecord(null, slug, when);
      }
    },
    async listDemoRequests() {
      try {
        const flat =
          (await command<unknown>(["HGETALL", DEMO_REQUESTS_KV_KEY])) ?? [];
        if (!Array.isArray(flat)) return [];
        const out: DemoRequest[] = [];
        // Upstash REST returns HGETALL as a flat [field, value, field, value, ...].
        for (let i = 1; i < flat.length; i += 2) {
          const rec =
            typeof flat[i] === "string" ? safeParse(flat[i] as string) : null;
          if (rec) out.push(rec);
        }
        return out;
      } catch (err) {
        console.error("[outreach-attribution] KV listDemoRequests failed:", err);
        return [];
      }
    },
  };
}

/**
 * Select the attribution backend. Durable Upstash KV when REST creds are present
 * in env (default process.env), else an in-memory/log no-op. Inject env/fetchImpl/
 * now in tests for a network-free, env-gated, deterministic proof.
 */
export function createAttributionStore(opts?: {
  env?: EnvLike;
  fetchImpl?: FetchLike;
  now?: Clock;
}): AttributionStore {
  const env = opts?.env ?? (process.env as EnvLike);
  const now = opts?.now ?? (() => new Date().toISOString());
  const creds = kvCreds(env);
  if (!creds) return memoryStore(now);
  return kvStore(creds, opts?.fetchImpl ?? fetch, now);
}

let cached: AttributionStore | undefined;
/** Process-memoized default store (reads process.env / global fetch). Lazy — import is side-effect-free. */
export function getAttributionStore(): AttributionStore {
  if (!cached) cached = createAttributionStore();
  return cached;
}

// ── Module-level convenience over the default (process.env) store ────────────
export function recordDemoRequest(
  slug: string,
  businessName?: string,
  source?: string,
): Promise<DemoRequest> {
  return getAttributionStore().recordDemoRequest(slug, businessName, source);
}

/** Transition requested -> booked. Seam for the deferred Brick 7 Cal.com webhook. */
export function markDemoBooked(
  slug: string,
  bookedAt?: string,
): Promise<DemoRequest> {
  return getAttributionStore().markDemoBooked(slug, bookedAt);
}

export function listDemoRequests(): Promise<DemoRequest[]> {
  return getAttributionStore().listDemoRequests();
}

export async function funnelSummary(): Promise<FunnelSummary> {
  return summariseFunnel(await getAttributionStore().listDemoRequests());
}
