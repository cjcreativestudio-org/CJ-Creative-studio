# Autonomous UK SME Outreach Engine — Architecture & Gated-Brick Plan (goal g9)

> **For agentic workers:** This is an **architecture + decomposition** document, not a single executable plan. Do **not** build the whole engine in one task — that approach died on turn budget before. Each brick in §5 is independently mergeable and MUST get its own `superpowers:writing-plans` plan (TDD, bite-sized steps) before implementation, then be executed with `superpowers:subagent-driven-development`. Build **Brick 1 first** — it is the compliance keystone and the go/no-go for the entire cold-email path. Steps in the per-brick plans use checkbox (`- [ ]`) syntax.

**Goal:** Stand up an autonomous, PECR/UK-GDPR-compliant engine that finds UK SMEs with dated/broken sites, verifies they are lawful cold-email targets, sends a personalised intro from a dedicated warmed domain, auto-generates a tailored demo site on request, and books calls — measured by demo-requests → booked-calls per week.

**Architecture:** A **hybrid**: (a) a stateful Node **worker** built by extending the existing `cj-lead-scraper` (discover → enrich+proof → compliance-gate → personalise → send → track); (b) public + internal **surfaces** in the existing `cj-creative-studio` Next.js app (`/demo/[slug]`, unsubscribe + webhook route handlers, `/outreach` dashboard, booking); (c) a **new shared datastore** whose single most important table is the suppression list, written by both worker and app.

**Tech Stack:** Node 20+ (worker: axios, csv-parser, Playwright for screenshots, Companies House REST API), Next.js 16 App Router + Resend (existing), a hosted Postgres (Neon/Supabase via Vercel Marketplace) for shared state, Cal.com for booking, a dedicated warmed outreach domain for sending.

**Status of the premise (verified 2026-07-19):** Cold B2B email to UK **limited companies / LLPs is lawful** without prior consent under PECR, *provided* UK GDPR legitimate interest is documented and the identification + valid-opt-out rules are met. It is **not** lawful to cold-email **sole traders or ordinary partnerships** (they are "individual subscribers"). This single distinction gates the whole design. See §2 for citations.

---

## §1 — Architecture overview

### 1.1 Pipeline stages and data flow

```
                         ┌─────────────── cj-lead-scraper (extended = "the worker") ───────────────┐
 (1) DISCOVER            (2) ENRICH + PROOF        (3) COMPLIANCE GATE       (4) PERSONALISE
 Google Places  ──────►  screenshot current   ──►  Companies House match  ──► build PECR-compliant
 (existing get-          site (Playwright) +        + entity classify      +   email {subject, html,
 websites.js /           reachability +             email-quality check    +   text, headers} incl.
 email-scraper.js) →     business email +           + suppression check    →   unsubscribe + identity
 outdated-site-          reviews/town/sector    →   ⇒ decision record          + demo CTA token
 emails-clean.csv                                   (eligible | rejected |
                                                     manual-review)
                                                          │ eligible + human-approved
                                                          ▼
 (5) SEND  ──────────►  (6) TRACK  ──────────►  ┌──────── shared DB (NEW) ────────┐
 warmed domain,         deliveries, opens,      │ leads, classifications, proofs, │
 throttled, Resend      clicks, bounces,        │ messages, SUPPRESSIONS,         │
 (or cold platform)     complaints              │ demo_requests, bookings, events │
                                                └─────────────┬───────────────────┘
                                                              │ read/write
     ┌──────────── cj-creative-studio (Next.js app = "the surfaces") ────────────┐
     │  /api/outreach/unsubscribe (one-click, RFC 8058)   ← honours opt-outs      │
     │  /api/outreach/webhooks/resend (bounce/complaint)  → writes SUPPRESSIONS   │
     │  (7) DEMO-ON-REQUEST:  /demo/[slug]  (CTA click → demo_request → tailored  │
     │       demo site, cloned from /proposal/[slug])                            │
     │  (8) BOOKING: Cal.com embed/redirect + /api/outreach/webhooks/cal          │
     │  (9) NORTH-STAR: /outreach internal dashboard (noindex)                    │
     └───────────────────────────────────────────────────────────────────────────┘
```

Data flowing between stages is a single growing **lead record** keyed by a stable `slug` (same convention as `lib/leads.ts`). Each stage appends a typed sub-record (classification, proof, message, send-event) rather than mutating in place, so every decision is auditable — this audit trail is a compliance requirement, not a nicety (§2.6).

### 1.2 Where state lives

The live marketing site is **statically architected on purpose** (data in TS modules — `lib/leads.ts`, `lib/proposals.ts`, `lib/outreach.ts` — hand-edited by Ollie, deployed via push-to-`main`). That is correct for the *marketing* site and must not change. The **engine is stateful** (suppression list, idempotent send log, consent/LIA evidence, demo requests, bookings) and cannot live in TS modules. It needs a real datastore:

- **Bricks 1–4 (worker-only, local):** start with **SQLite** in `cj-lead-scraper` — zero infra, fast to prove the gate.
- **From Brick 5 onward:** the **app** must read/write the *same* suppression + demo/booking tables (the unsubscribe route and the send worker share one authoritative suppression list). At that point migrate to a **hosted Postgres** (Neon or Supabase via the Vercel Marketplace — note Vercel Postgres/KV are retired; use the Marketplace). This DB choice is an **Ollie fork** (§7).

### 1.3 What we reuse vs what is genuinely new

| Concern | Reuse (already exists) | New |
|---|---|---|
| Discovery | `cj-lead-scraper/get-websites.js` (Google Places, budget-capped, 28 cities × 9 categories) and `email-scraper.js` (outdated-site audit + email harvest → `outdated-site-emails-clean.csv`) | — |
| Outdated-site signals | `email-scraper.js::auditOutdatedWebsite` (viewport, HTTPS, legacy jQuery, table layout, copyright year) — feeds personalisation | — |
| Email validation | `clean-leads.js::isValidEmail` (regex + placeholder-domain filter) | Upgrade: role-vs-named + freemail classification (§2.3), optional MX/SMTP check |
| Lead pipeline model | `lib/leads.ts` types + helpers + `/leads` dashboard pattern | Engine `leads` table (DB), not the static seed |
| Proposal/demo surface | `app/proposal/[slug]/page.tsx` + `lib/proposals.ts` (Next 16 async params, `dynamicParams=false`, `notFound`, `robots:{index:false}`, absent from sitemap) — the **exact template** for `/demo/[slug]` | `/demo/[slug]` route + demo data model |
| Email send | `app/actions/send-enquiry.ts` (Resend, `escapeHtml`, graceful no-key guard) — the send pattern | Cold send on a **separate warmed domain**, throttle, warm-up, one-click unsubscribe headers |
| Cold-email copy/tone | `lib/outreach.ts` drafts (business/town/outdated-signal personalisation, `/proposal` link, plain-text) | Templated, token-driven, compliant-footer version |
| Offer landing | `/sprint` speed-build page + `/services` | Demo CTA + booking wiring |
| Screenshot / proof | — nothing exists | Playwright headless capture + blob storage |
| Entity classification | — nothing exists | Companies House API client + name/postcode matcher (**the keystone**) |
| Suppression / consent / send log | — nothing exists | Shared DB tables + audit records |
| Booking | — nothing exists (`/sprint` CTA points to `/contact`) | Cal.com integration + webhook |

**Explicit correction to the brief:** the brief says "reuse the existing site-build / replicator machinery." There is **no** website-generator/replicator in the CJ repos — the "replicator" found under `~/.jarvis` is the unrelated agent-harness. The real reusable asset is the **data-driven `[slug]` page pattern** (`/proposal`, `/work`): a "demo site" is best implemented as another data-driven route (`/demo/[slug]`) seeded from the enriched lead, **not** as a separately-deployed Vercel project per lead. This is dramatically cheaper and reuses three proven patterns (t103/t106/t109).

### 1.4 Scope boundary (honest)

The engine's **cold-email path targets only** the "dated/outdated site **with** a discoverable corporate business email" segment (`outdated-site-emails-clean.csv`). The scraper's other segment — **no-website, phone-only** businesses (`hot-leads.csv`, produced by `index.js`) — has **no email** and skews sole-trader; it is **out of scope for cold email** and should be routed to a manual call list (that is what `/leads` already does with `status:"new"` + "Cold call"). Do not attempt to cold-email phone-only leads.

---

## §2 — The compliance spine (make-or-break; cited)

Everything here gates the design. The posture is **default-deny**: a lead may enter the send path only if it is *positively* proven to be a lawful target; anything ambiguous goes to a human-review queue, never to auto-send. This posture is deliberately conservative because the **DUAA 2025 raised PECR fines from £500,000 to UK-GDPR levels — £17.5m or 4% of global turnover** — with the relevant provisions **in force from 5 February 2026** ([Mayer Brown](https://www.mayerbrown.com/en/insights/publications/2025/06/the-data-use-and-access-act-pecr-reform-rules-relating-to-electronic-marketing-and-cookies-in-the-uk); [Clifford Chance](https://www.cliffordchance.com/insights/resources/blogs/talking-tech/en/articles/2026/02/key-aspects-of-the-data--use-and-access--act-take-effect.html)).

### 2.1 The legal basis for each send (two layers that BOTH must be satisfied)

Cold marketing email in the UK is governed by **two** regimes at once: **PECR** (may you send an unsolicited marketing email at all?) and **UK GDPR** (may you process the recipient's personal data to do so?).

**Layer 1 — PECR reg 22 (the send itself).** PECR reg 22(2): *"a person shall neither transmit, nor instigate the transmission of, unsolicited communications for the purposes of direct marketing by means of electronic mail unless the recipient … has previously notified the sender that he consents"* — **but this prohibition applies only to "individual subscribers."** The ICO confirms you may send B2B marketing email to a **corporate subscriber (a body with separate legal personality) without consent** ([ICO, Business-to-business marketing](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/); [legislation.gov.uk PECR reg 22](https://www.legislation.gov.uk/uksi/2003/2426/regulation/22)). The DUAA 2025 **left this B2B position unchanged** — the government considered extending PECR consent to B2B and **declined** ([Mayer Brown](https://www.mayerbrown.com/en/insights/publications/2025/06/the-data-use-and-access-act-pecr-reform-rules-relating-to-electronic-marketing-and-cookies-in-the-uk)).

- **Corporate subscribers (cold-eligible under PECR):** limited companies (`ltd`), PLCs (`plc`), LLPs (`llp`), and other incorporated bodies with separate legal personality.
- **Individual subscribers (NOT cold-eligible without consent):** **sole traders and ordinary (non-LLP) partnerships** are treated as individual subscribers, so consent (or the soft opt-in) is required ([ICO](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/); [DPN, UK email marketing rules](https://dpnetwork.org.uk/email-marketing-rules/)).

**The soft opt-in does NOT rescue cold prospecting.** PECR reg 22(3) requires the contact details to have been *"obtained … in the course of the sale or negotiations for the sale of a product or service to that recipient,"* limited to *"similar products and services,"* with an opt-out offered at collection ([legislation.gov.uk PECR reg 22](https://www.legislation.gov.uk/uksi/2003/2426/regulation/22)). We have **no prior sale/negotiation** with a scraped lead, so **soft opt-in is unavailable** — our lawfulness rests entirely on the corporate-subscriber exemption + UK GDPR legitimate interest ([DPN](https://dpnetwork.org.uk/email-marketing-rules/)).

**Layer 2 — UK GDPR (processing the contact's personal data).** A business email — especially a named one (`john.smith@company.co.uk`) — is still **personal data**, so we need an Art. 6 lawful basis even when PECR permits the send. We rely on **legitimate interests (Art. 6(1)(f))** and must document a **Legitimate Interests Assessment (LIA)** — the three-part purpose / necessity / balancing test — and honour the **right to object** ([ICO, When can we rely on legitimate interests?](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/legitimate-interests/when-can-we-rely-on-legitimate-interests/)). The LIA is not legally mandatory but without it the legitimate-interests defence collapses under ICO scrutiny; **treat it as mandatory**. We must also provide privacy information (a link to the CJ Studio privacy notice, extended to cover outreach processing).

**Design consequence:** the engine's default is to send to **generic/role mailboxes at verified corporate bodies** (`info@`, `enquiries@`, `sales@`) — lower personal-data exposure and clearly the corporate subscriber — and to **exclude named-individual mailboxes and all freemail** (see §2.3).

### 2.2 The entity-type gate — how we reliably classify limited company vs sole trader

The **Companies House Public Data API** is the authoritative source. Sole traders and ordinary partnerships are **registered with HMRC, not Companies House**, so they simply **do not appear** in the API — absence is itself a strong (though not conclusive) "individual subscriber" signal ([Companies House developer docs](https://developer.company-information.service.gov.uk/); [Companies House API overview](https://developer.company-information.service.gov.uk/overview)).

**Classification algorithm (Brick 1):**
1. **Search** `GET /search/companies?q=<normalised business name>` (HTTP Basic auth, API key as username). Normalise the Google-Places name first (strip suffixes like "Ltd - Building Contractors", punctuation, casing) — the scraped name (e.g. `"Harbot Builders Ltd - Building Contractors"`) rarely equals the registered name (`"HARBOT BUILDERS LTD"`).
2. **Fetch** `GET /company/{company_number}` for top candidates. Read `type`, `company_status`, `company_name`, `registered_office_address`, `sic_codes` ([Companies House companyProfile spec](https://developer-specs.company-information.service.gov.uk/companies-house-public-data-api/resources/companyprofile?v=latest)).
3. **Score** each candidate: normalised-name similarity **+ postcode/town match** against `registered_office_address` (the scraped CSV has City; Google Places had the address). Require a confidence threshold.
4. **Admit to the cold path only if ALL hold:** `type ∈ {ltd, plc, llp, private-limited-guarant-nsc, …corporate types with separate legal personality}` **AND** `company_status == "active"` **AND** confidence ≥ threshold.
5. **Everything else → `manual-review`** (never auto-send): no confident match; `type` is a partnership form (`limited-partnership`, `scottish-partnership` — ambiguous separate-legal-personality, treat as individual/manual); dissolved/liquidation; multiple plausible matches.

> **Compliance subtlety to bake in:** "found in Companies House" ≠ "corporate subscriber." Map `company_type` → `subscriber_class` explicitly and conservatively; when in doubt, classify as individual/manual. The classifier's output is a **stored, timestamped decision record** (candidate list, chosen number, scores, `type`, `status`, verdict) — this is the audit evidence for §2.6.

### 2.3 Email-quality gate (a second, independent guard)

Independent of Companies House, evaluate the harvested email:
- **Freemail domains** (`gmail.com`, `hotmail.co.uk`, `outlook.com`, `yahoo.*`, `icloud.com`, `btinternet.com`, …) → **exclude** (cannot tie to a corporate body via domain; strong sole-trader signal). The real `top-leads.csv` contains exactly these red flags — `amacproperty95@gmail.com`, `dmroofing@hotmail.co.uk`, `dmgs@hotmail.co.uk` — all must be excluded from cold email.
- **Role mailboxes** (`info@`, `enquiries@`, `sales@`, `hello@`, `mail@`, `admin@`, `office@`) at a corporate domain → **preferred** (lowest personal-data exposure).
- **Named-individual mailboxes** (`firstname.lastname@`, `firstname@`) → **downgrade to manual-review** (likely an individual subscriber even at a company; higher GDPR sensitivity).
- Keep `clean-leads.js` rejections (image extensions, placeholder domains, malformed).

A lead enters the cold path only if it **passes the entity gate (§2.2) AND the email gate (§2.3) AND is not suppressed (§2.4)**.

### 2.4 Suppression / opt-out handling (must be immediate and authoritative)

- A single **authoritative `suppressions` table** in the shared DB (email + normalised domain + reason + timestamp + source). It is checked **twice**: at gate time and again **immediately before each send** (a lead can opt out between batches).
- Populated by: one-click unsubscribe (§2.5, Brick 5), hard bounces, spam complaints (Resend/webhook, Brick 5), and manual additions.
- **Honour opt-outs immediately** — the ICO's cardinal PECR expectation. Suppression is by both exact address **and** domain (an opt-out from `info@acme.co.uk` should suppress the whole `acme.co.uk` to be safe).
- Suppression is **permanent and global** across all campaigns.

### 2.5 Identification + unsubscribe baked into EVERY email (PECR reg 23)

PECR reg 23 forbids sending marketing email **(a)** *"where the identity of the person on whose behalf the communication has been sent has been disguised or concealed,"* or **(b)** *"where a valid address to which the recipient … may send a request that such communications cease has not been provided."* These apply to **corporate and individual subscribers alike** ([legislation.gov.uk PECR reg 23](https://www.legislation.gov.uk/uksi/2003/2426/regulation/23); [ICO](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/)).

Every assembled message (Brick 3) MUST therefore carry, as **enforced, fail-closed invariants** (a compliance linter rejects any message missing them):
1. **Clear sender identity** — "CJ Studio" + the trading/legal entity name.
2. **A valid physical postal address** for CJ Studio (reg 23 "valid address" + deliverability best practice). *(Ollie fork — §7: home address, registered office, or virtual office/PO box.)*
3. **A working opt-out**: a one-click unsubscribe **link** (tokenised, → `/api/outreach/unsubscribe`) **and** the `List-Unsubscribe` + `List-Unsubscribe-Post` headers (RFC 8058, §3.5).
4. **Genuine, non-deceptive From/subject** — real domain, no disguised sender, no misleading subject.
5. A link to CJ Studio's **privacy notice** (UK GDPR transparency).

### 2.6 Auditability

Because lawfulness rests on legitimate interest + the corporate-subscriber classification, we must be able to **prove** for any address sent: the entity decision record (§2.2), the email-quality verdict (§2.3), the suppression check result, the rendered message (with unsubscribe + identity), the send timestamp, and the LIA version in force. All are rows in the shared DB. No send occurs without a complete decision record.

---

## §3 — Deliverability (so we don't get blacklisted on day one)

### 3.1 Dedicated, isolated sending identity

- **Buy a separate outreach domain** (e.g. `trycjstudio.com` / `cjstudio-hello.com`). **Never** send cold outreach from `cjcreativestudio.com` (protects the primary domain's transactional/contact-form reputation) and **never** from a client's domain. *(Ollie fork — §7.)*
- Send from a **subdomain** of the outreach domain (e.g. `hello@go.trycjstudio.com` or `outreach.<domain>`) so any reputation damage is quarantined from the outreach root too.
- Set up a real inbox on the domain that a human monitors (replies + manual opt-outs land somewhere).

### 3.2 Authentication (SPF, DKIM, DMARC) — table stakes

Google & Yahoo's **Feb 2024 bulk-sender rules** require: SPF **and** DKIM, a published **DMARC** record (at minimum `p=none`, aligned), From-domain alignment, one-click unsubscribe, and a **spam-complaint rate kept below 0.3%** (target < 0.1%) ([Resend, Gmail/Yahoo 2024 requirements](https://resend.com/blog/gmail-and-yahoo-bulk-sending-requirements-for-2024); [Yahoo Sender Hub](https://senders.yahooinc.com/best-practices/)). Even though we deliberately send **well under** the 5,000/day "bulk" threshold, **implement all of it from day one** — it is now the floor for landing in the inbox at all.
- **SPF**: publish for the sending subdomain (Resend/provider include).
- **DKIM**: enable provider DKIM signing on the subdomain.
- **DMARC**: start `p=none` with a `rua` aggregate-report address; tighten to `quarantine` once aligned and clean.

### 3.3 Warm-up (the long pole — start immediately, in parallel)

A brand-new domain has no reputation; blasting cold volume gets it blacklisted. Warm-up takes **~3–6 weeks**, so **Brick 0 (§5) starts on day one in parallel with code**:
- Weeks 1–2: a handful of sends/day to engaged/known addresses (Ollie, Josh, friendly contacts) that get opened/replied.
- Ramp gradually (e.g. ~+50%/week) only while complaint/bounce rates stay clean.
- Consider a managed warm-up service or a cold-email platform that automates it (Ollie fork — §7).

### 3.4 Throttling & volume

- Hard **daily send cap** (start ~10–20/day, ramp with reputation), randomised inter-send delays, send in UK business hours.
- The worker enforces the cap centrally; the send brick refuses to exceed it.
- Small volume is also a **compliance** asset (human-reviewable, low complaint surface).

### 3.5 One-click unsubscribe (RFC 8058)

Every send includes `List-Unsubscribe: <https://…/api/outreach/unsubscribe?t=TOKEN>, <mailto:unsub@outreach-domain?subject=unsubscribe>` and `List-Unsubscribe-Post: List-Unsubscribe=One-Click`. The HTTPS endpoint (Brick 5) accepts an unauthenticated `POST` and suppresses immediately, returning 200 ([RFC 8058](https://www.rfc-editor.org/rfc/rfc8058); [Resend 2024 requirements](https://resend.com/blog/gmail-and-yahoo-bulk-sending-requirements-for-2024)).

### 3.6 Bounce & complaint handling

- Consume the provider's **bounce** and **complaint** webhooks (Resend supports these) → write to `suppressions` immediately (Brick 5).
- Auto-pause the whole campaign if bounce rate > ~3–5% or complaint rate approaches 0.3% in a window — a circuit breaker protecting the domain.

---

## §4 — The demo-on-request loop

**Insight (see §1.3):** a "tailored demo site" is a **data-driven route on the existing app**, not a per-lead deployment. Reuse the `/proposal/[slug]` machinery almost verbatim.

1. **CTA in the email** → tokenised link `https://www.cjcreativestudio.com/demo/<slug>?t=<token>` (token ties click → lead, and is single-purpose/opaque).
2. **`/demo/[slug]` route** (Brick 6), cloned from `app/proposal/[slug]/page.tsx`: Next 16 **async `params`** (`await params`), `dynamicParams` handling, `notFound()` for unknown slugs, **`robots:{index:false,follow:false}`**, and **absent from `sitemap.ts`/`robots.ts`/nav** (same unlisted pattern as `/proposal` and `/leads` — do **not** add `Disallow:/demo/`, which would advertise the path and block the noindex read).
3. **Tailored content** is generated from the enriched lead record: business name, town, sector, the **specific outdated signal** (`Outdated Flags`), the **screenshot** of their current site (Brick 2) shown as "before," Google rating/reviews, and CJ Studio's speed-build offer — rendered with the existing editorial component library (`MaskReveal`, `CaseStudyReveal`, browser-chrome frames from `home-work`). Demo data lives as a typed record (mirroring `lib/proposals.ts`) hydrated from the DB, **not** hand-authored per lead.
4. **On click**, record a `demo_requests` row (lead, timestamp, campaign) — this is the **numerator's trigger** for the North-star (§6).
5. **Route to a booked call**: a prominent "Book your free 20-min call" CTA → **Cal.com** (embed or redirect). *(Cal.com vs Calendly is an Ollie fork — §7.)* Cal.com's **booking webhook** → `/api/outreach/webhooks/cal` (Brick 7) writes a `bookings` row linked to the `demo_request`, completing demo→call attribution.

**Generation cost control:** demos can be **pre-generated at enrichment time** (data + screenshot already captured) and simply **unlocked/served on click** — so a click is instant and no live generation is needed. Only the screenshot (Brick 2) is heavy, and it is already captured upstream.

---

## §5 — Gated brick decomposition

Ordered, small, independently-mergeable. **Brick 1 is the keystone / go-no-go.** **Brick 0 runs in parallel from day one** (calendar-bound, not code-bound). Each brick gets its own `writing-plans` plan before coding. "Tests" below are `node:test`/`tsx`-run `test-*.mts` scripts (matching repo convention); the executor writes the failing test first (TDD).

Dependency DAG: `0 ∥ 1` → `2` → `3` → `4` → `5` → `6` → `7` → `8` (2 may run parallel to 1; 5 depends on 1+4; 6 depends on 3; 8 depends on 4–7).

---

### Brick 0 — Outreach domain + authentication + warm-up kickoff  *(ops, parallel, mostly non-code)*
- **Scope:** Buy the outreach domain/subdomain; configure SPF, DKIM, DMARC (`p=none` + `rua`); create the monitored inbox; **begin the warm-up schedule** (§3.3).
- **Files:** none in-repo (DNS/provider config); record settings in `docs/OUTREACH-ENGINE-OPS.md`.
- **Key tests / checks:** [mail-tester.com] or MXToolbox shows SPF/DKIM/DMARC pass; a manual test send from the subdomain to a Gmail + Yahoo + Outlook address lands in **inbox**.
- **Acceptance gate:** Auth passes on all three; warm-up day-1 sends delivered and opened; domain not yet used for any cold send.
- **Depends on:** Ollie forks (domain purchase, provider choice — §7). **Start immediately** — warm-up is the multi-week long pole.

### Brick 1 — Compliance gate + suppression store  *(KEYSTONE — go/no-go)*
- **Scope:** Pure, side-effect-free decision function `evaluateLeadForCold(lead) → { verdict: "eligible"|"rejected"|"manual-review", reason, evidence }`, composed of: (a) Companies House client + name/postcode matcher + `type→subscriber_class` map (§2.2); (b) email-quality classifier (§2.3); (c) suppression check (§2.4). Writes a **decision record** to the store. **No email is sent by this brick.**
- **Files (in `cj-lead-scraper`, new `engine/` dir):**
  - `engine/compliance/normalise-name.mjs` — strip suffixes/punct/casing.
  - `engine/compliance/companies-house.mjs` — `searchCompanies(q)`, `getCompany(number)` (HTTP Basic auth, key from `.env`).
  - `engine/compliance/classify-entity.mjs` — match + score + `subscriber_class` verdict.
  - `engine/compliance/email-quality.mjs` — freemail/role/named classifier.
  - `engine/compliance/suppression.mjs` — `isSuppressed(email)`, `suppress(email, reason, source)` over SQLite.
  - `engine/compliance/evaluate-lead.mjs` — composes the gate; writes decision record.
  - `engine/db/schema.sql` + `engine/db/index.mjs` — SQLite: `leads`, `entity_classifications`, `suppressions`, `events`.
  - Tests: `engine/compliance/test-normalise-name.mts`, `test-classify-entity.mts`, `test-email-quality.mts`, `test-evaluate-lead.mts` (+ one live Companies House smoke test, network-gated).
- **Key tests:** freemail (`dmroofing@hotmail.co.uk`) → rejected; `ltd`+active+role-email+confident-match → eligible; no CH match → manual-review; suppressed address → rejected regardless; partnership `type` → manual-review; every path writes a decision record.
- **Acceptance gate:** Run against the **real `outdated-site-emails-clean.csv` / `top-leads.csv`**: the function admits **only** confident limited-company/LLP + corporate-role-email + non-suppressed leads, routes everything else to manual-review/rejected, and produces a complete audit record for every lead. **Nothing downstream may send unless a lead is `eligible` here.**
- **Depends on:** Companies House API key (Ollie fork — free, needs registration).

### Brick 2 — Proof capture (screenshot + reachability)
- **Scope:** For each lead, capture a screenshot of the current site (Playwright headless) + HTTP reachability/status; for "no site," record evidence-of-absence. Store image (local blob dir now; Vercel Blob/S3 later) + a `proofs` record.
- **Files:** `engine/proof/capture.mjs`, `engine/proof/store.mjs`, `engine/db/schema.sql` (+`proofs`), tests `engine/proof/test-capture.mts`.
- **Key tests:** reachable URL → non-empty PNG + recorded dimensions + 200; unreachable/cert-fail → `absent|broken` evidence; result persisted to `proofs`.
- **Acceptance gate:** Every enriched lead has either a stored screenshot asset **or** a recorded absence evidence, linked by slug.
- **Depends on:** — (may run parallel to Brick 1). Adds Playwright to `cj-lead-scraper`.

### Brick 3 — Personalisation + compliant email assembly *(no send)*
- **Scope:** `assembleEmail(lead, decision, proof) → { subject, html, text, headers }` — personalised opener (business, town, specific `Outdated Flags`), link to `/sprint`, tokenised demo CTA (`/demo/<slug>?t=…`), and the **mandatory compliant footer** (§2.5: identity + postal address + one-click unsubscribe link + privacy link). Plus a **compliance linter** `assertCompliant(message)` that **fails closed**. Stores a `messages` row (status `queued`). **Still no send.**
- **Files:** `engine/message/templates.mjs`, `engine/message/assemble.mjs`, `engine/message/compliance-linter.mjs`, `engine/message/tokens.mjs` (opaque token mint/verify), tests `engine/message/test-assemble.mts`, `test-compliance-linter.mts`, `test-tokens.mjs`.
- **Key tests:** every assembled message contains the unsubscribe URL, postal address, identifiable sender, privacy link, and `List-Unsubscribe`/`List-Unsubscribe-Post` headers; linter **rejects** a message missing any; token round-trips lead↔slug; `escapeHtml` applied to all lead-derived fields (reuse the `send-enquiry.ts` pattern).
- **Acceptance gate:** 100% of assembled messages pass the linter; a message missing any reg-23 element cannot be produced.
- **Depends on:** Brick 1 (needs `decision` + slug).

### Brick 4 — Send + throttle + pre-send re-check *(tiny live volume)*
- **Scope:** `sendQueued({ maxPerDay })` — sends `queued` messages via the warmed domain (Resend on the outreach domain, or chosen platform), **re-running the gate + suppression check immediately before each send**, enforcing the daily cap and jittered delays. Records `sent`/`delivered` events. Dry-run mode. Human-approval flag required to leave dry-run.
- **Files:** `engine/send/resend-client.mjs` (separate domain/key), `engine/send/throttle.mjs`, `engine/send/send-queued.mjs`, tests `engine/send/test-throttle.mts`, `test-send-guards.mts` (mocked transport).
- **Key tests:** refuses to send if lead not `eligible` or is suppressed at send time; throttle caps N/day; dry-run sends nothing; each real send writes an event.
- **Acceptance gate:** A real approved send to Ollie's/Josh's seed addresses lands in **inbox** (not spam), one-click unsubscribe visible and working; suppression honoured; cap respected.
- **Depends on:** Bricks 0, 1, 3.

### Brick 5 — Inbound compliance: unsubscribe + bounce/complaint webhooks
- **Scope:** Public route handlers in **`cj-creative-studio`**: `app/api/outreach/unsubscribe/route.ts` (RFC 8058 one-click `POST`, also `GET` confirmation page) and `app/api/outreach/webhooks/resend/route.ts` (bounce/complaint) — both write to the **shared** `suppressions` table. **This is where SQLite → hosted Postgres migration happens** (worker + app now share state).
- **Files:** `app/api/outreach/unsubscribe/route.ts`, `app/api/outreach/webhooks/resend/route.ts`, `lib/outreach-db.ts` (shared DB client, server-only), `engine/db` repointed to the same Postgres; tests `app/api/outreach/**/test-*.mts` (or route-handler unit tests).
- **Key tests:** one-click `POST` with valid token → 200 + row in `suppressions`; bounce/complaint webhook → suppression; a suppressed address is skipped by Brick 4 on the next cycle; invalid/expired token handled.
- **Acceptance gate:** A real unsubscribe click, a hard bounce, and a spam complaint each land in `suppressions` within one processing cycle and permanently stop further sends — verified end-to-end.
- **Depends on:** Bricks 1 (suppression model) + 4; DB choice (Ollie fork — §7).

### Brick 6 — Demo-on-request generator (`/demo/[slug]`)
- **Scope:** Public data-driven demo route cloned from `/proposal/[slug]` (async params, `notFound`, `robots:{index:false}`, not in sitemap/robots/nav). Hydrates from the enriched lead + screenshot + reviews. Click records a `demo_requests` row.
- **Files:** `app/demo/[slug]/page.tsx`, `lib/demos.ts` (typed demo record + DB hydration), reuse `components/mask-reveal.tsx`/`case-study-reveal.tsx`; tests `lib/test-demos.mts`.
- **Key tests:** known slug renders business-specific content + "before" screenshot; unknown slug → `notFound`; `robots` noindex present; visiting records exactly one `demo_requests` row per token.
- **Acceptance gate:** Clicking a real email CTA shows a personalised demo for that business and logs the request; page is noindex and unlisted.
- **Depends on:** Brick 3 (CTA token), Brick 2 (screenshot).

### Brick 7 — Booking loop (Cal.com)
- **Scope:** Booking CTA on `/demo/[slug]` → Cal.com; `app/api/outreach/webhooks/cal/route.ts` marks the `demo_request` booked + writes a `bookings` row.
- **Files:** `app/api/outreach/webhooks/cal/route.ts`, booking CTA in `app/demo/[slug]/page.tsx`, `lib/outreach-db.ts` (+`bookings`); tests `app/api/outreach/webhooks/cal/test-cal-webhook.mts`.
- **Key tests:** booking webhook links to the correct `demo_request`; duplicate/late webhooks idempotent; dashboard count increments.
- **Acceptance gate:** A real test booking flows demo → booked-call record with correct attribution.
- **Depends on:** Brick 6; Cal.com choice (Ollie fork — §7).

### Brick 8 — North-star dashboard (`/outreach`)
- **Scope:** Internal noindex dashboard (reuse the `/leads` server-component pattern) surfacing the weekly funnel and the North-star conversion (§6).
- **Files:** `app/outreach/page.tsx`, `lib/outreach-metrics.ts` (pure weekly-aggregation helpers), tests `lib/test-outreach-metrics.mts`.
- **Key tests:** pure helpers compute weekly `eligible/sent/delivered/demo_requests/bookings` + `demo→call %` from fixture rows; page renders bands; `robots:{index:false}`; absent from sitemap/nav.
- **Acceptance gate:** Dashboard shows the true **demo-requests → booked-calls per week** number and the funnel above it.
- **Depends on:** data from Bricks 4–7.

---

## §6 — North-star instrumentation

**Metric:** `demo-requests → booked-calls per week` (numerator trigger = `demo_requests` row on CTA click, Brick 6; denominator/target = `bookings` row on Cal.com webhook, Brick 7).

**Where it's measured:** every stage writes typed **events** to the shared DB, so the funnel is reconstructable without extra tracking: `eligible` (Brick 1) → `sent`/`delivered` (Brick 4) → `demo_request` (Brick 6) → `booking` (Brick 7). Opens/clicks are optional (provider-dependent, and open-tracking pixels have privacy trade-offs — prefer click-through/demo-request as the honest engagement signal).

**Surface — `/outreach` dashboard card (Brick 8):** an internal, noindex page in the `/leads` house style (Archivo Black headings, JetBrains Mono labels, status bands), showing for the **current week** (and a small trailing sparkline):
- **This week:** eligible · sent · delivered · **demo requests** · **booked calls**.
- **Headline stat:** demo-requests → booked-calls conversion %, plus booked-calls/week as the hero number.
- **Health row:** bounce rate, complaint rate, suppression count, daily-cap utilisation (deliverability guardrails from §3 surfaced so a problem is visible before the domain burns).
- Reuses the `pipelineSummary`-style pure helpers (`lib/outreach-metrics.ts`) so the page stays declarative and testable.

---

## §7 — Open forks for Ollie (raise as questions; do NOT block the plan)

1. **Outreach domain** — which domain/subdomain to buy for cold sending (must not be `cjcreativestudio.com` or any client domain). *Needed before Brick 0/4.*
2. **CJ Studio physical postal address** — reg 23 requires a valid address in every email; home address vs registered office vs virtual-office/PO box. *Needed before Brick 3.*
3. **Email infrastructure & budget** — Resend on the warmed domain (build our own throttle/warm-up) **vs** a purpose-built cold-email platform (Instantly/Smartlead: inbox rotation + automated warm-up). Monthly budget. *Affects Bricks 0, 4.*
4. **Shared datastore** — Neon vs Supabase (both on Vercel Marketplace; note Vercel Postgres/KV are retired) for the suppression list + demo/booking state. *Needed at Brick 5.*
5. **Companies House API key** — free but requires registration; confirm Ollie/Josh registers the application. *Needed for Brick 1.*
6. **Booking tool** — Cal.com vs Calendly (Cal.com is open/self-hostable and webhook-friendly). *Needed at Brick 7.*
7. **Scraping data source** — keep the existing Google Places scraper (cheap, already built, budget-capped) vs buy a UK SME data source with firmographics/entity type pre-attached (would shrink Brick 1's matching risk but costs money). *Affects Brick 1 confidence.*
8. **Human-in-the-loop policy** — how long we keep a manual approval gate before any send (recommended: keep it through Bricks 4–5 given DUAA £17.5m/4% exposure), and who monitors the outreach inbox + replies.
9. **LIA sign-off** — who authors/owns the Legitimate Interests Assessment and the outreach privacy-notice update (a real doc must exist before the first live cold send).

---

## Sources

- [ICO — Business-to-business marketing](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/)
- [ICO — When can we rely on legitimate interests?](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/legitimate-interests/when-can-we-rely-on-legitimate-interests/)
- [legislation.gov.uk — PECR 2003, reg 22 (electronic mail / soft opt-in)](https://www.legislation.gov.uk/uksi/2003/2426/regulation/22)
- [legislation.gov.uk — PECR 2003, reg 23 (identity + valid opt-out address)](https://www.legislation.gov.uk/uksi/2003/2426/regulation/23)
- [Data Protection Network — UK email marketing rules (corporate vs individual subscriber; soft opt-in; named individuals)](https://dpnetwork.org.uk/email-marketing-rules/)
- [Mayer Brown — DUAA 2025 PECR reform (fines to £17.5m/4%; B2B not extended)](https://www.mayerbrown.com/en/insights/publications/2025/06/the-data-use-and-access-act-pecr-reform-rules-relating-to-electronic-marketing-and-cookies-in-the-uk)
- [Clifford Chance — DUAA key provisions in force 5 Feb 2026](https://www.cliffordchance.com/insights/resources/blogs/talking-tech/en/articles/2026/02/key-aspects-of-the-data--use-and-access--act-take-effect.html)
- [Companies House — Developer hub](https://developer.company-information.service.gov.uk/) · [API overview](https://developer.company-information.service.gov.uk/overview) · [company profile spec (`type`, `company_status`, `registered_office_address`)](https://developer-specs.company-information.service.gov.uk/companies-house-public-data-api/resources/companyprofile?v=latest)
- [Resend — Gmail & Yahoo 2024 bulk-sending requirements (SPF/DKIM/DMARC, one-click unsubscribe, <0.3% spam)](https://resend.com/blog/gmail-and-yahoo-bulk-sending-requirements-for-2024)
- [Yahoo Sender Hub — best practices](https://senders.yahooinc.com/best-practices/)
- [RFC 8058 — One-Click Unsubscribe (List-Unsubscribe-Post)](https://www.rfc-editor.org/rfc/rfc8058)

*Verified 2026-07-19. Legal position is engineering guidance, not legal advice — the LIA and privacy-notice update (fork 9) should be signed off before the first live cold send.*
