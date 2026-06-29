import type { Metadata } from "next";
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
    <div id="main-content" className="bg-[#0a0a0a] isolate">
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
      <section className="bg-[#f5f5f5] py-24" aria-label="All projects">
        <div className="px-6">
          {/* Section label + heading */}
          <div className="flex items-start justify-between mb-14">
            <span className="text-[12px] tracking-[0.18em] uppercase text-[#aaa] mt-1">
              All Projects
            </span>
            <MaskReveal className="text-right max-w-[480px]">
              <h2
                className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] text-[#0d0d0d]"
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

      <EditorialFooter />
    </div>
  );
}
