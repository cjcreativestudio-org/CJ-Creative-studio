// lib/outreach-unsubscribe.test.mts
//
// Node 24 native TS type-stripping + built-in test runner (no bundler / node_modules),
// so unaffected by the Turbopack-in-worktree limitation. Run from the repo root:
//   node --test lib/outreach-unsubscribe.test.mts
//
// FIXTURES: minted by the Python token scheme we must match byte-for-byte
// (cj-lead-scraper/engine/message/tokens.py). Reproduce from the cj-lead-scraper root:
//   OUTREACH_TOKEN_SECRET=brick5-test-secret PYTHONPATH=. python -c \
//     "from engine.message.tokens import mint_token; \
//      print(mint_token('harbot-builders','unsub')); \
//      print(mint_token('harbot-builders','demo'))"
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  verifyUnsubToken,
  createSuppressionStore,
  SUPPRESSION_KV_KEY,
} from "./outreach-unsubscribe.ts";

const SECRET = "brick5-test-secret";
// mint_token("harbot-builders","unsub") under SECRET — payload = "unsub:harbot-builders"
const UNSUB_TOKEN =
  "dW5zdWI6aGFyYm90LWJ1aWxkZXJz.XnEeulzRa_eXSMuLIMIBu4L8xUsG2n1VbXxHOoiiLFg";
// mint_token("harbot-builders","demo") under SECRET — genuine token, wrong purpose
const DEMO_TOKEN =
  "ZGVtbzpoYXJib3QtYnVpbGRlcnM.hMYUDiioFsBeuCJJ6qA-_3eko93_4ISAtmd_DH3i8pE";

// ── Token verify: the A/B pair proving the constant-time compare bites ──

test("accepts a genuine Python-minted unsub token (byte-for-byte match)", () => {
  assert.deepEqual(verifyUnsubToken(UNSUB_TOKEN, SECRET), {
    valid: true,
    subject: "harbot-builders",
  });
});

test("rejects a token with a tampered signature (compare bites)", () => {
  // Flip the FIRST signature char — a real byte change (the LAST base64url char has
  // unused low bits, so flipping it can decode to the identical sig bytes).
  const dot = UNSUB_TOKEN.indexOf(".");
  const head = UNSUB_TOKEN.slice(0, dot + 1);
  const sig = UNSUB_TOKEN.slice(dot + 1);
  const flipped = head + (sig[0] === "X" ? "Y" : "X") + sig.slice(1);
  assert.notEqual(flipped, UNSUB_TOKEN);
  assert.deepEqual(verifyUnsubToken(flipped, SECRET), { valid: false });
});

test("rejects a tampered payload (HMAC is over the payload)", () => {
  const dot = UNSUB_TOKEN.indexOf(".");
  const p = UNSUB_TOKEN.slice(0, dot);
  const sig = UNSUB_TOKEN.slice(dot + 1);
  const badP = (p[0] === "d" ? "e" : "d") + p.slice(1); // flip first payload char
  assert.deepEqual(verifyUnsubToken(`${badP}.${sig}`, SECRET), { valid: false });
});

test("rejects a genuine DEMO-purpose token (wrong purpose)", () => {
  assert.deepEqual(verifyUnsubToken(DEMO_TOKEN, SECRET), { valid: false });
});

test("fails closed on blank / whitespace / undefined secret", () => {
  assert.deepEqual(verifyUnsubToken(UNSUB_TOKEN, ""), { valid: false });
  assert.deepEqual(verifyUnsubToken(UNSUB_TOKEN, "   "), { valid: false });
  assert.deepEqual(verifyUnsubToken(UNSUB_TOKEN, undefined), { valid: false });
});

test("rejects the right token under the WRONG secret", () => {
  assert.deepEqual(verifyUnsubToken(UNSUB_TOKEN, "not-the-secret"), { valid: false });
});

test("rejects malformed tokens", () => {
  for (const bad of ["", "no-dot-here", ".", "a.", ".b", "@@@.@@@"]) {
    assert.equal(verifyUnsubToken(bad, SECRET).valid, false, `expected invalid: ${bad}`);
  }
});

// ── Suppression store seam: env-gated select + no-op fallback (network-free) ──

test("falls back to in-memory when no KV creds (durable:false, no network)", async () => {
  let fetchCalls = 0;
  const store = createSuppressionStore({
    env: {},
    fetchImpl: (async () => {
      fetchCalls++;
      throw new Error("fetch must not be called in the no-op fallback");
    }) as unknown as typeof fetch,
  });
  const res = await store.recordOptOut("harbot-builders", { token: UNSUB_TOKEN });
  assert.deepEqual(res, { durable: false, subject: "harbot-builders" });
  assert.equal(await store.isSuppressed("harbot-builders"), true);
  assert.equal(await store.isSuppressed("someone-else"), false);
  assert.equal(fetchCalls, 0, "no-op fallback must not touch the network");
});

test("selects KV when creds present and writes the exact HSET", async () => {
  const calls: { url: string; auth?: string; body: unknown[] }[] = [];
  const fakeFetch = (async (url: string, init: RequestInit) => {
    const body = JSON.parse(String(init.body)) as unknown[];
    calls.push({
      url,
      auth: (init.headers as Record<string, string>).Authorization,
      body,
    });
    const result = body[0] === "HEXISTS" ? 1 : 1;
    return { ok: true, json: async () => ({ result }) } as unknown as Response;
  }) as unknown as typeof fetch;

  const store = createSuppressionStore({
    env: {
      UPSTASH_REDIS_REST_URL: "https://example.upstash.io/",
      UPSTASH_REDIS_REST_TOKEN: "tok_123",
    },
    fetchImpl: fakeFetch,
  });

  const res = await store.recordOptOut("harbot-builders", {
    token: UNSUB_TOKEN,
    source: "web-unsubscribe",
  });
  assert.deepEqual(res, { durable: true, subject: "harbot-builders" });

  const w = calls[0];
  assert.equal(w.url, "https://example.upstash.io"); // trailing slash stripped
  assert.equal(w.auth, "Bearer tok_123");
  assert.equal(w.body[0], "HSET");
  assert.equal(w.body[1], SUPPRESSION_KV_KEY);
  assert.equal(w.body[2], "harbot-builders");
  const stored = JSON.parse(String(w.body[3]));
  assert.equal(stored.subject, "harbot-builders");
  assert.equal(stored.token, UNSUB_TOKEN);
  assert.equal(stored.source, "web-unsubscribe");
  assert.ok(stored.ts, "record carries a timestamp");

  assert.equal(await store.isSuppressed("harbot-builders"), true); // HEXISTS -> 1
});

test("KV isSuppressed maps HEXISTS 0 -> false (KV_REST_API_* creds accepted too)", async () => {
  const fakeFetch = (async () =>
    ({ ok: true, json: async () => ({ result: 0 }) }) as unknown as Response) as unknown as typeof fetch;
  const store = createSuppressionStore({
    env: { KV_REST_API_URL: "https://x.upstash.io", KV_REST_API_TOKEN: "t" },
    fetchImpl: fakeFetch,
  });
  assert.equal(await store.isSuppressed("nobody"), false);
});

test("recordOptOut is idempotent / double-click safe (memory)", async () => {
  const store = createSuppressionStore({ env: {} });
  await store.recordOptOut("harbot-builders");
  await store.recordOptOut("harbot-builders");
  assert.equal(await store.isSuppressed("harbot-builders"), true);
});
