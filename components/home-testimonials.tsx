"use client";

import { useRef } from "react";
import { useInView, useReducedMotion, motion } from "motion/react";
import MaskReveal from "@/components/mask-reveal";
import { EXPO } from "@/lib/easing";

const testimonials = [
  {
    lines: [
      "We went from embarrassed",
      "to send people to our site,",
      "to it being the first thing",
      "we mention in pitches.",
    ],
    quote: "We went from embarrassed to send people to our site, to it being the first thing we mention in pitches.",
    name: "James L.",
    business: "Range Shipping",
    location: "UK",
  },
  {
    lines: [
      "Done in two weeks,",
      "exactly what we asked for,",
      "and the phone hasn't stopped since.",
    ],
    quote: "Done in two weeks, exactly what we asked for, and the phone hasn't stopped since.",
    name: "Lee A.",
    business: "LA Roofing",
    location: "Exeter",
  },
];

function StarRating() {
  return (
    <div className="flex gap-1 mb-6" aria-label="5 star rating">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#f5c518" aria-hidden="true">
          <path d="M7 1l1.545 3.09L12 4.635l-2.5 2.41.59 3.41L7 8.91l-3.09 1.545.59-3.41L2 4.635l3.455-.545z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialItem({
  lines,
  quote,
  name,
  business,
  location,
  delay,
}: {
  lines: string[];
  quote: string;
  name: string;
  business: string;
  location: string;
  delay: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <blockquote
      ref={ref as unknown as React.RefObject<HTMLQuoteElement>}
      className="border-t border-[#222] pt-10 pb-14 flex flex-col"
    >
      <StarRating />
      <p
        className="text-[clamp(1.4rem,2.6vw,2.4rem)] leading-[1.3] italic font-serif text-[#f0f0f0] mb-8"
        aria-label={quote}
      >
        {reduced
          ? `“${quote}”`
          : lines.map((line, i) => (
              <MaskReveal key={i} delay={delay + i * 0.1}>
                <span className="block">
                  {i === 0 ? `“${line}` : line}
                  {i === lines.length - 1 ? "”" : ""}
                </span>
              </MaskReveal>
            ))}
      </p>
      <motion.footer
        className="mt-auto flex flex-col gap-1"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={reduced ? {} : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.6, ease: EXPO, delay: delay + lines.length * 0.1 + 0.1 }}
      >
        <cite className="not-italic text-[13px] tracking-[0.08em] text-[#f0f0f0] font-medium">
          {name} &mdash; {business}
        </cite>
        <span className="text-[11px] tracking-[0.12em] uppercase text-[#555]">
          {location} &middot; Verified client
        </span>
      </motion.footer>
    </blockquote>
  );
}

export default function HomeTestimonials() {
  return (
    <section
      className="bg-[#0a0a0a] px-6 py-24"
      aria-label="Client testimonials"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-16">
          {testimonials.map(({ lines, quote, name, business, location }, i) => (
            <TestimonialItem
              key={name}
              lines={lines}
              quote={quote}
              name={name}
              business={business}
              location={location}
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
