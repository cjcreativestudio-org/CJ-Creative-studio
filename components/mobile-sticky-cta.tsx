"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export default function MobileStickyCta() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-5 pt-3",
        "bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none",
        "transition-[opacity,transform] duration-300",
        reduced ? "" : visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}
      aria-hidden={!visible}
    >
      <Link
        href="/contact"
        tabIndex={visible ? 0 : -1}
        className="pointer-events-auto block w-full bg-[#f0f0f0] text-[#0a0a0a] text-center py-4 text-[13px] tracking-[0.14em] uppercase font-medium transition-[background-color,transform] duration-160 ease-out active:scale-[0.98] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white"
      >
        Start a project →
      </Link>
    </div>
  );
}
