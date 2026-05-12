"use client";

import { useRef, useState, useEffect, type CSSProperties, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type RevealTag = "div" | "section" | "article" | "li" | "ol" | "ul" | "span" | "p";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: RevealTag;
};

/**
 * Scroll-reveal wrapper. Fades in from 16px below when the element enters the viewport.
 *
 * Uses useInView + CSS transitions instead of motion.* components to avoid the
 * framer-motion SSR hydration mismatch (motion.* sets inline `initial` styles
 * server-side that React's client reconciliation sees as mismatched).
 *
 * Behaviour:
 * - Server/first paint: element renders with no style (visible, no flash).
 * - After mount: opacity/transform applied via CSS transition.
 * - In-viewport on load: immediately visible (isInView = true → no animation).
 * - Below fold: hidden → animates in on scroll.
 * - Reduced motion: no style applied at all.
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "0px 0px -10% 0px",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  let style: CSSProperties | undefined;
  if (mounted && !prefersReducedMotion) {
    style = {
      opacity: isInView ? 1 : 0,
      transform: isInView ? "none" : "translateY(16px)",
      transition: [
        `opacity 0.6s ${delay}s cubic-bezier(0.22,1,0.36,1)`,
        `transform 0.6s ${delay}s cubic-bezier(0.22,1,0.36,1)`,
      ].join(", "),
    };
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} style={style}>
      {children}
    </Tag>
  );
}
