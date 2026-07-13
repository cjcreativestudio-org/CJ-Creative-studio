@AGENTS.md

# CJ Studio — Project Context

**When this file loads, we are implementing changes to the live CJ Studio website.**

## Identity

CJ Studio is a UK web design agency co-founded by Ollie Jackson and Josh Carter. Business model: flat-fee builds + monthly retainer.

## URLs

| | |
|---|---|
| **Production** | https://www.cjcreativestudio.com/ |
| **GitHub** | https://github.com/cjcreativestudio-org/CJ-Creative-studio (main branch) |
| **Vercel project** | https://vercel.com/ojackson27s-projects/cj-studio |
| **Local** | `C:\Users\ollie\cj-websites\cj-creative-studio` |

Deploy is automatic: push to `main` → Vercel builds and deploys.

## Stack

- Next.js 16.2.6 (App Router)
- Tailwind v4
- motion/react (Framer Motion)
- Resend (email)
- TypeScript (zero errors enforced)

## Pages

| Route | Component | Notes |
|---|---|---|
| `/` | `home-client.tsx` | Editorial homepage — see Homepage Architecture below |
| `/work` | WorkGallery | Case study grid + modals, data from `lib/projects.ts` |
| `/services` | self-contained `page.tsx` | 3 services w/ prices; **template for new static pages** |
| `/about` | self-contained `page.tsx` | Principles + process + founder cards (initials only) |
| `/contact` | ContactForm | Server Action + Resend; needs `RESEND_API_KEY` env var |
| `/privacy` | — | UK GDPR policy |
| `/terms` | — | Full ToS |
| `/process`, `/founders` | — | Redirect to /about |

All static pages follow the same shape: `metadata` export + `EditorialNav` + MaskReveal-animated sections + `EditorialFooter`, self-contained in `page.tsx`. Copy `app/services/page.tsx` when adding a new one.

## Homepage Architecture (editorial redesign)

`app/page.tsx` → `components/home-client.tsx`, which renders in order:

- `components/home-loading-screen.tsx` — fixed white intro overlay (pulsing triangle mark + wordmark); auto-dismisses after 2s with AnimatePresence fade
- `components/scroll-river.tsx` — fixed 2px scroll-progress line at left edge; desktop only (`hidden md:flex`); fades out at page end
- `components/editorial-nav.tsx` — fixed header; transparent → dark glass + aurora gradient hairline after 20px scroll; Work/Services/About links + CTA; mobile hamburger drawer with focus trap + Escape close
- `components/mobile-sticky-cta.tsx` — mobile-only fixed bottom "Start a project" bar; appears after scrolling 0.8× viewport height
- `components/home-hero.tsx` — dark `min-h-svh` hero; 3-line Archivo Black headline via GlowHeadline char stagger; two CTA buttons (filled navy + outlined)
- `components/home-problem.tsx` — light "The Standard" section; 3 numbered problem rows with MaskReveal headings
- `components/home-differentiators.tsx` — dark "Built differently." section; `geo-bg.mp4` video background at 12% opacity; 3-card grid with diagonal hairlines
- `components/home-work.tsx` — light "Proven work." section; 3 project cards **hard-coded in this file** (LA Roofing, Taste of Portugal, Range Shipping), browser-chrome frames, all link to `/work`
- `components/home-process.tsx` — desktop: 500vh scroll-jacked horizontal track (5 step cards translate 0 → −160vw inside a sticky viewport, with progress dots); mobile: separate vertical-stack section; reduced-motion: static column
- `components/editorial-footer.tsx` — black CTA row → oversized wordmark (`clamp(3rem,14vw,170px)`) overlapping a white legal/contact bar

Shared primitives:

- `components/mask-reveal.tsx` — overflow-hidden y:110%→0 reveal; once, EXPO, 0.75s, `-60px` inView margin
- `components/glow-headline.tsx` — per-char stagger reveal + section-scoped mouse-proximity navy glow; plain text under reduced motion
- `lib/easing.ts` — `EXPO = [0.16, 1, 0.3, 1]`, the ease used across all editorial animations
- Global layers in `app/layout.tsx`: ShaderBackground + GeoVideoBackground + FilmGrain (fixed backgrounds), LenisProvider (smooth scroll)

The ten legacy pre-redesign components (`laptop-zoom`, `dark-work-carousel`, `why-it-matters`, `testimonials`, `cta`, `home-testimonials`, `home-final-cta`, `hero-section`, `nav`, `footer`) were deleted in task t38 — they had zero importers. Deleting `nav`/`footer` stranded `components/logo.tsx` (now imported nowhere) and the public assets `assets/hero-blocks.png`, `assets/hero-sky.png`, `assets/cj-logo-horizontal.png`; these remain in the tree pending a follow-up cleanup decision — do not build on them.

## Editorial Design System

- Display headings: Archivo Black, always inline `style={{ fontFamily: "var(--font-archivo-black)" }}` (no Tailwind utility for it)
- Navy accent `#0A2540` — buttons, kickers, homepage index numbers, hover overlays; hover state darkens to `#0d3060`
- Static-page index/link accent `#5b9fd6` (services, about, contact, privacy, terms)
- Sections alternate `#0a0a0a` (dark, text `#f0f0f0`) and `#f5f5f5` (light, text `#0d0d0d`)
- Mono details (footer links, legal): JetBrains Mono via `var(--font-jetbrains-mono)`
- Hover styles must be guarded: `[@media(hover:hover)_and_(pointer:fine)]:hover:…` — prevents sticky hover on touch
- Every animated component checks `useReducedMotion` and degrades to static layout

## `lib/projects.ts`

Four real client projects consumed by WorkGallery on `/work`: Range Shipping, LA Roofing, Uncle Sam's, Taste of Portugal — each with slug, screenshot, description, live URL, detail bullets.

## Code Standards (do not break these)

- TypeScript: zero errors
- All pages have `id="main-content"` for skip-nav
- `whileInView` animations: `amount ≤ 0.15`, with negative margin offsets
- All sections have `aria-label`
- ContactForm: `aria-invalid`, `aria-describedby`, `role="alert"` on errors
- WorkGallery: focus trap, `aria-modal`, autoFocus close button
- AnimatedButton: CSS `group-hover` shimmer (not `whileHover` — pointer-events-none breaks it)
- `send-enquiry.ts`: `escapeHtml()` on all user input
- SEO: `sitemap.ts` (7 routes) + `robots.ts` + OG/Twitter meta
- Font: JetBrains Mono via `--font-mono` / `var(--font-jetbrains-mono)` in scene elements
- Brand: "CJ Studio" everywhere (alt text, metadata, labels)

## Outstanding Items

1. **Resend API key** — add `RESEND_API_KEY` to Vercel env vars (contact form broken without it)
2. **BASE_URL** — `layout.tsx` + `sitemap.ts` still hard-code `https://cj-studio-beta.vercel.app`; update to https://www.cjcreativestudio.com
3. **OG image** — replace `/assets/cj-logo-stacked.png` with a 1200×630 screenshot
4. **Real founder photos** — founder cards on /about currently show initials only
5. **Case study pages** — `/work/[slug]` don't exist; project links go to `/work`
