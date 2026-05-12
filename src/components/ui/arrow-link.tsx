import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type ArrowLinkProps = ComponentProps<typeof Link> & {
  children: ReactNode;
  variant?: "default" | "subtle";
  className?: string;
};

export function ArrowLink({
  children,
  variant = "default",
  className,
  ...props
}: ArrowLinkProps) {
  const colorStyle =
    variant === "default"
      ? "text-accent hover:text-accent-deep"
      : "text-fg-primary hover:text-accent";

  return (
    <Link
      {...props}
      className={cn(
        "group inline-flex items-baseline gap-3 text-base font-medium transition-colors",
        colorStyle,
        className
      )}
    >
      <span className="border-b border-current pb-1">{children}</span>
      <span
        aria-hidden="true"
        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
