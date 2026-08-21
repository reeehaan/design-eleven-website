"use client";

import { cn } from "@/lib/utils";

/**
 * Axonometric massing model that assembles as the six stages scroll past.
 *
 * Built from CSS 3D transforms rather than WebGL, on purpose. The site's
 * visual language is architectural drawing — hairlines, axonometry, title
 * blocks — so a wireframe massing model is closer to the brand than a
 * photoreal render, and it ships no runtime at all against three.js's ~150KB
 * gzipped. On a site where most traffic is mobile, that is the whole budget.
 *
 * `marking` finally earns its keep here. globals.css reserves the hi-vis
 * orange for "the 3D scene's survey paint" and nothing else on the site is
 * allowed to use it; the layer added at the current stage wears it, the way a
 * setting-out crew marks the element they are working on.
 */

type Layer = {
  /** Stage index (0-5) at which this part appears. */
  at: number;
  className: string;
  /** Height above the ground plane, in scene px. */
  z?: number;
  /**
   * Vertical plane rather than horizontal. `base` is the height it stands
   * from, so walls can sit on the slab instead of in the ground.
   */
  standing?: { x: number; y: number; rotate?: number; base?: number };
  size: { w: number; h: number };
  offset?: { x: number; y: number };
};

const GROUND = 232;
const FOOT = 148;

/** Four corner positions of the structural grid — footings and columns. */
const CORNERS = [
  { x: -FOOT / 2, y: -FOOT / 2 },
  { x: FOOT / 2, y: -FOOT / 2 },
  { x: FOOT / 2, y: FOOT / 2 },
  { x: -FOOT / 2, y: FOOT / 2 },
];

/** Edge midpoints — walls run along these, not through the corners. */
const EDGES = [
  { x: 0, y: -FOOT / 2, rotate: 0 },
  { x: FOOT / 2, y: 0, rotate: 90 },
  { x: 0, y: FOOT / 2, rotate: 0 },
  { x: -FOOT / 2, y: 0, rotate: 90 },
];

const layers: Layer[] = [
  // 01 — site visit: the plot, and nothing else
  { at: 0, className: "border-graphite/70", size: { w: GROUND, h: GROUND } },

  // 02 — estimate: the structural grid measured onto it
  { at: 1, className: "border-graphite", size: { w: FOOT, h: FOOT } },

  // 03 — contract and programme: footings set out
  ...CORNERS.map((c) => ({
    at: 2,
    className: "border-concrete/60 bg-concrete/10",
    size: { w: 26, h: 26 },
    offset: c,
    z: 1,
  })),

  // 04 — build: columns rise, then the slab lands on them
  ...CORNERS.map((c) => ({
    at: 3,
    className: "border-concrete/70 bg-paper/5",
    size: { w: 8, h: 74 },
    standing: { x: c.x, y: c.y },
  })),
  {
    at: 3,
    className: "border-concrete bg-paper/8",
    size: { w: FOOT + 16, h: FOOT + 16 },
    z: 74,
  },

  // 05 — finishes: the envelope closes. Walls sit on the slab and run along
  // the edges, so they meet the roof rather than floating beside the columns.
  ...EDGES.map((e) => ({
    at: 4,
    className: "border-concrete/50 bg-paper/6",
    size: { w: FOOT, h: 60 },
    standing: { x: e.x, y: e.y, rotate: e.rotate, base: 74 },
  })),

  // 06 — handover: roof on, building closed
  {
    at: 5,
    className: "border-paper/70 bg-paper/10",
    size: { w: FOOT + 24, h: FOOT + 24 },
    z: 134,
  },
];

export function BuildModel({
  stage,
  className,
}: {
  stage: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      // Rotated into axonometry the 232px footprint sweeps wider than its box,
      // so it is scaled back where the column is narrow rather than clipped.
      className={cn(
        "origin-center scale-[0.82] [perspective:900px] sm:scale-95 lg:scale-100",
        className,
      )}
      // The camera drifts as the build goes up, so the model is never quite
      // the same shape twice on the way down the page.
      style={{ perspectiveOrigin: "50% 42%" }}
    >
      <div
        className="relative mx-auto transition-transform duration-[900ms] ease-out motion-reduce:transition-none"
        style={{
          width: GROUND,
          height: GROUND,
          transformStyle: "preserve-3d",
          transform: `rotateX(60deg) rotateZ(${-46 + stage * 3.2}deg) translateZ(${-stage * 6}px)`,
        }}
      >
        {layers.map((layer, i) => {
          const shown = stage >= layer.at;
          const marking = stage === layer.at;

          const base = `translate(-50%, -50%) translate(${layer.offset?.x ?? layer.standing?.x ?? 0}px, ${layer.offset?.y ?? layer.standing?.y ?? 0}px)`;

          // A standing plane is rotated up out of the ground plane; the extra
          // translateY lifts it so it sits on z=0 rather than straddling it.
          const transform = layer.standing
            ? `${base} rotateZ(${layer.standing.rotate ?? 0}deg) rotateX(-90deg) translateY(${-(layer.size.h / 2 + (layer.standing.base ?? 0))}px)`
            : `${base} translateZ(${shown ? (layer.z ?? 0) : (layer.z ?? 0) + 40}px)`;

          return (
            <div
              key={i}
              className={cn(
                "absolute left-1/2 top-1/2 border transition-all duration-700 ease-out motion-reduce:transition-none",
                layer.className,
                marking && "!border-marking",
              )}
              style={{
                width: layer.size.w,
                height: layer.size.h,
                transform,
                transformStyle: "preserve-3d",
                opacity: shown ? 1 : 0,
                transitionDelay: shown ? `${(i % 4) * 60}ms` : "0ms",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
