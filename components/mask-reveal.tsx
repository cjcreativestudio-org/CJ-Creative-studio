"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MaskReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        initial={reduced ? false : { y: "110%" }}
        animate={reduced ? {} : inView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 0.75, ease: EXPO, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
