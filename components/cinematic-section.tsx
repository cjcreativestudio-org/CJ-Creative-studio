"use client";

import { useState } from "react";
import CinematicScroll from "./cinematic-scroll";
import CinematicTypography from "./cinematic-typography";

export default function CinematicSection() {
  const [progress, setProgress] = useState(0);
  return (
    <CinematicScroll onScrollProgress={setProgress}>
      <CinematicTypography scrollProgress={progress} />
    </CinematicScroll>
  );
}
