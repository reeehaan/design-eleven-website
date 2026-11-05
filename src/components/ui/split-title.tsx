"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import type { SiteImage } from "@/lib/images";

/**
 * A page title broken around a photograph. The two halves read as one
 * sentence; scrolling parts them and opens the picture between. Below md the
 * halves stack above and below the photograph instead.
 */
export function SplitTitle({
  id,
  left,
  right,
  image,
}: {
  id: string;
  left: string;
  right: string;
  image: SiteImage;
}) {
  const root = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top 85%",
              end: "bottom 15%",
              scrub: 0.6,
            },
          });
          tl.fromTo("[data-left]", { x: 80 }, { x: -24 }, 0)
            .fromTo("[data-right]", { x: -80 }, { x: 24 }, 0)
            .fromTo(
              "[data-frame]",
              { clipPath: "inset(18% 12% 18% 12%)" },
              { clipPath: "inset(0% 0% 0% 0%)" },
              0,
            );
          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <h1
      ref={root}
      id={id}
      className="flex flex-col items-start gap-5 font-title text-d1 font-medium text-ink md:flex-row md:items-center md:justify-between md:gap-8"
    >
      <span data-left className="block">
        {left}
      </span>
      <span
        data-frame
        aria-hidden="true"
        className="relative block aspect-4/5 w-full max-w-72 shrink-0 overflow-clip bg-paper-sunk md:w-[22vw] md:max-w-88"
      >
        <Image
          src={image.src}
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 22vw, 70vw"
          className="object-cover"
        />
      </span>
      <span data-right className="block">
        {right}
      </span>
    </h1>
  );
}
