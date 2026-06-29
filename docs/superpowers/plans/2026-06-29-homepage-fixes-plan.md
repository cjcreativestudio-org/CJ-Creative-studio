# Homepage Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply five targeted changes to the CJ Studio homepage — four copy/style edits and one full component replacement (How It Works → 5-step scroll-jacked carousel) — plus removal of the Testimonials section.

**Architecture:** All changes are isolated to individual `components/home-*.tsx` files. The new `HomeProcess` component replaces the existing one in-place; `home-client.tsx` is touched only to remove `<HomeTestimonials />`. No new dependencies are introduced — the carousel reuses the same `motion/react` primitives (`useScroll`, `useTransform`) already used by `why-it-matters.tsx`.

**Tech Stack:** Next.js 16 App Router, Tailwind v4, motion/react, TypeScript (zero errors enforced)

---

## File Map

| File | Change |
|---|---|
| `components/home-problem.tsx` | Update kicker, h2, and 3 item headings + bodies |
| `components/home-differentiators.tsx` | Resize kicker + title, change title text, add subtext, replace 3 box copy |
| `components/home-work.tsx` | Replace h2 copy, add subtext below h2, remove project count `<p>` |
| `components/home-process.tsx` | Full replacement — 5-step scroll-jacked horizontal carousel with progress dots |
| `components/home-client.tsx` | Remove `<HomeTestimonials />` import and JSX |

---

## Task 1: Update Opportunity section copy (`home-problem.tsx`)

**Files:**
- Modify: `components/home-problem.tsx`

- [ ] **Step 1: Replace the `problems` array and section header copy**

Open `components/home-problem.tsx`. Replace the `problems` array (lines 9–25) with:

```typescript
const problems = [
  {
    index: "01",
    heading: "People judge you before they call.",
    body: "If you run a serious operation, a slow or outdated website doesn't just look bad—it actively kills your credibility. You lose the contract before you even get to the table.",
  },
  {
    index: "02",
    heading: "If they can't find you, you lose the job.",
    body: "It doesn't matter how good your service is if your competitors are the ones ranking on page one. We build sites that actually show up when your ideal clients are looking for a solution.",
  },
  {
    index: "03",
    heading: "Your site needs to pull its weight.",
    body: "A website shouldn't just be a digital brochure sitting there doing nothing. It should be actively answering questions, filtering out bad leads, and driving real revenue while you focus on the business.",
  },
];
```

Then in the JSX (inside `HomeProblem`), update the kicker span from `The Opportunity` to `The Standard`, and the h2 from:
```
Your digital infrastructure
<br />
should match your operational standard.
```
to:
```
Your digital presence should be as sharp
<br />
as your actual operation.
```

- [ ] **Step 2: TypeScript check**

```bash
cd C:\Users\ollie\cj-websites\cj-creative-studio && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home-problem.tsx
git commit -m "copy: humanize Opportunity section"
```

---

## Task 2: Update How We're Different section (`home-differentiators.tsx`)

**Files:**
- Modify: `components/home-differentiators.tsx`

- [ ] **Step 1: Replace `differentiators` array**

Replace the `differentiators` array (lines 8–24) with:

```typescript
const differentiators = [
  {
    index: "01",
    title: "Priced for what you actually need.",
    body: "We do not charge you for flashy animations or complex features if your business does not need them. You get a custom, fixed price based strictly on what will drive results for you, with flexible installment options to protect your cash flow.",
  },
  {
    index: "02",
    title: "Fast delivery and full ownership.",
    body: "Typical agencies take months to build a site and then trap you in expensive hosting contracts. We can launch your site in as little as one week. When it is done, you own the asset completely—we will even hand over the code if you want to host it yourself.",
  },
  {
    index: "03",
    title: "Direct access and zero radio silence.",
    body: "You will never be passed off to an account manager. You have a direct line to the founders, guaranteed 24-hour response times, and a commitment that we will keep tweaking the design until it perfectly supports your day-to-day operations.",
  },
];
```

- [ ] **Step 2: Update section header — kicker size, title size, title text, and add subtext**

In the JSX header block (the `flex flex-col gap-3 md:grid` div), make these changes:

1. Kicker `<span>`: change `text-[10px]` → `text-[13px]`
2. `<h2>`: change `text-[clamp(2.8rem,6.5vw,6rem)]` → `text-[clamp(2rem,4vw,4rem)]`, and change text from `Built for businesses,<br />not award shows.` to `Built differently.`
3. After the closing `</MaskReveal>` that wraps the h2, add a new `<MaskReveal delay={0.18}>` with a `<p>`:

```tsx
<MaskReveal delay={0.18}>
  <p className="text-[15px] leading-[1.7] text-[#888] font-serif md:text-right max-w-[44ch] md:ml-auto">
    We stripped out the agency bloat to focus on what actually matters to your business.
  </p>
</MaskReveal>
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/home-differentiators.tsx
git commit -m "copy: update How We're Different section content and sizing"
```

---

## Task 3: Update Selected Work section (`home-work.tsx`)

**Files:**
- Modify: `components/home-work.tsx`

- [ ] **Step 1: Replace h2 text**

Find the `<h2>` in `HomeWork` (around line 130) that reads:
```
Digital systems engineered
<br />
for scale and performance.
```

Replace with:
```tsx
Proven work.
```

- [ ] **Step 2: Add subtext below h2**

After the closing `</MaskReveal>` that wraps the h2, add:

```tsx
<MaskReveal delay={0.18}>
  <p className="text-[15px] leading-[1.7] text-[#888] font-serif">
    Recent projects built for operators who value efficiency and results.
  </p>
</MaskReveal>
```

- [ ] **Step 3: Remove project count line**

Delete this line (around line 156):
```tsx
<p className="text-[13px] text-[#888]">{projects.length} completed projects across trades, hospitality, and logistics.</p>
```

- [ ] **Step 4: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/home-work.tsx
git commit -m "copy: update Selected Work header and remove project count"
```

---

## Task 4: Replace How It Works with 5-step scroll-jacked carousel (`home-process.tsx`)

**Files:**
- Modify: `components/home-process.tsx` (full replacement)

- [ ] **Step 1: Write the new component**

Replace the entire contents of `components/home-process.tsx` with:

```typescript
"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "motion/react";
import MaskReveal from "@/components/mask-reveal";

const steps = [
  {
    number: "01",
    title: "The Kickoff Call",
    body: "A quick introduction to answer your questions, understand your business goals, and gather the details we need to start building your initial demo site.",
  },
  {
    number: "02",
    title: "The Demo Walkthrough",
    body: "We jump on a video call to show you a working, structural demo of your new site. We review the layout together and gather your feedback for the official draft.",
  },
  {
    number: "03",
    title: "Refinement & Strategy",
    body: "We implement your changes, add any specific features you need, and map out the logistics like hosting. We don't move to the final stage until the design is exactly what you want.",
  },
  {
    number: "04",
    title: "Final Polish",
    body: "By this stage, the site is practically finished. We do a comprehensive walkthrough of every page with you to catch any last-minute tweaks before we prepare for deployment.",
  },
  {
    number: "05",
    title: "Launch & Handover",
    body: "We launch the site and sign the final paperwork. This ensures that you have 100% legal ownership of the website and all of its assets. A perfectly smooth transaction.",
  },
];

function ProgressDots({ scrollYProgress }: { scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  return (
    <div className="flex items-center gap-3 mt-10" role="tablist" aria-label="Step progress">
      {steps.map((step, i) => {
        const start = i / steps.length;
        const end = (i + 1) / steps.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1]);
        const scale = useTransform(scrollYProgress, [start, end], [1, 1.3]);
        return (
          <motion.span
            key={step.number}
            role="tab"
            aria-label={`Step ${step.number}`}
            style={{ opacity, scale }}
            className="block w-2 h-2 rounded-full bg-[#0A2540]"
          />
        );
      })}
    </div>
  );
}

function StepCard({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div
      className="w-[85vw] md:w-[40vw] flex-shrink-0 flex flex-col gap-6 bg-[#161616] border border-[#2a2a2a] p-10 md:p-14 h-full"
      role="tabpanel"
      aria-label={`Step ${number}: ${title}`}
    >
      <span
        className="text-[clamp(3rem,5vw,5rem)] leading-[1] text-[#0A2540]"
        style={{ fontFamily: "var(--font-archivo-black)" }}
        aria-hidden="true"
      >
        {number}
      </span>
      <div className="flex flex-col gap-4 flex-1">
        <h3
          className="text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.1] text-[#f0f0f0]"
          style={{ fontFamily: "var(--font-archivo-black)" }}
        >
          {title}
        </h3>
        <p className="text-[15px] leading-[1.7] text-[#888] font-serif">
          {body}
        </p>
      </div>
    </div>
  );
}

export default function HomeProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const xAnimated = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", "-400vw"]
  );

  return (
    <>
      {/* ── MOBILE layout (vertical stack) ── */}
      <section
        className="md:hidden bg-[#0a0a0a] px-6 py-24"
        aria-label="Project timeline"
      >
        <div className="mb-12">
          <MaskReveal>
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#555]">
              Project Timeline
            </span>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2
              className="text-[clamp(2.4rem,8vw,4rem)] leading-[0.95] text-[#f0f0f0] mt-4"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              A transparent, step-by-step process
              <br />
              with zero guesswork.
            </h2>
          </MaskReveal>
        </div>
        <div className="flex flex-col gap-6">
          {steps.map(({ number, title, body }) => (
            <StepCard key={number} number={number} title={title} body={body} />
          ))}
        </div>
      </section>

      {/* ── DESKTOP layout (scroll-jacked horizontal) ── */}
      <section
        ref={sectionRef}
        aria-label="Project timeline"
        className={`hidden md:block bg-[#0a0a0a] ${reduced ? "relative" : "relative h-[500vh]"}`}
      >
        <div
          className={
            reduced
              ? "px-6 py-24 flex flex-col"
              : "sticky top-0 h-screen overflow-hidden flex flex-col justify-center px-[clamp(24px,6vw,100px)] py-16"
          }
        >
          {/* Section header */}
          <div className="mb-12">
            <MaskReveal>
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#555]">
                Project Timeline
              </span>
            </MaskReveal>
            <MaskReveal delay={0.1}>
              <h2
                className="text-[clamp(2.8rem,5vw,5rem)] leading-[0.95] text-[#f0f0f0] mt-3"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                A transparent, step-by-step process with zero guesswork.
              </h2>
            </MaskReveal>
          </div>

          {/* Horizontal card track */}
          <div className="overflow-hidden">
            <motion.div
              style={{ x: reduced ? "0vw" : xAnimated }}
              className={reduced ? "flex flex-col gap-6" : "flex gap-6 w-[500vw]"}
            >
              {steps.map(({ number, title, body }) => (
                <StepCard key={number} number={number} title={title} body={body} />
              ))}
            </motion.div>
          </div>

          {/* Progress dots */}
          {!reduced && <ProgressDots scrollYProgress={scrollYProgress} />}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors. If you see an error about `useTransform` being called inside a map callback in `ProgressDots`, move the dot animation logic to a separate `Dot` component that receives `scrollYProgress`, `start`, and `end` as props and calls `useTransform` at the top level of the component.

Fix for the hook-in-loop error — replace `ProgressDots` with:

```typescript
function Dot({
  scrollYProgress,
  start,
  end,
  label,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  label: string;
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [1, 1.3]);
  return (
    <motion.span
      role="tab"
      aria-label={label}
      style={{ opacity, scale }}
      className="block w-2 h-2 rounded-full bg-[#0A2540]"
    />
  );
}

function ProgressDots({ scrollYProgress }: { scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  return (
    <div className="flex items-center gap-3 mt-10" role="tablist" aria-label="Step progress">
      {steps.map((step, i) => (
        <Dot
          key={step.number}
          scrollYProgress={scrollYProgress}
          start={i / steps.length}
          end={(i + 1) / steps.length}
          label={`Step ${step.number}`}
        />
      ))}
    </div>
  );
}
```

Use this `Dot`/`ProgressDots` version regardless — it is correct React hooks usage.

- [ ] **Step 3: Commit**

```bash
git add components/home-process.tsx
git commit -m "feat: replace How It Works with 5-step scroll-jacked carousel"
```

---

## Task 5: Remove Testimonials section (`home-client.tsx`)

**Files:**
- Modify: `components/home-client.tsx`

- [ ] **Step 1: Remove import and JSX**

In `components/home-client.tsx`:

1. Delete the import line:
```typescript
import HomeTestimonials from "@/components/home-testimonials";
```

2. Delete the JSX element:
```tsx
<HomeTestimonials />
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home-client.tsx
git commit -m "remove: testimonials section from homepage"
```

---

## Task 6: Deploy to production

- [ ] **Step 1: Push to main**

```bash
git push origin master:main
```

- [ ] **Step 2: Verify deployment**

Vercel will auto-deploy on push to `main`. Confirm the production URL https://www.cjcreativestudio.com/ reflects all five changes:
- Opportunity section: new humanized copy
- How We're Different: new sizing + copy
- Selected Work: "Proven work." header, no project count line
- How It Works: 5-step dark scroll-jacked carousel with progress dots
- Testimonials: gone
