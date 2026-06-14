"use client";

import { motion, useReducedMotion } from "motion/react";
import AnimatedButton from "./animated-button";

const webDesignFeatures = [
  "Logo design and brand adaptation",
  "Custom website build, mobile-first",
  "SEO-ready from day one",
  "Delivered in days, not months",
];

const plans = [
  {
    title: "Free hosting",
    price: "£0 / month",
    description:
      "Hosting included forever. Changes aren't covered: if you need an update, we'll quote a callout fee.",
    callout: "Typical changes from £30",
    features: ["Hosting included", "Site stays live", "Callout fee for changes"],
    highlight: false,
  },
  {
    title: "Simple",
    price: "£15 / month",
    description: "Ongoing care so your site stays accurate and fast.",
    callout: null,
    features: [
      "Everything in Free",
      "Monthly content updates",
      "Error and uptime monitoring",
      "Traffic consistency checks",
    ],
    highlight: false,
  },
  {
    title: "Adaptive",
    price: "£45 / month",
    description: "For businesses that move fast and need their site to keep up.",
    callout: null,
    features: [
      "Everything in Simple",
      "Frequent design changes",
      "Traffic trend analysis",
      "Proactive improvement suggestions",
    ],
    highlight: true,
  },
];

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <div>
      {/* ── Intro ── */}
      <section className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight text-gray-900 leading-tight max-w-2xl"
        >
          Websites that keep your<br className="hidden sm:block" /> business ahead.
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mt-5 text-[17px] text-gray-500 leading-relaxed max-w-[55ch]"
        >
          Design that converts, code that performs, care that lasts. We build websites for
          UK businesses that want results, not templates.
        </motion.p>
      </section>

      {/* ── First month free callout ── */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-hidden rounded-2xl border border-purple-200/60 bg-gradient-to-br from-purple-50/80 to-teal-50/80 p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 -right-12 w-64 h-64 rounded-full bg-gradient-to-br from-purple-200/30 to-teal-200/30 blur-3xl"
            />
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #8a6cff, #27d7c4)" }}
              aria-hidden="true"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L11.8 7.6H17.6L12.9 11.1L14.7 16.7L10 13.2L5.3 16.7L7.1 11.1L2.4 7.6H8.2L10 2Z" fill="white" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">First month on us.</h2>
              <p className="text-[16px] text-gray-600 leading-relaxed max-w-[52ch]">
                Every new website includes 1 month of free hosting and upkeep as standard. No
                strings, no small print.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Web Design ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.h2
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-gray-900 leading-tight mb-6"
              >
                Web design
              </motion.h2>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
                className="space-y-4 text-[16px] text-gray-500 leading-relaxed mb-8"
              >
                <p>
                  Everything from logo design and brand adaptation to a fully custom website,
                  built to reflect your business and speak directly to your customers.
                </p>
                <p>
                  We start by listening: your market, your customers, your goals. Every design
                  decision is shaped to improve how visitors experience your brand and turn
                  browsing into buying.
                </p>
              </motion.div>

              <motion.ul
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.14, ease: "easeOut" }}
                className="space-y-3"
              >
                {webDesignFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-[15px] text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8a6cff] shrink-0 mt-2" />
                    {feat}
                  </li>
                ))}
              </motion.ul>
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="aspect-video rounded-2xl overflow-hidden bg-[#0c0e14] border border-white/10 flex flex-col"
              aria-hidden="true"
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                <div className="flex-1 mx-3 rounded-md bg-white/5 h-5 flex items-center px-2">
                  <span className="text-[9px] text-white/30 font-mono tracking-wide">yourclientsite.co.uk</span>
                </div>
              </div>
              {/* Mock page content */}
              <div className="flex-1 p-5 flex flex-col gap-3">
                <div className="h-5 w-3/4 rounded-full" style={{ background: "linear-gradient(90deg, #8a6cff 0%, #4d7cff 60%, #27d7c4 100%)" }} />
                <div className="h-2.5 w-full rounded-full bg-white/8" />
                <div className="h-2.5 w-5/6 rounded-full bg-white/8" />
                <div className="h-2.5 w-4/6 rounded-full bg-white/6" />
                <div className="mt-2 flex gap-2">
                  <div className="h-8 w-28 rounded-full bg-[#8a6cff]/70" />
                  <div className="h-8 w-20 rounded-full border border-white/15" />
                </div>
                <div className="mt-auto grid grid-cols-3 gap-2">
                  {[0.14, 0.09, 0.11].map((op, i) => (
                    <div
                      key={i}
                      className="rounded-lg aspect-[4/3]"
                      style={{ background: `rgba(138,108,255,${op})`, border: "1px solid rgba(138,108,255,0.12)" }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Hosting & Upkeep ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-gray-900 leading-tight mb-4"
          >
            Hosting and upkeep
          </motion.h2>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
            className="text-[16px] text-gray-500 leading-relaxed max-w-[55ch] mb-12"
          >
            Once your site is live, we keep it that way. Pick a plan that fits how often your
            business changes, or keep hosting free with no commitment.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.title}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className={`relative rounded-2xl p-7 flex flex-col gap-5 border ${
                  plan.highlight
                    ? "border-purple-200 bg-gradient-to-br from-purple-50/70 to-teal-50/70"
                    : "border-gray-100 bg-white"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute top-4 right-4 text-[11px] font-semibold uppercase tracking-wider bg-[#8a6cff] text-white px-2.5 py-1 rounded-full">
                    Most popular
                  </span>
                )}
                <div>
                  <p className="text-[13px] font-semibold text-gray-400 mb-1">{plan.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{plan.price}</p>
                </div>
                <p className="text-[15px] text-gray-500 leading-relaxed">{plan.description}</p>
                {plan.callout && (
                  <p className="text-[13px] font-medium text-[#8a6cff]">{plan.callout}</p>
                )}
                <ul className="space-y-2.5 mt-auto">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-[14px] text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8a6cff] shrink-0 mt-2" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing framing ── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-gray-900 leading-tight mb-5"
          >
            Priced around your business.
          </motion.h2>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
            className="text-[16px] text-gray-500 leading-relaxed mb-10"
          >
            To produce outstanding, conversion-focused design we must understand your specific
            needs: your market, your customers, your goals. Build pricing is bespoke to each
            project, but you will always receive a clear, fixed quote before anything starts.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.14, ease: "easeOut" }}
          >
            <AnimatedButton href="/contact" variant="primary">
              Get a free quote
            </AnimatedButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
