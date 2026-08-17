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
  const total = STEP_LABELS.length;

  return (
    <nav aria-label="Form progress">
      {/* "Step 01 of 04" carries the whole message on a phone, where the
          per-step labels are too narrow to read. */}
      <p className="mb-3 flex items-baseline justify-between font-meta text-meta-sm uppercase">
        <span className="text-ink">
          Step {String(current).padStart(2, "0")} of{" "}
          {String(total).padStart(2, "0")}
        </span>
        <span className="text-zinc">{STEP_LABELS[current - 1]}</span>
      </p>

      <ol className="grid grid-cols-4 gap-2">
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
                aria-label={`Step ${step}: ${label}${isFuture ? " (not yet available)" : ""}`}
                className={cn(
                  "flex w-full flex-col items-start gap-2 pt-3 text-left",
                  isFuture ? "cursor-not-allowed" : "cursor-pointer",
                )}
              >
                {/* The bar is the progress indicator; the label below is
                    supporting detail, hidden when there is no room for it. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-0.5 w-full transition-colors duration-300",
                    isCurrent && "bg-verdigris",
                    isPast && "bg-ink",
                    isFuture && "bg-concrete",
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "hidden font-meta text-meta-sm uppercase transition-colors md:inline",
                    isCurrent && "text-ink",
                    isPast && "text-zinc group-hover:text-verdigris",
                    isFuture && "text-concrete",
                  )}
                >
                  {String(step).padStart(2, "0")} {label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
