"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, SplitText, fontsReady } from "@/lib/motion/gsap";
import { MQ } from "@/lib/motion/tokens";

/**
 * EFFECT 2 — Word opacity scrub.
 *
 * PERMITTED IN EXACTLY TWO PLACES:
 *   1. the studio statement on /about
 *   2. the opening brief on a case study
 *
 * It forces reading pace, which suits a paragraph you actually want read.
 * On a third page it stops being emphasis and becomes the site's personality.
 */
export function ScrubParagraph({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      // Reduced motion: the scrub becomes no animation at all. Full opacity
      // is the authored CSS state, so there is nothing to undo.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let split: SplitText | null = null;

        fontsReady().then(() => {
          split = SplitText.create(el, {
            type: "words",
            autoSplit: true,
            onSplit: (self) =>
              gsap.fromTo(
                self.words,
                { opacity: 0.15 },
                {
                  opacity: 1,
                  ease: "none",
                  stagger: 0.5,
                  scrollTrigger: {
                    trigger: el,
                    start: "top 75%",
                    end: "bottom 60%",
                    scrub: true,
                  },
                },
              ),
          });
        });

        return () => split?.revert();
      });

      // Pinning and scrubbing are dropped below desktop — on a short viewport
      // the paragraph never gets the scroll distance to finish decoding.
      mm.add(MQ.belowDesktop, () => {});

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}
