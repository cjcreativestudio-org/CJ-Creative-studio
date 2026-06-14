"use client";

import Nav from "@/components/nav";
import CinematicSection from "@/components/cinematic-section";

export default function HomeClient() {
  return (
    <>
      <Nav onLight={false} />
      <CinematicSection />
    </>
  );
}
