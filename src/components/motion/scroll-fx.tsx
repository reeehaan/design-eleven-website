"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";

/**
 * Scroll animation for small screens, where the pinned desktop scenes are off.
 * Marks inside the page opt in: `data-fx="img"` opens a photograph from an
 * inset frame as it crosses the screen, `data-fx="rise"` lifts text into place.
 * Renders nothing.
 */
export function ScrollFx({ below = 1024 }: { below?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        `(max-width: ${below - 1}px) and (prefers-reduced-motion: no-preference)`,
        () => {
          const made: gsap.core.Animation[] = [];

          gsap.utils.toArray<HTMLElement>("[data-fx=img]").forEach((el) => {
            const inner = el.querySelector<HTMLElement>("img");
            made.push(
              gsap.fromTo(
                el,
                { clipPath: "inset(14% 10% 14% 10%)" },
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                  ease: "none",
                  scrollTrigger: {
                    trigger: el,
                    start: "top 92%",
                    end: "top 35%",
                    scrub: 0.3,
                  },
                },
              ),
            );
            if (inner) {
              made.push(
                gsap.fromTo(
                  inner,
                  { scale: 1.25 },
                  {
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                      trigger: el,
                      start: "top 92%",
                      end: "bottom 30%",
                      scrub: 0.3,
                    },
                  },
                ),
              );
            }
          });

          gsap.utils.toArray<HTMLElement>("[data-fx=rise]").forEach((el) => {
            made.push(
              gsap.from(el, {
                y: 36,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 90%", once: true },
              }),
            );
          });

          return () => {
            made.forEach((a) => {
              (a as gsap.core.Tween).scrollTrigger?.kill();
              a.kill();
            });
          };
        },
      );
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <span ref={ref} hidden />;
}
