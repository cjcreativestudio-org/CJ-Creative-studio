"use client";

import { useRef } from "react";
import { useInView, useReducedMotion, motion } from "motion/react";
import MaskReveal from "@/components/mask-reveal";
import LightSectionTexture from "@/components/light-section-texture";
import { EXPO } from "@/lib/easing";

const problems = [
  {
    index: "01",
    heading: "Your digital presence is your first pitch.",
    body: "For operators in maritime logistics, trades, and hospitality, an outdated site doesn't just look stale — it actively costs you enterprise enquiries before a conversation begins.",
  },
  {
    index: "02",
    heading: "Discoverability is a commercial asset.",
    body: "If your operation doesn't surface in relevant searches, you are invisible to the buyers who matter. Local and sector-specific visibility is infrastructure, not a marketing afterthought.",
  },
  {
    index: "03",
    heading: "Your site should work as hard as your team.",
    body: "Every hour your digital platform fails to convert, qualify, or inform a prospect is margin left on the table. We build systems that close the gap between operational quality and online presence.",
  },
];

function ProblemItem({
  index,
  heading,
  body,
  i,
}: {
  index: string;
  heading: string;
  body: string;
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <div
      ref={ref}
      className="border-b border-[#ddd] py-10 grid grid-cols-[3rem_1fr] md:grid-cols-[6rem_1fr] gap-6 md:gap-12 items-start"
    >
      <MaskReveal delay={i * 0.12}>
        <span
          className="text-[13px] tracking-[0.18em] text-[#bbb]"
          aria-hidden="true"
        >
          {index}
        </span>
      </MaskReveal>
      <div className="flex flex-col gap-3">
        <MaskReveal delay={i * 0.12 + 0.08}>
          <h3
            className="text-[clamp(1.4rem,3.5vw,2.8rem)] leading-[1.1] text-[#0d0d0d]"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            {heading}
          </h3>
        </MaskReveal>
        <motion.p
          className="text-[15px] leading-[1.7] text-[#555] font-serif max-w-[520px]"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={reduced ? {} : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, ease: EXPO, delay: i * 0.12 + 0.2 }}
        >
          {body}
        </motion.p>
      </div>
    </div>
  );
}

export default function HomeProblem() {
  return (
    <section
      className="relative overflow-hidden bg-[#f5f5f5] text-[#0d0d0d] px-6 py-24"
      aria-label="The opportunity"
    >
      <LightSectionTexture />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="mb-12">
          <MaskReveal>
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#aaa]">
              The Opportunity
            </span>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2
              className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] mt-4"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Your digital infrastructure
              <br />
              should match your operational standard.
            </h2>
          </MaskReveal>
        </div>
        {problems.map(({ index, heading, body }, i) => (
          <ProblemItem key={index} index={index} heading={heading} body={body} i={i} />
        ))}
      </div>
    </section>
  );
}