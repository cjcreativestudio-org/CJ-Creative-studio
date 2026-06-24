"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, X } from "@phosphor-icons/react";
import { projects, type Project } from "@/lib/projects";

function WorkGalleryInner() {
  const [selected, setSelected] = useState<Project | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const searchParams = useSearchParams();

  // Auto-open a project's case study when arriving with ?project=<slug>
  useEffect(() => {
    const slug = searchParams.get("project");
    if (!slug) return;
    const match = projects.find((p) => p.slug === slug);
    if (match) setSelected(match);
  }, [searchParams]);

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
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
        {projects.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setSelected(p)}
            className="bg-white flex flex-col group text-left cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b9fd6]"
            aria-label={`${p.name} — ${p.type}`}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src={p.img}
                alt={p.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[300ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]"
              />
            </div>

            <div className="p-6 flex flex-col gap-1 bg-white">
              <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">
                {p.slug}
              </span>
              <h3 className="font-serif italic font-bold text-[1.1rem] text-[#0d0d0d]">
                {p.name}
              </h3>
              <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400">
                {p.type}
              </span>
              <p className="text-[13px] text-gray-500 mt-1 leading-[1.5]">
                {p.description.slice(0, 90)}&hellip;
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
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
              className="fixed inset-x-4 inset-y-8 md:inset-x-[10%] md:inset-y-[5%] z-50 rounded-none overflow-y-auto border border-gray-200 bg-white"
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
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <X size={20} className="text-[#0d0d0d]" />
              </button>

              {/* Image hero */}
              <div className="relative h-56 md:h-72 bg-[#f0ece3]">
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
                <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">
                  {selected.slug}
                </span>
                <h3
                  className="text-3xl text-[#0d0d0d] mt-2"
                  style={{ fontFamily: "var(--font-archivo-black)" }}
                >
                  {selected.name}
                </h3>
                <p className="text-[12px] uppercase tracking-widest text-gray-400 mt-1">
                  {selected.type}
                </p>
                <p className="text-[16px] text-gray-600 mt-4 leading-relaxed font-serif">
                  {selected.description}
                </p>

                {/* Details */}
                <ul className="mt-6 space-y-3 list-none p-0">
                  {selected.details.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px] bg-[#5b9fd6]" />
                      <span className="text-[15px] text-gray-600 leading-relaxed">
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Quote */}
                {selected.quote && (
                  <blockquote className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-[17px] italic text-gray-700 leading-relaxed font-serif">
                      &ldquo;{selected.quote.text}&rdquo;
                    </p>
                    <footer className="text-[13px] text-gray-400 mt-3">
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
                      className="inline-flex items-center gap-2 border border-[#0d0d0d] px-6 py-3 text-[13px] tracking-[0.12em] uppercase text-[#0d0d0d] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d0d0d] [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
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
    </>
  );
}

export default function WorkGallery() {
  return (
    <Suspense fallback={null}>
      <WorkGalleryInner />
    </Suspense>
  );
}
