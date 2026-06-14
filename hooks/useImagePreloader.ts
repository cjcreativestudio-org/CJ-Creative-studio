"use client";

import { useState, useEffect } from "react";

interface ImagePreloaderResult {
  images: HTMLImageElement[];
  loaded: boolean;
  progress: number;
}

export function useImagePreloader(
  frameCount: number,
  basePath: string
): ImagePreloaderResult {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const imgs: HTMLImageElement[] = [];
    let loadedCount = 0;

    const onLoad = () => {
      loadedCount += 1;
      setProgress(loadedCount / frameCount);
      if (loadedCount === frameCount) {
        setImages(imgs);
        setLoaded(true);
      }
    };

    const onError = () => {
      // Count errored images toward progress so the loading bar still completes
      loadedCount += 1;
      setProgress(loadedCount / frameCount);
      if (loadedCount === frameCount) {
        setImages(imgs);
        setLoaded(true);
      }
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const padded = String(i).padStart(4, "0");
      img.src = `${basePath}${padded}.jpg`;
      img.addEventListener("load", onLoad);
      img.addEventListener("error", onError);
      imgs.push(img);
    }

    return () => {
      for (const img of imgs) {
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onError);
      }
    };
  }, [frameCount, basePath]);

  return { images, loaded, progress };
}
