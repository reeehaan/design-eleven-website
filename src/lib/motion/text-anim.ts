"use client";

import { gsap, SplitText } from "./gsap";

/**
 * The site's two text animations, defined once so every page matches. Both
 * play once, when the text first comes into view, and finish in about a
 * second, so nothing is ever left half-revealed.
 *
 * - **title** (h1, h2, h3, section titles): letters drop up out of a mask,
 *   one after another.
 * - **body** (paragraphs, lists, quotes): a plain fade that rises a few
 *   pixels into place.
 *
 * Both leave the text fully visible with reduced motion or no script.
 */
export type TextKind = "title" | "body";

export type TextOptions = {
  kind: TextKind;
  /** Where the text must reach before it plays (default: 90% down the screen). */
  start?: string;
  /** Kept for callers that still pass it; the animations no longer scrub. */
  end?: string;
  auto?: boolean;
};

export function animateText(el: HTMLElement, opts: TextOptions): () => void {
  const { kind } = opts;
  const trigger = { trigger: el, start: opts.start ?? "top 90%", once: true };

  if (kind === "body") {
    const tween = gsap.from(el, {
      y: 18,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: trigger,
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(el, { clearProps: "transform,opacity" });
    };
  }

  const split = SplitText.create(el, {
    type: "chars,words",
    // A mask clips the letters as they rise.
    mask: "words",
    autoSplit: true,
    onSplit: (self) =>
      gsap.from(self.chars, {
        yPercent: 115,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.025,
        scrollTrigger: trigger,
      }),
  });
  return () => split.revert();
}
