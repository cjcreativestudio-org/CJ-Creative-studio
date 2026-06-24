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
| `/` | `home-client.tsx` | LaptopZoom hero + DarkWorkCarousel + WhyItMatters + Testimonials + CTA + Footer |
| `/work` | WorkGallery | Scroll carousel + modal case studies |
| `/services` | Services | Design + upkeep tiers |
| `/about` | About | Principles + 6-step process + founders |
| `/contact` | ContactForm | Server Action + Resend; needs `RESEND_API_KEY` env var |
| `/privacy` | — | UK GDPR policy |
| `/terms` | — | Full ToS |
| `/process`, `/founders` | — | Redirect to /about |

## Homepage Architecture

- `components/laptop-zoom.tsx` — 300vh scroll section; MacBook mockup zooms 1×→9× (quadratic ease); dark veil at z:2; arrival headline at z:3
- `components/dark-work-carousel.tsx` — 350vh desktop horizontal scroll; mobile: vertical stack (`md:hidden`)
- `components/why-it-matters.tsx` — 300vh horizontal scroll (3 panels); mobile: vertical stack; Space Grotesk headings
- `components/testimonials.tsx` — 3 client quotes from `lib/projects.ts`
- `components/cta.tsx` — "Ready to build something great?" + Maple & Co blockquote
- `lib/projects.ts` — Three demo projects: Maple & Co, Northfield Law, Bloom Studio

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
2. ~~**Real domain**~~ — live at cjcreativestudio.com; verify `BASE_URL` in `layout.tsx` + `sitemap.ts` matches
3. **OG image** — replace `/assets/cj-logo-stacked.png` with a 1200×630 screenshot
4. **Real founder photos** — founder cards currently show initials only
5. **More projects** — add real client work to `lib/projects.ts`
6. **Case study pages** — `/work/[slug]` don't exist; "View project" links go to `/work`
