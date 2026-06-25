"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import MaskReveal from "@/components/mask-reveal";
import { EXPO } from "@/lib/easing";

export default function HomeFinalCta() {
  const reduced = useReducedMotion();

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
          className="text-[clamp(4rem,10vw,11rem)] leading-[0.88] mb-14"
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

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EXPO, delay: 0.7 }}
        >
          <Link
            href="/contact"
            className="inline-block border border-[#f0f0f0] px-10 py-5 text-[14px] tracking-[0.14em] uppercase text-[#f0f0f0] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#f0f0f0] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0a0a0a]"
          >
            Start a project →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
