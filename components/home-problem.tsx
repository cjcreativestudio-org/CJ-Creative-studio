"use client";

import { useRef } from "react";
import { useInView, useReducedMotion, motion } from "motion/react";
import MaskReveal from "@/components/mask-reveal";
import LightSectionTexture from "@/components/light-section-texture";
import { EXPO } from "@/lib/easing";

const problems = [
  {
    index: "01",
    heading: "People judge you before they call.",
    body: "If you run a serious operation, a slow or outdated website doesn't just look bad—it actively kills your credibility. You lose the contract before you even get to the table.",
  },
  {
    index: "02",
    heading: "If they can't find you, you lose the job.",
    body: "It doesn't matter how good your service is if your competitors are the ones ranking on page one. We build sites that actually show up when your ideal clients are looking for a solution.",
  },
  {
    index: "03",
    heading: "Your site needs to pull its weight.",
    body: "A website shouldn't just be a digital brochure sitting there doing nothing. It should be actively answering questions, filtering out bad leads, and driving real revenue while you focus on the business.",
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
          className="text-[13px] tracking-[0.18em] text-[#0A2540]"
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
          className="text-[15px] leading-[1.7] text-[#555] max-w-[520px]"
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
      aria-label="The standard"
    >
      <LightSectionTexture />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="mb-12">
          <MaskReveal>
            <span className="text-[12px] tracking-[0.18em] uppercase text-[#0A2540]">
              The Standard
            </span>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2
              className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] mt-4"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Your digital presence should be as sharp
              <br />
              as your actual operation.
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