# Homepage Redesign — Design Spec

**Date:** 2026-06-24
**Status:** Approved, ready for implementation plan

## Context

The current homepage (`components/home-client.tsx`) is `EditorialNav` → `HeroMediaPlane` (image/video hero) → `PortfolioCarousel` (dark, crypto/robotics placeholder projects) → `EditorialFooter`. This doesn't match the editorial design system already built out on the `/about` and `/services` wireframe pages (cream `#f0ece3` backgrounds, Archivo Black display headings, serif italic subheads, bordered grid cards, `#5b9fd6` blue accent, black wordmark footer), and the content doesn't speak to CJ Creative Studio's actual target audience or differentiator.

This spec applies the "10 Questions Your Homepage Should Answer" framework to rebuild the homepage to:
1. Match the existing cream/Archivo Black editorial system (not the dark video hero)
2. Speak directly to the target audience and their problem
3. Answer all 10 questions in a natural top-to-bottom read

## Audience & Positioning (inputs)

- **Target audience:** small-to-medium businesses with an outdated website, a broken/neglected site, or no website at all.
- **Differentiator:** fast turnaround, reliable/fixed-scope delivery, handcrafted boutique design (not templated).
- **Primary CTA:** "View our work" — portfolio-first, trust-building before asking for contact info.
- **Portfolio content:** no real client work in the codebase yet. Use placeholder case studies styled as believable SMB examples (local trades, retail, hospitality) instead of the current crypto/robotics placeholders. Mark internally as illustrative; swap for real work later (tracked as follow-up, not in scope here).
- **Testimonials:** placeholder SMB-voice quotes for now, same swap-later approach.

## Section-by-Section Design

### 1. Hero
*Answers: Q1 (what we do), Q2 (who for), Q5 (next step)*

- Cream `#f0ece3` background, matching `/about` and `/services` hero pattern.
- Kicker row: "Web Design Studio" / "CJ Creative Studio" (same pattern as existing wireframes).
- Archivo Black headline, plain language, no abstract taglines: *"Your website should win you customers. Not lose them."*
- Rule + serif body copy: *"We rebuild outdated, broken, and missing websites for small and medium businesses — fast, reliable, handcrafted."*
- Single primary CTA button: "View our work →" linking to the Selected Work section (or `/work`).

### 2. The Problem
*Answers: Q3 (problem solved), Q8 (speaks their language)*

- Kicker: "The Problem". Headline naming the pain plainly: *"An outdated site is a closed sign on your door."*
- 2-3 symptom statements in plain customer language (not jargon), e.g.: "Looks outdated on phones," "Hasn't changed in years," "Doesn't show up when people search for you."
- Layout: bordered card row, same grid pattern as the Services page service cards.

### 3. Why CJ Creative Studio
*Answers: Q4 (differentiator)*

- Kicker: "How We're Different".
- Three bordered cards, same layout as About's Principles section: **Fast**, **Reliable**, **Handcrafted** — each with a one-line explanation tied to the SMB audience (e.g. turnaround you can plan around; fixed scope, no surprises; boutique not templated).

### 4. Selected Work
*Answers: Q6 (trust/proof), Q10 (outcome)*

- Replaces `PortfolioCarousel` entirely — no dark background, no video carousel.
- Bordered-card grid (same visual language as Services/About cards), light background.
- 3 placeholder SMB case studies (e.g. a local trades business, a retail shop, a hospitality client), each with a one-line outcome statement in plain, concrete terms (not "premium digital experiences" language).
- Secondary CTA: "See full case study →" linking to `/work`.
- Content is illustrative placeholder; component should accept a swappable data array so real projects can be dropped in later without restructuring.

### 5. How It Works
*Answers: Q7 (what it's like to work with us)*

- Condensed 3-step version of the Services page's 6-step process (e.g. Discovery → Design → Launch).
- Same numbered, bordered-card grid pattern used in `/services`.

### 6. What Clients Say
*Answers: Q6 (trust)*

- 2 placeholder testimonials, SMB voice (not generic praise), same card style as the About page's Founder cards.

### 7. Final CTA + Freshness Signal
*Answers: Q5 (next step, repeated), Q9 (currency/activity)*

- Repeat CTA: "Start a project →" linking to `/contact`.
- Small freshness signal near the CTA (e.g. "Currently booking — Summer 2026") so the page doesn't read as frozen in time.

### 8. Footer

- Reuse existing `EditorialFooter` / black wordmark footer pattern unchanged.

## Component Changes

- `components/home-client.tsx`: remove `HeroMediaPlane` and `PortfolioCarousel` imports/usage. New section components render in order: Hero → Problem → Differentiator → SelectedWork → HowItWorks → Testimonials → FinalCta, framed by `EditorialNav` / `EditorialFooter` as today.
- New components needed (names indicative, finalized at plan stage): a homepage hero matching the cream editorial hero pattern, a problem/symptoms section, a differentiator card row, a selected-work card grid (replacing the dark carousel), a condensed how-it-works grid, a testimonials card row, and a final CTA section with freshness signal.
- `HeroMediaPlane` and `PortfolioCarousel` components: left in place in the codebase (not deleted) in case other pages reference them; if confirmed unused elsewhere, removal can happen as a follow-up cleanup, not part of this redesign.
- All new sections follow the existing visual system: cream `#f0ece3` / white alternating backgrounds, Archivo Black display headings, serif italic subheads, kicker labels (`text-[10px] tracking-[0.22em] uppercase`), `#5b9fd6` accent, bordered grid cards matching `/about` and `/services`.

## Out of Scope

- Real client work / real testimonials (placeholder only, swap-in is a future task).
- Changes to `/about`, `/services`, `/work`, or `/contact` pages.
- Deletion of `HeroMediaPlane` or `PortfolioCarousel` components (left unused, not removed).
- Any backend/CMS work to make case studies data-driven beyond a simple swappable array.
