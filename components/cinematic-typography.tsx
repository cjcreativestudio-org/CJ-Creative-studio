"use client";

interface Props {
  scrollProgress: number; // 0–1, passed from parent each render
}

function mapRange(v: number, a: number, b: number, c: number, d: number): number {
  return c + ((Math.min(Math.max(v, a), b) - a) / (b - a)) * (d - c);
}

interface StageConfig {
  eyebrow: string;
  headline: string;
  opacityIn: [number, number];
  opacityOut: [number, number];
  translateIn: [number, number];
  translateOut: [number, number];
}

const stages: StageConfig[] = [
  {
    eyebrow: "CREATIVE STUDIO",
    headline: "Where creativity\nmeets craft.",
    opacityIn: [0.05, 0.15],
    opacityOut: [0.22, 0.28],
    translateIn: [0.05, 0.15],
    translateOut: [0.22, 0.28],
  },
  {
    eyebrow: "DESIGN OBSESSED",
    headline: "Every pixel.\nIntentional.",
    opacityIn: [0.38, 0.48],
    opacityOut: [0.55, 0.62],
    translateIn: [0.38, 0.48],
    translateOut: [0.55, 0.62],
  },
  {
    eyebrow: "YOUR BRAND",
    headline: "Elevated.\nRemembered.",
    opacityIn: [0.72, 0.82],
    opacityOut: [0.90, 0.95],
    translateIn: [0.72, 0.82],
    translateOut: [0.90, 0.95],
  },
];

function StagePanel({
  config,
  scrollProgress,
}: {
  config: StageConfig;
  scrollProgress: number;
}) {
  const p = scrollProgress;

  const opacityIn = mapRange(p, config.opacityIn[0], config.opacityIn[1], 0, 1);
  const opacityOut = mapRange(p, config.opacityOut[0], config.opacityOut[1], 1, 0);
  const opacity = Math.min(opacityIn, opacityOut);

  const yIn = mapRange(p, config.translateIn[0], config.translateIn[1], 40, 0);
  const yOut = mapRange(p, config.translateOut[0], config.translateOut[1], 0, -30);
  // During the in phase yOut is 0 (clamped), during the out phase yIn is 0 (clamped).
  // Combine: use yIn when entering, yOut when exiting (they don't overlap).
  const y = yIn + yOut;

  const headlineParts = config.headline.split("\n");

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      style={{ opacity, transform: `translateY(${y}px)` }}
    >
      <p
        style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.5)",
          marginBottom: "1.25rem",
        }}
      >
        {config.eyebrow}
      </p>
      <h2
        style={{
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          fontWeight: 600,
          color: "white",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          whiteSpace: "pre-line",
          margin: 0,
        }}
      >
        {headlineParts.map((part, i) => (
          <span key={i}>
            {part}
            {i < headlineParts.length - 1 && <br />}
          </span>
        ))}
      </h2>
    </div>
  );
}

export default function CinematicTypography({ scrollProgress }: Props) {
  return (
    <div className="relative w-full h-full">
      {stages.map((stage, i) => (
        <StagePanel key={i} config={stage} scrollProgress={scrollProgress} />
      ))}
    </div>
  );
}
