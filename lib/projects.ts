export interface Project {
  name: string;
  type: string;
  img: string;
  color: string;
  enter: { x?: number; y?: number; opacity: number };
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
    name: "Maple & Co",
    type: "Restaurant",
    img: "https://images.unsplash.com/photo-1653259038915-7cf0b7a4dd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
    color: "from-amber-100/80 to-orange-100/80",
    enter: { x: -40, opacity: 0 },
    slug: "maple-and-co",
    description:
      "Maple & Co needed a digital presence that matched the warmth and precision of their kitchen. We built a reservation-first site with a seasonal menu system and full mobile optimisation — turning browsers into bookings.",
    url: "https://mapleandco.co.uk",
    quote: {
      text: "The site went live on a Friday. By Monday our bookings were up 40%.",
      author: "Sarah Mitchell, Owner",
    },
    details: [
      "Reservation-first UX with Resend-powered confirmation emails",
      "Seasonal menu CMS so the team updates content without touching code",
      "Full mobile optimisation — 95 Lighthouse performance score",
      "Bespoke photography direction and image treatment pipeline",
    ],
  },
  {
    name: "Northfield Law",
    type: "Legal Services",
    img: "https://images.unsplash.com/photo-1598139384902-5a8217874645?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
    color: "from-slate-100/80 to-blue-100/80",
    enter: { y: 48, opacity: 0 },
    slug: "northfield-law",
    description:
      "A regional law firm competing against national brands needed a site that projected authority without sacrificing approachability. We stripped back the visual noise and let their expertise speak.",
    url: "https://northfieldlaw.co.uk",
    quote: {
      text: "We'd been embarrassed to send people to our old site. Now we lead with it.",
      author: "James Northfield, Partner",
    },
    details: [
      "Trust-first information architecture positioning expertise over price",
      "Accessibility-first build — WCAG 2.1 AA compliant throughout",
      "Practice area landing pages tuned for local SEO",
      "Contact system with automated intake triage via Resend",
    ],
  },
  {
    name: "Bloom Studio",
    type: "Photography",
    img: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
    color: "from-rose-100/80 to-pink-100/80",
    enter: { x: 40, opacity: 0 },
    slug: "bloom-studio",
    description:
      "Bloom Studio's work deserved a gallery experience that didn't get in the way. We built a portfolio site where the photography is the interface — fast-loading, scroll-driven, and shot-to-screen in one click.",
    url: "https://bloomstudio.co.uk",
    quote: {
      text: "My enquiry rate doubled in the first month. The site does the selling for me.",
      author: "Chloe Arden, Founder",
    },
    details: [
      "Scroll-driven gallery with motion/react lazy reveal animations",
      "Edge-optimised image pipeline — next/image + Vercel CDN",
      "One-click booking via integrated Calendly embed",
      "Brand identity refresh: wordmark, colour palette, and type system",
    ],
  },
];
