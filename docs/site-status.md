# CJ Creative Studio — Site Status

**Live URL:** https://www.cjcreativestudio.com/
**Vercel project:** https://vercel.com/ojackson27s-projects/cj-studio
**GitHub:** https://github.com/cjcreativestudio-org/CJ-Creative-studio (`main` branch)
**Last updated:** 2026-06-29 (session 5 — homepage copy refresh, How It Works carousel, Testimonials removal)

---

## Current Design State

The site has been fully reskinned from a warm beige editorial layout to a **cinematic dark/light monochrome design system**. Every page now shares the same visual language.

### Design System

| Token | Value | Usage |
|---|---|---|
| Dark bg | `#0a0a0a` | Hero sections, CTA, nav, footer |
| Card bg | `#161616` | Work gallery cards |
| Modal bg | `#141414` | Case study overlay |
| Light bg | `#f5f5f5` | Problem, Work sections |
| Text (dark) | `#f0f0f0` | Headings on dark |
| Text (light) | `#0d0d0d` | Headings on light |
| Body muted | `#888` | Body copy on dark |
| Accent | `#0A2540` (Navy) | Buttons, kickers, hovers, glows — 80/20 ratio |
| Easing | `[0.16, 1, 0.3, 1]` | All transitions (expo out) |

### Animation System

- **CharReveal** — character-by-character stagger for display headings
- **MaskReveal** — overflow-hidden clip reveal for subheadings and kickers
- **useInView** — scroll triggers with `once: true, margin: "-60px 0px"`
- **useReducedMotion** — respected everywhere, all animations skip when set
- **ScrollRiver** — fixed left-edge vertical progress line (md+ screens only)
- **GeoVideoBackground** — Higgsfield-generated abstract geometric MP4 (`/assets/video/geo-bg.mp4`), `position: fixed`, `z-index: 2`, `mix-blend-mode: screen`, `opacity-[0.55]`. Covers the full page on all routes. Screen blend means it glows on dark sections and becomes near-invisible on light/white sections — adaptive brightness effect.
- **HomeProcess carousel** — 5-step scroll-jacked horizontal carousel (`h-[500vh]` sticky, `useScroll`/`useTransform`, `-160vw` translation end). Mobile: vertical stack. Progress dots (decorative, `aria-hidden`). Reduced motion: no scroll-jacking.

---

## Pages

| Route | Status | Notes |
|---|---|---|
| `/` | ✅ Live | Dark hero, char-reveal headline, alternating light/dark sections |
| `/work` | ✅ Live | Dark hero + work gallery grid with browser frame cards and case study modals |
| `/services` | ✅ Live | Dark hero, light services rows, dark process grid |
| `/about` | ✅ Live | Dark hero, light founder cards, dark principles |
| `/contact` | ✅ Live | Full dark, square border contact links, `#5b9fd6` accent |
| `/privacy` | ✅ Live | Monochrome, EditorialNav/Footer, `#5b9fd6` links |
| `/terms` | ✅ Live | Same as privacy |

---

## Known Issues / Next Tasks

- [x] **Hero word spacing** — verified fixed
- [x] **Work modal scroll** — verified fixed
- [x] **Higgsfield video background** — shipped 2026-06-26; `geo-bg.mp4` replaces old `geo-dark-loop.mp4`; screen blend adapts to section brightness across whole page
- [x] **Homepage loading screen** — shipped 2026-06-27; white overlay with inline SVG triangle mark + "CJ Creative Studio." in Archivo Black, pulses for 2s then fades out; homepage only (`components/home-loading-screen.tsx`)
- [x] **Hero redesign (session 3)** — shipped 2026-06-27; headline constrained to `max-w-[56rem]`, copy + CTAs grouped left below headline, font size reduced ~25% with looser leading/tracking, new copy ("Digital platforms engineered for precision."), subtext in slate `#7a7a8a`, glow effect softened (color-mix 30%, shadow blur 28px at 0.18 opacity)
- [x] **Nav wordmark scroll-to-top** — shipped 2026-06-27; clicking "CJ Creative Studio" smooth-scrolls to top when already on `/`, navigates normally from other pages
- [x] **Selected Work layout fix** — shipped 2026-06-28; removed negative margins pulling cards into heading; header now `flex-col items-center text-center mx-auto mb-32`
- [x] **Heading copy update** — shipped 2026-06-28; "Built for trades, shops, and hospitality" → "Digital systems engineered for scale and performance."
- [x] **Footer redesign** — shipped 2026-06-28; compact layout with CJ Creative Studio wordmark, contact details (email + phone), solid navy CTA button, reduced headline size
- [x] **Duplicate footer fix** — shipped 2026-06-28; removed `HomeFinalCta` component (duplicate dark CTA block); `EditorialFooter` is the single termination point
- [x] **80/20 navy color system** — shipped 2026-06-28; accent color changed from `#5b9fd6` to `#0A2540`; solid navy primary buttons, navy kicker labels, stronger hero aura, navy accents in footer
- [x] **Homepage copy refresh (session 5)** — shipped 2026-06-29; Opportunity section humanized ("The Standard" kicker, new 3-item copy); How We're Different new header "Built differently." + new 3-box copy + heading alignment fix (index+title pinned to top); Selected Work header → "Proven work." with subtext, project count removed; Testimonials section removed entirely
- [x] **How It Works → Project Timeline carousel** — shipped 2026-06-29; replaced 3-step GSAP grid with 5-step scroll-jacked dark horizontal carousel (`components/home-process.tsx`); progress dots; mobile vertical stack
- [ ] **Contact form** — broken until `RESEND_API_KEY` is added to Vercel environment variables
- [ ] **OG image** — `/assets/cj-logo-stacked.png` is a logo, not a 1200×630 social card
- [ ] **Founder photos** — founder cards show initials only; replace with real photos
- [ ] **More projects** — `lib/projects.ts` has 3 demo projects (Maple & Co, Northfield Law, Bloom Studio); add real client work
- [ ] **Case study pages** — `/work/[slug]` routes don't exist; "Visit site" links go to external URLs only

---

## Stack

- Next.js 16.2.6 (App Router)
- Tailwind v4
- motion/react
- Resend (email — needs API key)
- TypeScript (zero errors enforced)

---

## Deploy

Push to `main` → Vercel auto-deploys. No manual steps needed.
