import Link from "next/link";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer style={{ background: "#0c0e14" }} className="py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" aria-label="CJ Studio home">
          <Logo variant="horizontal" height={22} onDark />
        </Link>

        <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.32)" }}>
          &copy; {new Date().getFullYear()} CJ Studio. UK Web Design.
        </p>

        <div className="flex items-center gap-5 flex-wrap justify-center">
          {[
            { label: "Home",             href: "/" },
            { label: "Our Work",         href: "/work" },
            { label: "About us",         href: "/about" },
            { label: "Our services",     href: "/services" },
            { label: "Contact Us",       href: "/contact" },
            { label: "Privacy Policy",   href: "/privacy" },
            { label: "Terms",            href: "/terms" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[13px] transition-colors hover:text-white/70"
              style={{ color: "rgba(255,255,255,0.38)" }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
