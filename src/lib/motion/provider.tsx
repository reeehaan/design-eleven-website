"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, reduced } from "./gsap";

/**
 * Mounted once in the root layout. Owns the scroll loop and the global
 * ScrollTrigger refresh policy. Renders nothing.
 */
export function MotionProvider() {
  useEffect(() => {
    // Smooth scroll hijacks native scrolling entirely, so with reduced motion
    // we leave the browser's own scrolling alone and only wire up refreshes.
    const useLenis = !reduced();
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (useLenis) {
      lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.6,
      });

      lenis.on("scroll", ScrollTrigger.update);

      tick = (time: number) => {
        // gsap.ticker reports seconds; Lenis expects milliseconds.
        lenis!.raf(time * 1000);
      };

      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // Late-loading images and the font swap both change layout height, which
    // leaves every ScrollTrigger measuring against stale positions.
    let refreshTimer: number | undefined;
    const refresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };

    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      if (tick) {
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
      }
      lenis?.destroy();
    };
  }, []);

  return null;
}
