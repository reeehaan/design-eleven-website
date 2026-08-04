"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { dur, ease, START } from "@/lib/motion/tokens";

/**
 * Section eyebrow. The rule draws left-to-right slightly ahead of the heading
 * it introduces, so the eye is led in rather than racing it.
 */
export function Eyebrow({
  children,
  className,
  active = false,
  onDark = false,
}: {
  children: ReactNode;
  className?: string;
  active?: boolean;
  onDark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rule = ref.current?.querySelector("[data-rule]");
      if (!rule) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.from(rule, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: dur.base,
          ease: ease.expo,
          scrollTrigger: { trigger: ref.current, start: START, once: true },
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

  const ruleColour = active
    ? "bg-verdigris"
    : onDark
      ? "bg-graphite"
      : "bg-concrete";

  const textColour = active
    ? onDark
      ? "text-verdigris-light"
      : "text-verdigris"
    : "text-zinc";

  return (
    <div ref={ref} className={`flex items-center gap-4 ${className ?? ""}`}>
      <span
        className={`font-meta text-meta uppercase transition-colors duration-300 ${textColour}`}
      >
        {children}
      </span>
      <span
        data-rule
        aria-hidden="true"
        className={`h-px flex-1 transition-colors duration-300 ${ruleColour}`}
      />
    </div>
  );
}
