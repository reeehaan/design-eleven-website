"use client";

import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { engagements } from "@/lib/process";

/**
 * The four engagements as price columns, on a shared axis.
 *
 * The third model on the site and deliberately not a third building.
 * /process assembles a massing model over six stages and the home page stacks
 * a document set; this section is about what things cost — "four engagements,
 * priced honestly" — so it draws the money, not the construction. Each column
 * is a range bar running from that engagement's floor to its ceiling, which
 * makes the four comparable at a glance in a way four paragraphs never did.
 *
 * The bars are read off `typicalRange` rather than typed in, so they cannot
 * drift from the figures printed beside them.
 *
 * LOG SCALE, and said so on the drawing. The set spans LKR 45K to LKR 45M —
 * three orders of magnitude — and on a linear axis the costing bar would be
 * a third of a pixel. A log axis is the honest way to show that set; an
 * unlabelled one would not be.
 *
 * CSS 3D transforms, no WebGL runtime.
 */

const MAX_H = 168;
const COL_W = 20;
const SPACING = 44;

/** "LKR 18M – 45M" -> [18000000, 45000000] */
function parseRange(s: string): [number, number] {
  const nums = [...s.matchAll(/([\d.]+)\s*([MK])/gi)].map(
    (m) => parseFloat(m[1]) * (m[2].toUpperCase() === "M" ? 1e6 : 1e3),
  );
  return [nums[0] ?? 0, nums[nums.length - 1] ?? 0];
}

const ranges = engagements.map((e) => parseRange(e.typicalRange));
const floor = Math.log10(Math.min(...ranges.map((r) => r[0])));
const ceil = Math.log10(Math.max(...ranges.map((r) => r[1])));

/** Position on the log axis, 0 at the cheapest floor, MAX_H at the dearest. */
const y = (v: number) =>
  v <= 0 ? 0 : ((Math.log10(v) - floor) / (ceil - floor)) * MAX_H;

export function ScopeModel({
  index,
  className,
}: {
  /** Which engagement is in view — that column is drawn in ink, the rest recede. */
  index: number;
  className?: string;
}) {
  const span = (engagements.length - 1) * SPACING;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "origin-center scale-[0.9] [perspective:1100px] sm:scale-95 lg:scale-100",
        className,
      )}
      style={{ perspectiveOrigin: "50% 48%" }}
    >
      <div
        className="relative mx-auto transition-transform duration-700 ease-out motion-reduce:transition-none"
        style={{
          width: span + 90,
          height: MAX_H + 40,
          transformStyle: "preserve-3d",
          // A shallow tilt, not the near-plan view the other two models use.
          // Height is the whole point of a bar and rotateX(66deg) foreshortens
          // exactly that — at a steep angle these read as tiles on a floor.
          transform: `rotateX(34deg) rotateZ(${-34 + index * 2.5}deg) translateZ(${-MAX_H / 2}px)`,
        }}
      >
        {/* Base plate — the axis the columns stand on */}
        <span
          className="absolute left-1/2 top-1/2 border border-concrete"
          style={{
            width: span + 54,
            height: 40,
            transform: "translate(-50%, -50%)",
          }}
        />

        {engagements.map((e, i) => {
          const [lo, hi] = ranges[i];
          // The column runs from the baseline to the ceiling of the range, and
          // the accent cap marks the floor. Drawing only the band between them
          // left new-build as a 23px sliver floating near the top — true to the
          // data and useless to look at. This way every column has real height
          // and the range still reads, off where the cap sits.
          const base = 0;
          const top = y(hi);
          const h = Math.max(top, 6);
          const floorAt = y(lo);
          const x = i * SPACING - span / 2;
          const active = i === index;

          const faces = [0, 90];

          return (
            <Fragment key={e.slug}>
              {/* Two planes at 90° read as a solid bar in axonometry without
                  needing six faces of a box. */}
              {faces.map((rot) => (
                <div
                  key={rot}
                  className={cn(
                    "absolute left-1/2 top-1/2 border transition-all duration-500 ease-out motion-reduce:transition-none",
                    active
                      ? "border-ink/80 bg-ink/[0.06]"
                      : "border-concrete bg-transparent",
                  )}
                  style={{
                    width: COL_W,
                    height: h,
                    transform: `translate(-50%, -50%) translate(${x}px, 0) rotateZ(${rot}deg) rotateX(-90deg) translateY(${-(h / 2 + base)}px)`,
                    opacity: active ? 1 : 0.4,
                    transitionDelay: `${i * 40}ms`,
                  }}
                />
              ))}

              {/* Cap at the ceiling of the range */}
              <div
                className={cn(
                  "absolute left-1/2 top-1/2 border transition-all duration-500 ease-out motion-reduce:transition-none",
                  active ? "border-ink bg-ink/10" : "border-concrete",
                )}
                style={{
                  width: COL_W,
                  height: COL_W,
                  transform: `translate(-50%, -50%) translate(${x}px, 0) translateZ(${top}px)`,
                  opacity: active ? 1 : 0.35,
                  transitionDelay: `${i * 40}ms`,
                }}
              />

              {/* Survey paint on the floor of the range — where the number
                  starts, which is the figure a client anchors on. */}
              <div
                className={cn(
                  "absolute left-1/2 top-1/2 border-2 transition-all duration-500 ease-out motion-reduce:transition-none",
                  active ? "border-marking" : "border-transparent",
                )}
                style={{
                  width: COL_W + 8,
                  height: COL_W + 8,
                  transform: `translate(-50%, -50%) translate(${x}px, 0) translateZ(${floorAt}px)`,
                  opacity: active ? 1 : 0,
                  transitionDelay: `${i * 40}ms`,
                }}
              />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
