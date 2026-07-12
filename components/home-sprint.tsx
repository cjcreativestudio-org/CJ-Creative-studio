"use client";

import { useRef } from "react";
import Link from "next/link";
import { useInView, useReducedMotion, motion } from "motion/react";
import MaskReveal from "@/components/mask-reveal";
import { EXPO } from "@/lib/easing";

const inclusions = [
  "Up to five pages",
  "Mobile-first build",
  "Basic SEO",
  "Contact form",
  "Hosting setup",
  "One revision round",
];

export default function HomeSprint() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section
      className="bg-[#0A2540] text-white px-6 py-24"
      aria-label="The 48-hour sprint offer"
    >
      <div ref={ref} className="max-w-[1280px] mx-auto">
        {/* Kicker row */}
        <div className="flex items-center justify-between mb-10">
          <MaskReveal>
            <span className="text-[12px] tracking-[0.18em] uppercase text-white/50">
              The 48-Hour Sprint
            </span>
          </MaskReveal>
          <MaskReveal delay={0.08}>
            <span className="hidden sm:block text-[12px] tracking-[0.18em] uppercase text-white/50">
              &pound;1,995 Fixed
            </span>
          </MaskReveal>
        </div>

        {/* Display heading */}
        <MaskReveal delay={0.1}>
          <h2
            className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-white"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Your business website.
          </h2>
        </MaskReveal>
        <MaskReveal delay={0.2}>
          <h2
            className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-white"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Live in 48 hours.
          </h2>
        </MaskReveal>

        <motion.p
          className="mt-8 max-w-[520px] text-[15px] leading-[1.75] text-white/65"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={reduced ? {} : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, ease: EXPO, delay: 0.35 }}
        >
          &pound;1,995, fixed. No drawn-out agency process, no months of meetings.
          Built for UK trades and local businesses &mdash; send us your details and
          you&rsquo;re reviewing your finished site two days later.
        </motion.p>

        {/* Inclusions */}
        <motion.ul
          className="mt-8 flex flex-wrap gap-x-8 gap-y-3"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={reduced ? {} : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, ease: EXPO, delay: 0.45 }}
        >
          {inclusions.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-[13px] tracking-[0.06em] text-white/70"
            >
              <span className="w-1.5 h-1.5 bg-[#5b9fd6] shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </motion.ul>

        {/* CTAs */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row gap-3"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={reduced ? {} : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, ease: EXPO, delay: 0.55 }}
        >
          <Link
            href="/sprint"
            className="inline-block bg-white text-[#0A2540] px-8 py-4 text-[13px] tracking-[0.12em] uppercase font-medium text-center transition-[background-color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#e8ecf2]"
          >
            See what&rsquo;s included &rarr;
          </Link>
          <Link
            href="/contact"
            className="inline-block border border-white/60 px-8 py-4 text-[13px] tracking-[0.12em] uppercase text-white text-center transition-[background-color,color,border-color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0A2540]"
          >
            Claim your slot &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
