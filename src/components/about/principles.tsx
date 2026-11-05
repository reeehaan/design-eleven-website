"use client";

import Image from "next/image";
import { useState } from "react";
import { aboutImages } from "@/lib/images";

type Principle = {
  title: string;
  description: string;
  image: { src: string; alt: string };
};

/** PLACEHOLDERS: Unsplash stand-ins until the studio's own photographs arrive. */
const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;

/**
 * One line each, deliberately. A commitment reads as a commitment when it is
 * short enough to be one.
 */
const principles: Principle[] = [
  {
    title: "We finish what we start.",
    description: "Abandoned sites are common here. We do not add to the count.",
    image: {
      src: u("photo-1657346088167-b982455bf29a"),
      alt: "A finished modern house at dusk",
    },
  },
  {
    title: "Site is sacred.",
    description:
      "Crew on time, site left clean, and whatever is already there protected.",
    image: {
      src: u("photo-1755943807913-5f999c562f45"),
      alt: "Scaffolding poles stacked neatly on a site",
    },
  },
  {
    title: "Honest estimates.",
    description:
      "Itemised in writing. Variations priced and approved before the work, never after.",
    image: {
      src: u("photo-1608303588026-884930af2559"),
      alt: "People reviewing architectural drawings at a desk",
    },
  },
  {
    title: "Owner-led, always.",
    description: "The person who priced your job is the one standing on it.",
    image: {
      src: aboutImages.owner.src,
      alt: aboutImages.owner.alt,
    },
  },
];

/**
 * The values list: the active one set dark and large, the rest greyed. Hover
 * or focus moves the active one; its sentence sits in the last column.
 */
export function Principles() {
  const [active, setActive] = useState(0);

  return (
    <section
      aria-labelledby="principles-heading"
      className="bg-paper px-3 pb-14 md:pb-40"
    >
      <div className="grid grid-cols-12 gap-x-3 gap-y-8">
        <h2
          id="principles-heading"
          className="col-span-12 font-sans text-base font-semibold text-ink md:col-span-3"
        >
          How we work
        </h2>

        <ol className="col-span-12 md:col-span-6 md:col-start-4">
          {principles.map((p, i) => (
            <li key={p.title}>
              <button
                type="button"
                aria-pressed={i === active}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`flex w-full items-baseline gap-3 py-1 text-left font-sans text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em] transition-colors duration-300 ${
                  i === active ? "text-ink" : "text-zinc"
                }`}
              >
                <span className="w-5 shrink-0 text-base tabular-nums tracking-normal">
                  {i + 1}
                </span>
                {p.title}
              </button>
            </li>
          ))}
        </ol>

        <div className="col-span-12 md:col-span-3 md:col-start-10">
          <div
            data-fx="img"
            className="relative aspect-4/3 w-full overflow-clip bg-paper-sunk md:aspect-4/5"
          >
            {principles.map((p, i) => (
              <Image
                key={p.title}
                src={p.image.src}
                alt={i === active ? p.image.alt : ""}
                fill
                sizes="(min-width: 768px) 25vw, 100vw"
                className={`object-cover transition-opacity duration-500 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          <p
            aria-live="polite"
            className="mt-3 font-sans text-[1.0625rem] font-semibold leading-[1.15] tracking-[-0.01em] text-ink"
          >
            {principles[active].description}
          </p>
        </div>
      </div>
    </section>
  );
}
