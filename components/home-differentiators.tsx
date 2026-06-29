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
  },
  {
    index: "02",
    title: "Fast delivery and full ownership.",
    body: "Typical agencies take months to build a site and then trap you in expensive hosting contracts. We can launch your site in as little as one week. When it is done, you own the asset completely—we will even hand over the code if you want to host it yourself.",
  },
  {
    index: "03",
    title: "Direct access and zero radio silence.",
    body: "You will never be passed off to an account manager. You have a direct line to the founders, guaranteed 24-hour response times, and a commitment that we will keep tweaking the design until it perfectly supports your day-to-day operations.",
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
      <div className="flex flex-col gap-3">
        <MaskReveal delay={i * 0.12}>
          <span className="text-[10px] tracking-[0.22em] text-[#555]">
            {index}
          </span>
        </MaskReveal>
        <MaskReveal delay={i * 0.12 + 0.1}>
          <h3
            className="text-[clamp(1.8rem,3vw,3rem)] leading-[1] text-[#f0f0f0]"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            {title}
          </h3>
        </MaskReveal>
      </div>
      <motion.p
        className="text-[14px] leading-[1.7] text-[#888] font-serif mt-auto"
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
            <span className="text-[13px] tracking-[0.22em] uppercase text-[#666] mt-2 whitespace-nowrap">
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
          <MaskReveal delay={0.18}>
            <p className="text-[15px] leading-[1.7] text-[#888] font-serif md:text-right max-w-[44ch] md:ml-auto">
              We stripped out the agency bloat to focus on what actually matters to your business.
            </p>
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
