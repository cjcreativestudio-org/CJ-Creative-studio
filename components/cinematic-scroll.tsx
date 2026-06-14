"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { getLenis } from "@/lib/lenis-instance";

interface CinematicScrollProps {
  onScrollProgress?: (p: number) => void;
  children?: React.ReactNode;
}

const FRAME_COUNT = 150;
const BASE_PATH = "/assets/sequence/";

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
): void {
  const imgAspect = img.naturalWidth / img.naturalHeight;
  const canvasAspect = canvasW / canvasH;

  let drawW: number;
  let drawH: number;
  let drawX: number;
  let drawY: number;

  if (imgAspect > canvasAspect) {
    // Image is wider than canvas: fit height, overflow width
    drawH = canvasH;
    drawW = canvasH * imgAspect;
    drawX = (canvasW - drawW) / 2;
    drawY = 0;
  } else {
    // Image is taller than canvas: fit width, overflow height
    drawW = canvasW;
    drawH = canvasW / imgAspect;
    drawX = 0;
    drawY = (canvasH - drawH) / 2;
  }

  ctx.drawImage(img, drawX, drawY, drawW, drawH);
}

export default function CinematicScroll({
  onScrollProgress,
  children,
}: CinematicScrollProps) {
  const { images, loaded, progress } = useImagePreloader(FRAME_COUNT, BASE_PATH);

  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIndexRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  // Compute which frame to show based on scroll progress p (0–1)
  const getFrameIndex = (p: number): number =>
    Math.min(FRAME_COUNT - 1, Math.floor(p * FRAME_COUNT));

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const idx = frameIndexRef.current;
    if (idx === lastDrawnFrameRef.current) return;
    lastDrawnFrameRef.current = idx;

    const img = images[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    drawCover(ctx, img, canvas.width, canvas.height);
  }, [images]);

  // RAF loop
  useEffect(() => {
    if (!loaded) return;

    const loop = () => {
      drawFrame();
      rafIdRef.current = requestAnimationFrame(loop);
    };
    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [loaded, drawFrame]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      const rawProgress =
        (window.scrollY - sectionTop) / (sectionHeight - windowHeight);
      const p = Math.max(0, Math.min(1, rawProgress));

      frameIndexRef.current = getFrameIndex(p);
      onScrollProgress?.(p);
    };

    // Native scroll fallback (works when window.scrollY is updated)
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Lenis scroll event — subscribe if Lenis is already running
    const lenis = getLenis();
    let lenisCleanup: (() => void) | null = null;
    if (lenis) {
      lenis.on("scroll", handleScroll);
      lenisCleanup = () => lenis.off("scroll", handleScroll);
    }

    // Fire once on mount to set initial state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      lenisCleanup?.();
    };
  }, [onScrollProgress]);

  // Resize handler: keep canvas pixel-perfect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const syncSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // Force redraw on resize
      lastDrawnFrameRef.current = -1;
    };

    syncSize();
    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);

    return () => ro.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Loading bar */}
        {!loaded && (
          <div
            className="absolute bottom-0 left-0 h-[2px] bg-white/40 transition-all duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        )}

        {/* Typography / overlay slot */}
        {children && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
