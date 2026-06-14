"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{ aspectRatio: "4/3" }}
      >
        <Image
          src={project.img}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 52vw"
          className="object-cover"
        />
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
        {String(index + 1).padStart(2, "0")} — {project.type}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight leading-tight text-white">
        {project.name}
      </h2>
      <p className="text-[15px] leading-relaxed text-white/55">
        {project.description}
      </p>
      {project.quote && (
        <p className="text-[13px] italic text-white/38 leading-relaxed">
          &ldquo;{project.quote.text}&rdquo;
          <span className="not-italic ml-2 text-white/24 text-[12px]">— {project.quote.author}</span>
        </p>
      )}
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-[13px] font-medium text-white/70 border-b border-white/18 pb-1 self-start hover:text-white hover:border-white/40 transition-colors"
      >
        View project <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

export default function DarkWorkCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0.04, 0.96], ["0%", "-66.667%"]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  const scaleX = useTransform(scrollYProgress, [0.04, 0.96], [0, 1]);

  const trackWidth = `${projects.length * 100}vw`;

  return (
    <>
      {/* ── MOBILE layout (vertical stack) ── */}
      <section className="md:hidden bg-[#0c0e14] py-16 px-6" aria-label="Selected work">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40 mb-10 select-none">
          Selected work
        </p>
        <div className="flex flex-col gap-14">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ── DESKTOP layout (scroll-driven horizontal) ── */}
      <section
        ref={sectionRef}
        className="hidden md:block relative h-[350vh] bg-[#0c0e14]"
        aria-label="Selected work"
      >
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
            {projects.map((project, i) => {
              // Per-card scroll window
              const cardIn = i / projects.length;
              const cardMid = (i + 0.5) / projects.length;

              // Image parallax — moves at different rate from text (depth layer)
              const imgY = useTransform(
                scrollYProgress,
                [0, 1],
                [`${-4 + i * 4}%`, `${4 - i * 3}%`]
              );
              // Image zooms out as card enters
              const imgScale = useTransform(
                scrollYProgress,
                [cardIn, cardMid],
                [1.1, 1.0]
              );
              // Headline rises in from below
              const headlineY = useTransform(
                scrollYProgress,
                [cardIn, cardMid],
                [32, 0]
              );
              const headlineOpacity = useTransform(
                scrollYProgress,
                [cardIn, cardIn + 0.12],
                [0, 1]
              );

              return (
                <div
                  key={project.slug}
                  className="relative flex-none w-screen h-full flex items-center"
                >
                  <div className="w-full max-w-7xl mx-auto px-12 flex items-center gap-14">

                    {/* Image — y parallax + scale depth */}
                    <motion.div
                      className="relative flex-none w-[52%] overflow-hidden rounded-2xl"
                      style={{
                        aspectRatio: "4/3",
                        y: prefersReducedMotion ? 0 : imgY,
                      }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        style={{ scale: prefersReducedMotion ? 1 : imgScale }}
                      >
                        <Image
                          src={project.img}
                          alt={project.name}
                          fill
                          sizes="52vw"
                          className="object-cover"
                        />
                      </motion.div>
                    </motion.div>

                    {/* Text — headline rises with depth offset */}
                    <div className="flex flex-col gap-5 flex-1 min-w-0">
                      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/38">
                        {String(i + 1).padStart(2, "0")} — {project.type}
                      </p>

                      <motion.h2
                        className="text-[clamp(2.2rem,3.8vw,3.6rem)] font-semibold tracking-tight leading-none text-white"
                        style={{
                          y: prefersReducedMotion ? 0 : headlineY,
                          opacity: prefersReducedMotion ? 1 : headlineOpacity,
                        }}
                      >
                        {project.name}
                      </motion.h2>

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
              );
            })}
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
    </>
  );
}
