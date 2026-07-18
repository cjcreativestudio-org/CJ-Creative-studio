"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useInView } from "motion/react";
import { projects, type Project } from "@/lib/projects";
import { EXPO } from "@/lib/easing";

const MotionLink = motion.create(Link);

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionLink
      ref={ref}
      href={`/work/${project.slug}`}
      aria-label={`View ${project.name} case study — ${project.type}`}
      className="bg-white flex flex-col group text-left cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A2540] border border-[#e0e0e0] hover:border-[#bbb] transition-colors duration-300"
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
    </MotionLink>
  );
}

export default function WorkGallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#111]">
      {projects.map((p, i) => (
        <ProjectCard key={p.slug} project={p} index={i} />
      ))}
    </div>
  );
}
