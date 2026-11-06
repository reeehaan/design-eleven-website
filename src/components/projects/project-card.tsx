"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Project } from "@/lib/projects";

// Last known mouse position, shared by every card and kept across page visits.
const lastPointer = { x: 0, y: 0, seen: false };
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType !== "mouse") return;
      lastPointer.x = e.clientX;
      lastPointer.y = e.clientY;
      lastPointer.seen = true;
    },
    { passive: true, capture: true },
  );
}

type ProjectCardProps = {
  project: Project;
  index: number;
  /** Another card is hovered: this one's caption steps back. */
  dim?: boolean;
  onHover?: (hovering: boolean) => void;
};

/**
 * A tall photograph, then the number and the name.
 *
 * Hovering the photograph smears it: a soft-edged vertical band follows the
 * pointer, and inside the band the single row of pixels at the pointer is
 * stretched down to the bottom of the picture, like a drag through wet paint.
 * The project's name appears at the pointer. Every other card's caption fades
 * back. Mouse only; touch and reduced motion see the photograph as it is.
 */
export function ProjectCard({
  project,
  index,
  dim,
  onHover,
}: ProjectCardProps) {
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  // Held in a ref so a re-render (the dimming) never restarts the effect.
  const hoverRef = useRef(onHover);
  useEffect(() => {
    hoverRef.current = onHover;
  });

  useEffect(() => {
    const box = frame.current;
    const cv = canvas.current;
    const tag = label.current;
    if (!box || !cv || !tag) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const strip = document.createElement("canvas");
    const sctx = strip.getContext("2d");
    if (!sctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const size = () => {
      const r = box.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(box);

    const target = { x: 0, y: 0, amount: 0 };
    const now = { x: 0, y: 0, amount: 0 };
    let raf = 0;
    let active = false;

    const source = () => box.querySelector<HTMLImageElement>("img");

    // Recent pointer positions: the smear drags a trail behind the pointer.
    const trail: { x: number; y: number }[] = [];
    const TRAIL = 14;
    let speed = 0;

    const strip1 = (
      img: HTMLImageElement,
      x: number,
      y: number,
      widthK: number,
      alpha: number,
      t: number,
    ) => {
      const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const sx0 = (img.naturalWidth - w / s) / 2;
      const sy0 = (img.naturalHeight - h / s) / 2;
      // The band swells with the pointer's speed and breathes slightly at rest.
      const bw =
        w * 0.3 * widthK * now.amount * (1 + Math.min(speed / 36, 0.6));
      const cy = Math.min(h - 3, Math.max(0, y));
      const row = cy + Math.sin(t * 0.004 + x * 0.02) * 5;
      const left = x - bw / 2;
      const run = h - cy;
      if (bw < 2 || run < 2) return;

      strip.width = Math.max(1, Math.round(bw * dpr));
      strip.height = Math.max(1, Math.round(run * dpr));
      sctx.clearRect(0, 0, strip.width, strip.height);
      sctx.globalCompositeOperation = "source-over";
      sctx.drawImage(
        img,
        sx0 + left / s,
        sy0 + Math.min(Math.max(row, 0), h - 2) / s,
        bw / s,
        2 / s,
        0,
        0,
        strip.width,
        strip.height,
      );
      const g = sctx.createLinearGradient(0, 0, strip.width, 0);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(0.28, "rgba(0,0,0,1)");
      g.addColorStop(0.72, "rgba(0,0,0,1)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      sctx.globalCompositeOperation = "destination-in";
      sctx.fillStyle = g;
      sctx.fillRect(0, 0, strip.width, strip.height);

      ctx.globalAlpha = alpha;
      ctx.drawImage(strip, left * dpr, cy * dpr, strip.width, strip.height);
      ctx.globalAlpha = 1;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      const img = source();
      if (!img || !img.complete || !img.naturalWidth || now.amount < 0.01)
        return;
      // Oldest first, so the newest smear sits on top.
      trail.forEach((p, i) => {
        const k = (i + 1) / trail.length;
        strip1(img, p.x, p.y, 0.55 + k * 0.45, 0.12 + k * 0.5, t);
      });
      strip1(img, now.x, now.y, 1, 1, t);
    };

    const frameLoop = (t: number) => {
      const px = now.x;
      const py = now.y;
      // A slower glide than before, so the smear lags and flows.
      now.x += (target.x - now.x) * 0.12;
      now.y += (target.y - now.y) * 0.12;
      now.amount += (target.amount - now.amount) * 0.12;
      speed = speed * 0.85 + Math.hypot(now.x - px, now.y - py) * 0.15 * 6;
      trail.push({ x: now.x, y: now.y });
      if (trail.length > TRAIL) trail.shift();
      draw(t);
      tag.style.transform = `translate(${now.x}px, ${now.y}px) translate(-50%, -140%)`;
      tag.style.opacity = String(Math.min(1, now.amount * 1.4));
      const settled = target.amount === 0 && now.amount < 0.005;
      if (settled) {
        active = false;
        ctx.clearRect(0, 0, cv.width, cv.height);
        tag.style.opacity = "0";
        return;
      }
      raf = requestAnimationFrame(frameLoop);
    };
    const run = () => {
      if (active) return;
      active = true;
      raf = requestAnimationFrame(frameLoop);
    };

    // The pointer is hit-tested against the card's live position, not driven by
    // enter/leave events: those never fire when a page loads or scrolls under a
    // resting pointer, which left the smear showing the wrong spot.
    let inside = false;
    const check = () => {
      const p = lastPointer;
      if (!p.seen) return;
      const r = box.getBoundingClientRect();
      const hit =
        p.x >= r.left && p.x <= r.right && p.y >= r.top && p.y <= r.bottom;
      if (hit) {
        target.x = p.x - r.left;
        target.y = p.y - r.top;
        if (!inside) {
          inside = true;
          now.x = target.x;
          now.y = target.y;
          trail.length = 0;
          target.amount = 1;
          hoverRef.current?.(true);
        }
        run();
      } else if (inside) {
        inside = false;
        target.amount = 0;
        hoverRef.current?.(false);
        run();
      }
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      check();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", check, { passive: true });
    // Page arrived under a resting pointer.
    check();
    const poll = window.setInterval(check, 120);
    return () => {
      window.clearInterval(poll);
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", check);
      if (inside) hoverRef.current?.(false);
    };
  }, []);

  return (
    <article>
      <Link
        href={`/projects/${project.slug}`}
        className="group block"
        aria-label={`View project: ${project.title}`}
      >
        <div
          ref={frame}
          className="relative aspect-4/5 w-full overflow-clip bg-paper-sunk"
        >
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover"
          />
          <canvas
            ref={canvas}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          />
          <span
            ref={label}
            aria-hidden="true"
            style={{ opacity: 0 }}
            className="pointer-events-none absolute left-0 top-0 whitespace-nowrap font-sans text-[0.9375rem] font-medium text-paper [text-shadow:0_0_14px_rgba(0,0,0,0.45)]"
          >
            {project.title}, {project.category}
          </span>
        </div>

        <div
          className={`transition-opacity duration-300 ${dim ? "opacity-30" : "opacity-100"}`}
        >
          <div className="mt-2 grid grid-cols-3 gap-x-3 font-sans text-base font-semibold text-ink md:grid-cols-[1fr_2fr]">
            <span className="tabular-nums">
              {(index + 1).toString().padStart(2, "0")}
            </span>
            <span className="col-span-2 underline-offset-4 group-hover:underline md:col-span-1">
              {project.title}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-x-3 font-sans text-base font-semibold text-zinc md:grid-cols-[1fr_2fr]">
            <span className="col-span-2 md:col-span-1 md:col-start-2">
              {project.location}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
