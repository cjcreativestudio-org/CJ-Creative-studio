"use client";

import Link from "next/link";
import EditorialNav from "@/components/editorial-nav";

const capabilities = [
  {
    index: "01",
    title: "Identity Systems",
    body: "Naming, visual logic, art direction, and reusable brand systems.",
  },
  {
    index: "02",
    title: "Digital Interfaces",
    body: "Premium product pages, editorial websites, and interaction systems.",
  },
  {
    index: "03",
    title: "Design Operations",
    body: "Component libraries, launch systems, and governance for scale.",
  },
];

export default function HomeClient() {
  return (
    <div className="bg-white">
      <EditorialNav />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-[#f0ece3] pt-14" aria-label="Hero">
        <div className="px-6 pt-12 pb-10">
          {/* Kicker row */}
          <div className="flex items-center justify-between mb-10">
            <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400">
              Boutique Digital Design Agency
            </span>
            <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400">
              United Kingdom
            </span>
          </div>

          {/* Display heading */}
          <h1
            className="text-[clamp(3.2rem,9.5vw,8.5rem)] leading-[0.9] text-[#0d0d0d] mb-8"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Quiet systems
            <br />
            for exacting
            <br />
            digital brands.
          </h1>

          {/* Rule + body */}
          <div className="flex items-start gap-8 mt-2">
            <div className="w-10 border-t-[2px] border-[#0d0d0d] mt-2 shrink-0" />
            <p className="max-w-[340px] text-[15px] leading-[1.65] text-gray-600 font-serif">
              CJ Studio builds refined identities, product interfaces, and web
              systems for founders and teams who value restraint, clarity, and
              craft.
            </p>
          </div>
        </div>

        {/* Media placeholder */}
        <div
          className="mx-6 mb-0 border border-gray-300 bg-[#eae7df] relative"
          style={{ height: "clamp(240px, 33vw, 460px)" }}
        >
          <span className="absolute top-4 left-5 text-[9px] tracking-[0.22em] uppercase text-gray-400">
            Reserved Media Plane
          </span>
          <div
            className="absolute left-4 right-4 border-t border-[#8ab4cc]"
            style={{ top: "58%" }}
          />
          <span className="absolute bottom-4 left-5 text-[9px] tracking-[0.22em] uppercase text-gray-400">
            Future 3D Scroll Animation Asset
          </span>
        </div>
      </section>

      {/* ── Methodology / Capabilities ───────────────────────── */}
      <section className="bg-white px-6 py-28" aria-label="Methodology and capabilities">
        <div className="max-w-[1280px] mx-auto">
          {/* Header row */}
          <div className="grid grid-cols-[auto_1fr] gap-x-8 items-start mb-16">
            <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-2 whitespace-nowrap">
              Methodology / Capabilities
            </span>
            <h2
              className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] text-right"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              A precise framework, without the ceremony.
            </h2>
          </div>

          {/* Capability cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-200">
            {capabilities.map(({ index, title, body }) => (
              <div
                key={index}
                className="border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0 p-8 flex flex-col justify-between"
                style={{ minHeight: "220px" }}
              >
                <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">{index}</span>
                <div className="flex flex-col gap-2 mt-auto">
                  <h3 className="text-[17px] font-bold italic text-[#1a1a1a] font-serif">
                    {title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-gray-500">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Selected Work ────────────────────────────────────── */}
      <section className="bg-white px-6 pb-28" aria-label="Selected work">
        <div className="max-w-[1280px] mx-auto">
          {/* Header row */}
          <div className="grid grid-cols-[auto_1fr] gap-x-8 items-start mb-14">
            <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-2 whitespace-nowrap">
              Selected Work
            </span>
            <h2
              className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] text-right"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Case-study frames for quiet, high-value launches.
            </h2>
          </div>

          {/* Carousel placeholder */}
          <div
            className="bg-[#f0ece3] flex items-center justify-center"
            style={{ height: "clamp(280px, 36vw, 500px)" }}
          >
            <span className="text-[13px] text-gray-400 tracking-wide">
              Scrolling carousel of portfolio work
            </span>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-[#0a0a0a]" aria-label="Site footer">
        <div className="px-4 pt-10 overflow-hidden">
          <p
            className="text-white leading-[0.85] select-none uppercase"
            style={{
              fontFamily: "var(--font-archivo-black)",
              fontSize: "clamp(3rem, 11vw, 13rem)",
            }}
          >
            CJ Creative
            <br />
            Studio
          </p>
        </div>
        <div className="px-6 py-5 flex items-center justify-between border-t border-white/[0.08] mt-6">
          <span className="text-[11px] text-white/40 tracking-wide">© 2026</span>
          <div className="hidden md:flex gap-6">
            {[
              { label: "Work", href: "/work" },
              { label: "Services", href: "/services" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Privacy", href: "/privacy" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[11px] text-white/30 hover:text-white/60 transition-colors tracking-wide"
              >
                {label}
              </Link>
            ))}
          </div>
          <span className="text-[11px] text-white/40 tracking-wide">London, United Kingdom</span>
        </div>
      </footer>
    </div>
  );
}
