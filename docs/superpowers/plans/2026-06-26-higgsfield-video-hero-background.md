# Higgsfield Video Hero Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing `geo-dark-loop.mp4` background video with a new Higgsfield-generated geometric MP4, increasing opacity from 0.07 to 0.20 and adding a cinematic CSS filter.

**Architecture:** Single-component change — update `geo-video-background.tsx` to reference the new asset, increase opacity, and add a `brightness`/`contrast` filter. Asset is copied from Downloads into `public/assets/video/`.

**Tech Stack:** Next.js 16 App Router, Tailwind v4, plain HTML `<video>`

---

### Task 1: Copy video asset into public folder

**Files:**
- Add: `public/assets/video/geo-bg.mp4`

- [ ] **Step 1: Copy the file**

Run in PowerShell from the project root (`C:\Users\ollie\cj-websites\cj-creative-studio`):

```powershell
Copy-Item "C:\Users\ollie\Downloads\hf_20260625_232225_ef4c1f7f-3218-4c4f-bccf-9d55e9e5ef79.mp4" -Destination "public\assets\video\geo-bg.mp4"
```

- [ ] **Step 2: Verify the file exists**

```powershell
Test-Path "public\assets\video\geo-bg.mp4"
```

Expected output: `True`

- [ ] **Step 3: Commit**

```bash
git add public/assets/video/geo-bg.mp4
git commit -m "feat: add higgsfield geometric video asset"
```

---

### Task 2: Update GeoVideoBackground component

**Files:**
- Modify: `components/geo-video-background.tsx`

Current file contents:
```tsx
export default function GeoVideoBackground() {
  return (
    <video
      className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none opacity-[0.07]"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
    >
      <source src="/assets/video/geo-dark-loop.mp4" type="video/mp4" />
    </video>
  );
}
```

- [ ] **Step 1: Update the component**

Replace the entire contents of `components/geo-video-background.tsx` with:

```tsx
export default function GeoVideoBackground() {
  return (
    <video
      className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none opacity-[0.20]"
      style={{ filter: "brightness(0.85) contrast(1.1)" }}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
    >
      <source src="/assets/video/geo-bg.mp4" type="video/mp4" />
    </video>
  );
}
```

- [ ] **Step 2: Verify TypeScript still compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/geo-video-background.tsx
git commit -m "feat: swap geo video background to higgsfield asset, increase opacity to 0.20"
```

---

### Task 3: Delete old video asset

**Files:**
- Delete: `public/assets/video/geo-dark-loop.mp4`

- [ ] **Step 1: Verify nothing else references the old file**

```bash
grep -r "geo-dark-loop" .
```

Expected: no matches (after the component change in Task 2).

- [ ] **Step 2: Delete the file**

```powershell
Remove-Item "public\assets\video\geo-dark-loop.mp4"
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old geo-dark-loop video asset"
```

---

### Task 4: Deploy to production

- [ ] **Step 1: Push to main**

```bash
git push origin main
```

- [ ] **Step 2: Confirm Vercel build passes**

Check https://vercel.com/ojackson27s-projects/cj-studio for a green deployment.

- [ ] **Step 3: Spot-check live site**

Visit https://www.cjcreativestudio.com/ and at least one inner page (e.g. `/about`) to confirm the new video is playing at the correct opacity with no visual regressions.
