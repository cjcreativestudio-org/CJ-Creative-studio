import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditorialNav from "@/components/editorial-nav";
import EditorialFooter from "@/components/editorial-footer";
import MaskReveal from "@/components/mask-reveal";
import CaseStudyReveal from "@/components/case-study-reveal";
import BookCallCta from "@/components/book-call-cta";
import { demos, getDemo } from "@/lib/demos";

export const dynamicParams = false;

export function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) return {};

  const title = `A website demo for ${demo.businessName} · CJ Studio`;
  const description = `A tailored website demo built by CJ Studio for ${demo.businessName}, ${demo.town}.`;

  return {
    title: { absolute: title },
    description,
    // Private, per-lead demo link — keep out of search + do not follow onward links.
    robots: { index: false, follow: false },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/demo/${demo.slug}`,
    },
  };
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) notFound();

  // Booking (Brick 7): the primary CTA books a real Cal.com call. The Cal.com
  // handle/event is env-configured; NEXT_PUBLIC_CALCOM_LINK is inlined here at
  // build time. Until Ollie sets it (empty here in prod), calLink is undefined
  // and BookCallCta degrades to the interim mailto below — the public page never
  // shows a broken/empty widget, and arms the moment the env var is present.
  const calLink = process.env.NEXT_PUBLIC_CALCOM_LINK?.trim() || undefined;
  const mailtoHref = `mailto:${demo.cta.email}?subject=${encodeURIComponent(
    demo.cta.bookingSubject
  )}`;

  return (
    <div className="bg-[#0a0a0a] isolate">
      <EditorialNav />

      <main id="main-content">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="bg-[#0a0a0a] pt-14" aria-label="Demo introduction">
          <div className="px-6 pt-12 pb-16 max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between mb-10">
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#666]">
                Live demo
              </span>
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#666]">
                CJ Creative Studio
              </span>
            </div>

            <p className="text-[10px] tracking-[0.22em] uppercase text-[#5b9fd6] mb-5">
              {demo.sector}
            </p>

            {demo.headline.map((line, i) => (
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
                {demo.intro}
              </p>
            </div>

            <p
              className="mt-10 text-[11px] tracking-[0.14em] uppercase text-[#555]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Demo prepared for {demo.businessName} · {demo.town}
            </p>
          </div>
        </section>

        {/* ── Your site today (the "before") ───────────────────── */}
        <section className="bg-[#f5f5f5] px-6 py-24" aria-label="Your current website">
          <div className="max-w-[1080px] mx-auto">
            <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-12">
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#aaa] mt-2 whitespace-nowrap">
                Your site today
              </span>
              <div>
                <MaskReveal>
                  <h2
                    className="text-[clamp(2rem,5vw,4rem)] leading-[0.95] text-[#0d0d0d]"
                    style={{ fontFamily: "var(--font-archivo-black)" }}
                  >
                    Your current website.
                  </h2>
                </MaskReveal>
                {demo.review && (
                  <p className="mt-6 max-w-[560px] text-[16px] leading-[1.6] text-[#555] italic font-serif">
                    Rated {demo.review.rating}&#9733; across {demo.review.count}{" "}
                    Google reviews. Your current site isn&rsquo;t showing that off.
                  </p>
                )}
              </div>
            </div>

            {/* Browser-chrome frame — pattern from home-work / sprint proof, no motion */}
            <CaseStudyReveal>
              <div className="border border-[#e0e0e0] rounded-sm overflow-hidden bg-white">
                <div className="bg-[#f0f0f0] border-b border-[#e0e0e0] px-3 py-2 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <span
                    className="ml-3 rounded-sm bg-white px-3 py-1 text-[11px] text-[#999]"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    {demo.currentSiteUrl}
                  </span>
                </div>
                <div
                  className="relative w-full overflow-hidden bg-[#ececec]"
                  style={{ height: "clamp(240px, 42vw, 460px)" }}
                >
                  {demo.beforeScreenshot ? (
                    // Runtime-provided remote screenshot (Brick 2 blob); next/image
                    // would need per-host remotePatterns we can't predict here.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={demo.beforeScreenshot}
                      alt={`The current ${demo.businessName} website`}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
                      <span
                        className="text-[11px] tracking-[0.22em] uppercase text-[#999]"
                        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                      >
                        {demo.currentSiteUrl}
                      </span>
                      <span className="max-w-[360px] text-[13px] leading-relaxed text-[#777]">
                        A live snapshot of your current site appears here.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CaseStudyReveal>

            {/* Outdated flags — the specific signals we detected */}
            <div className="border-t border-[#ddd] mt-12">
              {demo.outdatedFlags.map((flag, i) => (
                <CaseStudyReveal
                  key={flag}
                  delay={i * 0.05}
                  className="border-b border-[#ddd] py-8 px-2 md:px-8 grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-start"
                >
                  <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6] mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] leading-relaxed text-[#444] max-w-[760px]">
                    {flag}
                  </p>
                </CaseStudyReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── The upgrade (the speed-build offer) ──────────────── */}
        <section className="bg-[#0a0a0a] px-6 py-24" aria-label="What we would build">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-8">
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#666] mt-2 whitespace-nowrap">
                {demo.offerKicker}
              </span>
              <div>
                <MaskReveal>
                  <h2
                    className="text-[clamp(2.2rem,6vw,5rem)] leading-[0.92] text-[#f0f0f0]"
                    style={{ fontFamily: "var(--font-archivo-black)" }}
                  >
                    {demo.offerHeading}
                  </h2>
                </MaskReveal>
                <p className="mt-6 max-w-[560px] text-[16px] leading-[1.6] text-[#888] italic font-serif">
                  {demo.offerLead}
                </p>
                <p
                  className="mt-6 text-[clamp(1.3rem,3vw,2rem)] text-[#5b9fd6]"
                  style={{ fontFamily: "var(--font-archivo-black)" }}
                >
                  {demo.turnaround}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#333] mt-8">
              {demo.offer.map((item, i) => (
                <CaseStudyReveal
                  key={item.title}
                  delay={(i % 2) * 0.06}
                  className="border-b border-r border-[#333] p-8 flex flex-col gap-3"
                >
                  <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[clamp(1.1rem,2vw,1.4rem)] italic font-serif text-[#f0f0f0]">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#888]">
                    {item.detail}
                  </p>
                </CaseStudyReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Proof ────────────────────────────────────────────── */}
        <section className="bg-[#f5f5f5] px-6 py-24" aria-label="Relevant experience">
          <div className="max-w-[900px] mx-auto">
            <span className="text-[12px] tracking-[0.18em] uppercase text-[#aaa]">
              Proven on a site like yours
            </span>
            <CaseStudyReveal>
              <p className="mt-6 text-[clamp(1.2rem,2.6vw,1.9rem)] italic font-serif leading-[1.5] text-[#0d0d0d]">
                {demo.proof.line}
              </p>
            </CaseStudyReveal>
            <Link
              href={`/work/${demo.proof.projectSlug}`}
              className="inline-flex items-center gap-2 mt-8 text-[13px] tracking-[0.12em] uppercase text-[#5b9fd6] transition-opacity duration-[160ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-70"
            >
              See the {demo.proof.project} case study →
            </Link>
          </div>
        </section>

        {/* ── CTA: book a call ─────────────────────────────────── */}
        <section className="bg-[#0a0a0a] px-6 py-28" aria-label="Book a call">
          <div className="max-w-[1280px] mx-auto">
            <MaskReveal>
              <h2
                className="text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] text-[#f0f0f0] max-w-[900px]"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                {demo.cta.heading}
              </h2>
            </MaskReveal>
            <p className="mt-8 max-w-[520px] text-[15px] leading-[1.65] text-[#888] font-serif">
              {demo.cta.body}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-10">
              <BookCallCta
                calLink={calLink}
                mailtoHref={mailtoHref}
                prefillName={demo.businessName}
                label="Book your free 20-min call →"
                className="inline-block bg-[#0A2540] text-white px-8 py-4 text-[13px] tracking-[0.12em] uppercase font-medium transition-[background-color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d3060]"
              />
              <Link
                href="/sprint"
                className="inline-flex items-center gap-2 border border-[#f0f0f0] px-6 py-3 text-[13px] tracking-[0.12em] uppercase text-[#f0f0f0] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#f0f0f0] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0a0a0a]"
              >
                See the full offer
              </Link>
            </div>
            <p
              className="mt-8 text-[11px] tracking-[0.14em] uppercase text-[#555]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              No obligation. A real site, built in days.
            </p>
          </div>
        </section>
      </main>

      <EditorialFooter />
    </div>
  );
}
