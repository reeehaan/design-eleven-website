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
        "block font-mono text-xs uppercase tracking-[0.08em] text-fg-muted",
        className,
      )}
    >
      {children}
      {required && (
        <span aria-hidden="true" className="ml-1 text-accent">
          *
        </span>
      )}
    </label>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-2 font-mono text-xs uppercase tracking-[0.08em] text-accent">
      {message}
    </p>
  );
}

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField({ className, error, ...props }, ref) {
    return (
      <input
        ref={ref}
        {...props}
        aria-invalid={!!error}
        className={cn(
          "w-full border-b border-surface-line bg-transparent py-3 text-body text-fg-primary",
          "placeholder:text-fg-subtle",
          "focus:border-accent focus:outline-none",
          error && "border-accent",
          className,
        )}
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
          "w-full resize-y border-b border-surface-line bg-transparent py-3 text-body text-fg-primary",
          "placeholder:text-fg-subtle",
          "focus:border-accent focus:outline-none",
          error && "border-accent",
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

export function ChoiceCard({ selected, onSelect, label, index, description }: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "group flex w-full flex-col items-start gap-2 border p-5 text-left transition-colors md:p-6",
        selected
          ? "border-accent bg-accent/5"
          : "border-surface-line hover:border-fg-primary",
      )}
    >
      {index && (
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-subtle">
          {index}
        </span>
      )}
      <span
        className={cn(
          "font-display text-xl transition-colors md:text-2xl",
          selected ? "text-accent" : "text-fg-primary group-hover:text-accent",
        )}
      >
        {label}
      </span>
      {description && <span className="text-sm text-fg-muted">{description}</span>}
    </button>
  );
}

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: React.ReactNode;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, id, className, ...props }, ref) {
    return (
      <label
        htmlFor={id}
        className={cn("inline-flex items-center gap-3 text-sm text-fg-primary", className)}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          {...props}
          className="h-4 w-4 cursor-pointer accent-accent"
        />
        <span>{label}</span>
      </label>
    );
  },
);
