"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type LabelProps = {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
};

export function Label({ htmlFor, children, required, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "block font-meta text-meta-sm uppercase text-zinc",
        className,
      )}
    >
      {children}
      {required && (
        <span aria-hidden="true" className="ml-1 text-verdigris">
          *
        </span>
      )}
    </label>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    // marking-deep is the one place orange survives in the UI: invalid state,
    // where a green would read as success.
    <p
      role="alert"
      className="mt-2 font-meta text-meta-sm uppercase text-marking-deep"
    >
      {message}
    </p>
  );
}

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

/** Underline, not a box — the rules on this site are all hairlines. */
const fieldBase =
  "w-full border-b border-concrete bg-transparent py-3 text-copy text-ink placeholder:text-zinc focus:border-verdigris focus:outline-none";

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField({ className, error, ...props }, ref) {
    return (
      <input
        ref={ref}
        {...props}
        aria-invalid={!!error}
        className={cn(fieldBase, error && "border-marking-deep", className)}
      />
    );
  },
);

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ className, error, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        {...props}
        aria-invalid={!!error}
        className={cn(
          fieldBase,
          "resize-y",
          error && "border-marking-deep",
          className,
        )}
      />
    );
  },
);

type ChoiceCardProps = {
  selected: boolean;
  onSelect: () => void;
  label: string;
  index?: string;
  description?: string;
};

export function ChoiceCard({
  selected,
  onSelect,
  label,
  index,
  description,
}: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        // min-h so a one-word option and a two-line one are the same tile
        "group flex min-h-24 w-full flex-col items-start justify-between gap-3 border p-5 text-left transition-colors",
        selected
          ? "border-ink bg-ink text-paper"
          : "border-concrete hover:border-verdigris",
      )}
    >
      {index && (
        <span
          className={cn(
            "font-meta text-meta-sm uppercase transition-colors",
            selected ? "text-paper/55" : "text-zinc",
          )}
        >
          {index}
        </span>
      )}
      <span
        className={cn(
          "font-title text-d4 font-medium transition-colors",
          selected ? "text-paper" : "text-ink group-hover:text-verdigris",
        )}
      >
        {label}
      </span>
      {description && (
        <span
          className={cn("text-fine", selected ? "text-concrete" : "text-zinc")}
        >
          {description}
        </span>
      )}
    </button>
  );
}

type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label: React.ReactNode;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, id, className, ...props }, ref) {
    return (
      <label
        htmlFor={id}
        className={cn(
          "inline-flex cursor-pointer items-center gap-3 text-copy text-ink",
          className,
        )}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          {...props}
          // accent-accent painted this orange, which the palette reserves for
          // invalid state. A checkbox is an interaction, so it is verdigris.
          className="h-4 w-4 cursor-pointer accent-verdigris"
        />
        <span>{label}</span>
      </label>
    );
  },
);
