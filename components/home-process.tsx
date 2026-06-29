"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, useReducedMotion, MotionValue } from "motion/react";
import MaskReveal from "@/components/mask-reveal";

const steps = [
  {
    number: "01",
    title: "The Kickoff Call",
    body: "A quick introduction to answer your questions, understand your business goals, and gather the details we need to start building your initial demo site.",
  },
  {
    number: "02",
    title: "The Demo Walkthrough",
    body: "We jump on a video call to show you a working, structural demo of your new site. We review the layout together and gather your feedback for the official draft.",
  },
  {
    number: "03",
    title: "Refinement & Strategy",
    body: "We implement your changes, add any specific features you need, and map out the logistics like hosting. We don't move to the final stage until the design is exactly what you want.",
  },
  {
    number: "04",
    title: "Final Polish",
    body: "By this stage, the site is practically finished. We do a comprehensive walkthrough of every page with you to catch any last-minute tweaks before we prepare for deployment.",
  },
  {
    number: "05",
    title: "Launch & Handover",
    body: "We launch the site and sign the final paperwork. This ensures that you have 100% legal ownership of the website and all of its assets. A perfectly smooth transaction.",
  },
];

function StepCard({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div
      className="w-[85vw] md:w-[40vw] flex-shrink-0 flex flex-col gap-6 bg-[#161616] border border-[#2a2a2a] p-10 md:p-14 h-full"
    >
      <span
        className="text-[clamp(3rem,5vw,5rem)] leading-[1] text-[#0A2540]"
        style={{ fontFamily: "var(--font-archivo-black)" }}
        aria-hidden="true"
      >
        {number}
      </span>
      <div className="flex flex-col gap-4 flex-1">
        <h3
          className="text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.1] text-[#f0f0f0]"
          style={{ fontFamily: "var(--font-archivo-black)" }}
        >
          {title}
        </h3>
        <p className="text-[15px] leading-[1.7] text-[#888] font-serif">
          {body}
        </p>
      </div>
    </div>
  );
}

function Dot({
  scrollYProgress,
  start,
  end,
}: {
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [1, 1.3]);
  return (
    <motion.span
      style={{ opacity, scale }}
      className="block w-2 h-2 rounded-full bg-[#0A2540]"
    />
  );
}

function ProgressDots({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <div className="flex items-center gap-3 mt-10" aria-hidden="true">
      {steps.map((step, i) => (
        <Dot
          key={step.number}
          scrollYProgress={scrollYProgress}
          start={i / steps.length}
          end={(i + 1) / steps.length}
        />
      ))}
    </div>
  );
}

export default function HomeProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const xAnimated = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", "-160vw"]
  );

  return (
    <>
      {/* ── MOBILE layout (vertical stack) ── */}
      <section
        className="md:hidden bg-[#0a0a0a] px-6 py-24"
        aria-hidden="true"
      >
        <div className="mb-12">
          <MaskReveal>
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#555]">
              Project Timeline
            </span>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2
              className="text-[clamp(2.4rem,8vw,4rem)] leading-[0.95] text-[#f0f0f0] mt-4"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              A transparent, step-by-step process
              <br />
              with zero guesswork.
            </h2>
          </MaskReveal>
        </div>
        <div className="flex flex-col gap-6">
          {steps.map(({ number, title, body }) => (
            <StepCard key={number} number={number} title={title} body={body} />
          ))}
        </div>
      </section>

      {/* ── DESKTOP layout (scroll-jacked horizontal) ── */}
      <section
        ref={sectionRef}
        aria-label="Project timeline"
        className={`hidden md:block bg-[#0a0a0a] ${reduced ? "relative" : "relative h-[500vh]"}`}
      >
        <div
          className={
            reduced
              ? "px-6 py-24 flex flex-col"
              : "sticky top-0 h-screen overflow-hidden flex flex-col justify-center px-[clamp(24px,6vw,100px)] py-16"
          }
        >
          {/* Section header */}
          <div className="mb-12">
            <MaskReveal>
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#555]">
                Project Timeline
              </span>
            </MaskReveal>
            <MaskReveal delay={0.1}>
              <h2
                className="text-[clamp(2.8rem,5vw,5rem)] leading-[0.95] text-[#f0f0f0] mt-3"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                A transparent, step-by-step process with zero guesswork.
              </h2>
            </MaskReveal>
          </div>

          {/* Horizontal card track */}
          <div className="overflow-hidden">
            <motion.div
              style={{ x: reduced ? "0vw" : xAnimated }}
              className={reduced ? "flex flex-col gap-6" : "flex gap-6 w-max"}
            >
              {steps.map(({ number, title, body }) => (
                <StepCard key={number} number={number} title={title} body={body} />
              ))}
            </motion.div>
          </div>

          {/* Progress dots */}
          {!reduced && <ProgressDots scrollYProgress={scrollYProgress} />}
        </div>
      </section>
    </>
  );
}
