# Homepage Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add magnetic char glow to the hero headline, an animated dot-grid to light sections, and redesign the footer with a compact 3-column logo layout.

**Architecture:** Three independent components — `GlowHeadline`, `LightSectionTexture`, and an updated `EditorialFooter`. Each touches one area of the page with no cross-dependencies. CSS keyframes go in `globals.css`.

**Tech Stack:** Next.js 16 App Router, motion/react, Tailwind v4, TypeScript (zero errors enforced)

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `components/glow-headline.tsx` | Char-split headline with entrance stagger + mouse-proximity glow |
| Modify | `components/home-hero.tsx` | Swap `CharReveal` → `GlowHeadline` for the three headline lines |
| Create | `components/light-section-texture.tsx` | SVG dot-grid overlay with CSS drift animation |
| Modify | `components/home-problem.tsx` | Add `<LightSectionTexture />` inside the section |
| Modify | `components/editorial-footer.tsx` | Replace wordmark with horizontal logo image; 3-col grid layout |
| Modify | `app/globals.css` | Add `@keyframes glowPulse` and `@keyframes dotGridDrift` + classes |

---

## Task 1: CSS Keyframes

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add keyframes and classes**

Open `app/globals.css` and append the following block at the end of the file (after the last existing rule):

```css
/* ── GLOW HEADLINE ──────────────────────────────────── */

@keyframes glowPulse {
  0%, 100% { text-shadow: none; }
  50%       { text-shadow: 0 0 14px rgba(91, 159, 214, 0.18); }
}

.glow-pulse {
  animation: glowPulse 4s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .glow-pulse { animation: none; }
}

/* ── LIGHT SECTION TEXTURE ──────────────────────────── */

@keyframes dotGridDrift {
  from { transform: translate(0, 0); }
  to   { transform: translate(28px, 28px); }
}

.dot-grid-animate {
  animation: dotGridDrift 18s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .dot-grid-animate { animation: none; }
}
```

- [ ] **Step 2: Verify TypeScript still passes**

```bash
cd C:/Users/ollie/cj-websites/cj-creative-studio
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add glowPulse and dotGridDrift keyframes"
```

---

## Task 2: GlowHeadline Component

**Files:**
- Create: `components/glow-headline.tsx`

- [ ] **Step 1: Create the component**

Create `components/glow-headline.tsx` with this content:

```tsx
"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { EXPO } from "@/lib/easing";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  charDelay?: number;
  as?: "h1" | "h2" | "h3" | "span";
}

export default function GlowHeadline({
  text,
  className,
  delay = 0,
  charDelay = 0.018,
  as: Tag = "span",
}: Props) {
  const wrapperRef = useRef<HTMLElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reduced = useReducedMotion();
  const inView = useInView(wrapperRef, { once: true, margin: "-60px 0px" });

  const chars = text.split("");

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (reduced) return;
    charRefs.current.forEach((el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      const radius = 200;
      if (dist < radius) {
        const strength = 1 - dist / radius;
        const glow = Math.round(strength * 20);
        const alpha = (strength * 0.9).toFixed(2);
        el.style.textShadow = `0 0 ${glow}px rgba(91,159,214,${alpha})`;
        el.style.color = `rgba(255,255,255,${(0.7 + strength * 0.3).toFixed(2)})`;
      } else {
        el.style.textShadow = "";
        el.style.color = "";
      }
    });
  }, [reduced]);

  const handleMouseLeave = useCallback(() => {
    charRefs.current.forEach((el) => {
      if (!el) return;
      el.style.textShadow = "";
      el.style.color = "";
    });
  }, []);

  useEffect(() => {
    const section = wrapperRef.current?.closest("section");
    if (!section || reduced) return;
    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, reduced]);

  const MotionTag = motion[Tag] as typeof motion.span;

  return (
    <MotionTag
      ref={wrapperRef as React.RefObject<HTMLSpanElement>}
      className={`${className ?? ""} ${reduced ? "" : "glow-pulse"}`}
      aria-label={text}
    >
      {reduced
        ? text
        : chars.map((char, i) =>
            char === " " ? (
              <span
                key={i}
                className="inline-block"
                style={{ width: "0.28em" }}
                aria-hidden="true"
              />
            ) : (
              <span key={i} className="inline-block overflow-hidden">
                <motion.span
                  ref={(el) => { charRefs.current[i] = el; }}
                  className="inline-block"
                  style={{ transition: "text-shadow 80ms ease-out, color 80ms ease-out" }}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: EXPO, delay: delay + i * charDelay }}
                >
                  {char}
                </motion.span>
              </span>
            )
          )}
    </MotionTag>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/glow-headline.tsx
git commit -m "feat: add GlowHeadline component with mouse-proximity glow"
```

---

## Task 3: Wire GlowHeadline into HomeHero

**Files:**
- Modify: `components/home-hero.tsx`

- [ ] **Step 1: Replace CharReveal with GlowHeadline**

Open `components/home-hero.tsx`. The current file imports `CharReveal` and uses it for three headline lines. Replace the entire file with:

```tsx
"use client";

import Link from "next/link";
import GlowHeadline from "@/components/glow-headline";
import MaskReveal from "@/components/mask-reveal";
import { motion, useReducedMotion } from "motion/react";
import { EXPO } from "@/lib/easing";

export default function HomeHero() {
  const reduced = useReducedMotion();

  return (
    <section
      className="bg-[#0a0a0a] text-[#f0f0f0] min-h-svh flex flex-col justify-center px-6 pt-20 pb-16"
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

        {/* Display heading */}
        <div
          className="text-[clamp(3.2rem,8.5vw,8.5rem)] leading-[0.9] mb-12"
          style={{ fontFamily: "var(--font-archivo-black)" }}
        >
          <GlowHeadline
            text="Your website should"
            as="h1"
            delay={0.2}
            charDelay={0.018}
            className="block"
          />
          <GlowHeadline
            text="win you customers."
            as="h1"
            delay={0.55}
            charDelay={0.018}
            className="block"
          />
          <GlowHeadline
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

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home-hero.tsx
git commit -m "feat: wire GlowHeadline into HomeHero"
```

---

## Task 4: LightSectionTexture Component

**Files:**
- Create: `components/light-section-texture.tsx`

- [ ] **Step 1: Create the component**

Create `components/light-section-texture.tsx`:

```tsx
export default function LightSectionTexture() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="200%"
        style={{ display: "block", opacity: 0.055 }}
      >
        <defs>
          <pattern
            id="dot-grid"
            x="0"
            y="0"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1.5" fill="#0d0d0d" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#dot-grid)"
          className="dot-grid-animate"
        />
      </svg>
    </div>
  );
}
```

Note: `height="200%"` on the SVG and `height="100%"` on the rect — the rect fills the oversized SVG canvas so the drifting pattern never reveals a gap at the bottom edge.

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/light-section-texture.tsx
git commit -m "feat: add LightSectionTexture SVG dot-grid component"
```

---

## Task 5: Wire LightSectionTexture into HomeProblem

**Files:**
- Modify: `components/home-problem.tsx`

- [ ] **Step 1: Add texture to the section**

Open `components/home-problem.tsx`. The outer `<section>` currently has:

```tsx
<section
  className="bg-[#f5f5f5] text-[#0d0d0d] px-6 py-24"
  aria-label="The problem"
>
```

Replace it with (add `relative overflow-hidden` and the texture as first child):

```tsx
<section
  className="relative overflow-hidden bg-[#f5f5f5] text-[#0d0d0d] px-6 py-24"
  aria-label="The problem"
>
  <LightSectionTexture />
```

Also add the import at the top of the file:

```tsx
import LightSectionTexture from "@/components/light-section-texture";
```

And wrap the inner content div with `relative z-10` so it sits above the texture:

```tsx
<div className="relative z-10 max-w-[1280px] mx-auto">
```

(The existing div already has `max-w-[1280px] mx-auto` — just add `relative z-10`.)

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home-problem.tsx
git commit -m "feat: add dot-grid texture to HomeProblem light section"
```

---

## Task 6: Footer Redesign

**Files:**
- Modify: `components/editorial-footer.tsx`

- [ ] **Step 1: Rewrite the footer**

Replace the entire content of `components/editorial-footer.tsx` with:

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";

const NAV = [
  { label: "Work",     href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About",    href: "/about" },
  { label: "Contact",  href: "/contact" },
  { label: "Privacy",  href: "/privacy" },
];

function LondonSkyline() {
  return (
    <svg
      viewBox="0 0 1200 160"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
      className="w-full"
      style={{ display: "block", height: "clamp(60px, 10vw, 140px)" }}
    >
      <path
        fill="rgba(255,255,255,0.10)"
        d="
          M0,160
          L0,110 L30,110 L30,90 L50,90 L50,70 L60,70 L60,50 L70,50 L70,70 L80,70 L80,90 L100,90 L100,110
          L120,110 L120,100 L140,100 L140,95 L160,95 L160,100 L180,100 L180,110
          L200,110 L200,105 L220,105 L220,100 L240,100 L240,95 L260,95 L260,100 L280,100 L280,105 L300,105 L300,110
          L320,110 L320,80 L330,80 L330,60 L340,60 L340,40 L342,40 L342,20 L344,20 L344,0
          L346,0 L346,20 L348,20 L348,40 L350,40 L350,60 L360,60 L360,80 L370,80 L370,110
          L390,110 L390,100
          L400,100 L400,60 L404,60 L404,40 L408,40 L408,20 L410,20 L410,0
          L412,0 L412,20 L414,20 L414,40 L418,40 L418,60 L422,60 L422,100 L432,100 L432,110
          L450,110 L450,90 L480,90 L480,110
          L510,110 L510,85 L540,85 L540,75 L560,75 L560,85 L590,85 L590,110
          L620,110 L620,100 L650,100 L650,90 L670,90 L670,80 L680,80 L680,65 L690,65 L690,80 L700,80 L700,90 L720,90 L720,100 L750,100 L750,110
          L770,110 L770,95 L790,95 L790,85 L810,85 L810,75 L830,75 L830,85 L850,85 L850,95 L870,95 L870,110
          L900,110 L900,90 L910,90 L910,70 L920,70 L920,55 L930,55 L930,45 L935,45 L935,30 L940,30 L940,45 L945,45 L945,55 L955,55 L955,70 L965,70 L965,90 L975,90 L975,110
          L1000,110 L1000,100 L1020,100 L1020,95 L1040,95 L1040,100 L1060,100 L1060,110
          L1080,110 L1080,90 L1100,90 L1100,80 L1120,80 L1120,90 L1140,90 L1140,110
          L1200,110 L1200,160
          Z
        "
      />
    </svg>
  );
}

export default function EditorialFooter() {
  return (
    <footer className="bg-[#0a0a0a]" aria-label="Site footer">
      {/* Skyline silhouette */}
      <div className="px-0 pt-10 overflow-hidden">
        <LondonSkyline />
      </div>

      {/* 3-column content row */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 md:items-start">

          {/* Left — logo + tagline */}
          <div className="flex flex-col gap-3">
            <Image
              src="/assets/cj-logo-horizontal.png"
              alt="CJ Studio"
              width={130}
              height={33}
              style={{ filter: "brightness(0) invert(1)", opacity: 0.82 }}
            />
            <p
              className="text-[10px] tracking-[0.20em] uppercase"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                color: "rgba(255,255,255,0.28)",
              }}
            >
              UK Web Design Agency
            </p>
          </div>

          {/* Centre — nav */}
          <nav className="flex flex-col gap-3" aria-label="Footer navigation">
            {NAV.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[13px] text-white/40 transition-[color] duration-[180ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:text-white/80 w-fit"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right — copyright */}
          <div className="flex flex-col justify-end md:items-end">
            <p className="text-[11px] text-white/20">
              © {new Date().getFullYear()} CJ Studio
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/editorial-footer.tsx
git commit -m "feat: redesign footer with 3-col layout and horizontal logo"
```

---

## Task 7: Build Check + Push

- [ ] **Step 1: Full build**

```bash
cd C:/Users/ollie/cj-websites/cj-creative-studio
npm run build
```

Expected: build completes with 0 errors and 0 TypeScript errors. Warnings about image optimisation are acceptable.

- [ ] **Step 2: Push to main**

```bash
git push origin main
```

Vercel will auto-deploy. Check https://www.cjcreativestudio.com once the deployment completes (usually ~90 seconds).
