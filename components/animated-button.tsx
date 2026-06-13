"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

// Wrap Next.js Link with Framer Motion to preserve client-side routing
const MotionLink = motion.create(Link);

interface Props {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  children: ReactNode;
  className?: string;
}

export default function AnimatedButton({ href, onClick, variant = "primary", children, className = "" }: Props) {
  const reduce = useReducedMotion();

  const base = "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full text-[14px] font-medium transition-colors duration-200 select-none cursor-pointer";

  const variants = {
    primary: "px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.97]",
    outline: "px-6 py-3 border border-gray-200 text-gray-700 hover:border-gray-400 bg-white active:scale-[0.97]",
    ghost: "px-4 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 active:scale-[0.97]",
  };

  const shimmerColor = variant === "primary"
    ? "from-transparent via-white/15 to-transparent"
    : "from-transparent via-gray-900/8 to-transparent";

  const inner = (
    <>
      {/* Shimmer sweep */}
      {!reduce && (
        <motion.span
          className={`pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r ${shimmerColor}`}
          initial={{ x: "-110%" }}
          whileHover={{ x: "210%" }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
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
      onClick={onClick}
      whileTap={reduce ? {} : { scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {inner}
    </motion.button>
  );
}
