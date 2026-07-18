import type { Metadata } from "next";
import Link from "next/link";
import EditorialNav from "@/components/editorial-nav";
import EditorialFooter from "@/components/editorial-footer";
import MaskReveal from "@/components/mask-reveal";
import CaseStudyReveal from "@/components/case-study-reveal";
import CopyButton from "@/components/copy-button";
import {
  leads,
  STATUS_ORDER,
  STATUS_META,
  groupByStatus,
  countByStatus,
  sortByNextActionDate,
  pipelineSummary,
  formatDate,
} from "@/lib/leads";
import { getOutreachDraft } from "@/lib/outreach";

// Private internal document — keep out of search + do not follow onward links.
// Same unlisted pattern as /proposal: noindex here, absent from sitemap/robots/nav.
export const metadata: Metadata = {
  title: { absolute: "Lead Pipeline · CJ Studio (internal)" },
  description: "Private internal lead pipeline for CJ Studio.",
  robots: { index: false, follow: false },
};

export default function LeadsPage() {
  const summary = pipelineSummary(leads);
  const counts = countByStatus(leads);
  const groups = groupByStatus(leads);

  const stats: { value: number; label: string }[] = [
    { value: summary.inPipeline, label: "In pipeline" },
    { value: summary.proposalsOut, label: "Proposals out" },
    { value: summary.won, label: "Won" },
    { value: summary.total, label: "Total leads" },
  ];

  return (
    <div className="bg-[#0a0a0a] isolate">
      <EditorialNav />

      <main id="main-content">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="bg-[#0a0a0a] pt-14" aria-label="Lead pipeline overview">
          <div className="px-6 pt-12 pb-16 max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between mb-10">
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#666]">
                Internal · Lead Pipeline
              </span>
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#666]">
                CJ Creative Studio
              </span>
            </div>

            <MaskReveal>
              <h1
                className="text-[clamp(2.4rem,7vw,6rem)] leading-[0.92] text-[#f0f0f0]"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                The pipeline.
              </h1>
            </MaskReveal>

            <div className="flex items-start gap-8 mt-8">
              <div className="w-10 border-t-[2px] border-[#f0f0f0] mt-2 shrink-0" />
              <p className="max-w-[520px] text-[15px] leading-[1.65] text-[#888] font-serif">
                Every scraped lead and where it stands. Private — not linked, not
                indexed.
              </p>
            </div>

            {/* Headline stats */}
            <div className="flex flex-wrap gap-x-12 gap-y-6 mt-12">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-2">
                  <span
                    className="text-[clamp(2rem,5vw,3.5rem)] leading-none text-[#f0f0f0]"
                    style={{ fontFamily: "var(--font-archivo-black)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-[11px] tracking-[0.14em] uppercase text-[#555]"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Full status legend (all six states, incl. zeros) */}
            <p
              className="mt-10 text-[11px] tracking-[0.06em] text-[#555]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              {STATUS_ORDER.map((status, i) => (
                <span key={status}>
                  {i > 0 && <span className="text-[#333]"> · </span>}
                  {status} {counts[status]}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* ── Pipeline by status ───────────────────────────────── */}
        <section
          className="bg-[#f5f5f5] px-6 py-24"
          aria-label="Lead pipeline by status"
        >
          <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
            {STATUS_ORDER.map((status) => {
              const items = sortByNextActionDate(groups[status]);
              if (items.length === 0) return null; // no empty bands

              return (
                <div key={status}>
                  <div className="flex items-baseline gap-4 mb-8">
                    <MaskReveal>
                      <h2
                        className="text-[clamp(1.6rem,4vw,2.6rem)] leading-none text-[#0d0d0d]"
                        style={{ fontFamily: "var(--font-archivo-black)" }}
                      >
                        {STATUS_META[status].label}
                      </h2>
                    </MaskReveal>
                    <span
                      className="text-[13px] text-[#5b9fd6]"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      ({items.length})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#ddd]">
                    {items.map((lead, i) => {
                      const draft = getOutreachDraft(lead.slug);
                      return (
                      <CaseStudyReveal
                        key={lead.slug}
                        delay={(i % 3) * 0.06}
                        className="border-b border-r border-[#ddd] p-8 flex flex-col gap-3"
                      >
                        {/* Source · location */}
                        <div className="flex flex-wrap items-center gap-x-2">
                          <span className="text-[10px] tracking-[0.22em] uppercase text-[#5b9fd6]">
                            {lead.source}
                          </span>
                          {lead.location && (
                            <span className="text-[10px] tracking-[0.14em] uppercase text-[#aaa]">
                              · {lead.location}
                            </span>
                          )}
                        </div>

                        {/* Business */}
                        <h3 className="text-[clamp(1.1rem,2vw,1.4rem)] italic font-serif text-[#0d0d0d]">
                          {lead.business}
                        </h3>

                        {/* Sector */}
                        {lead.sector && (
                          <span className="text-[12px] text-[#999]">
                            {lead.sector}
                          </span>
                        )}

                        {/* Contact */}
                        {lead.contact &&
                          (lead.contact.includes("@") ? (
                            <a
                              href={`mailto:${lead.contact}`}
                              className="text-[12px] text-[#555] transition-opacity duration-[160ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-70"
                              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                            >
                              {lead.contact}
                            </a>
                          ) : (
                            <span
                              className="text-[12px] text-[#555]"
                              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                            >
                              {lead.contact}
                            </span>
                          ))}

                        {/* Next action */}
                        {lead.nextAction && (
                          <p className="text-[13px] text-[#555]">
                            {lead.nextAction}
                            {lead.nextActionDate && (
                              <>
                                {" · "}
                                <span
                                  className="text-[#5b9fd6]"
                                  style={{
                                    fontFamily: "var(--font-jetbrains-mono)",
                                  }}
                                >
                                  {formatDate(lead.nextActionDate)}
                                </span>
                              </>
                            )}
                          </p>
                        )}

                        {/* Notes */}
                        {lead.notes && (
                          <p className="text-[12px] leading-relaxed text-[#999]">
                            {lead.notes}
                          </p>
                        )}

                        {/* Proposal link + ready-to-send cold email — the deliverable */}
                        {(lead.proposalSlug || draft) && (
                          <div className="mt-auto flex flex-col gap-4 pt-4">
                            {lead.proposalSlug && (
                              <Link
                                href={`/proposal/${lead.proposalSlug}`}
                                className="inline-flex items-center gap-2 text-[13px] tracking-[0.12em] uppercase text-[#5b9fd6] transition-opacity duration-[160ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-70"
                              >
                                View proposal →
                              </Link>
                            )}
                            {draft && (
                              <div className="border border-[#ddd] bg-white">
                                <div className="flex items-center justify-between gap-3 border-b border-[#ddd] px-3 py-2">
                                  <span
                                    className="text-[10px] tracking-[0.18em] uppercase text-[#999]"
                                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                                  >
                                    Cold email · ready to send
                                  </span>
                                  <CopyButton
                                    text={`Subject: ${draft.subject}\n\n${draft.body}`}
                                  />
                                </div>
                                <div className="flex flex-col gap-2 px-3 py-3">
                                  <p
                                    className="text-[11px] text-[#0d0d0d]"
                                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                                  >
                                    <span className="text-[#999]">Subject: </span>
                                    {draft.subject}
                                  </p>
                                  <pre
                                    className="min-w-0 max-h-64 overflow-auto whitespace-pre-wrap break-words select-text text-[11px] leading-relaxed text-[#555]"
                                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                                  >
                                    {draft.body}
                                  </pre>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </CaseStudyReveal>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <EditorialFooter />
    </div>
  );
}
