"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import type { Project } from "@/lib/projects";

/**
 * The featured projects as one pinned scene. A statement sits alone, then a
 * photograph rises under it and opens to fill the screen; scrolling on swaps
 * it for the next project, each with its name and place set over the picture.
 * Without motion it is the first project with a link to the rest.
 */
export function HomeShowcase({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const n = projects.length;
        if (n === 0 || !root.current) return;
        const h = window.innerHeight;
        // The track is as tall as the scene is long; the section sticks inside it.
        const run = root.current;
        run.style.height = `${Math.round(h * (n + 1))}px`;

        const slides = gsap.utils.toArray<HTMLElement>("[data-slide]");
        const texts = gsap.utils.toArray<HTMLElement>("[data-text]");
        const imgs = gsap.utils.toArray<HTMLElement>("[data-img]");

        gsap.set(texts, { opacity: 0, y: 24 });
        gsap.set(slides.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            // Nothing moves until the section has reached the top of the screen.
            start: "top top",
            invalidateOnRefresh: true,
            end: "bottom bottom",
            scrub: 0.3,
          },
        });

        // Phase one: the statement lifts away while the frame rises from
        // below and opens to the screen, leaving a margin and rounded corners.
        tl.fromTo(
          "[data-frame]",
          { clipPath: "inset(100% 33% 0% 33% round 18px)" },
          { clipPath: "inset(12px 12px 12px 12px round 0px)", duration: 2.4 },
          0,
        )
          .fromTo(
            "[data-lede]",
            { yPercent: 0, opacity: 1 },
            { yPercent: -70, opacity: 0, duration: 1.8 },
            0,
          )
          .fromTo(imgs[0], { scale: 1.25 }, { scale: 1, duration: 2.4 }, 0)
          .to(
            texts[0],
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            2,
          );

        // Then one step per further project.
        for (let i = 1; i < n; i++) {
          const at = i + 1.6;
          tl.to(texts[i - 1], { opacity: 0, y: -24, duration: 0.25 }, at)
            .to(
              slides[i],
              { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7 },
              at,
            )
            .fromTo(imgs[i], { scale: 1.2 }, { scale: 1, duration: 0.7 }, at)
            .to(
              texts[i],
              { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
              at + 0.55,
            )
            .to(
              "[data-count]",
              { yPercent: -(100 / n) * i, duration: 0.01 },
              at + 0.35,
            );
        }
        // Size the track to the scene: a little under a screen of scrolling per
        // step, with no dead run after the last project.
        run.style.height = `${Math.round(tl.duration() * h * 0.6 + h * 0.25)}px`;
        tl.scrollTrigger?.refresh();

        return () => {
          run.style.height = "";
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [projects.length] },
  );

  return (
    <div ref={root} className="relative">
      <section
        aria-labelledby="showcase-heading"
        className="sticky top-0 h-svh overflow-clip bg-paper"
      >
        <div
          data-lede
          className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-3 text-center"
        >
          <h2
            id="showcase-heading"
            className="mx-auto max-w-[16ch] font-sans text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink"
          >
            Featured works
          </h2>
        </div>

        <div
          data-frame
          className="absolute inset-x-0 bottom-0 top-16 bg-paper-sunk md:top-20"
        >
          {projects.map((p, i) => (
            <div key={p.slug} data-slide className="absolute inset-0">
              <div data-img className="absolute inset-0 will-change-transform">
                <Image
                  src={p.cover.src}
                  alt={p.cover.alt}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/10 to-transparent" />
              <div
                data-text
                className="absolute inset-x-0 bottom-0 grid grid-cols-12 items-end gap-x-3 gap-y-6 px-8 pb-12 text-paper md:px-12 md:pb-16"
              >
                <div className="col-span-12 md:col-span-8">
                  <p className="font-sans text-base font-semibold">
                    {p.category}, {p.location}, {p.year}
                  </p>
                  <p className="mt-3 font-sans text-[clamp(2.25rem,6vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
                    {p.title}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-3 md:col-start-10">
                  <p className="font-sans text-[1.0625rem] font-semibold leading-[1.2] tracking-[-0.01em]">
                    {p.summary}
                  </p>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="mt-5 inline-flex items-center gap-2 border-b border-paper pb-1 font-sans text-base font-semibold"
                  >
                    View project
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <div
            aria-hidden="true"
            className="absolute left-8 top-8 flex items-center gap-2 font-sans text-base font-semibold tabular-nums text-paper md:left-12"
          >
            <span className="block h-[1.4em] overflow-clip">
              <span data-count className="block">
                {projects.map((_, i) => (
                  <span key={i} className="block h-[1.4em] leading-[1.4]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ))}
              </span>
            </span>
            <span>/ {String(projects.length).padStart(2, "0")}</span>
          </div>

          <Link
            href="/projects"
            className="absolute right-8 top-8 z-10 font-sans text-base font-semibold text-paper underline-offset-4 hover:underline md:right-12"
          >
            All projects
          </Link>
        </div>
      </section>
    </div>
  );
}
