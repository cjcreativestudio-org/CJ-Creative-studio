# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage's dark video hero and crypto/robotics placeholder carousel with a cream/Archivo Black editorial homepage that answers the "10 questions a homepage should answer," matching the design system already built on `/about` and `/services`.

**Architecture:** Seven new presentational components (`HomeHero`, `HomeProblem`, `HomeDifferentiators`, `HomeWork`, `HomeProcess`, `HomeTestimonials`, `HomeFinalCta`), one shared `Reveal` scroll-animation component, composed in order inside `components/home-client.tsx` in place of `HeroMediaPlane` and `PortfolioCarousel`.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind v4 (inline utility classes, no separate CSS files), `motion/react` for the existing `Reveal` scroll-in animation pattern. No test framework is configured in this repo — verification uses `npx tsc --noEmit`, `npm run lint`, and `npm run build`.

**Note on content:** All Selected Work and Testimonials content in this plan is **explicitly illustrative placeholder data** (per the approved spec) representing believable SMB examples. It is marked with a comment in code and is expected to be swapped for real client work in a future task — not part of this plan's scope.

---

## File Structure

| File | Responsibility |
|---|---|
| `components/reveal.tsx` (new) | Shared fade+rise scroll-in-view animation wrapper, extracted from dead code in `home-client.tsx` so new sections can reuse it. |
| `components/home-hero.tsx` (new) | Section 1: cream hero — what we do, who for, primary CTA. |
| `components/home-problem.tsx` (new) | Section 2: the problem — symptoms of an outdated site. |
| `components/home-differentiators.tsx` (new) | Section 3: why CJ Creative Studio — fast/reliable/handcrafted. |
| `components/home-work.tsx` (new) | Section 4: selected work grid (placeholder SMB case studies) + secondary CTA. |
| `components/home-process.tsx` (new) | Section 5: condensed 3-step process. |
| `components/home-testimonials.tsx` (new) | Section 6: placeholder testimonial cards. |
| `components/home-final-cta.tsx` (new) | Section 7: repeat CTA + freshness signal. |
| `components/home-client.tsx` (modify) | Composes all sections in order; drops `HeroMediaPlane`/`PortfolioCarousel` imports. |

`components/hero-media-plane.tsx` and `components/portfolio-carousel.tsx` are left in place, unused — not deleted (per spec, out of scope).

---

## Task 1: Extract `Reveal` into its own shared component

**Files:**
- Create: `components/reveal.tsx`
- Modify: `components/home-client.tsx`

The current `Reveal` function in `home-client.tsx` is defined but never actually used in the rendered JSX — it's dead code. This task moves it to its own file so the new section components (Tasks 3, 4, 6, 7) can import and use it for real.

- [ ] **Step 1: Create `components/reveal.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";

// ease-out-expo — decisive, editorial
const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Fade + rise on scroll into view.
 * Immediately visible (no opacity gate) when prefers-reduced-motion is set.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={
        reduced
          ? {}
          : inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 20 }
      }
      transition={{ duration: 0.65, ease: EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Remove the now-duplicated `Reveal` definition and its unused imports from `components/home-client.tsx`**

Replace the entire contents of `components/home-client.tsx` with:

```tsx
import EditorialNav from "@/components/editorial-nav";
import EditorialFooter from "@/components/editorial-footer";
import HeroMediaPlane from "@/components/hero-media-plane";
import PortfolioCarousel from "@/components/portfolio-carousel";

export default function HomeClient() {
  return (
    <div className="bg-white">
      <EditorialNav />

      <HeroMediaPlane />
      <PortfolioCarousel />

      <EditorialFooter />
    </div>
  );
}
```

(This is a deliberate intermediate state — `HeroMediaPlane`/`PortfolioCarousel` are still wired up here and get swapped out in Task 9. This step only removes dead code and the now-unnecessary `"use client"` directive, since this file no longer uses any hooks directly.)

- [ ] **Step 3: Verify types and lint pass**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors (warnings about other pre-existing files are fine; there should be none for `home-client.tsx` or `reveal.tsx`).

- [ ] **Step 4: Commit**

```bash
git add components/reveal.tsx components/home-client.tsx
git commit -m "Extract Reveal scroll animation into shared component"
```

---

## Task 2: Build `HomeHero`

**Files:**
- Create: `components/home-hero.tsx`

- [ ] **Step 1: Create the component**

```tsx
import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="bg-[#f0ece3] pt-14" aria-label="Homepage hero">
      <div className="px-6 pt-12 pb-16">
        {/* Kicker row */}
        <div className="flex items-center justify-between mb-10">
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400">
            Web Design Studio
          </span>
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400">
            CJ Creative Studio
          </span>
        </div>

        {/* Display heading */}
        <h1
          className="text-[clamp(3rem,8.5vw,8rem)] leading-[0.9] text-[#0d0d0d] mb-10"
          style={{ fontFamily: "var(--font-archivo-black)" }}
        >
          Your website should
          <br />
          win you customers.
          <br />
          Not lose them.
        </h1>

        {/* Rule + body */}
        <div className="flex items-start gap-8 mb-10">
          <div className="w-10 border-t-[2px] border-[#0d0d0d] mt-2 shrink-0" />
          <p className="max-w-[340px] text-[15px] leading-[1.65] text-gray-600 font-serif">
            We rebuild outdated, broken, and missing websites for small and
            medium businesses &mdash; fast, reliable, handcrafted.
          </p>
        </div>

        <Link
          href="#selected-work"
          className="inline-block border border-[#0d0d0d] px-8 py-4 text-[13px] tracking-[0.12em] uppercase text-[#0d0d0d] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d0d0d] [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
        >
          View our work &rarr;
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify types and lint pass**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home-hero.tsx
git commit -m "Add HomeHero section component"
```

---

## Task 3: Build `HomeProblem`

**Files:**
- Create: `components/home-problem.tsx`

- [ ] **Step 1: Create the component**

```tsx
import Reveal from "@/components/reveal";

const symptoms = [
  {
    index: "01",
    title: "Looks outdated on phones",
    body: "Most visitors arrive on a phone. A site that wasn't built for one loses them in seconds.",
  },
  {
    index: "02",
    title: "Hasn't changed in years",
    body: "An old copyright date or a stale design tells visitors the business might not be active anymore.",
  },
  {
    index: "03",
    title: "Doesn't show up when people search",
    body: "If your site can't be found, it doesn't matter how good it looks once someone gets there.",
  },
];

export default function HomeProblem() {
  return (
    <section className="bg-white px-6 py-24" aria-label="The problem">
      <div className="max-w-[1280px] mx-auto">
        {/* Header row */}
        <div className="grid grid-cols-[auto_1fr] gap-x-8 items-start mb-16">
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-2 whitespace-nowrap">
            The Problem
          </span>
          <h2
            className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] text-right"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            An outdated site is
            <br />
            a closed sign on your door.
          </h2>
        </div>

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-200">
            {symptoms.map(({ index, title, body }) => (
              <div
                key={index}
                className="border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0 p-8 flex flex-col justify-between"
                style={{ minHeight: "220px" }}
              >
                <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">
                  {index}
                </span>
                <div className="flex flex-col gap-2 mt-auto">
                  <h3 className="text-[17px] font-bold italic text-[#1a1a1a] font-serif">
                    {title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-gray-500">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify types and lint pass**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home-problem.tsx
git commit -m "Add HomeProblem section component"
```

---

## Task 4: Build `HomeDifferentiators`

**Files:**
- Create: `components/home-differentiators.tsx`

- [ ] **Step 1: Create the component**

```tsx
import Reveal from "@/components/reveal";

const differentiators = [
  {
    index: "01",
    title: "Fast",
    body: "A turnaround you can plan around — no open-ended timelines, no disappearing for months.",
  },
  {
    index: "02",
    title: "Reliable",
    body: "Fixed scope, fixed price. What we agree on at the start is what you get at the end.",
  },
  {
    index: "03",
    title: "Handcrafted",
    body: "Boutique design, built for your business — not a template with your logo dropped in.",
  },
];

export default function HomeDifferentiators() {
  return (
    <section className="bg-[#f0ece3] px-6 py-24" aria-label="How we're different">
      <div className="max-w-[1280px] mx-auto">
        {/* Header row */}
        <div className="grid grid-cols-[auto_1fr] gap-x-8 items-start mb-16">
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-2 whitespace-nowrap">
            How We&rsquo;re Different
          </span>
          <h2
            className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] text-right"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Built for businesses,
            <br />
            not award shows.
          </h2>
        </div>

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-300 bg-white">
            {differentiators.map(({ index, title, body }) => (
              <div
                key={index}
                className="border-b md:border-b-0 md:border-r border-gray-300 last:border-r-0 p-8 flex flex-col justify-between"
                style={{ minHeight: "220px" }}
              >
                <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">
                  {index}
                </span>
                <div className="flex flex-col gap-2 mt-auto">
                  <h3 className="text-[17px] font-bold italic text-[#1a1a1a] font-serif">
                    {title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-gray-500">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify types and lint pass**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home-differentiators.tsx
git commit -m "Add HomeDifferentiators section component"
```

---

## Task 5: Build `HomeWork`

**Files:**
- Create: `components/home-work.tsx`

This section replaces the dark `PortfolioCarousel`. No real client work exists yet — content is explicitly marked as illustrative placeholder, in a swappable data array, per the approved spec.

- [ ] **Step 1: Create the component**

```tsx
import Link from "next/link";
import Reveal from "@/components/reveal";

// Illustrative placeholder case studies — swap for real client work later.
const projects = [
  {
    id: "01",
    name: "Riverside Joinery",
    category: "Local Trades",
    outcome: "Booking requests up — finally found on Google.",
  },
  {
    id: "02",
    name: "Marlowe & Finch",
    category: "Retail",
    outcome: "A site customers actually browse on their phones.",
  },
  {
    id: "03",
    name: "The Old Mill Kitchen",
    category: "Hospitality",
    outcome: "Online bookings replaced a phone-only waitlist.",
  },
];

export default function HomeWork() {
  return (
    <section
      id="selected-work"
      className="bg-white px-6 py-24"
      aria-label="Selected work"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header row */}
        <div className="grid grid-cols-[auto_1fr] gap-x-8 items-start mb-16">
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-2 whitespace-nowrap">
            Selected Work
          </span>
          <h2
            className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] text-right"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Real businesses.
            <br />
            Real results.
          </h2>
        </div>

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {projects.map(({ id, name, category, outcome }) => (
              <div
                key={id}
                className="border border-gray-200 flex flex-col transition-[border-color] duration-[200ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:border-gray-400"
              >
                <div
                  className="bg-[#f0ece3] flex items-center justify-center"
                  style={{ height: "180px" }}
                  aria-hidden="true"
                >
                  <span className="text-[13px] tracking-[0.18em] uppercase text-gray-400">
                    {category}
                  </span>
                </div>
                <div className="p-8 flex flex-col gap-3">
                  <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">
                    {id}
                  </span>
                  <h3 className="text-[20px] font-bold italic text-[#1a1a1a] font-serif">
                    {name}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-gray-500">
                    {outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="flex justify-end">
          <Link
            href="/work"
            className="inline-block border border-[#0d0d0d] px-8 py-4 text-[13px] tracking-[0.12em] uppercase text-[#0d0d0d] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d0d0d] [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
          >
            See full case study &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify types and lint pass**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home-work.tsx
git commit -m "Add HomeWork section component with placeholder case studies"
```

---

## Task 6: Build `HomeProcess`

**Files:**
- Create: `components/home-process.tsx`

- [ ] **Step 1: Create the component**

```tsx
import Reveal from "@/components/reveal";

const steps = [
  {
    index: "01",
    name: "Discovery",
    description: "We map your goals, audience, and what's not working today.",
  },
  {
    index: "02",
    name: "Design",
    description: "A handcrafted site built around your business, not a template.",
  },
  {
    index: "03",
    name: "Launch",
    description: "Live, tested, and handed over — with support after launch.",
  },
];

export default function HomeProcess() {
  return (
    <section className="bg-[#f0ece3] px-6 py-24" aria-label="How it works">
      <div className="max-w-[1280px] mx-auto">
        {/* Header row */}
        <div className="grid grid-cols-[auto_1fr] gap-x-8 items-start mb-16">
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-2 whitespace-nowrap">
            How It Works
          </span>
          <h2
            className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] text-right"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Three steps from
            <br />
            brief to launch.
          </h2>
        </div>

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-300 bg-white">
            {steps.map(({ index, name, description }) => (
              <div
                key={index}
                className="border-b md:border-b-0 md:border-r border-gray-300 last:border-r-0 p-8 flex flex-col gap-3"
                style={{ minHeight: "200px" }}
              >
                <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">
                  {index}
                </span>
                <h3 className="text-[16px] font-bold italic text-[#1a1a1a] font-serif">
                  {name}
                </h3>
                <p className="text-[13px] leading-relaxed text-gray-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify types and lint pass**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home-process.tsx
git commit -m "Add HomeProcess section component"
```

---

## Task 7: Build `HomeTestimonials`

**Files:**
- Create: `components/home-testimonials.tsx`

Content is explicitly marked as illustrative placeholder, per the approved spec — swap for real testimonials later.

- [ ] **Step 1: Create the component**

```tsx
import Reveal from "@/components/reveal";

// Illustrative placeholder quotes — swap for real testimonials later.
const testimonials = [
  {
    initials: "RJ",
    name: "Riverside Joinery",
    role: "Owner",
    quote:
      "Our old site hadn't changed since 2017. CJ Studio had a new one live in weeks, and it actually brings in calls now.",
  },
  {
    initials: "MF",
    name: "Marlowe & Finch",
    role: "Owner",
    quote:
      "We didn't have a website at all before this. Now customers find us, and it looks like we know what we're doing.",
  },
];

export default function HomeTestimonials() {
  return (
    <section className="bg-white px-6 py-24" aria-label="What clients say">
      <div className="max-w-[1280px] mx-auto">
        {/* Header row */}
        <div className="grid grid-cols-[auto_1fr] gap-x-8 items-start mb-16">
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-2 whitespace-nowrap">
            What Clients Say
          </span>
          <h2
            className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] text-right"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Don&rsquo;t take
            <br />
            our word for it.
          </h2>
        </div>

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map(({ initials, name, role, quote }) => (
              <div
                key={initials}
                className="border border-gray-200 p-8 flex flex-col gap-6 transition-[border-color] duration-[200ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:border-gray-400"
              >
                <div
                  className="bg-[#f0ece3] flex items-center justify-center self-start"
                  style={{ width: "56px", height: "56px" }}
                  aria-hidden="true"
                >
                  <span
                    className="text-[14px] text-[#0d0d0d] tracking-[0.1em]"
                    style={{ fontFamily: "var(--font-archivo-black)" }}
                  >
                    {initials}
                  </span>
                </div>

                <p className="text-[15px] leading-relaxed text-gray-600 font-serif italic">
                  &ldquo;{quote}&rdquo;
                </p>

                <div className="flex flex-col gap-1">
                  <h3 className="text-[15px] font-bold text-[#1a1a1a]">{name}</h3>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-[#5b9fd6]">
                    {role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify types and lint pass**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home-testimonials.tsx
git commit -m "Add HomeTestimonials section component with placeholder quotes"
```

---

## Task 8: Build `HomeFinalCta`

**Files:**
- Create: `components/home-final-cta.tsx`

- [ ] **Step 1: Create the component**

```tsx
import Link from "next/link";

export default function HomeFinalCta() {
  return (
    <section className="bg-white px-6 py-24" aria-label="Get started">
      <div className="max-w-[1280px] mx-auto">
        {/* Header row */}
        <div className="grid grid-cols-[auto_1fr] gap-x-8 items-start mb-10">
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-2 whitespace-nowrap">
            Get Started
          </span>
          <h2
            className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] text-right"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Ready when
            <br />
            you are.
          </h2>
        </div>

        <div className="flex flex-col items-end gap-4">
          <Link
            href="/contact"
            className="inline-block border border-[#0d0d0d] px-8 py-4 text-[13px] tracking-[0.12em] uppercase text-[#0d0d0d] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d0d0d] [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
          >
            Start a project &rarr;
          </Link>
          <span className="text-[11px] tracking-[0.12em] uppercase text-gray-400">
            Currently booking — Summer 2026
          </span>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify types and lint pass**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home-final-cta.tsx
git commit -m "Add HomeFinalCta section component"
```

---

## Task 9: Wire all sections into `home-client.tsx`

**Files:**
- Modify: `components/home-client.tsx`

- [ ] **Step 1: Replace `home-client.tsx` contents**

```tsx
import EditorialNav from "@/components/editorial-nav";
import EditorialFooter from "@/components/editorial-footer";
import HomeHero from "@/components/home-hero";
import HomeProblem from "@/components/home-problem";
import HomeDifferentiators from "@/components/home-differentiators";
import HomeWork from "@/components/home-work";
import HomeProcess from "@/components/home-process";
import HomeTestimonials from "@/components/home-testimonials";
import HomeFinalCta from "@/components/home-final-cta";

export default function HomeClient() {
  return (
    <div className="bg-white">
      <EditorialNav />

      <HomeHero />
      <HomeProblem />
      <HomeDifferentiators />
      <HomeWork />
      <HomeProcess />
      <HomeTestimonials />
      <HomeFinalCta />

      <EditorialFooter />
    </div>
  );
}
```

This removes `HeroMediaPlane` and `PortfolioCarousel` from the homepage. Both components remain in `components/` unused, per the spec (not deleted).

- [ ] **Step 2: Verify types and lint pass**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors. (`hero-media-plane.tsx` and `portfolio-carousel.tsx` will not trigger unused-file lint errors since ESLint lints file contents, not cross-file usage — this is expected and fine.)

- [ ] **Step 3: Commit**

```bash
git add components/home-client.tsx
git commit -m "Wire new editorial sections into homepage, remove video hero and dark carousel"
```

---

## Task 10: Full build and visual verification

**Files:** none (verification only)

- [ ] **Step 1: Run a full production build**

Run: `npm run build`
Expected: build completes with no type or lint errors, no missing-import errors for any of the new `home-*` components.

- [ ] **Step 2: Start the dev server and visually verify in a browser**

Run: `npm run dev`

Using the Vercel agent's browser/preview tooling (not Playwright, per project convention), open `http://localhost:3000` and confirm:
- No video/image hero remains — homepage opens directly on the cream `HomeHero` section.
- All seven sections render in order: Hero → Problem → Differentiators → Selected Work → Process → Testimonials → Final CTA → Footer.
- "View our work →" in the hero scrolls to the `#selected-work` anchor.
- "See full case study →" and "Start a project →" link to `/work` and `/contact` respectively.
- Layout holds at mobile width (375px) and desktop width (1440px) — single-column cards on mobile, grid columns on desktop.

- [ ] **Step 3: Commit any final fixes found during visual verification**

If verification surfaces issues, fix them in the relevant component file(s) and commit:

```bash
git add components/<fixed-file>.tsx
git commit -m "Fix <description of visual issue found in verification>"
```

If no issues are found, no commit is needed for this task.

---

## Self-Review Notes

- **Spec coverage:** All 8 spec sections (Hero, Problem, Differentiators, Selected Work, Process, Testimonials, Final CTA, Footer) map 1:1 to Tasks 2–9. The "swappable data array" requirement for Selected Work is satisfied by the standalone `projects` const in `home-work.tsx`. The freshness signal (Q9) is in `HomeFinalCta`. `HeroMediaPlane`/`PortfolioCarousel` are explicitly kept, not deleted, per spec's out-of-scope note.
- **Placeholder scan:** No TBDs. Selected Work and Testimonials content is intentionally placeholder per the approved spec, and is labeled as such in code comments rather than left ambiguous.
- **Type consistency:** All section components are prop-less (`HomeHero()`, `HomeProblem()`, etc.) and imported identically in Task 9 as built in Tasks 2–8 — names match exactly.
