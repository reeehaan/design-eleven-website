"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { dur, ease, START } from "@/lib/motion/tokens";

/**
 * Number roll. Tweens a proxy and formats through Intl so separators are
 * correct at every intermediate value. `tabular-nums` stops layout jitter.
 */
export function CountUp({
  value,
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const format = (n: number) =>
    new Intl.NumberFormat("en-GB", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(n);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const proxy = { value: 0 };
        const tween = gsap.to(proxy, {
          value,
          duration: dur.scene,
          ease: ease.out,
          snap: { value: decimals > 0 ? 0.1 : 1 },
          scrollTrigger: { trigger: el, start: START, once: true },
          onUpdate: () => {
            el.textContent = `${prefix}${format(proxy.value)}${suffix}`;
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
    // Final value is server-rendered, so no-JS and reduced-motion show it too.
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {`${prefix}${format(value)}${suffix}`}
    </span>
  );
}
