"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";

interface Props {
  onLightChange: (isLight: boolean) => void;
}

export default function LaptopZoom({ onLightChange }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Quadratic ease-in zoom — 1x → 9x, targeting the laptop screen centre
  const scale = useTransform(scrollYProgress, (p) =>
    prefersReducedMotion ? 1 : 1 + p * p * 8
  );

  // Scene fades out as we dive through the screen — explicit endpoints prevent extrapolation bleed
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.6, 0.85, 1], [1, 1, 0, 0]);

  // Scroll hint fades on first movement
  const hintOpacity = useTransform(scrollYProgress, [0, 0.07, 1], [1, 0, 0]);

  // Dark portal fills in — pinned at 1 from 0.88 onwards
  const veilOpacity = useTransform(scrollYProgress, [0, 0.55, 0.88, 1], [0, 0, 1, 1]);

  // Arrival headline rises in after the portal is full
  const arrivalOpacity = useTransform(scrollYProgress, [0, 0.82, 0.96, 1], [0, 0, 1, 1]);
  const arrivalY = useTransform(scrollYProgress, [0, 0.82, 0.96, 1], [36, 36, 0, 0]);

  // Nav is dark-text on the white room; light-text once inside the dark portal
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    onLightChange(p < 0.52);
  });
  useEffect(() => {
    onLightChange(scrollYProgress.get() < 0.52);
  }, [onLightChange, scrollYProgress]);

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-white isolate">

        {/* Ambient aurora — always present behind the scene */}
        <div className="aurora-gradient animate-aurora pointer-events-none absolute -inset-[10px] opacity-30 [will-change:background-position]" />

        {/* ── ZOOMING SCENE ── */}
        <motion.div
          style={{ scale, opacity: sceneOpacity }}
          className="absolute inset-0 z-[1] flex flex-col items-center justify-center [transform-origin:50%_40%]"
        >
          {/* Laptop mockup */}
          <div className="laptop">

            {/* ── LID ── */}
            <div className="laptop-lid">
              {/* Camera dot */}
              <div className="camera-dot" />

              {/* Screen bezel → white screen */}
              <div
                className="laptop-screen"
                style={{ containerType: "inline-size" }}
              >
                {/* Browser chrome */}
                <div className="browser-chrome">
                  <div className="traffic-lights">
                    <span style={{ background: "#ff5f57" }} />
                    <span style={{ background: "#febc2e" }} />
                    <span style={{ background: "#28c840" }} />
                  </div>
                  <div className="url-pill">cjstudio.design</div>
                </div>

                {/* Mini site — nav */}
                <div className="mini-nav">
                  <div className="mini-brand">
                    <Image
                      src="/cj-mark.svg"
                      alt="CJ Studio"
                      width={16}
                      height={16}
                      className="mini-mark"
                    />
                    <span>
                      CJ&nbsp;<strong>Studio</strong>
                      <span className="mini-dot">.</span>
                    </span>
                  </div>
                  <div className="mini-cta">Start a project</div>
                </div>

                {/* Mini site — hero */}
                <div className="mini-stage">
                  <p className="mini-eyebrow">WEBSITE DESIGN STUDIO</p>
                  <h1 className="mini-headline">
                    <strong>Websites built</strong><br />to stand out.
                  </h1>
                  <p className="mini-sub">
                    We design and build conversion-focused websites<br />
                    that make your brand impossible to ignore.
                  </p>
                  <div className="mini-actions">
                    <div className="mini-btn-primary">Start a project</div>
                    <div className="mini-btn-ghost">View our work →</div>
                  </div>
                </div>

                {/* Mini site — services strip */}
                <div className="mini-services">
                  {["Brand&nbsp;Design", "Web&nbsp;Development", "SEO&nbsp;&amp;&nbsp;Growth"].map((s) => (
                    <div key={s} className="mini-service-pill" dangerouslySetInnerHTML={{ __html: s }} />
                  ))}
                </div>

                {/* Glass sheen */}
                <div className="screen-glass" />
              </div>
            </div>

            {/* ── BASE ── */}
            <div className="laptop-base">
              <div className="laptop-foot" />
            </div>
          </div>

          {/* Desk surface glow */}
          <div className="desk-glow" />

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="scene-hint"
            aria-hidden="true"
          >
            <span>SCROLL TO ENTER</span>
            <span className="hint-arrow">↓</span>
          </motion.div>
        </motion.div>

        {/* ── DARK PORTAL VEIL ── */}
        <motion.div
          style={{ opacity: veilOpacity, backgroundColor: "#0c0e14" }}
          className="pointer-events-none absolute inset-0 z-[2]"
        />

        {/* ── ARRIVAL HEADLINE ── */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center z-[3]">
          <motion.div
            style={{ opacity: arrivalOpacity, y: arrivalY }}
            className="text-center px-6 max-w-4xl"
          >
            <p className="arrival-eyebrow">Why it matters</p>
            <h1 className="arrival-headline">
              Your website is the first<br />
              thing they{" "}
              <span className="arrival-grad">judge</span>.
            </h1>
            <p className="arrival-cue">
              <span>KEEP SCROLLING</span>
              <span className="cue-line" />
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
