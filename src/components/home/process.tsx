"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger, reduced } from "@/lib/motion/gsap";
import { RevealLines } from "@/components/motion/reveal-lines";
import { RevealItems } from "@/components/motion/reveal-items";

type Step = {
  ref: string;
  title: string;
  description: string;
  decision: string;
  duration: string;
};

/** Genuinely sequential, so the drawing-reference numbering is earned. */
const steps: Step[] = [
  {
    ref: "A-201",
    title: "Site visit",
    description:
      "We come to the property, listen to what you want, and look at what the site will actually allow. Access, ground conditions, services, boundaries.",
    decision: "You decide: whether the scope we describe is the job you want.",
    duration: "DAY 1",
  },
  {
    ref: "A-202",
    title: "Itemised estimate",
    description:
      "A written quote broken down line by line — materials, labour, timeline, payment milestones. Priced by a quantity surveyor, not guessed at.",
    decision: "You decide: what stays in, what comes out, what gets deferred.",
    duration: "WITHIN 1 WEEK",
  },
  {
    ref: "A-203",
    title: "Build",
    description:
      "We start on the agreed date. Weekly photos and a written update, one point of contact, and any variation priced in writing before it happens.",
    decision: "You decide: finishes and fittings, at the points we flag.",
    duration: "PER PROJECT",
  },
  {
    ref: "A-204",
    title: "Handover",
    description:
      "Walk-through, defect list, and every document handed over — approvals, warranties, as-built notes. We come back to close out defects.",
    decision: "You decide: sign-off, once the defect list is clear.",
    duration: "FINAL WEEK",
  },
];

export function Process() {
  const root = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // Below md the sticky column is killed and every step reads as plain
    // stacked content — the copy is complete without the interaction.
    const mm = window.matchMedia("(min-width: 768px)");
    if (!mm.matches || reduced()) return;

    const items = el.querySelectorAll<HTMLElement>("[data-step]");
    const triggers = Array.from(items).map((item, i) =>
      ScrollTrigger.create({
        trigger: item,
        start: "top 60%",
        end: "bottom 60%",
        onToggle: (self) => {
          if (self.isActive) setActiveIdx(i);
        },
      }),
    );

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section
      aria-labelledby="process-heading"
      className="border-t border-graphite bg-ink text-paper"
    >
      <div className="mx-auto w-full max-w-360 px-6 py-20 md:px-10 md:py-28 lg:px-16">
        <div ref={root} className="md:grid md:grid-cols-12 md:gap-x-12">
          {/* Sticky column — holds the heading and a live step counter */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <p className="font-meta text-meta uppercase text-zinc">
                A-200 · How a job runs
              </p>
              <RevealLines
                as="h2"
                id="process-heading"
                className="mt-8 font-title text-d2 font-medium text-paper"
              >
                Four steps, and you know the price before the second one ends.
              </RevealLines>
              <p className="mt-8 max-w-measure text-lead text-concrete">
                Most of what goes wrong on a build goes wrong because nobody
                agreed what was included. This is how we avoid that.
              </p>

              {/* Progress — the only accent in this section */}
              <div
                className="mt-12 hidden md:block"
                aria-hidden="true"
              >
                <div className="flex items-center gap-3">
                  {steps.map((s, i) => (
                    <span
                      key={s.ref}
                      className={`h-px flex-1 transition-colors duration-500 ${
                        i <= activeIdx ? "bg-verdigris-light" : "bg-graphite"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-4 font-meta text-meta-sm uppercase text-zinc">
                  Step {String(activeIdx + 1).padStart(2, "0")} of{" "}
                  {String(steps.length).padStart(2, "0")} ·{" "}
                  {steps[activeIdx].duration}
                </p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <RevealItems
            as="ol"
            className="mt-16 md:col-span-7 md:mt-0"
            selector=":scope > li"
          >
            {steps.map((step, i) => (
              <li
                key={step.ref}
                data-step
                className="border-t border-graphite py-10 first:border-t-0 first:pt-0 md:py-16"
              >
                <div className="flex items-baseline gap-5">
                  <span
                    className={`font-meta text-meta uppercase transition-colors duration-500 ${
                      i === activeIdx ? "text-verdigris-light" : "text-zinc"
                    }`}
                  >
                    {step.ref}
                  </span>
                  <span className="font-meta text-meta-sm uppercase text-zinc">
                    {step.duration}
                  </span>
                </div>

                <h3 className="mt-6 font-title text-d3 font-medium text-paper">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-measure text-copy text-concrete">
                  {step.description}
                </p>
                <p className="mt-5 max-w-measure border-l border-graphite pl-5 font-meta text-meta-sm uppercase text-zinc">
                  {step.decision}
                </p>
              </li>
            ))}
          </RevealItems>
        </div>
      </div>
    </section>
  );
}
