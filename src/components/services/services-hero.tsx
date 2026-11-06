"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ScrubText } from "@/components/motion/scrub-text";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { getServicesOrdered } from "@/lib/services";

const body =
  "font-sans text-[1.0625rem] font-semibold leading-[1.15] tracking-[-0.01em] text-ink";

/**
 * Opening of the services page: the statement set large and lifted line by
 * line, one wide photograph that opens from an inset frame and drifts as you
 * scroll, then the intro in column four and the seven trades as an index in
 * column ten.
 */
export function ServicesHero({
  statement,
  intro,
}: {
  statement: string;
  intro: string;
}) {
  const root = useRef<HTMLElement>(null);
  const trades = getServicesOrdered();
  const cover = trades[0];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tweens: gsap.core.Tween[] = [];
        tweens.push(
          gsap.fromTo(
            "[data-cover]",
            { clipPath: "inset(18% 14% 18% 14%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: {
                trigger: "[data-cover]",
                start: "top 95%",
                end: "top 25%",
                scrub: 0.3,
              },
            },
          ),
          gsap.fromTo(
            "[data-cover-img]",
            { yPercent: -8, scale: 1.15 },
            {
              yPercent: 8,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: "[data-cover]",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.3,
              },
            },
          ),
          gsap.from("[data-rise]", {
            y: 26,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: "[data-intro]",
              start: "top 88%",
              once: true,
            },
          }),
        );
        return () => {
          tweens.forEach((t) => {
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
      aria-labelledby="services-title"
      className="bg-paper px-3"
    >
      <ScrubText
        as="h1"
        kind="title"
        id="services-title"
        auto
        className="max-w-[18ch] pt-14 font-sans text-[clamp(2.5rem,7.5vw,7rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink md:pt-40"
      >
        {statement}
      </ScrubText>

      {cover && (
        <div
          data-cover
          className="relative mt-10 h-[56svh] w-full overflow-clip bg-paper-sunk md:mt-16 md:h-[min(92svh,900px)]"
        >
          <div
            data-cover-img
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={cover.image.src}
              alt={cover.image.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div
        data-intro
        className="grid grid-cols-12 gap-x-3 gap-y-10 pb-14 pt-6 md:pb-32"
      >
        <ScrubText
          className={`col-span-12 md:col-span-4 md:col-start-4 ${body}`}
        >
          {intro}
        </ScrubText>
        <nav
          data-rise
          aria-label="The seven trades"
          className="col-span-12 md:col-span-3 md:col-start-10"
        >
          <ol className={`list-inside list-decimal ${body}`}>
            {trades.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`#${s.slug}`}
                  className="transition-colors duration-200 hover:text-verdigris"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
