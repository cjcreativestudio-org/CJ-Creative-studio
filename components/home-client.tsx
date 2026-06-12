"use client";

import { useState } from "react";
import Nav from "@/components/nav";
import LaptopZoom from "@/components/laptop-zoom";

export default function HomeClient() {
  const [navOnLight, setNavOnLight] = useState(true);

  return (
    <>
      <Nav onLight={navOnLight} />
      <LaptopZoom onLightChange={setNavOnLight} />
    </>
  );
}
