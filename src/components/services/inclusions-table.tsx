"use client";

import { useEffect, useRef, useState } from "react";
import { inclusions } from "@/lib/process";

/**
 * Real <table> — this is tabular data and screen readers should announce it
 * as such. Scrolls horizontally on mobile with a shadow on the overflow edge
 * so it's discoverable that there's more to the right.
 */
export function InclusionsTable() {
  const scroller = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(false);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const measure = () => {
      setOverflows(el.scrollWidth > el.clientWidth + 1);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    };

    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="relative">
      <div ref={scroller} className="overflow-x-auto">
        <table className="w-full min-w-[46rem] border-collapse text-left">
          <caption className="sr-only">
            What is included in a Design Eleven contract, and what is not
          </caption>
          <thead>
            <tr className="border-b border-ink">
              <th
                scope="col"
                className="py-4 pr-6 font-meta text-meta-sm uppercase text-zinc"
              >
                Element
              </th>
              <th
                scope="col"
                className="py-4 pr-6 font-meta text-meta-sm uppercase text-ink"
              >
                Included
              </th>
              <th
                scope="col"
                className="py-4 font-meta text-meta-sm uppercase text-zinc"
              >
                Not included
              </th>
            </tr>
          </thead>
          <tbody>
            {inclusions.map((row) => (
              <tr key={row.item} className="border-b border-concrete align-top">
                <th
                  scope="row"
                  className="py-5 pr-6 font-meta text-meta uppercase text-ink"
                >
                  {row.item}
                </th>
                <td className="py-5 pr-6 text-fine text-graphite">
                  {row.included}
                </td>
                <td className="py-5 text-fine text-zinc">{row.notIncluded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Overflow affordance — only while there is genuinely more to scroll */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent transition-opacity duration-300 ${
          overflows && !atEnd ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
