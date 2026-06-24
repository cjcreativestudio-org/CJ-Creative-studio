# Abstract Visual Layer for Homepage — Design Spec

**Date:** 2026-06-24
**Status:** Approved

## Goal

Add a small set of abstract, monochrome textural images and one looping abstract video to the homepage to add visual depth and motion, without breaking the site's minimalist editorial brand.

## Brand Constraint

The live homepage (`home-client.tsx`) is light/editorial: cream hero (`#f0ece3`), white sections, black Archivo Black headings, `#5b9fd6` blue accents, serif body copy. Abstract imagery must be **monochrome/greyscale, desaturated, on light/cream tones** — not the dark purple-gradient aesthetic seen in the unused legacy `why-it-matters.tsx` component.

## Asset Generation

Generate via Higgsfield MCP, using **only unlimited/free-tier models** — no credit-consuming premium generations:

- **Video:** Seedance Unlimited model only, for the single looping abstract video.
- **Images:** the free/unlimited image model, for all stills.

### Assets

| Asset | Type | Description | Used in |
|---|---|---|---|
| `abstract-hero-bg` | image | Soft paper grain / light directional shadow, greyscale, low contrast | `HomeHero` background layer |
| `abstract-problem-texture` | image | Fabric fold or paper crease texture, greyscale | `HomeProblem` grid accent |
| `abstract-loop` | video (6–10s, silent, seamless loop) | Slow ink-in-water or light/shadow drift, greyscale | New `HomeAbstractSection` |
| (2 spare stills) | image | Same textural family, held in reserve in case hero/problem treatments need a second layer | reserve in `/public/assets/abstract/` |

All assets saved to `/public/assets/abstract/`.

## New Section: `HomeAbstractSection`

- New component `components/home-abstract.tsx`, inserted in `home-client.tsx` between `HomeHero` and `HomeProblem`.
- Full-bleed looping video (`abstract-loop`), fixed/contained height (e.g. 70–90vh) — a breathing moment, not a 300vh scroll-jacked sequence like `laptop-zoom`.
- One short line of brand-statement text overlaid in cream/white, parallaxed at a different scroll speed than the video using `motion/react`'s `useScroll` + `useTransform` (same pattern as `why-it-matters.tsx`/`laptop-zoom.tsx`).
- Respects `useReducedMotion`: parallax and video autoplay motion disabled/static fallback when reduced motion is requested (static poster frame).

## Accent: `HomeHero`

- `abstract-hero-bg` placed as a low-opacity (~8–12%) background layer behind existing text, `position: absolute`, `object-cover`.
- Parallax via scroll: moves at a slightly different speed than the foreground text (subtle `translateY` via `useTransform`).
- Must not reduce text contrast/legibility — opacity capped low enough that WCAG contrast for the heading/body text is unaffected.

## Accent: `HomeProblem`

- `abstract-problem-texture` added as a 4th visual element alongside the existing 3-column symptom grid — either as a subtle corner/background texture within the grid container, or as a bordered 4th cell matching the grid's existing `border border-gray-200` styling (implementation detail decided during build, whichever fits the 3-column grid most cleanly without unbalancing it).
- Kept subtle — supports the data-driven feel of the section, doesn't compete with the symptom text.

## Out of Scope

- No changes to `why-it-matters.tsx` (confirmed unused/legacy, left as-is).
- No video/image generation using paid/credit-based Higgsfield models.
- No new sections beyond the one `HomeAbstractSection`.
- No changes to `/work`, `/services`, `/about`, `/contact`, or other non-homepage pages.

## Testing / Verification

- Visual check in browser at desktop + mobile widths (Vercel preview or local dev).
- Confirm `prefers-reduced-motion` fallback renders correctly (static, no parallax/autoplay).
- Confirm Lighthouse/CWV not materially regressed by video autoplay (video should be muted, `playsinline`, lazy-loaded/below-the-fold deferred if not in the first viewport).
- TypeScript: zero errors (per project standard).
