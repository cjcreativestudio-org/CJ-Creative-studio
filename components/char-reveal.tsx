"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { EXPO } from "@/lib/easing";

export default function CharReveal({
  text,
  className,
  delay = 0,
  charDelay = 0.02,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  charDelay?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  const chars = text.split("");

  const MotionTag = motion[Tag] as typeof motion.span;

  return (
    <MotionTag ref={ref as React.RefObject<HTMLSpanElement>} className={className} aria-label={text}>
      {reduced
        ? text
        : chars.map((char, i) => (
            char === " " ? (
              <span key={i} className="inline-block" style={{ width: "0.28em" }} aria-hidden="true" />
            ) : (
              <span key={i} className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={
                    inView
                      ? { y: "0%", opacity: 1 }
                      : { y: "110%", opacity: 0 }
                  }
                  transition={{
                    duration: 0.6,
                    ease: EXPO,
                    delay: delay + i * charDelay,
                  }}
                >
                  {char}
                </motion.span>
              </span>
            )
          ))}
    </MotionTag>
  );
}
