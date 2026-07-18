// Private lead follow-up tracker data — the source of truth for /leads.
// The site is statically architected (no DB), so the pipeline lives here as an
// editable code module. Ollie edits statuses / next actions as leads move.
// Seeded from the real cj-lead-scraper CSVs and the live client list.

// ── Types ────────────────────────────────────────────────
export type LeadStatus =
  | "new"
  | "contacted"
  | "proposal-sent"
  | "negotiating"
  | "won"
  | "lost";

// Provenance: which cj-lead-scraper CSV the lead came from,
// or "direct" for pre-scraper / referral clients.
export type LeadSource =
  | "top-leads.csv"
  | "hot-leads.csv"
  | "leads-with-websites.csv"
  | "outdated-site-emails-clean.csv"
  | "direct";

export interface Lead {
  slug: string; // stable unique id, kebab-case
  business: string;
  contact?: string; // email or phone from the CSV
  location?: string; // city / area (optional enrichment, from CSV)
  sector?: string; // industry category (optional enrichment)
  source: LeadSource;
  status: LeadStatus;
  nextAction?: string;
  nextActionDate?: string; // ISO "YYYY-MM-DD" (sorts chronologically as a string)
  proposalSlug?: string; // → /proposal/<proposalSlug>; MUST match a slug in lib/proposals.ts
  notes?: string;
}

// ── Ordering + display metadata ──────────────────────────
export const STATUS_ORDER: LeadStatus[] = [
  "new",
  "contacted",
  "proposal-sent",
  "negotiating",
  "won",
  "lost",
];

// Labels only — no new brand colours. Keeps the page declarative.
export const STATUS_META: Record<LeadStatus, { label: string }> = {
  new: { label: "New" },
  contacted: { label: "Contacted" },
  "proposal-sent": { label: "Proposal sent" },
  negotiating: { label: "Negotiating" },
  won: { label: "Won" },
  lost: { label: "Lost" },
};

// ── Pure helpers ─────────────────────────────────────────
export function countByStatus(leads: Lead[]): Record<LeadStatus, number> {
  const counts: Record<LeadStatus, number> = {
    new: 0,
    contacted: 0,
    "proposal-sent": 0,
    negotiating: 0,
    won: 0,
    lost: 0,
  };
  for (const lead of leads) counts[lead.status]++;
  return counts;
}

export function groupByStatus(leads: Lead[]): Record<LeadStatus, Lead[]> {
  const groups: Record<LeadStatus, Lead[]> = {
    new: [],
    contacted: [],
    "proposal-sent": [],
    negotiating: [],
    won: [],
    lost: [],
  };
  for (const lead of leads) groups[lead.status].push(lead);
  return groups;
}

// Ascending by nextActionDate; leads without a date sort last. Non-mutating.
export function sortByNextActionDate(leads: Lead[]): Lead[] {
  return [...leads].sort((a, b) => {
    if (!a.nextActionDate && !b.nextActionDate) return 0;
    if (!a.nextActionDate) return 1;
    if (!b.nextActionDate) return -1;
    return a.nextActionDate.localeCompare(b.nextActionDate); // ISO strings compare chronologically
  });
}

// Headline metrics for the hero.
export function pipelineSummary(leads: Lead[]): {
  total: number;
  inPipeline: number;
  proposalsOut: number;
  won: number;
} {
  const inPipeline = leads.filter(
    (l) => l.status !== "won" && l.status !== "lost"
  ).length;
  const proposalsOut = leads.filter(
    (l) => l.status === "proposal-sent" || l.status === "negotiating"
  ).length;
  const won = leads.filter((l) => l.status === "won").length;
  return { total: leads.length, inPipeline, proposalsOut, won };
}

// Deterministic date formatter — no Date/Intl, so no timezone drift.
// "2026-07-22" → "22 Jul 2026".
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const mi = Number(m) - 1;
  if (!y || !d || mi < 0 || mi > 11) return iso;
  return `${Number(d)} ${MONTHS[mi]} ${y}`;
}

// ── Seed data ────────────────────────────────────────────
// Honest statuses only: the two live proposals are "proposal-sent"; the four
// built clients are "won"; everything scraped-but-not-worked is "new".
// "contacted" / "negotiating" / "lost" are intentionally empty — Ollie fills
// them as the pipeline moves. Dates are near-future placeholders (today
// 2026-07-18) to be adjusted.
export const leads: Lead[] = [
  // ── Proposals out ──────────────────────────────────────
  {
    slug: "cp-morgan-roofing",
    business: "CP Morgan Roofing & Plastering",
    contact: "mail@cpmorganbuilding.co.uk",
    location: "Swansea",
    sector: "Roofing",
    source: "top-leads.csv",
    status: "proposal-sent",
    nextAction: "Follow up on proposal",
    nextActionDate: "2026-07-22",
    proposalSlug: "cp-morgan-roofing",
    notes: "4.9★, site from 1998 — proposal sent (£4,500 Signature).",
  },
  {
    slug: "the-bookcafe",
    business: "The Bookcafé",
    contact: "derby@thebookcafe.co.uk",
    location: "Derby",
    sector: "Café",
    source: "top-leads.csv",
    status: "proposal-sent",
    nextAction: "Follow up on proposal",
    nextActionDate: "2026-07-24",
    proposalSlug: "the-bookcafe",
    notes: "1,325 reviews at 4.5★, site from 2000 — proposal sent.",
  },

  // ── New — top-leads.csv (email outreach) ───────────────
  {
    slug: "harbot-builders",
    business: "Harbot Builders Ltd",
    contact: "info@harbotbuilders.co.uk",
    location: "Leicester",
    sector: "Construction",
    source: "top-leads.csv",
    proposalSlug: "harbot-builders",
    status: "new",
    nextAction: "Send intro email",
    nextActionDate: "2026-07-21",
    notes: "Top-ranked lead, score 40. Copyright 1986.",
  },
  {
    slug: "catalyst-digital-energy",
    business: "Catalyst Digital Energy",
    contact: "info@catalyst-commercial.co.uk",
    location: "Birmingham",
    sector: "Commercial",
    source: "top-leads.csv",
    proposalSlug: "catalyst-digital-energy",
    status: "new",
    nextAction: "Send intro email",
    nextActionDate: "2026-07-22",
    notes: "Copyright 2001.",
  },
  {
    slug: "spa-landscaping",
    business: "SPA Landscaping & Grounds Maintenance",
    contact: "info@spalandscaping.co.uk",
    location: "Sheffield",
    sector: "Landscaping",
    source: "top-leads.csv",
    proposalSlug: "spa-landscaping",
    status: "new",
    nextAction: "Send intro email",
    nextActionDate: "2026-07-23",
    notes: "No mobile support, copyright 2008.",
  },
  {
    slug: "bristol-roof-company",
    business: "Bristol Roof Company",
    contact: "info@bristolroofcompany.co.uk",
    location: "Bristol",
    sector: "Roofing",
    source: "top-leads.csv",
    proposalSlug: "bristol-roof-company",
    status: "new",
    nextAction: "Send intro email",
    nextActionDate: "2026-07-24",
    notes: "Copyright 2008.",
  },
  {
    slug: "stoke-industrial-roofing",
    business: "Stoke on Trent Industrial Roofing",
    contact: "info@stokeindustrialroofing.co.uk",
    location: "Stoke-on-Trent",
    sector: "Roofing",
    source: "top-leads.csv",
    status: "new",
    nextAction: "Send intro email",
    nextActionDate: "2026-07-25",
    notes: "Copyright 2008.",
  },
  {
    slug: "the-ginger-bistro",
    business: "The Ginger Bistro",
    contact: "info@gingerbistro.com",
    location: "Belfast",
    sector: "Restaurant",
    source: "top-leads.csv",
    proposalSlug: "the-ginger-bistro",
    status: "new",
    nextAction: "Send intro email",
    nextActionDate: "2026-07-28",
    notes: "Copyright 2009.",
  },
  {
    slug: "roy-beech-contractors",
    business: "Roy Beech Contractors Ltd",
    contact: "mail@roybeech.co.uk",
    location: "Stoke-on-Trent",
    sector: "Construction",
    source: "top-leads.csv",
    status: "new",
    nextAction: "Send intro email",
    nextActionDate: "2026-07-29",
    notes: "Copyright 2010.",
  },
  {
    slug: "cornerstone-construction-bristol",
    business: "Cornerstone Construction (Bristol) Ltd",
    contact: "sales@cornerstonebristol.co.uk",
    location: "Bristol",
    sector: "Construction",
    source: "top-leads.csv",
    status: "new",
    nextAction: "Send intro email",
    nextActionDate: "2026-07-30",
    notes: "Copyright 2011.",
  },

  // ── New — hot-leads.csv (Devon local scrape, phone-only) ─
  {
    slug: "gold-star-roofing",
    business: "Gold Star Roofing",
    contact: "01392 986572",
    location: "Exeter",
    sector: "Roofing",
    source: "hot-leads.csv",
    status: "new",
    nextAction: "Cold call",
    nextActionDate: "2026-07-21",
    notes: "4.9★, 10 reviews.",
  },
  {
    slug: "pink-ginger-flower-cafe",
    business: "Pink Ginger Flower Cafe",
    contact: "07508 338331",
    location: "Exeter",
    sector: "Café",
    source: "hot-leads.csv",
    status: "new",
    nextAction: "Cold call",
    nextActionDate: "2026-07-23",
    notes: "4.9★, 123 reviews.",
  },
  {
    slug: "babylon-exeter",
    business: "Babylon",
    contact: "01392 342626",
    location: "Exeter",
    sector: "Restaurant",
    source: "hot-leads.csv",
    status: "new",
    nextAction: "Cold call",
    nextActionDate: "2026-07-25",
    notes: "4.9★, 1,006 reviews.",
  },
  {
    slug: "dunmore-construction",
    business: "Dunmore Construction",
    contact: "01395 239202",
    location: "Exeter",
    sector: "Construction",
    source: "hot-leads.csv",
    status: "new",
    nextAction: "Cold call",
    nextActionDate: "2026-07-28",
    notes: "5★, small review count.",
  },

  // ── Won — live clients (already shipped, see /work) ────
  {
    slug: "la-roofing-client",
    business: "LA Roofing",
    location: "Exeter",
    sector: "Roofing",
    source: "direct",
    status: "won",
    notes: "Live client — /work/la-roofing.",
  },
  {
    slug: "range-shipping-client",
    business: "Range Shipping",
    location: "UK",
    sector: "Maritime Logistics",
    source: "direct",
    status: "won",
    notes: "Live client — /work/range-shipping.",
  },
  {
    slug: "uncle-sams-client",
    business: "Uncle Sam's",
    location: "Cardiff",
    sector: "Restaurant",
    source: "direct",
    status: "won",
    notes: "Live client — /work/uncle-sams.",
  },
  {
    slug: "taste-of-portugal-client",
    business: "Taste of Portugal",
    location: "Boston, Lincs",
    sector: "Restaurant & Café",
    source: "direct",
    status: "won",
    notes: "Live client — /work/taste-of-portugal.",
  },
];
