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
  {
    slug: "harbot-builders",
    company: "Harbot Builders Ltd",
    preparedFor: "Prepared for Harbot Builders · Leicester",
    sector: "Building & Construction · Leicester",
    date: "July 2026",
    validity: "Valid for 30 days",
    headline: ["A builder Leicester trusts.", "A website stuck", "in 1986."],
    intro:
      "Harbot Builders has spent decades building and renovating across Leicester — the kind of work that earns its name on the street, by word of mouth. But the website carrying that name still shows a copyright of 1986: older than most of the homeowners now searching for a builder on their phones. This is a proposal to bring it into the present, in four weeks.",
    opportunity: {
      kicker: "The Opportunity",
      heading: "The reputation is built. The website isn't.",
      lead: "You've done the hard part on site for years. The website just needs to catch up to the builder you already are.",
      points: [
        "Your current site carries a 1986 copyright — it predates the web most people now use. Today a homeowner planning an extension starts on Google, on a phone, and judges you in seconds.",
        "Big-ticket building work is won on trust, and trust is won with proof — finished projects, before-and-afters, real reviews. None of that is visible on your site today.",
        "There is no simple way for someone with a project in mind to send you the details and get a call back. Every extra step is a job quietly going to the next builder on the list.",
        "The firms ranking above you in Leicester aren't better on the tools. They're just easier to find and quicker to contact online.",
      ],
    },
    proof: {
      project: "LA Roofing",
      projectSlug: "la-roofing",
      line: "We recently built LA Roofing — an Exeter trade business with a strong local name but a site that wasn't winning work. We gave them an instant cost tool, a gallery of real jobs and their reviews up front, so the site turns first-time visitors into enquiries. We would do the same for Harbot.",
    },
    scope: [
      {
        title: "Lead-first homepage",
        detail:
          "A homepage built around one job: turning a visitor with a building project into an enquiry — clear, credible, and fast on any device.",
      },
      {
        title: "Simple project enquiry",
        detail:
          "A short enquiry form that emails you the moment someone submits their project details, powered by Resend, so no lead sits unanswered.",
      },
      {
        title: "Portfolio of real builds",
        detail:
          "A gallery of completed projects across Leicester — extensions, renovations, new builds — proof that does the selling before the first call.",
      },
      {
        title: "Reviews and accreditations",
        detail:
          "Your reviews and any trade accreditations surfaced where they build confidence, right beside your services.",
      },
      {
        title: "Services in plain English",
        detail:
          "Extensions, renovations, groundwork and commercial work — each explained the way Leicester homeowners and businesses actually ask for them.",
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
          "High-fidelity screens for desktop and mobile. One structured round of feedback - no open-ended loops.",
      },
      {
        week: "Week 3",
        name: "Build",
        detail:
          "We build the approved design in production-grade code, wire up the enquiry form, and load your real content.",
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
        price: "£3,200",
        cadence: "one-off",
        summary: "Everything you need to look current and win enquiries.",
        features: [
          "Up to 5 pages",
          "Lead-first homepage + enquiry form",
          "Mobile-first responsive build",
          "Reviews & accreditations",
          "On-page SEO",
          "1 round of revisions",
        ],
      },
      {
        name: "Signature",
        price: "£4,800",
        cadence: "one-off",
        featured: true,
        summary: "The full lead-generation site — our recommendation for Harbot.",
        features: [
          "Everything in Foundation",
          "Portfolio gallery of real builds",
          "Project enquiry with instant email alerts",
          "Advanced SEO for Leicester search terms",
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
      heading: "Ready to look as solid as you build?",
      body:
        "If this feels right, reply and we'll book a 20-minute call to confirm the details and lock your build slot. We only take on a handful of projects a month.",
      email: "hello@cjcreativestudio.com",
      subject: "Re: CJ Studio proposal - Harbot Builders",
    },
  },
  {
    slug: "bristol-roof-company",
    company: "Bristol Roof Company",
    preparedFor: "Prepared for Bristol Roof Company · Bristol",
    sector: "Roofing · Bristol",
    date: "July 2026",
    validity: "Valid for 30 days",
    headline: ["Bristol roofs, done right.", "A website from", "2008."],
    intro:
      "Bristol Roof Company has built a solid name across the city for roofing that lasts. But the website representing it dates to 2008 — built before most people carried the internet in their pocket, and long before a leaking roof turned into a late-night search on a phone. This is a proposal to fix that in four weeks.",
    opportunity: {
      kicker: "The Opportunity",
      heading: "The roofs last. The website hasn't.",
      lead: "You've earned the trust of homeowners across Bristol. The site just needs to catch up to the roofer you already are.",
      points: [
        "Your current site dates to 2008 — built before the smartphone era. Yet today most roofing enquiries start on a mobile, on-site, mid-problem.",
        "If you have Google reviews, they're your single strongest sales asset — and they appear nowhere on your website, so that trust is left on the table.",
        "There's no fast way for a homeowner to request a quote. Every extra click between 'I have a leak' and 'I've contacted you' is a job going to a competitor.",
        "The roofers ranking above you in Bristol aren't better on the roof. They're just easier to find and quicker to contact online.",
      ],
    },
    proof: {
      project: "LA Roofing",
      projectSlug: "la-roofing",
      line: "We recently built LA Roofing — a 4.9-star Exeter roofer with exactly this challenge. We gave them an instant roof-cost tool, a gallery of real jobs and their reviews front and centre, so the site turns first-time visitors into quote requests. We would do the same for Bristol Roof Company.",
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
          "A photo gallery of completed roofs across Bristol — proof that does the selling before you pick up the phone.",
      },
      {
        title: "Reviews, front and centre",
        detail:
          "Your Google reviews surfaced directly beneath your services, where they build trust at the moment it matters.",
      },
      {
        title: "Services in plain English",
        detail:
          "Pitched roofs, flat roofs, repairs and maintenance — each explained with the questions Bristol homeowners actually ask.",
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
          "High-fidelity screens for desktop and mobile. One structured round of feedback - no open-ended loops.",
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
        summary: "The full lead-generation site — our recommendation for Bristol Roof Company.",
        features: [
          "Everything in Foundation",
          "Real-jobs photo gallery",
          "Instant roof-cost quote tool",
          "Advanced SEO for Bristol search terms",
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
      heading: "Ready for a site that wins the call?",
      body:
        "If this feels right, reply and we'll book a 20-minute call to confirm the details and lock your build slot. We only take on a handful of projects a month.",
      email: "hello@cjcreativestudio.com",
      subject: "Re: CJ Studio proposal - Bristol Roof Company",
    },
  },
  {
    slug: "spa-landscaping",
    company: "SPA Landscaping & Grounds Maintenance",
    preparedFor: "Prepared for SPA Landscaping · Sheffield",
    sector: "Landscaping & Grounds Maintenance · Sheffield",
    date: "July 2026",
    validity: "Valid for 30 days",
    headline: ["Sheffield's finest gardens.", "A website that won't", "open on a phone."],
    intro:
      "SPA Landscaping has spent years transforming gardens and grounds across Sheffield. But the website carrying that work doesn't function on a phone at all — and with a copyright still reading 2008, it's showing its age everywhere else too. Since most people now search for a landscaper on mobile, that's a lot of enquiries never arriving. This is a proposal to fix it in four weeks.",
    opportunity: {
      kicker: "The Opportunity",
      heading: "Great gardens. An invisible website.",
      lead: "The work speaks for itself in person. Online, right now, almost none of it reaches the person choosing who to call.",
      points: [
        "Your current site has no mobile support — it simply doesn't work properly on a phone. That's the exact device most people use to search for a landscaper, so a large share of visitors leave before they've seen your work.",
        "The copyright still reads 2008. A dated site quietly signals a dated business, even when the work is anything but.",
        "There's no easy way to browse examples of your work or request a quote — the two things a homeowner planning a garden actually wants.",
        "The landscapers ranking above you in Sheffield aren't better in the garden. They're just easier to find and easier to contact on a phone.",
      ],
    },
    proof: {
      project: "LA Roofing",
      projectSlug: "la-roofing",
      line: "We recently built LA Roofing — an Exeter trade business whose old site wasn't winning work, especially on mobile. We gave them a fast, mobile-first site with a gallery of real jobs and their reviews up front, and it now turns visitors into enquiries. We would do the same for SPA Landscaping.",
    },
    scope: [
      {
        title: "Mobile-first from the ground up",
        detail:
          "The core fix: a site that is fast and effortless on a phone first, then scales up to desktop — so you stop losing the visitors you're losing today.",
      },
      {
        title: "Lead-first homepage",
        detail:
          "A homepage built around one job: turning a visitor planning a garden into a quote request — clear and credible on any device.",
      },
      {
        title: "Project & planting gallery",
        detail:
          "A photo gallery of completed gardens, patios and grounds across Sheffield — proof that does the selling before the first call.",
      },
      {
        title: "Simple quote request",
        detail:
          "A short enquiry form wired to email you the moment it's submitted, powered by Resend, so no lead slips through.",
      },
      {
        title: "Services in plain English",
        detail:
          "Garden design, grounds maintenance, patios and fencing — each explained the way Sheffield homeowners and businesses actually ask.",
      },
      {
        title: "Fast, findable, and yours",
        detail:
          "Sub-second loads on Vercel's UK edge, on-page SEO for local search, handed over as clean code you own outright — no monthly hostage fees.",
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
          "High-fidelity screens for mobile and desktop. One structured round of feedback - no open-ended loops.",
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
        price: "£2,800",
        cadence: "one-off",
        summary: "A modern, mobile-first site that finally works everywhere your customers do.",
        features: [
          "Up to 5 pages",
          "Mobile-first responsive build",
          "Lead-first homepage + quote form",
          "Project gallery",
          "On-page SEO",
          "1 round of revisions",
        ],
      },
      {
        name: "Signature",
        price: "£4,200",
        cadence: "one-off",
        featured: true,
        summary: "The full lead-generation site — our recommendation for SPA Landscaping.",
        features: [
          "Everything in Foundation",
          "Expanded project & planting gallery",
          "Quote request with instant email alerts",
          "Advanced SEO for Sheffield search terms",
          "Copywriting for every page",
          "2 rounds of revisions",
          "30 days post-launch support",
        ],
      },
      {
        name: "Care Plan",
        price: "£110",
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
      heading: "Ready for a site that works everywhere your customers do?",
      body:
        "If this feels right, reply and we'll book a 20-minute call to confirm the details and lock your build slot. We only take on a handful of projects a month.",
      email: "hello@cjcreativestudio.com",
      subject: "Re: CJ Studio proposal - SPA Landscaping",
    },
  },
  {
    slug: "the-ginger-bistro",
    company: "The Ginger Bistro",
    preparedFor: "Prepared for the team at The Ginger Bistro · Belfast",
    sector: "Bistro & Dining · Belfast",
    date: "July 2026",
    validity: "Valid for 30 days",
    headline: ["A Belfast bistro", "worth booking.", "A website from 2009."],
    intro:
      "The Ginger Bistro is a Belfast dining institution — the kind of place regulars recommend without a second thought. But the website representing it carries a copyright from 2009: no menus that work well on a phone, no sense of the room, and little of the character that fills the tables every week. This is a proposal to give the Ginger Bistro a website as considered as the cooking.",
    opportunity: {
      kicker: "The Opportunity",
      heading: "A destination restaurant. A forgotten website.",
      lead: "The room does the work in person. Right now, almost none of that reaches the person deciding where to eat tonight.",
      points: [
        "Your site dates to 2009 — before the smartphone became the way people choose where to eat. Yet almost every 'where to eat in Belfast tonight' search now happens on a phone, and a 2009 site isn't built for one.",
        "Reviews and reputation are how a restaurant earns a first booking from someone who's never been. If yours aren't front and centre on the site, that trust is being left on the table.",
        "There's no effortless way to see the current menu, opening hours or how to book — the three things people come to a restaurant's website for.",
        "The Ginger Bistro has genuine character. Almost none of it reaches someone choosing between you and the place next door.",
      ],
    },
    proof: {
      project: "Taste of Portugal",
      projectSlug: "taste-of-portugal",
      line: "We recently built Taste of Portugal — a cafe by day and restaurant by night that needed one site to hold real character, with five-star reviews up front and menus a tap away. We build hospitality sites that make people choose you before they've walked in. The Ginger Bistro deserves the same.",
    },
    scope: [
      {
        title: "Photography-led homepage",
        detail:
          "A homepage built around the atmosphere of the room — the food, the plates, the crowd — so visitors feel the place before they arrive.",
      },
      {
        title: "Menus that work on a phone",
        detail:
          "Food and drink menus that are effortless to read and update, designed mobile-first for the way people actually check them.",
      },
      {
        title: "Table bookings made easy",
        detail:
          "A clean booking-and-enquiry flow wired to email you instantly, so a diner ready to book never hits a dead end.",
      },
      {
        title: "Reviews and atmosphere",
        detail:
          "Your reputation surfaced up front, paired with photography that sells the experience before a word is read.",
      },
      {
        title: "Your story and the room",
        detail:
          "The character of the bistro — its history, its kitchen, its people — told in a way that turns a first-time visitor into a booking.",
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
          "We agree the site structure, gather menus and opening hours, and plan the photography that will carry the site.",
      },
      {
        week: "Week 2",
        name: "Design",
        detail:
          "High-fidelity screens for desktop and mobile that capture the Ginger Bistro's character. One structured round of feedback.",
      },
      {
        week: "Week 3",
        name: "Build",
        detail:
          "We build the approved design in production-grade code, wire up menus and bookings, and load your content.",
      },
      {
        week: "Week 4",
        name: "Launch & handover",
        detail:
          "We connect your domain, go live, and show your team how to update menus in minutes.",
      },
    ],
    tiers: [
      {
        name: "Foundation",
        price: "£2,600",
        cadence: "one-off",
        summary: "A modern, mobile-first site that finally does the Ginger Bistro justice.",
        features: [
          "Up to 5 pages",
          "Photography-led homepage",
          "Mobile-first menus",
          "Reviews integration",
          "Opening hours & contact",
          "1 round of revisions",
        ],
      },
      {
        name: "Signature",
        price: "£3,900",
        cadence: "one-off",
        featured: true,
        summary: "The full venue site with bookings — our recommendation for the Ginger Bistro.",
        features: [
          "Everything in Foundation",
          "Table booking & enquiry flow",
          "Story & gallery of the room",
          "Copywriting in the bistro's voice",
          "Advanced SEO for Belfast dining search",
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
          "Menu & content edits (up to 1 hr/mo)",
          "Uptime & performance monitoring",
          "Priority support",
          "Cancel anytime",
        ],
      },
    ],
    investmentNote:
      "Builds are billed 50% to start and 50% on launch. The Care Plan is optional and can be added any time after go-live. No agency markup, no hidden fees.",
    cta: {
      heading: "Let's give the Ginger Bistro the site it deserves.",
      body:
        "If this feels right, reply and we'll book a 20-minute call to confirm the details and lock your build slot. We only take on a handful of projects a month.",
      email: "hello@cjcreativestudio.com",
      subject: "Re: CJ Studio proposal - The Ginger Bistro",
    },
  },
  {
    slug: "catalyst-digital-energy",
    company: "Catalyst Digital Energy",
    preparedFor: "Prepared for Catalyst · Birmingham",
    sector: "Energy Consultancy · Birmingham",
    date: "July 2026",
    validity: "Valid for 30 days",
    headline: ["Advice businesses rely on.", "A first impression", "from 2001."],
    intro:
      "Catalyst advises businesses on energy contracts that run into serious money. Winning that kind of trust starts online — and the current website, carrying a copyright from 2001, doesn't yet match the authority of the advice. This is a proposal to give Catalyst a digital presence as credible as its consultancy.",
    opportunity: {
      kicker: "The Opportunity",
      heading: "Serious advice. A dated first impression.",
      lead: "A prospective client's first judgement happens on your website, before a single conversation. Right now it's working against you.",
      points: [
        "Your site carries a 2001 copyright. For a firm asking businesses to trust it with major energy decisions, a two-decade-old website quietly undermines the very credibility you're selling.",
        "B2B buyers research before they ever make contact. If the site doesn't clearly explain what you do, who you've helped and why you're different, they move on to a competitor who does.",
        "There's no strong, obvious way for a decision-maker to start a conversation — no clear next step for a warm prospect ready to talk.",
        "The consultancies winning the enquiries you want aren't necessarily better advisors. They simply look more credible and are easier to engage online.",
      ],
    },
    proof: {
      project: "Range Shipping",
      projectSlug: "range-shipping",
      line: "We recently built Range Shipping — an independent operator that needed a site with the institutional weight of decades in the industry, clean enough for a boardroom and specific enough to earn trust from serious buyers. We build B2B sites that make credibility obvious. We would do the same for Catalyst.",
    },
    scope: [
      {
        title: "Credibility-first homepage",
        detail:
          "A homepage that establishes authority in seconds — what you do, who you do it for, and why a serious business should trust you with it.",
      },
      {
        title: "Services and sectors, made clear",
        detail:
          "Your services and the sectors you serve, laid out the way a decision-maker researching a supplier actually needs to read them.",
      },
      {
        title: "Case studies and results",
        detail:
          "The outcomes you've delivered, presented as proof — the single most persuasive thing on a B2B site, and absent from yours today.",
      },
      {
        title: "Insight that builds authority",
        detail:
          "A simple insight or updates area you can add to over time, so the site keeps demonstrating expertise between conversations.",
      },
      {
        title: "A clear path to enquire",
        detail:
          "One obvious next step for a warm prospect, wired to email you instantly with Resend — no dead ends, no missed enquiries.",
      },
      {
        title: "Fast, secure, and yours",
        detail:
          "Sub-second loads on Vercel's UK edge, built to modern security standards, handed over as clean code you own outright.",
      },
    ],
    timeline: [
      {
        week: "Week 1",
        name: "Discovery & content",
        detail:
          "We agree positioning and structure, and gather your services, sectors and results. You approve the direction before design starts.",
      },
      {
        week: "Week 2",
        name: "Design",
        detail:
          "High-fidelity screens for desktop and mobile that signal authority. One structured round of feedback - no open-ended loops.",
      },
      {
        week: "Week 3",
        name: "Build",
        detail:
          "We build the approved design in production-grade code, wire up the enquiry form, and load your real content.",
      },
      {
        week: "Week 4",
        name: "Launch & handover",
        detail:
          "We connect your domain, go live, and hand over a site that's fast, credible, and easy to update.",
      },
    ],
    tiers: [
      {
        name: "Foundation",
        price: "£3,400",
        cadence: "one-off",
        summary: "A credible, modern B2B site that matches the quality of your advice.",
        features: [
          "Up to 6 pages",
          "Credibility-first homepage",
          "Clear services & sectors",
          "Mobile-first responsive build",
          "On-page SEO",
          "1 round of revisions",
        ],
      },
      {
        name: "Signature",
        price: "£5,500",
        cadence: "one-off",
        featured: true,
        summary: "The full authority-building site — our recommendation for Catalyst.",
        features: [
          "Everything in Foundation",
          "Case studies & results section",
          "Insight/updates area you can add to",
          "Lead-capture enquiry flow with instant alerts",
          "Copywriting for every page",
          "2 rounds of revisions",
          "30 days post-launch support",
        ],
      },
      {
        name: "Care Plan",
        price: "£150",
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
      heading: "Ready to look as credible as your advice?",
      body:
        "If this feels right, reply and we'll book a 20-minute call to confirm the details and lock your build slot. We only take on a handful of projects a month.",
      email: "hello@cjcreativestudio.com",
      subject: "Re: CJ Studio proposal - Catalyst",
    },
  },
];
