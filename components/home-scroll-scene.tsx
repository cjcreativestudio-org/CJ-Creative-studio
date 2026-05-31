"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import WebsiteAssembly from "./website-assembly";
import Hero from "./hero";

export default function HomeScrollScene() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={scrollRef} className="relative h-[300vh]">
      {/* 3D sticky background — locks to viewport, animates on scroll */}
      <WebsiteAssembly scrollYProgress={scrollYProgress} />
      {/* Hero text overlay — absolute at top, fades as user scrolls deeper */}
      <div className="absolute inset-x-0 top-0 min-h-screen z-10">
        <Hero />
      </div>
    </div>
  );
}
