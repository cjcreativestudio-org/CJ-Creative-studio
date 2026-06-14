"use client";

import { useState } from "react";
import Nav from "@/components/nav";
import LaptopZoom from "@/components/laptop-zoom";
import CinematicScroll from "@/components/cinematic-scroll";
import CinematicTypography from "@/components/cinematic-typography";

export default function HomeClient() {
  const [navOnLight, setNavOnLight] = useState(true);
  const [cinematicProgress, setCinematicProgress] = useState(0);

  return (
    <>
      <Nav onLight={navOnLight} />
      <LaptopZoom onLightChange={setNavOnLight} />
      <CinematicScroll onScrollProgress={setCinematicProgress}>
        <CinematicTypography scrollProgress={cinematicProgress} />
      </CinematicScroll>
    </>
  );
}
