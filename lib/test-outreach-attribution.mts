// lib/test-outreach-attribution.mts
// Pure/behavioural tests for lib/outreach-attribution.ts. Runs with Node 24's
// native TS type-stripping + built-in test runner — no bundler, no node_modules,
// no network (fetch is faked, or the in-memory path is used). Run from repo root:
//   node --test lib/test-outreach-attribution.mts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createAttributionStore,
  summariseFunnel,
  type DemoRequest,
} from "./outreach-attribution.ts";

// A deterministic, mutable clock so we can assert earliest-requestedAt precisely.
function fixedClock(startMs: number) {
  let t = startMs;
  return {
    now: () => new Date(t).toISOString(),
    set: (ms: number) => {
      t = ms;
    },
  };
}

// Memory-backed store (empty env => no KV creds). fetchImpl throws so any
// accidental network use fails the test loudly.
function memStore(clock: { now: () => string }) {
  return createAttributionStore({
    env: {},
    now: clock.now,
    fetchImpl: (() => {
      throw new Error("network must not be called on the in-memory path");
    }) as unknown as typeof fetch,
  });
}

test("recordDemoRequest is an idempotent upsert (no double-count, earliest requestedAt kept)", async () => {
  const clock = fixedClock(1_000);
  const store = memStore(clock);

  const first = await store.recordDemoRequest("harbot-builders", "Harbot Builders");
  assert.equal(first.status, "requested");
  assert.equal(first.requestedAt, new Date(1_000).toISOString());

  clock.set(9_000); // a later re-click
  await store.recordDemoRequest("harbot-builders", "Harbot Builders");

  const list = await store.listDemoRequests();
  assert.equal(list.length, 1, "same slug must not create a second record");
  assert.equal(
    list[0].requestedAt,
    new Date(1_000).toISOString(),
    "earliest requestedAt must be preserved",
  );
});

test("markDemoBooked transitions requested -> booked and stamps bookedAt", async () => {
  const clock = fixedClock(1_000);
  const store = memStore(clock);

  await store.recordDemoRequest("bristol-roof-company", "Bristol Roof Company");
  clock.set(5_000);
  const booked = await store.markDemoBooked("bristol-roof-company");

  assert.equal(booked.status, "booked");
  assert.equal(booked.bookedAt, new Date(5_000).toISOString());
  assert.equal(
    booked.requestedAt,
    new Date(1_000).toISOString(),
    "booking must not move requestedAt",
  );
});

test("recordDemoRequest never clobbers a booked status back to requested", async () => {
  const clock = fixedClock(1_000);
  const store = memStore(clock);

  await store.recordDemoRequest("spa-landscaping", "SPA Landscaping");
  await store.markDemoBooked("spa-landscaping");
  clock.set(9_999);
  await store.recordDemoRequest("spa-landscaping", "SPA Landscaping"); // stray re-click

  const list = await store.listDemoRequests();
  assert.equal(list.length, 1);
  assert.equal(list[0].status, "booked", "a booked request must stay booked");
});

test("markDemoBooked defensively creates an already-booked record when none exists", async () => {
  const clock = fixedClock(2_000);
  const store = memStore(clock);

  const booked = await store.markDemoBooked("never-requested");
  assert.equal(booked.status, "booked");
  assert.ok(booked.bookedAt, "defensive booked record must carry bookedAt");

  const list = await store.listDemoRequests();
  assert.equal(list.length, 1);
  assert.equal(list[0].slug, "never-requested");
});

test("summariseFunnel computes requested / booked / conversionPct (no NaN when empty)", () => {
  assert.deepEqual(summariseFunnel([]), {
    requested: 0,
    booked: 0,
    conversionPct: 0,
  });

  const iso = new Date(0).toISOString();
  const list: DemoRequest[] = [
    { slug: "a", businessName: "A", requestedAt: iso, source: "demo-cta", status: "requested" },
    { slug: "b", businessName: "B", requestedAt: iso, source: "demo-cta", status: "booked", bookedAt: iso },
    { slug: "c", businessName: "C", requestedAt: iso, source: "demo-cta", status: "requested" },
    { slug: "d", businessName: "D", requestedAt: iso, source: "demo-cta", status: "booked", bookedAt: iso },
  ];
  assert.deepEqual(summariseFunnel(list), {
    requested: 4,
    booked: 2,
    conversionPct: 50,
  });
});

test("KV path speaks the Upstash REST command shape and parses HGETALL flat array", async () => {
  // Simulate a Redis hash entirely in-process — proves HGET/HSET/HGETALL wiring
  // and the flat [field, value, ...] parse without any real network.
  const hash = new Map<string, string>();
  const fakeFetch = (async (url: string, init: RequestInit) => {
    assert.equal(url, "https://fake.upstash.io"); // command() posts to the (trimmed) creds URL
    const cmd = JSON.parse(init.body as string) as string[];
    const [op] = cmd;
    let result: unknown = null;
    if (op === "HSET") {
      hash.set(cmd[2], cmd[3]);
      result = 1;
    } else if (op === "HGET") {
      result = hash.has(cmd[2]) ? hash.get(cmd[2]) : null;
    } else if (op === "HGETALL") {
      const flat: string[] = [];
      for (const [k, v] of hash) flat.push(k, v);
      result = flat;
    }
    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as unknown as typeof fetch;

  const clock = fixedClock(1_000);
  const store = createAttributionStore({
    env: {
      UPSTASH_REDIS_REST_URL: "https://fake.upstash.io",
      UPSTASH_REDIS_REST_TOKEN: "tkn",
    },
    fetchImpl: fakeFetch,
    now: clock.now,
  });

  await store.recordDemoRequest("harbot-builders", "Harbot Builders");
  await store.recordDemoRequest("bristol-roof-company", "Bristol Roof Company");
  await store.markDemoBooked("harbot-builders");

  const list = await store.listDemoRequests();
  assert.equal(list.length, 2);
  assert.equal(list.find((r) => r.slug === "harbot-builders")?.status, "booked");
  assert.deepEqual(summariseFunnel(list), {
    requested: 2,
    booked: 1,
    conversionPct: 50,
  });
});
