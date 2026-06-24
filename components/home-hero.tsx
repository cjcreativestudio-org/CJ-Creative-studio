import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="bg-[#f0ece3] pt-14" aria-label="Homepage hero">
      <div className="px-6 pt-12 pb-16">
        {/* Kicker row */}
        <div className="flex items-center justify-between mb-10">
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400">
            Web Design Studio
          </span>
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400">
            CJ Creative Studio
          </span>
        </div>

        {/* Display heading */}
        <h1
          className="text-[clamp(3rem,8.5vw,8rem)] leading-[0.9] text-[#0d0d0d] mb-10"
          style={{ fontFamily: "var(--font-archivo-black)" }}
        >
          Your website should
          <br />
          win you customers.
          <br />
          Not lose them.
        </h1>

        {/* Rule + body */}
        <div className="flex items-start gap-8 mb-10">
          <div className="w-10 border-t-[2px] border-[#0d0d0d] mt-2 shrink-0" />
          <p className="max-w-[340px] text-[15px] leading-[1.65] text-gray-600 font-serif">
            We rebuild outdated, broken, and missing websites for small and
            medium businesses &mdash; fast, reliable, handcrafted.
          </p>
        </div>

        <Link
          href="#selected-work"
          className="inline-block border border-[#0d0d0d] px-8 py-4 text-[13px] tracking-[0.12em] uppercase text-[#0d0d0d] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d0d0d] [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
        >
          View our work &rarr;
        </Link>
      </div>
    </section>
  );
}
