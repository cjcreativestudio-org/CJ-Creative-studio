# Client Build → Reels: The Repeatable Checklist

Every client build produces **2–3 reels** as a byproduct. This file is the system. Copy the checklist into the client's project notes at kickoff and tick as you go — the filming happens *during* the work, not after it.

---

## Rule zero: OBS is always recording

Before the first line of code on any client build:

- [ ] OBS open, recording the main monitor at native res, 30fps (screen content punches into 9:16 fine)
- [ ] Save location has disk space for ~2 days of footage (or record in deliberate sessions — see capture moments below)
- [ ] Hide/close before hitting record: email, DMs, client Slack/WhatsApp, password managers, `.env` files, anything billing-related
- [ ] Phone charged and nearby for selfie clips and hands-on shots

If in doubt, record it. Deleting footage is free; recreating "hour zero" is fake.

## Capture moments (the shots every build must bank)

Tick these off during the build — each maps to a reel beat:

- [ ] **Hour zero** — empty folder, `create-next-app` scaffolding, first commit
- [ ] **The "before"** — client's old site scrolled top to bottom (or the template-trap equivalent if they had none). Capture BEFORE it gets taken down
- [ ] **Build timelapse raw** — 2–3 sessions of editor + localhost side-by-side while real work happens
- [ ] **The taste pass** — a genuine polish session where a design choice visibly improves across 2–3 refreshes
- [ ] **The signature feature** — the one interactive thing this site does (calculator, booking, ordering, scroll effect) used in real time, no cuts
- [ ] **Agent moment** — Jarvis task card / Claude Code streaming / overnight commit timestamps for this build
- [ ] **The deploy** — Vercel build → Ready, then the production URL loading fresh
- [ ] **Phone-in-hand** — 📱 the live site on a real phone, thumb visible, 15+ seconds of natural scrolling
- [ ] **Selfie book-ends** — 📱 two one-liners to camera: one at kickoff ("new build starting: ___"), one at handover ("it's live")

## The 2–3 reels per build

| Reel | Pillar | Formula | Reference script |
|---|---|---|---|
| **1. Speed build** (always) | P1 | Hook on finished site → hour zero → timelapse → deploy → phone-in-hand → Sprint CTA | `scripts/01`, `scripts/10` |
| **2. Before/after** (if there's a before) | P2 | Old site scrolled + critiqued → cut to black → new site → side-by-side → CTA | `scripts/02`, `scripts/09` |
| **3. Feature spotlight** (if there's a signature feature) | P2/P1 | "This one feature…" hook → why the default fails → real-time demo → business result → CTA | `scripts/06`, `scripts/03` |

If the build only supports two reels, cut #3 — never pad.

## Per-reel assembly checklist

- [ ] **Hook written first** — one sentence, understandable with sound off, lands inside 1.5s. Test: would a stranger stop scrolling at frame one?
- [ ] Shot list on paper before opening the editor (steal beats from the reference script)
- [ ] 20–40 seconds total; every shot earns its place
- [ ] On-screen text at every beat — the reel must work on mute
- [ ] VO recorded on phone in a quiet room (voice memo quality is fine; flat and confident, no radio voice)
- [ ] One CTA only, matched to pillar: P1/P2 → **DM "SPRINT"**, P3/craft → **Follow / comment keyword**
- [ ] End card: offer line + CTA ("£1,995 · 48 hours · DM 'SPRINT'")
- [ ] Caption: first line = hook restated, 2–4 lines substance, CTA last, plain-English keywords ("web design", "website", "UK", the client's trade)
- [ ] 4–6 hashtags: 2 niche + 2 audience + 1–2 local

## Sign-off checklist (before posting — every time)

- [ ] **Client permission** confirmed for featuring their build (get it at contract stage — add a portfolio/social clause to the standard agreement)
- [ ] No client-private info in frame: emails, phone numbers in admin views, invoices, analytics, `.env`, API keys — scrub frame by frame at the punch-in moments
- [ ] Every claim on screen is true and defensible (build times, review scores, speed scores — screenshot the evidence the day you film it)
- [ ] No real competitor named or shown — use template-gallery demos as the "before" strawman
- [ ] Trading-platform footage (if any): paper/backtest only + "not financial advice" line in caption
- [ ] Watched once on a phone, with sound off, before publishing

## After posting

- [ ] 15 minutes replying to every comment and DM
- [ ] SPRINT DMs answered same day with the one-pager + booking link
- [ ] Log in the tracking row: date, script/reel, pillar, 3s-hold %, watch %, follows, SPRINT DMs, link taps
- [ ] Anything that flopped or popped → one line in the next calendar rebuild (see STRATEGY.md measurement rule: DMs > views)
