"use client";

import { useId } from "react";
import Image from "next/image";
import {
  MotionValue,
  motion,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { projects } from "@/lib/projects";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function WebsiteAssembly({ scrollYProgress }: Props) {
  const reduce = useReducedMotion();
  const uid = useId();

  // Photo canvas — visible at scroll=0, subtle parallax scale as you scroll
  const frameScale  = useTransform(scrollYProgress, [0, 0.40], [0.96, 1.04]);
  const frameShadow = useTransform(
    scrollYProgress,
    [0.5, 1],
    ["0 8px 32px rgba(0,0,0,0.06)", "0 32px 80px rgba(251,113,133,0.18)"]
  );

  // Glass prism objects
  const triY       = useTransform(scrollYProgress, [0.18, 0.46], [-280, 0]);
  const triRotate  = useTransform(scrollYProgress, [0.18, 0.46], [-8, 0]);
  const triOpacity = useTransform(scrollYProgress, [0.18, 0.30], [0, 1]);

  const rectY       = useTransform(scrollYProgress, [0.28, 0.54], [-320, 0]);
  const rectRotate  = useTransform(scrollYProgress, [0.28, 0.54], [5, 0]);
  const rectOpacity = useTransform(scrollYProgress, [0.28, 0.40], [0, 1]);

  const cubeY       = useTransform(scrollYProgress, [0.34, 0.58], [-240, 0]);
  const cubeRotate  = useTransform(scrollYProgress, [0.34, 0.58], [-3, 0]);
  const cubeOpacity = useTransform(scrollYProgress, [0.34, 0.46], [0, 1]);

  const sphereY       = useTransform(scrollYProgress, [0.40, 0.64], [-260, 0]);
  const sphereOpacity = useTransform(scrollYProgress, [0.40, 0.52], [0, 1]);

  const rainbowOpacity = useTransform(scrollYProgress, [0.50, 0.80], [0, 1]);
  const sceneScale     = useTransform(scrollYProgress, [0.60, 0.90], [1, 1.06]);

  const rainbowBg = [
    "radial-gradient(ellipse at 30% 100%, rgba(253,164,175,0.22) 0%, transparent 50%)",
    "radial-gradient(ellipse at 52% 100%, rgba(196,181,253,0.18) 0%, transparent 45%)",
    "radial-gradient(ellipse at 74% 100%, rgba(147,197,253,0.15) 0%, transparent 40%)",
  ].join(", ");

  return (
    <div
      className="sticky top-0 h-screen w-full z-0 overflow-hidden bg-white"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      <motion.div
        style={reduce ? {} : { scale: sceneScale }}
        className="relative w-full h-full flex items-center justify-center"
        aria-label="Website assembly animation"
      >

        {/* Photo canvas — project image in a clean frame */}
        <motion.div
          style={
            reduce
              ? { width: "min(900px, 90vw)", aspectRatio: "900 / 560" }
              : {
                  scale: frameScale,
                  boxShadow: frameShadow,
                  width: "min(900px, 90vw)",
                  aspectRatio: "900 / 560",
                }
          }
          className="relative rounded-2xl overflow-hidden border border-gray-200/80"
        >
          <Image
            src={projects[0].img}
            alt={projects[0].name}
            fill
            className="object-cover"
            priority
            sizes="min(900px, 90vw)"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/10" />
        </motion.div>

        {/* Foreground glass objects — hidden on mobile, pointer-events-none */}
        <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">

          {/* Triangular prism — drops first, centre */}
          <motion.div
            style={reduce ? {} : { y: triY, rotate: triRotate, opacity: triOpacity }}
            className="absolute left-1/2 bottom-[22%] -translate-x-1/2"
          >
            <svg width="90" height="99" viewBox="0 0 100 110" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id={`triGrad-${uid}`} x1="0" y1="0" x2="100" y2="87" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor="#f472b6" stopOpacity="0.55" />
                  <stop offset="50%"  stopColor="#a78bfa" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.55" />
                </linearGradient>
              </defs>
              <polygon
                points="50,4 96,87 4,87"
                fill={`url(#triGrad-${uid})`}
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.5"
              />
              <polygon points="50,30 72,72 28,72" fill="rgba(255,255,255,0.35)" />
            </svg>
          </motion.div>

          {/* Tall rectangle — left-centre */}
          <motion.div
            style={reduce ? {} : { y: rectY, rotate: rectRotate, opacity: rectOpacity }}
            className="absolute left-[29%] bottom-[28%]"
          >
            <div
              className="w-9 rounded-md border backdrop-blur-md"
              style={{
                height: "72px",
                background: "linear-gradient(160deg, rgba(196,181,253,0.4), rgba(147,197,253,0.35))",
                borderColor: "rgba(255,255,255,0.55)",
                boxShadow: "0 4px 20px rgba(167,139,250,0.2)",
              }}
            />
          </motion.div>

          {/* Small cube — far left */}
          <motion.div
            style={reduce ? {} : { y: cubeY, rotate: cubeRotate, opacity: cubeOpacity }}
            className="absolute left-[19%] bottom-[28%]"
          >
            <div
              className="w-8 h-8 rounded border backdrop-blur-md"
              style={{
                background: "linear-gradient(135deg, rgba(110,231,183,0.4), rgba(96,165,250,0.35))",
                borderColor: "rgba(255,255,255,0.55)",
              }}
            />
          </motion.div>

          {/* Sphere — right */}
          <motion.div
            style={reduce ? {} : { y: sphereY, opacity: sphereOpacity }}
            className="absolute right-[23%] bottom-[27%]"
          >
            <div
              className="w-11 h-11 rounded-full border"
              style={{
                background: "radial-gradient(circle at 35% 35%, rgba(253,164,175,0.6), rgba(196,181,253,0.35) 60%, rgba(147,197,253,0.2))",
                borderColor: "rgba(255,255,255,0.6)",
                boxShadow: "0 4px 20px rgba(253,164,175,0.25)",
              }}
            />
          </motion.div>

          {/* Rainbow light — fades in as objects land */}
          <motion.div
            style={
              reduce
                ? { background: rainbowBg }
                : { opacity: rainbowOpacity, background: rainbowBg }
            }
            className="absolute bottom-0 left-0 right-0 h-[32%]"
            aria-hidden="true"
          />

        </div>
      </motion.div>
    </div>
  );
}
