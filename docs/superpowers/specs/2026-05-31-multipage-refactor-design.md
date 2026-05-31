# CJ Studio — Multi-Page Refactor & UI Overhaul Design

**Date:** 2026-05-31  
**Status:** Approved

---

## Overview

Four interconnected changes to the CJ Studio Next.js 16 site:
1. Break single-page scroll into multi-page App Router architecture
2. Fix WebsiteAssembly scroll animation offset + overflow
3. Centre the Hero layout
4. Apple-aesthetic overhaul of the Founders cards

---

## 1. Multi-Page Architecture

### New route pages (App Router)

| Route | File | Component rendered |
|-------|------|--------------------|
| `/work` | `app/work/page.tsx` | `<Work />` |
| `/services` | `app/services/page.tsx` | `<Services />` |
| `/process` | `app/process/page.tsx` | `<Process />` |
| `/founders` | `app/founders/page.tsx` | `<Founders />` (with Apple redesign) |

Each page imports `<Nav />` and `<Footer />` plus its component. No changes to the component logic — just new page wrappers.

### Homepage (`app/page.tsx`)

Stripped to:
1. `<Nav />`
2. `<Hero />`
3. `<WebsiteAssembly />`
4. `<WorkTeaser />` — NEW component (see below)
5. `<CTA />`
6. `<Footer />`

`<Work />`, `<Services />`, `<Process />`, `<Founders />` are removed from the homepage import list.

### New component: `components/work-teaser.tsx`

A trimmed version of the Work section for the homepage. Shows the same 3 project cards from `work.tsx`, with a heading "Selected work" and a prominent `<Link href="/work">View all work →</Link>` button. No duplication of project data — import the `projects` array from `work.tsx` or extract it to a shared constant.

**Decision:** Extract the `projects` array to `lib/projects.ts` so both `work-teaser.tsx` and `app/work/page.tsx` share it without duplication.

### Nav (`components/nav.tsx`)

- `<a href="/">` on the Logo → `<Link href="/">` 
- All `<a href="#work">` etc. → `<Link href="/work">` etc.
- Import `Link` from `"next/link"`
- Mobile menu links updated the same way
- `onClick={() => setOpen(false)}` stays on mobile links

---

## 2. WebsiteAssembly Animation Fix

### Scroll offset

Change `useScroll` offset from:
```ts
offset: ["start start", "end start"]
```
To:
```ts
offset: ["start 0.9", "end start"]
```
Animation begins as the section peeks into the viewport (90% down), eliminating the blank-white dead zone.

### Overflow fix

Add an outer `<div className="overflow-x-hidden">` that wraps the entire component return. The `ref={containerRef}` stays on the inner `h-[280vh]` div. This means:
- Horizontal overflow from 3D rotating prisms is clipped (no scrollbar)
- `useScroll` tracks window scroll relative to `containerRef` (unaffected)
- `position: sticky` on the inner div works correctly (no overflow on its direct parent)

```tsx
return (
  <div className="overflow-x-hidden">          {/* clips horizontal bleed */}
    <div ref={containerRef} className="relative h-[280vh]">  {/* useScroll target */}
      <div className="sticky top-0 h-screen bg-white ...">   {/* sticky works */}
        ...
      </div>
    </div>
  </div>
);
```

### Debug log removal

Remove the `useMotionValueEvent` debug console.log and its import (if no longer used elsewhere).

---

## 3. Hero Centred Layout

Replace the `grid grid-cols-1 lg:grid-cols-[1fr_420px]` two-column layout with a single centred column:

- Heading, sub-copy, CTA buttons: `text-center` / `items-center`
- Prism SVG: moves below the heading, centred, scaled to ~240px width
- Location tag: stays bottom-left as subtle detail
- Max width stays `max-w-6xl` for the section; text content constrained to `max-w-[52ch]` centred

---

## 4. Founders Apple Redesign

Applied to `components/founders.tsx` (rendered on `/founders`).

### Card styling
- Background: `bg-white` with `border border-gray-100` — no coloured gradient fills
- Border radius: `rounded-3xl`
- No backdrop blur (clean and opaque)
- Remove large background initials watermark

### Avatar
- Shape: `rounded-full` (circle)
- Style: white background, 1px border using brand gradient (via `outline` or `ring`)
- Initials: charcoal `text-gray-900`, not white-on-colour

### Typography
- Name: `font-semibold tracking-tight text-gray-900` (not bold)
- Role: `text-[13px] text-gray-400 tracking-tight`
- Bio: `text-[15px] text-gray-500 leading-relaxed`

### Interaction
- `whileHover={{ scale: 1.02 }}` with spring: `{ type: "spring", stiffness: 300, damping: 20 }`
- No colour change on hover

### Remove
- Parallax `bgY` scroll effect (keeps component clean for standalone page)
- Coloured `from-violet-50` / `from-pink-50` card backgrounds
- Prism accent strip (too decorative)
- Large initials watermark

---

## Files Created

| Path | Purpose |
|------|---------|
| `app/work/page.tsx` | /work route |
| `app/services/page.tsx` | /services route |
| `app/process/page.tsx` | /process route |
| `app/founders/page.tsx` | /founders route |
| `components/work-teaser.tsx` | Homepage work preview |
| `lib/projects.ts` | Shared project data |

## Files Modified

| Path | Change |
|------|--------|
| `app/page.tsx` | Strip to Hero+Assembly+WorkTeaser+CTA+Footer |
| `components/nav.tsx` | Link tags, Logo as Link href="/" |
| `components/website-assembly.tsx` | Offset fix, outer overflow wrapper, remove debug log |
| `components/hero.tsx` | Centred single-column layout |
| `components/founders.tsx` | Apple aesthetic redesign |
| `components/work.tsx` | Import projects from lib/projects.ts |
