# Abstract Visual Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add abstract monochrome textural images and one looping abstract video to the CJ Studio homepage (new standalone section + accents in `HomeHero` and `HomeProblem`), generated via the `hf` CLI on the Plus account.

**Architecture:** Generate static assets first via the `hf` CLI (Bash), save into `/public/assets/abstract/`, then build one new component (`HomeAbstractSection`) and two small accent additions to existing components. No backend/API changes — purely static assets + client components using the existing `motion/react` scroll patterns already in the codebase (see `laptop-zoom.tsx`, `why-it-matters.tsx`, `reveal.tsx`).

**Tech Stack:** Next.js 16 App Router, Tailwind v4, `motion/react`, `hf` CLI (Higgsfield, model `nano_banana` for stills — covered by the Plus plan's 365-day unlimited perk, no credit cost — and `seedance_2_0` for video, ~36 credits per generation, negligible against the 959-credit balance), TypeScript.

---

## Reference: hf CLI commands used in this plan

Confirmed working in this environment, account `josh@cjcreativestudio.com` (plus plan, 959 credits):

```bash
hf account status                                   # verify account/credits
hf generate cost <model> --prompt "..."              # preflight cost
hf generate create <model> --prompt "..." --aspect-ratio <ratio> --wait --wait-timeout 5m
hf generate get <job_id> --json                       # inspect a finished job, get result URL
```

`nano_banana` params: `prompt` (required), `aspect_ratio` (`auto,1:1,3:2,2:3,4:3,3:4,4:5,5:4,9:16,16:9,21:9`, default `1:1`). Covered by the Plus plan's 365-day unlimited generation perk — does not draw down the credit balance.
`seedance_2_0` params: `prompt` (required), `aspect_ratio` (default `16:9`), `duration` (default `5`), `resolution` (`480p,720p,1080p,4k`, default `720p`), `generate_audio` (default `true` — **must pass `--generate-audio false` for a silent loop**), `mode` (`std,fast`).

---

### Task 1: Generate the abstract still images

**Files:**
- Create (via CLI, downloaded into repo): `public/assets/abstract/hero-bg.jpg`
- Create: `public/assets/abstract/problem-texture.jpg`
- Create: `public/assets/abstract/spare-1.jpg`
- Create: `public/assets/abstract/spare-2.jpg`

- [ ] **Step 1: Preflight cost for all 4 stills**

Run:
```bash
hf generate cost nano_banana --prompt "abstract greyscale paper grain texture, soft directional light, minimalist editorial, no text, no people" --aspect-ratio 16:9
```
Expected: confirms the model/params are valid. Nano Banana is covered by the Plus plan's 365-day unlimited perk, so this should not draw down the credit balance — if the response shows a nonzero credit cost being charged to the balance, stop and re-check the unlimited entitlement before generating all 4.

- [ ] **Step 2: Generate `hero-bg` (paper grain / soft directional shadow)**

Run:
```bash
hf generate create nano_banana \
  --prompt "abstract greyscale paper grain texture with soft diagonal light and shadow, minimalist, desaturated, editorial photography, no text, no people, no logos" \
  --aspect-ratio 16:9 \
  --wait --wait-timeout 3m --json > /tmp/hero-bg.json
cat /tmp/hero-bg.json
```
Expected: JSON with a completed job and a `result` URL (or `results[0].url`) pointing to a generated image.

- [ ] **Step 3: Download `hero-bg` into the repo**

Run (replace `<URL>` with the URL from Step 2's JSON output):
```bash
curl -L "<URL>" -o "C:\Users\ollie\cj-websites\cj-creative-studio\public\assets\abstract\hero-bg.jpg"
```
Expected: file written, non-zero size. Verify with:
```bash
ls -la "C:\Users\ollie\cj-websites\cj-creative-studio\public\assets\abstract\hero-bg.jpg"
```

- [ ] **Step 4: Generate `problem-texture` (fabric fold / paper crease)**

Run:
```bash
hf generate create nano_banana \
  --prompt "abstract greyscale fabric fold texture with subtle paper crease lines, soft studio lighting, minimalist, desaturated, editorial, no text, no people, no logos" \
  --aspect-ratio 4:3 \
  --wait --wait-timeout 3m --json > /tmp/problem-texture.json
cat /tmp/problem-texture.json
```
Then download (same pattern as Step 3) to `public/assets/abstract/problem-texture.jpg`.

- [ ] **Step 5: Generate 2 spare textures**

Run twice with these prompts, downloading each to `public/assets/abstract/spare-1.jpg` and `public/assets/abstract/spare-2.jpg` (same create → wait → curl pattern as above):
```bash
hf generate create nano_banana --prompt "abstract greyscale smoke drifting through soft light, minimalist, desaturated, editorial, no text, no people" --aspect-ratio 1:1 --wait --wait-timeout 3m --json
hf generate create nano_banana --prompt "abstract greyscale light passing through textured glass, soft shadow lines, minimalist, desaturated, editorial, no text, no people" --aspect-ratio 1:1 --wait --wait-timeout 3m --json
```

- [ ] **Step 6: Verify all 4 stills exist and are valid images**

Run:
```bash
ls -la "C:\Users\ollie\cj-websites\cj-creative-studio\public\assets\abstract\"
```
Expected: `hero-bg.jpg`, `problem-texture.jpg`, `spare-1.jpg`, `spare-2.jpg`, each > 10KB.

- [ ] **Step 7: Commit the generated assets**

```bash
cd "C:\Users\ollie\cj-websites\cj-creative-studio"
git add public/assets/abstract/hero-bg.jpg public/assets/abstract/problem-texture.jpg public/assets/abstract/spare-1.jpg public/assets/abstract/spare-2.jpg
git commit -m "Add abstract texture images for homepage visual layer"
```

---

### Task 2: Generate the abstract looping video

**Files:**
- Create: `public/assets/abstract/loop.mp4`

- [ ] **Step 1: Preflight cost**

Run:
```bash
hf generate cost seedance_2_0 --prompt "test" --resolution 720p --duration 8
```
Expected: `~36 credits` (confirmed earlier in this session) — acceptable against 959-credit balance.

- [ ] **Step 2: Generate the loop**

Run:
```bash
hf generate create seedance_2_0 \
  --prompt "slow abstract ink drifting through clear water, greyscale, monochrome, soft lighting, minimalist, no text, no people, seamless looping motion, calm and slow" \
  --aspect-ratio 16:9 \
  --duration 8 \
  --resolution 720p \
  --generate-audio false \
  --wait --wait-timeout 5m --json > /tmp/loop.json
cat /tmp/loop.json
```
Expected: JSON with a completed job and a result video URL. Video generation takes 60-180s per the model's typical timing — the `--wait-timeout 5m` covers this.

- [ ] **Step 3: Download the video**

Run (replace `<URL>` with the URL from Step 2's JSON):
```bash
curl -L "<URL>" -o "C:\Users\ollie\cj-websites\cj-creative-studio\public\assets\abstract\loop.mp4"
ls -la "C:\Users\ollie\cj-websites\cj-creative-studio\public\assets\abstract\loop.mp4"
```
Expected: file written, several MB in size.

- [ ] **Step 4: Sanity-check the video is silent and loops reasonably**

Run (requires ffprobe; if unavailable, skip and verify visually in Task 3's browser check):
```bash
ffprobe -v error -show_entries stream=codec_type "C:\Users\ollie\cj-websites\cj-creative-studio\public\assets\abstract\loop.mp4" 2>&1
```
Expected: only `codec_type=video` listed (no audio stream), confirming `--generate-audio false` worked.

- [ ] **Step 5: Commit**

```bash
cd "C:\Users\ollie\cj-websites\cj-creative-studio"
git add public/assets/abstract/loop.mp4
git commit -m "Add abstract looping video for homepage abstract section"
```

---

### Task 3: Build `HomeAbstractSection` and wire it into the homepage

**Files:**
- Create: `components/home-abstract.tsx`
- Modify: `components/home-client.tsx`

- [ ] **Step 1: Write `HomeAbstractSection`**

Create `C:\Users\ollie\cj-websites\cj-creative-studio\components\home-abstract.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export default function HomeAbstractSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [40, -40]
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Brand statement"
      className="relative h-[80vh] min-h-[480px] overflow-hidden bg-[#0d0d0d]"
    >
      <video
        src="/assets/abstract/loop.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <motion.p
          style={{ y: textY }}
          className="max-w-[20ch] text-center text-[clamp(1.6rem,4vw,3rem)] leading-[1.1] text-white"
        >
          Considered design, built to last.
        </motion.p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire it into the homepage between `HomeHero` and `HomeProblem`**

In `C:\Users\ollie\cj-websites\cj-creative-studio\components\home-client.tsx`, change:

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

to:

```tsx
import EditorialNav from "@/components/editorial-nav";
import EditorialFooter from "@/components/editorial-footer";
import HomeHero from "@/components/home-hero";
import HomeAbstractSection from "@/components/home-abstract";
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
      <HomeAbstractSection />
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

- [ ] **Step 3: Type-check**

Run:
```bash
cd "C:\Users\ollie\cj-websites\cj-creative-studio" && npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Visual check in dev server**

Run:
```bash
cd "C:\Users\ollie\cj-websites\cj-creative-studio" && npm run dev
```
Open `http://localhost:3000` in a browser, scroll past the hero. Expected: the video section appears, autoplays muted and looped, text is centered and readable, no layout shift/overflow.

- [ ] **Step 5: Commit**

```bash
git add components/home-abstract.tsx components/home-client.tsx
git commit -m "feat: add abstract looping-video section between hero and problem"
```

---

### Task 4: Add abstract background accent to `HomeHero`

**Files:**
- Modify: `components/home-hero.tsx`

- [ ] **Step 1: Convert `HomeHero` to a client component with a parallax background image**

Replace the full contents of `C:\Users\ollie\cj-websites\cj-creative-studio\components\home-hero.tsx`:

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["0%", "20%"]
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f0ece3] pt-14 overflow-hidden"
      aria-label="Homepage hero"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-0"
        aria-hidden="true"
      >
        <Image
          src="/assets/abstract/hero-bg.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover opacity-10"
        />
      </motion.div>

      <div className="relative z-10 px-6 pt-12 pb-16">
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

Note: text contrast is unaffected — the image sits at 10% opacity on a `-z-0` layer behind `z-10` content, well below WCAG-relevant contrast thresholds against `#0d0d0d` text.

- [ ] **Step 2: Type-check**

```bash
cd "C:\Users\ollie\cj-websites\cj-creative-studio" && npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Visual check**

With `npm run dev` running, load the homepage and scroll the hero. Expected: a faint texture visible behind the heading, moving slightly slower than the page scroll, text remains fully legible.

- [ ] **Step 4: Commit**

```bash
git add components/home-hero.tsx
git commit -m "feat: add parallax abstract background texture to hero"
```

---

### Task 5: Add abstract texture accent to `HomeProblem`

**Files:**
- Modify: `components/home-problem.tsx`

- [ ] **Step 1: Add a 4th grid cell with the texture image**

Replace the full contents of `C:\Users\ollie\cj-websites\cj-creative-studio\components\home-problem.tsx`:

```tsx
import Image from "next/image";
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
        <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-2 whitespace-nowrap">
            The Problem
          </span>
          <h2
            className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] md:text-right"
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

        <Reveal>
          <div className="relative mt-6 h-[160px] w-full overflow-hidden border border-gray-200">
            <Image
              src="/assets/abstract/problem-texture.jpg"
              alt=""
              fill
              className="object-cover opacity-30 grayscale"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
cd "C:\Users\ollie\cj-websites\cj-creative-studio" && npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Visual check**

With dev server running, scroll to the problem section. Expected: 3-column symptom grid unchanged, with a subtle bordered texture strip beneath it that fades/rises into view (via `Reveal`).

- [ ] **Step 4: Commit**

```bash
git add components/home-problem.tsx
git commit -m "feat: add abstract texture accent below problem grid"
```

---

### Task 6: Final verification pass

**Files:** none (verification only)

- [ ] **Step 1: Full type-check and lint**

```bash
cd "C:\Users\ollie\cj-websites\cj-creative-studio"
npx tsc --noEmit
npm run lint
```
Expected: zero errors from both.

- [ ] **Step 2: Production build**

```bash
npm run build
```
Expected: build succeeds, no errors. Note the build output size for `/` — confirm the video file isn't being inlined/bundled as a JS asset (it should be served as a static file from `/public`).

- [ ] **Step 3: Reduced-motion check**

In the browser dev server, enable "prefers reduced motion" (Chrome DevTools → Rendering tab → Emulate CSS media feature `prefers-reduced-motion: reduce`), reload the homepage. Expected: hero background texture is static (no parallax drift), abstract section text is static, video still autoplays (looping ambient video is acceptable under reduced motion since it's ambient/background, not a jarring transition) — confirm this matches the spec's intent of disabling parallax/scroll-driven effects, not the video itself.

- [ ] **Step 4: Mobile width check**

In DevTools device toolbar, set width to 375px. Expected: `HomeAbstractSection` video fills width without horizontal overflow, hero background image still renders behind text, problem-section texture strip stacks correctly below the now-single-column symptom list.

- [ ] **Step 5: Push to remote**

```bash
git push
```
