import type { Metadata } from "next";
import EditorialNav from "@/components/editorial-nav";
import EditorialFooter from "@/components/editorial-footer";
import MaskReveal from "@/components/mask-reveal";

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
    <div className="bg-[#0a0a0a]">
      <EditorialNav />

      <main id="main-content">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="bg-[#0a0a0a] pt-14" aria-label="About us hero">
          <div className="px-6 pt-12 pb-16">
            {/* Kicker row */}
            <div className="flex items-center justify-between mb-10">
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#666]">
                About Us
              </span>
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#666]">
                CJ Creative Studio
              </span>
            </div>

            {/* Display heading — each line a separate MaskReveal */}
            <MaskReveal delay={0}>
              <h1
                className="text-[clamp(3.2rem,8.5vw,8.5rem)] leading-[0.9] text-[#f0f0f0]"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                We build with
              </h1>
            </MaskReveal>
            <MaskReveal delay={0.1}>
              <h1
                className="text-[clamp(3.2rem,8.5vw,8.5rem)] leading-[0.9] text-[#f0f0f0]"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                restraint, clarity,
              </h1>
            </MaskReveal>
            <MaskReveal delay={0.2}>
              <h1
                className="text-[clamp(3.2rem,8.5vw,8.5rem)] leading-[0.9] text-[#f0f0f0] mb-10"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                and craft.
              </h1>
            </MaskReveal>

            {/* Rule + body */}
            <div className="flex items-start gap-8">
              <div className="w-10 border-t-[2px] border-[#f0f0f0] mt-2 shrink-0" />
              <p className="max-w-[340px] text-[15px] leading-[1.65] text-[#888] font-serif">
                A small studio. A precise point of view. Two founders who care
                about every pixel.
              </p>
            </div>
          </div>
        </section>

        {/* ── Founders ─────────────────────────────────────────── */}
        <section className="bg-[#f5f5f5] px-6 py-24" aria-label="The founders">
          <div className="max-w-[1280px] mx-auto">
            {/* Header row */}
            <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#aaa] mt-2 whitespace-nowrap">
                The Founders
              </span>
              <MaskReveal className="md:text-right">
                <h2
                  className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d]"
                  style={{ fontFamily: "var(--font-archivo-black)" }}
                >
                  Two people.
                  <br />
                  One point of view.
                </h2>
              </MaskReveal>
            </div>

            {/* Founder cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {founders.map(({ initials, name, role, bio }) => (
                <div
                  key={initials}
                  className="border border-[#e0e0e0] bg-white p-8 flex flex-col gap-6 transition-[border-color] duration-[200ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#bbb]"
                >
                  {/* Avatar */}
                  <div
                    className="bg-[#0a0a0a] flex items-center justify-center self-start"
                    style={{ width: "72px", height: "72px" }}
                    aria-hidden="true"
                  >
                    <span
                      className="text-[18px] text-[#f0f0f0] tracking-[0.1em]"
                      style={{ fontFamily: "var(--font-archivo-black)" }}
                    >
                      {initials}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-[20px] italic text-[#0d0d0d] font-serif">
                      {name}
                    </h3>
                    <p className="text-[10px] tracking-[0.22em] uppercase text-[#5b9fd6]">
                      {role}
                    </p>
                  </div>

                  <p className="text-[14px] leading-relaxed text-[#555]">
                    {bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Principles ───────────────────────────────────────── */}
        <section className="bg-[#0a0a0a] px-6 py-24" aria-label="Our principles">
          <div className="max-w-[1280px] mx-auto">
            {/* Header row */}
            <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#666] mt-2 whitespace-nowrap">
                How We Work
              </span>
              <MaskReveal className="md:text-right">
                <h2
                  className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#f0f0f0]"
                  style={{ fontFamily: "var(--font-archivo-black)" }}
                >
                  Principles that guide
                  <br />
                  every project.
                </h2>
              </MaskReveal>
            </div>

            {/* Principle cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 border border-[#333]">
              {principles.map(({ index, title, body }) => (
                <div
                  key={index}
                  className="border-b md:border-b-0 md:border-r border-[#333] last:border-r-0 bg-[rgba(10,10,10,0.6)] p-8 flex flex-col justify-between"
                  style={{ minHeight: "220px" }}
                >
                  <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">
                    {index}
                  </span>
                  <div className="flex flex-col gap-2 mt-auto">
                    <h3 className="text-[17px] italic text-[#f0f0f0] font-serif">
                      {title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-[#888]">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <EditorialFooter />
    </div>
  );
}
