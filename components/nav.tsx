"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useMotionValueEvent } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import Logo from "./logo";

const links = [
  { label: "Work",     href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process",  href: "/process" },
  { label: "Contact",  href: "/contact" },
];

const GRAD = "linear-gradient(90deg, #8a6cff, #4d7cff 52%, #27d7c4)";

export default function Nav({ onLight = true }: { onLight?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
  });

  const headerClass = onLight
    ? scrolled
      ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.07)]"
      : "bg-white/65 backdrop-blur-md"
    : scrolled
      ? "bg-black/55 backdrop-blur-xl border-b border-white/[0.1]"
      : "bg-black/20 backdrop-blur-md border-b border-white/[0.06]";

  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerClass}`}
    >
      {/* Gradient accent line — appears on scroll in light mode */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{
          background: GRAD,
          opacity: onLight && scrolled ? 0.25 : 0,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={reduce ? {} : { scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <Link href="/" aria-label="CJ Studio home" className="flex items-center gap-2.5 select-none">
            <Logo variant="full" height={30} />
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
                  : "text-white/75 hover:text-white"
              }`}
            >
              {label}
              <span
                className="absolute bottom-0 left-0 w-full h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"
                style={{ background: GRAD }}
              />
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <motion.button
          whileTap={reduce ? {} : { scale: 0.9 }}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            onLight
              ? "text-gray-700 hover:bg-gray-100"
              : "text-white/80 hover:bg-white/10"
          }`}
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
        className={`md:hidden overflow-hidden backdrop-blur-md border-t ${
          onLight
            ? "bg-white/95 border-gray-100"
            : "bg-black/80 border-white/[0.06]"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`text-[15px] transition-colors py-1 ${
                onLight
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white/80 hover:text-white"
              }`}
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
