"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView, useReducedMotion, motion } from "motion/react";
import MaskReveal from "@/components/mask-reveal";
import { EXPO } from "@/lib/easing";

const projects = [
  {
    slug: "la-roofing",
    img: "/assets/work/la-roofing.png",
    name: "LA Roofing",
    category: "Local Trades",
    outcome: "Went from word-of-mouth only to a site that closes leads. Quote calculator, 4.9-star reviews, page one locally.",
  },
  {
    slug: "taste-of-portugal",
    img: "/assets/work/taste-of-portugal.png",
    name: "Taste of Portugal",
    category: "Hospitality / Restaurant",
    outcome: "One site, two identities: morning pastelaria, evening restaurant.",
    pullQuote: "Bookings doubled in the first month.",
  },
  {
    slug: "range-shipping",
    img: "/assets/work/range-shipping.png",
    name: "Range Shipping",
    category: "Logistics / Maritime",
    outcome: "A 47-year operator with no web presence. Now landing enterprise enquiries online.",
  },
];

function ProjectCard({
  slug,
  img,
  name,
  category,
  outcome,
  pullQuote,
  fromLeft,
}: {
  slug: string;
  img: string;
  name: string;
  category: string;
  outcome: string;
  pullQuote?: string;
  fromLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, x: fromLeft ? -80 : 80 }}
      animate={reduced ? {} : inView ? { opacity: 1, x: 0 } : { opacity: 0, x: fromLeft ? -80 : 80 }}
      transition={{ duration: 0.8, ease: EXPO }}
    >
      <Link
        href="/work"
        className="group block"
        aria-label={`View ${name} project`}
      >
        {/* Device frame */}
        <div className="border border-[#e0e0e0] rounded-sm overflow-hidden transition-[box-shadow,transform] duration-300 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:shadow-xl [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-1">
          {/* Browser chrome */}
          <div className="bg-[#f0f0f0] border-b border-[#e0e0e0] px-3 py-2 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          {/* Screenshot */}
          <div className="relative w-full overflow-hidden" style={{ height: "220px" }}>
            <Image
              src={img}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-top transition-[transform,filter] duration-500 ease-out brightness-[0.92] saturate-[0.85] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.02] [@media(hover:hover)_and_(pointer:fine)]:group-hover:brightness-100 [@media(hover:hover)_and_(pointer:fine)]:group-hover:saturate-100"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[#0A2540] opacity-0 transition-opacity duration-300 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-30 flex items-center justify-center">
              <span className="text-white text-[13px] tracking-[0.12em] uppercase opacity-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 transition-opacity duration-300">
                See all work &rarr;
              </span>
            </div>
          </div>
        </div>
        {/* Meta */}
        <div className="pt-5 flex flex-col gap-1.5">
          <span className="text-[10px] tracking-[0.22em] text-[#555]">
            {category}
          </span>
          <h3
            className="text-[20px] font-bold italic text-[#0d0d0d] font-serif"
          >
            {name}
          </h3>
          <p className="text-[14px] leading-relaxed text-[#666]">{outcome}</p>
          {pullQuote && (
            <p className="text-[13px] italic font-serif text-[#0d0d0d] mt-1">&ldquo;{pullQuote}&rdquo;</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function HomeWork() {
  return (
    <section
      id="selected-work"
      className="relative bg-[#f5f5f5] px-6 pb-24 pt-0"
      aria-label="Selected work"
    >
      <div className="relative z-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col items-center gap-4 mb-32 text-center mx-auto">
            <MaskReveal>
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#aaa] whitespace-nowrap">
                Selected Work
              </span>
            </MaskReveal>
            <MaskReveal delay={0.1}>
              <h2
                className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d]"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                Digital systems engineered
                <br />
                for scale and performance.
              </h2>
            </MaskReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {projects.map(({ slug, img, name, category, outcome, pullQuote }, i) => (
              <ProjectCard
                key={slug}
                slug={slug}
                img={img}
                name={name}
                category={category}
                outcome={outcome}
                pullQuote={pullQuote}
                fromLeft={i % 2 === 0}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-[13px] text-[#888]">{projects.length} completed projects across trades, hospitality, and logistics.</p>
            <Link
              href="/work"
              className="inline-block border border-[#0d0d0d] px-8 py-4 text-[13px] tracking-[0.12em] uppercase text-[#0d0d0d] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d0d0d] [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
            >
              View all work &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

