# CJ Creative Studio — Site Progress

**Last updated:** 2026-06-24

## Where things stand

The site is live at [cjcreativestudio.com](https://cjcreativestudio.com), built on Next.js 16 + Tailwind v4, deployed via Vercel (auto-deploys from the `main` branch on GitHub: `cjcreativestudio-org/CJ-Creative-studio`).

### Just shipped

The **homepage** has been fully rebuilt (PR #1, merged). It replaced a dark video-scrollytelling hero and a fictional crypto/robotics portfolio carousel — content that didn't match the business at all — with an editorial homepage matching the design system already established on `/about` and `/services`: cream `#f0ece3` backgrounds, Archivo Black display type, kicker labels, bordered card grids, blue accent.

The new homepage is structured around the "10 questions a homepage should answer" framework and covers:
1. **Hero** — what we do, who it's for (SMBs with outdated, broken, or missing websites)
2. **The Problem** — symptoms of an outdated site, in plain customer language
3. **How We're Different** — fast, reliable, handcrafted
4. **Selected Work** — case studies (currently placeholder, see Gaps below)
5. **How It Works** — condensed 3-step process
6. **What Clients Say** — testimonials (currently placeholder, see Gaps below)
7. **Final CTA** — repeat call-to-action + a freshness signal

Along the way we also fixed a site-wide mobile bug: the kicker+heading header row clipped off-screen on narrow viewports whenever the heading text was long. Fixed across the homepage, `/about`, and `/services`.

### Just shipped (2)

Real client work replaced the fictional case studies on the homepage and `/work`:

- **`lib/projects.ts`** now holds 4 real clients (Range Shipping, LA Roofing, Uncle Sam's, Taste of Portugal) with real screenshots in `public/assets/work/`, replacing Unsplash stock photos.
- **Homepage "Selected Work"** shows 3 of the 4 (Range Shipping, LA Roofing, Taste of Portugal) with real outcome copy; cards link to `/work?project=<slug>`.
- **`/work` page** had a second, entirely fictional, hardcoded project array (Maple & Co, Northfield Law, Project Four/Five/Six) with literal "Project Image" placeholder boxes — this was dead code sitting alongside an unused `WorkGallery` modal component that already had real Range Shipping/Uncle Sam's copy. Removed the fictional array; `/work` now renders `WorkGallery` (restyled from its original dark/glassmorphism look to match the site's cream editorial design system) showing all 4 real projects in a grid with a detail modal.
- `WorkGallery` reads a `?project=` query param on mount and auto-opens that project's modal, so homepage card clicks land directly on the right case study.
- Deleted `components/work-teaser.tsx` — unused, superseded by `WorkGallery`.

### Existing pages (wireframed, not all fully real)

| Route | Status |
|---|---|
| `/` | ✅ Rebuilt, live; Selected Work now real (see above) |
| `/about` | Wireframed — founder cards show initials only, no real photos |
| `/services` | Wireframed — pricing/tiers are illustrative |
| `/work` | ✅ Real client work, real screenshots (see above) |
| `/contact` | Functional contact form (Server Action + Resend) — `RESEND_API_KEY` and `CONTACT_EMAIL` (hello@cjcreativestudio.com) added to Vercel prod env; domain `cjcreativestudio.com` added in Resend, DNS records given to add in Namecheap (Advanced DNS), verification pending |
| `/privacy`, `/terms` | Built out |
| `/founders`, `/process` | Redirect to `/about` |

## Known gaps to fill in

- **Real testimonials** — homepage "What Clients Say" still has 2 placeholder quotes (Riverside Joinery, Marlowe & Finch — fictional businesses, not the 4 real clients). Checked all 4 real clients' sites (2026-06-24): no quotes exist anywhere praising CJ Studio's web design work — only their own customers' Google reviews of roofing/food/shipping (e.g. LA Roofing's Stuart Kew, Taste of Portugal's Paula Hanmer). Repurposing those would misrepresent them as testimonials about CJ Studio. Blocked until a real client gives a quote about working with CJ Studio specifically.
- **Real founder photos** — `/about` shows initials in a colored box instead of photos.
- **Resend email delivery — mid-setup.** `RESEND_API_KEY` and `CONTACT_EMAIL` are in Vercel prod env. `cjcreativestudio.com` is added as a domain in Resend with DNS records (DKIM TXT on `resend._domainkey`, SPF MX + TXT on `send`, optional DMARC TXT on `_dmarc`) handed off to be added in Namecheap → Advanced DNS. **Next time:** confirm the 4 records were added in Namecheap, then hit "Verify" in the Resend dashboard. Once verified, send a real test enquiry through `/contact` to confirm delivery end-to-end.
- **Pricing/tier accuracy on `/services`** — confirm the listed price points and deliverables are what we actually want to commit to publicly.
- **4th real project (Uncle Sam's) on homepage** — currently only shown on `/work`, not in the homepage's 3-card teaser (deliberate choice, not a gap, but worth knowing if priorities shift).
- **Logo** — confirm the current logo asset/lockup is final and correctly implemented everywhere (nav, footer, favicon, OG image); fix if not.
- **Footer** — needs a pass; flagged as not yet right (specifics TBD — confirm what's wrong with it before starting: content, layout, links, or branding).
- **Site-wide visual fill-out** — most pages are still wireframe-level on photography and motion (stock-feeling or placeholder imagery, little to no animation beyond the homepage's `Reveal`/scroll components). Plan is to go **page by page**, populating real photos and adding tasteful animation/motion. Candidate tools: **Higgsfield** (image/video generation — note newer Higgsfield features like **Canvas** and **Figma Motion** may fit here, worth checking current capabilities when this work starts) and **Figma** (for layout/motion design before implementation). Order of pages not yet decided — pick up one page at a time rather than attempting the whole site in one pass.

## What's next

Three concrete threads, not yet prioritized against each other:
1. **Finish Resend verification** (see gap above) — small, nearly done.
2. **Logo + footer fixes** — scoped fixes, need the specific issues identified first.
3. **Page-by-page visual fill-out** — the bigger, open-ended thread: replace wireframe-level photography with real images and add animation/motion, one page at a time, likely leaning on Higgsfield and/or Figma. Start by picking the first page and scoping what "done" looks like for it before generating assets.

No fixed plan for the visual fill-out phase yet — pull in whatever skills make sense for each piece of work as it comes up (design, copy, accessibility, etc.) rather than following a single rigid script.
