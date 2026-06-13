"use client";

import { motion, useReducedMotion } from "motion/react";

const founders = [
  {
    name: "Josh Carter",
    role: "Co-founder",
    initials: "JC",
    bio: "Obsessed with clean code and making things that work. Handles the build side and makes sure every site ships on time.",
  },
  {
    name: "Ollie Jackson",
    role: "Co-founder",
    initials: "OJ",
    bio: "Leads design and client relationships. Believes a great website is the best first impression a business can make.",
  },
];

export default function Founders() {
  const reduce = useReducedMotion();

  return (
    <section id="founders" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          className="mb-16"
        >
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-gray-900 leading-tight">
            The people behind<br />the pixels.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              initial={reduce ? false : { opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                type: "spring",
                stiffness: 70,
                damping: 16,
              }}
              whileHover={reduce ? {} : {
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col gap-6"
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-4">
                {/* Gradient-border circle */}
                <div
                  className="w-14 h-14 rounded-full p-px shrink-0"
                  style={{ background: "linear-gradient(135deg, #8a6cff, #4d7cff, #27d7c4)" }}
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-[14px] font-semibold tracking-tight text-gray-900">
                      {f.initials}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-gray-900">{f.name}</h3>
                  <p className="text-[13px] text-gray-400 tracking-tight mt-0.5">{f.role}, CJ Studio</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-[15px] text-gray-500 leading-relaxed">{f.bio}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center text-[14px] text-gray-400"
        >
          Two people. One studio. Every site built with care.
        </motion.p>
      </div>
    </section>
  );
}
