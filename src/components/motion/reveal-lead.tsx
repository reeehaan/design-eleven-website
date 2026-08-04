"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { dur, ease, START, SHIFT } from "@/lib/motion/tokens";

/**
 * Blur-to-focus lift — hero sub-line and case-study pull quotes only.
 *
 * `filter` is the one non-compositor property allowed on this site, and only
 * here. Never stagger it across more than 3 elements.
 */
export function RevealLead({
  children,
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "blockquote" | "div";
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.from(el, {
          filter: "blur(8px)",
          y: SHIFT.y,
          opacity: 0,
          duration: dur.slow,
          ease: ease.out,
          scrollTrigger: { trigger: el, start: START, once: true },
          // Blur is expensive to composite; drop the hint the moment it lands.
          onComplete: () => {
            el.style.willChange = "auto";
            el.style.filter = "";
          },
        });
        return () => tween.kill();
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    // @ts-expect-error — polymorphic tag; ref widens correctly at runtime
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
