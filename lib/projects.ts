export interface Project {
  name: string;
  type: string;
  img: string;
  slug: string;
  description: string;
  url?: string;
  quote?: {
    text: string;
    author: string;
  };
  details: string[];
}

export const projects: Project[] = [
  {
    name: "Range Shipping",
    type: "Maritime Logistics",
    img: "/assets/work/range-shipping.png",
    slug: "range-shipping",
    description:
      "Range Shipping needed a digital presence that matched the institutional weight of 47 years in dry bulk operations. We built a fast, authoritative site that speaks directly to commodity traders and fleet owners — clean enough for a boardroom, specific enough to earn trust.",
    url: "https://range-shipping-site.vercel.app",
    details: [
      "Cinematic scroll hero with a 120-frame canvas sequence — scroll-driven, no autoplay",
      "Institutional credibility architecture: industry memberships, fleet specs, and operational history front-loaded",
      "Full mobile optimisation with sub-second load performance on Vercel's edge network",
      "Precision dark design language built for a 47-year-old independent operator",
    ],
  },
  {
    name: "LA Roofing",
    type: "Local Trades",
    img: "/assets/work/la-roofing.png",
    slug: "la-roofing",
    description:
      "LA Roofing needed a site that could earn trust on the first scroll and turn that trust into quote requests — for an Exeter and Devon roofing business with a 4.9-star reputation built over years of real jobs. We built a lead-first site with an instant cost calculator and a gallery of real project photos doing the convincing.",
    url: "https://la-roofing.vercel.app",
    details: [
      "Built-in 'Calculate Your Roof Cost' tool, surfaced before the fold to capture intent early",
      "Google reviews (4.9/5) presented as social proof directly beneath the services grid",
      "Project gallery showcasing real completed jobs across Exeter and Devon",
      "Mobile-first build for a trade where most enquiries start on a phone, on-site",
    ],
  },
  {
    name: "Uncle Sam's",
    type: "Restaurant",
    img: "/assets/work/uncle-sams.png",
    slug: "uncle-sams",
    description:
      "Cardiff's best-loved burger bar since 1981 needed a site that did justice to four decades of reputation. We built a bold, food-first site with online ordering, a loyalty signup, and photography-led storytelling that turns first-timers into regulars.",
    url: "https://uncle-sams.vercel.app",
    details: [
      "Food-first layout — every section anchored by photography of the restaurant and dishes",
      "Online ordering with Uber Eats and Just Eat deep-links built into the menu flow",
      "Sam's Club loyalty signup with Resend-powered welcome email",
      "Mobile-first build optimised for hungry users searching on the go",
    ],
  },
  {
    name: "Taste of Portugal",
    type: "Restaurant & Café",
    img: "/assets/work/taste-of-portugal.png",
    slug: "taste-of-portugal",
    description:
      "A Taste of Portugal runs two identities under one roof in Boston, Lincolnshire — a pastelaria by morning, a full Portuguese restaurant by night — and needed a site that could hold both without confusing visitors. We built a single page that switches tone between the two, with five-star Google reviews surfaced up front.",
    url: "https://taste-of-portugal-three.vercel.app",
    quote: {
      text: "Food is PERFECT, from the beef to the fish to the salad. And the delicious chocolate mousse.",
      author: "Paula Hanmer, Google review",
    },
    details: [
      "Two-identity layout: 'A Coffee Shop at Heart' by day, 'A Restaurant by Night' by evening",
      "Google reviews carousel placed directly beneath the day/night split",
      "Table booking and menu access surfaced in primary navigation",
      "Built for a Boston, Lincolnshire address — disambiguated to avoid confusion with Boston, USA",
    ],
  },
];
