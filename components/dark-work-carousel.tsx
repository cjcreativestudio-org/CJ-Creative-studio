"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

export default function DarkWorkCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // 3 panels × 100vw each = 300vw track; -66.667% of 300vw = -200vw (shows all three)
  const x = useTransform(scrollYProgress, [0.04, 0.96], ["0%", "-66.667%"]);

  const labelOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  const scaleX = useTransform(scrollYProgress, [0.04, 0.96], [0, 1]);

  const trackWidth = `${projects.length * 100}vw`;

  return (
    <section ref={sectionRef} className="relative h-[350vh] bg-[#0c0e14]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Section label */}
        <motion.p
          style={{ opacity: labelOpacity }}
          className="absolute top-8 left-8 z-10 font-mono text-[11px] uppercase tracking-[0.3em] text-white/40 pointer-events-none select-none"
        >
          Selected work
        </motion.p>

        <motion.p
          style={{ opacity: labelOpacity }}
          className="absolute top-8 right-8 z-10 font-mono text-[11px] uppercase tracking-[0.3em] text-white/24 pointer-events-none select-none"
        >
          {projects.length} projects
        </motion.p>

        {/* Horizontal track */}
        <motion.div
          className="flex h-full"
          style={{ x: prefersReducedMotion ? undefined : x, width: trackWidth }}
        >
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className="relative flex-none w-screen h-full flex items-center"
            >
              <div className="w-full max-w-7xl mx-auto px-12 flex items-center gap-14">

                {/* Image */}
                <div
                  className="relative flex-none w-[52%] overflow-hidden rounded-2xl"
                  style={{ aspectRatio: "4/3" }}
                >
                  <Image
                    src={project.img}
                    alt={project.name}
                    fill
                    sizes="52vw"
                    className="object-cover"
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-5 flex-1 min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/38">
                    {String(i + 1).padStart(2, "0")} — {project.type}
                  </p>
                  <h2 className="text-[clamp(2.2rem,3.8vw,3.6rem)] font-semibold tracking-tight leading-none text-white">
                    {project.name}
                  </h2>
                  <p className="text-[16px] leading-[1.7] text-white/55 max-w-[400px]">
                    {project.description}
                  </p>
                  {project.quote && (
                    <p className="text-[14px] italic text-white/38 max-w-[360px] leading-relaxed mt-1">
                      &ldquo;{project.quote.text}&rdquo;
                      <span className="not-italic ml-2 text-white/24 text-[12px]">— {project.quote.author}</span>
                    </p>
                  )}
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 text-[14px] font-medium text-white/70 border-b border-white/18 pb-1 self-start mt-2 hover:text-white hover:border-white/40 transition-colors"
                  >
                    View project <span aria-hidden>→</span>
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-8 left-8 right-8 h-px bg-white/10 pointer-events-none">
          <motion.div
            className="h-full bg-white/36 origin-left"
            style={{ scaleX }}
          />
        </div>

      </div>
    </section>
  );
}
