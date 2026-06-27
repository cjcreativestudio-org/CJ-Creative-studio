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

        {/* Display heading + grouped body/CTA */}
        <div className="max-w-[56rem]">
          <div
            className="text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.08] tracking-[0.01em] mb-10"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            <GlowHeadline
              text="Digital platforms"
              as="h1"
              delay={0.2}
              charDelay={0.018}
              className="block"
            />
            <GlowHeadline
              text="engineered for"
              as="h1"
              delay={0.52}
              charDelay={0.018}
              className="block"
            />
            <GlowHeadline
              text="precision."
              as="h1"
              delay={0.82}
              charDelay={0.018}
              className="block"
            />
          </div>

          <div className="flex flex-col gap-6">
            <motion.p
              className="max-w-[480px] text-[15px] leading-[1.75] text-[#7a7a8a] font-serif"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EXPO, delay: 1.3 }}
            >
              We build comprehensive web systems and digital identities for teams who value clarity, performance, and craft.
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
      </div>
    </section>
  );
}
