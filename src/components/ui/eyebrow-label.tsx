import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type EyebrowLabelProps = {
  children: ReactNode;
  className?: string;
  number?: string;
};

export function EyebrowLabel({ children, className, number }: EyebrowLabelProps) {
  return (
    <span className={cn("label-mono inline-flex items-center gap-3", className)}>
      {number && (
        <>
          <span aria-hidden="true" className="text-fg-subtle">
            {number}
          </span>
          <span aria-hidden="true" className="h-px w-6 bg-surface-line" />
        </>
      )}
      {children}
    </span>
  );
}
