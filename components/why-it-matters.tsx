"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "motion/react";

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

            <p
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontSize: "clamp(15px, 1.5vw, 18px)",
                lineHeight: 1.7,
                color: "rgba(12,14,20,0.55)",
                maxWidth: "44ch",
                margin: "clamp(20px,3vw,32px) 0 0",
              }}
            >
              Before you speak a single word, your site has already made an
              introduction. Visitors form an opinion in as little as 0.05 seconds
              — and that impression shapes everything that follows.
            </p>
          </div>

          {/* Slide 2 — digital first impression */}
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
                maxWidth: "22ch",
                color: "#0c0e14",
                margin: 0,
              }}
            >
              It&apos;s your digital{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #8a6cff, #4d7cff 52%, #27d7c4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                first impression.
              </span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontSize: "clamp(15px, 1.5vw, 18px)",
                lineHeight: 1.7,
                color: "rgba(12,14,20,0.55)",
                maxWidth: "44ch",
                margin: "clamp(20px,3vw,32px) 0 0",
              }}
            >
              A poor first impression is nearly impossible to recover from. Your
              website isn&apos;t just a digital brochure — it&apos;s your most
              powerful sales tool, working around the clock.
            </p>
          </div>

          {/* Slide 3 — research stats */}
          <div className={prefersReducedMotion
            ? "w-full py-20 flex flex-col justify-center px-[clamp(24px,8vw,120px)]"
            : "w-screen h-screen flex flex-col justify-center px-[clamp(24px,8vw,120px)]"
          }>
            <span
              className="mb-10 uppercase"
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.30em",
                color: "rgba(12,14,20,0.38)",
              }}
            >
              The research
            </span>

            <div className="grid grid-cols-2 gap-x-[clamp(32px,6vw,80px)] gap-y-[clamp(28px,4vw,48px)] max-w-[680px]">
              {[
                { stat: "75%",   label: "of users judge brand credibility by website design alone" },
                { stat: "0.05s", label: "is all it takes for visitors to form a lasting first impression" },
                { stat: "38%",   label: "of users abandon a site if the layout is unattractive" },
                { stat: "200%",  label: "potential uplift in conversions from professional web design" },
              ].map(({ stat, label }) => (
                <div key={stat}>
                  <div
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                      background: "linear-gradient(90deg, #8a6cff, #4d7cff 52%, #27d7c4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontSize: "clamp(13px, 1.2vw, 15px)",
                      lineHeight: 1.5,
                      color: "rgba(12,14,20,0.55)",
                      marginTop: 8,
                      maxWidth: "22ch",
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
