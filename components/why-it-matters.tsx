"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "motion/react";

const facts = [
  "75% of users judge a brand's credibility by its website design",
  "First impressions form in as little as 0.05 seconds",
  "38% of users stop engaging with a site if the layout is unattractive",
  "A well-designed site can increase conversion rates by up to 200%",
];

export default function WhyItMatters() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const prefersReducedMotion = useReducedMotion();

  // Map 0→1 scroll progress → "0vw" to "-200vw" (3 slides × 100vw)
  const xAnimated = useTransform(scrollYProgress, [0, 1], ["0vw", "-200vw"]);
  const x = prefersReducedMotion ? "0vw" : xAnimated;

  return (
    <section
      ref={sectionRef}
      className={prefersReducedMotion ? "relative" : "relative h-[300vh]"}
    >
      <div
        className={
          prefersReducedMotion
            ? "flex flex-col"
            : "sticky top-0 h-screen overflow-hidden flex items-center"
        }
      >
        <motion.div style={{ x }} className={prefersReducedMotion ? "flex flex-col w-full" : "flex w-[300vw]"}>

          {/* Slide 1 — headline */}
          <div className={prefersReducedMotion
            ? "w-full py-20 flex flex-col justify-center px-[clamp(24px,8vw,120px)]"
            : "w-screen h-screen flex flex-col justify-center px-[clamp(24px,8vw,120px)]"
          }>
            <span
              className="mb-8 uppercase"
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.30em",
                color: "rgba(12,14,20,0.38)",
              }}
            >
              Why it matters
            </span>

            <h2
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                maxWidth: "20ch",
                color: "#0c0e14",
                margin: 0,
              }}
            >
              Your website is the first thing they{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #8a6cff, #4d7cff 52%, #27d7c4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                judge.
              </span>
            </h2>

            <div className="mt-10 flex flex-col items-start gap-2">
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.20em",
                  textTransform: "uppercase",
                  color: "rgba(12,14,20,0.32)",
                }}
              >
                Keep scrolling ↓
              </span>
              <div className="w-px h-10 bg-gray-200" />
            </div>
          </div>

          {/* Slide 2 — facts */}
          <div className={prefersReducedMotion
            ? "w-full py-20 flex flex-col justify-center px-[clamp(24px,8vw,120px)]"
            : "w-screen h-screen flex flex-col justify-center px-[clamp(24px,8vw,120px)]"
          }>
            <span
              className="mb-8 uppercase"
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.30em",
                color: "rgba(12,14,20,0.38)",
              }}
            >
              Why it matters
            </span>

            <h3
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                letterSpacing: "-0.02em",
                color: "#0c0e14",
                margin: "0 0 clamp(20px,3vw,40px)",
              }}
            >
              The numbers don&apos;t lie
            </h3>

            <ul className="space-y-5 max-w-[52ch] list-none p-0 m-0">
              {facts.map((fact) => (
                <li key={fact} className="flex gap-4 items-start">
                  <span
                    className="mt-[6px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #8a6cff, #27d7c4)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "clamp(15px, 1.4vw, 18px)",
                      lineHeight: 1.6,
                      color: "rgba(12,14,20,0.62)",
                    }}
                  >
                    {fact}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Slide 3 — transition buffer */}
          <div className={prefersReducedMotion
            ? "hidden"
            : "w-screen h-screen flex flex-col justify-center items-center gap-4"
          }>
            <div
              className="w-px h-16"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(138,108,255,0.4), transparent)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color: "rgba(12,14,20,0.32)",
              }}
            >
              See our work ↓
            </span>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
