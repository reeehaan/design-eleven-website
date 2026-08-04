"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion/gsap";
import { dur, ease, MQ } from "@/lib/motion/tokens";
import { Eyebrow } from "@/components/motion/eyebrow";
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

      mm.add(`${MQ.desktop} and (prefers-reduced-motion: no-preference)`, () => {
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
      });

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
      mm.add(`${MQ.desktop} and (prefers-reduced-motion: no-preference)`, () => {
        const tween = gsap.fromTo(
          el,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: dur.quick, ease: ease.out },
        );
        return () => tween.kill();
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [active] },
  );

  const current = stages[active];

  return (
    <div ref={root} className="lg:grid lg:grid-cols-12 lg:gap-x-12">
      {/* Pinned column */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <Eyebrow onDark>A-200 · How a job runs</Eyebrow>

          <h2
            id="process-heading"
            className="mt-8 font-title text-d2 font-medium text-paper"
          >
            Six stages. You know the price before the third one starts.
          </h2>

          <p className="mt-8 max-w-measure text-lead text-concrete">
            Most of what goes wrong on a build goes wrong because nobody agreed
            what was included. Every stage below states what we do, what you
            decide, and what it costs to change your mind at that point.
          </p>

          {/* Live summary — desktop only; below lg each stage carries its own */}
          <div className="mt-12 hidden lg:block">
            <div className="flex items-center gap-2" aria-hidden="true">
              {stages.map((s, i) => (
                <span
                  key={s.ref}
                  className={`h-px flex-1 transition-colors duration-500 ${
                    i <= active ? "bg-verdigris-light" : "bg-graphite"
                  }`}
                />
              ))}
            </div>

            <div ref={summary} className="mt-6">
              <p className="font-meta text-meta uppercase text-verdigris-light">
                {current.ref} · Stage {current.n} of {stages.length}
              </p>
              <p className="mt-3 font-title text-d4 font-medium text-paper">
                {current.title}
              </p>
              <p className="mt-3 font-meta text-meta-sm uppercase text-zinc">
                Typically {current.duration}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stages */}
      <ol className="mt-16 lg:col-span-7 lg:mt-0">
        {stages.map((stage, i) => (
          <li
            key={stage.ref}
            data-stage
            className="border-t border-graphite py-10 first:border-t-0 first:pt-0 lg:py-14"
          >
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <span
                className={`font-meta text-meta uppercase transition-colors duration-500 ${
                  i === active ? "text-verdigris-light" : "text-zinc"
                }`}
              >
                {stage.ref}
              </span>
              <span className="font-meta text-meta-sm uppercase text-zinc">
                Typically {stage.duration}
              </span>
            </div>

            <h3 className="mt-6 font-title text-d3 font-medium text-paper">
              <span className="text-zinc">{stage.n}</span> {stage.title}
            </h3>

            <p className="mt-5 max-w-measure text-copy text-concrete">
              {stage.does}
            </p>

            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="border-t border-graphite pt-4">
                <dt className="font-meta text-meta-sm uppercase text-zinc">
                  You decide
                </dt>
                <dd className="mt-2 text-fine text-concrete">
                  {stage.decides}
                </dd>
              </div>
              <div className="border-t border-graphite pt-4">
                <dt className="font-meta text-meta-sm uppercase text-zinc">
                  Cost to change your mind
                </dt>
                <dd className="mt-2 text-fine text-concrete">
                  {stage.changeCost}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  );
}
