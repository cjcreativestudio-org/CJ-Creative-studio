# Higgsfield Video Hero Background — Design Spec

**Date:** 2026-06-26  
**Status:** Approved

---

## Overview

Replace the existing geometric video background (`geo-dark-loop.mp4` at `opacity-[0.07]`) with a new Higgsfield-generated abstract geometric MP4. The new video runs at medium opacity (`0.20`) with a subtle cinematic CSS filter.

---

## Scope

- Affects all pages that render `GeoVideoBackground` (currently all non-homepage pages, plus homepage if wired in)
- No copy or layout changes to any page
- No new components — change is confined to `geo-video-background.tsx` and the asset swap

---

## Asset

| | |
|---|---|
| **Source file** | `C:\Users\ollie\Downloads\hf_20260625_232225_ef4c1f7f-3218-4c4f-bccf-9d55e9e5ef79.mp4` |
| **Destination** | `public/assets/video/geo-bg.mp4` |
| **Old file** | `public/assets/video/geo-dark-loop.mp4` (can be deleted) |

---

## Component Changes — `geo-video-background.tsx`

| Property | Before | After |
|---|---|---|
| `src` | `/assets/video/geo-dark-loop.mp4` | `/assets/video/geo-bg.mp4` |
| `opacity` | `opacity-[0.07]` | `opacity-[0.20]` |
| CSS filter | none | `brightness(0.85) contrast(1.1)` via inline style |

All other attributes (`autoPlay`, `muted`, `loop`, `playsInline`, `aria-hidden`, `fixed inset-0`, `object-cover`, `-z-10`, `pointer-events-none`) remain unchanged.

---

## Constraints

- `useReducedMotion` is not currently respected in `GeoVideoBackground` — out of scope for this change, but noted as a follow-up
- Video must loop seamlessly; if it doesn't, that's an asset issue not a code issue
- No audio (already `muted`)
