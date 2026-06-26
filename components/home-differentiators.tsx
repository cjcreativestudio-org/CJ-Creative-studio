"use client";

import { useRef } from "react";
import { useInView, useReducedMotion, motion } from "motion/react";
import MaskReveal from "@/components/mask-reveal";
import { EXPO } from "@/lib/easing";

const differentiators = [
  {
    index: "01",
    title: "Fixed Price",
    body: "We agree on a number before work starts. It does not change. No retainers, no scope creep, no surprise invoices at the end.",
  },
  {
    index: "02",
    title: "Live in Weeks",
    body: "Most projects complete in 2 to 4 weeks. You get a timeline on day one and a finished site by the end of it.",
  },
  {
    index: "03",
    title: "Built for You",
    body: "Every site is written from scratch for your business. No page builders, no themes, no other client's layout with your logo on it. And for 30 days after launch, we're on hand for questions and fixes at no extra cost.",
  },
];

function DiffCard({
  index,
  title,
  body,
  i,
}: {
  index: string;
  title: string;
  body: string;
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <div
      ref={ref}
      className="border border-[#333] p-8 md:p-10 flex flex-col justify-between min-h-[240px] backdrop-blur-sm bg-[rgba(10,10,10,0.6)]"
    >
      <MaskReveal delay={i * 0.12}>
        <span className="text-[10px] tracking-[0.22em] text-[#555]">
          {index}
        </span>
      </MaskReveal>
      <div className="flex flex-col gap-3 mt-auto">
        <MaskReveal delay={i * 0.12 + 0.1}>
          <h3
            className="text-[clamp(1.8rem,3vw,3rem)] leading-[1] text-[#f0f0f0]"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            {title}
          </h3>
        </MaskReveal>
        <motion.p
          className="text-[14px] leading-[1.7] text-[#888] font-serif"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={reduced ? {} : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, ease: EXPO, delay: i * 0.12 + 0.22 }}
        >
          {body}
        </motion.p>
      </div>
    </div>
  );
}

export default function HomeDifferentiators() {
  return (
    <section
      className="relative bg-[#0a0a0a] text-[#f0f0f0] px-6 py-24 overflow-hidden"
      aria-label="How we're different"
    >
      {/* Geometric video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12] pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/assets/video/geo-bg.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
          <MaskReveal>
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#666] mt-2 whitespace-nowrap">
              How We&rsquo;re Different
            </span>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2
              className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#f0f0f0] md:text-right"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Built for businesses,
              <br />
              not award shows.
            </h2>
          </MaskReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#333]">
          {differentiators.map(({ index, title, body }, i) => (
            <DiffCard key={index} index={index} title={title} body={body} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
