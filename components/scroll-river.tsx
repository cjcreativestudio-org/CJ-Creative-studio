"use client";

import { useScroll, useTransform, motion } from "motion/react";

export default function ScrollRiver() {
  const { scrollYProgress } = useScroll();
  const scaleY = useTransform(scrollYProgress, [0, 0.95], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.93, 1], [1, 0]);

  return (
    <div
      className="fixed left-6 top-0 bottom-0 z-50 hidden md:flex flex-col"
      aria-hidden="true"
    >
      <div className="relative flex-1 w-[2px] bg-transparent overflow-hidden my-8">
        <motion.div
          className="absolute inset-x-0 top-0 bg-current"
          style={{
            scaleY,
            opacity,
            originY: "top",
            height: "100%",
            color: "inherit",
          }}
        />
      </div>
    </div>
  );
}
