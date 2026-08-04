"use client";

/**
 * Single GSAP entry point — plugins are registered once, here. Import from
 * this module, never from "gsap" directly.
 *
 * The plugins are free as of 3.13, so the version is pinned in package.json.
 */

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    SplitText,
    Draggable,
    Flip,
    ScrambleTextPlugin,
  );
}

export { gsap, useGSAP, ScrollTrigger, SplitText, Draggable, Flip, ScrambleTextPlugin };

/**
 * Splitting text before the webfont loads measures the fallback, so lines
 * break in the wrong place on first paint. Await this before any SplitText.
 */
export async function fontsReady(): Promise<void> {
  if (typeof document === "undefined") return;
  try {
    await document.fonts.ready;
  } catch {
    // Non-fatal: a browser without the Font Loading API just splits early.
  }
}

/** Read at call time — the OS setting can change mid-session. */
export function reduced(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
