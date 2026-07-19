// Demo-on-request records — the seed source of truth for /demo/[slug].
// Brick 6 of the outreach engine (docs/OUTREACH-ENGINE-PLAN.md §4, §5). Each
// record is a "tailored demo site" for one enriched cold-outreach lead: the CTA
// in the outreach email lands on /demo/<slug>, which shows the lead their own
// outdated site as a "before" and CJ Studio's speed-build offer as the "after".
//
// TODO(db-hydrate): Brick 5+ replaces these seed records with rows read from the
// shared outreach Postgres (business, town, sector, Outdated Flags, screenshot
// URL and reviews are all captured upstream by the worker — Bricks 1–4). Until
// that datastore exists, demos are hand-seeded here from real cj-lead-scraper
// leads so the surface is viewable now. Keep this module pure data + a pure
// lookup (no client/server/runtime deps) so it stays trivially testable and
// swappable for a DB read. Slug convention: demo.slug == the lead slug
// (lib/leads.ts) == the proposal slug (lib/proposals.ts) == the lib/outreach.ts key.

export interface DemoReview {
  rating: number; // Google star rating, e.g. 4.9
  count: number; // number of reviews
}

export interface DemoOfferItem {
  title: string;
  detail: string;
}

export interface Demo {
  slug: string; // stable unlisted id; matches the lead/proposal slug
  businessName: string;
  town: string;
  sector: string; // eyebrow, e.g. "Roofing · Bristol"
  currentSiteUrl: string; // existing site, shown in the browser-chrome address bar (no protocol)
  // Specific outdated signals detected on their live site — mirrors the
  // cj-lead-scraper "Outdated Flags" column (email-scraper.js::auditOutdatedWebsite),
  // expanded to plain-English, customer-facing sentences.
  outdatedFlags: string[];
  // "Before" screenshot of their current site (Brick 2 / Playwright capture).
  // Optional: absent until Brick 2 populates it → the page renders a placeholder frame.
  beforeScreenshot?: string;
  review?: DemoReview; // Google rating/reviews, optional (enrichment — Brick 2)
  headline: string[]; // hero display lines — each its own MaskReveal (must be unique)
  intro: string; // serif opening paragraph
  // CJ Studio speed-build offer (the "after" — aligned with /sprint, £1,995 / 48h).
  offerKicker: string;
  offerHeading: string;
  offerLead: string;
  offer: DemoOfferItem[];
  turnaround: string; // headline promise, e.g. "Live in 48 hours — £1,995 fixed."
  proof: {
    project: string; // "LA Roofing"
    projectSlug: string; // MUST be a real /work slug (lib/projects.ts) or the link 404s
    line: string; // serif narration referencing the case study
  };
  cta: {
    heading: string;
    body: string;
    email: string; // CJ inbox for the interim mailto booking action
    bookingSubject: string; // prefilled mailto subject (plain hyphens, no em-dash)
  };
}

export const demos: Demo[] = [
  {
    slug: "harbot-builders",
    businessName: "Harbot Builders",
    town: "Leicester",
    sector: "Building & Construction · Leicester",
    currentSiteUrl: "harbotbuilders.co.uk",
    // beforeScreenshot + review: populated by enrichment (Bricks 2–3); omitted → placeholder frame.
    outdatedFlags: [
      "The copyright notice still reads 1986 — the site predates the web most of your customers now use.",
      "It isn't built for mobile, yet that's where a homeowner planning an extension starts their search.",
      "There's no portfolio of completed builds doing the selling before the first call.",
      "There's no simple enquiry form, so an interested visitor has to hunt for a number or give up.",
    ],
    headline: ["A builder Leicester trusts.", "A website stuck", "in 1986."],
    intro:
      "Harbot Builders has spent decades building and renovating across Leicester — the kind of reputation that travels by word of mouth. But the website carrying that name still shows a 1986 copyright, and today a homeowner planning an extension judges you on a phone, on Google, in seconds. So we built you a glimpse of the alternative.",
    offerKicker: "The upgrade",
    offerHeading: "Everything you need. Nothing you don't.",
    offerLead:
      "A fast, modern, mobile-first site with one job: turning a visitor with a project in mind into a real enquiry.",
    offer: [
      {
        title: "Lead-first homepage",
        detail:
          "A homepage built around one job — turning a visitor with a building project into an enquiry, clear and credible on any device.",
      },
      {
        title: "Portfolio of real builds",
        detail:
          "A gallery of completed extensions, renovations and new builds across Leicester — proof that does the selling before the first call.",
      },
      {
        title: "Instant enquiry form",
        detail:
          "A short form that emails you the moment someone sends their project details, powered by Resend, so no lead sits unanswered.",
      },
      {
        title: "Mobile-first + local SEO",
        detail:
          "Sub-second loads on Vercel's UK edge, built mobile-first, set up to show for 'builder in Leicester' from day one.",
      },
    ],
    turnaround: "Live in 48 hours — £1,995 fixed.",
    proof: {
      project: "LA Roofing",
      projectSlug: "la-roofing",
      line: "We recently built LA Roofing — an Exeter trade business with a strong local name but a site that wasn't winning work. We gave them an instant cost tool, a gallery of real jobs and their reviews up front, and it now turns first-time visitors into enquiries. We would do the same for Harbot.",
    },
    cta: {
      heading: "Want the real thing?",
      body: "This is a quick taste, built from your public details. Book a free 20-minute call and we'll walk you through a site built properly for Harbot Builders — no obligation, no hard sell.",
      email: "hello@cjcreativestudio.com",
      bookingSubject: "Book a call - Harbot Builders demo",
    },
  },
  {
    slug: "bristol-roof-company",
    businessName: "Bristol Roof Company",
    town: "Bristol",
    sector: "Roofing · Bristol",
    currentSiteUrl: "bristolroofcompany.co.uk",
    outdatedFlags: [
      "The site dates to 2008 — built before people started searching for a roofer on a phone, mid-problem.",
      "There's no fast way to request a quote, so every extra click is a job going to a competitor.",
      "Your Google reviews — a roofer's single strongest sales asset — appear nowhere on the site.",
      "The roofers ranking above you in Bristol aren't better on the roof; they're just easier to find online.",
    ],
    headline: ["Bristol roofs, done right.", "A website", "from 2008."],
    intro:
      "Bristol Roof Company has built a solid name across the city for roofing that lasts. But the website representing it dates to 2008 — from before a leaking roof turned into a late-night search on a phone. Here's what a site that actually wins the call could look like.",
    offerKicker: "The upgrade",
    offerHeading: "A site that wins the call.",
    offerLead:
      "A lead-first roofing site that turns a first-time visitor with a leak into a quote request — on any device.",
    offer: [
      {
        title: "Lead-first homepage",
        detail:
          "A hero built around one job: turning a visitor with a roofing problem into a quote request, above the fold, on any device.",
      },
      {
        title: "Instant quote request",
        detail:
          "A short, friction-free form wired to email you the moment it's submitted, powered by Resend. No missed leads.",
      },
      {
        title: "Real-jobs gallery",
        detail:
          "A photo gallery of completed roofs across Bristol — proof that does the selling before you pick up the phone.",
      },
      {
        title: "Reviews, front and centre",
        detail:
          "Your Google reviews surfaced right beneath your services, where they build trust at the moment it matters.",
      },
    ],
    turnaround: "Live in 48 hours — £1,995 fixed.",
    proof: {
      project: "LA Roofing",
      projectSlug: "la-roofing",
      line: "We recently built LA Roofing — a 4.9-star Exeter roofer with exactly this challenge. We gave them an instant roof-cost tool, a gallery of real jobs and their reviews front and centre, so the site turns first-time visitors into quote requests. We would do the same for Bristol Roof Company.",
    },
    cta: {
      heading: "Want the real thing?",
      body: "This is a quick taste, built from your public details. Book a free 20-minute call and we'll walk you through a proper site for Bristol Roof Company — no obligation, no hard sell.",
      email: "hello@cjcreativestudio.com",
      bookingSubject: "Book a call - Bristol Roof Company demo",
    },
  },
  {
    slug: "spa-landscaping",
    businessName: "SPA Landscaping",
    town: "Sheffield",
    sector: "Landscaping & Grounds Maintenance · Sheffield",
    currentSiteUrl: "spalandscaping.co.uk",
    outdatedFlags: [
      "The site has no mobile support — it doesn't open properly on a phone, the exact device most people use to find a landscaper.",
      "The copyright still reads 2008; a dated site quietly signals a dated business, even when the work is anything but.",
      "There's no gallery to browse your work and no easy way to request a quote.",
      "The landscapers ranking above you in Sheffield aren't better in the garden; they're just easier to find on a phone.",
    ],
    headline: ["Sheffield's finest gardens.", "A website that won't", "open on a phone."],
    intro:
      "SPA Landscaping has spent years transforming gardens and grounds across Sheffield. But the website carrying that work doesn't function on a phone at all — so a large share of enquiries never arrive. Here's what a fast, mobile-first version could look like.",
    offerKicker: "The upgrade",
    offerHeading: "A site that works everywhere your customers do.",
    offerLead:
      "The core fix: a fast, mobile-first site that stops losing the visitors you're losing today — and turns them into quote requests.",
    offer: [
      {
        title: "Mobile-first from the ground up",
        detail:
          "A site that is fast and effortless on a phone first, then scales up to desktop — so you stop losing visitors before they see your work.",
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
        title: "Findable, and yours",
        detail:
          "Sub-second loads on Vercel's UK edge, on-page SEO for local search, handed over as clean code you own outright.",
      },
    ],
    turnaround: "Live in 48 hours — £1,995 fixed.",
    proof: {
      project: "LA Roofing",
      projectSlug: "la-roofing",
      line: "We recently built LA Roofing — an Exeter trade business whose old site wasn't winning work, especially on mobile. We gave them a fast, mobile-first site with a gallery of real jobs and their reviews up front, and it now turns visitors into enquiries. We would do the same for SPA Landscaping.",
    },
    cta: {
      heading: "Want the real thing?",
      body: "This is a quick taste, built from your public details. Book a free 20-minute call and we'll walk you through a proper mobile-first site for SPA Landscaping — no obligation, no hard sell.",
      email: "hello@cjcreativestudio.com",
      bookingSubject: "Book a call - SPA Landscaping demo",
    },
  },
];

export function getDemo(slug: string): Demo | undefined {
  return demos.find((d) => d.slug === slug);
}
