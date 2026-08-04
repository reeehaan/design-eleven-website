"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion/gsap";
import { dur, ease, stagger, START, SHIFT } from "@/lib/motion/tokens";

/**
 * Staggered reveal for a list or grid of siblings.
 *
 * Uses ScrollTrigger.batch, so a twelve-row list costs one trigger rather
 * than twelve. Children animate in the order they enter the viewport, which
 * matters on mobile where several enter together.
 */
export function RevealItems({
  children,
  className,
  as: Tag = "ul",
  selector = ":scope > *",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Override when the animated children are not direct descendants. */
  selector?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = Array.from(el.querySelectorAll<HTMLElement>(selector));
        if (items.length === 0) return;

        // Authored state is visible; only the FROM state is applied here, so
        // a JS failure leaves the list readable.
        gsap.set(items, { opacity: 0, y: SHIFT.y });

        const triggers = ScrollTrigger.batch(items, {
          start: START,
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: dur.base,
              ease: ease.out,
              stagger: stagger.card,
              overwrite: true,
            }),
        });

        return () => {
          triggers.forEach((t) => t.kill());
          gsap.set(items, { clearProps: "opacity,transform" });
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
