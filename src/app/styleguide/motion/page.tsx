"use client";

import { useState } from "react";
import { RevealLines } from "@/components/motion/reveal-lines";
import { ScrubParagraph } from "@/components/motion/scrub-paragraph";
import { RevealLead } from "@/components/motion/reveal-lead";
import { ScrambleMeta } from "@/components/motion/scramble-meta";
import { CountUp } from "@/components/motion/count-up";
import { Eyebrow } from "@/components/motion/eyebrow";
import { Button } from "@/components/ui/button";
import { dur, ease, stagger, START } from "@/lib/motion/tokens";

/**
 * Motion proof sheet. Every effect isolated and remountable, so each can be
 * judged on its own before it is composed into a page.
 *
 * `key` remounting is the trigger mechanism: it replays the entry animation
 * exactly as a first-time visitor sees it.
 */

function Bay({
  sheet,
  title,
  assignment,
  children,
}: {
  sheet: string;
  title: string;
  assignment: string;
  children: React.ReactNode;
}) {
  const [nonce, setNonce] = useState(0);
  return (
    <section className="border-t border-concrete py-16 md:py-24">
      <div className="mb-10 flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-measure">
          <Eyebrow>{`${sheet} · ${title}`}</Eyebrow>
          <p className="mt-4 text-copy text-graphite">
            <span className="font-meta text-meta-sm uppercase text-zinc">
              Assigned to:{" "}
            </span>
            {assignment}
          </p>
        </div>
        <Button variant="ghost" onClick={() => setNonce((n) => n + 1)}>
          Replay
        </Button>
      </div>
      <div key={nonce}>{children}</div>
    </section>
  );
}

export default function MotionStyleguide() {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <div className="mx-auto w-full max-w-360 px-6 md:px-10 lg:px-16">
        <header className="py-16 md:py-24">
          <Eyebrow>M-00 · Motion system</Eyebrow>
          <RevealLines as="h1" className="mt-8 font-title text-d1 font-medium">
            Six effects, each with one job.
          </RevealLines>
          <RevealLead className="mt-8 max-w-measure text-lead text-graphite">
            Every effect below is proved in isolation before it is composed into
            a page. If an effect cannot justify its assignment here, it does not
            ship.
          </RevealLead>

          <dl className="mt-14 grid grid-cols-2 gap-px border border-concrete bg-concrete md:grid-cols-4">
            {[
              ["MICRO", `${dur.micro}s`],
              ["QUICK", `${dur.quick}s`],
              ["BASE", `${dur.base}s`],
              ["SLOW", `${dur.slow}s`],
              ["SCENE", `${dur.scene}s`],
              ["EASE OUT", ease.out],
              ["EASE EXPO", ease.expo],
              ["TRIGGER", START],
            ].map(([k, v]) => (
              <div key={k} className="bg-paper p-4">
                <dt className="font-meta text-meta-sm uppercase text-zinc">
                  {k}
                </dt>
                <dd className="mt-2 font-meta text-meta-sm text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </header>

        <Bay
          sheet="M-01"
          title="Line mask reveal"
          assignment="Every display heading and section header. The workhorse."
        >
          <RevealLines as="h2" className="font-title text-d2 font-medium">
            Lines slide up from behind their own mask, which is what makes the
            movement read as drafted rather than floaty.
          </RevealLines>
          <p className="mt-6 font-meta text-meta-sm uppercase text-zinc">
            stagger {stagger.line}s · ease {ease.expo} · once
          </p>
        </Bay>

        <Bay
          sheet="M-02"
          title="Word opacity scrub"
          assignment="Two places only — the About statement and a case-study brief."
        >
          <ScrubParagraph className="max-w-measure text-lead text-ink">
            Scroll slowly through this paragraph. Each word lifts from fifteen
            percent to full opacity as the block crosses the viewport, which
            forces a reading pace. That is the entire point, and it is why this
            effect is rationed to two pages — on a third it stops being emphasis
            and becomes the personality of the site.
          </ScrubParagraph>
        </Bay>

        <Bay
          sheet="M-03"
          title="Blur-to-focus lift"
          assignment="Hero sub-line and case-study pull quotes. Never more than 3 at once."
        >
          <RevealLead
            as="blockquote"
            className="max-w-measure font-title text-d3 font-medium text-ink"
          >
            “Honest estimate, no surprise costs at the end. The renovation came
            in slightly under budget.”
          </RevealLead>
          <p className="mt-6 font-meta text-meta-sm uppercase text-zinc">
            filter blur(8px) → 0 · the only non-compositor property on the site
          </p>
        </Bay>

        <Bay
          sheet="M-04"
          title="Scramble decode"
          assignment="Title-block metadata only. Once, on first view — never on hover."
        >
          <ScrambleMeta
            className="font-meta text-meta uppercase text-ink"
            segments={[
              { value: "PRJ-001", kind: "num" },
              { value: "ANURADHAPURA", kind: "word" },
              { value: "2024", kind: "num" },
              { value: "280 SQ FT", kind: "num" },
              { value: "1 MONTH", kind: "word" },
            ]}
          />
          <p className="mt-6 max-w-measure text-copy text-graphite">
            Numeric fields decode through digits, place names through letters —
            it reads as a surveying instrument settling on a reading.
          </p>
        </Bay>

        <Bay
          sheet="M-05"
          title="Number roll"
          assignment="Stats strip and case-study numbers."
        >
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { v: 280, s: " sq ft", l: "Area delivered" },
              { v: 6, s: "", l: "Years operating" },
              { v: 1, s: "", l: "Months on site" },
            ].map((n) => (
              <div key={n.l}>
                <CountUp
                  value={n.v}
                  suffix={n.s}
                  className="font-title text-d2 font-medium text-ink"
                />
                <p className="mt-2 font-meta text-meta-sm uppercase text-zinc">
                  {n.l}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-meta text-meta-sm uppercase text-zinc">
            tabular-nums · snap 1 · Intl.NumberFormat · once
          </p>
        </Bay>

        <Bay
          sheet="M-06"
          title="Accent rule draw"
          assignment="Section eyebrows. Draws 0.1s ahead of the heading it introduces."
        >
          <Eyebrow>A-201 · Site visit</Eyebrow>
          <div className="mt-10">
            <Eyebrow active>A-202 · Itemised estimate — current</Eyebrow>
          </div>
          <p className="mt-6 max-w-measure text-copy text-graphite">
            The active state is the only place an eyebrow shows the marking
            colour. Everything else draws in concrete.
          </p>
        </Bay>

        <Bay
          sheet="M-07"
          title="Button system"
          assignment="One component, three variants, five states."
        >
          <div className="flex flex-wrap items-center gap-5">
            <Button variant="primary" magnetic>
              See the work
            </Button>
            <Button variant="ghost">Request an estimate</Button>
            <Button variant="inline">Read the case study</Button>
            <Button variant="ghost" disabled>
              Unavailable
            </Button>
          </div>
          <ul className="mt-8 max-w-measure space-y-2 text-copy text-graphite">
            <li>· Hover: label swaps upward, fill wipes from the pointer.</li>
            <li>· Primary is magnetic within 90px; the label lags the button.</li>
            <li>· Press scales to 0.98 on pointer AND on Space/Enter.</li>
            <li>· Focus ring is instant — never animated.</li>
          </ul>
        </Bay>

        <Bay
          sheet="M-08"
          title="On deep sections"
          assignment="Same system, verdigris-light for hover against ink."
        >
          <div className="bg-ink p-8 md:p-14">
            <Eyebrow onDark>M-08 · Dark ground</Eyebrow>
            <RevealLines
              as="h2"
              className="mt-8 font-title text-d3 font-medium text-paper"
            >
              Hover is verdigris; orange means live.
            </RevealLines>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button variant="primary" onDark magnetic>
                Start a project
              </Button>
              <Button variant="ghost" onDark>
                See services
              </Button>
              <Button variant="inline" onDark>
                Call the studio
              </Button>
            </div>
          </div>
        </Bay>

        <footer className="border-t border-concrete py-12">
          <p className="font-meta text-meta-sm uppercase text-zinc">
            SHEET M-00 — M-08 · REVISION A · FOR REVIEW
          </p>
        </footer>
      </div>
    </div>
  );
}
