/**
 * Motion tokens. Durations and eases are design tokens exactly like colour is.
 * Defined once here; a raw number in a component is a bug.
 */

export const dur = {
  micro: 0.18, // press, toggle
  quick: 0.4, // underlines, small state changes
  hover: 0.65, // label swaps and fill wipes — deliberately unhurried
  base: 0.7, // element reveals
  slow: 1.0, // hero lines, section headers
  scene: 1.4, // orchestrated load sequence
} as const;

/**
 * Magnetic pull. The field is larger than the button and never moves, so the
 * button cannot translate out from under the pointer — doing that fires
 * pointerleave, springs it back, and oscillates.
 */
export const magnet = {
  field: 28, // px the field extends past the button on every side
  pull: 0.28, // fraction of pointer offset the button travels
  labelPull: 0.14, // label lags the button; that offset is what sells it
  max: 10, // px cap, so it stays a nudge
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
