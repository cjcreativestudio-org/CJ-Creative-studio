import Link from "next/link";

export default function EditorialFooter() {
  const year = new Date().getFullYear();

  return (
    <footer aria-label="Site footer" className="isolate">
      {/* Black section */}
      <div className="bg-[#0a0a0a] px-6 md:px-14">

        {/* Border top */}
        <div className="h-px bg-white/[0.06]" />

        {/* Top row: heading left, CTA button right */}
        <div className="flex items-start justify-between gap-8 py-16">
          <h2
            className="text-white leading-[1.2]"
            style={{
              fontFamily: "var(--font-archivo-black)",
              fontSize: "clamp(1.8rem, 3.8vw, 46px)",
            }}
          >
            Let&apos;s build something
            <br />
            precise.
          </h2>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center bg-[#0A2540] text-white uppercase tracking-[2px] transition-[background-color] duration-[160ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d3060]"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "15px",
              padding: "28px 24px",
            }}
          >
            Start a project →
          </Link>
        </div>

      </div>

      {/*
        Wordmark — z:2, full viewport width (no side padding).
        Gradient bg: black above, transparent in the bottom overlap zone so
        the white bar shows through letter counters without the video glow leaking in.
      */}
      <div
        className="relative z-[2]"
        style={{
          background: "linear-gradient(to bottom, #0a0a0a calc(100% - clamp(30px,5.2vw,62px)), transparent 100%)",
        }}
      >
        <span
          aria-hidden="true"
          className="block text-white whitespace-nowrap"
          style={{
            fontFamily: "var(--font-archivo-black)",
            fontWeight: 900,
            fontSize: "clamp(3rem, 14vw, 170px)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          CJ Creative Studio
        </span>
      </div>

      {/*
        White bar — z:1, pulled up ~50% of the taller letter height.
        At 170px font: ~85px overlap ≈ 7vw.
      */}
      <div
        className="relative z-[1] bg-white"
        style={{
          marginTop: "clamp(-40px, -7vw, -85px)",
          borderTop: "1px solid rgba(10,10,10,0.08)",
          padding: "clamp(40px, 6vw, 72px) clamp(24px, 3.5vw, 32px)",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">

          {/* Left: legal links + copyright */}
          <div className="flex flex-col gap-2">
            <nav className="flex flex-wrap gap-x-8 gap-y-1" aria-label="Legal navigation">
              <Link
                href="/privacy"
                className="uppercase text-black transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0A2540]"
                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "16px", letterSpacing: "2px" }}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="uppercase text-black transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0A2540]"
                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "16px", letterSpacing: "2px" }}
              >
                Terms &amp; Conditions
              </Link>
            </nav>
            <p
              className="uppercase"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "13px",
                letterSpacing: "1.5px",
                color: "rgba(10,10,10,0.35)",
              }}
            >
              © {year} CJ Creative Studio. All rights reserved.
            </p>
          </div>

          {/* Right: contact */}
          <div className="flex flex-col sm:items-end gap-1">
            <a
              href="mailto:hello@cjcreativestudio.com"
              className="text-black transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0A2540]"
              style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "16px", letterSpacing: "1px" }}
            >
              hello@cjcreativestudio.com
            </a>
            <a
              href="tel:+447577483891"
              className="text-black transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0A2540]"
              style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "16px", letterSpacing: "1px" }}
            >
              07577 483 891
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
