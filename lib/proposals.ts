export interface ProposalTier {
  name: string;
  price: string;
  cadence: string; // e.g. "one-off" | "per month"
  summary: string;
  features: string[];
  featured?: boolean;
}

export interface ProposalPhase {
  week: string; // "Week 1"
  name: string;
  detail: string;
}

export interface ProposalScopeItem {
  title: string;
  detail: string;
}

export interface Proposal {
  slug: string;
  company: string;
  preparedFor: string;
  sector: string; // eyebrow, e.g. "Roofing & Plastering · Swansea"
  date: string; // "July 2026"
  validity: string; // "Valid for 30 days"
  headline: string[]; // display lines — each rendered as its own MaskReveal (must be unique)
  intro: string; // opening paragraph (serif)
  opportunity: {
    kicker: string;
    heading: string; // short display line
    lead: string; // serif subhead
    points: string[]; // specific, diplomatic observations (unique strings)
  };
  proof: {
    project: string; // "LA Roofing"
    projectSlug: string; // must be a real /work slug
    line: string; // narration referencing the case study (rendered as serif lead, no quote marks)
  };
  scope: ProposalScopeItem[];
  timeline: ProposalPhase[];
  tiers: ProposalTier[];
  investmentNote: string;
  cta: {
    heading: string;
    body: string;
    email: string; // CJ inbox for the mailto
    subject: string; // prefilled mailto subject (use a plain hyphen, not em-dash)
  };
}

export const proposals: Proposal[] = [
  {
    slug: "cp-morgan-roofing",
    company: "CP Morgan Roofing & Plastering",
    preparedFor: "Prepared for CP Morgan · Swansea",
    sector: "Roofing & Plastering · Swansea",
    date: "July 2026",
    validity: "Valid for 30 days",
    headline: ["A 4.9-star roofer", "deserves a", "5-star website."],
    intro:
      "CP Morgan has earned a 4.9-star reputation across Swansea for roofing and plastering that lasts. But the website carrying that reputation online still runs on a design from 1998 — invisible on phones, slow to load, and silent where it should be selling. This is a proposal to fix that in four weeks.",
    opportunity: {
      kicker: "The Opportunity",
      heading: "The reputation is real. The website isn't.",
      lead: "You've done the hard part. The site just needs to catch up to the roofer you already are.",
      points: [
        "Your current site dates back to 1998. It was built before smartphones existed — yet today most roofing enquiries start on a mobile, on-site, mid-problem.",
        "Your 4.9-star Google rating, across 14 reviews and climbing, is your single strongest sales asset — and it appears nowhere on your website. Trust is being left on the table.",
        "There is no fast way for a homeowner to request a quote. Every extra click between “I have a leak” and “I’ve contacted CP Morgan” is a job going to a competitor.",
        "The roofers ranking above you in Swansea aren't better on the roof. They're just easier to find and quicker to contact online.",
      ],
    },
    proof: {
      project: "LA Roofing",
      projectSlug: "la-roofing",
      line: "We recently built LA Roofing — a 4.9-star Exeter roofer with exactly this challenge. We gave them an instant roof-cost tool, a gallery of real jobs, and their reviews front and centre, so the site turns first-time visitors into quote requests. We would do the same for CP Morgan.",
    },
    scope: [
      {
        title: "Lead-first homepage",
        detail:
          "A hero built around one job: turning a visitor with a roofing problem into a quote request — above the fold, on any device.",
      },
      {
        title: "Instant quote request",
        detail:
          "A short, friction-free enquiry form wired to email you the moment it's submitted, powered by Resend. No missed leads.",
      },
      {
        title: "Real-jobs gallery",
        detail:
          "A photo gallery of completed roofs and rendering work across Swansea — proof that does the selling before you pick up the phone.",
      },
      {
        title: "Reviews, front and centre",
        detail:
          "Your 4.9-star Google reviews surfaced directly beneath your services, where they build trust at the moment it matters.",
      },
      {
        title: "Services in plain English",
        detail:
          "Roofing, flat roofs, plastering and rendering — each explained with the questions Swansea homeowners actually ask.",
      },
      {
        title: "Fast, mobile-first, and yours",
        detail:
          "Sub-second loads on Vercel's UK edge, built mobile-first, handed over as clean code you own outright — no monthly hostage fees.",
      },
    ],
    timeline: [
      {
        week: "Week 1",
        name: "Discovery & content",
        detail:
          "We gather your photos, services and reviews, and lock the site structure. You approve the direction before design starts.",
      },
      {
        week: "Week 2",
        name: "Design",
        detail:
          "High-fidelity screens for desktop and mobile. One structured round of feedback — no open-ended loops.",
      },
      {
        week: "Week 3",
        name: "Build",
        detail:
          "We build the approved design in production-grade code, wire up the quote form, and load your real content.",
      },
      {
        week: "Week 4",
        name: "Launch & handover",
        detail:
          "We connect your domain, go live, and hand over a site that's fast, findable, and easy to update.",
      },
    ],
    tiers: [
      {
        name: "Foundation",
        price: "£2,900",
        cadence: "one-off",
        summary: "Everything you need to look current and capture leads.",
        features: [
          "Up to 5 pages",
          "Lead-first homepage + quote form",
          "Mobile-first responsive build",
          "Google reviews integration",
          "On-page SEO",
          "1 round of revisions",
        ],
      },
      {
        name: "Signature",
        price: "£4,500",
        cadence: "one-off",
        featured: true,
        summary: "The full lead-generation site — our recommendation for CP Morgan.",
        features: [
          "Everything in Foundation",
          "Real-jobs photo gallery",
          "Instant roof-cost quote tool",
          "Advanced SEO for Swansea search terms",
          "Copywriting for every page",
          "2 rounds of revisions",
          "30 days post-launch support",
        ],
      },
      {
        name: "Care Plan",
        price: "£120",
        cadence: "per month",
        summary: "Optional. We keep it fast, secure and up to date.",
        features: [
          "Hosting & security updates",
          "Content edits (up to 1 hr/mo)",
          "Uptime & performance monitoring",
          "Priority support",
          "Cancel anytime",
        ],
      },
    ],
    investmentNote:
      "Builds are billed 50% to start and 50% on launch. The Care Plan is optional and can be added any time after go-live. No agency markup, no hidden fees.",
    cta: {
      heading: "Ready to look as good as your work?",
      body:
        "If this feels right, reply and we'll book a 20-minute call to confirm the details and lock your build slot. We only take on a handful of projects a month.",
      email: "hello@cjcreativestudio.com",
      subject: "Re: CJ Studio proposal - CP Morgan Roofing",
    },
  },
  {
    slug: "the-bookcafe",
    company: "The Bookcafé",
    preparedFor: "Prepared for the team at The Bookcafé · Derby",
    sector: "Café & Events · Derby",
    date: "July 2026",
    validity: "Valid for 30 days",
    headline: ["1,325 reviews.", "One very", "tired website."],
    intro:
      "The Bookcafé is a Derby institution — 1,325 reviews and a 4.5-star rating earned over years in the Cathedral Quarter. But the website representing it still carries a copyright from 2000: no menus that work on a phone, no events listings, no sense of the room. This is a proposal to give the Bookcafé a website as characterful as the café itself.",
    opportunity: {
      kicker: "The Opportunity",
      heading: "A landmark venue. A forgotten website.",
      lead: "The room is full of character. Right now, almost none of it reaches the person deciding where to spend tonight.",
      points: [
        "Your site dates to 2000 — it predates the smartphone. Yet almost every “café near me” and “what’s on in Derby tonight” search now happens on a phone, and your current site doesn't work on one.",
        "1,325 reviews at 4.5 stars is extraordinary social proof — the kind most venues would kill for. It's nowhere on your site.",
        "There's no easy way to see today's menu, opening hours, or what's on this week — the three things people actually come to your website for.",
        "The Bookcafé has a genuine identity: books, coffee, events, atmosphere. None of that personality reaches someone choosing where to spend their evening.",
      ],
    },
    proof: {
      project: "Taste of Portugal",
      projectSlug: "taste-of-portugal",
      line: "We recently built Taste of Portugal — a café by day and restaurant by night that needed one site to hold two identities, with five-star reviews up front and menus a tap away. We build hospitality sites that make people choose you before they've walked in. The Bookcafé deserves the same.",
    },
    scope: [
      {
        title: "Photography-led homepage",
        detail:
          "A homepage built around the atmosphere of the room — the books, the coffee, the crowd — so visitors feel the place before they arrive.",
      },
      {
        title: "Menus that work on a phone",
        detail:
          "Food and drink menus that are effortless to read and update, designed mobile-first for the way people actually check them.",
      },
      {
        title: "What's On events board",
        detail:
          "A simple, self-serve events listing for live music, quizzes and bookings — easy for your team to keep current, no developer required.",
      },
      {
        title: "Reviews & atmosphere",
        detail:
          "Your 4.5-star, 1,325-review reputation surfaced up front, paired with photography that sells the experience.",
      },
      {
        title: "Bookings & enquiries",
        detail:
          "A clean table-and-events enquiry flow wired to email you instantly, plus an optional mailing-list signup with an automated welcome so regulars stay in the loop.",
      },
      {
        title: "Fast, mobile-first, and yours",
        detail:
          "Sub-second loads on Vercel's UK edge, built mobile-first, handed over as clean code you own — no monthly hostage fees.",
      },
    ],
    timeline: [
      {
        week: "Week 1",
        name: "Discovery & shoot list",
        detail:
          "We agree the site structure, gather menus and events, and plan the photography that will carry the site.",
      },
      {
        week: "Week 2",
        name: "Design",
        detail:
          "High-fidelity screens for desktop and mobile that capture the Bookcafé's character. One structured round of feedback.",
      },
      {
        week: "Week 3",
        name: "Build",
        detail:
          "We build the approved design in production-grade code, wire up menus, events and enquiries, and load your content.",
      },
      {
        week: "Week 4",
        name: "Launch & handover",
        detail:
          "We connect your domain, go live, and show your team how to update menus and events in minutes.",
      },
    ],
    tiers: [
      {
        name: "Foundation",
        price: "£2,600",
        cadence: "one-off",
        summary: "A modern, mobile-first site that finally does the Bookcafé justice.",
        features: [
          "Up to 5 pages",
          "Photography-led homepage",
          "Mobile-first menus",
          "Google reviews integration",
          "Opening hours & contact",
          "1 round of revisions",
        ],
      },
      {
        name: "Signature",
        price: "£3,900",
        cadence: "one-off",
        featured: true,
        summary: "The full venue site with events and bookings — our recommendation.",
        features: [
          "Everything in Foundation",
          "Self-serve What's On events board",
          "Table & events enquiry flow",
          "Mailing-list signup with welcome email",
          "Copywriting in the Bookcafé's voice",
          "2 rounds of revisions",
          "30 days post-launch support",
        ],
      },
      {
        name: "Care Plan",
        price: "£95",
        cadence: "per month",
        summary: "Optional. We keep menus fresh and the site fast.",
        features: [
          "Hosting & security updates",
          "Menu & events edits (up to 1 hr/mo)",
          "Uptime & performance monitoring",
          "Priority support",
          "Cancel anytime",
        ],
      },
    ],
    investmentNote:
      "Builds are billed 50% to start and 50% on launch. The Care Plan is optional and can be added any time after go-live. No agency markup, no hidden fees.",
    cta: {
      heading: "Let's give the Bookcafé the site it deserves.",
      body:
        "If this feels right, reply and we'll book a 20-minute call to confirm the details and lock your build slot. We only take on a handful of projects a month.",
      email: "hello@cjcreativestudio.com",
      subject: "Re: CJ Studio proposal - The Bookcafe",
    },
  },
];
