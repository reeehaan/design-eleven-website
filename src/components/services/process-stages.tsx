"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion/gsap";
import { dur, ease, MQ } from "@/lib/motion/tokens";
import { Eyebrow } from "@/components/motion/eyebrow";
import { BuildModel } from "./build-model";
import { stages } from "@/lib/process";

/**
 * Desktop: the left column pins and crossfades as stages scroll past. Below
 * lg the pin is dropped and the copy reads as plain stacked content.
 */
export function ProcessStages() {
  const root = useRef<HTMLDivElement>(null);
  const summary = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        `${MQ.desktop} and (prefers-reduced-motion: no-preference)`,
        () => {
          const items = gsap.utils.toArray<HTMLElement>("[data-stage]");
          const triggers = items.map((item, i) =>
            ScrollTrigger.create({
              trigger: item,
              start: "top 55%",
              end: "bottom 55%",
              onToggle: (self) => self.isActive && setActive(i),
            }),
          );
          return () => triggers.forEach((t) => t.kill());
        },
      );

      mm.add(MQ.reduced, () => {});
      mm.add(MQ.belowDesktop, () => {});

      return () => mm.revert();
    },
    { scope: root },
  );

  // Crossfade the pinned summary whenever the active stage changes.
  useGSAP(
    () => {
      const el = summary.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(
        `${MQ.desktop} and (prefers-reduced-motion: no-preference)`,
        () => {
          const tween = gsap.fromTo(
            el,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: dur.quick, ease: ease.out },
          );
          return () => tween.kill();
        },
      );
      return () => mm.revert();
    },
    { scope: root, dependencies: [active] },
  );

  const current = stages[active];

  return (
    <div ref={root} className="lg:grid lg:grid-cols-12 lg:gap-x-12">
      {/* Pinned column: the heading, the model, and a live read of the stage */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <Eyebrow>A-200 · How a job runs</Eyebrow>

          <h2
            id="process-heading"
            className="mt-8 font-title text-d2 font-medium text-ink"
          >
            Six stages. You know the price before the third one starts.
          </h2>

          {/* Below lg the stage tracker never runs (the pin is desktop-only),
              so mobile gets the finished massing rather than a model frozen at
              stage one. */}
          <div data-on-dark className="mt-10 bg-ink p-6 text-paper lg:hidden">
            <BuildModel stage={stages.length - 1} total={stages.length} />
          </div>

          <ol className="mt-10 hidden gap-y-1 lg:grid">
            {stages.map((stage, i) => (
              <li key={stage.ref}>
                <a
                  href={`#stage-${stage.n}`}
                  className={`flex items-baseline gap-4 border-t border-concrete py-2.5 font-title text-lg transition-colors duration-300 ${
                    i === active ? "text-ink" : "text-zinc hover:text-ink"
                  }`}
                >
                  <span className="w-6 font-meta text-meta tabular-nums">
                    {stage.n}
                  </span>
                  {stage.title}
                </a>
              </li>
            ))}
          </ol>

          <div
            data-on-dark
            className="mt-10 hidden bg-ink p-6 text-paper lg:block"
          >
            <BuildModel stage={active} total={stages.length} />
            <div ref={summary} className="mt-6">
              <p className="font-meta text-meta text-verdigris-light">
                {current.ref} · Stage {current.n} of {stages.length}
              </p>
              <p className="mt-2 font-meta text-meta-sm text-zinc">
                Typically {current.duration}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stages: hairline rows, label left, title and copy beside it */}
      <ol className="mt-16 lg:col-span-7 lg:mt-0">
        {stages.map((stage, i) => (
          <li
            key={stage.ref}
            id={`stage-${stage.n}`}
            data-stage
            className="scroll-mt-28 border-t border-ink py-10 lg:py-14"
          >
            <div className="grid gap-x-8 gap-y-6 md:grid-cols-12">
              <p
                className={`font-meta text-meta transition-colors duration-500 md:col-span-3 ${
                  i === active ? "text-ink" : "text-zinc"
                }`}
              >
                Stage {stage.n}
              </p>
              <div className="md:col-span-9">
                <h3 className="font-title text-d3 font-medium text-ink">
                  {stage.title}
                </h3>
                <p className="mt-5 max-w-measure text-copy text-graphite">
                  {stage.does}
                </p>

                <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div className="border-t border-concrete pt-4">
                    <dt className="font-meta text-meta-sm text-zinc">
                      You decide
                    </dt>
                    <dd className="mt-2 text-fine text-graphite">
                      {stage.decides}
                    </dd>
                  </div>
                  <div className="border-t border-concrete pt-4">
                    <dt className="font-meta text-meta-sm text-zinc">
                      Cost to change your mind
                    </dt>
                    <dd className="mt-2 text-fine text-graphite">
                      {stage.changeCost}
                    </dd>
                  </div>
                </dl>
                <p className="mt-6 font-meta text-meta-sm text-zinc">
                  Typically {stage.duration}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
