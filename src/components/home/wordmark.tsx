"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion/gsap";
import { siteConfig } from "@/lib/site";

/** Control points of the snake's route, as fractions of the stage. */
const ROUTE: [number, number][] = [
  [-0.25, -0.25],
  [0.0, 0.12],
  [0.03, 0.4],
  [0.1, 0.5],
  [0.3, 0.5],
  [0.5, 0.5],
  [0.7, 0.5],
  [0.88, 0.5],
  [0.98, 0.56],
  [1.1, 0.8],
  [1.3, 1.25],
];

/** Catmull-Rom through the control points, sampled into a polyline. */
function sample(w: number, h: number) {
  const pts = ROUTE.map(([x, y]) => [x * w, y * h] as [number, number]);
  const out: { x: number; y: number; d: number }[] = [];
  let acc = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let s = 0; s < 40; s++) {
      const t = s / 40;
      const t2 = t * t;
      const t3 = t2 * t;
      const x =
        0.5 *
        (2 * p1[0] +
          (-p0[0] + p2[0]) * t +
          (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
          (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);
      const y =
        0.5 *
        (2 * p1[1] +
          (-p0[1] + p2[1]) * t +
          (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
          (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);
      const last = out[out.length - 1];
      if (last) acc += Math.hypot(x - last.x, y - last.y);
      out.push({ x, y, d: acc });
    }
  }
  return { pts: out, length: acc };
}

function at(route: ReturnType<typeof sample>, d: number) {
  const { pts } = route;
  let lo = 0;
  let hi = pts.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (pts[mid].d < d) lo = mid;
    else hi = mid;
  }
  const a = pts[lo];
  const b = pts[hi];
  const k = b.d === a.d ? 0 : (d - a.d) / (b.d - a.d);
  return {
    x: a.x + (b.x - a.x) * k,
    y: a.y + (b.y - a.y) * k,
    angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI,
  };
}

/**
 * The studio name as a snake. Scrolling feeds it in from the top left, along
 * a curve down to the middle of the screen, straight across the middle, then
 * off the lower right. Every letter follows the same route a step behind the
 * one in front, tilting with the curve. Without motion it is one plain line.
 */
export function Wordmark() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = stage.current;
        const run = track.current;
        if (!el || !run) return;
        const letters = gsap.utils.toArray<HTMLElement>("[data-ch]", el);
        const prog = { v: 0 };
        let route = sample(1, 1);
        let centres: number[] = [];
        let word = 0;

        const measure = () => {
          const w = el.clientWidth;
          const h = el.clientHeight;
          run.style.height = `${Math.round(h * 2.6)}px`;
          // Measure in the static layout before the letters leave it.
          el.removeAttribute("data-snake");
          gsap.set(letters, { clearProps: "transform,opacity" });
          const first = letters[0].getBoundingClientRect().left;
          centres = letters.map((l) => {
            const r = l.getBoundingClientRect();
            return r.left - first + r.width / 2;
          });
          const last = letters[letters.length - 1].getBoundingClientRect();
          word = last.right - first;
          el.setAttribute("data-snake", "");
          route = sample(w, h);
          render();
        };

        const render = () => {
          const travel = route.length + word;
          const head = prog.v * travel;
          letters.forEach((l, i) => {
            const d = head - (word - centres[i]);
            if (d < 0 || d > route.length) {
              gsap.set(l, { opacity: 0 });
              return;
            }
            const p = at(route, d);
            gsap.set(l, {
              opacity: 1,
              x: p.x,
              y: p.y,
              rotation: p.angle,
              xPercent: -50,
              yPercent: -50,
            });
          });
        };

        measure();
        const tween = gsap.to(prog, {
          v: 1,
          ease: "none",
          onUpdate: render,
          scrollTrigger: {
            trigger: run,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        });
        const onResize = () => {
          measure();
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", onResize);
        return () => {
          window.removeEventListener("resize", onResize);
          tween.scrollTrigger?.kill();
          tween.kill();
          el.removeAttribute("data-snake");
          run.style.height = "";
          gsap.set(letters, { clearProps: "all" });
        };
      });
      return () => mm.revert();
    },
    { scope: stage },
  );

  return (
    <div ref={track} aria-hidden="true" className="relative">
      <div
        ref={stage}
        className="group/s sticky top-0 flex h-svh items-center overflow-clip bg-paper px-3 data-snake:block data-snake:px-0"
      >
        <p className="whitespace-nowrap font-sans text-[13.5vw] font-semibold leading-none tracking-[-0.06em] text-ink group-data-snake/s:absolute group-data-snake/s:left-0 group-data-snake/s:top-0">
          {siteConfig.name.split("").map((ch, i) => (
            <span
              key={i}
              data-ch
              className="inline-block group-data-snake/s:absolute group-data-snake/s:left-0 group-data-snake/s:top-0"
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
