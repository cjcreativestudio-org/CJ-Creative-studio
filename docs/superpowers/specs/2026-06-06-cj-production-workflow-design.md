# CJ Studio Production Workflow — Design Spec
**Date:** 2026-06-06
**Authors:** Ollie & Josh (CJ Studio)
**Status:** Approved for implementation

---

## Overview

A complete, agent-ready production workflow for building premium animated websites for SME clients. The workflow classifies each client into one of four site type tracks at intake, then routes them through a track-specific playbook that governs design direction, tool selection, and human review gates — before handing off to the existing Claude Code subagent build pipeline.

**Goal:** A structured decision tree precise enough to eventually hand to a Claude agent for near-full automation, while preserving human creative control at the moments that matter.

**Two missing phases added to existing workflow:** Phase 0 (client discovery & classification) and Phase 1 (design direction & asset gathering). Phases 2–5 are Ollie's existing CJ Studio build pipeline, unchanged.

---

## Architecture: Master + 4 Track Playbooks

**Structure:** One master intake document handles classification. Four track-specific playbooks take over once the site type is determined. Each playbook is self-contained — Claude only reads the relevant one, keeping context lean.

**File structure (to be created as `cj-workflow/`):**
```
cj-workflow/
  WORKFLOW.md              ← master intake + classification logic
  tracks/
    hospitality.md
    trades.md
    professional.md
    creative.md
  templates/
    brief.md               ← client brief fill-in (one per project)
    ARCHITECTURE.md        ← base template, forked per track
```

---

## Phase 0: Client Discovery & Classification

### Intake Form (Tally.so)
Sent to every new client before the first call. Five questions:

| # | Question | Format |
|---|---|---|
| Q1 | What does your business do? | Multiple choice: Food & drink / Trades & construction / Professional service / Creative & arts / Other |
| Q2 | What do you most want the site to do? | Multiple choice: Get people to visit / Get quote enquiries / Build credibility & trust / Showcase my work |
| Q3 | How important is atmosphere & visual feel vs detailed information? | Scale 1–5 (1 = mostly feel, 5 = mostly information) |
| Q4 | Do you have professional photos of your business/work? | Multiple choice: Yes, lots / Yes, a few / No — need sourcing / No — AI generation fine |
| Q5 | Share 2–3 websites you admire (in or out of your industry) | Free text |

### Classification Logic
Q1 + Q2 determine the track in most cases. Q3 breaks ties. Q4–5 don't affect track selection — they feed Phase 1 design direction.

| Track | Q1 | Q2 | Q3 |
|---|---|---|---|
| 🍽 Hospitality | Food & drink | Get people to visit | 1–2 |
| 🏗 Trades | Trades & construction | Get quote enquiries | 3–4 |
| 💼 Professional Services | Professional service | Build credibility | 4–5 |
| 🎨 Creative & Portfolio | Creative & arts | Showcase my work | 1 |

**Edge cases:** If answers conflict or client selects "Other" for Q1, human review is required. Ollie or Josh makes the call on the discovery call and fills in the brief manually.

---

## Phase 1: Design Direction & Asset Gathering

Human-led, with Claude assisting on copy and moodboard generation. The output of this phase is a completed `templates/brief.md` plus all assets ready for the build.

### Human tasks (all tracks):
- Build brand colour palette using Coolors.co (seed from client photos or stated preferences)
- Select typography pair using Fontshare or Google Fonts
- Source and prepare photography: Remove.bg for background removal, Cloudinary for hosting and optimisation
- Pull 5–10 reference screenshots from Mobbin and/or Awwwards
- Build brand kit in Canva Pro (logo variations, colour swatches, social assets)

### Claude-assisted tasks:
- Generate moodboard description and design language from client's reference sites (Q5)
- Suggest page structure for the assigned track
- Draft copy for key sections from the completed brief
- Generate Midjourney prompts for hero images if photography is unavailable

### Track-specific review gates (must be approved before Phase 2):
- **Hospitality:** Photography approved — quality and quantity sufficient for a visual-first site
- **Trades:** Quote form fields and CTA copy approved by client
- **Professional Services:** Services list, pricing structure, and credential copy approved
- **Creative:** Visual direction moodboard approved — aesthetic language locked before any code

---

## Phase 2: Architecture & Brand Rules (existing)

Claude reads `tracks/[type].md` + the completed `templates/brief.md` and writes a project-specific `ARCHITECTURE.md` with all variables locked:
- Tech stack (Next.js, Tailwind CSS v4, Framer Motion, Aceternity UI)
- Client hex codes and typography
- Component list and page structure
- Track-specific packages (e.g. Lenis for hospitality, GSAP for creative)

No guessing. Every value is sourced from the brief or the track playbook.

---

## Phase 3: Spec + Subagent Execution (existing)

Claude writes a Spec Document and Implementation Plan before touching code. Reviewed by Ollie/Josh to confirm it maps to the correct files (`layout.tsx`, `page.tsx`, `globals.css`, etc.).

Execution uses the subagent-driven approach: one fresh subagent per component, spec compliance and code quality review after every step. Prompt caching keeps token cost efficient across the full build.

**Demo gate:** After each major section, the Vercel preview URL is shared with the client. Feedback is incorporated before the next section begins.

---

## Phase 4: QA & Aesthetic Enforcement (existing)

1. `/impeccable polish` — automatically strips template tropes (gradient text, over-rounded corners, uppercase tracking labels, etc.)
2. `/impeccable document` — locks the polished components into `DESIGN.md` as a persistent reference
3. Human localhost review — Ollie or Josh reviews the live local render
4. Final CSS blending applied via targeted single-shot prompts (e.g. `mix-blend-multiply` to melt assets into canvas)

---

## Phase 5: Client Approval & Vercel Deploy (existing)

1. Client reviews and signs off on the final Vercel preview
2. Final 50% invoice sent — nothing goes live until paid
3. Domain pointed to Vercel (DNS records provided to client)
4. UptimeRobot monitor added for the live domain
5. Launch email sent: live URL, support contact, retainer payment link

---

## Tool Stack by Phase

### Phase 0 — Discovery
| Tool | Purpose |
|---|---|
| Tally.so | Client intake form (free, better UX than Typeform) |
| Notion | Project tracking, client brief storage, retainer log |
| Loom | Async video walkthroughs for client feedback |

### Phase 1 — Design Direction
| Tool | Purpose |
|---|---|
| Canva Pro | Brand kit, logos, colour swatches, social assets |
| Coolors.co | Palette generation from client photos or brand colours |
| Fontshare | Free premium fonts |
| Realtime Colors | Test colour combinations on a live UI before locking in |
| Awwwards | Premium animated site references — the quality benchmark |
| Mobbin | Real UI screenshots sorted by industry |
| SiteInspire | Curated inspiration by style |
| Relume.io | AI-generated sitemaps and wireframes for planning |
| Midjourney | Hero image generation, mood boards, abstract backgrounds |
| Remove.bg | Background removal from client product/business photos |
| Cloudinary | Image hosting + auto-optimisation API |

### Phase 2–3 — Build Stack
| Tool | Purpose |
|---|---|
| Next.js | Framework |
| Tailwind CSS v4 | Styling |
| Framer Motion | Component-level animations |
| Aceternity UI | Premium animated component library |
| 21st.dev + Magic UI | Additional animated React components |
| GSAP + ScrollTrigger | Scroll-driven and timeline animations (creative + hospitality) |
| Lenis | Smooth scroll — the single biggest quality-of-feel upgrade |
| React Three Fiber | WebGL/3D elements (creative track and Phase 2 premium projects) |

### APIs by Track
| Track | APIs |
|---|---|
| Hospitality | Google Maps API, Google Reviews widget, LottieFiles |
| Trades | Google Reviews API, Formspree (quote forms), React Photo Album |
| Professional Services | Cal.com (scheduling), Resend (contact forms), Sanity.io (CMS) |
| Creative | GSAP ScrollTrigger, React Three Fiber, custom cursor libraries |

---

## Track Playbook Contents (all four tracks)

Each track playbook (`tracks/[type].md`) contains five sections in this order:

1. **Track Brief Template** — fill-in-the-blanks: client name, business description, goals, colour preferences, reference sites (from Q5), photography status
2. **Design Direction Rules** — non-negotiable aesthetic constraints: animation style, layout philosophy, photography treatment, typography mood
3. **Tool & Component List** — exact packages and APIs for this track, no additions without a deliberate decision
4. **ARCHITECTURE.md Template** — pre-filled architecture file with tech stack locked and brand placeholders clearly marked
5. **Human Review Gates** — explicit checkpoints where Ollie or Josh must approve before Claude continues

---

## Track Design Directions (summary)

### 🍽 Hospitality
- **Animation:** Slow scroll reveals, parallax hero, appetite-driven imagery transitions
- **Layout:** Full-bleed photography, minimal text overlay, emotion-first hierarchy
- **Key sections:** Atmosphere hero → Menu display → Location/hours → Gallery
- **Typography mood:** Editorial, generous white space, large display type

### 🏗 Trades & Construction
- **Animation:** Clean entrance animations only — trust-first, no gimmicks
- **Layout:** Project gallery hero, social proof prominent, CTA above the fold
- **Key sections:** Hero with CTA → Project gallery → Reviews/accreditations → Quote form
- **Typography mood:** Strong, confident, readable — no decorative choices

### 💼 Professional Services
- **Animation:** Subtle and purposeful — nothing that distracts from credibility signals
- **Layout:** Typography-led, clear service hierarchy, conversion funnel structure
- **Key sections:** Credentials/hero → Services → Social proof → Cal.com booking
- **Typography mood:** Clean, authoritative, information-dense but not overwhelming

### 🎨 Creative & Portfolio
- **Animation:** GSAP ScrollTrigger sequences, custom cursor, experimental transitions
- **Layout:** Showstopper hero, work portfolio first, everything else secondary
- **Key sections:** Full-bleed hero → Work showcase → Artist statement → Contact
- **Typography mood:** Bold, expressive, brand-forward — typography as a design element

---

## Human Review Gates Summary

| Gate | Timing | Who approves |
|---|---|---|
| Track classification | End of Phase 0 | Ollie or Josh |
| Photography & assets ready | End of Phase 1 | Ollie or Josh |
| Track-specific content approval | End of Phase 1 | Client + Ollie/Josh |
| ARCHITECTURE.md review | End of Phase 2 | Ollie or Josh |
| Spec + implementation plan review | Start of Phase 3 | Ollie or Josh |
| Per-section demo approval | During Phase 3 | Client |
| Final localhost review | End of Phase 4 | Ollie or Josh |
| Final sign-off | End of Phase 5 | Client |

---

## What This Is Not

- **Not a booking system workflow** — Phase 1 clients (restaurants, cafes, construction) do not require booking/reservation systems. This is a future consideration.
- **Not a conversion-science workflow** — high-complexity, sales-maximising sites with A/B testing and funnel optimisation are a Phase 2 ambition once the portfolio is built. The current workflow targets presence and credibility.
- **Not fully autonomous yet** — Claude assists and executes the build, but human creative input and client approval gates are load-bearing. Full automation is the long-term goal, not the current state.
