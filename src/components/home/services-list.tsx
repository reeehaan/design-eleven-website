"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { dur, ease, MQ } from "@/lib/motion/tokens";
import { RevealLines } from "@/components/motion/reveal-lines";
import { Eyebrow } from "@/components/motion/eyebrow";
import { Button } from "@/components/ui/button";
import { getHomeServices } from "@/lib/services";

export function ServicesList() {
  const services = getHomeServices();
  // Defaults to the first service rather than null. Previously the preview
  // column was reserved but empty until something was hovered, which left
  // 42% of the section blank on arrival.
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const meta = useRef<HTMLDivElement>(null);

  // Crossfade the facts panel whenever the active service changes.
  useGSAP(
    () => {
      const el = meta.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktop} and (prefers-reduced-motion: no-preference)`, () => {
        const tween = gsap.fromTo(
          el,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: dur.quick, ease: ease.out },
        );
        return () => tween.kill();
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [active] },
  );

  if (services.length === 0) return null;

  const current = services[active];

  return (
    <section
      aria-labelledby="services-heading"
      className="border-t border-concrete bg-paper"
    >
      <div className="mx-auto w-full max-w-360 px-6 py-20 md:px-10 md:py-28 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>A-300 · What we build</Eyebrow>
            <RevealLines
              as="h2"
              id="services-heading"
              className="mt-8 max-w-[16ch] font-title text-d2 font-medium text-ink"
            >
              Everything you need, under one roof.
            </RevealLines>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="max-w-measure text-lead text-graphite">
              From design and costing through to construction, steel
              fabrication and plumbing — every service is owner-led from first
              visit to handover.
            </p>
          </div>
        </div>

        <div ref={root} className="mt-14 lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* List */}
          <ul className="lg:col-span-7">
            {services.map((service, i) => {
              const isActive = i === active;
              return (
                <li key={service.slug} className="border-t border-concrete last:border-b">
                  <Link
                    href={`/services#${service.slug}`}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group relative flex flex-col gap-3 py-7 md:flex-row md:items-baseline md:gap-8 md:py-8"
                  >
                    {/* Marks the row the preview is currently showing */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-0 h-full w-px bg-verdigris transition-transform duration-500 ease-out ${
                        isActive ? "scale-y-100" : "scale-y-0"
                      }`}
                      style={{ transformOrigin: "top" }}
                    />

                    <span
                      aria-hidden="true"
                      className={`font-meta text-meta-sm uppercase transition-colors duration-300 md:w-10 md:shrink-0 ${
                        isActive ? "text-verdigris" : "text-zinc"
                      }`}
                    >
                      {(i + 1).toString().padStart(2, "0")}
                    </span>

                    <div className="flex-1">
                      <h3
                        className={`font-title text-d4 font-medium transition-colors duration-300 ${
                          isActive ? "text-verdigris" : "text-ink"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p className="mt-2 max-w-measure text-copy text-graphite">
                        {service.summary}
                      </p>

                      {/* Below lg the preview column is gone, so each row
                          carries its own image and facts. */}
                      <div className="lg:hidden">
                        <div className="relative mt-5 aspect-3/2 w-full overflow-hidden bg-paper-sunk">
                          <Image
                            src={service.image.src}
                            alt={service.image.alt}
                            fill
                            sizes="100vw"
                            className="object-cover"
                          />
                        </div>
                        <dl className="mt-4 flex gap-8">
                          <div>
                            <dt className="font-meta text-meta-sm uppercase text-zinc">
                              Typical
                            </dt>
                            <dd className="mt-1 font-meta text-meta-sm uppercase text-ink">
                              {service.timeline}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-meta text-meta-sm uppercase text-zinc">
                              From
                            </dt>
                            <dd className="mt-1 font-meta text-meta-sm uppercase text-ink">
                              {service.startingFrom}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <span
                      aria-hidden="true"
                      className={`font-meta text-meta-sm transition-all duration-300 md:shrink-0 ${
                        isActive
                          ? "translate-x-1 text-verdigris"
                          : "text-zinc"
                      }`}
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Preview — always populated, never a reserved blank */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-4/5 w-full overflow-hidden bg-paper-sunk">
                {/* All images stacked and crossfaded, so switching never
                    shows an empty frame while the next one decodes. */}
                {services.map((s, i) => (
                  <Image
                    key={s.slug}
                    src={s.image.src}
                    alt={i === active ? s.image.alt : ""}
                    aria-hidden={i !== active}
                    fill
                    sizes="40vw"
                    className={`object-cover transition-opacity duration-500 ease-out ${
                      i === active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>

              {/* The facts are the reason this column exists */}
              <div ref={meta} className="mt-5">
                <p className="font-meta text-meta uppercase text-ink">
                  {current.title}
                </p>
                <dl className="mt-4 grid grid-cols-2 border-t border-concrete pt-4">
                  <div className="border-r border-concrete pr-4">
                    <dt className="font-meta text-meta-sm uppercase text-zinc">
                      Typical duration
                    </dt>
                    <dd className="mt-2 font-meta text-meta uppercase text-ink">
                      {current.timeline}
                    </dd>
                  </div>
                  <div className="pl-4">
                    <dt className="font-meta text-meta-sm uppercase text-zinc">
                      Starting from
                    </dt>
                    <dd className="mt-2 font-meta text-meta uppercase text-ink">
                      {current.startingFrom}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex justify-end">
          <Button href="/services" variant="inline">
            All services &amp; pricing
          </Button>
        </div>
      </div>
    </section>
  );
}
