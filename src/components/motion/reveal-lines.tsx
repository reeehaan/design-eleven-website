"use client";

import type { ElementType, ReactNode } from "react";
import { ScrubText } from "./scrub-text";

/**
 * Section and page titles. Kept under its old name so existing headings keep
 * working, but it now is the site's one title animation (`text-anim.ts`).
 */
export function RevealLines({
  children,
  className,
  as = "h2",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  id?: string;
}) {
  return (
    <ScrubText as={as} kind="title" id={id} className={className}>
      {children}
    </ScrubText>
  );
}
