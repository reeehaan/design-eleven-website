"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger, reduced } from "@/lib/motion/gsap";
import { RevealLines } from "@/components/motion/reveal-lines";
import { Eyebrow } from "@/components/motion/eyebrow";
import { Button } from "@/components/ui/button";
import { ScopeModel } from "./scope-model";
import { engagements } from "@/lib/process";

/**
 * The four engagements, against a model of what each one covers.
 *
 * Was a 2x2 grid of cards, each carrying a "who it's for" paragraph on top of
 * a "what it is" paragraph — 267 words of prose to answer a question about
 * scope. The model answers it: the same building every time, with the part you
 * are buying lit. The prose that survived is the part a drawing cannot say.
 *
 * Same sticky-column-and-scrolling-list shape as /process and the home
 * section, so the three read as one idea rather than three inventions.
 */
export function EngagementsList() {
  const root = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // Below md the sticky column is dropped and each entry reads on its own.
    if (!window.matchMedia("(min-width: 768px)").matches || reduced()) return;

    const items = el.querySelectorAll<HTMLElement>("[data-engagement]");
    const triggers = Array.from(items).map((item, i) =>
      ScrollTrigger.create({
        trigger: item,
        start: "top 60%",
        end: "bottom 60%",
        onToggle: (self) => self.isActive && setActiveIdx(i),
      }),
    );

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const active = engagements[activeIdx];

  return (
    <div ref={root} className="md:grid md:grid-cols-12 md:gap-x-12">
      <div className="md:col-span-5">
        <div className="md:sticky md:top-28">
          <Eyebrow>S-01 &middot; What you can hire us for</Eyebrow>
          <RevealLines
            as="h2"
            id="engagements-heading"
            className="mt-8 max-w-[20ch] font-title text-d2 font-medium text-ink"
          >
            Four engagements,{" "}
            <span className="text-zinc">priced honestly.</span>
          </RevealLines>

          {/* Mobile gets the whole-building case; the tracker is md and up. */}
          <ScopeModel index={0} className="mt-10 md:hidden" />

          <div className="mt-10 hidden md:block">
            <ScopeModel index={activeIdx} />

            <p className="mt-4 font-meta text-meta-sm uppercase text-zinc">
              Log scale &middot; LKR 45K – 45M
            </p>

            <p className="mt-8 font-meta text-meta-sm uppercase text-zinc">
              <span className="text-marking-deep">In scope</span> &middot;{" "}
              {active.title}
            </p>
            <dl className="mt-4 grid grid-cols-2 border-t border-concrete pt-4">
              <div className="border-r border-concrete pr-4">
                <dt className="font-meta text-meta-sm uppercase text-zinc">
                  Typical range
                </dt>
                <dd className="mt-2 font-meta text-meta uppercase text-ink">
                  {active.typicalRange}
                </dd>
              </div>
              <div className="pl-4">
                <dt className="font-meta text-meta-sm uppercase text-zinc">
                  Typical duration
                </dt>
                <dd className="mt-2 font-meta text-meta uppercase text-ink">
                  {active.typicalDuration}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <ol className="mt-14 md:col-span-7 md:mt-0">
        {engagements.map((e, i) => (
          <li
            key={e.slug}
            data-engagement
            className="border-t border-concrete py-10 first:border-t-0 first:pt-0 md:py-14"
          >
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <span
                className={`font-meta text-meta uppercase transition-colors duration-500 ${
                  i === activeIdx ? "text-marking-deep" : "text-zinc"
                }`}
              >
                {e.ref}
              </span>
              <span className="font-meta text-meta-sm uppercase text-zinc">
                {e.typicalRange} &middot; {e.typicalDuration}
              </span>
            </div>

            <h3 className="mt-5 font-title text-d3 font-medium text-ink">
              {e.title}
            </h3>

            {/* `whoItsFor` is gone from all four. It described the reader back
                to themselves — "you own a plot, or you're about to" — which
                the model now shows and the title already implies. */}
            <p className="mt-5 max-w-measure text-copy text-graphite">
              {e.whatItIs}
            </p>

            <div className="mt-7">
              <Button
                variant="inline"
                href={`/contact?service=${e.contactParam}`}
              >
                Enquire about this
              </Button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
