# CJ Creative Studio — Site Status

**Live URL:** https://www.cjcreativestudio.com/
**Vercel project:** https://vercel.com/ojackson27s-projects/cj-studio
**GitHub:** https://github.com/cjcreativestudio-org/CJ-Creative-studio (`main` branch)
**Last updated:** 2026-06-26

---

## Current Design State

The site has been fully reskinned from a warm beige editorial layout to a **cinematic dark/light monochrome design system**. Every page now shares the same visual language.

### Design System

| Token | Value | Usage |
|---|---|---|
| Dark bg | `#0a0a0a` | Hero sections, CTA, nav, footer |
| Card bg | `#161616` | Work gallery cards |
| Modal bg | `#141414` | Case study overlay |
| Light bg | `#f5f5f5` | Problem, Work, Process sections |
| Text (dark) | `#f0f0f0` | Headings on dark |
| Text (light) | `#0d0d0d` | Headings on light |
| Body muted | `#888` | Body copy on dark |
| Accent | `#5b9fd6` | Category labels only |
| Easing | `[0.16, 1, 0.3, 1]` | All transitions (expo out) |

### Animation System

- **CharReveal** — character-by-character stagger for display headings
- **MaskReveal** — overflow-hidden clip reveal for subheadings and kickers
- **useInView** — scroll triggers with `once: true, margin: "-60px 0px"`
- **useReducedMotion** — respected everywhere, all animations skip when set
- **ScrollRiver** — fixed left-edge vertical progress line (md+ screens only)
- **GeoVideoBackground** — geometric dark loop video, fixed `z-10`, `opacity-[0.07]`, shown on all non-homepage pages

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

- [ ] **Hero word spacing** — just fixed (2026-06-26); verify Archivo Black display text reads correctly at all viewport widths
- [ ] **Work modal scroll** — fixed (2026-06-26); modal now opens at top of case study
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
