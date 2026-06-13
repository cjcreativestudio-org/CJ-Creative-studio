"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Logo from "./logo";
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

  // p² acceleration — scale 1→9; frozen at 1 for reduced-motion users
  const scale = useTransform(scrollYProgress, (p) =>
    prefersReducedMotion ? 1 : 1 + p * p * 8
  );

  // Room fades out between 60–95% progress (was 60–84%)
  const roomOpacity = useTransform(scrollYProgress, [0.6, 0.95], [1, 0]);

  // White reveal fades in between 55–95% — destination matches the page aurora
  const revealOpacity = useTransform(scrollYProgress, [0.55, 0.95], [0, 1]);

  // Nav text is always dark on this light hero (always light bg)
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    onLightChange(p < 0.42);
  });

  useEffect(() => {
    onLightChange(scrollYProgress.get() < 0.42);
  }, [onLightChange, scrollYProgress]);

  return (
    <section ref={sectionRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        {/* Aurora field — always animating behind the room image */}
        <div className="aurora-gradient animate-aurora pointer-events-none absolute -inset-[10px] opacity-50 [will-change:background-position]" />
        <div
          className="aurora-gradient animate-aurora pointer-events-none absolute -inset-[10px] opacity-30 [will-change:background-position]"
          style={{ animationDirection: "reverse", animationDuration: "40s" }}
        />

        {/* Zooming room image — transform-origin targets laptop screen center */}
        <motion.div
          style={{ scale, opacity: roomOpacity }}
          className="absolute inset-0 [transform-origin:50%_40%] [will-change:transform]"
        >
          <Image
            src="/assets/hero-master.png"
            alt="CJ Creative Studio workspace"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover"
          />
          {/*
            TODO: Replace hero-master.png with a looping video once the asset is created.
            Drop hero-video.mp4 into public/assets/ and uncomment:

            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/assets/hero-video.mp4" type="video/mp4" />
            </video>
          */}
          {/* Subtle aurora tint — white room walls pick up brand colours */}
          <div className="aurora-gradient animate-aurora pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply [will-change:background-position]" />
          {/* CJ Studio mark centred on laptop screen — zooms with image */}
          <div
            className="pointer-events-none absolute"
            style={{
              top: "38%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Logo variant="mark" height={28} className="opacity-80" />
          </div>
        </motion.div>

        {/* White reveal — fades in as image fades, landing on the page aurora */}
        <motion.div
          style={{ opacity: revealOpacity }}
          className="pointer-events-none absolute inset-0 bg-white"
        />
      </div>
    </section>
  );
}
