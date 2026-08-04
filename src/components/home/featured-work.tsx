"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, reduced } from "@/lib/motion/gsap";
import { ease } from "@/lib/motion/tokens";
import { getFeaturedProjects, type Project } from "@/lib/projects";

function metaStrip(p: Project): string {
  return [
    p.projectNo,
    p.location.toUpperCase(),
    String(p.year),
    p.area ? `${p.area.toLocaleString()} SQ FT` : null,
    `${p.durationMonths} ${p.durationMonths === 1 ? "MONTH" : "MONTHS"}`,
  ]
    .filter(Boolean)
    .join(" · ");
}

export function FeaturedWork() {
  const projects = getFeaturedProjects();
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  // Cursor-tracked preview. Desktop pointer only — on touch it would be a
  // floating box with no way to dismiss it.
  useEffect(() => {
    const el = preview.current;
    const container = root.current;
    if (!el || !container) return;
    if (reduced()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: ease.out });
    const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: ease.out });

    const onMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
    };

    container.addEventListener("pointermove", onMove);
    return () => container.removeEventListener("pointermove", onMove);
  }, []);

  // Show and hide the preview as rows gain and lose hover.
  useEffect(() => {
    const el = preview.current;
    if (!el) return;
    if (reduced()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const tween = gsap.to(el, {
      autoAlpha: active === null ? 0 : 1,
      scale: active === null ? 0.92 : 1,
      duration: 0.4,
      ease: ease.out,
    });
    return () => {
      tween.kill();
    };
  }, [active]);

  if (projects.length === 0) return null;

  return (
    <section
      aria-labelledby="work-heading"
      className="border-t border-concrete bg-paper"
    >
      <div className="mx-auto w-full max-w-360 px-6 py-20 md:px-10 md:py-28 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2
            id="work-heading"
            className="font-title text-d2 font-medium text-ink"
          >
            Selected work
          </h2>
          <Link
            href="/projects"
            className="font-meta text-meta uppercase text-verdigris underline-offset-4 hover:underline"
          >
            All projects →
          </Link>
        </div>

        <div ref={root} className="relative mt-14">
          {/* Floating preview. pointer-events-none so it never blocks a click. */}
          <div
            ref={preview}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-20 hidden aspect-4/5 w-64 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-paper-sunk opacity-0 lg:block"
          >
            {projects.map((p, i) => (
              <Image
                key={p.slug}
                src={p.cover.src}
                alt=""
                fill
                sizes="256px"
                className={`object-cover transition-opacity duration-300 ${
                  active === i ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          <ul className="border-t border-concrete">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  onPointerEnter={() => setActive(i)}
                  onPointerLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="group relative flex flex-col gap-4 border-b border-concrete py-8 md:flex-row md:items-baseline md:justify-between md:gap-10"
                >
                  {/* Accent rule wipes in from the left on hover and focus */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-0 bg-verdigris transition-[width] duration-500 ease-out group-hover:w-full group-focus-visible:w-full"
                  />

                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-3">
                    <span className="font-meta text-meta-sm uppercase text-zinc">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-title text-d3 font-medium text-ink transition-transform duration-500 ease-out md:group-hover:translate-x-3">
                      {p.title}
                    </h3>
                    {p.status === "in-progress" && (
                      <span className="bg-verdigris px-2.5 py-1 font-meta text-meta-sm uppercase text-paper">
                        In progress
                      </span>
                    )}
                  </div>

                  <p className="font-meta text-meta-sm uppercase text-zinc md:text-right">
                    {metaStrip(p)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
