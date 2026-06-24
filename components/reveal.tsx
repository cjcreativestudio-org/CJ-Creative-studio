"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";

// ease-out-expo — decisive, editorial
const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Fade + rise on scroll into view.
 * Immediately visible (no opacity gate) when prefers-reduced-motion is set.
 */
export default function Reveal({
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
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={
        reduced
          ? {}
          : inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 20 }
      }
      transition={{ duration: 0.65, ease: EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}
