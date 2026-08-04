"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, reduced } from "@/lib/motion/gsap";
import { ease } from "@/lib/motion/tokens";
import { heroImages } from "@/lib/images";
import { siteConfig } from "@/lib/site";

/**
 * [DRAFT COPY] — a site engineer's sentence, not a slogan. Each line is masked
 * and revealed separately, so the markup is split by line on purpose.
 */
const HEADLINE = ["We measure it,", "we price it,", "then we build it."];

const META = [
  { k: "EST.", v: String(siteConfig.established) },
  { k: "BASE", v: "ANURADHAPURA" },
  { k: "REG. NO.", v: siteConfig.businessRegNo },
  { k: "LED BY", v: "QUANTITY SURVEYOR" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const lines = el.querySelectorAll<HTMLElement>("[data-line]");
    const fades = el.querySelectorAll<HTMLElement>("[data-fade]");
    const frame = el.querySelector<HTMLElement>("[data-frame]");
    const rules = el.querySelectorAll<HTMLElement>("[data-rule]");

    if (reduced()) {
      gsap.set([...lines, ...fades], { yPercent: 0, opacity: 1 });
      if (frame) gsap.set(frame, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(rules, { scaleX: 1 });
      return;
    }

    // One orchestrated load sequence, under 1.2s: rules draw, type masks up
    // by line, image last. Runs once on mount, not on every route change.
    const tl = gsap.timeline({ defaults: { ease: ease.out } });

    tl.fromTo(rules, { scaleX: 0 }, { scaleX: 1, duration: 0.7, stagger: 0.05 })
      .fromTo(
        lines,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, stagger: 0.08 },
        0.15,
      )
      .fromTo(
        fades,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 },
        0.5,
      );

    if (frame) {
      tl.fromTo(
        frame,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
        0.35,
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={root}
      aria-labelledby="hero-heading"
      className="relative bg-ink text-paper"
    >
      <div className="mx-auto w-full max-w-360 px-6 py-20 md:px-10 md:py-28 lg:px-16">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-12">
          {/* Copy column */}
          <div className="lg:col-span-7">
            <div
              data-rule
              className="h-px w-full origin-left bg-graphite"
              aria-hidden="true"
            />
            <p
              data-fade
              className="mt-5 font-meta text-meta uppercase text-concrete"
            >
              {siteConfig.services.join(" · ")}
            </p>

            <h1
              id="hero-heading"
              className="mt-10 font-title text-d1 font-medium text-paper"
            >
              {HEADLINE.map((line) => (
                // Each line clips its own overflow so the mask reads cleanly.
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <span data-line className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p
              data-fade
              className="mt-10 max-w-measure text-lead text-concrete"
            >
              Design Eleven is run by a qualified quantity surveyor. The
              estimate you sign is itemised line by line — so you can see what
              every rupee buys before anyone breaks ground.
            </p>

            <div data-fade className="mt-12 flex flex-wrap items-center gap-5">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center bg-verdigris px-7 py-4 font-meta text-meta uppercase text-paper transition-[background-color,color] duration-150 hover:bg-paper hover:text-ink"
              >
                See the work
              </Link>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="font-meta text-meta uppercase text-concrete underline-offset-4 transition-colors hover:text-verdigris-light hover:underline"
              >
                or call {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Image column */}
          <div className="lg:col-span-5">
            <div
              data-frame
              className="relative aspect-4/5 w-full overflow-hidden bg-graphite"
            >
              <Image
                src={heroImages.home.src}
                alt={heroImages.home.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <p
              data-fade
              className="mt-4 font-meta text-meta-sm uppercase text-zinc"
            >
              PRJ-001 · LIVING ROOM REFRESH · ANURADHAPURA
            </p>
          </div>
        </div>

        {/* Title block — real information, not decoration */}
        <dl
          data-fade
          className="mt-20 grid grid-cols-2 border-l border-t border-graphite md:grid-cols-4"
        >
          {META.map((m) => (
            <div key={m.k} className="border-b border-r border-graphite p-5">
              <dt className="font-meta text-meta-sm uppercase text-zinc">
                {m.k}
              </dt>
              <dd className="mt-2 font-meta text-meta uppercase text-paper">
                {m.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
