"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, useReducedMotion, type MotionValue } from "motion/react";

const slides = [
  {
    eyebrow: "Why it matters",
    headline: (
      <>
        Your website is the first thing they{" "}
        <span
          style={{
            background: "linear-gradient(90deg, #8a6cff, #4d7cff 52%, #27d7c4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          judge.
        </span>
      </>
    ),
    body: "Before you speak a single word, your site has already made an introduction. Visitors form an opinion in as little as 0.05 seconds — and that impression shapes everything that follows.",
  },
  {
    eyebrow: "Why it matters",
    headline: (
      <>
        It&apos;s your digital{" "}
        <span
          style={{
            background: "linear-gradient(90deg, #8a6cff, #4d7cff 52%, #27d7c4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          first impression.
        </span>
      </>
    ),
    body: "A poor first impression is nearly impossible to recover from. Your website isn't just a digital brochure — it's your most powerful sales tool, working around the clock.",
  },
];

const stats = [
  { stat: "75%",   label: "of users judge brand credibility by website design alone" },
  { stat: "0.05s", label: "is all it takes for visitors to form a lasting first impression" },
  { stat: "38%",   label: "of users abandon a site if the layout is unattractive" },
  { stat: "200%",  label: "potential uplift in conversions from professional web design" },
];

const headingStyle: React.CSSProperties = {
  fontFamily: "var(--font-space-grotesk), sans-serif",
  fontWeight: 700,
  fontSize: "clamp(2.5rem, 6vw, 5rem)",
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
  maxWidth: "22ch",
  color: "#0c0e14",
  margin: 0,
};

const eyebrowStyle: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains-mono), monospace",
  fontSize: 11,
  letterSpacing: "0.30em",
  color: "rgba(12,14,20,0.38)",
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-space-grotesk), sans-serif",
  fontSize: "clamp(15px, 1.5vw, 18px)",
  lineHeight: 1.7,
  color: "rgba(12,14,20,0.55)",
  maxWidth: "44ch",
  margin: "clamp(20px,3vw,32px) 0 0",
};

interface SlidePanelProps {
  slide: (typeof slides)[number];
  scrollYProgress: MotionValue<number>;
  index: number;
  reduced: boolean | null;
}

function SlidePanel({ slide, scrollYProgress, index, reduced }: SlidePanelProps) {
  const panelStart = index * 0.33;
  const panelMid = panelStart + 0.25;
  const headlineScale = useTransform(
    scrollYProgress,
    [panelStart, panelMid],
    reduced ? [1, 1] : [0.94, 1]
  );
  const headlineY = useTransform(
    scrollYProgress,
    [panelStart, panelMid],
    reduced ? [0, 0] : [24, 0]
  );
  const eyebrowX = useTransform(
    scrollYProgress,
    [panelStart, panelMid],
    reduced ? [0, 0] : [-16, 0]
  );

  return (
    <div
      className={reduced
        ? "w-full py-20 flex flex-col justify-center px-[clamp(24px,8vw,120px)]"
        : "w-screen h-screen flex flex-col justify-center px-[clamp(24px,8vw,120px)]"
      }
    >
      <motion.span
        className="mb-8 uppercase"
        style={{ ...eyebrowStyle, x: eyebrowX }}
      >
        {slide.eyebrow}
      </motion.span>
      <motion.h2
        style={{ ...headingStyle, scale: headlineScale, y: headlineY, originX: 0 }}
      >
        {slide.headline}
      </motion.h2>
      <p style={bodyStyle}>{slide.body}</p>
    </div>
  );
}

export default function WhyItMatters() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const xAnimated = useTransform(scrollYProgress, [0, 1], ["0vw", "-200vw"]);

  return (
    <>
      {/* ── MOBILE layout (vertical stack, always) ── */}
      <section className="md:hidden flex flex-col gap-20 py-20 px-6" aria-label="Why your website matters">
        {slides.map((slide, i) => (
          <div key={i} className="flex flex-col gap-6">
            <span className="uppercase" style={eyebrowStyle}>{slide.eyebrow}</span>
            <h2 style={{ ...headingStyle, fontSize: "clamp(2rem,8vw,3rem)" }}>{slide.headline}</h2>
            <p style={{ ...bodyStyle, fontSize: "clamp(15px,4vw,17px)", maxWidth: "none" }}>{slide.body}</p>
          </div>
        ))}
        {/* Stats */}
        <div>
          <span className="uppercase mb-8 block" style={eyebrowStyle}>The research</span>
          <div className="grid grid-cols-2 gap-x-8 gap-y-8" role="list">
            {stats.map(({ stat, label }) => (
              <div key={stat} role="listitem">
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(1.8rem,8vw,2.5rem)",
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
                <p style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: 13, lineHeight: 1.5, color: "rgba(12,14,20,0.55)", marginTop: 6 }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESKTOP layout (scroll-driven horizontal) ── */}
      <section
        ref={sectionRef}
        aria-label="Why your website matters"
        className={`hidden md:block ${prefersReducedMotion ? "relative" : "relative h-[300vh]"}`}
      >
        <div
          className={
            prefersReducedMotion
              ? "flex flex-col"
              : "sticky top-0 h-screen overflow-hidden max-w-[100vw] flex items-center"
          }
        >
          <motion.div
            style={{ x: prefersReducedMotion ? "0vw" : xAnimated }}
            className={prefersReducedMotion ? "flex flex-col w-full" : "flex w-[300vw] max-w-none"}
          >
            {/* Slides 1 & 2 */}
            {slides.map((slide, i) => (
              <SlidePanel
                key={i}
                slide={slide}
                scrollYProgress={scrollYProgress}
                index={i}
                reduced={prefersReducedMotion}
              />
            ))}

            {/* Slide 3 — stats */}
            <div
              className={prefersReducedMotion
                ? "w-full py-20 flex flex-col justify-center px-[clamp(24px,8vw,120px)]"
                : "w-screen h-screen flex flex-col justify-center px-[clamp(24px,8vw,120px)]"
              }
            >
              <span className="mb-10 uppercase" style={eyebrowStyle}>The research</span>
              <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-x-[clamp(32px,6vw,80px)] gap-y-[clamp(28px,4vw,48px)] max-w-[680px]" role="list">
                {stats.map(({ stat, label }) => (
                  <div key={stat} role="listitem">
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
    </>
  );
}
