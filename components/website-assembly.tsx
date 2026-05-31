"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

export default function WebsiteAssembly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // ── Browser frame ────────────────────────────────────────────────────────
  const frameScale  = useTransform(scrollYProgress, [0, 0.25], [0.82, 1]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const frameShadow  = useTransform(
    scrollYProgress,
    [0.5, 1],
    ["0 8px 32px rgba(0,0,0,0.06)", "0 32px 80px rgba(251,113,133,0.18)"]
  );

  // ── Nav bar ──────────────────────────────────────────────────────────────
  const navY       = useTransform(scrollYProgress, [0.05, 0.32], [-110, 0]);
  const navOpacity = useTransform(scrollYProgress, [0.05, 0.22], [0,   1]);

  // ── Hero headline ────────────────────────────────────────────────────────
  const headX      = useTransform(scrollYProgress, [0.18, 0.50], [-260, 0]);
  const headRotate = useTransform(scrollYProgress, [0.18, 0.50], [-7,   0]);
  const headOpacity = useTransform(scrollYProgress, [0.18, 0.38], [0,   1]);

  // ── Prism visual ─────────────────────────────────────────────────────────
  const prismX       = useTransform(scrollYProgress, [0.22, 0.54], [240,  0]);
  const prismRotate  = useTransform(scrollYProgress, [0.22, 0.54], [10,   0]);
  const prismOpacity = useTransform(scrollYProgress, [0.22, 0.42], [0,    1]);

  // ── Subtext + CTA ─────────────────────────────────────────────────────────
  const subtextY       = useTransform(scrollYProgress, [0.32, 0.58], [60, 0]);
  const subtextOpacity = useTransform(scrollYProgress, [0.32, 0.50], [0,  1]);

  // ── Service cards ─────────────────────────────────────────────────────────
  const card1Y = useTransform(scrollYProgress, [0.44, 0.70], [120, 0]);
  const card2Y = useTransform(scrollYProgress, [0.50, 0.74], [120, 0]);
  const card3Y = useTransform(scrollYProgress, [0.56, 0.78], [120, 0]);
  const cardsOpacity = useTransform(scrollYProgress, [0.44, 0.62], [0, 1]);

  // ── Footer ────────────────────────────────────────────────────────────────
  const footerY       = useTransform(scrollYProgress, [0.68, 0.88], [50, 0]);
  const footerOpacity = useTransform(scrollYProgress, [0.68, 0.85], [0,  1]);

  // ── Section label ─────────────────────────────────────────────────────────
  const labelOpacity = useTransform(scrollYProgress, [0, 0.08, 0.25], [1, 1, 0]);
  const labelY       = useTransform(scrollYProgress, [0, 0.25], [0, -30]);

  // ── Glass prism objects ───────────────────────────────────────────────────
  // Triangular prism — drops first, brand hero
  const triY       = useTransform(scrollYProgress, [0.18, 0.46], [-280, 0]);
  const triRotate  = useTransform(scrollYProgress, [0.18, 0.46], [-8, 0]);
  const triOpacity = useTransform(scrollYProgress, [0.18, 0.30], [0, 1]);

  // Tall rectangle
  const rectY       = useTransform(scrollYProgress, [0.28, 0.54], [-320, 0]);
  const rectRotate  = useTransform(scrollYProgress, [0.28, 0.54], [5, 0]);
  const rectOpacity = useTransform(scrollYProgress, [0.28, 0.40], [0, 1]);

  // Small cube
  const cubeY       = useTransform(scrollYProgress, [0.34, 0.58], [-240, 0]);
  const cubeRotate  = useTransform(scrollYProgress, [0.34, 0.58], [-3, 0]);
  const cubeOpacity = useTransform(scrollYProgress, [0.34, 0.46], [0, 1]);

  // Sphere
  const sphereY       = useTransform(scrollYProgress, [0.40, 0.64], [-260, 0]);
  const sphereOpacity = useTransform(scrollYProgress, [0.40, 0.52], [0, 1]);

  // Rainbow light + scene zoom
  const rainbowOpacity = useTransform(scrollYProgress, [0.50, 0.80], [0, 1]);
  const sceneScale     = useTransform(scrollYProgress, [0.60, 0.90], [1, 1.06]);

  return (
    /* Scroll container — 3× viewport gives scroll room for the animation */
    <div ref={containerRef} className="relative h-[280vh] overflow-x-hidden">
      {/* Sticky viewport */}
      <div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >

        <motion.div
          style={reduce ? {} : { scale: sceneScale }}
          className="relative w-full h-full flex items-center justify-center"
          aria-label="Website assembly animation"
        >

        {/* Section label — fades out as assembly begins */}
        <motion.div
          style={reduce ? {} : { opacity: labelOpacity, y: labelY }}
          className="absolute top-16 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none"
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400 font-medium mb-2">
            How we work
          </p>
          <p className="text-2xl font-bold text-gray-900 tracking-tight">
            Every site, built from scratch.
          </p>
          <p className="text-[13px] text-gray-400 mt-2">Scroll to watch it come together</p>
        </motion.div>

        {/* Browser chrome wrapper */}
        <motion.div
          style={reduce ? { width: "min(900px, 90vw)", aspectRatio: "900 / 560" } : { scale: frameScale, opacity: frameOpacity, boxShadow: frameShadow, width: "min(900px, 90vw)", aspectRatio: "900 / 560" }}
          className="relative rounded-2xl overflow-hidden border border-gray-200/80 bg-white"
        >
          {/* Browser top bar */}
          <div className="h-9 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2 shrink-0">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            </div>
            <div className="flex-1 mx-3 h-5 bg-white rounded-full border border-gray-200 flex items-center px-3 gap-1.5">
              <div className="w-2 h-2 rounded-full bg-gray-300" />
              <span className="text-[10px] text-gray-400 font-medium">cjstudio.co.uk</span>
            </div>
          </div>

          {/* Website content area */}
          <div className="relative overflow-hidden bg-white" style={{ height: "calc(100% - 36px)" }}>

            {/* Global aurora tint inside browser */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 20% 30%, rgba(251,113,133,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(196,181,253,0.10) 0%, transparent 50%)"
              }}
            />

            {/* ── NAV BAR ── */}
            <motion.div
              style={reduce ? {} : { y: navY, opacity: navOpacity }}
              className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-6 border-b border-gray-100/60 bg-white/80 backdrop-blur-sm z-10"
            >
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 100 100" fill="none">
                  <defs>
                    <linearGradient id="ng" x1="0" y1="0" x2="100" y2="87" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#fb7185"/>
                      <stop offset="50%" stopColor="#a78bfa"/>
                      <stop offset="100%" stopColor="#34d399"/>
                    </linearGradient>
                  </defs>
                  <polygon points="50,4 96,87 4,87" fill="url(#ng)"/>
                  <polygon points="50,32 72,72 28,72" fill="white"/>
                </svg>
                <span className="text-[10px] font-bold text-gray-900 tracking-tight">CJ Studio</span>
              </div>
              <div className="flex items-center gap-4">
                {["Work", "Services", "Contact"].map(l => (
                  <span key={l} className="text-[9px] text-gray-500">{l}</span>
                ))}
              </div>
              <div className="px-3 py-1 rounded-full bg-gray-900 text-[9px] text-white font-medium">
                Start a project
              </div>
            </motion.div>

            {/* ── HERO AREA ── */}
            <div className="absolute top-10 left-0 right-0 bottom-0 grid grid-cols-2">

              {/* Left — headline + subtext */}
              <div className="flex flex-col justify-center pl-8 pr-4 relative">
                <motion.div style={reduce ? {} : { x: headX, rotate: headRotate, opacity: headOpacity }}>
                  <p className="text-[8px] uppercase tracking-[0.18em] text-gray-400 mb-2 font-medium">UK Web Design</p>
                  <h2 className="text-[clamp(1.1rem,2.8vw,1.8rem)] font-bold tracking-tight leading-[1.05] text-gray-900">
                    Websites<br />built to{" "}
                    <span style={{
                      background: "linear-gradient(135deg, #fb7185, #f97316, #f472b6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>
                      stand out.
                    </span>
                  </h2>
                </motion.div>

                <motion.div
                  style={reduce ? {} : { y: subtextY, opacity: subtextOpacity }}
                  className="mt-3"
                >
                  <p className="text-[8px] text-gray-500 leading-relaxed max-w-[22ch]">
                    Fast, modern websites for UK businesses. Flat fee, no agency markup.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <div className="px-3 py-1.5 rounded-full bg-gray-900 text-[8px] text-white font-medium">
                      Start a project →
                    </div>
                    <div className="px-3 py-1.5 rounded-full border border-gray-200 text-[8px] text-gray-600">
                      See work
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right — prism visual */}
              <motion.div
                style={reduce ? {} : { x: prismX, rotate: prismRotate, opacity: prismOpacity }}
                className="flex items-center justify-center pr-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 blur-2xl rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(251,113,133,0.3) 0%, rgba(196,181,253,0.2) 50%, transparent 70%)" }}
                  />
                  <svg width="100" height="110" viewBox="0 0 180 200" fill="none" className="relative drop-shadow-lg">
                    <defs>
                      <linearGradient id="ph" x1="0" y1="0" x2="180" y2="155" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#fb7185" stopOpacity="0.95"/>
                        <stop offset="30%" stopColor="#a78bfa" stopOpacity="0.95"/>
                        <stop offset="65%" stopColor="#60a5fa" stopOpacity="0.95"/>
                        <stop offset="100%" stopColor="#34d399" stopOpacity="0.95"/>
                      </linearGradient>
                    </defs>
                    <polygon points="90,12 168,155 12,155" fill="url(#ph)"/>
                    <polygon points="90,50 138,132 42,132" fill="white" opacity="0.92"/>
                    <line x1="90" y1="155" x2="30" y2="195" stroke="#fda4af" strokeWidth="3" opacity="0.7"/>
                    <line x1="90" y1="155" x2="55" y2="198" stroke="#c4b5fd" strokeWidth="3" opacity="0.7"/>
                    <line x1="90" y1="155" x2="80" y2="200" stroke="#93c5fd" strokeWidth="3" opacity="0.7"/>
                    <line x1="90" y1="155" x2="105" y2="200" stroke="#6ee7b7" strokeWidth="3" opacity="0.7"/>
                    <line x1="90" y1="155" x2="130" y2="198" stroke="#86efac" strokeWidth="2.5" opacity="0.6"/>
                  </svg>
                </div>
              </motion.div>
            </div>

            {/* ── SERVICE CARDS ── */}
            <div className="absolute bottom-8 left-0 right-0 px-6 grid grid-cols-3 gap-3">
              {[
                { title: "Design",   icon: "🎨", color: "from-pink-50 to-purple-50",   c1: card1Y },
                { title: "Build",    icon: "⚡", color: "from-blue-50 to-indigo-50",   c1: card2Y },
                { title: "Maintain", icon: "🔄", color: "from-emerald-50 to-teal-50",  c1: card3Y },
              ].map(({ title, icon, color, c1 }) => (
                <motion.div
                  key={title}
                  style={reduce ? {} : { y: c1, opacity: cardsOpacity }}
                  className={`bg-gradient-to-br ${color} rounded-xl p-3 border border-white/60`}
                >
                  <div className="text-sm mb-1">{icon}</div>
                  <p className="text-[9px] font-semibold text-gray-900">{title}</p>
                  <p className="text-[7px] text-gray-500 mt-0.5 leading-relaxed">
                    {title === "Design" && "Tailored to your brand"}
                    {title === "Build" && "Fast & SEO-ready"}
                    {title === "Maintain" && "Monthly upkeep"}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* ── FOOTER ── */}
            <motion.div
              style={reduce ? {} : { y: footerY, opacity: footerOpacity }}
              className="absolute bottom-0 left-0 right-0 h-7 bg-gray-900/95 flex items-center justify-between px-6"
            >
              <span className="text-[8px] text-gray-400 font-medium">CJ Studio</span>
              <span className="text-[8px] text-gray-600">© 2026 · UK Web Design</span>
              <div className="flex gap-3">
                {["Privacy", "Terms"].map(l => (
                  <span key={l} className="text-[7px] text-gray-600">{l}</span>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>

        </motion.div>

        {/* Scroll progress hint at bottom */}
        <motion.div
          style={reduce ? {} : { opacity: footerOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-gray-300 animate-pulse" />
        </motion.div>

      </div>
    </div>
  );
}
