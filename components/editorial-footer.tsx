"use client";

import Link from "next/link";

const NAV = [
  { label: "Work",     href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About",    href: "/about" },
  { label: "Contact",  href: "/contact" },
  { label: "Privacy",  href: "/privacy" },
];

/* Simplified London skyline silhouette — Tower Bridge + skyline */
function LondonSkyline() {
  return (
    <svg
      viewBox="0 0 1200 160"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
      className="w-full"
      style={{ display: "block", height: "clamp(60px, 10vw, 140px)" }}
    >
      <path
        fill="rgba(255,255,255,0.07)"
        d="
          M0,160
          L0,110 L30,110 L30,90 L50,90 L50,70 L60,70 L60,50 L70,50 L70,70 L80,70 L80,90 L100,90 L100,110
          L120,110 L120,100 L140,100 L140,95 L160,95 L160,100 L180,100 L180,110
          L200,110 L200,105 L220,105 L220,100 L240,100 L240,95 L260,95 L260,100 L280,100 L280,105 L300,105 L300,110
          L320,110 L320,80 L330,80 L330,60 L340,60 L340,40 L342,40 L342,20 L344,20 L344,0
          L346,0 L346,20 L348,20 L348,40 L350,40 L350,60 L360,60 L360,80 L370,80 L370,110
          L390,110 L390,100
          L400,100 L400,60 L404,60 L404,40 L408,40 L408,20 L410,20 L410,0
          L412,0 L412,20 L414,20 L414,40 L418,40 L418,60 L422,60 L422,100 L432,100 L432,110
          L450,110 L450,90 L480,90 L480,110
          L510,110 L510,85 L540,85 L540,75 L560,75 L560,85 L590,85 L590,110
          L620,110 L620,100 L650,100 L650,90 L670,90 L670,80 L680,80 L680,65 L690,65 L690,80 L700,80 L700,90 L720,90 L720,100 L750,100 L750,110
          L770,110 L770,95 L790,95 L790,85 L810,85 L810,75 L830,75 L830,85 L850,85 L850,95 L870,95 L870,110
          L900,110 L900,90 L910,90 L910,70 L920,70 L920,55 L930,55 L930,45 L935,45 L935,30 L940,30 L940,45 L945,45 L945,55 L955,55 L955,70 L965,70 L965,90 L975,90 L975,110
          L1000,110 L1000,100 L1020,100 L1020,95 L1040,95 L1040,100 L1060,100 L1060,110
          L1080,110 L1080,90 L1100,90 L1100,80 L1120,80 L1120,90 L1140,90 L1140,110
          L1200,110 L1200,160
          Z
        "
      />
    </svg>
  );
}

export default function EditorialFooter() {
  return (
    <footer className="bg-[#0a0a0a]" aria-label="Site footer">
      {/* Skyline silhouette */}
      <div className="px-0 pt-10 overflow-hidden">
        <LondonSkyline />
      </div>

      {/* Editorial split */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        {/* Left — stacked wordmark */}
        <p
          className="text-white select-none uppercase leading-[0.85] shrink-0"
          style={{
            fontFamily: "var(--font-archivo-black)",
            fontSize: "clamp(3.5rem, 9vw, 9rem)",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ display: "block" }}>CJ</span>
          <span style={{ display: "block" }}>Creative</span>
          <span style={{ display: "block" }}>Studio</span>
        </p>

        {/* Right — tagline + nav */}
        <div className="flex flex-col gap-6 md:pb-2">
          <p
            className="text-white/30 text-[11px] tracking-[0.18em] uppercase"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            UK Web Design Agency
          </p>
          <div className="w-12 h-px bg-white/10" />
          <nav className="flex flex-col gap-3" aria-label="Footer navigation">
            {NAV.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[13px] text-white/40 transition-[color] duration-[180ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:text-white/80 w-fit"
              >
                {label}
              </Link>
            ))}
          </nav>
          <p className="text-[11px] text-white/20 mt-2">© {new Date().getFullYear()} CJ Studio</p>
        </div>
      </div>
    </footer>
  );
}
