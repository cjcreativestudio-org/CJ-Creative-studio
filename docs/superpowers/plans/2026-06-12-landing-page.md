# CJ Studio Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full CJ Studio root landing page with a four-phase scroll experience: laptop zoom hero → horizontal "Why It Matters" → work grid → contact/footer.

**Architecture:** `page.tsx` stays a Server Component and renders `<HomeClient>` (new client wrapper holding `navOnLight` state) plus static sections. `LaptopZoom` fires an `onLightChange` callback on each scroll frame; `HomeClient` threads the boolean to `<Nav>`. `WhyItMatters` uses scroll-to-translateX (no hijacking). Existing `WorkTeaser`, `CTA`, `Footer` are reused with only minor link/color changes.

**Tech Stack:** Next.js 16.2.6 App Router, Tailwind CSS v4, `motion/react` v12, `@phosphor-icons/react`, `next/image`.

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Copy | `public/assets/hero-master.png` | Hero background image |
| Modify | `app/globals.css` | Brand aurora colors (purple/blue/teal) |
| Modify | `app/page.tsx` | Server Component orchestrator |
| **New** | `components/home-client.tsx` | Client wrapper — navOnLight state |
| **New** | `components/laptop-zoom.tsx` | Phase 1 — scroll zoom hero |
| **New** | `components/why-it-matters.tsx` | Phase 2 — horizontal scroll section |
| Modify | `components/nav.tsx` | Updated links + `onLight` prop |
| Modify | `components/footer.tsx` | Updated links |

---

## Task 1: Copy Hero Asset + Create Assets Directory

**Files:**
- Create: `public/assets/hero-master.png` (copy from Downloads)

- [ ] **Step 1: Create the assets directory and copy the image**

```powershell
New-Item -ItemType Directory -Force -Path "public/assets"
Copy-Item "C:\Users\ollie\Downloads\Gemini_Generated_Image_ijidzfijidzfijid.png" -Destination "public/assets/hero-master.png"
```

- [ ] **Step 2: Verify the file exists**

```powershell
Test-Path "public/assets/hero-master.png"
```

Expected: `True`

- [ ] **Step 3: Commit**

```bash
git add public/assets/hero-master.png
git commit -m "feat: add hero background asset"
```

---

## Task 2: Update Aurora Colors in globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace the CSS file content**

Replace the entire content of `app/globals.css` with:

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #111827;
  --purple: #8a6cff;
  --blue: #4d7cff;
  --teal: #27d7c4;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-plus-jakarta-sans);
  --animate-aurora: aurora 60s linear infinite;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #ffffff;
  color: var(--foreground);
  -webkit-font-smoothing: antialiased;
}

/* Global persistent aurora — fixed behind all phases */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 12% 18%, rgba(138, 108, 255, 0.28) 0%, transparent 52%),
    radial-gradient(ellipse at 86% 10%, rgba(77, 124, 255, 0.20) 0%, transparent 50%),
    radial-gradient(ellipse at 72% 88%, rgba(39, 215, 196, 0.22) 0%, transparent 52%),
    radial-gradient(ellipse at 4%  82%, rgba(138, 108, 255, 0.12) 0%, transparent 48%),
    radial-gradient(ellipse at 52% 50%, rgba(77, 124, 255, 0.08) 0%, transparent 60%),
    #ffffff;
}

@keyframes aurora {
  from { background-position: 50% 50%, 50% 50%; }
  to   { background-position: 350% 50%, 350% 50%; }
}

/* Animated aurora color field — used by AuroraBackground */
.aurora-gradient {
  background-image: repeating-linear-gradient(
    100deg,
    #8a6cff 10%,
    #4d7cff 18%,
    #27d7c4 26%,
    #8a6cff 34%
  );
  background-size: 300% 200%;
  filter: blur(10px);
}

@media (prefers-reduced-motion: reduce) {
  .aurora-gradient {
    animation: none;
  }
}
```

- [ ] **Step 2: Run type check to confirm no CSS errors bleed into TS**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: update aurora colors to brand palette (purple/blue/teal)"
```

---

## Task 3: Update Nav Component

**Files:**
- Modify: `components/nav.tsx`

- [ ] **Step 1: Replace the links array and add `onLight` prop**

Open `components/nav.tsx`. Make these three changes:

**Change 1** — Replace the links array (lines 10-15):

```tsx
const links = [
  { label: "Home",             href: "/" },
  { label: "Our Work",         href: "/work" },
  { label: "About us",         href: "/about" },
  { label: "Our services",     href: "/services" },
  { label: "Contact Us",       href: "/contact" },
  { label: "Privacy & Policy", href: "/privacy" },
];
```

**Change 2** — Update the function signature to accept `onLight` prop:

```tsx
export default function Nav({ onLight = false }: { onLight?: boolean }) {
```

**Change 3** — Update the desktop nav link text color to respond to `onLight`. Find the className on each desktop `<Link>` and change the text color:

```tsx
className={`relative text-[14px] transition-colors duration-300 py-1 group ${
  onLight ? "text-gray-500 hover:text-gray-900" : "text-white/80 hover:text-white"
}`}
```

**Change 4** — Remove the CTA button block (the `<div className="hidden md:block">` wrapping `AnimatedButton`). The PRD nav does not include a CTA button.

**Change 5** — In the mobile menu `<div className="px-6 py-4 ...">`, remove the `<AnimatedButton>` block that appears after the links map.

**Change 6** — Remove the `import AnimatedButton from "./animated-button";` line at the top of the file since it is no longer used.

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/nav.tsx
git commit -m "feat: update nav links to PRD spec + add onLight prop"
```

---

## Task 4: Update Footer Component

**Files:**
- Modify: `components/footer.tsx`

- [ ] **Step 1: Replace the footer links array**

In `components/footer.tsx`, find the inline links array inside the `map()` and replace it:

```tsx
{[
  { label: "Home",             href: "/" },
  { label: "Our Work",         href: "/work" },
  { label: "About us",         href: "/about" },
  { label: "Our services",     href: "/services" },
  { label: "Contact Us",       href: "/contact" },
  { label: "Privacy & Policy", href: "/privacy" },
].map(({ label, href }) => (
  <Link
    key={label}
    href={href}
    className="text-[13px] text-gray-400 hover:text-gray-700 transition-colors"
  >
    {label}
  </Link>
))}
```

Also remove the separate Privacy/Terms links and the `<span>` separator after them — they are now covered by the unified links array above.

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/footer.tsx
git commit -m "feat: update footer links to PRD spec"
```

---

## Task 5: Build LaptopZoom Component (Phase 1)

**Files:**
- Create: `components/laptop-zoom.tsx`

- [ ] **Step 1: Create the file**

```tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "motion/react";

interface Props {
  onLightChange: (isLight: boolean) => void;
}

export default function LaptopZoom({ onLightChange }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // p² acceleration — matches PRD eased = p*p; scale 1→9
  const scale = useTransform(scrollYProgress, (p) => 1 + p * p * 8);

  // Room fades out between 60–84% progress
  const roomOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.84],
    [1, 0]
  );

  // Dark veil fades in between 55–82% (max opacity 0.5)
  const veilOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.82],
    [0, 0.5]
  );

  // Nav text flips to dark when background is light (p < 0.46)
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    onLightChange(p < 0.46);
  });

  return (
    <section ref={sectionRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Zooming room image — transform-origin targets laptop screen center */}
        <motion.div
          style={{ scale, opacity: roomOpacity }}
          className="absolute inset-0 [transform-origin:50%_40%] [will-change:transform]"
        >
          <Image
            src="/assets/hero-master.png"
            alt="CJ Creative Studio workspace"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        {/* Dark veil — fills in as zoom deepens */}
        <motion.div
          style={{ opacity: veilOpacity }}
          className="absolute inset-0 bg-black pointer-events-none"
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/laptop-zoom.tsx
git commit -m "feat: add LaptopZoom scroll-driven hero component"
```

---

## Task 6: Build WhyItMatters Component (Phase 2)

**Files:**
- Create: `components/why-it-matters.tsx`

- [ ] **Step 1: Create the file**

```tsx
"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

const facts = [
  "75% of users judge a brand's credibility by its website design",
  "First impressions form in as little as 0.05 seconds",
  "38% of users stop engaging with a site if the layout is unattractive",
  "A well-designed site can increase conversion rates by up to 200%",
];

export default function WhyItMatters() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map 0→1 scroll progress → "0vw" to "-200vw" (3 slides × 100vw)
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-200vw"]);

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div style={{ x }} className="flex w-[300vw]">

          {/* Slide 1 — headline */}
          <div className="w-screen h-screen flex flex-col justify-center px-[clamp(24px,8vw,120px)]">
            <span
              className="mb-8 uppercase"
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.30em",
                color: "rgba(12,14,20,0.38)",
              }}
            >
              Why it matters
            </span>

            <h2
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                maxWidth: "20ch",
                color: "#0c0e14",
                margin: 0,
              }}
            >
              Your website is the first thing they{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #8a6cff, #4d7cff 52%, #27d7c4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                judge.
              </span>
            </h2>

            <div className="mt-10 flex flex-col items-start gap-2">
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.20em",
                  textTransform: "uppercase",
                  color: "rgba(12,14,20,0.32)",
                }}
              >
                Keep scrolling ↓
              </span>
              <div className="w-px h-10 bg-gray-200" />
            </div>
          </div>

          {/* Slide 2 — facts */}
          <div className="w-screen h-screen flex flex-col justify-center px-[clamp(24px,8vw,120px)]">
            <span
              className="mb-8 uppercase"
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.30em",
                color: "rgba(12,14,20,0.38)",
              }}
            >
              Why it matters
            </span>

            <h3
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                letterSpacing: "-0.02em",
                color: "#0c0e14",
                margin: "0 0 clamp(20px,3vw,40px)",
              }}
            >
              The numbers don&apos;t lie
            </h3>

            <ul className="space-y-5 max-w-[52ch] list-none p-0 m-0">
              {facts.map((fact) => (
                <li key={fact} className="flex gap-4 items-start">
                  <span
                    className="mt-[6px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #8a6cff, #27d7c4)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "clamp(15px, 1.4vw, 18px)",
                      lineHeight: 1.6,
                      color: "rgba(12,14,20,0.62)",
                    }}
                  >
                    {fact}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Slide 3 — transition buffer */}
          <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
            <div
              className="w-px h-16"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(138,108,255,0.4), transparent)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color: "rgba(12,14,20,0.32)",
              }}
            >
              See our work ↓
            </span>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/why-it-matters.tsx
git commit -m "feat: add WhyItMatters horizontal scroll section"
```

---

## Task 7: Create HomeClient Wrapper

**Files:**
- Create: `components/home-client.tsx`

The `page.tsx` is a Server Component and cannot use `useState`. This thin client wrapper holds the `navOnLight` state and passes it between `LaptopZoom` and `Nav`.

- [ ] **Step 1: Create the file**

```tsx
"use client";

import { useState } from "react";
import Nav from "@/components/nav";
import LaptopZoom from "@/components/laptop-zoom";

export default function HomeClient() {
  const [navOnLight, setNavOnLight] = useState(true);

  return (
    <>
      <Nav onLight={navOnLight} />
      <LaptopZoom onLightChange={setNavOnLight} />
    </>
  );
}
```

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home-client.tsx
git commit -m "feat: add HomeClient wrapper for nav/zoom scroll state"
```

---

## Task 8: Wire Up page.tsx Orchestrator

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace page.tsx**

```tsx
import HomeClient from "@/components/home-client";
import WhyItMatters from "@/components/why-it-matters";
import WorkTeaser from "@/components/work-teaser";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <HomeClient />
      <WhyItMatters />
      <WorkTeaser />
      <CTA />
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Start dev server and open browser**

```bash
npm run dev
```

Open `http://localhost:3000` and verify:
- Hero image fills the screen with purple/teal aura glow
- Scrolling triggers zoom — room scales up
- At ~46% scroll progress nav text flips from dark to white
- At ~80% scroll progress room fades out to white
- Scrolling further enters the horizontal "Why it matters" section
- Slide 1: headline with gradient "judge."
- Slide 2: facts list with gradient bullets
- Continuing to scroll down reveals the work grid (3 cards)
- Then the "Ready to build something great?" contact section
- Footer shows updated links: Home, Our Work, About us, Our services, Contact Us, Privacy & Policy

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire up landing page orchestrator — all four phases"
```

---

## Task 9: Visual QA — Tuning Pass

**Files:**
- Possibly modify: `components/laptop-zoom.tsx` (transform-origin tweak)
- Possibly modify: `components/why-it-matters.tsx` (slide spacing)

- [ ] **Step 1: Check zoom origin**

With dev server running, scroll slowly through Phase 1. The zoom should feel like you're diving INTO the laptop screen (the white rectangle grows to fill the viewport). If the zoom drifts off-center:

Open `components/laptop-zoom.tsx` and adjust `[transform-origin:50%_40%]`. Try values between `38%` and `45%` for the Y value until the screen centre stays centred during zoom.

- [ ] **Step 2: Check horizontal scroll feel**

Scroll through Phase 2 (WhyItMatters). The horizontal movement should feel smooth and proportional to vertical scroll distance. If slides feel too fast or too slow, adjust the `h-[300vh]` on the outer section (increase to `h-[400vh]` to slow it, decrease to `h-[250vh]` to speed it up).

- [ ] **Step 3: Check mobile**

Resize browser to 375px width. The page should still be readable (content may not scroll horizontally on mobile — that's acceptable per spec: mobile shows a simplified static layout).

- [ ] **Step 4: Run build check**

```bash
npm run build
```

Expected: build completes with no errors. Warnings about image optimization are acceptable.

- [ ] **Step 5: Commit any tuning changes**

```bash
git add -p
git commit -m "fix: tune zoom transform-origin and scroll timing"
```
