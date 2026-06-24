import type { Metadata } from "next";
import Link from "next/link";
import EditorialNav from "@/components/editorial-nav";

export const metadata: Metadata = {
  title: "About — CJ Studio",
  description: "Who we are, how we work, and the people behind CJ Studio.",
};

const founders = [
  {
    initials: "OJ",
    name: "Ollie Jackson",
    role: "Co-Founder / Design",
    bio: "Ollie leads visual direction and brand strategy. He believes good design is mostly about what you leave out.",
  },
  {
    initials: "JC",
    name: "Josh Carter",
    role: "Co-Founder / Development",
    bio: "Josh builds the systems that make design real. Clean code, considered architecture, zero shortcuts.",
  },
];

const principles = [
  {
    index: "01",
    title: "Restraint",
    body: "We remove before we add. Clarity is the default, noise is the exception.",
  },
  {
    index: "02",
    title: "Craft",
    body: "Every detail is considered. We don't ship work we wouldn't put our name on.",
  },
  {
    index: "03",
    title: "Directness",
    body: "We tell you what we think. No fluff, no over-promising, just honest work.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <EditorialNav />

      <main id="main-content">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="bg-[#f0ece3] pt-14" aria-label="About us hero">
          <div className="px-6 pt-12 pb-16">
            {/* Kicker row */}
            <div className="flex items-center justify-between mb-10">
              <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400">
                About Us
              </span>
              <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400">
                CJ Creative Studio
              </span>
            </div>

            {/* Display heading */}
            <h1
              className="text-[clamp(3.2rem,8.5vw,8.5rem)] leading-[0.9] text-[#0d0d0d] mb-10"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              We build with
              <br />
              restraint, clarity,
              <br />
              and craft.
            </h1>

            {/* Rule + body */}
            <div className="flex items-start gap-8">
              <div className="w-10 border-t-[2px] border-[#0d0d0d] mt-2 shrink-0" />
              <p className="max-w-[340px] text-[15px] leading-[1.65] text-gray-600 font-serif">
                A small studio. A precise point of view. Two founders who care
                about every pixel.
              </p>
            </div>
          </div>
        </section>

        {/* ── Founders ─────────────────────────────────────────── */}
        <section className="bg-white px-6 py-24" aria-label="The founders">
          <div className="max-w-[1280px] mx-auto">
            {/* Header row */}
            <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
              <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-2 whitespace-nowrap">
                The Founders
              </span>
              <h2
                className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] md:text-right"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                Two people.
                <br />
                One point of view.
              </h2>
            </div>

            {/* Founder cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {founders.map(({ initials, name, role, bio }) => (
                <div
                  key={initials}
                  className="border border-gray-200 p-8 flex flex-col gap-6 transition-[border-color] duration-[200ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:border-gray-400"
                >
                  {/* Avatar placeholder */}
                  <div
                    className="bg-[#f0ece3] flex items-center justify-center self-start"
                    style={{ width: "72px", height: "72px" }}
                    aria-hidden="true"
                  >
                    <span
                      className="text-[18px] text-[#0d0d0d] tracking-[0.1em]"
                      style={{ fontFamily: "var(--font-archivo-black)" }}
                    >
                      {initials}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3
                      className="text-[20px] font-bold italic text-[#1a1a1a] font-serif"
                    >
                      {name}
                    </h3>
                    <p className="text-[10px] tracking-[0.22em] uppercase text-[#5b9fd6]">
                      {role}
                    </p>
                  </div>

                  <p className="text-[14px] leading-relaxed text-gray-500">
                    {bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Principles ───────────────────────────────────────── */}
        <section className="bg-white px-6 pb-24" aria-label="Our principles">
          <div className="max-w-[1280px] mx-auto">
            {/* Header row */}
            <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
              <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-2 whitespace-nowrap">
                How We Work
              </span>
              <h2
                className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] md:text-right"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                Principles that guide
                <br />
                every project.
              </h2>
            </div>

            {/* Principle cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-200">
              {principles.map(({ index, title, body }) => (
                <div
                  key={index}
                  className="border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0 p-8 flex flex-col justify-between"
                  style={{ minHeight: "220px" }}
                >
                  <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">
                    {index}
                  </span>
                  <div className="flex flex-col gap-2 mt-auto">
                    <h3 className="text-[17px] font-bold italic text-[#1a1a1a] font-serif">
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

      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-[#0a0a0a]" aria-label="Site footer">
        <div className="px-4 pt-10 overflow-hidden">
          <p
            className="text-white leading-[0.85] select-none uppercase"
            style={{
              fontFamily: "var(--font-archivo-black)",
              fontSize: "clamp(3rem, 14vw, 16rem)",
            }}
          >
            <span style={{ display: "block", whiteSpace: "nowrap" }}>CJ Creative</span>
            <span style={{ display: "block", whiteSpace: "nowrap" }}>Studio</span>
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
                className="text-[11px] text-white/30 transition-[color] duration-[180ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:text-white/60 tracking-wide"
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
