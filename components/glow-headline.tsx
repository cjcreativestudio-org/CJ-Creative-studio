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
  const readyRef = useRef(false);
  const reduced = useReducedMotion();
  const inView = useInView(wrapperRef, { once: true, margin: "-60px 0px" });

  const chars = text.split("");

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (reduced || !readyRef.current) return;
    const radius = 320;
    charRefs.current.forEach((el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      if (dist < radius) {
        const strength = 1 - dist / radius;
        el.style.transition = "color 45ms ease-out, text-shadow 45ms ease-out";
        el.style.color = strength > 0.08
          ? `color-mix(in srgb, #5b9fd6 ${Math.round(strength * 100)}%, #f0f0f0)`
          : "";
        el.style.textShadow = `0 0 8px rgba(91,159,214,${(strength * 0.55).toFixed(2)})`;
      } else {
        el.style.transition = "color 45ms ease-out, text-shadow 45ms ease-out";
        el.style.color = "";
        el.style.textShadow = "";
      }
    });
  }, [reduced]);

  const handleMouseLeave = useCallback(() => {
    charRefs.current.forEach((el) => {
      if (!el) return;
      el.style.transition = "none";
      el.style.color = "";
      el.style.textShadow = "";
    });
  }, []);

  useEffect(() => {
    // Wait for the full entrance stagger to finish before enabling the effect
    const ms = (delay + chars.length * charDelay + 0.7) * 1000;
    const t = setTimeout(() => { readyRef.current = true; }, ms);
    return () => clearTimeout(t);
  }, [delay, chars.length, charDelay]);

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
                  style={{ transition: "none" }}
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
