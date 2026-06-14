import Lenis from "lenis";

let _lenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return _lenis;
}

export function initLenis(): Lenis {
  if (_lenis) return _lenis;
  _lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  function raf(time: number) {
    _lenis!.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  return _lenis;
}

export function destroyLenis(): void {
  _lenis?.destroy();
  _lenis = null;
}
