import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditorialNav from "@/components/editorial-nav";
import EditorialFooter from "@/components/editorial-footer";
import MaskReveal from "@/components/mask-reveal";
import CaseStudyReveal from "@/components/case-study-reveal";
import { proposals } from "@/lib/proposals";

export const dynamicParams = false;

export function generateStaticParams() {
  return proposals.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const proposal = proposals.find((p) => p.slug === slug);
  if (!proposal) return {};

  const title = `Proposal — ${proposal.company} · CJ Studio`;
  const description = `A website proposal prepared by CJ Studio for ${proposal.company}.`;

  return {
    title: { absolute: title },
    description,
    // Private client document — keep out of search + do not follow onward links.
    robots: { index: false, follow: false },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/proposal/${proposal.slug}`,
    },
  };
}

export default async function ProposalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proposal = proposals.find((p) => p.slug === slug);
  if (!proposal) notFound();

  const mailto = `mailto:${proposal.cta.email}?subject=${encodeURIComponent(
    proposal.cta.subject
  )}`;

  return (
    <div className="bg-[#0a0a0a] isolate">
      <EditorialNav />

      <main id="main-content">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="bg-[#0a0a0a] pt-14" aria-label="Proposal introduction">
          <div className="px-6 pt-12 pb-16 max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between mb-10">
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#666]">
                Proposal · {proposal.date}
              </span>
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#666]">
                CJ Creative Studio
              </span>
            </div>

            <p className="text-[10px] tracking-[0.22em] uppercase text-[#5b9fd6] mb-5">
              {proposal.sector}
            </p>

            {proposal.headline.map((line, i) => (
              <MaskReveal key={line} delay={i * 0.08}>
                <h1
                  className="text-[clamp(2.4rem,7vw,6rem)] leading-[0.92] text-[#f0f0f0]"
                  style={{ fontFamily: "var(--font-archivo-black)" }}
                >
                  {line}
                </h1>
              </MaskReveal>
            ))}

            <div className="flex items-start gap-8 mt-8">
              <div className="w-10 border-t-[2px] border-[#f0f0f0] mt-2 shrink-0" />
              <p className="max-w-[520px] text-[15px] leading-[1.65] text-[#888] font-serif">
                {proposal.intro}
              </p>
            </div>

            <p
              className="mt-10 text-[11px] tracking-[0.14em] uppercase text-[#555]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              {proposal.preparedFor} · {proposal.validity}
            </p>
          </div>
        </section>

        {/* ── The Opportunity ──────────────────────────────────── */}
        <section className="bg-[#f5f5f5] px-6 py-24" aria-label="The opportunity">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-12">
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#aaa] mt-2 whitespace-nowrap">
                {proposal.opportunity.kicker}
              </span>
              <div>
                <MaskReveal>
                  <h2
                    className="text-[clamp(2rem,5vw,4rem)] leading-[0.95] text-[#0d0d0d]"
                    style={{ fontFamily: "var(--font-archivo-black)" }}
                  >
                    {proposal.opportunity.heading}
                  </h2>
                </MaskReveal>
                <p className="mt-6 max-w-[560px] text-[16px] leading-[1.6] text-[#555] italic font-serif">
                  {proposal.opportunity.lead}
                </p>
              </div>
            </div>

            <div className="border-t border-[#ddd] mt-4">
              {proposal.opportunity.points.map((pt, i) => (
                <CaseStudyReveal
                  key={pt}
                  delay={i * 0.05}
                  className="border-b border-[#ddd] py-8 px-2 md:px-8 grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-start"
                >
                  <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6] mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] leading-relaxed text-[#444] max-w-[760px]">
                    {pt}
                  </p>
                </CaseStudyReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Proof ────────────────────────────────────────────── */}
        <section className="bg-[#0a0a0a] px-6 py-24" aria-label="Relevant experience">
          <div className="max-w-[900px] mx-auto">
            <span className="text-[12px] tracking-[0.18em] uppercase text-[#666]">
              Proven on a site like yours
            </span>
            <CaseStudyReveal>
              <p className="mt-6 text-[clamp(1.2rem,2.6vw,1.9rem)] italic font-serif leading-[1.5] text-[#f0f0f0]">
                {proposal.proof.line}
              </p>
            </CaseStudyReveal>
            <Link
              href={`/work/${proposal.proof.projectSlug}`}
              className="inline-flex items-center gap-2 mt-8 text-[13px] tracking-[0.12em] uppercase text-[#5b9fd6] transition-opacity duration-[160ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-70"
            >
              See the {proposal.proof.project} case study →
            </Link>
          </div>
        </section>

        {/* ── Scope ────────────────────────────────────────────── */}
        <section className="bg-[#f5f5f5] px-6 py-24" aria-label="Proposed scope">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#aaa] mt-2 whitespace-nowrap">
                What We&apos;ll Build
              </span>
              <MaskReveal className="md:text-right">
                <h2
                  className="text-[clamp(2.4rem,6vw,5rem)] leading-[0.9] text-[#0d0d0d]"
                  style={{ fontFamily: "var(--font-archivo-black)" }}
                >
                  The scope.
                </h2>
              </MaskReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#ddd]">
              {proposal.scope.map((item, i) => (
                <CaseStudyReveal
                  key={item.title}
                  delay={(i % 2) * 0.06}
                  className="border-b border-r border-[#ddd] p-8 flex flex-col gap-3"
                >
                  <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[clamp(1.1rem,2vw,1.4rem)] italic font-serif text-[#0d0d0d]">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#555]">
                    {item.detail}
                  </p>
                </CaseStudyReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ─────────────────────────────────────────── */}
        <section className="bg-[#0a0a0a] px-6 py-24" aria-label="Project timeline">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#666] mt-2 whitespace-nowrap">
                The Plan
              </span>
              <MaskReveal className="md:text-right">
                <h2
                  className="text-[clamp(2.4rem,6vw,5rem)] leading-[0.9] text-[#f0f0f0]"
                  style={{ fontFamily: "var(--font-archivo-black)" }}
                >
                  Four weeks,
                  <br />
                  brief to launch.
                </h2>
              </MaskReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 border border-[#333]">
              {proposal.timeline.map((phase) => (
                <div
                  key={phase.week}
                  className="p-8 flex flex-col gap-3 border-b border-[#333] last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
                >
                  <span className="text-[10px] tracking-[0.22em] uppercase text-[#5b9fd6]">
                    {phase.week}
                  </span>
                  <h3 className="text-[16px] italic font-serif text-[#f0f0f0]">
                    {phase.name}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#888]">
                    {phase.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Investment ───────────────────────────────────────── */}
        <section className="bg-[#f5f5f5] px-6 py-24" aria-label="Investment and pricing">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#aaa] mt-2 whitespace-nowrap">
                Investment
              </span>
              <MaskReveal className="md:text-right">
                <h2
                  className="text-[clamp(2.4rem,6vw,5rem)] leading-[0.9] text-[#0d0d0d]"
                  style={{ fontFamily: "var(--font-archivo-black)" }}
                >
                  Simple, fixed pricing.
                </h2>
              </MaskReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {proposal.tiers.map((tier, i) => (
                <CaseStudyReveal key={tier.name} delay={i * 0.06} className="h-full">
                  <div
                    className={[
                      "h-full flex flex-col p-8 border",
                      tier.featured
                        ? "bg-[#0a0a0a] border-[#0a0a0a] text-[#f0f0f0]"
                        : "bg-white border-[#ddd] text-[#0d0d0d]",
                    ].join(" ")}
                  >
                    {tier.featured && (
                      <span className="text-[10px] tracking-[0.22em] uppercase text-[#5b9fd6] mb-4">
                        Recommended
                      </span>
                    )}
                    <h3 className="text-[18px] italic font-serif mb-3">{tier.name}</h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span
                        className="text-[clamp(2rem,4vw,2.8rem)] leading-none"
                        style={{ fontFamily: "var(--font-archivo-black)" }}
                      >
                        {tier.price}
                      </span>
                      <span
                        className={
                          tier.featured
                            ? "text-[12px] text-[#888]"
                            : "text-[12px] text-[#999]"
                        }
                      >
                        {tier.cadence}
                      </span>
                    </div>
                    <p
                      className={[
                        "text-[13px] leading-relaxed mb-6",
                        tier.featured ? "text-[#aaa]" : "text-[#666]",
                      ].join(" ")}
                    >
                      {tier.summary}
                    </p>
                    <ul className="flex flex-col gap-2 mt-auto">
                      {tier.features.map((f) => (
                        <li
                          key={f}
                          className={[
                            "text-[13px] leading-relaxed flex gap-2",
                            tier.featured ? "text-[#ccc]" : "text-[#555]",
                          ].join(" ")}
                        >
                          <span className="text-[#5b9fd6] shrink-0">—</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CaseStudyReveal>
              ))}
            </div>

            <p
              className="mt-10 max-w-[620px] text-[12px] leading-relaxed text-[#888]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              {proposal.investmentNote}
            </p>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="bg-[#0a0a0a] px-6 py-28" aria-label="Next steps">
          <div className="max-w-[1280px] mx-auto">
            <MaskReveal>
              <h2
                className="text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] text-[#f0f0f0] max-w-[900px]"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                {proposal.cta.heading}
              </h2>
            </MaskReveal>
            <p className="mt-8 max-w-[520px] text-[15px] leading-[1.65] text-[#888] font-serif">
              {proposal.cta.body}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-10">
              <a
                href={mailto}
                className="inline-block bg-[#0A2540] text-white px-8 py-4 text-[13px] tracking-[0.12em] uppercase font-medium transition-[background-color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d3060]"
              >
                Accept this proposal →
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[#f0f0f0] px-6 py-3 text-[13px] tracking-[0.12em] uppercase text-[#f0f0f0] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#f0f0f0] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0a0a0a]"
              >
                Ask a question
              </Link>
            </div>
          </div>
        </section>
      </main>

      <EditorialFooter />
    </div>
  );
}
