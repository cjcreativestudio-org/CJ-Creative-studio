"use client";

export default function FilmGrain() {
  return (
    <div
      className="fixed inset-0 pointer-events-none opacity-[0.04]"
      style={{ zIndex: 9999 }}
    >
      <svg
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
