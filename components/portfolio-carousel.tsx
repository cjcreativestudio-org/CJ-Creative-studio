"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

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
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: true });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      className="w-full bg-[#121212] py-20 px-8"
      aria-label="Selected work"
      aria-roledescription="carousel"
    >
      {/* Header row */}
      <div className="max-w-7xl mx-auto mb-12 flex items-end justify-between">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-mono block mb-3">
            Selected Work // Case Studies
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-neutral-100 tracking-tight leading-tight max-w-xs">
            Refined executions for digital platforms.
          </h2>
        </div>

        {/* Prev / Next buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous project"
            className={[
              "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200",
              canScrollPrev
                ? "border-neutral-600 text-neutral-300 hover:border-neutral-400 hover:text-white"
                : "border-neutral-800 text-neutral-700 cursor-not-allowed",
            ].join(" ")}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next project"
            className={[
              "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200",
              canScrollNext
                ? "border-neutral-600 text-neutral-300 hover:border-neutral-400 hover:text-white"
                : "border-neutral-800 text-neutral-700 cursor-not-allowed",
            ].join(" ")}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      {/* Embla viewport */}
      <div className="max-w-7xl mx-auto overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${project.id} of ${projects.length}: ${project.title}`}
              className="min-w-0 shrink-0 basis-[85vw] md:basis-[55%] lg:basis-[42%]"
            >
              {/* Media */}
              <div className="w-full aspect-[4/3] bg-neutral-900 overflow-hidden relative border border-neutral-800 group transition-colors duration-500 hover:border-neutral-700">
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

              {/* Meta */}
              <div className="flex justify-between items-end pt-4 font-mono text-[11px]">
                <div className="flex gap-3 items-center">
                  <span className="text-neutral-500">[{project.id}]</span>
                  <span className="text-neutral-200 font-sans text-sm font-medium tracking-tight">
                    {project.title}
                  </span>
                </div>
                <div className="text-neutral-400 hidden md:block">{project.category}</div>
                <div className="text-neutral-500">{project.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
