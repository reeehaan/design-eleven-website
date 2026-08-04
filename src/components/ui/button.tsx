"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { dur, ease, MQ } from "@/lib/motion/tokens";

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
  /** Primary CTA only, and never more than one per viewport. */
  magnetic?: boolean;
  onDark?: boolean;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      // On touch, none of this is registered at all.
      mm.add(
        `${MQ.finePointer} and (prefers-reduced-motion: no-preference)`,
        () => {
          const top = el.querySelector<HTMLElement>("[data-label-top]");
          const bottom = el.querySelector<HTMLElement>("[data-label-bottom]");
          const fill = el.querySelector<HTMLElement>("[data-fill]");

          // quickTo so rapid mouse movement replaces rather than queues tweens.
          const topY = top
            ? gsap.quickTo(top, "yPercent", { duration: dur.quick, ease: ease.expo })
            : null;
          const botY = bottom
            ? gsap.quickTo(bottom, "yPercent", { duration: dur.quick, ease: ease.expo })
            : null;

          const magX = magnetic
            ? gsap.quickTo(el, "x", { duration: dur.micro, ease: ease.out })
            : null;
          const magY = magnetic
            ? gsap.quickTo(el, "y", { duration: dur.micro, ease: ease.out })
            : null;
          const labelX = magnetic && top?.parentElement
            ? gsap.quickTo(top.parentElement, "x", { duration: dur.micro, ease: ease.out })
            : null;

          const onEnter = (e: PointerEvent) => {
            topY?.(-100);
            botY?.(0);

            // Fill wipes from the exact point the pointer crossed the edge.
            if (fill) {
              const r = el.getBoundingClientRect();
              const x = ((e.clientX - r.left) / r.width) * 100;
              const y = ((e.clientY - r.top) / r.height) * 100;
              gsap.set(fill, { clipPath: `circle(0% at ${x}% ${y}%)` });
              gsap.to(fill, {
                clipPath: `circle(150% at ${x}% ${y}%)`,
                duration: dur.quick,
                ease: ease.expo,
              });
            }
          };

          const onLeave = (e: PointerEvent) => {
            topY?.(0);
            botY?.(100);

            if (fill) {
              const r = el.getBoundingClientRect();
              const x = ((e.clientX - r.left) / r.width) * 100;
              const y = ((e.clientY - r.top) / r.height) * 100;
              gsap.to(fill, {
                clipPath: `circle(0% at ${x}% ${y}%)`,
                duration: dur.quick,
                ease: ease.expo,
              });
            }

            if (magnetic) {
              // Slight overshoot on release so it reads as elastic, not sticky.
              gsap.to(el, {
                x: 0,
                y: 0,
                duration: dur.quick,
                ease: "back.out(2)",
              });
              if (top?.parentElement) {
                gsap.to(top.parentElement, { x: 0, duration: dur.quick, ease: "back.out(2)" });
              }
            }
          };

          const onMove = (e: PointerEvent) => {
            if (!magnetic) return;
            const r = el.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.hypot(dx, dy);
            const RADIUS = 90;
            if (dist > RADIUS) return;

            const pull = 1 - dist / RADIUS;
            magX?.(dx * 0.35 * pull);
            magY?.(dy * 0.35 * pull);
            // Label moves less than the button — that offset is what sells it.
            labelX?.(dx * 0.18 * pull);
          };

          const onDown = () => gsap.to(el, { scale: 0.98, duration: dur.micro });
          const onUp = () => gsap.to(el, { scale: 1, duration: dur.micro });
          const onKey = (e: KeyboardEvent) => {
            if (e.key === " " || e.key === "Enter") onDown();
          };

          el.addEventListener("pointerenter", onEnter);
          el.addEventListener("pointerleave", onLeave);
          el.addEventListener("pointermove", onMove);
          el.addEventListener("pointerdown", onDown);
          el.addEventListener("pointerup", onUp);
          el.addEventListener("keydown", onKey);
          el.addEventListener("keyup", onUp);

          return () => {
            el.removeEventListener("pointerenter", onEnter);
            el.removeEventListener("pointerleave", onLeave);
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerdown", onDown);
            el.removeEventListener("pointerup", onUp);
            el.removeEventListener("keydown", onKey);
            el.removeEventListener("keyup", onUp);
          };
        },
      );

      return () => mm.revert();
    },
    { scope: ref, dependencies: [magnetic] },
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

      {/* Two stacked labels; the top slides out as the bottom arrives. */}
      <span className="relative block overflow-hidden">
        <span data-label-top className={`block transition-colors ${hoverText}`}>
          {children}
        </span>
        <span
          data-label-bottom
          aria-hidden="true"
          className={`absolute left-0 top-0 block translate-y-full ${hoverText}`}
        >
          {children}
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

  if (href) {
    return (
      <Link
        // @ts-expect-error — shared ref across button/anchor renders
        ref={ref}
        href={href}
        className={`${base} ${variants[variant]} ${className ?? ""}`}
      >
        {content}
      </Link>
    );
  }

  return (
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
}
