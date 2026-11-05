"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { siteConfig } from "@/lib/site";

/**
 * The studio name as a marquee at display scale, looping slowly. Decorative:
 * the name is already in the footer text, so it is hidden from assistive tech.
 * With reduced motion it simply stands still.
 */
export function FooterWordmark() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.fromTo(
          track.current,
          { xPercent: 0 },
          { xPercent: -50, ease: "none", duration: 28, repeat: -1 },
        );
        return () => {
          tween.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const name = `${siteConfig.shortName} ${siteConfig.wordmarkSuffix.toLowerCase()}`;
  const group = [0, 1, 2, 3];

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="overflow-clip border-t border-concrete py-6 md:py-10"
    >
      <div
        ref={track}
        className="flex w-max select-none whitespace-nowrap font-title text-[clamp(4.5rem,15vw,13rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink"
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {group.map((i) => (
              <span key={i} className="flex items-center capitalize">
                {name}
                <span className="mx-[0.4em] inline-block h-[0.14em] w-[0.14em] rounded-full bg-marking" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
