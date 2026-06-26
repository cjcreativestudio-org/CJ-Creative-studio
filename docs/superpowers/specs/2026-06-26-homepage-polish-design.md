---
name: homepage-polish
description: Three homepage polish features — magnetic char glow on hero text, animated dot-grid on light sections, compact 3-col footer with horizontal logo
metadata:
  type: project
---

# CJ Studio Homepage Polish — Design Spec

**Date:** 2026-06-26  
**Scope:** Three independent UI improvements to the CJ Studio homepage

---

## 1. Hero Text — Magnetic Char Glow

### Goal
Make the `HomeHero` headline feel alive: characters glow toward the cursor and breathe at idle.

### Component
`components/home-hero.tsx` — currently uses `CharReveal` for entrance animation.

### Approach
Create a new `GlowHeadline` component (`components/glow-headline.tsx`) that:
- Accepts `text` (string), `as` (heading tag), `delay`, `charDelay` props — same API as `CharReveal`
- Renders each character as a `motion.span` with `display: inline-block`
- Handles entrance animation (identical stagger to existing `CharReveal`)
- After mount, attaches a `mousemove` listener to the parent section
- Computes distance from each char's bounding box centre to cursor
- Applies `textShadow` via a motion value: chars within 200px radius glow `0 0 20px rgba(91,159,214,0.9)` at distance 0, falling off linearly to `0 0 0px transparent` at 200px
- Idle state: CSS `animation` on the heading wrapper — `@keyframes glowPulse` shifts between `text-shadow: none` and `0 0 14px rgba(91,159,214,0.18)` on a 4s ease-in-out infinite loop, creating a subtle heartbeat
- `useReducedMotion()` disables both the proximity glow and the idle pulse entirely (renders plain white text with entrance stagger only)

### Integration
In `HomeHero`, replace `<CharReveal>` calls for the three headline lines with `<GlowHeadline>`. The surrounding section gets `onMouseMove` → forwarded to glow state.

### Edge cases
- Touch devices: `mousemove` never fires; idle pulse still plays (adds life on mobile too)
- SSR: all glow logic is behind `useEffect` / client-only, no hydration issues
- Spaces: render as `&nbsp;` spans with zero glow weight so word spacing is preserved

---

## 2. White Sections — Animated Dot-Grid

### Goal
Light sections (`bg-[#f5f5f5]`) feel flat after heavy dark sections. A slow-crawling dot-grid adds depth and movement.

### Component
New `components/light-section-texture.tsx` — a zero-dependency, purely CSS-driven overlay.

### Implementation
```
<div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none z-0">
  <svg ...>
    <defs>
      <pattern id="dot-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.5" fill="#0d0d0d" />
      </pattern>
    </defs>
    <rect width="100%" height="200%" fill="url(#dot-grid)" className="dot-grid-animate" />
  </svg>
</div>
```

CSS keyframe in `globals.css`:
```css
@keyframes dotGridDrift {
  from { transform: translate(0, 0); }
  to   { transform: translate(28px, 28px); }
}
.dot-grid-animate {
  animation: dotGridDrift 18s linear infinite;
  opacity: 0.055;
}
@media (prefers-reduced-motion: reduce) {
  .dot-grid-animate { animation: none; }
}
```

The `rect` is `height: 200%` so the drifting never reveals an edge. Translate distance matches pattern size — seamless loop.

### Integration
Add `<LightSectionTexture />` inside `HomeProblem` (and any other `bg-[#f5f5f5]` section). The parent section already has `relative` and `overflow-hidden` via Tailwind. Content sits at `z-10` above the texture.

---

## 3. Footer — Compact 3-Column with Horizontal Logo

### Goal
Replace the dominant stacked wordmark with a professional logo-based footer. Keep the London skyline as visual anchor.

### Changes to `components/editorial-footer.tsx`

**Skyline:** Keep `<LondonSkyline />` unchanged except opacity bump from `0.07` → `0.10` on the SVG path fill.

**Layout:** Replace the current flex row with a 3-column CSS grid on md+:

| Col | Content |
|-----|---------|
| Left | `<Image src="/assets/cj-logo-horizontal.png" width={130} height={33} alt="CJ Studio" style={{ filter: "brightness(0) invert(1)", opacity: 0.85 }} />` + tagline below |
| Centre | Nav links (existing, unchanged) |
| Right | Copyright line |

Mobile: single column, logo → nav → copyright, stacked with `gap-8`.

**Remove:** The entire `<p>` stacked wordmark block (the Archivo Black "CJ / Creative / Studio").

**Top border:** Add `border-t border-white/[0.06]` above the content row (below the skyline).

**Tagline under logo:**
```
<p style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 10, letterSpacing: "0.20em", color: "rgba(255,255,255,0.28)" }}>
  UK WEB DESIGN AGENCY
</p>
```

**Copyright:** Move from current inline position to right column, same style as existing (`text-[11px] text-white/20`).

---

## Shared Constraints

- TypeScript zero errors enforced
- All new components: `"use client"` where hooks/listeners used
- `useReducedMotion()` respected in all animation code
- No new npm packages — motion/react and CSS only
- Deploy: push to `main` → Vercel auto-builds
