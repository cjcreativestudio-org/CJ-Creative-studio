import type { Metadata } from "next";
import Link from "next/link";
import EditorialNav from "@/components/editorial-nav";
import EditorialFooter from "@/components/editorial-footer";
import WorkGallery from "@/components/work-gallery";
import MaskReveal from "@/components/mask-reveal";

export const metadata: Metadata = {
  title: "Work — CJ Studio",
  description:
    "Selected case studies from CJ Studio — quiet, high-value launches for UK brands.",
};

export default function WorkPage() {
  return (
    <div id="main-content" className="bg-[#0a0a0a]">
      <EditorialNav />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] pt-14" aria-label="Selected work hero">
        <div className="px-6 pt-12 pb-14">
          {/* Kicker row */}
          <div className="flex items-center justify-between mb-10">
            <span className="text-[12px] tracking-[0.18em] uppercase text-[#666]">
              Selected Work
            </span>
            <span className="text-[12px] tracking-[0.18em] uppercase text-[#666]">
              CJ Creative Studio
            </span>
          </div>

          {/* Display heading */}
          <MaskReveal>
            <h1
              className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#f0f0f0] mb-8"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Case studies for quiet,
              <br />
              high-value launches.
            </h1>
          </MaskReveal>

          {/* Rule + body */}
          <div className="flex items-start gap-8 mt-2">
            <div className="w-10 border-t-[2px] border-[#f0f0f0] mt-2 shrink-0" />
            <p className="max-w-[340px] text-[15px] leading-[1.65] text-[#888] font-serif">
              A curated record of brands built with restraint. Real clients,
              real results.
            </p>
          </div>
        </div>
      </section>

      {/* ── Project Grid ─────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] py-24 isolate" aria-label="All projects">
        <div className="px-6">
          {/* Section label + heading */}
          <div className="flex items-start justify-between mb-14">
            <span className="text-[12px] tracking-[0.18em] uppercase text-[#555] mt-1">
              All Projects
            </span>
            <MaskReveal className="text-right max-w-[480px]">
              <h2
                className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] text-[#f0f0f0]"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                Every project,
                <br />
                every detail.
              </h2>
            </MaskReveal>
          </div>

          <WorkGallery />
        </div>
      </section>

      {/* ── Video ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: "60vh" }} aria-hidden="true">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/assets/video/geo-bg.mp4" type="video/mp4" />
        </video>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] py-24" aria-label="Start a project">
        <div className="px-6">
          <div className="flex items-start justify-between mb-12">
            <div className="max-w-[520px]">
              <MaskReveal>
                <h2
                  className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] text-[#f0f0f0]"
                  style={{ fontFamily: "var(--font-archivo-black)" }}
                >
                  Let&apos;s build something
                </h2>
              </MaskReveal>
              <MaskReveal delay={0.1}>
                <h2
                  className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] text-[#0A2540]"
                  style={{ fontFamily: "var(--font-archivo-black)" }}
                >
                  precise.
                </h2>
              </MaskReveal>
            </div>
            <div className="flex flex-col items-end justify-between gap-8 text-right max-w-[340px]">
              <p className="text-[15px] leading-[1.65] text-[#888] font-serif">
                Got a project in mind? Let&apos;s talk.
              </p>
              <Link
                href="/contact"
                className="border border-[#f0f0f0] px-6 py-3 text-[11px] tracking-widest uppercase text-[#f0f0f0] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#f0f0f0] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0a0a0a]"
              >
                Get in touch →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}
