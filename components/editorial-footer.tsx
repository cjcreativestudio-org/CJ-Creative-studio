import Link from "next/link";

export default function EditorialFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-transparent" aria-label="Site footer">

      {/* Top section — transparent bg, video shows through */}
      <div className="px-6 md:px-14 pt-16 pb-0">

        {/* Top row: heading left, CTA button right */}
        <div className="flex items-start justify-between gap-8 pb-12">
          <h2
            className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.15] text-white"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Let&apos;s build something
            <br />
            precise.
          </h2>
          <Link
            href="/contact"
            className="shrink-0 inline-block bg-[#0A2540] px-8 py-7 text-[11px] tracking-[0.18em] uppercase text-white transition-[background-color] duration-[160ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d3060]"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Start a project →
          </Link>
        </div>

        {/* Full-bleed wordmark — white text on transparent, merges into white bar below */}
        <div className="overflow-hidden leading-[0.85]">
          <span
            className="block w-full text-white whitespace-nowrap"
            style={{
              fontFamily: "var(--font-archivo-black)",
              fontSize: "clamp(3.5rem, 12.5vw, 11rem)",
              letterSpacing: "-0.02em",
              lineHeight: 0.85,
            }}
          >
            CJ Creative Studio
          </span>
        </div>
      </div>

      {/* Bottom bar — solid white, opaque, overlaps bottom of wordmark */}
      <div className="bg-white px-6 md:px-14 pt-5 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

          {/* Left: legal + copyright */}
          <div className="flex flex-col gap-2">
            <nav className="flex flex-wrap gap-x-6 gap-y-1" aria-label="Legal navigation">
              <Link
                href="/privacy"
                className="text-[10px] tracking-[0.16em] uppercase text-black/40 transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0A2540]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-[10px] tracking-[0.16em] uppercase text-black/40 transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0A2540]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                Terms &amp; Conditions
              </Link>
            </nav>
            <p
              className="text-[10px] tracking-[0.14em] uppercase text-black/30"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              © {year} CJ Creative Studio. All rights reserved.
            </p>
          </div>

          {/* Right: contact */}
          <div className="flex flex-col sm:items-end gap-1">
            <a
              href="mailto:hello@cjcreativestudio.com"
              className="text-[11px] tracking-[0.1em] text-black/50 transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0A2540]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              hello@cjcreativestudio.com
            </a>
            <a
              href="tel:+447577483891"
              className="text-[11px] tracking-[0.1em] text-black/50 transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0A2540]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              07577 483 891
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
