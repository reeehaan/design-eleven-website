"use client";

import { cn } from "@/lib/utils";
import type { FormStep } from "@/lib/contact-form";

const STEP_LABELS = [
  "Project type",
  "Details",
  "Budget & timeline",
  "Your info",
] as const;

type StepIndicatorProps = {
  current: FormStep;
  onJumpTo: (step: FormStep) => void;
};

export function StepIndicator({ current, onJumpTo }: StepIndicatorProps) {
  return (
    <nav aria-label="Form progress" className="border-y border-surface-line">
      <ol className="grid grid-cols-4">
        {STEP_LABELS.map((label, i) => {
          const step = (i + 1) as FormStep;
          const isCurrent = step === current;
          const isPast = step < current;
          const isFuture = step > current;

          return (
            <li key={label}>
              <button
                type="button"
                onClick={() => !isFuture && onJumpTo(step)}
                disabled={isFuture}
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "flex w-full flex-col items-start gap-2 border-t-2 py-4 text-left transition-colors",
                  isCurrent && "border-accent text-fg-primary",
                  isPast && "cursor-pointer border-fg-primary text-fg-primary hover:text-accent",
                  isFuture && "cursor-not-allowed border-transparent text-fg-subtle",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-xs uppercase tracking-[0.08em]",
                    isCurrent && "text-accent",
                    isPast && "text-fg-muted",
                    isFuture && "text-fg-subtle",
                  )}
                >
                  {step.toString().padStart(2, "0")}
                </span>
                <span className="hidden text-sm md:inline">{label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
