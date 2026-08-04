"use client";

import Image from "next/image";
import { useRef } from "react";
// Importing from this module is what registers ScrollTrigger and
// ScrambleText, both of which this timeline uses via config rather than by
// name.
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { dur, ease, stagger } from "@/lib/motion/tokens";
import { Button } from "@/components/ui/button";
import { heroImages } from "@/lib/images";
import { siteConfig } from "@/lib/site";
import { getFeaturedProjects } from "@/lib/projects";

// A site engineer's sentence, not a slogan. Split by line on purpose.
const HEADLINE = ["We measure it,", "we price it,", "then we build it."];

const META = [
  { k: "EST.", v: String(siteConfig.established), kind: "num" },
  { k: "BASE", v: "ANURADHAPURA", kind: "word" },
  { k: "REG. NO.", v: siteConfig.businessRegNo, kind: "num" },
  { k: "LED BY", v: "QUANTITY SURVEYOR", kind: "word" },
] as const;

export function Hero() {
  const root = useRef<HTMLElement>(null);

  // Surfaces whatever is genuinely on site right now. Renders nothing when
  // there is no live job, which is the honest state most of the time.
  const onSite = getFeaturedProjects().find((p) => p.status === "in-progress");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // One orchestrated load sequence, under 1.2s. Rules draw, type masks
        // up by line, supporting copy and the image resolve last.
        const tl = gsap.timeline({ defaults: { ease: ease.out } });

        tl.from("[data-rule]", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: dur.base,
          stagger: stagger.tight,
        })
          .from(
            "[data-line]",
            {
              yPercent: 110,
              duration: dur.slow,
              ease: ease.expo,
              stagger: stagger.line,
            },
            0.1,
          )
          .from(
            "[data-fade]",
            {
              opacity: 0,
              y: 16,
              duration: dur.base,
              stagger: stagger.card,
            },
            0.45,
          )
          .from(
            "[data-frame]",
            { clipPath: "inset(0% 0% 100% 0%)", duration: dur.scene },
            0.3,
          );

        // Title-block metadata decodes like an instrument settling on a
        // reading — the one playful move, and it fires once.
        const cells = gsap.utils.toArray<HTMLElement>("[data-meta]");
        cells.forEach((cell, i) => {
          tl.to(
            cell,
            {
              duration: 0.8,
              scrambleText: {
                text: cell.dataset.value ?? "",
                chars: cell.dataset.kind === "num" ? "0123456789" : "upperCase",
                revealDelay: 0.25,
                speed: 0.5,
              },
            },
            0.7 + i * 0.08,
          );
        });

        return () => tl.kill();
      });

      // Scroll recede: the scene gives way as the content below takes over.
      // Two elements only, which keeps it inside the parallax budget.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const st = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        st.to("[data-recede]", { opacity: 0.15, y: -40, ease: "none" }, 0).to(
          "[data-frame]",
          { scale: 1.08, ease: "none" },
          0,
        );

        return () => {
          st.scrollTrigger?.kill();
          st.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-ink text-paper"
    >
      {/* Full sheet height, so the title block lands on the bottom edge the
          way it does on a real drawing. */}
      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-360 flex-col px-6 md:min-h-[calc(100dvh-5rem)] md:px-10 lg:px-16">
        <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-12 lg:items-stretch lg:gap-x-16 lg:py-12">
          <div
            data-recede
            className="flex flex-col justify-center lg:col-span-7"
          >
            <div className="flex items-center gap-4">
              <span className="shrink-0 whitespace-nowrap font-meta text-meta uppercase text-zinc">
                A-100
              </span>
              {/* Decorative, and the first thing to go when space is tight */}
              <span
                data-rule
                aria-hidden="true"
                className="hidden h-px w-16 shrink-0 bg-graphite sm:block"
              />
              <span
                data-fade
                className="font-meta text-meta uppercase text-concrete"
              >
                {siteConfig.services.join(" · ")}
              </span>
            </div>

            <h1
              id="hero-heading"
              className="mt-10 font-title text-d1 font-medium text-paper"
            >
              {HEADLINE.map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.1em]">
                  <span data-line className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p data-fade className="mt-10 max-w-measure text-lead text-concrete">
              Design Eleven is run by a qualified quantity surveyor. The
              estimate you sign is itemised line by line — so you can see what
              every rupee buys before anyone breaks ground.
            </p>

            <div data-fade className="mt-12 flex flex-wrap items-center gap-6">
              <Button href="/projects" variant="primary" onDark magnetic>
                See the work
              </Button>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="font-meta text-meta uppercase text-concrete underline-offset-4 transition-colors hover:text-verdigris-light hover:underline"
              >
                or call {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Bleeds off the right edge and fills the sheet height at lg, so
              the two columns read as one composition rather than two boxes. */}
          <div className="relative lg:col-span-5 lg:-mr-10 lg:w-[calc(100%+2.5rem)] xl:-mr-16 xl:w-[calc(100%+4rem)]">
            <div
              data-frame
              className="relative aspect-4/5 w-full overflow-hidden bg-graphite lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            >
              <Image
                src={heroImages.home.src}
                alt={heroImages.home.alt}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />

              {/* Caption sits on the image at lg, where there is no room
                  beneath it. Scrim keeps the mono legible over any crop. */}
              <div className="absolute inset-x-0 bottom-0 hidden bg-linear-to-t from-ink/80 to-transparent p-5 lg:block">
                <div
                  data-fade
                  className="flex items-baseline justify-between gap-4"
                >
                  <p className="font-meta text-meta-sm uppercase text-concrete">
                    PRJ-001 · Living room refresh
                  </p>
                  <p className="font-meta text-meta-sm uppercase text-concrete">
                    Anuradhapura
                  </p>
                </div>
              </div>
            </div>

            <p
              data-fade
              className="mt-4 font-meta text-meta-sm uppercase text-zinc lg:hidden"
            >
              PRJ-001 · Living room refresh · Anuradhapura
            </p>
          </div>
        </div>

        {/* Title block, anchored to the bottom of the sheet */}
        <dl className="grid grid-cols-2 border-t border-graphite md:grid-cols-4">
          {META.map((m, i) => (
            <div
              key={m.k}
              data-fade
              className={`border-graphite py-5 md:py-6 ${
                i > 0 ? "md:border-l md:pl-6" : ""
              } ${i % 2 === 1 ? "border-l pl-5 md:pl-6" : ""} ${
                i < 2 ? "border-b md:border-b-0" : ""
              }`}
            >
              <dt className="font-meta text-meta-sm uppercase text-zinc">
                {m.k}
              </dt>
              <dd
                data-meta
                data-value={m.v}
                data-kind={m.kind}
                className="mt-2 font-meta text-meta uppercase text-paper"
              >
                {m.v}
              </dd>
            </div>
          ))}
        </dl>

        {onSite && (
          <div
            data-fade
            className="flex items-center gap-3 border-t border-graphite py-4"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-verdigris-light"
            />
            <p className="font-meta text-meta-sm uppercase text-zinc">
              On site now —{" "}
              <span className="text-concrete">
                {onSite.projectNo} · {onSite.title} · {onSite.location}
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
