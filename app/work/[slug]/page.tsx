import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import EditorialNav from "@/components/editorial-nav";
import EditorialFooter from "@/components/editorial-footer";
import MaskReveal from "@/components/mask-reveal";
import CaseStudyReveal from "@/components/case-study-reveal";
import { projects } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.name} — CJ Studio`;
  const altText = `${project.name} — ${project.type}, a website by CJ Studio`;

  return {
    title: { absolute: title },
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description: project.description,
      url: `/work/${project.slug}`,
      images: [{ url: project.img, alt: altText }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: [project.img],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const num = String(idx + 1).padStart(2, "0");
  const total = String(projects.length).padStart(2, "0");
  const altText = `${project.name} — ${project.type}`;

  return (
    <div className="bg-[#0a0a0a] isolate">
      <EditorialNav />

      <main id="main-content">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="bg-[#0a0a0a] pt-14" aria-label={`${project.name} case study introduction`}>
          <div className="px-6 pt-12 pb-16 max-w-[1280px] mx-auto">
            {/* Kicker row */}
            <div className="flex items-center justify-between mb-10">
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#666]">
                Case Study — {num}/{total}
              </span>
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#666]">
                CJ Creative Studio
              </span>
            </div>

            {/* Type eyebrow */}
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#5b9fd6] mb-5">
              {project.type}
            </p>

            {/* Display heading */}
            <MaskReveal>
              <h1
                className="text-[clamp(2.6rem,7vw,6rem)] leading-[0.9] text-[#f0f0f0]"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                {project.name}
              </h1>
            </MaskReveal>

            {/* Rule + description */}
            <div className="flex items-start gap-8 mt-8">
              <div className="w-10 border-t-[2px] border-[#f0f0f0] mt-2 shrink-0" />
              <p className="max-w-[440px] text-[15px] leading-[1.65] text-[#888] font-serif">
                {project.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 mt-10">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#0A2540] text-white px-8 py-4 text-[13px] tracking-[0.12em] uppercase font-medium transition-[background-color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d3060]"
                >
                  Visit site ↗
                </a>
              )}
              <Link
                href="/work"
                className="inline-flex items-center gap-2 border border-[#f0f0f0] px-6 py-3 text-[13px] tracking-[0.12em] uppercase text-[#f0f0f0] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#f0f0f0] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0a0a0a]"
              >
                ← All work
              </Link>
            </div>
          </div>
        </section>

        {/* ── Showcase ─────────────────────────────────────────── */}
        <section className="bg-[#f5f5f5] px-6 py-24" aria-label={`${project.name} screenshot`}>
          <div className="max-w-[1280px] mx-auto">
            <CaseStudyReveal>
              <div className="border border-[#e0e0e0] rounded-sm overflow-hidden shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
                {/* Browser chrome */}
                <div className="bg-[#f0f0f0] border-b border-[#e0e0e0] px-3 py-2 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <div className="ml-3 flex-1 h-5 bg-[#ddd] rounded-sm" />
                </div>
                {/* Screenshot */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/10" }}>
                  <Image
                    src={project.img}
                    alt={altText}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </CaseStudyReveal>
          </div>
        </section>

        {/* ── Inside the build ─────────────────────────────────── */}
        <section className="bg-[#0a0a0a] px-6 py-24" aria-label="What we built">
          <div className="max-w-[1280px] mx-auto">
            {/* Header row */}
            <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#666] mt-2 whitespace-nowrap">
                What We Built
              </span>
              <MaskReveal className="md:text-right">
                <h2
                  className="text-[clamp(2.4rem,6vw,5rem)] leading-[0.9] text-[#f0f0f0]"
                  style={{ fontFamily: "var(--font-archivo-black)" }}
                >
                  Inside the build.
                </h2>
              </MaskReveal>
            </div>

            {/* Detail rows */}
            <div className="border-t border-[#333]">
              {project.details.map((detail, i) => (
                <CaseStudyReveal key={detail} delay={i * 0.06}>
                  <div className="border-b border-[#333] py-10 px-2 md:px-8 grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
                    <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6] mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[15px] leading-relaxed text-[#888] max-w-[720px]">
                      {detail}
                    </p>
                  </div>
                </CaseStudyReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quote ────────────────────────────────────────────── */}
        {project.quote && (
          <section className="bg-[#f5f5f5] px-6 py-28" aria-label="Client review">
            <div className="max-w-[900px] mx-auto">
              <CaseStudyReveal>
                <blockquote>
                  <p className="text-[clamp(1.3rem,3vw,2rem)] italic font-serif leading-[1.4] text-[#0d0d0d]">
                    &ldquo;{project.quote.text}&rdquo;
                  </p>
                  <footer className="mt-6 text-[12px] tracking-[0.12em] uppercase text-[#777]">
                    {project.quote.author}
                  </footer>
                </blockquote>
              </CaseStudyReveal>
            </div>
          </section>
        )}

        {/* ── Next project ─────────────────────────────────────── */}
        <section className="bg-[#0a0a0a] px-6 py-24" aria-label="Next case study">
          <div className="max-w-[1280px] mx-auto">
            <Link href={`/work/${next.slug}`} className="group block">
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#666]">
                Next case study →
              </span>
              <MaskReveal delay={0.05}>
                <h2
                  className="mt-4 text-[clamp(2.4rem,6vw,5rem)] leading-[0.9] text-[#f0f0f0] transition-colors duration-300 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-[#5b9fd6]"
                  style={{ fontFamily: "var(--font-archivo-black)" }}
                >
                  {next.name}
                </h2>
              </MaskReveal>
              <p className="mt-4 text-[10px] tracking-[0.22em] uppercase text-[#5b9fd6]">
                {next.type}
              </p>
            </Link>
          </div>
        </section>
      </main>

      <EditorialFooter />
    </div>
  );
}
