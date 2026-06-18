"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

// Wrap Next.js Link with Framer Motion to preserve client-side routing
const MotionLink = motion.create(Link);

interface Props {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost" | "inverted";
  children: ReactNode;
  className?: string;
}

export default function AnimatedButton({ href, onClick, variant = "primary", children, className = "" }: Props) {
  const reduce = useReducedMotion();

  const base = "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full text-[14px] font-medium transition-colors duration-200 select-none cursor-pointer";

  const variants = {
    primary: "px-6 py-3 bg-gray-900 text-white hover:bg-gray-800",
    outline: "px-6 py-3 border border-gray-200 text-gray-700 hover:border-gray-400 bg-white",
    ghost: "px-4 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50",
    inverted: "px-6 py-3 bg-white text-[#0c0e14] hover:bg-gray-100",
  };

  const shimmerColor = variant === "primary"
    ? "from-transparent via-white/15 to-transparent"
    : variant === "inverted"
    ? "from-transparent via-gray-900/8 to-transparent"
    : "from-transparent via-gray-900/8 to-transparent";

  const inner = (
    <>
      {/* Shimmer sweep — driven by parent group-hover */}
      {!reduce && (
        <span
          className={`pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r ${shimmerColor} translate-x-[-110%] group-hover:translate-x-[210%] transition-transform duration-[380ms] ease-out`}
          aria-hidden="true"
        />
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <MotionLink
        href={href}
        whileTap={reduce ? {} : { scale: 0.97 }}
        className={`${base} ${variants[variant]} ${className}`}
      >
        {inner}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type="submit"
      onClick={onClick}
      whileTap={reduce ? {} : { scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {inner}
    </motion.button>
  );
}
