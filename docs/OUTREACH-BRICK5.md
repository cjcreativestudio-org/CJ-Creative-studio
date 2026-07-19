# Outreach Engine — Brick 5: Public unsubscribe/opt-out surface

The customer-facing INBOUND opt-out surface: the `/unsubscribe/[token]` web page a
cold-email recipient clicks to opt out. It verifies the Brick-3 HMAC unsubscribe token,
durably records the opt-out into a free managed KV, and shows an on-brand confirmation.
Honouring opt-outs immediately is a HARD PECR / DUAA-2025 compliance guardrail.

**No live email is sent by this brick.** It is the last compliance-critical piece before
live send can ever be armed.

## 1. Overview

- Route: `app/unsubscribe/[token]/page.tsx` (server component, `dynamic = "force-dynamic"`).
- On a **valid** token → `recordOptOut(subject)` into the shared suppression store →
  renders "You've been unsubscribed."
- On an **invalid / expired / wrong-purpose / tampered** token → a neutral 200 page
  ("This link is invalid or has expired.") that **never leaks why** and still offers a
  manual opt-out path (reply / email hello@).
- Fail-closed everywhere: a blank/unset `OUTREACH_TOKEN_SECRET`, a wrong purpose, or a
  bad signature all render the neutral page. Today prod has **no** `OUTREACH_TOKEN_SECRET`
  set, so every token renders neutral — correct, because live send isn't armed yet.
- `noindex, nofollow`; **not** in `sitemap.ts`, `robots.ts`, or nav; **no**
  `Disallow: /unsubscribe/` (that advertises the path and defeats the noindex read —
  same rule as `/proposal`, `/demo`, `/leads`).

## 2. Token scheme match (byte-for-byte)

`lib/outreach-unsubscribe.ts::verifyUnsubToken` is a TS re-implementation of
`cj-lead-scraper/engine/message/tokens.py::verify_token(expected_purpose="unsub")`
(Brick 3):

- **Secret**: env `OUTREACH_TOKEN_SECRET`, `.strip()`ed; blank/unset ⇒ fail-closed.
- **Payload**: UTF-8 bytes of `"unsub:<slug>"`.
- **Signature**: `HMAC-SHA256(key = secret-utf8, msg = payload-bytes)`, raw 32-byte digest.
- **Token string**: `base64url(payload) + "." + base64url(sig)`, base64url **without** padding.
- **Verify**: split on the FIRST `.`; base64url-decode both parts; recompute HMAC over the
  DECODED payload bytes; **constant-time compare** (`crypto.timingSafeEqual`, guarded by a
  length pre-check because it throws on length mismatch); decode payload, split on the FIRST
  `:`, require purpose == `unsub`; return the slug as `subject`.

Verified by the fixture in `lib/outreach-unsubscribe.test.mts`:
secret `brick5-test-secret` →
`dW5zdWI6aGFyYm90LWJ1aWxkZXJz.XnEeulzRa_eXSMuLIMIBu4L8xUsG2n1VbXxHOoiiLFg`
decodes/verifies to subject `harbot-builders`. Tampered-sig, tampered-payload,
wrong-secret, wrong-purpose (`demo` token), blank-secret, and malformed tokens all return
`{ valid: false }`.

## 3. KV suppression namespace (the shared cross-language contract)

- **Store**: Upstash Redis (Vercel Marketplace, **free** tier) via REST — plain `fetch`,
  **no npm dependency**. Auto-selected when `UPSTASH_REDIS_REST_URL` / `_TOKEN` **or**
  `KV_REST_API_URL` / `_TOKEN` are present in env; otherwise an in-memory + `console.warn`
  no-op fallback so the page still renders honestly (`durable:false`). Mirrors
  `~/apply/lib/store-driver.ts`.
- **Key**: Redis HASH `outreach:optout` (`SUPPRESSION_KV_KEY`).
- **Field**: the lead **slug** (the token `subject`).
- **Value**: JSON `{ "subject", "token", "source", "ts" }`.
- **Write**: `HSET outreach:optout <slug> <json>` — append-only, idempotent (a double-click
  or link-scanner GET just overwrites the same field, never emails anyone in error).
- **No PII in the store**: the field is a business slug; `token` decodes only to
  `unsub:<slug>`. No email address, name, or address is written by the web route.

## 4. Worker drain contract (FOLLOW-UP — NOT built in this brick)

The Python worker (in the separate `cj-lead-scraper` repo, no git remote → manual merge)
reconciles web-recorded opt-outs into `outreach.db` so Brick 4's send-time
`scheduler.py::is_unsubscribed` re-check sees them. Suggested new step
`engine/scripts/sync_optouts.py`, run before each send:

1. Read `HGETALL outreach:optout` from the **same** Upstash instance — Python stdlib
   `urllib.request` POST, body `["HGETALL","outreach:optout"]`,
   header `Authorization: Bearer <token>`. Upstash returns a **flat**
   `[field, value, field, value, …]` array.
2. For each record, parse the JSON and call
   `engine.send.unsubscribe.record_unsubscribe(conn, record["token"])` — which
   **re-verifies** the token fail-closed with the worker's own `OUTREACH_TOKEN_SECRET`
   and writes the `unsubscribes` + suppression rows. Idempotent, so re-processing the whole
   hash every run is safe; an optional `HDEL`-after-ack is a pure optimization.

Worker env: the same `UPSTASH_REDIS_REST_*` creds + the same `OUTREACH_TOKEN_SECRET` value
that the web route / Brick 3 mint use. Because the worker re-verifies, a value that somehow
lands in the hash with a bad/foreign token is rejected fail-closed — the KV is a transport,
not a trust boundary.

## 5. Bounce / complaint capture = Ollie-gated seam (NOT built)

Inbound bounce/complaint capture needs an email-receiving webhook provider (an ESP bounce
webhook or inbound-parse endpoint) — an infra fork **not settled here**. It is **not faked**
and **not blocking**. When it exists, its handler resolves the bounced address → lead slug
and calls `recordOptOut(slug, { source: "bounce" })` into the **same** `outreach:optout`
namespace, so the worker drains bounces and opt-outs identically. See the `TODO(bounce)`
seam at the bottom of `lib/outreach-unsubscribe.ts`.

## 6. Arming checklist (what Ollie must do to honour opt-outs end-to-end)

1. Add the **free Upstash** Marketplace integration to the `cj-studio` Vercel project —
   injects `UPSTASH_REDIS_REST_URL` / `_TOKEN`; the store auto-arms, **no code change**.
2. Set `OUTREACH_TOKEN_SECRET` in Vercel **Production** to the worker's mint value. Until
   then, every token renders the neutral page (correct fail-closed state).
3. Build + schedule the worker drain step (`engine/scripts/sync_optouts.py`, §4) with the
   same Upstash creds + `OUTREACH_TOKEN_SECRET`, run before each send.
4. Later / separately: provision the inbound bounce-webhook provider (§5).
