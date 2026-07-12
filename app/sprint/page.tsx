import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import EditorialNav from "@/components/editorial-nav";
import EditorialFooter from "@/components/editorial-footer";
import MaskReveal from "@/components/mask-reveal";

export const metadata: Metadata = {
  title: "48-Hour Website Sprint — CJ Studio",
  description:
    "Your business website, live in 48 hours — £1,995 fixed. Up to five pages, mobile-first, basic SEO, contact form and hosting setup. Built for UK trades and local businesses.",
};

const inclusions = [
  {
    index: "01",
    name: "Up to five pages",
    description:
      "Home, services, about, contact — whatever your business needs to win work. Structured around how your customers actually buy.",
  },
  {
    index: "02",
    name: "Mobile-first build",
    description:
      "Most of your customers find you on a phone, often standing on a job site. Your site is designed for that screen first.",
  },
  {
    index: "03",
    name: "Basic SEO",
    description:
      "Titles, descriptions, sitemap, and local search fundamentals set up properly from day one — so you show up when people search.",
  },
  {
    index: "04",
    name: "Contact form",
    description:
      "Enquiries land straight in your inbox with everything you need to quote. No missed calls, no lost leads.",
  },
  {
    index: "05",
    name: "Hosting setup",
    description:
      "Fast, secure hosting configured and connected to your domain. You don't touch a single server setting.",
  },
  {
    index: "06",
    name: "One revision round",
    description:
      "A structured review pass after you see the finished site. Tell us what to change, we make it right before launch.",
  },
];

const steps = [
  {
    index: "01",
    name: "Send your info",
    description:
      "Fill in the contact form with your business details — services, photos, and your logo if you have one. That's the only homework you'll get.",
  },
  {
    index: "02",
    name: "We build in 48 hours",
    description:
      "The clock starts the moment we have what we need. Two days later, your finished site is ready to review — not a wireframe, the real thing.",
  },
  {
    index: "03",
    name: "Review and go live",
    description:
      "One revision round to get the details right, then we connect your domain and you're live. The site is yours, outright.",
  },
];

const proof = [
  {
    slug: "la-roofing",
    img: "/assets/work/la-roofing.png",
    name: "LA Roofing",
    category: "Local Trades — Exeter & Devon",
    outcome:
      "Went from word-of-mouth only to a site that closes leads. Quote calculator, 4.9-star reviews, page one locally.",
  },
  {
    slug: "range-shipping",
    img: "/assets/work/range-shipping.png",
    name: "Range Shipping",
    category: "Logistics / Maritime",
    outcome:
      "A 47-year operator with no web presence. Now landing enterprise enquiries online.",
  },
];

const faqs = [
  {
    question: "How is 48 hours actually possible?",
    answer:
      "Because the scope is fixed and the process is proven. We build with the same system behind LA Roofing and Range Shipping, tuned to what a local business actually needs — no committees, no scope creep, no waiting three weeks for a mood board.",
  },
  {
    question: "What do you need from me?",
    answer:
      "Your logo if you have one, photos of your work, a list of your services, and your contact details. Around twenty minutes of your time, total. If you're missing something, we'll work with what you've got.",
  },
  {
    question: "What if I want changes?",
    answer:
      "One structured revision round is included. You review the finished site, tell us everything you want changed in one pass, and we make it right before launch. Ongoing tweaks after launch are covered by an optional monthly care plan.",
  },
  {
    question: "What's not included?",
    answer:
      "Online shops, booking systems, and custom features sit outside the sprint — those are scoped and quoted separately. If your project needs more than five pages or something bespoke, our full builds are on the services page.",
  },
];

export default function SprintPage() {
  return (
    <div className="bg-[#0a0a0a]" id="main-content">
      <EditorialNav />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] pt-14" aria-label="Sprint hero">
        <div className="px-6 pt-12 pb-16">
          {/* Kicker row */}
          <div className="flex items-center justify-between mb-10">
            <span className="text-[12px] tracking-[0.18em] uppercase text-[#666]">
              The 48-Hour Sprint
            </span>
            <span className="text-[12px] tracking-[0.18em] uppercase text-[#666]">
              CJ Creative Studio
            </span>
          </div>

          {/* Display heading — each line a separate MaskReveal */}
          <MaskReveal delay={0}>
            <h1
              className="text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.9] text-[#f0f0f0]"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Your business website.
            </h1>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h1
              className="text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.9] text-[#f0f0f0]"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Live in 48 hours.
            </h1>
          </MaskReveal>
          <MaskReveal delay={0.2}>
            <h1
              className="text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.9] text-[#5b9fd6] mb-8"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              &pound;1,995 fixed.
            </h1>
          </MaskReveal>

          {/* Rule + body */}
          <div className="flex items-start gap-8 mt-2 mb-10">
            <div className="w-10 border-t-[2px] border-[#f0f0f0] mt-2 shrink-0" />
            <p className="max-w-[380px] text-[15px] leading-[1.65] text-[#888] font-serif">
              No drawn-out agency process. No months of meetings. Built for UK
              trades and local businesses that need to be online and winning
              work &mdash; this week, not this quarter.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-block bg-[#0A2540] text-white px-8 py-4 text-[13px] tracking-[0.12em] uppercase font-medium text-center transition-[background-color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d3060]"
            >
              Claim your slot &rarr;
            </Link>
            <Link
              href="#sprint-proof"
              className="inline-block border border-[#0A2540] px-8 py-4 text-[13px] tracking-[0.12em] uppercase text-[#5b9fd6] text-center transition-[background-color,color,border-color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0A2540] [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
            >
              See the proof &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── What's included ──────────────────────────────────── */}
      <section className="bg-[#f5f5f5] px-6 py-24" aria-label="What's included">
        <div className="max-w-[1280px] mx-auto">
          {/* Header row */}
          <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
            <span className="text-[12px] tracking-[0.18em] uppercase text-[#aaa] mt-2 whitespace-nowrap">
              What&rsquo;s Included
            </span>
            <MaskReveal className="md:text-right">
              <h2
                className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d]"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                Everything you need.
                <br />
                Nothing you don&rsquo;t.
              </h2>
            </MaskReveal>
          </div>

          {/* Inclusions grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 border border-[#ddd]">
            {inclusions.map(({ index, name, description }) => (
              <div
                key={index}
                className="border-b border-r-0 md:odd:border-r border-[#ddd] last:border-b-0 md:[&:nth-last-child(2):nth-child(odd)]:border-b-0 p-8 flex flex-col gap-3 transition-[background-color] duration-[200ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#ececec]"
              >
                <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">{index}</span>
                <h3 className="text-[16px] italic text-[#0d0d0d] font-serif">{name}</h3>
                <p className="text-[13px] leading-relaxed text-[#555] max-w-[420px]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] px-6 py-24" aria-label="How it works">
        <div className="max-w-[1280px] mx-auto">
          {/* Header row */}
          <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
            <span className="text-[12px] tracking-[0.18em] uppercase text-[#666] mt-2 whitespace-nowrap">
              How It Works
            </span>
            <MaskReveal className="md:text-right">
              <h2
                className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#f0f0f0]"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                Three steps.
                <br />
                Two days.
              </h2>
            </MaskReveal>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-[#333]">
            {steps.map(({ index, name, description }) => (
              <div
                key={index}
                className="border-b md:border-b-0 md:border-r border-[#333] last:border-b-0 md:last:border-r-0 p-8 flex flex-col gap-3"
              >
                <span
                  className="text-[clamp(2.4rem,4vw,3.5rem)] leading-[1] text-[#5b9fd6]"
                  style={{ fontFamily: "var(--font-archivo-black)" }}
                  aria-hidden="true"
                >
                  {index}
                </span>
                <h3 className="text-[18px] italic text-[#f0f0f0] font-serif mt-2">{name}</h3>
                <p className="text-[13px] leading-relaxed text-[#888]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof ────────────────────────────────────────────── */}
      <section
        id="sprint-proof"
        className="bg-[#f5f5f5] px-6 py-24"
        aria-label="Proof from past projects"
      >
        <div className="max-w-[1280px] mx-auto">
          {/* Header row */}
          <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
            <span className="text-[12px] tracking-[0.18em] uppercase text-[#aaa] mt-2 whitespace-nowrap">
              The Proof
            </span>
            <MaskReveal className="md:text-right">
              <h2
                className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d]"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                Built for businesses
                <br />
                like yours.
              </h2>
            </MaskReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {proof.map(({ slug, img, name, category, outcome }) => (
              <Link
                key={slug}
                href="/work"
                className="group block"
                aria-label={`View ${name} project`}
              >
                {/* Device frame */}
                <div className="border border-[#e0e0e0] rounded-sm overflow-hidden transition-[box-shadow,transform] duration-300 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:shadow-xl [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-1">
                  {/* Browser chrome */}
                  <div className="bg-[#f0f0f0] border-b border-[#e0e0e0] px-3 py-2 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  {/* Screenshot */}
                  <div className="relative w-full overflow-hidden" style={{ height: "260px" }}>
                    <Image
                      src={img}
                      alt={name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-[transform,filter] duration-500 ease-out brightness-[0.92] saturate-[0.85] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.02] [@media(hover:hover)_and_(pointer:fine)]:group-hover:brightness-100 [@media(hover:hover)_and_(pointer:fine)]:group-hover:saturate-100"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#0A2540] opacity-0 transition-opacity duration-300 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-30 flex items-center justify-center">
                      <span className="text-white text-[13px] tracking-[0.12em] uppercase opacity-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 transition-opacity duration-300">
                        See all work &rarr;
                      </span>
                    </div>
                  </div>
                </div>
                {/* Meta */}
                <div className="pt-5 flex flex-col gap-1.5">
                  <span className="text-[10px] tracking-[0.22em] text-[#555]">{category}</span>
                  <h3 className="text-[20px] font-bold italic text-[#0d0d0d]">{name}</h3>
                  <p className="text-[14px] leading-relaxed text-[#666]">{outcome}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] px-6 py-24" aria-label="Frequently asked questions">
        <div className="max-w-[1280px] mx-auto">
          {/* Header row */}
          <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
            <span className="text-[12px] tracking-[0.18em] uppercase text-[#666] mt-2 whitespace-nowrap">
              Questions
            </span>
            <MaskReveal className="md:text-right">
              <h2
                className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#f0f0f0]"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                Straight answers.
              </h2>
            </MaskReveal>
          </div>

          {/* FAQ rows */}
          <div className="border-t border-[#333]">
            {faqs.map(({ question, answer }) => (
              <details key={question} className="group border-b border-[#333]">
                <summary className="flex items-center justify-between gap-8 py-8 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[clamp(1.1rem,2.2vw,1.5rem)] italic text-[#f0f0f0] font-serif">
                    {question}
                  </h3>
                  <span
                    className="text-[#5b9fd6] text-[22px] leading-none shrink-0 transition-transform duration-200 ease-out group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-8 text-[14px] leading-[1.7] text-[#888] max-w-[640px]">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-[#f5f5f5] px-6 py-24" aria-label="Get started">
        <div className="max-w-[1280px] mx-auto">
          {/* Header row */}
          <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
            <span className="text-[12px] tracking-[0.18em] uppercase text-[#aaa] mt-2 whitespace-nowrap">
              Get Started
            </span>
            <MaskReveal className="md:text-right">
              <h2
                className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d]"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                The clock starts
                <br />
                when you say go.
              </h2>
            </MaskReveal>
          </div>

          {/* CTA button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-6">
            <p className="text-[14px] leading-relaxed text-[#666] max-w-[360px] sm:text-right">
              Send your details through the contact form and we&rsquo;ll confirm
              your build slot within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#0A2540] text-white px-8 py-4 text-[13px] tracking-[0.12em] uppercase font-medium text-center transition-[background-color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d3060]"
            >
              Claim your 48-hour slot &rarr;
            </Link>
          </div>
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}
