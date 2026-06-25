"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
] as const;

export default function EditorialNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Scroll-aware glass state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Trap focus in open drawer and close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const el = drawerRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    focusable[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-[24px] shadow-[0_1px_0_rgba(255,255,255,0.05)]"
          : "bg-transparent border-b border-[#f0f0f0]/10",
      ].join(" ")}
    >
      {/* Aurora accent line — visible when scrolled */}
      {scrolled && (
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px opacity-25 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #8a6cff, #4d7cff, #27d7c4)",
          }}
        />
      )}

      <nav
        className="flex items-center justify-between px-6 h-14 max-w-[1280px] mx-auto"
        aria-label="Main navigation"
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="text-[11px] tracking-[0.18em] uppercase text-[#f0f0f0] select-none hover:opacity-60 transition-opacity duration-180"
          aria-label="CJ Creative Studio home"
        >
          CJ Creative Studio
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "relative group text-[11px] tracking-[0.18em] uppercase py-1 transition-colors duration-180",
                  isActive
                    ? "text-[#f0f0f0]"
                    : "text-[rgba(240,240,240,0.45)] hover:text-[#f0f0f0]",
                ].join(" ")}
              >
                {label}
                {/* Aurora underline */}
                <span
                  aria-hidden="true"
                  className={[
                    "absolute bottom-0 left-0 right-0 h-px origin-left transition-transform duration-300 ease-out",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  ].join(" ")}
                  style={{
                    background: "linear-gradient(to right, #8a6cff, #4d7cff, #27d7c4)",
                  }}
                />
              </Link>
            );
          })}
        </div>

        {/* Right side: CTA + hamburger */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className={[
              "hidden md:inline-flex items-center text-[11px] tracking-[0.18em] uppercase",
              "rounded-full border border-[#f0f0f0]/60 px-5 py-2 text-[#f0f0f0]",
              "transition-[background-color,color,transform] duration-160 ease-out",
              "active:scale-[0.97]",
              "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#f0f0f0] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#0a0a0a]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a6cff] focus-visible:ring-offset-2",
            ].join(" ")}
          >
            Contact
          </Link>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a6cff]"
          >
            <span
              className={[
                "block w-5 h-px bg-[#f0f0f0] transition-transform duration-200",
                menuOpen ? "translate-y-[6px] rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block w-5 h-px bg-[#0c0e14] transition-opacity duration-200",
                menuOpen ? "opacity-0" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block w-5 h-px bg-[#f0f0f0] transition-transform duration-200",
                menuOpen ? "-translate-y-[6px] -rotate-45" : "",
              ].join(" ")}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        className={[
          "md:hidden overflow-hidden transition-[max-height] duration-250 ease-out",
          "bg-[#0a0a0a]/95 backdrop-blur-[12px]",
          menuOpen ? "max-h-96 border-t border-[#333]" : "max-h-0",
        ].join(" ")}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                tabIndex={menuOpen ? 0 : -1}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "text-[13px] tracking-[0.15em] uppercase py-3 border-b border-[#222] last:border-b-0 transition-colors",
                  isActive
                    ? "text-[#f0f0f0] font-medium"
                    : "text-[rgba(240,240,240,0.45)] hover:text-[#f0f0f0]",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            tabIndex={menuOpen ? 0 : -1}
            className={[
              "mt-3 inline-flex items-center justify-center text-[11px] tracking-[0.18em] uppercase",
              "rounded-full border border-[#f0f0f0]/60 px-5 py-3 text-[#f0f0f0]",
              "hover:bg-[#f0f0f0] hover:text-[#0a0a0a] transition-colors duration-200",
            ].join(" ")}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
