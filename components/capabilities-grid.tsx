"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const capabilities = [
  {
    num: "01",
    title: "Identity Systems",
    description:
      "We forge rigorous, cohesive visual languages for technical products. From typographic frameworks to generative asset pipelines, we ensure your brand operates with absolute clarity across all touchpoints.",
  },
  {
    num: "02",
    title: "Digital Interfaces",
    description:
      "High-fidelity, performant frontend systems engineered for complex workflows. We bridge the gap between heavy technical capability and minimalist, intuitive user experience.",
  },
  {
    num: "03",
    title: "Design Operations",
    description:
      "Standardizing component architecture, asset design systems, and rapid prototyping workflows. We build infrastructure that allows your internal product teams to scale without friction.",
  },
];

export default function CapabilitiesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item) return;

        const textElement = item.querySelector(".capability-title");
        const descElement = item.querySelector(".capability-desc");
        const lineElement = item.querySelector(".capability-line");

        gsap.fromTo(
          textElement,
          { fontWeight: 200, color: "#A3A3A3" },
          {
            fontWeight: 700,
            color: "#171717",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              end: "top 35%",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          descElement,
          { opacity: 0.3, y: 10 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              end: "top 40%",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          lineElement,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 60%",
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#FBFBFB] py-32 px-8 flex flex-col items-center justify-center border-b border-neutral-100"
      aria-label="Capabilities"
    >
      <div className="w-full max-w-7xl">
        <div className="mb-24">
          <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-mono">
            Core Capabilities // Operational Focus
          </span>
        </div>

        <div className="flex flex-col w-full">
          {capabilities.map((cap, index) => (
            <div
              key={cap.num}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              className="group relative pt-12 pb-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start overflow-hidden"
            >
              {/* Top Animated Border Line */}
              <div className="capability-line absolute top-0 left-0 w-full h-[1px] bg-neutral-200" />

              {/* Number */}
              <div className="md:col-span-1 text-[11px] tracking-widest text-neutral-400 font-mono pt-2">
                [{cap.num}]
              </div>

              {/* Title */}
              <div className="md:col-span-6">
                <h3 className="capability-title text-4xl md:text-5xl font-light tracking-tight select-none">
                  {cap.title}
                </h3>
              </div>

              {/* Description */}
              <div className="md:col-span-5 md:pt-2">
                <p className="capability-desc text-sm text-neutral-500 leading-relaxed max-w-md font-light">
                  {cap.description}
                </p>
              </div>
            </div>
          ))}

          {/* Closing line */}
          <div className="w-full h-[1px] bg-neutral-200" />
        </div>
      </div>
    </section>
  );
}
