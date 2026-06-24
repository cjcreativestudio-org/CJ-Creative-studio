import type { Metadata } from "next";
import Link from "next/link";
import EditorialNav from "@/components/editorial-nav";
import WorkGallery from "@/components/work-gallery";

export const metadata: Metadata = {
  title: "Work — CJ Studio",
  description:
    "Selected case studies from CJ Studio — quiet, high-value launches for UK brands.",
};

export default function WorkPage() {
  return (
    <div id="main-content" className="bg-white">
      <EditorialNav />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-[#f0ece3] pt-14" aria-label="Selected work hero">
        <div className="px-6 pt-12 pb-14">
          {/* Kicker row */}
          <div className="flex items-center justify-between mb-10">
            <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400">
              Selected Work
            </span>
            <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400">
              CJ Creative Studio
            </span>
          </div>

          {/* Display heading */}
          <h1
            className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] mb-8"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Case studies for quiet,
            <br />
            high-value launches.
          </h1>

          {/* Rule + body */}
          <div className="flex items-start gap-8 mt-2">
            <div className="w-10 border-t-[2px] border-[#0d0d0d] mt-2 shrink-0" />
            <p className="max-w-[340px] text-[15px] leading-[1.65] text-gray-600 font-serif">
              A curated record of brands built with restraint. Real clients,
              real results.
            </p>
          </div>
        </div>
      </section>

      {/* ── Project Grid ─────────────────────────────────────── */}
      <section className="bg-white py-24" aria-label="All projects">
        <div className="px-6">
          {/* Section label + heading */}
          <div className="flex items-start justify-between mb-14">
            <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-1">
              All Projects
            </span>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] text-[#0d0d0d] text-right max-w-[480px]"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Every project,
              <br />
              every detail.
            </h2>
          </div>

          <WorkGallery />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-[#f0ece3] py-24" aria-label="Start a project">
        <div className="px-6">
          <div className="flex items-start justify-between mb-12">
            <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-1">
              Start a Project
            </span>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] text-[#0d0d0d] text-right max-w-[520px]"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Got a project in mind?
              <br />
              Let&apos;s talk.
            </h2>
          </div>

          <div className="flex justify-end">
            <Link
              href="/contact"
              className="border border-gray-900 px-6 py-3 text-[11px] tracking-widest uppercase text-[#0d0d0d] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d0d0d] [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
            >
              Get in touch →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-[#0d0d0d] px-6 py-16" aria-label="Site footer">
        <p
          className="text-white text-[clamp(2.2rem,7vw,6rem)] leading-[0.9] uppercase tracking-tight"
          style={{ fontFamily: "var(--font-archivo-black)" }}
        >
          CJ Creative
          <br />/ Studio
        </p>
        <div className="mt-10 flex items-center justify-between">
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-500">
            © 2025 CJ Studio
          </span>
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-500">
            United Kingdom
          </span>
        </div>
      </footer>
    </div>
  );
}
