"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { EXPO } from "@/lib/easing";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  charDelay?: number;
  as?: "h1" | "h2" | "h3" | "span";
}

export default function GlowHeadline({
  text,
  className,
  delay = 0,
  charDelay = 0.018,
  as: Tag = "span",
}: Props) {
  const wrapperRef = useRef<HTMLElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reduced = useReducedMotion();
  const inView = useInView(wrapperRef, { once: true, margin: "-60px 0px" });

  const chars = text.split("");

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (reduced) return;
    charRefs.current.forEach((el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      const radius = 200;
      if (dist < radius) {
        const strength = 1 - dist / radius;
        el.style.color = strength > 0.15
          ? `color-mix(in srgb, #5b9fd6 ${Math.round(strength * 100)}%, #f0f0f0)`
          : "";
      } else {
        el.style.color = "";
      }
    });
  }, [reduced]);

  const handleMouseLeave = useCallback(() => {
    charRefs.current.forEach((el) => {
      if (!el) return;
      el.style.color = "";
    });
  }, []);

  useEffect(() => {
    const section = wrapperRef.current?.closest("section");
    if (!section || reduced) return;
    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, reduced]);

  const MotionTag = motion[Tag] as typeof motion.span;

  return (
    <MotionTag
      ref={wrapperRef as React.RefObject<HTMLSpanElement>}
      className={className ?? ""}
      aria-label={text}
    >
      {reduced
        ? text
        : chars.map((char, i) =>
            char === " " ? (
              <span
                key={i}
                className="inline-block"
                style={{ width: "0.28em" }}
                aria-hidden="true"
              />
            ) : (
              <span key={i} className="inline-block overflow-hidden">
                <motion.span
                  ref={(el: HTMLSpanElement | null) => { charRefs.current[i] = el; }}
                  className="inline-block"
                  style={{ transition: "color 120ms ease-out" }}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: EXPO, delay: delay + i * charDelay }}
                >
                  {char}
                </motion.span>
              </span>
            )
          )}
    </MotionTag>
  );
}
