"use client";

import { useRef } from "react";
import { useInView, useReducedMotion, motion } from "motion/react";
import MaskReveal from "@/components/mask-reveal";
import { EXPO } from "@/lib/easing";

const differentiators = [
  {
    index: "01",
    title: "Priced for what you actually need.",
    body: "We do not charge you for flashy animations or complex features if your business does not need them. You get a custom, fixed price based strictly on what will drive results for you, with flexible installment options to protect your cash flow.",
    // line goes bottom-left to top-right
    lineAngle: "rotate-[-42deg]",
    lineOffset: "top-[-40%] left-[-10%]",
  },
  {
    index: "02",
    title: "Fast delivery and full ownership.",
    body: "Typical agencies take months to build a site and then trap you in expensive hosting contracts. We can launch your site in as little as one week. When it is done, you own the asset completely—we will even hand over the code if you want to host it yourself.",
    // steeper diagonal
    lineAngle: "rotate-[-55deg]",
    lineOffset: "top-[-60%] left-[20%]",
  },
  {
    index: "03",
    title: "Direct access and zero radio silence.",
    body: "You will never be passed off to an account manager. You have a direct line to the founders, guaranteed 24-hour response times, and a commitment that we will keep tweaking the design until it perfectly supports your day-to-day operations.",
    // shallow diagonal
    lineAngle: "rotate-[-30deg]",
    lineOffset: "top-[-20%] left-[-5%]",
  },
];

function DiffCard({
  index,
  title,
  body,
  lineAngle,
  lineOffset,
  i,
}: {
  index: string;
  title: string;
  body: string;
  lineAngle: string;
  lineOffset: string;
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <div
      ref={ref}
      className="relative border border-[#2a2a2a] p-10 md:p-14 flex flex-col min-h-[380px] backdrop-blur-sm bg-[rgba(10,10,10,0.55)] overflow-hidden"
    >
      {/* Geometric diagonal line */}
      <div
        className={`absolute ${lineOffset} w-[200%] h-px bg-white opacity-[0.07] ${lineAngle} origin-center pointer-events-none`}
        aria-hidden="true"
      />
      {/* Second parallel line for depth */}
      <div
        className={`absolute ${lineOffset} w-[200%] h-px bg-white opacity-[0.04] ${lineAngle} origin-center pointer-events-none translate-y-6`}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col gap-3">
        <MaskReveal delay={i * 0.12}>
          <span className="text-[10px] tracking-[0.22em] text-[#0A2540]">
            {index}
          </span>
        </MaskReveal>
        <MaskReveal delay={i * 0.12 + 0.1}>
          <h3
            className="text-[clamp(1.8rem,2.6vw,2.8rem)] leading-[1.05] text-[#f0f0f0]"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            {title}
          </h3>
        </MaskReveal>
      </div>

      <motion.p
        className="relative z-10 text-[16px] leading-[1.75] text-[#999] mt-12"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={reduced ? {} : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, ease: EXPO, delay: i * 0.12 + 0.22 }}
      >
        {body}
      </motion.p>
    </div>
  );
}

export default function HomeDifferentiators() {
  return (
    <section
      className="relative bg-[#0a0a0a] text-[#f0f0f0] px-4 md:px-8 py-32 overflow-hidden"
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

      <div className="relative z-10">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
          <MaskReveal>
            <span className="text-[12px] tracking-[0.18em] uppercase text-[#666] mt-2 whitespace-nowrap">
              How We&rsquo;re Different
            </span>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2
              className="text-[clamp(2rem,4vw,4rem)] leading-[0.9] text-[#f0f0f0] md:text-right"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Built differently.
            </h2>
          </MaskReveal>
        </div>

        {/* Full-bleed card grid — no max-width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2a2a2a]">
          {differentiators.map(({ index, title, body, lineAngle, lineOffset }, i) => (
            <DiffCard
              key={index}
              index={index}
              title={title}
              body={body}
              lineAngle={lineAngle}
              lineOffset={lineOffset}
              i={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
