"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { RevealLines } from "@/components/motion/reveal-lines";
import type { Project } from "@/lib/projects";

/**
 * Case-study opening: the title set large and lifted line by line, the
 * category, place and year on one line, then the cover photograph opening from
 * an inset frame while it drifts. Works the same on every screen size.
 */
export function ProjectHero({ project }: { project: Project }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const a = gsap.fromTo(
          "[data-frame]",
          { clipPath: "inset(16% 12% 16% 12%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: "[data-frame]",
              start: "top 95%",
              end: "top 25%",
              scrub: 0.3,
            },
          },
        );
        const b = gsap.fromTo(
          "[data-img]",
          { yPercent: -7, scale: 1.15 },
          {
            yPercent: 7,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-frame]",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.3,
            },
          },
        );
        return () => {
          [a, b].forEach((t) => {
            t.scrollTrigger?.kill();
            t.kill();
          });
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="project-hero-title"
      className="bg-paper px-3"
    >
      <p className="pt-14 font-sans text-base font-semibold text-zinc md:pt-32">
        {project.category}, {project.location}, {project.year}
      </p>
      <RevealLines
        as="h1"
        id="project-hero-title"
        className="mt-4 max-w-[16ch] font-sans text-[clamp(2.5rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink"
      >
        {project.title}
      </RevealLines>

      <div
        data-frame
        className="relative mt-8 h-[56svh] w-full overflow-clip bg-paper-sunk md:mt-14 md:h-[min(92svh,900px)]"
      >
        <div data-img className="absolute inset-0 will-change-transform">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
