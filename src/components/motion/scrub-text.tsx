"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, fontsReady } from "@/lib/motion/gsap";
import { animateText, type TextKind } from "@/lib/motion/text-anim";

/**
 * The site's text animation as a component (the page-wide TextFx applies the
 * same thing automatically). `kind="title"` for headings, `kind="body"` (the
 * default) for paragraphs; see `text-anim.ts`.
 */
export function ScrubText({
  children,
  as: Tag = "p",
  kind,
  className,
  id,
  start,
  end,
  auto,
}: {
  children: ReactNode;
  as?: ElementType;
  kind?: TextKind;
  className?: string;
  id?: string;
  start?: string;
  end?: string;
  auto?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const resolved: TextKind =
    kind ??
    (typeof Tag === "string" && /^h[1-6]$/.test(Tag) ? "title" : "body");

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      el.setAttribute("data-fx", "text");
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let undo: (() => void) | undefined;
        let cancelled = false;
        fontsReady().then(() => {
          if (!cancelled)
            undo = animateText(el, { kind: resolved, start, end, auto });
        });
        return () => {
          cancelled = true;
          undo?.();
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
