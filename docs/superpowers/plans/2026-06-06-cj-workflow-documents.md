# CJ Studio Workflow Documents — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the complete `cj-workflow/` directory — master intake, four track playbooks, and two templates — that together form the agent-ready production workflow for CJ Studio client projects.

**Architecture:** A standalone directory at `C:/Users/ollie/cj-workflow/` (separate from any client project) containing one master intake document, four track-specific playbooks, and two reusable templates. Claude reads the master first to determine the track, then reads only the relevant track playbook. Every document is self-contained — no cross-file imports or references needed.

**Tech Stack:** Markdown only. No code. Verification is manual dry-run (simulate a client through the flow end-to-end).

---

## File Map

| File | Responsibility |
|---|---|
| `WORKFLOW.md` | Master intake: 5-question classification logic, decision table, edge cases, handoff instructions |
| `templates/brief.md` | Fill-in-the-blanks client brief used once per project |
| `templates/ARCHITECTURE.md` | Base architecture template — forked and completed per client |
| `tracks/hospitality.md` | Full playbook: brief template, design rules, tools, ARCHITECTURE template, review gates |
| `tracks/trades.md` | Full playbook: brief template, design rules, tools, ARCHITECTURE template, review gates |
| `tracks/professional.md` | Full playbook: brief template, design rules, tools, ARCHITECTURE template, review gates |
| `tracks/creative.md` | Full playbook: brief template, design rules, tools, ARCHITECTURE template, review gates |

---

## Task 1: Initialise cj-workflow repository

**Files:**
- Create: `C:/Users/ollie/cj-workflow/` (directory)
- Create: `C:/Users/ollie/cj-workflow/.gitignore`

- [ ] **Step 1: Create directory and initialise git**

```bash
mkdir C:/Users/ollie/cj-workflow
cd C:/Users/ollie/cj-workflow
git init
mkdir tracks templates
```

- [ ] **Step 2: Create .gitignore**

```
.DS_Store
Thumbs.db
*.bak
```

- [ ] **Step 3: Verify structure**

```bash
ls C:/Users/ollie/cj-workflow
```

Expected output: `templates/  tracks/  .gitignore`

- [ ] **Step 4: Commit**

```bash
cd C:/Users/ollie/cj-workflow
git add .gitignore
git commit -m "init: create cj-workflow repository structure"
```

---

## Task 2: Write WORKFLOW.md

**Files:**
- Create: `C:/Users/ollie/cj-workflow/WORKFLOW.md`

- [ ] **Step 1: Write WORKFLOW.md**

```markdown
# CJ Studio — Client Workflow Master

This is the first document to open for every new client project.
Follow it in order. Do not skip steps.

---

## Step 1: Send the Intake Form

Send the client the Tally.so intake form before the first call.
The form contains exactly 5 questions — do not add more.

**Tally.so form questions (set up once, reuse forever):**

| # | Question | Format |
|---|---|---|
| Q1 | What does your business do? | Multiple choice: Food & drink / Trades & construction / Professional service / Creative & arts / Other |
| Q2 | What do you most want the site to do? | Multiple choice: Get people to visit / Get quote enquiries / Build credibility & trust / Showcase my work |
| Q3 | How important is atmosphere & visual feel vs detailed information? | Scale 1–5 labelled "Mostly feel" to "Mostly information" |
| Q4 | Do you have professional photos of your business/work? | Multiple choice: Yes, lots / Yes, a few / No — need sourcing / No — AI generation fine |
| Q5 | Share 2–3 websites you admire (in or out of your industry) | Free text |

---

## Step 2: Classify the Client

Read Q1 and Q2. Find the matching row below. Q3 breaks ties.

| Track | Q1 answer | Q2 answer | Q3 score |
|---|---|---|---|
| 🍽 Hospitality | Food & drink | Get people to visit | 1–2 |
| 🏗 Trades | Trades & construction | Get quote enquiries | 3–4 |
| 💼 Professional Services | Professional service | Build credibility & trust | 4–5 |
| 🎨 Creative | Creative & arts | Showcase my work | 1 |

**Edge cases — human decision required:**
- Client answered "Other" for Q1 → book a discovery call, classify manually
- Q1 and Q2 point to different tracks → Q2 takes priority; if still unclear, use Q3
- Client is a local business that doesn't fit any category → default to Trades unless clearly creative

Write your track decision at the top of `templates/brief.md` before continuing.

---

## Step 3: Open the Track Playbook

Open `tracks/[your-track].md`. Read it fully before doing anything else.
The track playbook is your single source of truth for the build.

- Hospitality → `tracks/hospitality.md`
- Trades → `tracks/trades.md`
- Professional Services → `tracks/professional.md`
- Creative → `tracks/creative.md`

---

## Step 4: Fill In the Brief

Open `templates/brief.md`. Fill in every field using the client's intake
form answers, your discovery call notes, and any assets provided.

Do not start Phase 1 design work until the brief is complete.

---

## Step 5: Begin Phase 1

Hand `templates/brief.md` and `tracks/[type].md` to Claude with this prompt:

> "You are working on a new client website project for CJ Studio.
> Read the attached brief and track playbook fully before doing anything.
> Begin Phase 1: run the automated inspiration pull, then assist with
> the design direction tasks listed in the playbook.
> Do not write any code until Phase 2 is explicitly started."

Claude will:
1. Call the Dribbble MCP tool and Behance MCP tool using keywords from the brief
2. Return 10–15 reference images for your review
3. Generate a moodboard description from the references + Q5 sites
4. Suggest page structure for the track
5. Draft copy for key sections

You review all outputs. Approve what you want, discard the rest.
Proceed to the track-specific review gate listed in the playbook before Phase 2.
```

- [ ] **Step 2: Verify WORKFLOW.md is complete**

Open the file and confirm: intake table present, classification table present, all 4 tracks listed, edge cases covered, Phase 1 handoff prompt included.

- [ ] **Step 3: Commit**

```bash
cd C:/Users/ollie/cj-workflow
git add WORKFLOW.md
git commit -m "feat: add master intake and classification workflow"
```

---

## Task 3: Write templates/brief.md

**Files:**
- Create: `C:/Users/ollie/cj-workflow/templates/brief.md`

- [ ] **Step 1: Write brief.md**

```markdown
# Client Brief — [CLIENT NAME]

**Date:** YYYY-MM-DD
**Track:** [Hospitality / Trades / Professional Services / Creative]
**Classified by:** [Ollie / Josh]
**Project repo:** [GitHub URL]
**Vercel project:** [Vercel URL]

---

## Client Details

- Business name:
- Industry / what they do:
- Location (town, city):
- Primary contact name:
- Primary contact email:
- Phone (optional):

---

## Project Goals

- Primary goal (Q2):
- Secondary goals:
- What does success look like for this client?
- Anything the current site (if any) does badly:

---

## Brand

- Preferred colours (hex codes or descriptions):
- Typography preferences (if any):
- 3 words that describe the desired feel (e.g. bold, warm, minimal):
- Words / styles to AVOID:
- Existing logo: [Yes — filename: / No — needs creating]

---

## Photography

- Photography status (Q4):
- Number of photos provided:
- Cloudinary folder URL:
- Photography gaps (what's missing that we need):

---

## Reference Sites (from Q5)

1.
2.
3.
Additional references found by Dribbble/Behance MCP:
4.
5.

---

## Pages Required

(List each page — e.g. Home, About, Services, Contact, Gallery, Menu)

-
-
-
-

---

## Key Content

(Paste or summarise the main copy and content the client has provided.
Include: tagline, about text, services list, testimonials, contact info.)

### Tagline / Hero headline:

### About:

### Services / Offerings:

### Testimonials (if any):

### Contact details (address, phone, email, hours):

---

## Special Requirements

(Integrations, specific sections, constraints, accessibility needs, etc.)

---

## Budget & Timeline

- Agreed build fee: £
- Deposit paid: [Yes / No / Date]
- Target launch date:
- First demo deadline:
```

- [ ] **Step 2: Verify every field is labelled clearly**

No field should be ambiguous. Every section that needs client input has a clear prompt.

- [ ] **Step 3: Commit**

```bash
cd C:/Users/ollie/cj-workflow
git add templates/brief.md
git commit -m "feat: add client brief template"
```

---

## Task 4: Write templates/ARCHITECTURE.md

**Files:**
- Create: `C:/Users/ollie/cj-workflow/templates/ARCHITECTURE.md`

- [ ] **Step 1: Write ARCHITECTURE.md**

```markdown
# ARCHITECTURE — [CLIENT NAME] ([TRACK])

> This file is generated at the start of Phase 2 by Claude.
> Claude reads tracks/[type].md + templates/brief.md and fills in
> the [PLACEHOLDER] values. Do not edit manually after Claude generates it.

---

## Tech Stack

- Framework: Next.js (App Router)
- Styling: Tailwind CSS v4
- Animation: Framer Motion [add: + GSAP if Hospitality or Creative track]
- Components: Aceternity UI, 21st.dev, Magic UI
- Scroll: Lenis
- Deployment: Vercel
- Track-specific packages: [from track playbook Section 3]

---

## Brand Tokens

```css
/* globals.css — paste these into the :root block */
--color-primary: #[HEX];
--color-secondary: #[HEX];
--color-background: #[HEX];
--color-text: #[HEX];
--color-accent: #[HEX];

--font-display: '[FONT NAME]', sans-serif;
--font-body: '[FONT NAME]', sans-serif;
```

---

## Page Structure

(One entry per page. List the components that make up each page in order.)

### [PAGE NAME]
- [ComponentName] — [one line description]
- [ComponentName] — [one line description]

---

## Component Inventory

(Every component to be built. One line each: name + file path + responsibility.)

| Component | File | Responsibility |
|---|---|---|
| [Name] | `components/[name].tsx` | [what it does] |

---

## APIs & Integrations

(From the track playbook. List every external service used.)

| Service | Purpose | Auth method |
|---|---|---|
| [Service] | [what for] | [API key / OAuth / none] |

---

## Design Constraints

(Copied verbatim from the track playbook Design Direction Rules.
Claude must not deviate from these.)

[PASTE DESIGN DIRECTION RULES FROM TRACK PLAYBOOK HERE]

---

## File Naming Conventions

- Components: PascalCase (`HeroSection.tsx`)
- Pages: lowercase with hyphens (`app/about/page.tsx`)
- Styles: co-located with component (`HeroSection.module.css`) or Tailwind only
- Images: lowercase with hyphens (`hero-bg.jpg`)
```

- [ ] **Step 2: Verify the template**

Confirm: brand token block is complete, page structure section is present, component inventory table is present, design constraints section references the track playbook explicitly.

- [ ] **Step 3: Commit**

```bash
cd C:/Users/ollie/cj-workflow
git add templates/ARCHITECTURE.md
git commit -m "feat: add base ARCHITECTURE.md template"
```

---

## Task 5: Write tracks/hospitality.md

**Files:**
- Create: `C:/Users/ollie/cj-workflow/tracks/hospitality.md`

- [ ] **Step 1: Write tracks/hospitality.md**

```markdown
# 🍽 Hospitality Track Playbook

**For:** Restaurants, cafes, bars, food businesses, street food, catering.
**Goal:** Make the visitor want to go there before they read a single word.

---

## Section 1: Track Brief Template

Add these hospitality-specific fields to `templates/brief.md` under Special Requirements:

- Type of venue (restaurant / cafe / bar / takeaway / catering):
- Seating capacity (approx):
- Average spend per person: £
- Cuisine / food style:
- Opening hours:
- Does the client take reservations? [Yes / No / Walk-in only]
- Menu URL or attach menu PDF:
- Instagram handle (for atmosphere reference):
- Unique selling point (what makes them different):

---

## Section 2: Design Direction Rules

These rules are non-negotiable. Claude must not deviate from them.

**Animation:**
- Hero: parallax background (depth factor 0.3), no auto-play video unless provided by client
- Scroll reveals: Framer Motion, duration 0.8s, ease "easeOut", stagger 0.1s per item
- Image grids: staggered entry only — no spinning, bouncing, or sliding carousels
- Menu items: fade-up on scroll, no hover flip effects

**Layout:**
- Hero: 100vh, full-bleed photography, text overlay maximum 2 lines + CTA
- Text sections: minimum py-24 padding, maximum 65ch line width for body copy
- No white card boxes placed over photographs — overlays only (rgba)
- CTA placement: in hero AND at bottom of page, nowhere else

**Photography treatment:**
- Always background-size: cover, never contain
- Full saturation — no desaturation, no black-and-white
- Subtle noise/grain SVG filter permitted for texture (opacity max 0.04)
- No stock photos — client photography or Unsplash food collections only
- Minimum image count to begin build: 15 photos (see review gate)

**Typography:**
- Display: text-6xl to text-8xl for hero headline
- Body: text-lg, leading-relaxed
- No uppercase labels, no tight tracking
- Serif display font permitted and encouraged for premium feel

**Colour:**
- Dark overlays on photography: rgba(0,0,0,0.3) to rgba(0,0,0,0.5)
- Background: off-white or very light warm neutral — never pure #FFFFFF
- Accent: one bold colour sampled from the hero photograph

**DO NOT USE:**
- Gradient text
- Rounded card grids (border-radius max 8px on any image container)
- Bullet point lists in hero or intro sections
- Stock illustration or icon packs
- Bold coloured CTA buttons with rounded-full — use outlined or underlined links instead

---

## Section 3: Tool & Component List

Install exactly these packages. No additions without a deliberate decision.

```bash
npm install lenis framer-motion react-photo-album
npm install @googlemaps/js-api-loader
```

Optional (only if menu animation is required):
```bash
npm install gsap @gsap/react
```

**Components to build (standard hospitality site):**
- `HeroSection` — full-bleed photo, parallax bg, headline + CTA
- `ScrollReveal` — Framer Motion wrapper, reused throughout
- `AtmosphereSection` — 2–3 mood images with short text
- `MenuHighlights` — selected dishes/drinks with photography
- `PhotoGallery` — react-photo-album grid
- `LocationSection` — Google Maps embed + address + hours
- `Navbar` — transparent over hero, solid on scroll
- `Footer` — minimal: address, hours, social links

**APIs:**
- Google Maps JavaScript API — location embed
- Google Places API — pull live review rating (optional, requires Places key)
- LottieFiles player — subtle food/drink micro-animation in hero or loading state (optional)

---

## Section 4: ARCHITECTURE.md Template (Hospitality)

When generating ARCHITECTURE.md for a hospitality client, Claude uses this
page structure as the base. Adapt section order to client needs.

```
## Page Structure

### Home (app/page.tsx)
- Navbar — transparent, fixed, collapses to solid on scroll
- HeroSection — full-bleed photo, parallax, headline, CTA
- AtmosphereSection — 2 images + short brand statement
- MenuHighlights — 4–6 hero dishes/drinks with photo + name + short desc
- PhotoGallery — 8–12 atmosphere photos, react-photo-album masonry
- LocationSection — Google Map + address + opening hours table
- Footer — address, hours, social, copyright

### Menu (app/menu/page.tsx) [optional — only if client provides full menu]
- Navbar
- MenuHero — simple text hero
- MenuCategories — tabbed or scrolling sections per category
- Footer

## Component Inventory

| Component | File | Responsibility |
|---|---|---|
| Navbar | components/Navbar.tsx | Fixed nav, transparent→solid on scroll via Lenis progress |
| HeroSection | components/HeroSection.tsx | 100vh parallax hero, Framer Motion overlay text |
| ScrollReveal | components/ScrollReveal.tsx | Reusable Framer Motion fade-up wrapper |
| AtmosphereSection | components/AtmosphereSection.tsx | 2-image split with brand text |
| MenuHighlights | components/MenuHighlights.tsx | Grid of MenuCard components |
| MenuCard | components/MenuCard.tsx | Single dish: image + name + description |
| PhotoGallery | components/PhotoGallery.tsx | react-photo-album masonry layout |
| LocationSection | components/LocationSection.tsx | Google Maps embed + hours table |
| Footer | components/Footer.tsx | Address, hours, social, copyright |
```

---

## Section 5: Human Review Gates

These gates must be passed before moving to the next phase. Do not proceed without explicit sign-off.

### Gate 1 — Photography (before Phase 2 starts)

**Required minimum:**
- 3+ exterior shots
- 6+ food or drink shots
- 3+ interior/atmosphere shots

If below minimums: stop. Request more photos from client or arrange a photoshoot. Do not substitute with stock photography without client approval.

Sign off: ___________________________ Date: ___________

### Gate 2 — Colour Palette (before Phase 2 starts)

Confirm the palette is derived from actual photography — not invented. At least the primary accent colour must be sampled directly from the hero photo using Coolors.co eyedropper.

Sign off: ___________________________ Date: ___________

### Gate 3 — Content Accuracy (before Phase 2 starts)

Client has confirmed in writing:
- [ ] Menu items and prices are correct
- [ ] Opening hours are correct
- [ ] Address is correct
- [ ] Contact details are correct

Sign off: ___________________________ Date: ___________

### Gate 4 — Per-Section Demo (during Phase 3)

Share Vercel preview URL with client after:
- [ ] Hero + Navbar complete
- [ ] Full home page complete
- [ ] Any additional pages complete

Client response received and incorporated before continuing.
```

- [ ] **Step 2: Verify completeness**

All 5 sections present. Design rules include explicit DO NOT USE list. Gate sign-off lines are blank (to be filled per project). Package install commands are exact.

- [ ] **Step 3: Commit**

```bash
cd C:/Users/ollie/cj-workflow
git add tracks/hospitality.md
git commit -m "feat: add hospitality track playbook"
```

---

## Task 6: Write tracks/trades.md

**Files:**
- Create: `C:/Users/ollie/cj-workflow/tracks/trades.md`

- [ ] **Step 1: Write tracks/trades.md**

```markdown
# 🏗 Trades & Construction Track Playbook

**For:** Builders, roofers, plumbers, electricians, landscapers, decorators, groundworkers.
**Goal:** Build trust in 10 seconds. Get the phone ringing or the quote form submitted.

---

## Section 1: Track Brief Template

Add these trades-specific fields to `templates/brief.md` under Special Requirements:

- Trade type (builder / roofer / plumber / etc.):
- Service area (towns/counties covered):
- Years in business:
- Accreditations (e.g. Gas Safe, NICEIC, FMB, TrustMark):
- Number of completed projects to showcase:
- Does client have before/after photos? [Yes / No]
- Preferred quote method: [Phone / Email form / WhatsApp]
- Google Business profile URL (for reviews):
- Approximate number of Google reviews:

---

## Section 2: Design Direction Rules

These rules are non-negotiable. Claude must not deviate from them.

**Animation:**
- Entrance animations only: fade-up on scroll, duration 0.5s, ease "easeOut"
- No parallax, no stagger delays longer than 0.05s
- No decorative motion — every animation must serve readability

**Layout:**
- Hero: full-width, project photo background OR solid dark colour with bold headline
- CTA (phone number or "Get a quote") must be visible above the fold on all screen sizes
- Phone number in navbar on desktop, sticky bottom bar on mobile
- Reviews section: immediately after hero or services — trust signals early
- Quote form: one screen's worth of fields maximum (name, email, phone, job description, postcode)

**Photography treatment:**
- Project photos: before/after pairs where available
- Square or landscape crop — consistent across gallery
- No filters, no grain — clean and professional
- Minimum image count: 8 project photos to begin build

**Typography:**
- Display: bold, heavy weight (font-weight 700–900), text-4xl to text-6xl for hero
- Body: text-base, leading-relaxed — readable above all else
- No serif fonts — sans-serif only
- No decorative or script typefaces

**Colour:**
- Dark, strong palette: navy, charcoal, slate, forest green — conveys reliability
- One strong accent (often a trade colour — gas blue, electrical yellow, etc.)
- White or very light background for content sections
- Never: pastels, gradients, or anything that reads as "cute"

**DO NOT USE:**
- Gradient text
- Rounded hero images or project photos
- Script or decorative fonts
- Animated counters ("500+ happy customers" counting up)
- Stock photos of tradespeople — use client's actual project photos only
- Testimonial carousels — static grid only

---

## Section 3: Tool & Component List

```bash
npm install lenis framer-motion react-photo-album
```

Optional (quote form submission):
```bash
npm install @formspree/react
```

**Components to build:**
- `HeroSection` — strong headline, CTA button + phone number, project photo or dark bg
- `ScrollReveal` — Framer Motion fade-up wrapper
- `ServicesGrid` — 3–6 service cards with icon + name + short description
- `ProjectGallery` — react-photo-album, before/after pairs where available
- `ReviewsSection` — static grid of 3–5 Google reviews (pulled manually or via API)
- `AccreditationBar` — logo strip of trade body accreditations
- `QuoteForm` — name, email, phone, job description, postcode, submit via Formspree
- `Navbar` — logo + phone number visible at all times on desktop
- `MobileCallBar` — sticky bottom bar on mobile: phone + "Get a quote"
- `Footer` — address, service area, accreditations, copyright

**APIs:**
- Formspree — quote form submission (no backend required)
- Google Places API — pull review count and rating automatically (optional)
- react-photo-album — project gallery

---

## Section 4: ARCHITECTURE.md Template (Trades)

```
## Page Structure

### Home (app/page.tsx)
- Navbar — logo left, phone number right, always visible
- HeroSection — bold headline + CTA, project photo or dark bg
- ServicesGrid — 3–6 key services
- ProjectGallery — 8–12 project photos
- ReviewsSection — 3–5 testimonials + star rating
- AccreditationBar — trade body logos
- QuoteForm — full-width section
- MobileCallBar — sticky, mobile only
- Footer

### About (app/about/page.tsx) [optional]
- Navbar
- AboutHero — photo of team/owner + years in business
- Story section — short paragraph
- AccreditationBar
- Footer

## Component Inventory

| Component | File | Responsibility |
|---|---|---|
| Navbar | components/Navbar.tsx | Logo + phone, fixed, solid background |
| HeroSection | components/HeroSection.tsx | Bold headline, CTA, background photo or colour |
| ScrollReveal | components/ScrollReveal.tsx | Fade-up wrapper |
| ServicesGrid | components/ServicesGrid.tsx | Grid of ServiceCard |
| ServiceCard | components/ServiceCard.tsx | Icon + name + short desc |
| ProjectGallery | components/ProjectGallery.tsx | react-photo-album |
| ReviewsSection | components/ReviewsSection.tsx | Grid of ReviewCard |
| ReviewCard | components/ReviewCard.tsx | Star rating + quote + name |
| AccreditationBar | components/AccreditationBar.tsx | Logo strip |
| QuoteForm | components/QuoteForm.tsx | Formspree-connected form |
| MobileCallBar | components/MobileCallBar.tsx | Sticky mobile bottom bar |
| Footer | components/Footer.tsx | Address, service area, copyright |
```

---

## Section 5: Human Review Gates

### Gate 1 — Content Ready (before Phase 2)

Client has confirmed in writing:
- [ ] Services list is complete and accurate
- [ ] Service area is confirmed
- [ ] Accreditation logos provided (or URLs to download from)
- [ ] At least 8 project photos provided
- [ ] Google Business profile URL provided for review embed

Sign off: ___________________________ Date: ___________

### Gate 2 — CTA Copy (before Phase 2)

Agree the exact wording for:
- Hero headline:
- Hero CTA button text:
- Quote form heading:
- Form submit button text:

Client-approved CTA copy recorded above before build starts.

Sign off: ___________________________ Date: ___________

### Gate 3 — Per-Section Demo (during Phase 3)

- [ ] Hero + Navbar + MobileCallBar complete
- [ ] Services + Gallery + Reviews complete
- [ ] Quote form tested (submit a test entry, confirm receipt)

Client response received and incorporated before continuing.
```

- [ ] **Step 2: Verify completeness**

All 5 sections present. MobileCallBar component is in both the component list and the page structure. Formspree setup is noted. Gate 2 has blank lines for agreed CTA copy.

- [ ] **Step 3: Commit**

```bash
cd C:/Users/ollie/cj-workflow
git add tracks/trades.md
git commit -m "feat: add trades and construction track playbook"
```

---

## Task 7: Write tracks/professional.md

**Files:**
- Create: `C:/Users/ollie/cj-workflow/tracks/professional.md`

- [ ] **Step 1: Write tracks/professional.md**

```markdown
# 💼 Professional Services Track Playbook

**For:** Accountants, solicitors, consultants, clinics, financial advisers, coaches, agencies.
**Goal:** Establish authority and credibility. Convert the visit into a booked call or enquiry.

---

## Section 1: Track Brief Template

Add these professional-services-specific fields to `templates/brief.md`:

- Profession / service type:
- Target client (who hires them — e.g. small business owners, individuals, corporates):
- Number of services to list:
- Does client want online booking? [Yes — use Cal.com / No]
- Cal.com username (if booking required):
- Does client need a CMS for blog/news? [Yes — use Sanity / No]
- Qualifications and credentials to display:
- Number of testimonials available:
- LinkedIn profile URL:

---

## Section 2: Design Direction Rules

**Animation:**
- Subtle only: fade-in on scroll, duration 0.4s, no movement larger than 12px translateY
- No parallax, no stagger, no scroll-triggered sequences
- Hover states on service cards and CTA buttons only

**Layout:**
- Above-fold: headline + sub-headline + single CTA (book a call / contact us)
- Services: clean grid or vertical list — no icons unless genuinely informative
- Credentials and social proof immediately visible without scrolling on desktop
- Booking widget (Cal.com) embedded inline — not hidden behind a "contact" link

**Typography:**
- Clean, authoritative sans-serif (Inter, DM Sans, or similar)
- text-5xl max for hero headline — no oversized display type
- Body: text-base, leading-relaxed, maximum 70ch line width
- No decorative, script, or display fonts

**Colour:**
- Conservative: navy, slate, deep green, charcoal — never bright or playful
- One accent only, used exclusively for CTAs and links
- White or very light grey background — uncluttered
- Never: gradients, duotones, bold background colours behind text sections

**Photography:**
- Headshot of the practitioner or team — high quality, professional
- No stock photos of handshakes, people on laptops, or generic "business" imagery
- Office or workspace photos if available and well-lit

**DO NOT USE:**
- Gradient text
- Animated counters or statistics
- Testimonial carousels — static only
- Icon illustration packs
- Dark mode or dark backgrounds
- Oversized hero type (keep it professional and readable)

---

## Section 3: Tool & Component List

```bash
npm install lenis framer-motion
```

Optional (online booking):
```bash
# No npm install needed — Cal.com embeds via script tag
```

Optional (CMS):
```bash
npm install next-sanity @sanity/image-url
```

**Components to build:**
- `HeroSection` — headline, sub-headline, single CTA
- `ScrollReveal` — subtle fade-in wrapper
- `ServicesSection` — clean list or grid of services
- `CredentialsBar` — qualifications, memberships, years of experience
- `TestimonialsSection` — static grid, 3–5 quotes with name and company
- `BookingSection` — Cal.com inline embed (if booking required)
- `TeamSection` — headshot + bio (if multiple practitioners)
- `ContactSection` — Resend-powered contact form
- `Navbar` — clean, minimal, CTA button in top right
- `Footer` — address, phone, email, LinkedIn, copyright

**APIs:**
- Cal.com embed — inline booking widget (no API key needed for basic embed)
- Resend — contact form email delivery
- Sanity.io — CMS for blog/news (only if client needs content management)

---

## Section 4: ARCHITECTURE.md Template (Professional Services)

```
## Page Structure

### Home (app/page.tsx)
- Navbar — minimal, CTA button top right
- HeroSection — headline + sub-headline + CTA
- ServicesSection — service grid or list
- CredentialsBar — qualifications, memberships
- TestimonialsSection — static quotes
- BookingSection — Cal.com embed (if applicable)
- ContactSection — Resend form
- Footer

### About (app/about/page.tsx) [optional]
- Navbar
- TeamSection or solo practitioner bio
- Credentials detail
- Footer

### Blog (app/blog/page.tsx) [only if Sanity CMS requested]
- Navbar
- Post listing from Sanity
- Footer

## Component Inventory

| Component | File | Responsibility |
|---|---|---|
| Navbar | components/Navbar.tsx | Minimal nav, CTA button |
| HeroSection | components/HeroSection.tsx | Headline + CTA, professional photo |
| ScrollReveal | components/ScrollReveal.tsx | Subtle fade-in wrapper |
| ServicesSection | components/ServicesSection.tsx | Service grid/list |
| CredentialsBar | components/CredentialsBar.tsx | Qualifications + memberships |
| TestimonialsSection | components/TestimonialsSection.tsx | Static 3–5 quote grid |
| BookingSection | components/BookingSection.tsx | Cal.com inline embed |
| ContactSection | components/ContactSection.tsx | Resend-powered form |
| Footer | components/Footer.tsx | Address, contact, social, copyright |
```

---

## Section 5: Human Review Gates

### Gate 1 — Services and Credentials (before Phase 2)

Client has confirmed in writing:
- [ ] Full services list with descriptions provided
- [ ] All credential/qualification text provided and accurate
- [ ] Professional headshot(s) provided (minimum 1, high resolution)
- [ ] Testimonials provided with permission to publish

Sign off: ___________________________ Date: ___________

### Gate 2 — Booking and Contact Setup (before Phase 2)

- [ ] Cal.com account created and username provided (if booking required)
- [ ] Resend sending domain configured and API key ready
- [ ] Contact form recipient email confirmed

Sign off: ___________________________ Date: ___________

### Gate 3 — Per-Section Demo (during Phase 3)

- [ ] Hero + services complete
- [ ] Full page complete including booking widget tested end-to-end
- [ ] Contact form tested (submit test, confirm email received)

Client response received and incorporated before continuing.
```

- [ ] **Step 2: Verify completeness**

Cal.com embed noted as script tag (no npm). Sanity listed as optional. Resend included. All 5 sections present.

- [ ] **Step 3: Commit**

```bash
cd C:/Users/ollie/cj-workflow
git add tracks/professional.md
git commit -m "feat: add professional services track playbook"
```

---

## Task 8: Write tracks/creative.md

**Files:**
- Create: `C:/Users/ollie/cj-workflow/tracks/creative.md`

- [ ] **Step 1: Write tracks/creative.md**

```markdown
# 🎨 Creative & Portfolio Track Playbook

**For:** Artists, photographers, designers, studios, agencies, musicians, filmmakers.
**Goal:** Make the work the hero. The site IS the portfolio — it must be unforgettable.

---

## Section 1: Track Brief Template

Add these creative-specific fields to `templates/brief.md`:

- Creative discipline (photographer / designer / illustrator / filmmaker / etc.):
- Number of portfolio pieces to showcase:
- Portfolio media types (images / video / mixed):
- Does the client want a custom cursor? [Yes / No]
- Preferred mood (dark and cinematic / light and airy / bold and graphic / minimal):
- Any specific interaction or animation they admire? (from Q5 or additional refs):
- Does the client want a contact/commission form? [Yes / No]
- Does the client want a shop or prints store? [Yes — Shopify / No]

---

## Section 2: Design Direction Rules

**Animation:**
- GSAP ScrollTrigger for scroll-choreographed sequences (pin sections, scrub reveals)
- Framer Motion for component transitions and page transitions
- Custom cursor: follow cursor with lag (lerp factor 0.1), scale on hover over links
- Page transitions: fade or slide — duration 0.6s max
- Portfolio items: staggered reveal with GSAP timeline, not Framer Motion (more control)

**Layout:**
- Hero: full-viewport, work-first — the strongest piece leads
- Portfolio grid: asymmetric or masonry — never uniform card grid
- Text is secondary to imagery everywhere on the page
- Navigation: minimal, often hidden or icon-only — work must not be interrupted
- White space used aggressively — breathing room IS the design

**Photography/Media treatment:**
- No compression artifacts — all images served via Cloudinary at full quality
- Hover reveals (title + year) on portfolio thumbnails
- Video autoplay muted in portfolio grid if video work
- No rounded corners on any media — hard edges only

**Typography:**
- Bold, expressive — typography IS a design element here
- Mixing weights and sizes permitted (e.g. massive display + tiny caption)
- Serif, geometric, or experimental typefaces encouraged
- No system fonts — always a deliberate, distinctive choice

**Colour:**
- Defined entirely by the artist's brand — no default palette
- Dark backgrounds common for photography portfolios
- Light backgrounds common for illustration/design
- One strong accent used sparingly for interactive elements

**DO NOT USE:**
- Standard card-grid portfolio layouts
- Rounded corners on images
- Generic "View my work" CTAs — write specifically ("See the series" / "Explore the archive")
- Testimonials section — not appropriate for this track
- Pricing pages — direct to contact/commission form instead

---

## Section 3: Tool & Component List

```bash
npm install lenis framer-motion gsap @gsap/react react-photo-album
```

Optional (3D elements — only for premium creative sites):
```bash
npm install @react-three/fiber @react-three/drei three
```

Optional (video background in hero):
```bash
# No install needed — native HTML5 video element
```

**Components to build:**
- `HeroSection` — full-viewport, strongest work piece, minimal text
- `CustomCursor` — lerp-following cursor, scale on hover
- `PortfolioGrid` — asymmetric layout, GSAP stagger reveal
- `PortfolioItem` — image/video with hover title reveal
- `PageTransition` — Framer Motion wrapper for route transitions
- `ScrollReveal` — GSAP ScrollTrigger wrapper (not Framer Motion for this track)
- `AboutSection` — artist statement, minimal, text-forward
- `ContactSection` — commission/contact form
- `Navbar` — minimal, hidden on scroll, reappears on scroll-up

Optional:
- `ThreeCanvas` — React Three Fiber scene for 3D hero element
- `VideoBackground` — autoplay muted video with fallback image

**APIs:**
- Cloudinary — all portfolio images served and optimised via Cloudinary URL transforms
- GSAP ScrollTrigger — scroll-choreographed portfolio reveal sequences

---

## Section 4: ARCHITECTURE.md Template (Creative)

```
## Page Structure

### Home (app/page.tsx)
- CustomCursor — global, renders above everything
- Navbar — minimal, hidden/reveals on scroll
- HeroSection — full-viewport, hero work piece
- PortfolioGrid — GSAP ScrollTrigger stagger reveal
- AboutSection — artist statement
- ContactSection — commission form
- Footer — minimal: email + social handles only

### Work detail (app/work/[slug]/page.tsx) [optional — only if individual project pages needed]
- Navbar
- ProjectHero — title + year + medium
- ProjectImages — full-width image sequence
- NextProjectLink — link to next project
- Footer

## Component Inventory

| Component | File | Responsibility |
|---|---|---|
| CustomCursor | components/CustomCursor.tsx | Lerp cursor with hover states |
| Navbar | components/Navbar.tsx | Minimal, hides/shows on scroll direction |
| HeroSection | components/HeroSection.tsx | Full-viewport hero image/video |
| PortfolioGrid | components/PortfolioGrid.tsx | GSAP stagger, asymmetric layout |
| PortfolioItem | components/PortfolioItem.tsx | Image + hover title reveal |
| PageTransition | components/PageTransition.tsx | Framer Motion route transition |
| ScrollReveal | components/ScrollReveal.tsx | GSAP ScrollTrigger wrapper |
| AboutSection | components/AboutSection.tsx | Artist statement |
| ContactSection | components/ContactSection.tsx | Commission/contact form |
| Footer | components/Footer.tsx | Email + social, minimal |
```

---

## Section 5: Human Review Gates

### Gate 1 — Visual Direction (before ANY code — mandatory)

The moodboard must be approved before Phase 2 begins. This is the most important gate on this track. Getting the visual direction wrong means rebuilding.

Present to client:
- [ ] 10–15 reference images from Dribbble/Behance MCP + Q5 sites
- [ ] Written moodboard description: mood, colour philosophy, animation character, typography direction
- [ ] 2–3 layout direction options (can be rough sketches or Canva mockups)

Client written approval of the visual direction recorded here:
> "[Client name] approved the [describe the direction] on [date]."

Sign off: ___________________________ Date: ___________

### Gate 2 — Portfolio Assets (before Phase 2)

- [ ] All portfolio images provided at full resolution
- [ ] Images uploaded to Cloudinary and folder URL confirmed
- [ ] Video files provided in MP4 format (if applicable)
- [ ] At least 8 portfolio pieces ready to build with

Sign off: ___________________________ Date: ___________

### Gate 3 — Per-Section Demo (during Phase 3)

- [ ] Hero + CustomCursor + Navbar working
- [ ] PortfolioGrid with GSAP reveal complete
- [ ] Full site complete — test custom cursor on mobile fallback

Client response received and incorporated before continuing.

**Mobile note:** Custom cursor is desktop-only. On mobile, disable CustomCursor and ensure all hover reveals have a tap equivalent.
```

- [ ] **Step 2: Verify completeness**

Mobile cursor fallback noted in Gate 3. React Three Fiber marked as optional premium-only. GSAP vs Framer Motion distinction is explicit in design rules and component list.

- [ ] **Step 3: Commit**

```bash
cd C:/Users/ollie/cj-workflow
git add tracks/creative.md
git commit -m "feat: add creative and portfolio track playbook"
```

---

## Task 9: Integration Dry-Run

Simulate one complete client project through the entire workflow to catch any gaps or broken cross-references.

**Files:** No changes — verification only.

- [ ] **Step 1: Run the Hospitality scenario**

Imagine a client: "The Old Anchor, a seafood restaurant in Cardiff."
- Q1: Food & drink → Q2: Get people to visit → Q3: 1 → Track: Hospitality ✓
- Open `WORKFLOW.md` — confirm Step 3 points correctly to `tracks/hospitality.md` ✓
- Open `templates/brief.md` — confirm all required fields are present for a restaurant ✓
- Open `tracks/hospitality.md` — confirm Section 1 extra fields cover everything needed ✓
- Confirm `templates/ARCHITECTURE.md` + Section 4 of hospitality playbook together produce a complete ARCHITECTURE.md ✓

- [ ] **Step 2: Run the Trades scenario**

Imagine a client: "Jenkins Roofing, a roofing contractor in Bristol."
- Q1: Trades → Q2: Get quote enquiries → Q3: 3 → Track: Trades ✓
- Verify Formspree quote form setup is documented with enough detail to implement ✓
- Verify MobileCallBar appears in both the component list and page structure ✓

- [ ] **Step 3: Run the Professional Services scenario**

Imagine a client: "Dr Sarah Malik, a private GP in London."
- Q1: Professional service → Q2: Build credibility → Q3: 4 → Track: Professional ✓
- Verify Cal.com is marked as optional and gated behind the correct review gate ✓
- Verify Resend and Sanity are both listed as optional ✓

- [ ] **Step 4: Run the Creative scenario**

Imagine a client: "Tom West, a fashion photographer in Manchester."
- Q1: Creative & arts → Q2: Showcase my work → Q3: 1 → Track: Creative ✓
- Verify Gate 1 (moodboard approval) is before Phase 2 — the most important gate ✓
- Verify mobile cursor fallback is mentioned ✓
- Verify React Three Fiber is marked optional ✓

- [ ] **Step 5: Confirm all cross-references**

- `WORKFLOW.md` Step 3 lists all 4 track filenames — verify filenames match actual files ✓
- All track playbooks reference `templates/brief.md` in Section 1 ✓
- All track playbooks reference `templates/ARCHITECTURE.md` in Section 4 ✓

- [ ] **Step 6: Final commit**

```bash
cd C:/Users/ollie/cj-workflow
git add .
git commit -m "chore: complete workflow document set — all tracks verified"
```

---

## Completion Checklist

After all tasks are done, verify:

- [ ] `cj-workflow/WORKFLOW.md` exists and contains intake form, classification table, edge cases, handoff prompt
- [ ] `cj-workflow/templates/brief.md` exists and has all required fields
- [ ] `cj-workflow/templates/ARCHITECTURE.md` exists and has all required sections
- [ ] `cj-workflow/tracks/hospitality.md` exists with all 5 sections
- [ ] `cj-workflow/tracks/trades.md` exists with all 5 sections
- [ ] `cj-workflow/tracks/professional.md` exists with all 5 sections
- [ ] `cj-workflow/tracks/creative.md` exists with all 5 sections
- [ ] Dry-run scenarios all passed (Task 9)
- [ ] All 9 tasks committed to git with clear commit messages

---

## What Comes Next (separate plans)

- **Plan B: `dribbble-mcp`** — custom MCP server for automated Dribbble inspiration pull
- **Plan C: `behance-mcp`** — custom MCP server for automated Behance inspiration pull

The workflow documents are fully usable without these — the Dribbble/Behance step in Phase 1 can be done manually until the MCP servers are built.
