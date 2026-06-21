"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const chapters = [
  {
    eyebrow: null,
    heading: "Quiet systems for exacting digital brands.",
    body: "CJ Studio builds refined identities, product interfaces, and web systems for founders and teams who value restraint, clarity, and craft.",
  },
  {
    eyebrow: "01 — Identity Systems",
    heading: "Identity\nSystems",
    body: "We forge rigorous, cohesive visual languages for technical products. From typographic frameworks to generative asset pipelines — absolute clarity across all touchpoints.",
  },
  {
    eyebrow: "02 — Digital Interfaces",
    heading: "Digital\nInterfaces",
    body: "High-fidelity, performant frontend systems engineered for complex workflows. Bridging heavy technical capability with minimalist, intuitive user experience.",
  },
  {
    eyebrow: "03 — Design Operations",
    heading: "Design\nOperations",
    body: "Standardizing component architecture, asset design systems, and rapid prototyping workflows. Infrastructure that lets your product teams scale without friction.",
  },
];

export default function HeroMediaPlane() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // — initial load reveal for chapter 0
    if (!reduced) {
      const p0 = panelRefs.current[0];
      if (p0) {
        const heading = p0.querySelector<HTMLElement>(".chap-heading");
        const body = p0.querySelector<HTMLElement>(".chap-body");
        if (heading) gsap.fromTo(heading,
          { color: "#FBFBFB", fontWeight: 200 },
          { color: "#171717", fontWeight: 800, duration: 1.5, ease: "power3.out", delay: 0.2 }
        );
        if (body) gsap.fromTo(body,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.55 }
        );
      }
    }

    const ctx = gsap.context(() => {
      // GSAP pin: section stays fixed for 3x its height of scroll
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const p = self.progress;

          // — scrub video currentTime
          if (video.readyState >= 2 && video.duration) {
            video.currentTime = p * video.duration;
          }

          // — wordmark parallax
          if (wordmarkRef.current) {
            gsap.set(wordmarkRef.current, { y: `${20 - p * 45}%` });
          }

          // Chapter boundaries
          const bounds: [number, number][] = [
            [0, 0.22],
            [0.22, 0.48],
            [0.48, 0.74],
            [0.74, 1.0],
          ];

          bounds.forEach(([start, end], i) => {
            const panel = panelRefs.current[i];
            const dot = dotRefs.current[i];
            if (!panel) return;

            const active = p >= start && p < end;
            const localP = end > start ? (p - start) / (end - start) : 0;

            if (i === 0) {
              // Intro: revealed on load, exits up as scroll begins
              gsap.set(panel, {
                opacity: Math.max(0, 1 - localP * 4),
                y: -localP * 80,
              });
            } else if (active) {
              const entering = Math.min(1, localP / 0.2);
              const exiting = Math.max(0, (localP - 0.8) / 0.2);
              gsap.set(panel, {
                opacity: entering * (1 - exiting),
                y: (1 - entering) * 72 - exiting * 72,
              });
            } else if (p < start) {
              gsap.set(panel, { opacity: 0, y: 72 });
            } else {
              gsap.set(panel, { opacity: 0, y: -72 });
            }

            if (dot) {
              dot.style.backgroundColor = active ? "#171717" : "rgba(0,0,0,0.2)";
            }
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FBFBFB] overflow-hidden"
      style={{ height: "100vh" }}
      aria-label="Hero"
    >
      {/* Top labels */}
      <div className="absolute top-0 left-0 right-0 px-8 pt-8 flex justify-between z-40 pointer-events-none select-none">
        <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-mono">
          Boutique Digital Design Agency
        </span>
        <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-mono">
          United Kingdom
        </span>
      </div>

      {/* CTA — top right (below labels) */}
      <div className="absolute top-20 right-8 z-40 hidden md:flex flex-col items-end gap-2">
        <Link
          href="/contact"
          className={[
            "group inline-flex items-center gap-3",
            "rounded-full border border-neutral-900 px-5 py-2.5",
            "text-[11px] tracking-[0.2em] uppercase text-neutral-900",
            "transition-all duration-200 hover:bg-neutral-900 hover:text-white active:scale-[0.97]",
          ].join(" ")}
        >
          Start a project
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </Link>
      </div>

      {/* Chapter text panels — full width, horizontal layout, lower cream area */}
      <div
        className="absolute left-0 right-0 z-40 px-8"
        style={{ top: "28%" }}
        aria-live="polite"
      >
        {chapters.map((chap, i) => (
          <div
            key={i}
            ref={(el) => { panelRefs.current[i] = el; }}
            className="absolute inset-x-8 grid grid-cols-12 gap-8 items-end"
            style={{
              opacity: i === 0 ? 1 : 0,
              transform: i === 0 ? "translateY(0)" : "translateY(72px)",
              willChange: "opacity, transform",
            }}
          >
            {/* Left: eyebrow + heading */}
            <div className="col-span-12 md:col-span-6">
              {chap.eyebrow && (
                <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-mono mb-3">
                  {chap.eyebrow}
                </p>
              )}
              <h1
                className="chap-heading text-6xl md:text-7xl tracking-tight leading-[0.9] whitespace-pre-line"
                style={{
                  color: i === 0 ? "#FBFBFB" : "#171717",
                  fontWeight: i === 0 ? 200 : 800,
                }}
              >
                {chap.heading}
              </h1>
            </div>

            {/* Right: description */}
            <div className="col-span-12 md:col-span-5 md:col-start-8 flex flex-col justify-end pb-1">
              <div className="flex items-start gap-3">
                <span className="w-6 h-[1px] bg-neutral-400 mt-3 flex-shrink-0" />
                <p
                  className="chap-body text-sm text-neutral-500 leading-relaxed font-light"
                  style={{ opacity: i === 0 ? 0 : 1 }}
                >
                  {chap.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress dots — right edge */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2">
        {chapters.map((_, i) => (
          <span
            key={i}
            ref={(el) => { dotRefs.current[i] = el; }}
            className="block w-1.5 h-1.5 rounded-full transition-colors duration-300"
            style={{ backgroundColor: i === 0 ? "#171717" : "rgba(0,0,0,0.2)" }}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Video plane — lower 55vh */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-neutral-100"
        style={{ height: "55vh" }}
      >
        {/* Scrubbed video */}
        <video
          ref={videoRef}
          preload="auto"
          muted
          playsInline
          className="absolute inset-0 z-10 w-full h-full object-cover grayscale contrast-[1.15] brightness-[0.95]"
          aria-hidden="true"
        >
          <source src="/assets/higgsfield-render.mp4" type="video/mp4" />
        </video>

        {/* Wordmark parallax */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <h2
            ref={wordmarkRef}
            className="text-[14vw] font-black tracking-tighter text-neutral-900 uppercase opacity-90 select-none"
            aria-hidden="true"
            style={{ transform: "translateY(20%)" }}
          >
            CJ STUDIO
          </h2>
        </div>

        {/* Foreground mask */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <img
            src="/assets/higgsfield-foreground-mask-new.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
