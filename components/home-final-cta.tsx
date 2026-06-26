"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";
import MaskReveal from "@/components/mask-reveal";
import { EXPO } from "@/lib/easing";

export default function HomeFinalCta() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section
      className="bg-[#0a0a0a] text-[#f0f0f0] min-h-svh flex flex-col justify-center px-6 py-24"
      aria-label="Call to action"
    >
      <div className="max-w-[1280px] mx-auto w-full">
        <MaskReveal>
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#666] block mb-10">
            Available through Summer 2026
          </span>
        </MaskReveal>

        <div
          className="text-[clamp(4rem,10vw,6rem)] leading-[0.88] mb-10"
          style={{ fontFamily: "var(--font-archivo-black)" }}
        >
          <MaskReveal delay={0.1}>
            <span className="block">Let&rsquo;s build</span>
          </MaskReveal>
          <MaskReveal delay={0.22}>
            <span className="block">something</span>
          </MaskReveal>
          <MaskReveal delay={0.34}>
            <span className="block">great.</span>
          </MaskReveal>
        </div>

        {/* Price anchor — resolves cost anxiety before the ask */}
        <MaskReveal delay={0.44}>
          <p className="text-[14px] text-[#555] mb-10 max-w-[44ch] leading-[1.7]">
            Fixed-fee projects. No retainers, no surprises. A standard business site starts from £1,500 — e-commerce and bespoke builds quoted separately. First conversation is free.
          </p>
        </MaskReveal>

        <div ref={ref}>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, ease: EXPO, delay: 0.1 }}
          >
            <Link
              href="/contact"
              className="inline-block bg-[#f0f0f0] text-[#0a0a0a] px-10 py-5 text-[14px] tracking-[0.14em] uppercase font-medium transition-[background-color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white"
            >
              Start a project →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
