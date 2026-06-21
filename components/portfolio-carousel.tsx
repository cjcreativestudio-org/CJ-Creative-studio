"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: "01",
    title: "Aether Protocol",
    category: "Crypto / Institutional Interface",
    year: "2026",
    video: "/assets/portfolio-aether.mp4",
  },
  {
    id: "02",
    title: "Krypton Systems",
    category: "Automation / Robotics Identity",
    year: "2026",
    video: "/assets/portfolio-krypton.mp4",
  },
  {
    id: "03",
    title: "Vesper Architecture",
    category: "Spatial Computing System",
    year: "2026",
    video: "/assets/portfolio-vesper.mp4",
  },
];

export default function PortfolioCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const container = scrollContainerRef.current;
    if (!track || !container) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const xScrollAmount = -(totalWidth - viewportWidth);

      gsap.to(track, {
        x: xScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="relative w-full bg-[#121212] overflow-hidden"
      aria-label="Selected work"
    >
      <div className="h-screen flex items-center justify-start overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full items-center pl-8 pr-[20vw] gap-12 will-change-transform"
        >
          {/* Intro panel */}
          <div className="w-[35vw] flex-shrink-0 flex flex-col justify-between h-[65vh] pr-12 border-r border-neutral-800">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-mono block mb-4">
                Selected Work // Case Studies
              </span>
              <h2 className="text-4xl font-light text-neutral-100 tracking-tight leading-tight">
                Refined executions for digital platforms.
              </h2>
            </div>
            <p className="text-xs text-neutral-400 font-mono max-w-[280px] leading-relaxed">
              [ SCROLL TO EXPLORE ARCHIVE ]
            </p>
          </div>

          {/* Project panels */}
          {projects.map((project) => (
            <div
              key={project.id}
              className="w-[70vw] md:w-[50vw] h-[65vh] flex-shrink-0 flex flex-col justify-between group"
            >
              <div className="w-full h-[85%] bg-neutral-900 overflow-hidden relative border border-neutral-800 transition-colors duration-500 group-hover:border-neutral-700">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover grayscale opacity-60 transition-all duration-700 group-hover:scale-[1.02] group-hover:grayscale-0 group-hover:opacity-90"
                >
                  <source src={project.video} type="video/mp4" />
                </video>
              </div>

              <div className="flex justify-between items-end pt-4 font-mono text-[11px]">
                <div className="flex gap-4 items-center">
                  <span className="text-neutral-500">[{project.id}]</span>
                  <span className="text-neutral-200 font-sans text-sm font-medium tracking-tight">
                    {project.title}
                  </span>
                </div>
                <div className="text-neutral-400">{project.category}</div>
                <div className="text-neutral-500">{project.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
