# Graph Report - cj-studio  (2026-06-13)

## Corpus Check
- 51 files · ~272,070 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 489 nodes · 495 edges · 52 communities (31 shown, 21 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f2fe5399`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `CJ Studio Production Workflow — Design Spec` - 15 edges
3. `File Map` - 14 edges
4. `CJ Studio Workflow Documents — Implementation Plan` - 13 edges
5. `Dribbble MCP Server — Implementation Plan` - 11 edges
6. `CJ Studio Landing Page Implementation Plan` - 11 edges
7. `CJ Creative Studio — Landing Page Design Spec` - 11 edges
8. `Contact Form Design` - 10 edges
9. `Dribbble MCP Server — Design Spec` - 9 edges
10. `Product` - 8 edges

## Surprising Connections (you probably didn't know these)
- `AnimatedButton Component` --references--> `Contact Form Design Spec`  [EXTRACTED]
  components/animated-button.tsx → docs/superpowers/specs/2026-05-30-contact-form-design.md
- `Vercel Logo SVG (public asset)` --conceptually_related_to--> `Vercel Deployment Platform`  [INFERRED]
  public/vercel.svg → components/services.tsx
- `README Next.js Bootstrap Info` --references--> `Vercel Deployment Platform`  [EXTRACTED]
  README.md → components/services.tsx
- `Founders Page` --rationale_for--> `Multi-Page App Router Architecture`  [EXTRACTED]
  app/founders/page.tsx → docs/superpowers/specs/2026-05-31-multipage-refactor-design.md
- `Process Page` --rationale_for--> `Multi-Page App Router Architecture`  [EXTRACTED]
  app/process/page.tsx → docs/superpowers/specs/2026-05-31-multipage-refactor-design.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Components sharing lib/projects.ts data** — component_website_assembly, component_work_teaser, component_work, lib_projects [EXTRACTED 1.00]
- **App Router page shell pattern (Nav + Component + Footer)** — page_work, page_services, page_process, page_founders, component_nav, component_footer [EXTRACTED 1.00]
- **Components implementing useReducedMotion accessibility pattern** — component_hero, component_founders, component_cta, component_nav, component_website_assembly, component_work_teaser, component_work [EXTRACTED 1.00]
- **HomeScrollScene composite: Hero text over WebsiteAssembly 3D background** — component_home_scroll_scene, component_hero, component_website_assembly [EXTRACTED 1.00]

## Communities (52 total, 21 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.17
Nodes (16): Founders Component, Josh Carter (Co-founder), Ollie Jackson (Co-founder), motion/react Animation Library, Pricing Model (Flat Fee, 50/50 Payment, Monthly Upkeep), Process Component, Process Pricing Callout (Custom Quote + Monthly), Process Steps (Brief, Build, Launch) (+8 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (24): dependencies, motion, next, @phosphor-icons/react, react, react-dom, resend, devDependencies (+16 more)

### Community 2 - "Community 2"
Cohesion: 0.21
Nodes (12): Founders Component, WorkTeaser Component, Apple Aesthetic Founders Cards, Shared Project Data Pattern, Projects Data (lib/projects.ts), Josh Carter (Co-founder), Ollie Jackson (Co-founder), Multi-Page Refactor Implementation Plan (+4 more)

### Community 3 - "Community 3"
Cohesion: 0.21
Nodes (14): Footer Component, Logo Component, CJ Studio Agency Brand (Ollie Jackson + Josh Carter), Flat Fee Pricing Model (50% deposit), Multi-Page App Router Architecture, Stripe Payment Processing, UK GDPR / Data Protection Act 2018 Compliance, Vercel Hosting Infrastructure (+6 more)

### Community 5 - "Community 5"
Cohesion: 0.16
Nodes (22): 3D Prism Animation Approach Decision, Browser Mock (Browser-in-Browser Demo), CSS Glass Cards, Glass Prism Animation, JSON Animation Spec, Option A: Augment — Prisms Float Around Browser Mock, Option B: Replace — Full 3D Prism Assembly, Option C: Two-Phase — Prisms Fall Then Reveal Browser Mock (+14 more)

### Community 6 - "Community 6"
Cohesion: 0.10
Nodes (20): 1. Multi-Page Architecture, 2. WebsiteAssembly Animation Fix, 3. Hero Centred Layout, 4. Founders Apple Redesign, Avatar, Card styling, CJ Studio — Multi-Page Refactor & UI Overhaul Design, Debug log removal (+12 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.17
Nodes (11): Completion Checklist, Dribbble MCP Server — Implementation Plan, File Map, Task 1: Initialise repository, Task 2: Write types.ts, Task 3: Write dribbble.ts and tests, Task 4: Write index.ts (MCP server), Task 5: Build and smoke test (+3 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (15): CJ Studio Multi-Page Refactor & UI Overhaul Implementation Plan, File Map, Task 10: Create /services route, Task 11: Create /process route, Task 12: Create /founders route, Task 13: Final verification, Task 1: Extract shared project data, Task 2: Update Work component to use shared data (+7 more)

### Community 11 - "Community 11"
Cohesion: 0.07
Nodes (28): APIs by Track, Architecture: Master + 4 Track Playbooks, CJ Studio Production Workflow — Design Spec, Classification Logic, Claude-assisted tasks (via MCP tools):, 🎨 Creative & Portfolio, 🍽 Hospitality, Human Review Gates Summary (+20 more)

### Community 12 - "Community 12"
Cohesion: 0.06
Nodes (32): About (app/about/page.tsx) [optional], About (app/about/page.tsx) [optional], Blog (app/blog/page.tsx) [only if Sanity CMS requested], CJ Studio Workflow Documents — Implementation Plan, Completion Checklist, Component Inventory, Component Inventory, Component Inventory (+24 more)

### Community 13 - "Community 13"
Cohesion: 0.25
Nodes (6): fontDisplay, fontMono, fontSans, geistMono, geistSans, metadata

### Community 16 - "Community 16"
Cohesion: 0.67
Nodes (3): Geist Sans + Mono Font Variables, Site Metadata (CJ Studio | Web Design), Root Layout (App Router)

### Community 31 - "Community 31"
Cohesion: 0.12
Nodes (15): Animation Sequence, Background — Browser Mock, Constraints, Foreground — Glass Prism Objects, Glass Styling, Overview, Rainbow Light, Reduced Motion Fallback (+7 more)

### Community 32 - "Community 32"
Cohesion: 0.08
Nodes (24): 10. Out of Scope, 1. Tech Stack & Constraints, 2. Architecture, 3. Global Changes (Prerequisites), 3a. Aurora Colors — `app/globals.css`, 3b. Nav Links — `components/nav.tsx`, 3c. Hero Asset, 4. Phase 1 — LaptopZoom (`components/laptop-zoom.tsx`) (+16 more)

### Community 33 - "Community 33"
Cohesion: 0.18
Nodes (10): API Integration, Architecture, Dribbble MCP Server — Design Spec, Error Handling, Overview, Registration in Claude Code, Repository, `search_dribbble` (+2 more)

### Community 34 - "Community 34"
Cohesion: 0.15
Nodes (7): FormState, resend, sendEnquiry(), MotionLink, Props, FormState, initialState

### Community 35 - "Community 35"
Cohesion: 0.17
Nodes (11): CJ Studio Landing Page Implementation Plan, File Map, Task 1: Copy Hero Asset + Create Assets Directory, Task 2: Update Aurora Colors in globals.css, Task 3: Update Nav Component, Task 4: Update Footer Component, Task 5: Build LaptopZoom Component (Phase 1), Task 6: Build WhyItMatters Component (Phase 2) (+3 more)

### Community 36 - "Community 36"
Cohesion: 0.18
Nodes (10): Architecture, Contact Form Design, Dependencies, Email Format, Form Fields, Goal, Out of Scope, Page Layout (+2 more)

### Community 37 - "Community 37"
Cohesion: 0.05
Nodes (16): MotionLink, founders, Props, aspectRatios, LogoProps, srcs, links, steps (+8 more)

### Community 38 - "Community 38"
Cohesion: 0.22
Nodes (8): Accessibility & Inclusion, Anti-references, Brand Personality, Design Principles, Product, Product Purpose, Register, Users

### Community 39 - "Community 39"
Cohesion: 0.22
Nodes (8): 1. Typography — `app/layout.tsx`, 2. Aurora Animation — `app/globals.css`, 3. Aurora Background Component — `components/aurora-background.tsx`, 4. Hero Assembly — `app/page.tsx`, Constraints, Files Changed, Hero Section — Design Spec, Objective

### Community 40 - "Community 40"
Cohesion: 0.25
Nodes (7): File Map, Hero Section Implementation Plan, Task 1: Add aurora CSS tokens and keyframe to globals.css, Task 2: Replace Geist with Plus Jakarta Sans in layout.tsx, Task 3: Create the AuroraBackground component, Task 4: Rebuild page.tsx as the hero, Task 5: Verify the hero renders correctly

### Community 42 - "Community 42"
Cohesion: 0.29
Nodes (6): 1. The Core Objective, 2. The Tech Stack, 3. Brand Identity & Aesthetics, 4. Sitemap & Page Routing, 5. The Golden Rules for AI Assistance, CJ Studio - Global Architecture & Development Rules

### Community 43 - "Community 43"
Cohesion: 0.29
Nodes (6): File Map, Task 1: Add prism animation transform hooks, Task 2: Update container structure, Task 3: Add foreground glass prism layer, Task 4: Visual verification, WebsiteAssembly 3D Prism Scene Implementation Plan

### Community 47 - "Community 47"
Cohesion: 0.40
Nodes (4): commentSyntax, cspChecked, files, insertBefore

### Community 48 - "Community 48"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 52 - "Community 52"
Cohesion: 0.22
Nodes (14): FormState Interface (name/email/message errors), sendEnquiry Server Action, AnimatedButton Component, ContactForm Component, CTA Component, Aurora CSS Background Animation, Resend Transactional Email (RESEND_API_KEY), Next.js Server Action Pattern (+6 more)

### Community 54 - "Community 54"
Cohesion: 0.33
Nodes (5): Build Status, Issues Caught & Fixed During Review, Landing Page Implementation Progress, Pending: Visual QA Checks, Status: 8/9 Tasks Complete — Awaiting Visual QA

### Community 55 - "Community 55"
Cohesion: 0.47
Nodes (6): AnimatedButton Component, contact-form.tsx (planned), Contact Form Design Spec, Contact Page Route (/contact), Resend Email Service Integration, send-enquiry Server Action (planned)

### Community 56 - "Community 56"
Cohesion: 0.40
Nodes (5): Brand Direction Brainstorm (Bold Dark / Editorial / Brutalist / Minimal), Brand Direction Option: Bold & Dark, Brand Direction Option: Brutalist Fresh, Brand Direction Option: Editorial / Craft, Brand Direction Option: Refined Minimal

## Knowledge Gaps
- **292 isolated node(s):** `metadata`, `Props`, `Props`, `LogoProps`, `srcs` (+287 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Footer Component` connect `Community 3` to `Community 52`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **What connects `metadata`, `Props`, `Props` to the rest of the system?**
  _309 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Community 6` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `Community 7` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 9` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Should `Community 11` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._