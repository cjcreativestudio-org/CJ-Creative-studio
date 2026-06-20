"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EditorialNav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <nav
        className="flex items-center justify-between px-6 h-14"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-[11px] tracking-[0.18em] uppercase font-sans text-gray-900 select-none"
          aria-label="CJ Creative Studio home"
        >
          CJ Creative Studio
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {(["WORK", "SERVICES", "ABOUT"] as const).map((label) => {
            const href = `/${label.toLowerCase()}`;
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${
                  isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="text-[10px] tracking-[0.2em] uppercase border border-gray-900 px-4 py-2 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
