"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import AnimatedButton from "./animated-button";

export default function HeroSection() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden" aria-label="Hero">
      {/* Higgsfield video — full cover */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/assets/hero-geo.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient overlay — readable text, keeps cinematic feel */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(135deg, rgba(12,14,20,0.72) 0%, rgba(12,14,20,0.45) 50%, rgba(12,14,20,0.65) 100%)",
        }}
      />

      {/* Bottom fade into page */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{ zIndex: 2, background: "linear-gradient(to bottom, transparent, #0c0e14)" }}
      />

      {/* Text + CTA */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ zIndex: 3 }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "1.5rem",
          }}
        >
          Web design studio · UK
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.28 }}
          style={{
            fontSize: "clamp(3.2rem, 9vw, 7rem)",
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            margin: "0 0 1.75rem",
            background: "linear-gradient(135deg, #ffffff 0%, #d4c8ff 40%, #27d7c4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            maxWidth: "16ch",
          }}
        >
          We build extraordinary websites.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            color: "rgba(255,255,255,0.6)",
            maxWidth: "44ch",
            lineHeight: 1.65,
            marginBottom: "2.75rem",
          }}
        >
          Flat-fee builds. Monthly retainer. Real results — for startups, law firms, and everyone between.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <AnimatedButton href="/contact" variant="primary">Get a free quote</AnimatedButton>
          <AnimatedButton href="/work" variant="outline">See our work</AnimatedButton>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 3 }}
        aria-hidden="true"
      >
        <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)" }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
      </motion.div>
    </section>
  );
}
