"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, reduced } from "@/lib/motion/gsap";
import { ease } from "@/lib/motion/tokens";

type Shot = { src: string; alt: string };

/**
 * Cursor-tracked preview for the closed trade rows.
 *
 * The register was the largest block on the page — 44% of its height — and
 * until you opened a row it was seven lines of text sitting directly above the
 * FAQ, which is also seven lines of text with a plus sign. Two accordions in a
 * row read as one component used twice. Hovering now floats that trade's
 * photograph, so the list is something to browse rather than something to
 * commit to a click on.
 *
 * Same mechanism as the home page's Selected work list, deliberately: this
 * site has one way of doing a cursor preview.
 *
 * Only for *closed* rows. An open row already shows its image inline, and a
 * second copy of it chasing the pointer over the top would be noise. Open
 * state is read off the DOM rather than mirrored into React, because the rows
 * are native <details> rendered on the server and that is worth keeping.
 */
export function TradePreview({ shots }: { shots: Shot[] }) {
  const el = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const node = el.current;
    const list = node?.parentElement;
    if (!node || !list) return;
    if (reduced()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(node, "x", { duration: 0.5, ease: ease.out });
    const yTo = gsap.quickTo(node, "y", { duration: 0.5, ease: ease.out });

    // Clamped against the viewport, not the list: the list is tall enough that
    // clamping to it would pin the preview near the middle, which is the bug
    // the home page version had.
    const clampY = (clientY: number, listTop: number) => {
      const half = node.offsetHeight / 2;
      const header =
        document.querySelector("header")?.getBoundingClientRect().height ?? 80;
      const lo = header + half;
      const hi = window.innerHeight - half;
      const y = lo > hi ? (lo + hi) / 2 : Math.min(Math.max(clientY, lo), hi);
      return y - listTop;
    };

    let located = false;

    const onMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const row = target?.closest<HTMLDetailsElement>("details[data-trade]");

      // Over an open row, or between rows, there is nothing to preview.
      if (!row || row.open) {
        setActive(null);
        return;
      }

      setActive(Number(row.dataset.trade));

      const r = list.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = clampY(e.clientY, r.top);
      if (located) {
        xTo(x);
        yTo(y);
      } else {
        gsap.set(node, { x, y });
        located = true;
      }
    };

    const onLeave = () => {
      setActive(null);
      located = false;
    };

    list.addEventListener("pointermove", onMove);
    list.addEventListener("pointerleave", onLeave);
    return () => {
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Fade is a class, not a tween. GSAP owns the position — quickTo on x/y is
  // what makes the follow feel weighted — but an autoAlpha tween here never
  // ticked, and opacity driven off the same state that swaps the images is one
  // less thing to keep in sync anyway.
  return (
    <div
      ref={el}
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 top-0 z-30 hidden aspect-4/3 w-56 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-paper-sunk transition-opacity duration-300 lg:block ${
        active === null ? "opacity-0" : "opacity-100"
      }`}
    >
      {shots.map((shot, i) => (
        <Image
          key={shot.src}
          src={shot.src}
          alt=""
          fill
          sizes="224px"
          className={`object-cover transition-opacity duration-300 ${
            active === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
