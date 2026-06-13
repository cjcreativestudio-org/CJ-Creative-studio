"use client";

import { motion, useReducedMotion } from "motion/react";

const principles = [
  {
    title: "Best service first",
    body: "We work with businesses that genuinely need help. Our clients get our full attention, not a template.",
  },
  {
    title: "No lock-in, ever",
    body: "No rising fees mid-contract. No hostage websites. You own your domain and can walk away any time.",
  },
  {
    title: "Visits become customers",
    body: "Every design decision is made to improve conversion and raise your Google ranking.",
  },
  {
    title: "Complete transparency",
    body: "Your domain is bought in your business name. You have full legal access. We just host and maintain.",
  },
];

const steps = [
  {
    number: "01",
    title: "Client form",
    body: "You fill in our contact form with your project needs and goals.",
  },
  {
    number: "02",
    title: "Demo created",
    body: "We build a working demo based on your brief, usually within a week.",
  },
  {
    number: "03",
    title: "Teams call",
    body: "We review together over video call and align on final direction.",
  },
  {
    number: "04",
    title: "Full build",
    body: "The complete website is built. You see it live at every stage.",
  },
  {
    number: "05",
    title: "Final approval",
    body: "You review every detail. Nothing ships without your sign-off.",
  },
  {
    number: "06",
    title: "Sign off & go live",
    body: "Contracts signed, domain connected, hosting begins.",
  },
];

const founders = [
  {
    initials: "JC",
    name: "Josh Carter",
    role: "Co-founder",
    bio: "Economics graduate from the University of Nottingham. Passionate about interface design and the psychology of customer conversion — how small design choices drive big business outcomes.",
    interests: ["Hiking", "Football", "Keeping fit"],
  },
  {
    initials: "OJ",
    name: "Oliver Jackson",
    role: "Co-founder",
    bio: "Economics & Finance graduate from Cardiff University. Passionate about coding for the web and staying at the cutting edge of AI-assisted design. Believes great software should feel inevitable.",
    interests: ["Running", "Tennis", "Padel"],
  },
];

export default function About() {
  const reduce = useReducedMotion();

  return (
    <div className="w-full py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-32">

      {/* ── Section 1: What we stand for ── */}
      <section>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Our principles
          </p>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-gray-900 leading-tight">
            We&apos;re here for businesses<br className="hidden sm:block" /> that want to grow.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="relative rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-100 p-6 overflow-hidden"
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
                style={{ background: "linear-gradient(180deg, #f472b6, #a78bfa)" }}
              />
              <h3 className="text-gray-900 font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-gray-500 text-[15px] leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Section 2: How we operate ── */}
      <section>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Our process
          </p>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-gray-900 leading-tight">
            Six steps from first contact<br className="hidden sm:block" /> to live site.
          </h2>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {steps.map((step) => (
              <div
                key={step.number}
                className="snap-start shrink-0 min-w-[270px] rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-100 p-6 flex flex-col gap-3"
              >
                <span
                  className="text-4xl font-black leading-none"
                  style={{
                    background: "linear-gradient(135deg, #f472b6, #a78bfa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {step.number}
                </span>
                <h3 className="text-gray-900 font-semibold text-base">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex flex-wrap gap-3 mt-6"
        >
          {[
            "24-hour response time on all client messages",
            "Your domain stays in your name — you own it always",
          ].map((pill) => (
            <span
              key={pill}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/60 px-4 py-2 text-xs text-gray-600"
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "linear-gradient(135deg, #f472b6, #a78bfa)" }}
              />
              {pill}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── Section 3: The founders ── */}
      <section>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-gray-900 leading-tight">
            Two people. One studio.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              initial={reduce ? false : { opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: i * 0.15, type: "spring", stiffness: 70, damping: 16 }}
              className="rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-100 p-8 flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full p-[2px] shrink-0"
                  style={{ background: "linear-gradient(135deg, #f472b6, #a78bfa, #60a5fa)" }}
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-900 tracking-wider">
                      {f.initials}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-lg leading-tight">{f.name}</p>
                  <p className="text-[13px] text-gray-400 mt-0.5">{f.role}, CJ Studio</p>
                </div>
              </div>

              <p className="text-[15px] text-gray-500 leading-relaxed">{f.bio}</p>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {f.interests.map((interest, idx) => (
                  <span key={interest} className="flex items-center gap-2">
                    <span className="text-gray-500 text-[14px]">{interest}</span>
                    {idx < f.interests.length - 1 && (
                      <span className="w-1 h-1 rounded-full bg-gray-200 inline-block" />
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
