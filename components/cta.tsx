"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, EnvelopeSimple } from "@phosphor-icons/react";
import AnimatedButton from "./animated-button";

export default function CTA() {
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden">
      <div className="aurora-gradient animate-aurora absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />

      {/* Depth orbs — two layers at different scales/speeds for parallax illusion */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #8a6cff 0%, transparent 70%)" }}
        animate={reduce ? {} : { y: [0, -24, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/3 w-[400px] h-[400px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #27d7c4 0%, transparent 70%)" }}
        animate={reduce ? {} : { y: [0, 20, 0], scale: [1, 0.94, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] mb-6"
            style={{ color: "rgba(12,14,20,0.38)" }}
          >
            Get in touch
          </motion.p>

          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight leading-[1.05] mb-6"
            style={{ color: "#0c0e14" }}
          >
            Ready to build<br />something great?
          </motion.h2>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed max-w-[44ch] mb-10"
            style={{ color: "rgba(12,14,20,0.55)" }}
          >
            Tell us about your project. We&apos;ll get back to you within 24 hours with a quote.
          </motion.p>

          {/* Social proof co-located with CTA */}
          <motion.blockquote
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-8 max-w-[44ch]"
          >
            <p className="text-[15px] italic leading-relaxed" style={{ color: "rgba(12,14,20,0.50)" }}>
              &ldquo;The site went live on a Friday. By Monday our bookings were up 40%.&rdquo;
            </p>
            <footer className="mt-2 text-[13px]" style={{ color: "rgba(12,14,20,0.35)" }}>
              — Maple &amp; Co
            </footer>
          </motion.blockquote>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <AnimatedButton href="/contact" variant="primary">
              <EnvelopeSimple size={16} weight="bold" />
              hello@cjstudio.co.uk
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRight size={14} weight="bold" />
              </motion.span>
            </AnimatedButton>

            <AnimatedButton href="/work" variant="outline">
              See our work
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
