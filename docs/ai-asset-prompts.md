# CJ Studio — AI Asset Generation Prompts

All video prompts target Higgsfield (`kling3_0` model, 5–10s, 16:9).
All image prompts target Higgsfield image generation or similar.
Frame extraction: FFmpeg at 30fps → `public/assets/sequence/` (see `scripts/generate-sequence.mjs`).

---

## 1. HERO SCROLL SEQUENCE (Priority: Critical)

### 1a. MacBook Push-In — Wide to Close
*The main canvas scroll sequence. Must be a single uninterrupted camera move
with zero cuts. The scroll engine scrubs this frame-by-frame.*

**Model:** `kling3_0` | **Duration:** 8–10s | **Aspect:** 16:9 | **Resolution:** 1080p

```
Hyper-realistic 3D product render. An Apple MacBook Pro 16-inch sits
open on a clean white desk in a minimal all-white studio room. Soft,
diffused natural light from above and left creates a gentle warm glow
around the laptop. A soft white aurora/bloom halo radiates from behind
the screen. The MacBook screen glows with a clean, bright interface.

The camera begins wide — about 2 metres back from the desk — and executes
an ultra-slow, perfectly smooth push-in directly toward the MacBook screen.
No camera shake, no drift, no cut. Pure linear dolly-in motion. By the
final frame the MacBook screen fills the entire viewport.

White background. White desk. Chrome MacBook. Soft bokeh on desk edges.
Apple product photography aesthetic. 4K photorealism. Anamorphic lens.
```

**Critical for frame scrubbing:** The motion must be perfectly linear —
no easing in or out, no acceleration. Consistent pixel movement per frame.

---

### 1b. Screen Entry — Into the Portal
*Optional second sequence. Chains after 1a: camera breaches the screen
and transitions into darkness. Can be used to bridge to the dark portal veil.*

**Model:** `kling3_0` | **Duration:** 5s | **Aspect:** 16:9

```
First-person perspective entering through a glowing laptop screen.
Ultra-slow camera pushes through the glass surface of a MacBook display.
The bright white room behind dissolves as the camera moves forward.
The screen fills the frame, then the camera passes through it — white
fading to deep dark (#0c0e14), a subtle lens flare at the moment of
transition. No cuts. Cinematic, photorealistic, anamorphic.
```

---

## 2. PROJECT / WORK IMAGERY (Priority: High)

*Replace current Unsplash placeholders in `lib/projects.ts`.*
*Image size: 1600×900px minimum, horizontal format.*

### 2a. Maple & Co (Restaurant)
**Model:** Higgsfield image | **Aspect:** 16:9

```
Luxury restaurant website hero mockup on a MacBook Pro screen. The
website shown has a warm amber and cream colour palette. Seasonal menu
photography, elegant serif typography. Dark wood textures, candlelit
ambience visible on the screen. The MacBook sits on a marble surface.
Editorial photography style, shallow depth of field. 4K, photorealistic.
```

### 2b. Northfield Law (Legal)
**Model:** Higgsfield image | **Aspect:** 16:9

```
Premium law firm website on a MacBook Pro screen. The site design is
authoritative and clean — navy blue, white, and gold accents. Bold
serif headings, structured practice area layout. The MacBook sits on
a dark walnut desk with a leather folder beside it. Moody, professional
office lighting. Editorial photography. 4K, photorealistic.
```

### 2c. Bloom Studio (Photography)
**Model:** Higgsfield image | **Aspect:** 16:9

```
Beautiful photography portfolio website on a MacBook Pro screen. The
site is minimal — large edge-to-edge photography, white space, light
serif font. The MacBook sits on a pale oak desk with a small plant and
camera lens nearby. Bright natural window light. Clean, airy, editorial.
4K, photorealistic.
```

---

## 3. OG / SOCIAL SHARING IMAGE (Priority: High)

*Replaces `/public/assets/cj-logo-stacked.png`. Size: 1200×630px.*

**Model:** Higgsfield image | **Aspect:** ~1.9:1

```
Dark premium web design agency brand card. Deep dark background (#0c0e14).
Centred layout: "CJ Studio" in clean white sans-serif type, large.
Subtitle: "UK Web Design Studio" in small monospace caps.
A subtle gradient aurora glow — teal and violet — emanates from behind
the text, soft and atmospheric. Bottom edge: "cjcreativestudio.com" in
small monospace. Minimal, high-end, modern. Similar aesthetic to Linear,
Vercel, or Arc browser marketing. No photography, pure typographic design.
```

---

## 4. FOUNDER CARDS (Priority: Medium)

*For the About page founder section. Currently showing initials only.*
*Deliver as 400×400px portrait, square crop.*

### 4a. Ollie Jackson
```
Professional portrait photograph of a young British man in his mid-20s.
Smart-casual — dark navy crewneck or shirt. Clean minimal background,
soft studio lighting, slight shallow depth of field. Confident, approachable
expression. Headshot style, square crop. Editorial photography.
```
*(Replace with actual photo when available — AI portraits carry uncanny valley risk)*

### 4b. Josh Carter
```
[Same prompt as above, adjust for Josh's actual appearance when available]
```

**Note:** Real founder photos are strongly recommended over AI-generated
portraits for trust/credibility. Use as placeholders only.

---

## 5. SERVICES SECTION VISUALS (Priority: Medium)

*Atmospheric imagery for the /services page cards.*

### 5a. Design Service
```
Abstract close-up: a designer's hand holding an Apple Pencil over a
glowing iPad Pro with a wireframe layout visible on screen. Dark moody
studio lighting with a single warm key light. Bokeh background.
Cinematic, editorial. 4K.
```

### 5b. Development / Build Service
```
Abstract close-up: lines of clean TypeScript code on a dark code editor
(VS Code dark theme). MacBook keyboard partially visible. Subtle cyan
syntax highlighting glows. Dark environment, single blue-tinted monitor
glow. Cinematic, editorial. 4K.
```

### 5c. Upkeep / Retainer Service
```
Abstract: a sleek dashboard interface on a 27-inch iMac screen showing
clean analytics charts — green upward trends, minimal design. Minimal
white desk setup, soft daylight. Conveys stability and growth.
Editorial photography. 4K.
```

---

## 6. CTA / SECTION BACKGROUNDS (Priority: Low)

*Dark atmospheric background for CTA and footer sections.*

```
Dark cinematic background texture. Very deep near-black (#0c0e14),
with an extremely subtle blue-teal aurora gradient bloom in the upper
right. Faint particle/grain texture. No objects, no text, no focal
point. Pure atmospheric background. Seamless tile edges. 16:9.
```

---

## Generation Notes

- **Higgsfield plan:** All video prompts require kling3_0 which consumes
  significant credits. Budget 1a + 1b together as one session.
- **Frame extraction:** Run `node scripts/generate-sequence.mjs` once
  video URL is obtained. Script handles download + FFmpeg extraction.
- **For 1a:** Request the longest available duration (8–10s) to get
  smooth frame coverage across the full 300vh scroll distance.
- **Review before committing frames:** Always spot-check `0001.jpg`,
  `0075.jpg`, and `0150.jpg` to verify motion is smooth end-to-end.
