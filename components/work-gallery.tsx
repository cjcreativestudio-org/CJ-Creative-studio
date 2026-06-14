"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "@phosphor-icons/react";
import { projects, type Project } from "@/lib/projects";

export default function WorkGallery() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByAmount = (delta: number) => {
    trackRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  // Escape key + focus trap
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
        return;
      }
      if (e.key !== "Tab") return;
      const panel = document.querySelector<HTMLElement>('[role="dialog"]');
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  // Lock body scroll when overlay open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const backdropTransition = prefersReducedMotion
    ? { duration: 0.15 }
    : { duration: 0.2 };

  const panelInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 40, scale: 0.96 };
  const panelAnimate = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, scale: 1 };
  const panelExit = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 20, scale: 0.98 };
  const panelTransition = prefersReducedMotion
    ? { duration: 0.15 }
    : { type: "spring" as const, stiffness: 300, damping: 30 };

  return (
    <section aria-label="Project portfolio">
      {/* Section header */}
      <div className="mb-10">
        <span
          className="text-[11px] uppercase tracking-[0.28em] text-gray-400"
          style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
        >
          Our work
        </span>
        <h2 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-gray-900">
          Selected projects
        </h2>
        <p className="mt-4 text-[16px] text-gray-500 max-w-[48ch] leading-relaxed">
          A handful of the businesses we&apos;ve helped look, feel, and perform
          better online.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={trackRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {projects.map((p) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => setSelected(p)}
              className="snap-start flex-shrink-0 w-[320px] md:w-[420px] text-left cursor-pointer rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              {/* Image */}
              <div
                className={`relative h-48 rounded-xl overflow-hidden m-2 mb-0 bg-gradient-to-br ${p.color}`}
              >
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 320px, 420px"
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <h3 className="text-[17px] font-semibold text-gray-900">
                  {p.name}
                </h3>
                <p className="text-[12px] uppercase tracking-widest text-gray-400 mt-1">
                  {p.type}
                </p>
                <p className="text-[14px] text-gray-500 mt-2 leading-relaxed">
                  {p.description.slice(0, 80)}…
                </p>
                <div className="mt-4 flex justify-end">
                  <ArrowUpRight size={16} className="text-gray-400" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={() => scrollByAmount(-440)}
          disabled={!canScrollLeft}
          aria-label="Previous projects"
          className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-opacity disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount(440)}
          disabled={!canScrollRight}
          aria-label="Next projects"
          className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-opacity disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          <ArrowRight size={18} className="text-gray-700" />
        </button>
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={backdropTransition}
              onClick={() => setSelected(null)}
            />

            <motion.div
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label={`${selected.name} case study`}
              className="fixed inset-x-4 inset-y-8 md:inset-x-[10%] md:inset-y-[5%] z-50 bg-white rounded-3xl overflow-y-auto shadow-2xl"
              initial={panelInitial}
              animate={panelAnimate}
              exit={panelExit}
              transition={panelTransition}
            >
              {/* Close button */}
              <button
                type="button"
                autoFocus
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-colors"
              >
                <X size={24} className="text-gray-900" />
              </button>

              {/* Image hero */}
              <div
                className={`relative h-56 md:h-72 bg-gradient-to-br ${selected.color}`}
              >
                <Image
                  src={selected.img}
                  alt={selected.name}
                  fill
                  sizes="(max-width: 768px) 92vw, 80vw"
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                <h3 className="text-3xl font-bold text-gray-900">
                  {selected.name}
                </h3>
                <p className="text-[13px] uppercase tracking-widest text-gray-400 mt-1">
                  {selected.type}
                </p>
                <p className="text-[16px] text-gray-600 mt-4 leading-relaxed">
                  {selected.description}
                </p>

                {/* Details */}
                <ul className="mt-6 space-y-3 list-none p-0">
                  {selected.details.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]"
                        style={{
                          background:
                            "linear-gradient(135deg, #8a6cff, #27d7c4)",
                        }}
                      />
                      <span className="text-[15px] text-gray-600 leading-relaxed">
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Quote */}
                {selected.quote && (
                  <blockquote
                    className="mt-8 border-l-4 pl-6"
                    style={{
                      borderImage:
                        "linear-gradient(to bottom, #8a6cff, #27d7c4) 1",
                    }}
                  >
                    <p className="text-[17px] italic text-gray-700">
                      “{selected.quote.text}”
                    </p>
                    <footer className="text-[13px] text-gray-400 mt-2">
                      {selected.quote.author}
                    </footer>
                  </blockquote>
                )}

                {/* Visit site */}
                {selected.url && (
                  <div className="mt-8">
                    <a
                      href={selected.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors"
                    >
                      Visit site
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
