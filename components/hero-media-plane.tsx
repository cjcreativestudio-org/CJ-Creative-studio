"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 480;
const frameSrc = (n: number) =>
  `/assets/sequence/${String(n).padStart(4, "0")}.jpg`;

const chapters = [
  {
    eyebrow: null,
    lines: ["Quiet systems", "for exacting", "digital brands."],
    body: "CJ Studio builds refined identities, product interfaces, and web systems for founders and teams who value restraint, clarity, and craft.",
  },
  {
    eyebrow: "01 — Identity Systems",
    lines: ["Identity", "Systems"],
    body: "We forge rigorous, cohesive visual languages for technical products. From typographic frameworks to generative asset pipelines, we ensure your brand operates with absolute clarity across all touchpoints.",
  },
  {
    eyebrow: "02 — Digital Interfaces",
    lines: ["Digital", "Interfaces"],
    body: "High-fidelity, performant frontend systems engineered for complex workflows. We bridge the gap between heavy technical capability and minimalist, intuitive user experience.",
  },
  {
    eyebrow: "03 — Design Operations",
    lines: ["Design", "Operations"],
    body: "Standardizing component architecture, asset design systems, and rapid prototyping workflows. We build infrastructure that allows your internal product teams to scale without friction.",
  },
];

export default function HeroMediaPlane() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const framesRef = useRef<HTMLImageElement[]>([]);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = framesRef.current[index];
    if (!ctx || !img?.complete) return;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    // Preload frames
    const frames: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => { if (i === 1) drawFrame(0); };
      frames.push(img);
    }
    framesRef.current = frames;

    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    if (!wrapper || !sticky) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Chapter boundaries (progress 0–1)
    const bounds = [
      [0, 0.22],
      [0.22, 0.48],
      [0.48, 0.74],
      [0.74, 1.0],
    ];

    const ctx = gsap.context(() => {
      // Initial load reveal: first chapter text white → black
      if (!reduced && panelRefs.current[0]) {
        const lines = panelRefs.current[0]!.querySelectorAll(".chap-line");
        const body = panelRefs.current[0]!.querySelector(".chap-body");
        gsap.fromTo(lines,
          { color: "#FBFBFB", fontWeight: 200 },
          { color: "#171717", fontWeight: 800, duration: 1.4, ease: "power3.out", delay: 0.2, stagger: 0.05 }
        );
        gsap.fromTo(body,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.55 }
        );
      }

      // Master scroll progress — tracks wrapper scroll
      const masterST = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate(self) {
          const p = self.progress;

          // — canvas sequence
          const frameIdx = Math.min(
            FRAME_COUNT - 1,
            Math.round(p * (FRAME_COUNT - 1))
          );
          drawFrame(frameIdx);

          // — wordmark parallax (slides upward)
          if (wordmarkRef.current) {
            gsap.set(wordmarkRef.current, { y: `${20 - p * 45}%` });
          }

          // — chapter text panels
          bounds.forEach(([start, end], i) => {
            const panel = panelRefs.current[i];
            const dot = dotRefs.current[i];
            if (!panel) return;

            const active = p >= start && p < end;
            const past = p >= end;

            if (i === 0) {
              // Intro panel: already revealed on load, exits upward
              const exitProgress = Math.max(0, (p - start) / (end - start));
              if (p < start) {
                gsap.set(panel, { opacity: 1, y: 0 });
              } else if (p < end) {
                gsap.set(panel, { opacity: 1 - exitProgress, y: -exitProgress * 70 });
              } else {
                gsap.set(panel, { opacity: 0, y: -70 });
              }
            } else {
              // Chapter panels: slide in from below, slide out upward
              if (past) {
                gsap.set(panel, { opacity: 0, y: -70 });
              } else if (active) {
                const progress = (p - start) / (end - start);
                const entering = Math.min(1, progress / 0.25);
                const exiting = Math.max(0, (progress - 0.75) / 0.25);
                const opacity = entering * (1 - exiting);
                const y = (1 - entering) * 70 - exiting * 70;
                gsap.set(panel, { opacity, y });
              } else {
                gsap.set(panel, { opacity: 0, y: 70 });
              }
            }

            // Dot active state
            if (dot) {
              gsap.set(dot, { backgroundColor: active ? "#171717" : "rgba(0,0,0,0.2)" });
            }
          });
        },
      });

      return () => masterST.kill();
    });

    return () => ctx.revert();
  }, [drawFrame]);

  return (
    /* Scroll wrapper — 500vh creates scroll room */
    <div ref={wrapperRef} className="relative" style={{ height: "500vh" }} aria-label="Hero scrollytelling">

      {/* Sticky viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full overflow-hidden bg-[#FBFBFB]"
        style={{ height: "100vh" }}
      >
        {/* Top labels */}
        <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-start z-40 select-none pointer-events-none">
          <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-mono">
            Boutique Digital Design Agency
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-mono">
            United Kingdom
          </span>
        </div>

        {/* Chapter text panels — left side */}
        <div className="absolute top-[22%] left-8 z-40 max-w-[58%]" aria-live="polite">
          {chapters.map((chap, i) => (
            <div
              key={i}
              ref={(el) => { panelRefs.current[i] = el; }}
              className="absolute inset-0"
              style={{
                opacity: i === 0 ? 1 : 0,
                transform: i === 0 ? "translateY(0)" : "translateY(70px)",
                willChange: "opacity, transform",
              }}
              aria-hidden={i !== 0}
            >
              {chap.eyebrow && (
                <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-mono mb-4">
                  {chap.eyebrow}
                </p>
              )}
              <h1 className="text-7xl md:text-8xl tracking-tight leading-[0.92]">
                {chap.lines.map((line, j) => (
                  <span
                    key={j}
                    className="chap-line block"
                    style={{
                      color: i === 0 ? "#FBFBFB" : "#171717",
                      fontWeight: i === 0 ? 200 : 800,
                    }}
                  >
                    {line}
                  </span>
                ))}
              </h1>
              <div className="flex items-start gap-4 mt-6 max-w-sm">
                <span className="w-6 h-[1px] bg-neutral-400 mt-3 flex-shrink-0" />
                <p
                  className="chap-body text-sm text-neutral-500 leading-relaxed font-light"
                  style={{ opacity: i === 0 ? 0 : 1 }}
                >
                  {chap.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA — top right */}
        <div className="absolute top-[22%] right-8 z-40 hidden md:flex flex-col items-end gap-3">
          <Link
            href="/contact"
            className={[
              "group inline-flex items-center gap-3",
              "rounded-full border border-neutral-900 px-6 py-3",
              "text-[11px] tracking-[0.2em] uppercase text-neutral-900",
              "transition-all duration-200 ease-out cursor-pointer",
              "hover:bg-neutral-900 hover:text-white active:scale-[0.97]",
            ].join(" ")}
          >
            Start a project
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
          <p className="text-[9px] tracking-[0.25em] uppercase text-neutral-400 font-mono">
            No commitment required
          </p>
        </div>

        {/* Chapter progress dots — right edge */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 hidden md:flex">
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

        {/* Media plane — lower 55vh */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-neutral-100" style={{ height: "55vh" }}>

          {/* Canvas — sequence frames */}
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            className="absolute inset-0 z-10 w-full h-full"
            style={{ objectFit: "cover", filter: "grayscale(1) contrast(1.15) brightness(0.95)" }}
            aria-hidden="true"
          />

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

          {/* Foreground mask — transparent cutout */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            <img
              src="/assets/higgsfield-foreground-mask-new.png"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
