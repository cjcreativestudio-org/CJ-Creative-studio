import Link from "next/link";

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function EditorialFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06]" aria-label="Site footer">
      <div className="px-6 md:px-14 pt-16 pb-10">

        {/* Top row: CTA right-aligned */}
        <div className="flex justify-end mb-16">
          <div className="flex flex-col items-end gap-5">
            <h2
              className="text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.05] text-white/90 text-right"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Let&apos;s build something
              <br />
              <span className="text-[#0A2540]">precise.</span>
            </h2>
            <Link
              href="/contact"
              className="inline-block bg-[#0A2540] px-6 py-3 text-[11px] tracking-[0.18em] uppercase text-white transition-[background-color] duration-[160ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d3060]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Start a project →
            </Link>
          </div>
        </div>

        {/* Centre wordmark */}
        <div className="text-center mb-14">
          <span
            className="text-[clamp(3rem,9vw,10rem)] leading-[0.9] tracking-[-0.03em] text-white/90 block"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            CJ Creative Studio
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* Left: legal links + copyright */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Legal navigation">
              {LEGAL.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-[10px] tracking-[0.16em] uppercase text-white/25 transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0A2540]"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <p
              className="text-[10px] tracking-[0.14em] uppercase"
              style={{ fontFamily: "var(--font-jetbrains-mono)", color: "rgba(255,255,255,0.18)" }}
            >
              © {year} CJ Creative Studio. All rights reserved.
            </p>
          </div>

          {/* Right: contact */}
          <div className="flex flex-col sm:items-end gap-1">
            <a
              href="mailto:hello@cjcreativestudio.com"
              className="text-[11px] tracking-[0.1em] text-white/40 transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0A2540]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              hello@cjcreativestudio.com
            </a>
            <a
              href="tel:+447577483891"
              className="text-[11px] tracking-[0.1em] text-white/40 transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0A2540]"
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
