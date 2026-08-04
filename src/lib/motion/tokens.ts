/**
 * Motion tokens. Durations and eases are design tokens exactly like colour is.
 * Defined once here; a raw number in a component is a bug.
 */

export const dur = {
  micro: 0.18, // press, toggle, hover-in
  quick: 0.4, // label swaps, underlines
  base: 0.7, // element reveals
  slow: 1.0, // hero lines, section headers
  scene: 1.4, // orchestrated load sequence
} as const;

export const ease = {
  out: "power3.out", // default for reveals
  inOut: "power2.inOut", // repositioning, FLIP
  expo: "expo.out", // masks and wipes — long tail, feels engineered
  spring: "elastic.out(1, 0.7)", // reserved: submit success only
} as const;

export const stagger = {
  tight: 0.03,
  line: 0.07,
  card: 0.09,
} as const;

/**
 * One trigger point for the whole site. Inconsistent start values are why
 * sites feel unpredictable, so every reveal uses this unless it scrubs.
 */
export const START = "top 82%" as const;

/** Single-axis rule: reveals move on Y only, and never far. */
export const SHIFT = { y: 24, yPercentMasked: 110 } as const;

/** The three breakpoints every animation is scoped to via gsap.matchMedia. */
export const MQ = {
  desktop: "(min-width: 1024px)",
  belowDesktop: "(max-width: 1023px)",
  reduced: "(prefers-reduced-motion: reduce)",
  finePointer: "(pointer: fine)",
} as const;
