"use client";

import { useRef } from "react";
import { useInView, useReducedMotion, motion } from "motion/react";
import MaskReveal from "@/components/mask-reveal";
import { EXPO } from "@/lib/easing";

const testimonials = [
  {
    quote:
      "We went from embarrassed to send people to our site, to it being the first thing we mention in pitches.",
    name: "James L.",
    business: "Range Shipping",
  },
  {
    quote:
      "Done in two weeks, exactly what we asked for, and the phone hasn't stopped since.",
    name: "Lee A.",
    business: "LA Roofing",
  },
];

function TestimonialItem({
  quote,
  name,
  business,
  delay,
}: {
  quote: string;
  name: string;
  business: string;
  delay: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  const words = quote.split(" ");
  const chunkSize = 6;
  const lines: string[] = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    lines.push(words.slice(i, i + chunkSize).join(" "));
  }

  return (
    <blockquote
      ref={ref as unknown as React.RefObject<HTMLQuoteElement>}
      className="border-t border-[#333] pt-10 pb-14"
    >
      <p
        className="text-[clamp(1.6rem,3.2vw,3rem)] leading-[1.25] italic font-serif text-[#f0f0f0] mb-8"
        aria-label={quote}
      >
        {reduced
          ? `"${quote}"`
          : lines.map((line, i) => (
              <MaskReveal key={i} delay={delay + i * 0.1}>
                <span className="block">
                  {i === 0 ? `"${line}` : line}
                  {i === lines.length - 1 ? '"' : ""}
                </span>
              </MaskReveal>
            ))}
      </p>
      <motion.footer
        className="flex flex-col gap-0.5"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={reduced ? {} : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.6, ease: EXPO, delay: delay + lines.length * 0.1 + 0.1 }}
      >
        <cite className="not-italic text-[13px] tracking-[0.1em] text-[#f0f0f0]">
          {name}
        </cite>
        <span className="text-[12px] tracking-[0.1em] text-[#666]">
          {business}
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
        <MaskReveal>
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#666] block mb-4">
            What Clients Say
          </span>
        </MaskReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-16">
          {testimonials.map(({ quote, name, business }, i) => (
            <TestimonialItem
              key={name}
              quote={quote}
              name={name}
              business={business}
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
