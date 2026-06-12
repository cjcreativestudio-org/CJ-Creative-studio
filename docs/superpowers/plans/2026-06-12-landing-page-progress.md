# Landing Page Implementation Progress

**Branch:** `feat/landing-page`  
**Date:** 2026-06-12  
**Method:** Subagent-driven development (Opus quality reviewers, Sonnet implementers)

---

## Status: 8/9 Tasks Complete — Awaiting Visual QA

| # | Task | Status | Commit |
|---|---|---|---|
| 1 | Copy hero asset → `public/assets/hero-master.png` | ✅ | `c6bf6f7` |
| 2 | Update `globals.css` — brand aurora palette (purple/blue/teal) | ✅ | `50de2e4` |
| 3 | Update `nav.tsx` — PRD links + `onLight` prop | ✅ | `c5a1ff7` |
| 4 | Update `footer.tsx` — unified PRD links | ✅ | `9152cd1` |
| 5 | Create `laptop-zoom.tsx` — Phase 1 scroll zoom hero | ✅ | `1c0eb9c` |
| 6 | Create `why-it-matters.tsx` — Phase 2 horizontal scroll | ✅ | `c019bb6` |
| 7 | Create `home-client.tsx` — client state boundary | ✅ | `b31e16c` |
| 8 | Wire up `page.tsx` orchestrator | ✅ | `8fe0c95` |
| 9 | Visual QA — zoom tuning, scroll feel, mobile, build check | 🔄 In progress |

---

## Build Status

- `npm run build` — ✅ passes, 9 routes pre-rendered, no errors
- Dev server — ✅ responds 200 on `http://localhost:3000`

---

## Issues Caught & Fixed During Review

| Issue | Severity | Fix Applied |
|---|---|---|
| `Nav` — `onLight = false` default made text invisible on all inner pages | Critical | Changed default to `true` |
| `Nav` — `href: "/about"` links to non-existent route | Critical | Changed to `/founders` (existing page) |
| `LaptopZoom` — `onLightChange` never fires on mount | Important | Added `useEffect` to sync initial scroll state |
| `WhyItMatters` — missing `useReducedMotion` (codebase convention) | Important | Added reduced-motion fallback (vertical stacked layout) |
| `WhyItMatters` — reduced-motion slides still `h-screen`, wasting 3× viewport | Important | Slides use `py-20` + Slide 3 hidden in reduced-motion path |

---

## Pending: Visual QA Checks

Run `npm run dev` at `C:\Users\ollie\cj-studio` and verify at `http://localhost:3000`:

- [ ] Hero image loads with aurora glow
- [ ] Scroll zoom feels like diving into laptop screen
- [ ] Nav text flips dark→white at ~46% scroll
- [ ] Room fades out at ~80% scroll
- [ ] "Why it matters" horizontal slides move on scroll
- [ ] Work grid appears below
- [ ] Footer shows correct 6 links
- [ ] If zoom drifts: tune `[transform-origin:50%_40%]` in `laptop-zoom.tsx`
- [ ] If scroll speed off: adjust `h-[300vh]` in `why-it-matters.tsx`
