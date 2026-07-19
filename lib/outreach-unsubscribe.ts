// lib/outreach-unsubscribe.ts
//
// Brick 5 of the CJ Studio outreach engine (docs/OUTREACH-BRICK5.md). PURE server
// module — no fs; no network except the optional Upstash REST call inside the KV
// suppression store. Two responsibilities:
//
//   1. verifyUnsubToken() — a byte-for-byte TS re-implementation of the Python
//      unsubscribe-token *verify* in cj-lead-scraper/engine/message/tokens.py
//      (Brick 3): HMAC-SHA256 over "unsub:<slug>", base64url(payload).base64url(sig),
//      key = OUTREACH_TOKEN_SECRET (utf8, stripped). Fail-closed: blank/unset secret,
//      wrong purpose, tampered/short signature, or malformed token => { valid:false }.
//      Constant-time signature compare.
//
//   2. SuppressionStore seam — recordOptOut()/isSuppressed() over a FREE managed KV
//      (Upstash Redis REST, plain fetch, no npm dep) when the env is configured, else
//      an in-memory + console.warn no-op fallback so the page still renders honestly.
//      Append-only, idempotent (double-click safe). Mirrors ~/apply/lib/store-driver.ts.
//
// The web route only WRITES opt-outs here. The Python worker (Brick 4
// record_unsubscribe) DRAINS the same KV namespace into outreach.db — see
// docs/OUTREACH-BRICK5.md for the exact cross-language contract.

import { createHmac, timingSafeEqual } from "node:crypto";

const UNSUB_PURPOSE = "unsub";

// Redis HASH: field = subject (lead slug), value = OptOutRecord JSON. One namespace,
// enumerable by the worker via HGETALL. Keep in sync with docs/OUTREACH-BRICK5.md.
export const SUPPRESSION_KV_KEY = "outreach:optout";

export interface VerifyResult {
  valid: boolean;
  /** The lead slug encoded in a valid unsub token. Absent when valid === false. */
  subject?: string;
}

/**
 * Verify a Brick-3 one-click unsubscribe token. Returns { valid:true, subject } only
 * for a well-formed token whose HMAC matches `secret` AND whose purpose is "unsub".
 * Every failure mode returns { valid:false } (fail-closed) — never throws, never leaks
 * which check failed. Mirrors tokens.py::verify_token(expected_purpose="unsub").
 */
export function verifyUnsubToken(
  token: unknown,
  secret: string | undefined | null,
): VerifyResult {
  // Fail-closed on blank/unset secret (tokens.py _secret_bytes strips + rejects empty).
  const s = (secret ?? "").trim();
  if (!s) return { valid: false };
  if (typeof token !== "string" || token.length === 0) return { valid: false };

  // Split on the FIRST "." only (Python str.split(".", 1)); require both parts.
  const dot = token.indexOf(".");
  if (dot < 0) return { valid: false };
  const payloadB64 = token.slice(0, dot);
  const sigB64 = token.slice(dot + 1);
  if (!payloadB64 || !sigB64) return { valid: false };

  // base64url decode (Node is lenient; a mangled payload/sig simply fails the HMAC
  // compare below — forgery still requires the secret, so leniency is not a gap).
  const payload = Buffer.from(payloadB64, "base64url");
  const sig = Buffer.from(sigB64, "base64url");
  if (payload.length === 0 || sig.length === 0) return { valid: false };

  const expected = createHmac("sha256", Buffer.from(s, "utf8"))
    .update(payload)
    .digest();

  // Constant-time compare. timingSafeEqual throws on length mismatch, so guard first;
  // the expected length (32) is public, so the early return leaks nothing.
  if (sig.length !== expected.length) return { valid: false };
  if (!timingSafeEqual(sig, expected)) return { valid: false };

  // Decode "purpose:slug" (split on FIRST ":" only, matching Python).
  const text = payload.toString("utf8");
  const colon = text.indexOf(":");
  if (colon < 0) return { valid: false };
  const purpose = text.slice(0, colon);
  const subject = text.slice(colon + 1);
  if (purpose !== UNSUB_PURPOSE || subject.length === 0) return { valid: false };

  return { valid: true, subject };
}

// ─── SuppressionStore seam ──────────────────────────────────────────────────

export interface OptOutMeta {
  /** Raw unsub token — persisted so the Python worker can re-verify fail-closed. */
  token?: string;
  /** Origin of the opt-out, e.g. "web-unsubscribe" or (future) "bounce". */
  source?: string;
}

export interface OptOutResult {
  /** true => written to durable KV; false => in-memory/log fallback only. */
  durable: boolean;
  subject: string;
}

export interface SuppressionStore {
  recordOptOut(subject: string, meta?: OptOutMeta): Promise<OptOutResult>;
  isSuppressed(subject: string): Promise<boolean>;
}

type EnvLike = Record<string, string | undefined>;
type FetchLike = typeof fetch;

interface StoredOptOut {
  subject: string;
  token?: string;
  source: string;
  ts: string;
}

function kvCreds(env: EnvLike): { url: string; token: string } | null {
  // Upstash-native integration -> UPSTASH_REDIS_REST_*; Vercel-KV-compat -> KV_REST_API_*.
  const url = env.UPSTASH_REDIS_REST_URL ?? env.KV_REST_API_URL;
  const token = env.UPSTASH_REDIS_REST_TOKEN ?? env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

function memoryStore(): SuppressionStore {
  // Per-process only (won't survive serverless cold starts) — honest degradation so
  // the page still renders while durable KV is not yet provisioned.
  const seen = new Set<string>();
  let warned = false;
  const warnOnce = () => {
    if (!warned) {
      console.warn(
        "[outreach-unsubscribe] No Upstash/KV credentials — opt-outs are NOT durably " +
          "stored (in-memory fallback). Add the free Upstash integration to arm honouring.",
      );
      warned = true;
    }
  };
  return {
    async recordOptOut(subject) {
      warnOnce();
      seen.add(subject);
      console.warn(`[outreach-unsubscribe] opt-out (ephemeral) recorded for ${subject}`);
      return { durable: false, subject };
    },
    async isSuppressed(subject) {
      return seen.has(subject);
    },
  };
}

function kvStore(
  creds: { url: string; token: string },
  fetchImpl: FetchLike,
): SuppressionStore {
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

  return {
    async recordOptOut(subject, meta) {
      const record: StoredOptOut = {
        subject,
        token: meta?.token,
        source: meta?.source ?? "web-unsubscribe",
        ts: new Date().toISOString(),
      };
      try {
        // Idempotent: HSET on the same field overwrites (double-click safe).
        await command(["HSET", SUPPRESSION_KV_KEY, subject, JSON.stringify(record)]);
        return { durable: true, subject };
      } catch (err) {
        // Never throw into the page render; log loudly, degrade to non-durable.
        console.error("[outreach-unsubscribe] KV recordOptOut failed:", err);
        return { durable: false, subject };
      }
    },
    async isSuppressed(subject) {
      try {
        const r = await command<number | string>([
          "HEXISTS",
          SUPPRESSION_KV_KEY,
          subject,
        ]);
        return Number(r) === 1;
      } catch (err) {
        console.error("[outreach-unsubscribe] KV isSuppressed failed:", err);
        return false; // authoritative check is worker-side (Brick 4); safe to re-record
      }
    },
  };
}

/**
 * Select the suppression backend. Durable Upstash KV when REST creds are present in
 * env (default process.env), else an in-memory/log no-op. Inject env/fetchImpl in
 * tests for a network-free, env-gated proof.
 */
export function createSuppressionStore(opts?: {
  env?: EnvLike;
  fetchImpl?: FetchLike;
}): SuppressionStore {
  const env = opts?.env ?? (process.env as EnvLike);
  const creds = kvCreds(env);
  if (!creds) return memoryStore();
  return kvStore(creds, opts?.fetchImpl ?? fetch);
}

let cached: SuppressionStore | undefined;
/** Process-memoized default store (reads process.env / global fetch). */
export function getSuppressionStore(): SuppressionStore {
  if (!cached) cached = createSuppressionStore();
  return cached;
}

// TODO(bounce — Ollie-gated seam): inbound bounce/complaint capture needs an
// email-receiving webhook provider (ESP bounce webhook or inbound-parse) — an infra
// fork NOT settled here. When it lands, that handler resolves the bounced address to a
// lead slug and calls recordOptOut(slug, { source: "bounce" }) — the SAME namespace,
// so the worker drains bounces and opt-outs identically. Do NOT fake the provider.
