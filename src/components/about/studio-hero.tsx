"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import type { SiteImage } from "@/lib/images";

/**
 * The studio's opening: a title split either side of a photograph. Scrolling
 * opens the photograph to the full screen while the two halves slide inward
 * over it, then the page carries on. Below md it is a plain stack.
 */
export function StudioHero({
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
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const navH = document.querySelector("header")?.clientHeight ?? 0;
        const slide =
          window.innerWidth * (window.innerWidth < 768 ? 0.1 : 0.13);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: `top top+=${navH}`,
            end: "+=65%",
            pin: true,
            scrub: 0.3,
          },
        });
        tl.fromTo(
          "[data-frame]",
          { clipPath: "inset(24% 25% 24% 25%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
          0,
        )
          .fromTo("[data-img]", { scale: 1.2 }, { scale: 1, duration: 1 }, 0)
          .fromTo("[data-left]", { x: 0 }, { x: slide, duration: 1 }, 0)
          .fromTo("[data-right]", { x: 0 }, { x: -slide, duration: 1 }, 0)
          .to(
            "[data-word]",
            { color: "var(--color-paper)", duration: 0.15 },
            0.2,
          );
        return () => {
          tl.scrollTrigger?.kill(true);
          tl.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby={id}
      className="relative overflow-clip bg-paper"
    >
      <div className="relative flex h-[calc(100svh-4rem)] flex-col items-center justify-center px-3 md:h-[calc(100svh-5rem)] md:flex-row md:justify-between">
        <div data-frame className="absolute inset-0 overflow-clip">
          <div data-img className="absolute inset-0 will-change-transform">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        <h1
          id={id}
          className="relative z-10 flex w-full flex-col items-center gap-3 text-center font-sans text-[clamp(2.25rem,4.4vw,4rem)] font-semibold leading-none tracking-[-0.03em] text-ink md:flex-row md:justify-between md:px-[6vw] md:text-left"
        >
          <span data-left data-word className="block">
            {left}
          </span>
          <span data-right data-word className="block">
            {right}
          </span>
        </h1>
      </div>
    </section>
  );
}
