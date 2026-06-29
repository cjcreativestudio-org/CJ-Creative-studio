import type { Metadata } from "next";
import Link from "next/link";
import EditorialNav from "@/components/editorial-nav";
import EditorialFooter from "@/components/editorial-footer";
import MaskReveal from "@/components/mask-reveal";

export const metadata: Metadata = {
  title: "Services — CJ Studio",
  description: "Identity systems, digital interfaces, and design operations from CJ Studio.",
};

const services = [
  {
    index: "01",
    name: "Identity Systems",
    tagline: "A brand that holds together under pressure.",
    deliverables: ["Visual identity", "Logo system", "Brand guidelines", "Asset library"],
    price: "From £2,500",
  },
  {
    index: "02",
    name: "Digital Interfaces",
    tagline: "Sites that perform as well as they look.",
    deliverables: ["Web design", "Development", "CMS setup", "Launch support"],
    price: "From £4,000",
  },
  {
    index: "03",
    name: "Design Operations",
    tagline: "The infrastructure behind consistent output.",
    deliverables: ["Component library", "Design system", "Documentation", "Ongoing retainer"],
    price: "From £800/mo",
  },
];

const steps = [
  { index: "01", name: "Discovery", description: "We map your goals, audience, and constraints." },
  { index: "02", name: "Strategy", description: "Direction is set before a pixel is placed." },
  { index: "03", name: "Design", description: "High-fidelity screens crafted for clarity." },
  { index: "04", name: "Review", description: "Structured feedback rounds, no open-ended loops." },
  { index: "05", name: "Build", description: "Code that ships clean and performs in production." },
  { index: "06", name: "Launch", description: "Handover, training, and post-launch support." },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#0a0a0a]" id="main-content">
      <EditorialNav />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] pt-14" aria-label="Services hero">
        <div className="px-6 pt-12 pb-16">
          {/* Kicker row */}
          <div className="flex items-center justify-between mb-10">
            <span className="text-[12px] tracking-[0.18em] uppercase text-[#666]">
              What We Do
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
              Three disciplines.
            </h1>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h1
              className="text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.9] text-[#f0f0f0]"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              One integrated
            </h1>
          </MaskReveal>
          <MaskReveal delay={0.2}>
            <h1
              className="text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.9] text-[#f0f0f0] mb-8"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              studio.
            </h1>
          </MaskReveal>

          {/* Rule + body */}
          <div className="flex items-start gap-8 mt-2">
            <div className="w-10 border-t-[2px] border-[#f0f0f0] mt-2 shrink-0" />
            <p className="max-w-[340px] text-[15px] leading-[1.65] text-[#888] font-serif">
              We don&rsquo;t bolt services together. We design, build, and operate as one.
            </p>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────── */}
      <section className="bg-[#f5f5f5] px-6 py-24" aria-label="Our services">
        <div className="max-w-[1280px] mx-auto">
          {/* Header row */}
          <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
            <span className="text-[12px] tracking-[0.18em] uppercase text-[#aaa] mt-2 whitespace-nowrap">
              Our Services
            </span>
            <MaskReveal className="md:text-right">
              <h2
                className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d]"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                Pick one.
                <br />
                Or all three.
              </h2>
            </MaskReveal>
          </div>

          {/* Service rows */}
          <div className="border-t border-[#ddd]">
            {services.map(({ index, name, tagline, deliverables, price }) => (
              <div
                key={index}
                className="border-b border-[#ddd] py-12 px-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-start transition-[background-color] duration-[200ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#ececec]"
              >
                {/* Left: number + name + tagline */}
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">{index}</span>
                  <h3 className="text-[clamp(1.4rem,3vw,2rem)] italic text-[#0d0d0d] font-serif">
                    {name}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#555] max-w-[360px]">
                    {tagline}
                  </p>
                </div>

                {/* Right: deliverables + price */}
                <div className="flex flex-col gap-4 md:items-end">
                  <ul className="flex flex-col gap-1">
                    {deliverables.map((item) => (
                      <li
                        key={item}
                        className="text-[12px] tracking-[0.06em] text-[#777] md:text-right"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="text-[11px] tracking-[0.12em] text-[#aaa] uppercase">
                    {price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────── */}
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
                Six steps from
                <br />
                brief to launch.
              </h2>
            </MaskReveal>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 border border-[#333]">
            {steps.map(({ index, name, description }) => (
              <div
                key={index}
                className="border-b border-r-0 md:odd:border-r border-[#333] last:border-b-0 md:[&:nth-last-child(2):nth-child(odd)]:border-b-0 p-8 flex flex-col gap-3"
              >
                <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">{index}</span>
                <h3 className="text-[16px] italic text-[#f0f0f0] font-serif">{name}</h3>
                <p className="text-[13px] leading-relaxed text-[#888]">{description}</p>
              </div>
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
                Ready when
                <br />
                you are.
              </h2>
            </MaskReveal>
          </div>

          {/* CTA button */}
          <div className="flex justify-end">
            <Link
              href="/contact"
              className="inline-block border border-[#0d0d0d] px-8 py-4 text-[13px] tracking-[0.12em] uppercase text-[#0d0d0d] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d0d0d] [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
            >
              Start a project →
            </Link>
          </div>
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}
