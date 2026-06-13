"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import Logo from "./logo";

const links = [
  { label: "Home",             href: "/" },
  { label: "Our Work",         href: "/work" },
  { label: "About us",         href: "/about" },
  { label: "Our services",     href: "/services" },
  { label: "Contact Us",       href: "/contact" },
  { label: "Privacy & Policy", href: "/privacy" },
];

export default function Nav({ onLight = true }: { onLight?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled && onLight ? "bg-white/80 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={reduce ? {} : { scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <Link href="/" aria-label="CJ Studio home">
            <Logo variant="mark" height={32} />
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`relative text-[14px] transition-colors duration-300 py-1 group ${
                onLight
                  ? "text-gray-500 hover:text-gray-900"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {label}
              <span className="absolute bottom-0 left-0 w-full h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" style={{ background: 'linear-gradient(90deg, #8a6cff, #4d7cff 52%, #27d7c4)' }} />
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <motion.button
          whileTap={reduce ? {} : { scale: 0.9 }}
          className="md:hidden p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
            {open ? <X size={20} /> : <List size={20} />}
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-gray-100"
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[15px] text-gray-700 hover:text-gray-900 transition-colors py-1"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}
