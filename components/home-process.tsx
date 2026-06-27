"use client";

import { useRef, useEffect } from "react";
import { useInView, useReducedMotion, motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MaskReveal from "@/components/mask-reveal";
import { EXPO } from "@/lib/easing";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "1",
    title: "Discovery",
    body: "A 30-minute call. We ask about your business, your customers, and what a good result looks like. You get a fixed quote before anything else happens.",
  },
  {
    number: "2",
    title: "Design",
    body: "We build to your brand. You see the full design before a line of code is written, and nothing moves forward until you approve it.",
  },
  {
    number: "3",
    title: "Launch",
    body: "Most projects go live within 2 to 4 weeks of kickoff. After launch, we're available for 30 days for any questions or small fixes, at no extra cost.",
  },
];

function ProcessStep({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <MaskReveal>
        <span
          className="text-[clamp(3rem,5vw,5rem)] leading-[1] text-[#ddd]"
          style={{ fontFamily: "var(--font-archivo-black)" }}
          aria-hidden="true"
        >
          {number}
        </span>
      </MaskReveal>
      <MaskReveal delay={0.1}>
        <h3
          className="text-[22px] font-bold italic text-[#0d0d0d] font-serif"
        >
          {title}
        </h3>
      </MaskReveal>
      <p className="text-[14px] leading-[1.7] text-[#666] font-serif">
        {body}
      </p>
    </div>
  );
}

export default function HomeProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(sectionRef, { once: true, margin: "-80px 0px" });

  useEffect(() => {
    if (reduced) return;
    const grid = gridRef.current;
    if (!grid) return;

    const tween = gsap.from(grid.children, {
      opacity: 0,
      y: 40,
      stagger: 0.2,
      duration: 0.8,
      ease: "expo.out",
      scrollTrigger: {
        trigger: grid,
        start: "top 80%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <section
      className="bg-[#f5f5f5] px-6 py-24"
      aria-label="Our process"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-16">
          <MaskReveal>
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#aaa]">
              How It Works
            </span>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2
              className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] mt-4"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Three steps.
              <br />
              No surprises.
            </h2>
          </MaskReveal>
        </div>

        {/* SVG connector — desktop only */}
        <div className="hidden md:block mb-12" ref={sectionRef} aria-hidden="true">
          <svg width="100%" height="2" viewBox="0 0 1 1" preserveAspectRatio="none">
            <path
              d="M0,0.5 L1,0.5"
              stroke="#ccc"
              strokeWidth="0.002"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d="M0,0.5 L1,0.5"
              stroke="#0d0d0d"
              strokeWidth="0.002"
              fill="none"
              vectorEffect="non-scaling-stroke"
              initial={reduced ? false : { pathLength: 0 }}
              animate={reduced ? {} : inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.2, ease: EXPO }}
            />
          </svg>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {steps.map(({ number, title, body }) => (
            <ProcessStep
              key={number}
              number={number}
              title={title}
              body={body}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
