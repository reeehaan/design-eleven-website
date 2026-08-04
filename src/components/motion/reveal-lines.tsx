"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, SplitText, fontsReady } from "@/lib/motion/gsap";
import { dur, ease, stagger, START, SHIFT, MQ } from "@/lib/motion/tokens";

/**
 * Line mask reveal — for display headings and section headers.
 *
 * gsap.from() only, so the CSS state is the final state: a JS failure leaves
 * readable text rather than a blank.
 */
export function RevealLines({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(MQ.reduced, () => {});

      mm.add(`(prefers-reduced-motion: no-preference)`, () => {
        let split: SplitText | null = null;

        // Splitting before the webfont swaps measures the fallback.
        fontsReady().then(() => {
          split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "reveal-line",
            autoSplit: true, // re-splits on resize and font swap
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: SHIFT.yPercentMasked,
                duration: dur.slow,
                ease: ease.expo,
                stagger: stagger.line,
                delay,
                scrollTrigger: { trigger: el, start: START, once: true },
              }),
          });
        });

        return () => split?.revert();
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
