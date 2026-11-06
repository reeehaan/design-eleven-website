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
    // Smooth scrolling everywhere, touch included. The scroll scenes are
    // sticky tracks (plus one pinned section) that ScrollTrigger reads from
    // Lenis, so they stay in step with it. Reduced motion keeps native scroll.
    const useLenis = !reduced();
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (useLenis) {
      lenis = new Lenis({
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // A slower, softer wheel: each notch travels less.
        wheelMultiplier: 0.7,
        // Touch gets the same easing instead of the browser's own fling.
        syncTouch: true,
        syncTouchLerp: 0.08,
        touchMultiplier: 0.9,
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
      window.clearTimeout(settle);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };

    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);
    // Late layout (images, the hero's measured track) settles after load.
    const settle = window.setTimeout(() => ScrollTrigger.refresh(), 1200);
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
