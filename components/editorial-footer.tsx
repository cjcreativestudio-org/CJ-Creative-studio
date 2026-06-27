import Link from "next/link";

const NAV = [
  { label: "Work",     href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About",    href: "/about" },
  { label: "Contact",  href: "/contact" },
  { label: "Privacy",  href: "/privacy" },
];

export default function EditorialFooter() {
  return (
    <footer className="bg-[#0a0a0a]" aria-label="Site footer">
      {/* Top rule */}
      <div className="border-t border-white/[0.06]" />

      {/* Massive CTA wordmark */}
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-8">
        <p
          className="text-[10px] tracking-[0.28em] uppercase mb-6"
          style={{ fontFamily: "var(--font-jetbrains-mono)", color: "rgba(255,255,255,0.28)" }}
        >
          CJ Studio — UK Web Design Agency
        </p>
        <h2
          className="text-[clamp(3.5rem,10vw,9rem)] leading-[0.88] text-white/90 mb-16"
          style={{ fontFamily: "var(--font-archivo-black)" }}
        >
          Let&apos;s build
          <br />
          something
          <br />
          precise.
        </h2>

        {/* Grid: nav left, cta right */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-8 mb-16 border-t border-white/[0.06] pt-10">
          {NAV.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[12px] tracking-[0.14em] uppercase text-white/35 transition-[color] duration-[180ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:text-white/80 w-fit"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-[12px] tracking-[0.14em] uppercase text-[#5b9fd6]/70 transition-[color] duration-[180ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#5b9fd6] w-fit"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Start a project →
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-white/[0.04] pt-6">
          <p
            className="text-[10px] tracking-[0.16em] uppercase text-white/20"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            © {new Date().getFullYear()} CJ Studio. All rights reserved.
          </p>
          <p
            className="text-[10px] tracking-[0.16em] uppercase text-white/20"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Exeter, Devon, UK
          </p>
        </div>
      </div>
    </footer>
  );
}
