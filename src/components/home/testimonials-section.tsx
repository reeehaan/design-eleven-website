"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { dur, ease } from "@/lib/motion/tokens";
import { Eyebrow } from "@/components/motion/eyebrow";
import { testimonials } from "@/lib/testimonials";
import { getProjectBySlug } from "@/lib/projects";

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  // Direction of travel, so the incoming quote enters from the side the
  // reader asked to move toward.
  const dir = useRef(1);
  const root = useRef<HTMLDivElement>(null);
  const total = testimonials.length;

  const go = (next: number, direction: 1 | -1) => {
    dir.current = direction;
    setIndex((next + total) % total);
  };

  useGSAP(
    () => {
      const incoming = root.current?.querySelector<HTMLElement>(
        '[data-quote][data-active="true"]',
      );
      if (!incoming) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.fromTo(
          incoming,
          { opacity: 0, y: 18 * dir.current },
          { opacity: 1, y: 0, duration: dur.base, ease: ease.out },
        );
        return () => tween.kill();
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [index] },
  );

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="border-t border-concrete bg-paper"
    >
      <div className="mx-auto w-full max-w-360 px-6 py-20 md:px-10 md:py-28 lg:px-16">
        <Eyebrow>A-400 · Word from clients</Eyebrow>
        <h2 id="testimonials-heading" className="sr-only">
          Client testimonials
        </h2>

        <div
          ref={root}
          className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-x-10"
        >
          {/* Every quote occupies the same grid cell, so the block is always
              as tall as the longest one. Without this the row height tracks
              the current quote and the controls beside it move on each
              change. */}
          <div className="grid md:col-span-9">
            {testimonials.map((t, i) => {
              const isActive = i === index;
              return (
                <blockquote
                  key={t.id}
                  data-quote
                  data-active={isActive}
                  aria-hidden={!isActive}
                  // Stacked in one cell; inactive copies keep their space but
                  // are inert and invisible.
                  className={`col-start-1 row-start-1 ${
                    isActive ? "" : "pointer-events-none invisible opacity-0"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="block font-title text-7xl leading-none text-verdigris md:text-8xl"
                  >
                    &ldquo;
                  </span>
                  <p className="mt-2 max-w-[22ch] font-title text-d3 font-medium leading-snug text-ink md:max-w-[26ch]">
                    {t.quote}
                  </p>
                  <footer className="mt-10 flex flex-col gap-1 border-t border-concrete pt-5 font-meta text-meta-sm uppercase md:flex-row md:items-center md:gap-6">
                    <cite className="not-italic text-ink">— {t.name}</cite>
                    <span className="text-zinc">{t.role}</span>
                    {/* Two testimonials still point at projects that were
                        never published, and one at a draft. Only link when
                        the slug actually resolves, or this 404s. */}
                    {t.projectSlug && getProjectBySlug(t.projectSlug) && (
                      <Link
                        href={`/projects/${t.projectSlug}`}
                        tabIndex={isActive ? 0 : -1}
                        className="text-verdigris underline-offset-4 transition-colors hover:underline md:ml-auto"
                      >
                        View project →
                      </Link>
                    )}
                  </footer>
                </blockquote>
              );
            })}
          </div>

          {/* Controls sit at the top of the column, not spread across it, so
              their position never depends on the quote's height. */}
          <div className="flex items-center justify-between gap-6 md:col-span-3 md:flex-col md:items-end md:justify-start md:gap-8">
            <p
              className="font-meta text-meta uppercase text-zinc"
              aria-live="polite"
            >
              <span className="text-ink">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <span className="text-concrete">
                {" "}
                / {total.toString().padStart(2, "0")}
              </span>
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1, -1)}
                aria-label="Previous testimonial"
                className="group inline-flex h-12 w-12 items-center justify-center border border-concrete text-ink transition-colors duration-300 hover:border-verdigris hover:bg-verdigris hover:text-paper"
              >
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-out group-hover:-translate-x-0.5"
                >
                  ←
                </span>
              </button>
              <button
                type="button"
                onClick={() => go(index + 1, 1)}
                aria-label="Next testimonial"
                className="group inline-flex h-12 w-12 items-center justify-center border border-concrete text-ink transition-colors duration-300 hover:border-verdigris hover:bg-verdigris hover:text-paper"
              >
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                >
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
