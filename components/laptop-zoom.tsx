"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "motion/react";

interface Props {
  onLightChange: (isLight: boolean) => void;
}

export default function LaptopZoom({ onLightChange }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // p² acceleration — matches PRD eased = p*p; scale 1→9
  const scale = useTransform(scrollYProgress, (p) => 1 + p * p * 8);

  // Room fades out between 60–84% progress
  const roomOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.84],
    [1, 0]
  );

  // Dark veil fades in between 55–82% (max opacity 0.5)
  const veilOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.82],
    [0, 0.5]
  );

  // Nav text flips to dark when background is light (p < 0.46)
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    onLightChange(p < 0.46);
  });

  useEffect(() => {
    onLightChange(scrollYProgress.get() < 0.46);
  }, [onLightChange, scrollYProgress]);

  return (
    <section ref={sectionRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
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
            className="object-cover"
          />
        </motion.div>

        {/* Dark veil — fills in as zoom deepens */}
        <motion.div
          style={{ opacity: veilOpacity }}
          className="absolute inset-0 bg-black pointer-events-none"
        />
      </div>
    </section>
  );
}
