"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { dur, ease, magnet, MQ } from "@/lib/motion/tokens";

type Variant = "primary" | "ghost" | "inline";

/**
 * Three variants, five states, one state machine.
 *
 * Focus is never animated — a delayed focus ring fails anyone tabbing
 * quickly — so the outline comes from the global :focus-visible rule.
 */
export function Button({
  children,
  href,
  variant = "primary",
  arrow = false,
  magnetic = false,
  onDark = false,
  type = "button",
  className,
  disabled,
  onClick,
}: {
  children: string;
  href?: string;
  variant?: Variant;
  /** Trailing arrow. Sits inside both label copies so it travels with them. */
  arrow?: boolean;
  /** Primary CTA only, and never more than one per viewport. */
  magnetic?: boolean;
  onDark?: boolean;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const field = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      // Pointer events land on the field, which never moves. Only `el`
      // translates, so the hit area cannot escape the cursor.
      const zone = field.current ?? el;
      if (!el || !zone) return;

      const mm = gsap.matchMedia();

      // On touch, none of this is registered at all.
      mm.add(
        `${MQ.finePointer} and (prefers-reduced-motion: no-preference)`,
        () => {
          const top = el.querySelector<HTMLElement>("[data-label-top]");
          const bottom = el.querySelector<HTMLElement>("[data-label-bottom]");
          const fill = el.querySelector<HTMLElement>("[data-fill]");

          // quickTo so rapid mouse movement replaces rather than queues tweens.
          // inOut, not a decelerating curve: the swap should read as a
          // mechanism travelling, which means it eases in as well as out.
          const topY = top
            ? gsap.quickTo(top, "yPercent", { duration: dur.hover, ease: ease.inOut })
            : null;
          const botY = bottom
            ? gsap.quickTo(bottom, "yPercent", { duration: dur.hover, ease: ease.inOut })
            : null;

          const magX = magnetic
            ? gsap.quickTo(el, "x", { duration: dur.quick, ease: ease.out })
            : null;
          const magY = magnetic
            ? gsap.quickTo(el, "y", { duration: dur.quick, ease: ease.out })
            : null;
          const labelWrap = top?.parentElement;
          const labelX = magnetic && labelWrap
            ? gsap.quickTo(labelWrap, "x", { duration: dur.quick, ease: ease.out })
            : null;
          const labelY = magnetic && labelWrap
            ? gsap.quickTo(labelWrap, "y", { duration: dur.quick, ease: ease.out })
            : null;

          const clamp = (v: number) =>
            Math.max(-magnet.max, Math.min(magnet.max, v));

          const onEnter = (e: PointerEvent) => {
            topY?.(-100);
            botY?.(-100);

            // Fill wipes from the exact point the pointer crossed the edge.
            if (fill) {
              const r = el.getBoundingClientRect();
              const x = ((e.clientX - r.left) / r.width) * 100;
              const y = ((e.clientY - r.top) / r.height) * 100;
              gsap.set(fill, { clipPath: `circle(0% at ${x}% ${y}%)` });
              gsap.to(fill, {
                clipPath: `circle(150% at ${x}% ${y}%)`,
                duration: dur.hover,
                ease: ease.out,
              });
            }
          };

          const onLeave = (e: PointerEvent) => {
            topY?.(0);
            botY?.(0);

            if (fill) {
              const r = el.getBoundingClientRect();
              const x = ((e.clientX - r.left) / r.width) * 100;
              const y = ((e.clientY - r.top) / r.height) * 100;
              gsap.to(fill, {
                clipPath: `circle(0% at ${x}% ${y}%)`,
                duration: dur.hover,
                ease: ease.out,
              });
            }

            if (magnetic) {
              // Slight overshoot on release so it reads as elastic, not sticky.
              gsap.to(el, { x: 0, y: 0, duration: dur.hover, ease: "back.out(1.7)" });
              if (labelWrap) {
                gsap.to(labelWrap, {
                  x: 0,
                  y: 0,
                  duration: dur.hover,
                  ease: "back.out(1.7)",
                });
              }
            }
          };

          const onMove = (e: PointerEvent) => {
            if (!magnetic) return;
            const r = el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            magX?.(clamp(dx * magnet.pull));
            magY?.(clamp(dy * magnet.pull));
            labelX?.(clamp(dx * magnet.labelPull));
            labelY?.(clamp(dy * magnet.labelPull));
          };


          const onDown = () => gsap.to(el, { scale: 0.98, duration: dur.micro });
          const onUp = () => gsap.to(el, { scale: 1, duration: dur.micro });
          const onKey = (e: KeyboardEvent) => {
            if (e.key === " " || e.key === "Enter") onDown();
          };

          zone.addEventListener("pointerenter", onEnter);
          zone.addEventListener("pointerleave", onLeave);
          zone.addEventListener("pointermove", onMove);
          el.addEventListener("pointerdown", onDown);
          el.addEventListener("pointerup", onUp);
          el.addEventListener("keydown", onKey);
          el.addEventListener("keyup", onUp);

          return () => {
            zone.removeEventListener("pointerenter", onEnter);
            zone.removeEventListener("pointerleave", onLeave);
            zone.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerdown", onDown);
            el.removeEventListener("pointerup", onUp);
            el.removeEventListener("keydown", onKey);
            el.removeEventListener("keyup", onUp);
          };
        },
      );

      return () => mm.revert();
    },
    { scope: field, dependencies: [magnetic] },
  );

  const base =
    "group relative inline-flex select-none items-center justify-center overflow-hidden font-meta text-meta uppercase";

  const variants: Record<Variant, string> = {
    primary: onDark
      ? "bg-verdigris px-7 py-4 text-paper"
      : "bg-ink px-7 py-4 text-paper",
    ghost: onDark
      ? "border border-graphite px-7 py-4 text-paper"
      : "border border-ink px-7 py-4 text-ink",
    inline: onDark
      ? "text-concrete underline-offset-4"
      : "text-graphite underline-offset-4",
  };

  // Verdigris means "interactive"; orange is reserved for errors.
  const fillColour = onDark ? "bg-verdigris-light" : "bg-verdigris";
  const hoverText =
    variant === "inline"
      ? onDark
        ? "group-hover:text-verdigris-light"
        : "group-hover:text-verdigris"
      : onDark
        ? "group-hover:text-ink"
        : "group-hover:text-paper";

  const content = (
    <>
      {variant !== "inline" && (
        <span
          data-fill
          aria-hidden="true"
          className={`absolute inset-0 ${fillColour}`}
          style={{ clipPath: "circle(0% at 50% 50%)" }}
        />
      )}

      {/* Two stacked labels; the top slides out as the bottom arrives.
          The resting offset is `top-full`, not a translate utility: Tailwind
          writes those to the `translate` property, which GSAP clears the
          moment it animates `transform`, leaving the label outside the clip
          window and the button apparently empty on hover. */}
      <span className="relative block overflow-hidden">
        <span
          data-label-top
          className={`flex items-center gap-3 whitespace-nowrap transition-colors ${hoverText}`}
        >
          {children}
          {arrow && <span aria-hidden="true">&rarr;</span>}
        </span>
        <span
          data-label-bottom
          aria-hidden="true"
          className={`absolute left-0 top-full flex items-center gap-3 whitespace-nowrap transition-colors ${hoverText}`}
        >
          {children}
          {arrow && <span>&rarr;</span>}
        </span>
      </span>

      {variant === "inline" && (
        <span
          aria-hidden="true"
          className={`absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
            onDark ? "bg-verdigris-light" : "bg-verdigris"
          }`}
        />
      )}
    </>
  );

  const inner = href ? (
    <Link
      // @ts-expect-error — shared ref across button/anchor renders
      ref={ref}
      href={href}
      className={`${base} ${variants[variant]} ${className ?? ""}`}
    >
      {content}
    </Link>
  ) : (
    <button
      // @ts-expect-error — shared ref across button/anchor renders
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${
        disabled ? "cursor-not-allowed opacity-40" : ""
      } ${className ?? ""}`}
    >
      {content}
    </button>
  );

  // The magnetic field. Padding extends the pointer target past the button
  // and the matching negative margin keeps layout identical, so the field
  // stays still while the button moves inside it.
  return (
    <span
      ref={field}
      className="relative inline-flex"
      style={
        magnetic
          ? { padding: magnet.field, margin: -magnet.field }
          : undefined
      }
    >
      {inner}
    </span>
  );
}
