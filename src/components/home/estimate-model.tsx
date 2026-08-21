"use client";

import { cn } from "@/lib/utils";

/**
 * The document set, in axonometry — four sheets that stack as the four steps
 * scroll past, the active one lifting clear of the pile.
 *
 * Deliberately not the massing model that /process uses. That page is about a
 * building going up over six stages; this section is about knowing the number
 * early — "four steps, and you know the price before the second one ends" —
 * and the thing that carries that claim is paperwork, not concrete. So the
 * sheets are the subject: a marked-up site plan, a priced bill, a programme,
 * a handover set. The estimate sheet is the one with a total on it, and it
 * arrives second.
 *
 * Same construction as BuildModel — CSS 3D transforms, no WebGL runtime — and
 * the same rule about `marking`: globals.css reserves the hi-vis orange for
 * the 3D scene and the active sheet is what wears it.
 */

const SHEET_W = 132;
const SHEET_H = 172;

/** Rows drawn on each sheet. Widths are percentages of the sheet. */
type Sheet = {
  /** Label kept for readability of the definitions, not rendered. */
  kind: string;
  rows: { w: number; accent?: boolean }[];
  /** Draws a plot outline instead of ruled rows. */
  plan?: boolean;
};

const sheets: Sheet[] = [
  // 01 Site visit — what the site will allow, sketched on the plan
  { kind: "site plan", plan: true, rows: [] },

  // 02 Itemised estimate — measured lines, then the figure that matters. This
  // is the sheet the whole section is about, so it is the busiest.
  {
    kind: "priced bill",
    rows: [
      { w: 82 },
      { w: 68 },
      { w: 76 },
      { w: 59 },
      { w: 71 },
      { w: 64 },
      { w: 45, accent: true },
    ],
  },

  // 03 Build — a programme, so bars rather than lines
  {
    kind: "programme",
    rows: [{ w: 70 }, { w: 52 }, { w: 84 }, { w: 44 }, { w: 63 }],
  },

  // 04 Handover — the closing set: approvals, warranties, as-built
  { kind: "handover set", rows: [{ w: 74 }, { w: 66 }, { w: 79 }, { w: 55 }] },
];

export function EstimateModel({
  step,
  className,
}: {
  /** Index of the step currently in view. The sheet set is fixed at four,
   * one per step, so there is no total to pass. */
  step: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "origin-center scale-[0.86] [perspective:1000px] sm:scale-95 lg:scale-100",
        className,
      )}
      style={{ perspectiveOrigin: "50% 45%" }}
    >
      <div
        className="relative mx-auto transition-transform duration-[900ms] ease-out motion-reduce:transition-none"
        style={{
          width: SHEET_W + 90,
          height: SHEET_H + 60,
          transformStyle: "preserve-3d",
          transform: `rotateX(56deg) rotateZ(${-38 + step * 4}deg)`,
        }}
      >
        {sheets.map((sheet, i) => {
          const placed = i <= step;
          const active = i === step;

          // Sheets fan down-right as they stack so the pile reads as separate
          // sheets rather than one thick slab; the active one lifts clear.
          const lift = active ? 54 : i * 15;
          const slide = i * 19;

          return (
            <div
              key={sheet.kind}
              className={cn(
                "absolute left-1/2 top-1/2 border transition-all duration-700 ease-out motion-reduce:transition-none",
                active
                  ? "border-marking bg-ink/80"
                  : "border-concrete/65 bg-ink/70",
              )}
              style={{
                width: SHEET_W,
                height: SHEET_H,
                transformStyle: "preserve-3d",
                transform: `translate(-50%, -50%) translate(${slide}px, ${slide}px) translateZ(${placed ? lift : lift + 60}px)`,
                opacity: placed ? 1 : 0,
                transitionDelay: placed ? `${i * 80}ms` : "0ms",
              }}
            >
              {sheet.plan ? (
                // Site plan: the plot, a setback line, and a north tick
                <>
                  <span className="absolute inset-x-4 inset-y-5 border border-concrete/50" />
                  <span className="absolute inset-x-7 inset-y-9 border border-dashed border-concrete/30" />
                  <span className="absolute right-4 top-4 h-3 w-px bg-concrete/60" />
                </>
              ) : (
                <div className="absolute inset-x-4 inset-y-5 flex flex-col justify-start gap-[7px]">
                  {sheet.rows.map((row, r) => (
                    <span
                      key={r}
                      className={cn(
                        "block transition-opacity duration-700",
                        row.accent
                          ? "h-[3px] bg-marking"
                          : "h-px bg-concrete/60",
                        // The total rule sits apart from the lines above it,
                        // the way it does on a real bill of quantities.
                        row.accent && "mt-auto",
                      )}
                      style={{
                        width: `${row.w}%`,
                        opacity: placed ? 1 : 0,
                        transitionDelay: placed
                          ? `${i * 80 + r * 55}ms`
                          : "0ms",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Ground shadow-plate: gives the stack something to sit on, so the
            sheets read as lifted rather than floating in nothing. */}
        <span
          className="absolute left-1/2 top-1/2 border border-graphite/60"
          style={{
            width: SHEET_W + 70,
            height: SHEET_H + 50,
            transform: "translate(-50%, -50%) translate(18px, 18px)",
          }}
        />
      </div>
    </div>
  );
}
