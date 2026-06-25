# CJ Creative Studio — Homepage Visual Redesign Spec

**Date:** 2026-06-25  
**Status:** Approved

---

## Goal

Elevate the CJ Creative Studio homepage from a clean editorial layout to a cinematic, premium showcase — demonstrating the quality of work the studio delivers rather than just describing it. The page must feel like a high-end agency website that sells itself.

---

## Design Direction

**Aesthetic:** Premium + cinematic + clean + confident. Apple/Linear energy. Restraint over spectacle — every animation earns its place.

**Palette:**
- Background dark: `#0a0a0a`
- Background light: `#f5f5f5` (near-white, not pure white)
- Text primary: `#f0f0f0` (on dark) / `#0d0d0d` (on light)
- Accent: keep existing `#5b9fd6` for category labels only
- No warm beige — the `#f0ece3` tone is retired

**Typography:** Unchanged — Archivo Black for display, serif for body, tracked uppercase for labels.

**Motion principle:** Mask-reveals and character staggers for headlines. Fade-ups for body text. Stagger for lists/grids. Reduced motion respected everywhere via `useReducedMotion`.

---

## Scroll Progress River

A thin vertical line (`2px`, `#f0f0f0` on dark / `#0d0d0d` on light) runs down the left margin of the page. It grows from top to bottom as the user scrolls, using `useScroll` + `useTransform` from motion/react. It's fixed to the left edge, only visible on `md+` screens. Disappears quietly at the footer.

Component: `components/scroll-river.tsx`

---

## Section-by-Section Design

### 1. Hero — `components/home-hero.tsx`

- **Background:** `#0a0a0a` (dark)
- **Layout:** Full viewport height, centered vertically
- **H1:** `clamp(3.5rem, 9vw, 9rem)` — "Your website should win you customers. Not lose them."
- **Animation:** Character-by-character stagger — each letter wraps in a `<span>`, animates `y: 40px → 0`, `opacity: 0 → 1`, 20ms delay between letters. Easing: `[0.16, 1, 0.3, 1]` (expo out).
- **Subheadline:** Fades up 500ms after the first letter fires
- **CTA button:** Mask-reveals 200ms after subheadline
- **Scroll indicator:** Pulsing chevron or thin line at bottom center pointing down

### 2. Problem — `components/home-problem.tsx`

- **Background:** `#f5f5f5` (light) — deliberate contrast switch
- **Pain points (3):** Each reveals independently on scroll. Large muted gray number (`01`, `02`, `03`) mask-reveals first, then headline text slides up beneath it
- **Animation trigger:** `useInView` per item, stagger 150ms between items
- **The river:** Visible and growing on this section (switches to dark `#0d0d0d` line on light bg)

### 3. Differentiators — `components/home-differentiators.tsx`

- **Background:** `#0a0a0a` (dark)
- **Cards:** Stagger left-to-right — index label first (mask), then title, then body (fade up). 120ms between cards.
- **Video background:** A single looping Higgsfield-generated geometric video plays as a full-bleed background behind the three cards. `opacity: 0.12` — purely atmospheric, text fully readable. `autoPlay muted loop playsInline`. Video placed as `<video>` with `object-cover`, `pointer-events-none`.
- **Video file:** `/assets/video/geo-dark-loop.mp4` — to be generated via Higgsfield

### 4. Work — `components/home-work.tsx`

- **Background:** `#f5f5f5` (light)
- **Project images:** Existing `/assets/work/` screenshots displayed in laptop/browser frame mockups (CSS frame — no JS library needed). Device frames are simple CSS borders + a top bar with three dots.
- **Animation:** Each project card slides in from alternating sides (left, right, left), `x: ±80px → 0`, `opacity: 0 → 1`, triggered by `useInView` on each card independently.
- **Hover:** `scale: 1.02`, `box-shadow` lifts. "View project →" label fades in.

### 5. Process — `components/home-process.tsx`

- **Background:** `#f5f5f5` continues (no switch — same mood as Work, deliberate calm)
- **Connector:** A horizontal SVG line draws itself left-to-right using `pathLength` animation when section enters view. Each step's content stagger-reveals after the line reaches it.
- **Steps:** Number mask-reveals, then title, then body (fade up), staggered 200ms each.

### 6. Testimonials — `components/home-testimonials.tsx`

- **Background:** `#0a0a0a` (dark)
- **Quotes:** Large — `clamp(1.8rem, 3.5vw, 3rem)`, italic serif. Line-by-line mask reveal as user scrolls into each quote. Attribution fades up beneath.
- **Spacing:** Generous — these quotes need to breathe.

### 7. CTA + Footer — `components/home-final-cta.tsx` + `components/editorial-footer.tsx`

- **CTA background:** `#0a0a0a`
- **Headline:** Largest text on the page — `clamp(4rem, 10vw, 11rem)`. Single mask-reveal. "Let's build something great."
- **CTA button:** Fades in 300ms after headline settles
- **The river:** Reaches the bottom and quietly disappears (fades out in final 5% of scroll)
- **Footer:** Dark, minimal, no animation — just clean type

---

## New Components

| Component | Purpose |
|---|---|
| `components/scroll-river.tsx` | Fixed scroll-progress vertical line |
| `components/char-reveal.tsx` | Character-stagger text animation wrapper |
| `components/mask-reveal.tsx` | Clip-path mask reveal for text/blocks |

## Modified Components

| Component | Change |
|---|---|
| `components/home-hero.tsx` | Dark bg, char-stagger headline, mask CTA |
| `components/home-problem.tsx` | Light bg, per-item stagger reveals |
| `components/home-differentiators.tsx` | Dark bg, stagger cards, video background |
| `components/home-work.tsx` | Light bg, device frames, alternating slide-in |
| `components/home-process.tsx` | SVG connector line draw, stagger steps |
| `components/home-testimonials.tsx` | Dark bg, large quotes, line-by-line reveal |
| `components/home-final-cta.tsx` | Dark bg, giant mask-reveal headline |
| `components/home-client.tsx` | Remove bg-white wrapper |

---

## Constraints

- TypeScript: zero errors
- `useReducedMotion()` respected in all animation components — skip animations when set
- All `whileInView` / `useInView` use `margin: "-60px 0px"` or tighter
- All sections keep existing `aria-label` attributes
- No new dependencies — motion/react, gsap, lenis already installed
- Video file must be under 4MB (compress with ffmpeg)
- Mobile: scroll river hidden (`md:block`), all animations preserved but simpler thresholds
