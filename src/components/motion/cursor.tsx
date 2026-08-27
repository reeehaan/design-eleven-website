"use client";

import { useEffect, useRef } from "react";
import { gsap, reduced } from "@/lib/motion/gsap";
import { dur, ease } from "@/lib/motion/tokens";

/** Native tags plus the one class name components reach for on a custom
 *  clickable element. Deliberately excludes [disabled] and .cursor-not-allowed
 *  further down — those should read as blocked, not as "you can click this". */
const INTERACTIVE_SELECTOR =
  'a, button, summary, select, [role="button"], [class*="cursor-pointer"]';

const NATIVE_CURSOR_SELECTOR = "input, textarea, [contenteditable]";
const BLOCKED_SELECTOR =
  "[disabled], [aria-disabled='true'], .cursor-not-allowed";

// A spread with no blur draws a crisp second ring outside the border at an
// exact offset — a box-shadow, not a second element, which two nested divs
// would need a wrapper and explicit sizing to match. Module-level because
// both the JSX (initial paint) and the hover tween inside the effect (which
// switches it off — see applyState) need the identical string.
const HALO_SHADOW = "0 0 0 1.5px var(--color-paper)";

type CursorState = "default" | "interactive" | "native";

/**
 * Custom pointer: a tight dot plus a trailing ring, standing in for the
 * system cursor on desktop.
 *
 * Two strokes, not one colour: an ink border, with a paper-coloured halo
 * just outside it (box-shadow, not a second element). Ink is what carries
 * the pointer on anything light — paper and most of the page — and the
 * paper halo is what carries it on anything dark, an ink section or a dark
 * photograph, where the ink border alone would vanish into the background.
 * Whichever the surface underneath is closer to, the other stroke is the
 * one doing the work, so there is no colour this can disappear into by
 * construction — neither stroke has to guess what is under the pointer.
 *
 * No fill, on purpose, and no colour change on hover either — three earlier
 * versions each tried to make hover a *colour* cue (verdigris border,
 * verdigris fill, `mix-blend-mode: difference`) and each one either
 * disappeared against something on the page or never rendered as designed.
 * State is scale only now: the ring grows slightly over anything clickable,
 * same hollow outline, same two colours, always. Nothing to disappear into,
 * because nothing changes that a background could match.
 *
 * Two gates, matching every other pointer-driven effect on this site (the
 * home work-list preview, the services trade preview): fine pointer only,
 * and never under reduced motion. The native cursor is hidden by a class
 * this effect adds only after both checks pass — see the CSS rule in
 * globals.css — so a JS failure or a slow connection leaves a visitor with
 * the ordinary system cursor, never with none at all.
 *
 * Text fields are the one place this yields entirely back to the native
 * cursor: the I-beam carries real information (where a click will place the
 * caret) that a generic ring cannot.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("custom-cursor");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: ease.out });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: ease.out });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: ease.out });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: ease.out });

    gsap.set([dot, ring], { autoAlpha: 1 });

    // Until the pointer has been located once, both ride in from 0,0 — the
    // same fix the home page preview needed for the same reason.
    let located = false;
    let state: CursorState = "default";

    const applyState = () => {
      // "auto", never plain `true`. Plain `true` kills every other tween
      // running on these exact targets, property or no — and dot/ring are
      // the same elements the position-tracking quickTo tweens run on. This
      // runs on every pointerover, which is most element/text boundaries the
      // cursor crosses while moving normally, not just distinct clickable
      // things — so on a real page it was repeatedly killing the x/y
      // tracking mid-flight. "auto" only kills tweens sharing the property
      // actually changing, leaving position alone.
      if (state === "native") {
        gsap.to([dot, ring], {
          autoAlpha: 0,
          duration: dur.micro,
          overwrite: "auto",
        });
        return;
      }
      gsap.to([dot, ring], {
        autoAlpha: 1,
        duration: dur.micro,
        overwrite: "auto",
      });

      // Scale only — no fill, no colour swap. See the note at the top of
      // the file on why: colour cues here kept finding some part of the
      // page to disappear against, and a size change cannot.
      //
      // The paper halo drops out on hover rather than scaling up with the
      // ring. It is a thin, barely-there edge at the default 32px size; at
      // the enlarged hover size the same 1.5px spread reads as an obvious
      // pale ring around the pointer, which is what was reported back as
      // "a white outline" — same box-shadow, just suddenly noticeable.
      const interactive = state === "interactive";
      gsap.to([dot, ring], {
        boxShadow: interactive ? "none" : HALO_SHADOW,
        duration: dur.micro,
        ease: ease.out,
        overwrite: "auto",
      });
      gsap.to(ring, {
        scale: interactive ? 1.25 : 1,
        duration: dur.micro,
        ease: ease.out,
        overwrite: "auto",
      });
    };

    const onMove = (e: PointerEvent) => {
      if (located) {
        dotX(e.clientX);
        dotY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);
      } else {
        // One gsap.set per element, not one call on [dot, ring] together.
        // Each has its own quickTo instance tracking x/y independently, and a
        // multi-target .set() desyncs quickTo's internal cache from the real
        // value — the first real move landed both correctly, then the very
        // next move corrupted each differently: the dot's transform lost its
        // translate entirely and the ring froze at the first position for
        // good. Two individual sets, matching the single-element pattern
        // already proven in featured-work.tsx, avoids it.
        gsap.set(dot, { x: e.clientX, y: e.clientY });
        gsap.set(ring, { x: e.clientX, y: e.clientY });
        located = true;
      }
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const nextState: CursorState = target.closest(NATIVE_CURSOR_SELECTOR)
        ? "native"
        : target.closest(BLOCKED_SELECTOR)
          ? "default"
          : target.closest(INTERACTIVE_SELECTOR)
            ? "interactive"
            : "default";

      if (nextState === state) return;
      state = nextState;
      applyState();
    };

    const onDown = () => {
      if (state === "native") return;
      gsap.to(dot, {
        scale: 0.5,
        duration: dur.micro,
        ease: ease.out,
        overwrite: "auto",
      });
    };
    // Explicit reset, not applyState(): applyState only touches the ring
    // now, so it would never undo onDown's shrink and the dot would stay
    // pressed-in after the first click.
    const onUp = () => {
      gsap.to(dot, {
        scale: 1,
        duration: dur.micro,
        ease: ease.out,
        overwrite: "auto",
      });
    };

    // The pointer leaving the viewport entirely (to another app, another
    // monitor) — without this the dot and ring sit parked at their last
    // position instead of disappearing with the real cursor.
    const onWindowLeave = () =>
      gsap.to([dot, ring], { autoAlpha: 0, duration: dur.quick });
    const onWindowEnter = () => {
      if (state !== "native")
        gsap.to([dot, ring], { autoAlpha: 1, duration: dur.quick });
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onWindowLeave);
    document.addEventListener("mouseenter", onWindowEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onWindowLeave);
      document.removeEventListener("mouseenter", onWindowEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{ boxShadow: HALO_SHADOW }}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink opacity-0 will-change-transform"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{ boxShadow: HALO_SHADOW }}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink bg-transparent opacity-0 will-change-transform"
      />
    </>
  );
}
