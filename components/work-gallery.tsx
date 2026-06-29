"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, useInView } from "motion/react";
import { ArrowUpRight, X } from "@phosphor-icons/react";
import { projects, type Project } from "@/lib/projects";
import { EXPO } from "@/lib/easing";

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onSelect(project)}
      className="bg-white flex flex-col group text-left cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A2540] border border-[#e0e0e0] hover:border-[#bbb] transition-colors duration-300"
      aria-label={`${project.name} — ${project.type}`}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 24 }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0.15 }
          : { duration: 0.6, ease: EXPO, delay: (index % 3) * 0.08 }
      }
    >
      {/* Browser chrome frame */}
      <div className="w-full bg-[#f0f0f0] border-b border-[#e0e0e0] px-3 py-2 flex items-center gap-1.5 flex-shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex-1 h-5 bg-[#ddd] rounded-sm" />
      </div>

      {/* Screenshot */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <Image
          src={project.img}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-[#0a0a0a]/40 transition-colors duration-300 flex items-center justify-center">
          <span className="text-[#f0f0f0] text-[11px] tracking-[0.2em] uppercase opacity-0 translate-y-2 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-y-0 transition-[opacity,transform] duration-300">
            View project →
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col gap-1.5">
        <span className="text-[10px] tracking-[0.22em] text-[#0A2540] uppercase">
          {project.slug}
        </span>
        <h3 className="font-serif italic font-bold text-[1.05rem] text-[#0d0d0d]">
          {project.name}
        </h3>
        <span className="text-[10px] tracking-[0.22em] uppercase text-[#555]">
          {project.type}
        </span>
        <p className="text-[13px] text-[#666] mt-1 leading-[1.6]">
          {project.description.slice(0, 90)}&hellip;
        </p>
      </div>
    </motion.button>
  );
}

function WorkGalleryInner() {
  const [selected, setSelected] = useState<Project | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const searchParams = useSearchParams();

  useEffect(() => {
    const slug = searchParams.get("project");
    if (!slug) return;
    const match = projects.find((p) => p.slug === slug);
    if (match) setSelected(match);
  }, [searchParams]);

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

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    if (selected) {
      // Reset modal scroll to top when a new project is opened
      const panel = document.querySelector<HTMLElement>('[role="dialog"]');
      if (panel) panel.scrollTop = 0;
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const backdropTransition = prefersReducedMotion ? { duration: 0.15 } : { duration: 0.2 };
  const panelInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 };
  const panelAnimate = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 };
  const panelExit = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 };
  const panelTransition = prefersReducedMotion
    ? { duration: 0.15 }
    : { type: "spring" as const, stiffness: 300, damping: 30 };

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#111]">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} onSelect={setSelected} />
        ))}
      </div>

      {/* Case study overlay */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
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
              className="fixed inset-x-4 inset-y-8 md:inset-x-[10%] md:inset-y-[5%] z-50 overflow-y-auto bg-[#141414] border border-[#2a2a2a]"
              initial={panelInitial}
              animate={panelAnimate}
              exit={panelExit}
              transition={panelTransition}
            >
              {/* Close */}
              <button
                type="button"
                autoFocus
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center bg-[#111] border border-[#333] hover:border-[#555] transition-colors duration-200"
              >
                <X size={18} className="text-[#f0f0f0]" />
              </button>

              {/* Hero image */}
              <div className="relative h-56 md:h-72 bg-[#111]">
                <Image
                  src={selected.img}
                  alt={selected.name}
                  fill
                  sizes="(max-width: 768px) 92vw, 80vw"
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]/60" />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                <span className="text-[10px] tracking-[0.22em] text-[#0A2540] uppercase">
                  {selected.slug}
                </span>
                <h3
                  className="text-3xl text-[#f0f0f0] mt-2"
                  style={{ fontFamily: "var(--font-archivo-black)" }}
                >
                  {selected.name}
                </h3>
                <p className="text-[11px] uppercase tracking-widest text-[#444] mt-1">
                  {selected.type}
                </p>
                <p className="text-[16px] text-[#888] mt-4 leading-relaxed font-serif">
                  {selected.description}
                </p>

                <ul className="mt-6 space-y-3 list-none p-0">
                  {selected.details.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span className="w-1.5 h-1.5 flex-shrink-0 mt-[9px] bg-[#0A2540]" />
                      <span className="text-[15px] text-[#888] leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>

                {selected.quote && (
                  <blockquote className="mt-8 pt-6 border-t border-[#1e1e1e]">
                    <p className="text-[17px] italic text-[#aaa] leading-relaxed font-serif">
                      &ldquo;{selected.quote.text}&rdquo;
                    </p>
                    <footer className="text-[13px] text-[#444] mt-3">
                      {selected.quote.author}
                    </footer>
                  </blockquote>
                )}

                {selected.url && (
                  <div className="mt-8">
                    <a
                      href={selected.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-[#f0f0f0] px-6 py-3 text-[13px] tracking-[0.12em] uppercase text-[#f0f0f0] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#f0f0f0] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0a0a0a]"
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
