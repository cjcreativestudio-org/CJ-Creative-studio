import Link from "next/link";

export default function EditorialFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a]" aria-label="Site footer">

      {/* Top section: thin border + heading left / CTA button right */}
      <div className="border-t border-white/[0.06] px-6 md:px-14 pt-16 pb-0">
        <div className="flex items-start justify-between gap-8 pb-16">
          <h2
            className="text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.2] text-white"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Let&apos;s build something
            <br />
            precise.
          </h2>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center bg-[#0A2540] px-8 py-7 text-[11px] tracking-[0.18em] uppercase text-white transition-[background-color] duration-[160ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d3060]"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            START A PROJECT →
          </Link>
        </div>

        {/*
          Massive wordmark — overflows upward into the white bar below.
          The bottom portion of the letters sits on white, so they vanish (white on white).
          overflow-visible + negative margin on the white bar pulls it up over the text.
        */}
        <div aria-hidden="true">
          <span
            className="block w-full text-white whitespace-nowrap leading-none"
            style={{
              fontFamily: "var(--font-archivo-black)",
              fontSize: "clamp(4rem, 13vw, 11.5rem)",
              letterSpacing: "-0.01em",
            }}
          >
            CJ Creative Studio
          </span>
        </div>
      </div>

      {/* White bottom bar — pulled up over the wordmark via negative margin */}
      <div className="bg-white -mt-[0.28em] px-6 md:px-14 pt-5 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

          {/* Left: legal links + copyright */}
          <div className="flex flex-col gap-[6px]">
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
