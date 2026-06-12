"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function AuroraBackground({ children, className = "" }: Props) {
  return (
    <div
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white ${className}`}
    >
      {/* Primary aurora layer */}
      <div className="aurora-gradient pointer-events-none absolute -inset-[10px] animate-aurora opacity-50 [will-change:background-position]" />
      {/* Secondary layer — reversed direction, shorter cycle, mix-blend for depth */}
      <div
        className="aurora-gradient pointer-events-none absolute -inset-[10px] animate-aurora opacity-30 [will-change:background-position]"
        style={{ animationDirection: "reverse", animationDuration: "40s" }}
      />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
