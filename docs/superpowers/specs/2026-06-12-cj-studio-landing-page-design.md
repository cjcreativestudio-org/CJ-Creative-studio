# CJ Creative Studio — Landing Page Design Spec
**Date:** 2026-06-12  
**Status:** Approved  
**Scope:** Root route `/` — full page replacement

---

## 1. Tech Stack & Constraints

- Next.js 16.2.6 (App Router)
- Tailwind CSS v4
- Framer Motion via `motion` package v12 (`motion/react`)
- Phosphor Icons (`@phosphor-icons/react`)
- Fonts: Space Grotesk (display), Plus Jakarta Sans (body), JetBrains Mono (mono)
- No new dependencies required

---

## 2. Architecture

`app/page.tsx` is a thin orchestrator. It renders components in this order:

```
<Nav />
<LaptopZoom />
<WhyItMatters />
<WorkTeaser />
<CTA />
<Footer />
```

All scroll animation is Framer Motion `useScroll` + `useTransform` — no scroll hijacking, no vanilla JS event listeners.

---

## 3. Global Changes (Prerequisites)

### 3a. Aurora Colors — `app/globals.css`

Replace the existing pink/rose `body::before` radial gradients with brand aura colors:

- `#8a6cff` purple (was rose `#fda4af`)
- `#4d7cff` blue (was orange `#f97316`)
- `#27d7c4` teal (was pink `#fda4af`)

The `body::before` fixed aurora persists behind all four phases. No solid background colors are used in any phase section — the aurora always shows through.

Also update the `.aurora-gradient` keyframe colors to match the brand palette.

### 3b. Nav Links — `components/nav.tsx`

Replace the current links array:
```
Work / Services / Process / Founders
```
With the PRD-specified links:
```
{ label: "Home",              href: "/" }
{ label: "Our Work",          href: "/work" }
{ label: "About us",          href: "/about" }
{ label: "Our services",      href: "/services" }
{ label: "Contact Us",        href: "/contact" }
{ label: "Privacy & Policy",  href: "/privacy" }
```

The "Start a project" CTA button is removed from the nav — the PRD does not include it.

Add an `onLight` prop (boolean) to Nav. When true, nav link text switches from white to dark (`text-gray-900`). The `LaptopZoom` component passes this down based on scroll progress (triggers at p < 0.46).

### 3c. Hero Asset

Copy `C:\Users\ollie\Downloads\Gemini_Generated_Image_ijidzfijidzfijid.png` to `/public/assets/hero-master.png`. Create the `/public/assets/` directory.

---

## 4. Phase 1 — LaptopZoom (`components/laptop-zoom.tsx`)

### Purpose
Full-screen hero with a scroll-driven zoom that "dives through" the laptop screen, transitioning naturally into Phase 2.

### Structure
```
<section> — tall wrapper, ~250vh, position: relative
  <div> — sticky, 100vh, overflow: hidden
    <div ref={zoomerRef}> — the image container, will-change: transform
      <Image src="/assets/hero-master.png" fill priority />
    </div>
    <div> — dark veil overlay, position: absolute inset-0
    <div> — arrival content (Phase 2 entry text, fades in at end)
  </div>
</section>
```

### Scroll Animation

Uses `useScroll({ target: sectionRef, offset: ["start start", "end end"] })` to get `scrollYProgress` (0 → 1).

Derived transforms (matching PRD math, adapted to Framer Motion):

| Variable | From | To | Easing |
|---|---|---|---|
| `scale` | 1 | 9 | `p²` (quadratic acceleration) |
| `roomOpacity` | 1 | 0 | linear, range [0.60, 0.84] |
| `veilOpacity` | 0 | 0.5 | smoothstep, range [0.55, 0.82] |
| `navOnLight` | false | true | threshold at p < 0.46 |

The laptop screen is pure white. At scale ~9×, the white fills the viewport, creating a seamless wipe into Phase 2 without any masking.

### Nav Integration
`page.tsx` holds `const [navOnLight, setNavOnLight] = useState(false)` and passes a `onLightChange` callback to `LaptopZoom`. Inside `LaptopZoom`, `useMotionValueEvent` on `scrollYProgress` calls `onLightChange(p < 0.46)` on each frame. `page.tsx` passes the resulting boolean as an `onLight` prop to `<Nav />`.

---

## 5. Phase 2 — WhyItMatters (`components/why-it-matters.tsx`)

### Purpose
Simulated horizontal scroll section — vertical scroll progress drives a `translateX` on a wide inner track.

### Structure
```
<section> — outer wrapper, ~300vh, position: relative
  <div> — sticky, 100vh, overflow: hidden, flex items-center
    <motion.div> — inner track, flex, width: 300vw (3 slides)
      <Slide1 /> — "WHY IT MATTERS" + headline
      <Slide2 /> — bullet facts carousel
      <Slide3 /> — transition buffer / keep scrolling
    </motion.div>
  </div>
</section>
```

`useScroll` on the outer wrapper maps `scrollYProgress` → `translateX` range `["0vw", "-200vw"]` via `useTransform`.

### Slide 1 Content
- Eyebrow: `"WHY IT MATTERS"` — JetBrains Mono, 12px, tracking-widest, uppercase, muted
- Headline: `"Your website is the first thing they judge."` — Space Grotesk, bold, `clamp(2.5rem, 6vw, 5rem)`
- The word **"judge"** has a gradient text effect: `background: linear-gradient(90deg, #8a6cff, #4d7cff 52%, #27d7c4)`
- Keep-scrolling hint: `"KEEP SCROLLING ↓"` with a subtle vertical line below it. Fades in after 0.1s delay.

### Slide 2 Content
- Heading: `"Why it matters"` — Space Grotesk, medium weight
- 4 bullet facts (muted text, small size):
  - "75% of users judge a brand's credibility by its website design"
  - "First impressions form in as little as 0.05 seconds"
  - "38% of users stop engaging with a site if the layout is unattractive"
  - "A well-designed site can increase conversion rates by up to 200%"

### Background
No solid background. The global `body::before` aurora shows through. The section has `bg-transparent`.

### Nav
The transparent frosted nav remains visible (`position: fixed`, `z-50`). At this point scroll progress is past 0.46 so nav is in dark-text mode.

---

## 6. Phase 3 — WorkTeaser (`components/work-teaser.tsx`)

Existing component — **no structural changes**.

The only change is the aurora color update in `globals.css` (Section 3a), which automatically fixes the background to match the brand aura.

Projects data (`lib/projects.ts`) remains: Maple & Co (Restaurant), Northfield Law (Legal Services), Bloom Studio (Photography).

---

## 7. Phase 4 — CTA (`components/cta.tsx`)

Existing component — **no structural changes**.

Same aurora background fix applies. The two pill buttons already match the PRD:
- Primary (dark): `hello@cjstudio.co.uk →`
- Secondary (outline): `See our work`

---

## 8. Footer (`components/footer.tsx`)

Update the nav links array to match the PRD spec (same as Section 3b):
```
Home / Our Work / About us / Our services / Contact Us / Privacy & Policy
```

Logo and copyright text remain unchanged.

---

## 9. File Manifest

| Action | File |
|---|---|
| Copy asset | `public/assets/hero-master.png` |
| Modify | `app/globals.css` — aurora colors |
| Modify | `app/page.tsx` — new orchestrator |
| New | `components/laptop-zoom.tsx` |
| New | `components/why-it-matters.tsx` |
| Modify | `components/nav.tsx` — links + onLight prop |
| Modify | `components/footer.tsx` — links |
| No change | `components/work-teaser.tsx` |
| No change | `components/cta.tsx` |

---

## 10. Out of Scope

- Mobile-specific scroll behavior for the zoom and horizontal sections (Phase 1 & 2 show a simplified static layout on mobile)
- The "About us" and "Process" pages (separate spec)
- Real project images (placeholder Picsum images remain for now)
- Contact form wiring (already handled in existing `actions/send-enquiry.ts`)
