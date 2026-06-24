import Link from "next/link";

export default function HomeFinalCta() {
  return (
    <section className="bg-white px-6 py-24" aria-label="Get started">
      <div className="max-w-[1280px] mx-auto">
        {/* Header row */}
        <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-10">
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-2 whitespace-nowrap">
            Get Started
          </span>
          <h2
            className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] md:text-right"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Ready when
            <br />
            you are.
          </h2>
        </div>

        <div className="flex flex-col items-end gap-4">
          <Link
            href="/contact"
            className="inline-block border border-[#0d0d0d] px-8 py-4 text-[13px] tracking-[0.12em] uppercase text-[#0d0d0d] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d0d0d] [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
          >
            Start a project &rarr;
          </Link>
          <span className="text-[11px] tracking-[0.12em] uppercase text-gray-400">
            Currently booking — Summer 2026
          </span>
        </div>
      </div>
    </section>
  );
}
