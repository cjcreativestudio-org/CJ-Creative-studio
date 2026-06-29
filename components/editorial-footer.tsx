import Link from "next/link";

const NAV = [
  { label: "Work",     href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About",    href: "/about" },
  { label: "Privacy",  href: "/privacy" },
];

export default function EditorialFooter() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06]" aria-label="Site footer">
      <div className="max-w-[1280px] mx-auto px-6 py-14">

        {/* Top row: headline + CTA button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          <h2
            className="text-[clamp(1.6rem,4vw,2.8rem)] leading-[1.05] text-white/90"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Let&apos;s build something
            <br />
            <span className="text-[#0A2540]">precise.</span>
          </h2>

          {/* CTA */}
          <Link
            href="/contact"
            className="inline-block bg-[#0A2540] px-6 py-3 text-[11px] tracking-[0.18em] uppercase text-white transition-[background-color] duration-[160ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d3060] w-fit"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Start a project →
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] mb-10" />

        {/* Mid row: wordmark + contact */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10">
          <div>
            <span
              className="text-white text-[1.35rem] tracking-[-0.02em] leading-none"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              CJ Creative Studio
            </span>
            <p
              className="text-[10px] tracking-[0.2em] uppercase mt-1"
              style={{ fontFamily: "var(--font-jetbrains-mono)", color: "rgba(255,255,255,0.25)" }}
            >
              UK Web Design Agency
            </p>
          </div>

          {/* Contact block */}
          <div className="flex flex-col gap-2">
            <a
              href="mailto:hello@cjcreativestudio.com"
              className="text-[12px] tracking-[0.1em] text-white/45 transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0A2540]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              hello@cjcreativestudio.com
            </a>
            <a
              href="tel:+447577483891"
              className="text-[12px] tracking-[0.1em] text-white/45 transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0A2540]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              07577 483 891
            </a>
          </div>
        </div>

        {/* Bottom bar: nav + legal */}
        <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
            {NAV.map(({ label, href }) => (
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
            className="text-[10px] tracking-[0.14em] uppercase text-white/18"
            style={{ fontFamily: "var(--font-jetbrains-mono)", color: "rgba(255,255,255,0.18)" }}
          >
            © {new Date().getFullYear()} CJ Creative Studio. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
