"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function HomeLoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            className="flex flex-col items-center gap-6"
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
          >
            {/* Triangle mark */}
            <svg
              width="96"
              height="84"
              viewBox="0 0 96 84"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Main triangle */}
              <polygon points="48,2 94,82 2,82" fill="#0d0d0d" />
              {/* Inner left diagonal */}
              <line x1="48" y1="2" x2="26" y2="82" stroke="#888" strokeWidth="1" />
              {/* Inner right diagonal */}
              <line x1="48" y1="2" x2="70" y2="82" stroke="#888" strokeWidth="1" />
            </svg>

            {/* Wordmark */}
            <span
              className="text-[#0d0d0d] text-[clamp(1.4rem,4vw,2rem)] tracking-[0.01em]"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              CJ Creative Studio.
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
