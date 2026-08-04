"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { dur, ease, START, SHIFT } from "@/lib/motion/tokens";

type RevealTag =
  | "div"
  | "section"
  | "article"
  | "li"
  | "ol"
  | "ul"
  | "span"
  | "p";

/**
 * Generic block and media reveal — a clip wipe with a small Y offset.
 * Prefer <RevealLines> for headings.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: RevealTag;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.from(el, {
          clipPath: "inset(0% 0% 100% 0%)",
          y: SHIFT.y,
          duration: dur.base,
          ease: ease.expo,
          delay,
          scrollTrigger: { trigger: el, start: START, once: true },
          onComplete: () => {
            // Leaving a clip-path behind creates a containing block for any
            // fixed descendant, which is how modals end up mis-sized.
            gsap.set(el, { clipPath: "none" });
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}
