"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { START } from "@/lib/motion/tokens";

export type MetaSegment = { value: string; kind: "num" | "word" };

/**
 * Scramble decode — title-block metadata only. Fires once on first view,
 * never on hover.
 *
 * Numeric fields decode through digits and place names through letters, which
 * is why this takes segments rather than one string.
 */
export function ScrambleMeta({
  segments,
  className,
  separator = " · ",
}: {
  segments: MetaSegment[];
  className?: string;
  separator?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const parts = el.querySelectorAll<HTMLElement>("[data-seg]");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: START, once: true },
        });

        parts.forEach((part) => {
          tl.to(
            part,
            {
              duration: 0.9,
              scrambleText: {
                text: part.dataset.value ?? part.textContent ?? "",
                chars:
                  part.dataset.seg === "num" ? "0123456789" : "upperCase",
                revealDelay: 0.3,
                speed: 0.4,
              },
            },
            0,
          );
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className}>
      {segments.map((s, i) => (
        <span key={`${s.value}-${i}`}>
          {i > 0 && <span aria-hidden="true">{separator}</span>}
          <span data-seg={s.kind} data-value={s.value}>
            {s.value}
          </span>
        </span>
      ))}
    </p>
  );
}
