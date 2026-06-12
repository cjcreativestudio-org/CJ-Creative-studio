"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative z-10 w-full min-h-[100dvh] flex items-center">
      <motion.div
        style={reduce ? {} : { y: textY, opacity }}
        className="relative max-w-3xl mx-auto px-6 w-full pt-24 pb-16 flex flex-col items-center text-center"
      >
        {/* Eyebrow */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[11px] uppercase tracking-[0.22em] text-gray-400 mb-8 font-medium"
        >
          UK Web Design Studio
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-[clamp(3.2rem,9vw,7rem)] font-bold tracking-[-0.03em] leading-[0.95] text-gray-900 mb-8"
        >
          Websites<br />built to<br />
          <span className="prism-text">stand out.</span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg text-gray-500 leading-relaxed max-w-[38ch] mb-10"
        >
          Fast, modern websites for UK businesses. Flat fee, no agency markup.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.48 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gray-900 text-white text-[14px] font-medium hover:bg-gray-700 transition-all duration-200 hover:gap-3"
          >
            Start a project
            <ArrowRight size={15} weight="bold" />
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-gray-200 text-gray-700 text-[14px] font-medium hover:border-gray-400 transition-colors duration-200 bg-white/50 backdrop-blur-sm"
          >
            See our work
          </Link>
        </motion.div>

        {/* Location tag */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="absolute bottom-8 left-6 hidden md:flex items-center gap-2 text-[12px] text-gray-300 tracking-widest uppercase"
        >
          <span className="w-8 h-px bg-gray-200" />
          Based in the UK
        </motion.div>
      </motion.div>
    </section>
  );
}
