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

      {/* Hero */}
      <section
        className="bg-[#f0ece3] pt-14"
        aria-label="Hero"
      >
        <div className="px-6 pt-12 pb-10">
          {/* Kicker row */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400">
              Boutique Digital Design Agency
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400">
              United Kingdom
            </span>
          </div>

          {/* Display heading */}
          <h1
            className="text-[clamp(3.5rem,9vw,8rem)] leading-[0.92] text-gray-950 mb-6"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Quiet systems
            <br />
            for exacting
            <br />
            digital brands.
          </h1>

          {/* Rule + body */}
          <div className="flex flex-col gap-4">
            <div className="w-12 border-t-2 border-gray-900" />
            <p className="ml-16 max-w-xs text-[15px] leading-relaxed text-gray-600 font-serif">
              CJ Studio builds refined identities, product interfaces, and web
              systems for founders and teams who value restraint, clarity, and
              craft.
            </p>
          </div>
        </div>

        {/* Media placeholder */}
        <div className="mx-6 mb-0 border border-gray-300 bg-[#eceae2] relative" style={{ height: "clamp(260px, 35vw, 480px)" }}>
          <span className="absolute top-4 left-5 text-[9px] tracking-[0.2em] uppercase text-gray-400">
            Reserved Media Plane
          </span>
          <div className="absolute left-0 right-0 border-t border-[#a8c4d4]" style={{ top: "55%" }} />
          <span className="absolute bottom-4 left-5 text-[9px] tracking-[0.2em] uppercase text-gray-400">
            Future 3D Scroll Animation Asset
          </span>
        </div>
      </section>

      {/* Methodology / Capabilities */}
      <section className="bg-white px-6 py-24" aria-label="Methodology and capabilities">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-16">
            <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mt-1">
              Methodology / Capabilities
            </span>
            <h2
              className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.92] text-gray-950 md:text-right max-w-2xl"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              A precise
              <br />
              framework,
              <br />
              without the
              <br />
              ceremony.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-200">
            {capabilities.map(({ index, title, body }) => (
              <div
                key={index}
                className="border-b md:border-b-0 md:border-r border-gray-200 last:border-0 p-8 flex flex-col gap-16"
              >
                <span className="text-[10px] tracking-[0.2em] text-sky-500">{index}</span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-[17px] font-bold italic text-gray-900 font-serif">
                    {title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-gray-500">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="bg-white px-6 pb-24" aria-label="Selected work">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
            <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mt-1">
              Selected Work
            </span>
            <h2
              className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.92] text-gray-950 md:text-right max-w-2xl"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Case-study frames
              <br />
              for quiet, high-
              <br />
              value launches.
            </h2>
          </div>

          {/* Carousel placeholder */}
          <div className="bg-[#f0ece3] flex items-center justify-center" style={{ height: "clamp(280px, 38vw, 520px)" }}>
            <span className="text-[13px] text-gray-400">Scrolling carousel of portfolio work</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black" aria-label="Site footer">
        <div className="px-4 pt-10 pb-0 overflow-hidden">
          <p
            className="text-white leading-none whitespace-nowrap"
            style={{
              fontFamily: "var(--font-archivo-black)",
              fontSize: "clamp(4rem, 18vw, 18rem)",
            }}
          >
            CJ Creative
            <br />
            Studio
          </p>
        </div>
        <div className="px-6 py-6 flex items-center justify-between border-t border-white/10 mt-4">
          <span className="text-[11px] text-white/50 tracking-wide">© 2026</span>
          <div className="flex gap-6">
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
                className="text-[11px] text-white/40 hover:text-white/70 transition-colors tracking-wide"
              >
                {label}
              </Link>
            ))}
          </div>
          <span className="text-[11px] text-white/50 tracking-wide">London, United Kingdom</span>
        </div>
      </footer>
    </div>
  );
}
