"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
// Importing from this module is what registers ScrollTrigger and SplitText.
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion/gsap";
import { dur, ease, stagger } from "@/lib/motion/tokens";
import { Button } from "@/components/ui/button";
import { heroImages } from "@/lib/images";
import { siteConfig } from "@/lib/site";
import { getFeaturedProjects } from "@/lib/projects";
import { ISLAND, projectLatLon } from "@/lib/sri-lanka";

// A site engineer's sentence, not a slogan. Split by line on purpose.
const HEADLINE = ["We measure it,", "we price it,", "then we build it."];

const META = [
  { k: "Established", v: String(siteConfig.established) },
  { k: "Base", v: "Anuradhapura" },
  { k: "Registration no.", v: siteConfig.businessRegNo },
  { k: "Led by", v: "Quantity surveyor" },
] as const;

// Where each place the studio has built sits on the island.
const PLACES: Record<string, { lat: number; lon: number }> = {
  Anuradhapura: { lat: 8.3114, lon: 80.4037 },
  Kandy: { lat: 7.2906, lon: 80.6337 },
  Kurunegala: { lat: 7.4863, lon: 80.3623 },
};

type Stage = { w: number; h: number };

/**
 * The island scroll.
 *
 * A veil the colour of the page sits over the photograph with the island cut
 * out of it. Before any scrolling the cut-out is scaled until it swallows the
 * whole screen, so the photograph is simply full-bleed. Scrolling scales the
 * island down to its real shape, the veil closes in around it, and the places
 * the studio has built in surface as pins. The stage is sticky, so the whole
 * thing plays inside one screen.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const stageEl = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage | null>(null);

  // Surfaces whatever is genuinely on site right now. Renders nothing when
  // there is no live job, which is the honest state most of the time.
  const projects = getFeaturedProjects();
  const onSite = projects.find((p) => p.status === "in-progress");

  const places = useMemo(() => {
    const seen = new Map<string, { name: string; live: boolean }>();
    for (const p of projects) {
      if (!PLACES[p.location]) continue;
      const prev = seen.get(p.location);
      seen.set(p.location, {
        name: p.location,
        live: Boolean(prev?.live) || p.status === "in-progress",
      });
    }
    return [...seen.values()];
  }, [projects]);

  // The veil only exists once we know the scroll can drive it. Without
  // script, or with reduced motion, the hero is the photograph and the text.
  useEffect(() => {
    const el = stageEl.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => {
      if (reduce.matches) {
        setStage(null);
        return;
      }
      const w = el.clientWidth;
      const h = el.clientHeight;
      // Mobile toolbars nudge the height by a few pixels while scrolling;
      // rebuilding the pin for that would stack spacers.
      setStage((prev) =>
        prev && prev.w === w && Math.abs(prev.h - h) < 120 ? prev : { w, h },
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    reduce.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      reduce.removeEventListener("change", measure);
    };
  }, []);

  // Intro sequence on load: type masks up by line, the rest resolves.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: ease.out } });
        tl.from("[data-line]", {
          yPercent: 110,
          duration: dur.slow,
          ease: ease.expo,
          stagger: stagger.line,
        }).from(
          "[data-fade]",
          { opacity: 0, y: 16, duration: dur.base, stagger: stagger.card },
          0.45,
        );
        return () => tl.kill();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // The scroll: scrubbed, one timeline, rebuilt whenever the stage resizes.
  useGSAP(
    () => {
      if (!stage || !root.current) return;
      const { w, h } = stage;
      const desktop = w >= 1024;
      const navH = document.querySelector("header")?.clientHeight ?? 0;

      // Where the island ends up, in stage pixels.
      const usable = h - navH;
      const boxH = usable * (desktop ? 0.86 : 0.74);
      const boxW = w * (desktop ? 0.34 : 0.78);
      const s1 = Math.min(boxH / ISLAND.height, boxW / ISLAND.width);
      const c1 = {
        x: desktop ? w * 0.7 : w / 2,
        y: navH + usable * (desktop ? 0.5 : 0.47),
      };
      const f1 = { x: ISLAND.width / 2, y: ISLAND.height / 2 };
      // Where it starts: zoomed into the island's thickest part until its
      // coast is far off screen.
      const s0 = Math.max(w / 300, h / 380) * 1.15;
      const c0 = { x: w / 2, y: h / 2 };
      const f0 = { x: 290, y: 470 };

      const group = root.current.querySelector<SVGGElement>("[data-island]");
      const veil =
        root.current.querySelector<SVGPathElement>("[data-veil-fill]");
      if (!group || !veil) return;

      const place = (p: number) => {
        const s = s0 + (s1 - s0) * p;
        const cx = c0.x + (c1.x - c0.x) * p;
        const cy = c0.y + (c1.y - c0.y) * p;
        const fx = f0.x + (f1.x - f0.x) * p;
        const fy = f0.y + (f1.y - f0.y) * p;
        group.setAttribute(
          "transform",
          `translate(${cx} ${cy}) scale(${s}) translate(${-fx} ${-fy})`,
        );
        // The veil is the screen, expressed in island space, so the numbers
        // stay small however far the island is zoomed.
        const x0 = -cx / s + fx - 2;
        const y0 = -cy / s + fy - 2;
        const x1 = (w - cx) / s + fx + 2;
        const y1 = (h - cy) / s + fy + 2;
        veil.setAttribute(
          "d",
          `M${x0} ${y0}H${x1}V${y1}H${x0}Z ${ISLAND.path}`,
        );
      };

      // Pins sit at real coordinates, mapped through the final transform.
      root.current
        .querySelectorAll<HTMLElement>("[data-pin]")
        .forEach((pin) => {
          const spot = PLACES[pin.dataset.pin ?? ""];
          if (!spot) return;
          const pt = projectLatLon(spot.lat, spot.lon);
          pin.style.left = `${c1.x + (pt.x - f1.x) * s1}px`;
          pin.style.top = `${c1.y + (pt.y - f1.y) * s1}px`;
        });

      const prog = { p: 0 };
      place(0);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `bottom bottom`,
          scrub: 0.3,
        },
      });

      tl.to(
        prog,
        {
          p: 1,
          duration: 1,
          ease: "power2.inOut",
          onUpdate: () => place(prog.p),
        },
        0,
      )
        .to("[data-lead]", { opacity: 0, y: -48, duration: 0.3 }, 0)
        .set("[data-lead]", { pointerEvents: "none" }, 0.3)
        .to("[data-scrim]", { opacity: 0, duration: 0.35 }, 0.05)
        .to("[data-photo]", { scale: 1, duration: 1 }, 0)
        .fromTo(
          "[data-outline]",
          { opacity: 0 },
          { opacity: 1, duration: 0.25 },
          0.65,
        )
        .fromTo(
          "[data-service]",
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.2, stagger: 0.08, ease: ease.out },
          0.6,
        )
        .fromTo(
          "[data-pin]",
          { opacity: 0, scale: 0.4 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.18,
            stagger: 0.07,
            ease: ease.out,
          },
          0.78,
        );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: root, dependencies: [stage] },
  );

  // The hero's scroll track changes the page height once it is measured, which
  // moves every scene below it. Tell them to measure again.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [stage]);

  const armed = stage !== null;

  return (
    <>
      <section
        ref={root}
        aria-labelledby="hero-heading"
        className="relative -mt-16 bg-paper text-ink md:-mt-20"
        style={stage ? { height: Math.round(stage.h * 2.0) } : undefined}
      >
        <div
          ref={stageEl}
          className={`relative h-svh min-h-130 overflow-clip ${
            stage ? "sticky top-0" : ""
          }`}
        >
          <div className="absolute inset-0" aria-hidden="true">
            <div data-photo className="absolute inset-0 will-change-transform">
              <Image
                src={heroImages.home.src}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-[50%_55%]"
              />
            </div>
            <div
              data-scrim
              className="absolute inset-0 bg-linear-to-r from-ink/90 via-ink/55 to-ink/10"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink/80 to-transparent" />
            <div
              data-scrim
              className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-ink/70 to-transparent"
            />
          </div>

          {armed && stage && (
            <svg
              data-veil
              aria-hidden="true"
              focusable="false"
              viewBox={`0 0 ${stage.w} ${stage.h}`}
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <g data-island>
                <path
                  data-veil-fill
                  d={ISLAND.path}
                  fillRule="evenodd"
                  className="fill-paper"
                />
                <path
                  data-outline
                  d={ISLAND.path}
                  fill="none"
                  strokeWidth={1.5}
                  vectorEffect="non-scaling-stroke"
                  className="stroke-ink"
                  style={{ opacity: 0 }}
                />
              </g>
            </svg>
          )}

          <div className="relative mx-auto flex h-full w-full flex-col justify-center px-3 pt-16 md:pt-20">
            <div data-lead className="max-w-3xl">
              <h1
                id="hero-heading"
                className="font-title text-d1 font-medium text-paper"
              >
                {HEADLINE.map((line) => (
                  <span key={line} className="block overflow-hidden pb-[0.1em]">
                    <span data-line className="block">
                      {line}
                    </span>
                  </span>
                ))}
              </h1>

              <p
                data-fade
                className="mt-8 max-w-measure text-lead text-concrete md:mt-10"
              >
                Design Eleven is run by a qualified quantity surveyor. The
                estimate you sign is itemised line by line, so you can see what
                every rupee buys before anyone breaks ground.
              </p>

              <div
                data-fade
                className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-12"
              >
                <Button href="/projects" variant="primary" onDark magnetic>
                  See the work
                </Button>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="font-meta text-meta text-concrete underline-offset-4 transition-colors hover:text-verdigris-light hover:underline"
                >
                  or call {siteConfig.contact.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          {armed && (
            <>
              <ul
                aria-label="What we do"
                className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 lg:left-16 lg:block"
              >
                {siteConfig.services.map((s) => (
                  <li
                    key={s}
                    data-service
                    style={{ opacity: 0 }}
                    className="font-title text-d2 font-medium text-ink"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <ul aria-label="Where we have built" className="contents">
                {places.map((p) => (
                  <li
                    key={p.name}
                    data-pin={p.name}
                    style={{ opacity: 0 }}
                    className="pointer-events-none absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
                  >
                    <span
                      aria-hidden="true"
                      className={`block h-3 w-3 rounded-full bg-ink ring-4 ring-paper/70 ${
                        p.live ? "animate-pulse" : ""
                      }`}
                    />
                    <span className="rounded-sm bg-paper px-2 py-1 font-meta text-meta-sm text-ink">
                      {p.name}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* Title block: the facts the studio can stand behind. */}
      <div className="bg-paper text-ink">
        <div className="w-full px-3">
          <dl className="grid grid-cols-2 border-t border-concrete md:grid-cols-4">
            {META.map((m, i) => (
              <div
                key={m.k}
                className={`border-concrete py-6 md:py-8 ${
                  i > 0 ? "md:border-l md:pl-6" : ""
                } ${i % 2 === 1 ? "border-l pl-5 md:pl-6" : ""} ${
                  i < 2 ? "border-b md:border-b-0" : ""
                }`}
              >
                <dt className="font-meta text-meta-sm text-zinc">{m.k}</dt>
                <dd className="mt-2 font-title text-d4 font-medium text-ink">
                  {m.v}
                </dd>
              </div>
            ))}
          </dl>

          {onSite && (
            <p className="border-t border-concrete py-5 font-meta text-meta text-zinc">
              On site now:{" "}
              <span className="text-graphite">
                {onSite.projectNo}, {onSite.title}, {onSite.location}
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
