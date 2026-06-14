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

  // Quadratic ease-in zoom — 1x → 9x, targeting the screen centre of the centred MacBook
  const scale = useTransform(scrollYProgress, (p) =>
    prefersReducedMotion ? 1 : 1 + p * p * 8
  );

  // Scene fades out as we dive through the screen
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.6, 0.85, 1], [1, 1, 0, 0]);

  // Scroll hint fades on first movement
  const hintOpacity = useTransform(scrollYProgress, [0, 0.07, 1], [1, 0, 0]);

  // Dark portal fills in
  const veilOpacity = useTransform(scrollYProgress, [0, 0.55, 0.88, 1], [0, 0, 1, 1]);

  // Arrival headline rises in after portal is full
  const arrivalOpacity = useTransform(scrollYProgress, [0, 0.82, 0.96, 1], [0, 0, 1, 1]);
  const arrivalY = useTransform(scrollYProgress, [0, 0.82, 0.96, 1], [36, 36, 0, 0]);

  // Hero tagline fades out before the zoom takes over
  const heroTaglineOpacity = useTransform(scrollYProgress, [0, 0.09], [1, 0]);

  // MacBook screen content — visible from load, resolves to full on scroll
  const laptopLogoScale = useTransform(scrollYProgress, [0, 0.32], [0.90, 1]);
  const laptopLogoOpacity = useTransform(scrollYProgress, [0, 0.28], [0.88, 1]);
  const laptopTaglineOpacity = useTransform(scrollYProgress, [0, 0.18, 0.38], [0.72, 0.72, 1]);
  const laptopTaglineY = useTransform(scrollYProgress, [0, 0.18, 0.38], [4, 4, 0]);

  // Nav switches to light text once inside the dark portal
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    onLightChange(p < 0.52);
  });
  useEffect(() => {
    onLightChange(scrollYProgress.get() < 0.52);
  }, [onLightChange, scrollYProgress]);

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      {/* bg-white removed — body::before aurora shows through the transparent sticky */}
      <div className="sticky top-0 h-screen overflow-hidden isolate">

        {/* ── ZOOMING SCENE ── */}
        {/* transform-origin 50% 46% targets the MacBook screen centre when device is vertically centred */}
        <motion.div
          style={{ scale, opacity: sceneOpacity }}
          className="absolute inset-0 z-[1] flex items-center justify-center [transform-origin:50%_46%]"
        >
          {/* ── MacBook device ── */}
          <div className="macbook">

            {/* Lid (screen) */}
            <div className="macbook-lid">
              <div className="macbook-screen" style={{ containerType: "inline-size" }}>

                {/* Dark browser chrome */}
                <div className="mb-chrome">
                  <div className="mb-traffic">
                    <span /><span /><span />
                  </div>
                  <div className="mb-url">cjcreativestudio.com</div>
                </div>

                {/* Website mockup */}
                <div className="mb-site">
                  {/* Mock site nav */}
                  <div className="mb-site-nav">
                    <Image
                      src="/assets/cj-logo-horizontal.png"
                      alt="CJ Creative Studio"
                      width={200}
                      height={50}
                      className="mb-site-logo"
                      priority
                    />
                    <div className="mb-site-links">
                      <span>Work</span>
                      <span>Services</span>
                      <span>Contact</span>
                    </div>
                  </div>

                  {/* Mock hero */}
                  <motion.div
                    style={{ scale: laptopLogoScale, opacity: laptopLogoOpacity }}
                    className="mb-site-hero"
                  >
                    <div className="mb-site-eyebrow">UK Web Design Studio</div>
                    <div className="mb-site-headline">
                      Websites that<br />
                      <span className="mb-site-headline-grad">win clients.</span>
                    </div>
                    <motion.div
                      style={{ opacity: laptopTaglineOpacity, y: laptopTaglineY }}
                    >
                      <p className="mb-site-desc">
                        We design and build premium websites for<br />
                        ambitious UK brands.
                      </p>
                      <div className="mb-site-cta">Book a discovery call →</div>
                    </motion.div>
                  </motion.div>

                  <div className="mb-reflection" />
                </div>

              </div>
            </div>

            {/* Hinge + keyboard deck */}
            <div className="macbook-hinge" />
            <div className="macbook-body" />

            {/* Cylindrical platform pedestal */}
            <div className="macbook-platform" />
          </div>

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

        {/* ── HERO TAGLINE — above-fold value prop, fades before zoom kicks in ── */}
        <motion.div
          style={{ opacity: heroTaglineOpacity }}
          className="pointer-events-none absolute bottom-[72px] left-0 right-0 z-[4] flex flex-col items-center gap-1.5"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace", color: "rgba(12,14,20,0.36)" }}
          >
            UK Web Design Studio
          </p>
          <h1
            className="text-[clamp(1rem,2vw,1.4rem)] font-semibold tracking-tight"
            style={{ color: "#0c0e14", margin: 0 }}
          >
            Websites that win clients.
          </h1>
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
