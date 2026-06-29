# Homepage Fixes — Design Spec

**Date:** 2026-06-29  
**Status:** Approved  

---

## Overview

Five changes to the CJ Studio homepage (`/`). Four are copy/style edits to existing sections; one replaces the How It Works section with a new scroll-jacked 5-step carousel. The Testimonials section is removed entirely.

---

## 1. Opportunity Section — Copy Rewrite

In-place replacement of the three item bodies. No structural or layout changes.

**Header/subtext:** Keep existing. Intro subtext changes to:
> "Your digital presence should be as sharp as your actual operation."

**01 — People judge you before they call.**
> If you run a serious operation, a slow or outdated website doesn't just look bad—it actively kills your credibility. You lose the contract before you even get to the table.

**02 — If they can't find you, you lose the job.**
> It doesn't matter how good your service is if your competitors are the ones ranking on page one. We build sites that actually show up when your ideal clients are looking for a solution.

**03 — Your site needs to pull its weight.**
> A website shouldn't just be a digital brochure sitting there doing nothing. It should be actively answering questions, filtering out bad leads, and driving real revenue while you focus on the business.

---

## 2. How We're Different Section — Text Sizing + Copy

**Text sizing:**
- "How We're Different" kicker: increase one type scale
- "Built for businesses, not award shows." title: reduce one type scale

**New header:** Built differently.  
**New subtext:** We stripped out the agency bloat to focus on what actually matters to your business.

**Box 01 — Priced for what you actually need.**
> We do not charge you for flashy animations or complex features if your business does not need them. You get a custom, fixed price based strictly on what will drive results for you, with flexible installment options to protect your cash flow.

**Box 02 — Fast delivery and full ownership.**
> Typical agencies take months to build a site and then trap you in expensive hosting contracts. We can launch your site in as little as one week. When it is done, you own the asset completely—we will even hand over the code if you want to host it yourself.

**Box 03 — Direct access and zero radio silence.**
> You will never be passed off to an account manager. You have a direct line to the founders, guaranteed 24-hour response times, and a commitment that we will keep tweaking the design until it perfectly supports your day-to-day operations.

---

## 3. Selected Work Section — Header + Subtext

**New header:** Proven work.  
**New subtext:** Recent projects built for operators who value efficiency and results.  
**Remove:** The line "3 completed projects across trades, hospitality, and logistics." (or equivalent project count string).

No other changes to this section.

---

## 4. How It Works Section — Scroll-Jacked 5-Step Carousel

Replace the existing How It Works component with a new `components/how-it-works.tsx`.

**New header:** Project Timeline  
**New subtext:** A transparent, step-by-step process with zero guesswork.

### Architecture

- **Outer container:** `500vh` tall, `position: sticky` inner viewport
- **Scroll driver:** `useScroll` with `offset: ["start start", "end end"]` on the outer ref
- **Track translation:** `useTransform(scrollProgress, [0, 1], ["0%", "-80%"])` applied to the horizontal card track (tuned so step 5 lands centred at scroll end)
- **Cards:** 5 cards side by side, `min-w-[80vw] md:min-w-[40vw]`, dark card bg `#161616`, step number in navy `#0A2540`, title + body in standard type scale
- **Progress indicator:** Row of 5 dots below the track. Active dot filled navy, inactive dots outlined. Active state derived from `scrollProgress` ranges (0–0.2, 0.2–0.4, etc.)
- **Mobile:** `md:hidden` / `hidden md:flex` split — vertical stack of all 5 steps, no scroll-jacking, same card style

### Steps

| # | Title | Body |
|---|---|---|
| 01 | The Kickoff Call | A quick introduction to answer your questions, understand your business goals, and gather the details we need to start building your initial demo site. |
| 02 | The Demo Walkthrough | We jump on a video call to show you a working, structural demo of your new site. We review the layout together and gather your feedback for the official draft. |
| 03 | Refinement & Strategy | We implement your changes, add any specific features you need, and map out the logistics like hosting. We don't move to the final stage until the design is exactly what you want. |
| 04 | Final Polish | By this stage, the site is practically finished. We do a comprehensive walkthrough of every page with you to catch any last-minute tweaks before we prepare for deployment. |
| 05 | Launch & Handover | We launch the site and sign the final paperwork. This ensures that you have 100% legal ownership of the website and all of its assets. A perfectly smooth transaction. |

---

## 5. In Their Words (Testimonials) — Remove

Remove `<Testimonials />` from `home-client.tsx`. The `components/testimonials.tsx` file is left on disk but unused.

---

## Files Affected

| File | Change |
|---|---|
| `components/opportunity.tsx` (or equivalent) | Copy edit — 3 items |
| `components/how-different.tsx` (or equivalent) | Copy + type scale edits |
| `components/dark-work-carousel.tsx` or section heading | Header/subtext copy, remove count line |
| `components/how-it-works.tsx` | Replace entirely with new scroll-jacked carousel |
| `components/home-client.tsx` | Remove `<Testimonials />` |

---

## Out of Scope

- Hero section — no changes
- All other pages — no changes
- `components/testimonials.tsx` — not deleted, just unused
