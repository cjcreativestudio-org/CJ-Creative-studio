"use client";

import Link from "next/link";
import GlowHeadline from "@/components/glow-headline";
import MaskReveal from "@/components/mask-reveal";
import { motion, useReducedMotion } from "motion/react";
import { EXPO } from "@/lib/easing";

export default function HomeHero() {
  const reduced = useReducedMotion();

  return (
    <section
      className="bg-[#0a0a0a] text-[#f0f0f0] min-h-svh flex flex-col justify-center px-6 pt-20 pb-16"
      aria-label="Homepage hero"
    >
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Kicker */}
        <div className="flex items-center justify-between mb-12">
          <MaskReveal delay={0.1}>
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#666]">
              Web Design Studio
            </span>
          </MaskReveal>
          <MaskReveal delay={0.15}>
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#666]">
              CJ Creative Studio
            </span>
          </MaskReveal>
        </div>

        {/* Display heading */}
        <div
          className="text-[clamp(3.2rem,8.5vw,6rem)] leading-[0.9] mb-12"
          style={{ fontFamily: "var(--font-archivo-black)" }}
        >
          <GlowHeadline
            text="Your website should"
            as="h1"
            delay={0.2}
            charDelay={0.018}
            className="block"
          />
          <GlowHeadline
            text="win you customers."
            as="h1"
            delay={0.55}
            charDelay={0.018}
            className="block"
          />
          <GlowHeadline
            text="Not lose them."
            as="h1"
            delay={0.85}
            charDelay={0.018}
            className="block"
          />
        </div>

        {/* Body + CTA */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.p
            className="max-w-[360px] text-[15px] leading-[1.7] text-[#888] font-serif"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EXPO, delay: 1.3 }}
          >
            Fixed-price projects from £1,500, delivered in weeks, built from scratch for your business.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EXPO, delay: 1.5 }}
          >
            <Link
              href="/contact"
              className="inline-block bg-[#f0f0f0] text-[#0a0a0a] px-8 py-4 text-[13px] tracking-[0.12em] uppercase font-medium transition-[background-color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white"
            >
              Start a project →
            </Link>
            <Link
              href="#selected-work"
              className="inline-block border border-[#f0f0f0]/40 px-8 py-4 text-[13px] tracking-[0.12em] uppercase text-[#f0f0f0]/70 transition-[background-color,color,border-color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#f0f0f0] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#f0f0f0]"
            >
              View our work →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
