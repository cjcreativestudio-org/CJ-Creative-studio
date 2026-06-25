# Homepage Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the CJ Creative Studio homepage from a warm editorial layout to a cinematic dark/light monochrome showcase with scroll-driven animations, character-stagger text, mask reveals, and device-framed work mockups.

**Architecture:** Each homepage section component is updated independently. Three new primitive animation components (`scroll-river`, `char-reveal`, `mask-reveal`) are built first and consumed by the section rewrites. The video background for Differentiators uses a plain `<video>` tag with a Higgsfield-generated asset.

**Tech Stack:** Next.js 16 App Router · motion/react (`useScroll`, `useTransform`, `useInView`, `useReducedMotion`, `motion.div`, `motion.span`) · Tailwind v4 · TypeScript (zero errors enforced)

---

## Task 1: MaskReveal primitive

**Files:**
- Create: `components/mask-reveal.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MaskReveal({
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
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        initial={reduced ? false : { y: "110%" }}
        animate={reduced ? {} : inView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 0.75, ease: EXPO, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: TypeScript check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 3: Commit**

```bash
git add components/mask-reveal.tsx
git commit -m "feat: add MaskReveal primitive animation component"
```

---

## Task 2: CharReveal primitive

**Files:**
- Create: `components/char-reveal.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CharReveal({
  text,
  className,
  delay = 0,
  charDelay = 0.02,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  charDelay?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  const chars = text.split("");

  const MotionTag = motion[Tag] as typeof motion.span;

  return (
    <MotionTag ref={ref as React.RefObject<HTMLSpanElement>} className={className} aria-label={text}>
      {reduced
        ? text
        : chars.map((char, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "110%", opacity: 0 }}
                animate={
                  inView
                    ? { y: "0%", opacity: 1 }
                    : { y: "110%", opacity: 0 }
                }
                transition={{
                  duration: 0.6,
                  ease: EXPO,
                  delay: delay + i * charDelay,
                }}
              >
                {char === " " ? " " : char}
              </motion.span>
            </span>
          ))}
    </MotionTag>
  );
}
```

- [ ] **Step 2: TypeScript check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 3: Commit**

```bash
git add components/char-reveal.tsx
git commit -m "feat: add CharReveal character-stagger animation primitive"
```

---

## Task 3: ScrollRiver component

**Files:**
- Create: `components/scroll-river.tsx`
- Modify: `components/home-client.tsx`

- [ ] **Step 1: Create the scroll river**

```tsx
"use client";

import { useScroll, useTransform, motion } from "motion/react";

export default function ScrollRiver() {
  const { scrollYProgress } = useScroll();
  const scaleY = useTransform(scrollYProgress, [0, 0.95], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.93, 1], [1, 0]);

  return (
    <div
      className="fixed left-6 top-0 bottom-0 z-50 hidden md:flex flex-col"
      aria-hidden="true"
    >
      <div className="relative flex-1 w-[2px] bg-transparent overflow-hidden my-8">
        <motion.div
          className="absolute inset-x-0 top-0 bg-current"
          style={{
            scaleY,
            opacity,
            originY: "top",
            height: "100%",
            color: "inherit",
          }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add to home-client.tsx**

Replace the contents of `components/home-client.tsx` with:

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
import ScrollRiver from "@/components/scroll-river";

export default function HomeClient() {
  return (
    <div>
      <ScrollRiver />
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

- [ ] **Step 3: TypeScript check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 4: Commit**

```bash
git add components/scroll-river.tsx components/home-client.tsx
git commit -m "feat: add ScrollRiver scroll-progress indicator"
```

---

## Task 4: Hero — dark bg + character stagger

**Files:**
- Modify: `components/home-hero.tsx`

- [ ] **Step 1: Rewrite home-hero.tsx**

```tsx
"use client";

import Link from "next/link";
import CharReveal from "@/components/char-reveal";
import MaskReveal from "@/components/mask-reveal";
import { motion, useReducedMotion } from "motion/react";

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HomeHero() {
  const reduced = useReducedMotion();

  return (
    <section
      className="bg-[#0a0a0a] text-[#f0f0f0] min-h-svh flex flex-col justify-center px-6 pt-20 pb-16 text-river-dark"
      aria-label="Homepage hero"
    >
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Kicker */}
        <div className="flex items-center justify-between mb-12">
          <MaskReveal delay={0.1}>
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#666]">
              Web Design Studio
            </span>
          </MaskReveal>
          <MaskReveal delay={0.15}>
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#666]">
              CJ Creative Studio
            </span>
          </MaskReveal>
        </div>

        {/* Display heading — character stagger */}
        <div
          className="text-[clamp(3.2rem,8.5vw,8.5rem)] leading-[0.9] mb-12"
          style={{ fontFamily: "var(--font-archivo-black)" }}
        >
          <CharReveal
            text="Your website should"
            as="h1"
            delay={0.2}
            charDelay={0.018}
            className="block"
          />
          <CharReveal
            text="win you customers."
            as="h1"
            delay={0.55}
            charDelay={0.018}
            className="block"
          />
          <CharReveal
            text="Not lose them."
            as="h1"
            delay={0.85}
            charDelay={0.018}
            className="block"
          />
        </div>

        {/* Body + CTA */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.p
            className="max-w-[360px] text-[15px] leading-[1.7] text-[#888] font-serif"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EXPO, delay: 1.3 }}
          >
            We rebuild outdated, broken, and missing websites for small and
            medium businesses — fast, reliable, handcrafted.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EXPO, delay: 1.5 }}
          >
            <Link
              href="#selected-work"
              className="inline-block border border-[#f0f0f0] px-8 py-4 text-[13px] tracking-[0.12em] uppercase text-[#f0f0f0] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#f0f0f0] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0a0a0a]"
            >
              View our work →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: TypeScript check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 3: Commit**

```bash
git add components/home-hero.tsx
git commit -m "feat: hero — dark bg, character-stagger headline, mask kicker"
```

---

## Task 5: Problem section — light bg + stagger reveals

**Files:**
- Modify: `components/home-problem.tsx`

- [ ] **Step 1: Read current file**

Read `components/home-problem.tsx` to understand existing copy and structure.

- [ ] **Step 2: Rewrite home-problem.tsx**

Replace with:

```tsx
"use client";

import { useRef } from "react";
import { useInView, useReducedMotion, motion } from "motion/react";
import MaskReveal from "@/components/mask-reveal";

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const problems = [
  {
    index: "01",
    heading: "It doesn't work on mobile.",
    body: "Over 60% of web traffic is mobile. If your site breaks on a phone, you're handing customers to your competitors.",
  },
  {
    index: "02",
    heading: "It looks like it was built in 2009.",
    body: "An outdated site signals an inactive business. First impressions are made in milliseconds.",
  },
  {
    index: "03",
    heading: "Nobody can find it.",
    body: "If you don't appear in local search, you don't exist to the people who need you most.",
  },
];

function ProblemItem({
  index,
  heading,
  body,
  i,
}: {
  index: string;
  heading: string;
  body: string;
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <div
      ref={ref}
      className="border-b border-[#ddd] py-10 grid grid-cols-[3rem_1fr] md:grid-cols-[6rem_1fr] gap-6 md:gap-12 items-start"
    >
      <MaskReveal delay={i * 0.12}>
        <span
          className="text-[13px] tracking-[0.18em] text-[#bbb]"
          aria-hidden="true"
        >
          {index}
        </span>
      </MaskReveal>
      <div className="flex flex-col gap-3">
        <MaskReveal delay={i * 0.12 + 0.08}>
          <h3
            className="text-[clamp(1.4rem,3.5vw,2.8rem)] leading-[1.1] text-[#0d0d0d]"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            {heading}
          </h3>
        </MaskReveal>
        <motion.p
          className="text-[15px] leading-[1.7] text-[#555] font-serif max-w-[520px]"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={reduced ? {} : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, ease: EXPO, delay: i * 0.12 + 0.2 }}
        >
          {body}
        </motion.p>
      </div>
    </div>
  );
}

export default function HomeProblem() {
  return (
    <section
      className="bg-[#f5f5f5] text-[#0d0d0d] text-river-light px-6 py-24"
      aria-label="The problem"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-12">
          <MaskReveal>
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#aaa]">
              The Problem
            </span>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2
              className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] mt-4"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Most small business
              <br />
              websites are broken.
            </h2>
          </MaskReveal>
        </div>
        {problems.map(({ index, heading, body }, i) => (
          <ProblemItem key={index} index={index} heading={heading} body={body} i={i} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: TypeScript check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 4: Commit**

```bash
git add components/home-problem.tsx
git commit -m "feat: problem section — light bg, per-item stagger mask reveals"
```

---

## Task 6: Differentiators — dark bg + video background

**Files:**
- Modify: `components/home-differentiators.tsx`

Note: The video file `/public/assets/video/geo-dark-loop.mp4` will be generated via Higgsfield MCP separately. Add a placeholder for now — the component will still render correctly without it (video tag will simply show nothing if file absent).

- [ ] **Step 1: Rewrite home-differentiators.tsx**

```tsx
"use client";

import { useRef } from "react";
import { useInView, useReducedMotion, motion } from "motion/react";
import MaskReveal from "@/components/mask-reveal";

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

function DiffCard({
  index,
  title,
  body,
  i,
}: {
  index: string;
  title: string;
  body: string;
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <div
      ref={ref}
      className="border border-[#333] p-8 md:p-10 flex flex-col justify-between min-h-[240px] backdrop-blur-sm bg-[rgba(10,10,10,0.6)]"
    >
      <MaskReveal delay={i * 0.12}>
        <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">
          {index}
        </span>
      </MaskReveal>
      <div className="flex flex-col gap-3 mt-auto">
        <MaskReveal delay={i * 0.12 + 0.1}>
          <h3
            className="text-[clamp(1.8rem,3vw,3rem)] leading-[1] text-[#f0f0f0]"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            {title}
          </h3>
        </MaskReveal>
        <motion.p
          className="text-[14px] leading-[1.7] text-[#888] font-serif"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={reduced ? {} : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, ease: EXPO, delay: i * 0.12 + 0.22 }}
        >
          {body}
        </motion.p>
      </div>
    </div>
  );
}

export default function HomeDifferentiators() {
  return (
    <section
      className="relative bg-[#0a0a0a] text-[#f0f0f0] px-6 py-24 overflow-hidden text-river-dark"
      aria-label="How we're different"
    >
      {/* Geometric video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12] pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/assets/video/geo-dark-loop.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
          <MaskReveal>
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#666] mt-2 whitespace-nowrap">
              How We&rsquo;re Different
            </span>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2
              className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#f0f0f0] md:text-right"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Built for businesses,
              <br />
              not award shows.
            </h2>
          </MaskReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#333]">
          {differentiators.map(({ index, title, body }, i) => (
            <DiffCard key={index} index={index} title={title} body={body} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create video placeholder directory**

```bash
mkdir -p public/assets/video
```

- [ ] **Step 3: TypeScript check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 4: Commit**

```bash
git add components/home-differentiators.tsx
git commit -m "feat: differentiators — dark bg, stagger cards, geo video background slot"
```

---

## Task 7: Work section — light bg + device frames + alternating slide-in

**Files:**
- Modify: `components/home-work.tsx`

- [ ] **Step 1: Rewrite home-work.tsx**

```tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView, useReducedMotion, motion } from "motion/react";
import MaskReveal from "@/components/mask-reveal";

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const projects = [
  {
    slug: "range-shipping",
    img: "/assets/work/range-shipping.png",
    name: "Range Shipping",
    category: "Logistics / Maritime",
    outcome: "An institutional-grade site for a 47-year dry-bulk operator.",
  },
  {
    slug: "la-roofing",
    img: "/assets/work/la-roofing.png",
    name: "LA Roofing",
    category: "Local Trades",
    outcome: "Instant quote calculator, paired with a 4.9-star reputation.",
  },
  {
    slug: "taste-of-portugal",
    img: "/assets/work/taste-of-portugal.png",
    name: "Taste of Portugal",
    category: "Hospitality / Restaurant",
    outcome: "One site, two identities — morning pastelaria, evening restaurant.",
  },
];

function ProjectCard({
  slug,
  img,
  name,
  category,
  outcome,
  fromLeft,
}: {
  slug: string;
  img: string;
  name: string;
  category: string;
  outcome: string;
  fromLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, x: fromLeft ? -80 : 80 }}
      animate={reduced ? {} : inView ? { opacity: 1, x: 0 } : { opacity: 0, x: fromLeft ? -80 : 80 }}
      transition={{ duration: 0.8, ease: EXPO }}
    >
      <Link
        href={`/work?project=${slug}`}
        className="group block"
        aria-label={`View ${name} project`}
      >
        {/* Device frame */}
        <div className="border border-[#e0e0e0] rounded-sm overflow-hidden transition-[box-shadow,transform] duration-300 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:shadow-xl [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-1">
          {/* Browser chrome */}
          <div className="bg-[#f0f0f0] border-b border-[#e0e0e0] px-3 py-2 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          {/* Screenshot */}
          <div className="relative w-full overflow-hidden" style={{ height: "220px" }}>
            <Image
              src={img}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-top"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[#0a0a0a] opacity-0 transition-opacity duration-300 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-20 flex items-center justify-center">
              <span className="text-white text-[13px] tracking-[0.12em] uppercase opacity-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 transition-opacity duration-300">
                View project →
              </span>
            </div>
          </div>
        </div>
        {/* Meta */}
        <div className="pt-5 flex flex-col gap-1.5">
          <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">
            {category}
          </span>
          <h3
            className="text-[20px] font-bold italic text-[#0d0d0d] font-serif"
          >
            {name}
          </h3>
          <p className="text-[14px] leading-relaxed text-[#666]">{outcome}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function HomeWork() {
  return (
    <section
      id="selected-work"
      className="bg-[#f5f5f5] text-river-light px-6 py-24"
      aria-label="Selected work"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
          <MaskReveal>
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#aaa] mt-2 whitespace-nowrap">
              Selected Work
            </span>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2
              className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] md:text-right"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Real businesses.
              <br />
              Real results.
            </h2>
          </MaskReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {projects.map(({ slug, img, name, category, outcome }, i) => (
            <ProjectCard
              key={slug}
              slug={slug}
              img={img}
              name={name}
              category={category}
              outcome={outcome}
              fromLeft={i % 2 === 0}
            />
          ))}
        </div>

        <div className="flex justify-end">
          <Link
            href="/work"
            className="inline-block border border-[#0d0d0d] px-8 py-4 text-[13px] tracking-[0.12em] uppercase text-[#0d0d0d] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d0d0d] [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
          >
            See full case study →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: TypeScript check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 3: Commit**

```bash
git add components/home-work.tsx
git commit -m "feat: work section — device frames, alternating slide-in animations"
```

---

## Task 8: Process — SVG connector line draw

**Files:**
- Modify: `components/home-process.tsx`

- [ ] **Step 1: Read current file**

Read `components/home-process.tsx` to get existing copy.

- [ ] **Step 2: Rewrite home-process.tsx**

```tsx
"use client";

import { useRef } from "react";
import { useInView, useReducedMotion, motion } from "motion/react";
import MaskReveal from "@/components/mask-reveal";

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const steps = [
  {
    number: "1",
    title: "Discovery",
    body: "We learn your business, your audience, and what success looks like before touching a single pixel.",
  },
  {
    number: "2",
    title: "Design",
    body: "Handcrafted to your brand. You see it before it's built — no surprises.",
  },
  {
    number: "3",
    title: "Launch",
    body: "Live in weeks, not months. We handle the technical handoff and stay on call.",
  },
];

function ProcessStep({
  number,
  title,
  body,
  delay,
}: {
  number: string;
  title: string;
  body: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <MaskReveal delay={delay}>
        <span
          className="text-[clamp(3rem,5vw,5rem)] leading-[1] text-[#ddd]"
          style={{ fontFamily: "var(--font-archivo-black)" }}
          aria-hidden="true"
        >
          {number}
        </span>
      </MaskReveal>
      <MaskReveal delay={delay + 0.1}>
        <h3
          className="text-[22px] font-bold italic text-[#0d0d0d] font-serif"
        >
          {title}
        </h3>
      </MaskReveal>
      <motion.p
        className="text-[14px] leading-[1.7] text-[#666] font-serif"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={reduced ? {} : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.6, ease: EXPO, delay: delay + 0.22 }}
      >
        {body}
      </motion.p>
    </div>
  );
}

export default function HomeProcess() {
  const lineRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(sectionRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      className="bg-[#f5f5f5] text-river-light px-6 py-24"
      aria-label="Our process"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-16">
          <MaskReveal>
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#aaa]">
              How It Works
            </span>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2
              className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] mt-4"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Three steps.
              <br />
              No surprises.
            </h2>
          </MaskReveal>
        </div>

        {/* SVG connector — desktop only */}
        <div className="hidden md:block mb-12" ref={sectionRef} aria-hidden="true">
          <svg width="100%" height="2" viewBox="0 0 1 1" preserveAspectRatio="none">
            <path
              ref={lineRef}
              d="M0,0.5 L1,0.5"
              stroke="#ccc"
              strokeWidth="0.002"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d="M0,0.5 L1,0.5"
              stroke="#0d0d0d"
              strokeWidth="0.002"
              fill="none"
              vectorEffect="non-scaling-stroke"
              initial={reduced ? false : { pathLength: 0 }}
              animate={reduced ? {} : inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.2, ease: EXPO }}
            />
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {steps.map(({ number, title, body }, i) => (
            <ProcessStep
              key={number}
              number={number}
              title={title}
              body={body}
              delay={0.3 + i * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: TypeScript check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 4: Commit**

```bash
git add components/home-process.tsx
git commit -m "feat: process section — SVG connector line draw, stagger step reveals"
```

---

## Task 9: Testimonials — dark bg + large quote reveals

**Files:**
- Modify: `components/home-testimonials.tsx`

- [ ] **Step 1: Read current file**

Read `components/home-testimonials.tsx` to get existing quotes.

- [ ] **Step 2: Rewrite home-testimonials.tsx**

```tsx
"use client";

import { useRef } from "react";
import { useInView, useReducedMotion, motion } from "motion/react";
import MaskReveal from "@/components/mask-reveal";

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const testimonials = [
  {
    quote:
      "We went from embarrassed to send people to our site, to it being the first thing we mention in pitches.",
    name: "James L.",
    business: "Range Shipping",
  },
  {
    quote:
      "Done in two weeks, exactly what we asked for, and the phone hasn't stopped since.",
    name: "Lee A.",
    business: "LA Roofing",
  },
];

function TestimonialItem({
  quote,
  name,
  business,
  delay,
}: {
  quote: string;
  name: string;
  business: string;
  delay: number;
}) {
  const ref = useRef<HTMLBlockquoteElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  // Split quote into lines of roughly 6 words each for line-by-line reveal
  const words = quote.split(" ");
  const chunkSize = 6;
  const lines: string[] = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    lines.push(words.slice(i, i + chunkSize).join(" "));
  }

  return (
    <blockquote
      ref={ref}
      className="border-t border-[#333] pt-10 pb-14"
    >
      <p
        className="text-[clamp(1.6rem,3.2vw,3rem)] leading-[1.25] italic font-serif text-[#f0f0f0] mb-8"
        aria-label={quote}
      >
        {reduced
          ? `"${quote}"`
          : lines.map((line, i) => (
              <MaskReveal key={i} delay={delay + i * 0.1}>
                <span className="block">
                  {i === 0 ? `"${line}` : line}
                  {i === lines.length - 1 ? '"' : ""}
                </span>
              </MaskReveal>
            ))}
      </p>
      <motion.footer
        className="flex flex-col gap-0.5"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={reduced ? {} : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.6, ease: EXPO, delay: delay + lines.length * 0.1 + 0.1 }}
      >
        <cite className="not-italic text-[13px] tracking-[0.1em] text-[#f0f0f0]">
          {name}
        </cite>
        <span className="text-[12px] tracking-[0.1em] text-[#666]">
          {business}
        </span>
      </motion.footer>
    </blockquote>
  );
}

export default function HomeTestimonials() {
  return (
    <section
      className="bg-[#0a0a0a] text-river-dark px-6 py-24"
      aria-label="Client testimonials"
    >
      <div className="max-w-[1280px] mx-auto">
        <MaskReveal>
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#666] block mb-4">
            What Clients Say
          </span>
        </MaskReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-16">
          {testimonials.map(({ quote, name, business }, i) => (
            <TestimonialItem
              key={name}
              quote={quote}
              name={name}
              business={business}
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: TypeScript check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 4: Commit**

```bash
git add components/home-testimonials.tsx
git commit -m "feat: testimonials — dark bg, large quotes, line-by-line mask reveal"
```

---

## Task 10: CTA — dark bg + giant mask-reveal headline

**Files:**
- Modify: `components/home-final-cta.tsx`

- [ ] **Step 1: Read current file**

Read `components/home-final-cta.tsx` to get existing copy and structure.

- [ ] **Step 2: Rewrite home-final-cta.tsx**

```tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import MaskReveal from "@/components/mask-reveal";

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HomeFinalCta() {
  const reduced = useReducedMotion();

  return (
    <section
      className="bg-[#0a0a0a] text-[#f0f0f0] min-h-svh flex flex-col justify-center px-6 py-24 text-river-dark"
      aria-label="Call to action"
    >
      <div className="max-w-[1280px] mx-auto w-full">
        <MaskReveal>
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#666] block mb-10">
            Available through Summer 2026
          </span>
        </MaskReveal>

        <div
          className="text-[clamp(4rem,10vw,11rem)] leading-[0.88] mb-14"
          style={{ fontFamily: "var(--font-archivo-black)" }}
        >
          <MaskReveal delay={0.1}>
            <span className="block">Let&rsquo;s build</span>
          </MaskReveal>
          <MaskReveal delay={0.22}>
            <span className="block">something</span>
          </MaskReveal>
          <MaskReveal delay={0.34}>
            <span className="block">great.</span>
          </MaskReveal>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EXPO, delay: 0.7 }}
        >
          <Link
            href="/contact"
            className="inline-block border border-[#f0f0f0] px-10 py-5 text-[14px] tracking-[0.14em] uppercase text-[#f0f0f0] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#f0f0f0] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0a0a0a]"
          >
            Start a project →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: TypeScript check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 4: Commit**

```bash
git add components/home-final-cta.tsx
git commit -m "feat: CTA — dark bg, giant line-by-line mask-reveal headline"
```

---

## Task 11: Nav + Footer — dark/light theming

**Files:**
- Modify: `components/editorial-nav.tsx`
- Modify: `components/editorial-footer.tsx`

- [ ] **Step 1: Read both files**

Read `components/editorial-nav.tsx` and `components/editorial-footer.tsx`.

- [ ] **Step 2: Update nav for dark hero**

The nav sits above the dark hero. Ensure nav background is transparent and text/links are `#f0f0f0` by default. If the nav currently has a white/light background, change `bg-white` → `bg-transparent` and text to `#f0f0f0`. Add `position: fixed` if not already, with a subtle `border-b border-[#222]` that appears on scroll (use a scroll listener with `useScroll`).

Specific change — wherever you see `bg-white` or `text-[#0d0d0d]` in the nav at its default state, replace with `bg-transparent` and `text-[#f0f0f0]`. Keep the logo rendering correctly.

- [ ] **Step 3: Update footer**

Footer should be `bg-[#0a0a0a]` with `text-[#666]` for links and `text-[#333]` for borders. If it currently uses light colors, swap them.

- [ ] **Step 4: TypeScript check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 5: Commit**

```bash
git add components/editorial-nav.tsx components/editorial-footer.tsx
git commit -m "feat: nav + footer — dark theme, transparent nav over hero"
```

---

## Task 12: Generate geometric video via Higgsfield

**Files:**
- Create: `public/assets/video/geo-dark-loop.mp4`

- [ ] **Step 1: Generate via Higgsfield MCP**

Use the Higgsfield MCP tool to generate a looping abstract geometric video. Prompt guidance:
- Style: Dark, minimal, abstract geometric shapes — slow rotation, subtle grain, near-black background
- Duration: 10–15 seconds, seamlessly loopable
- Mood: Quiet, cinematic, premium — no text, no people, no bright colours
- Resolution: 1080p or 720p

- [ ] **Step 2: Compress to under 4MB**

```bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow -vf "scale=1280:-2" -movflags faststart public/assets/video/geo-dark-loop.mp4
```

- [ ] **Step 3: Commit**

```bash
git add public/assets/video/geo-dark-loop.mp4
git commit -m "asset: add geometric dark loop video for differentiators bg"
```

---

## Task 13: Final TypeScript check, visual review, deploy

- [ ] **Step 1: Full TypeScript check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 2: Dev server visual check**

Run: `npm run dev`
Open `http://localhost:3000` and verify:
- Hero: dark bg, character stagger fires on load
- Scroll river appears left side on desktop, grows as you scroll
- Problem: light bg contrast switch, items stagger on scroll
- Differentiators: dark bg, video background visible at low opacity
- Work: light bg, device frames, alternating slide-in
- Process: SVG line draws, steps stagger after
- Testimonials: dark bg, large quotes, line-by-line reveal
- CTA: dark bg, giant text, line-by-line reveal
- `prefers-reduced-motion`: all animations skip (test in OS settings)
- Mobile: river hidden, all sections readable and animated

- [ ] **Step 3: Push and deploy**

```bash
git push origin main
```

Vercel auto-deploys on push to main. Verify at https://www.cjcreativestudio.com within ~2 minutes.
