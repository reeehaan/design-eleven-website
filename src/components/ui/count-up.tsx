"use client";

import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  animate,
} from "framer-motion";

type CountUpProps = {
  /** The final value to display (e.g. "05", "40+", "100%") */
  value: string;
  /** Animation duration in seconds. Default 1.6. */
  duration?: number;
  className?: string;
};

export function CountUp({ value, duration = 2.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const prefersReducedMotion = useReducedMotion();

  // Parse the value once: extract numeric portion, padding, and suffix.
  const parsed = parseValue(value);
  const { numeric, target, padLength, suffix } = parsed;

  // Local state holds the currently-displayed number
  const [display, setDisplay] = useState(prefersReducedMotion ? target : 0);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    // If the value isn't numeric, or reduced motion is preferred, nothing to animate.
    if (!numeric || prefersReducedMotion) return;

    // Not in view yet — don't animate.
    if (!isInView) return;

    // Animate the motion value from 0 to target.
    const controls = animate(motionValue, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplay(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, motionValue, target, duration, prefersReducedMotion, numeric]);

  // Format display: pad zeros if original had padding
  const formatted = padLength
    ? display.toString().padStart(padLength, "0")
    : display.toString();

  // If the value wasn't numeric, render it exactly as given.
  if (!numeric) {
    return (
      <span ref={ref} className={className} aria-label={value}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className} aria-label={value}>
      {formatted}
      {suffix}
    </span>
  );
}

function parseValue(value: string): {
  numeric: boolean;
  target: number;
  padLength: number;
  suffix: string;
} {
  const match = value.match(/^(\d+)(.*)$/);

  if (!match) {
    return { numeric: false, target: 0, padLength: 0, suffix: value };
  }

  const [, digits, suffix] = match;
  const target = parseInt(digits, 10);
  const padLength =
    digits.startsWith("0") && digits.length > 1 ? digits.length : 0;

  return { numeric: true, target, padLength, suffix };
}
