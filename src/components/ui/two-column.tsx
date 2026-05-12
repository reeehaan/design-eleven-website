import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type TwoColumnProps = {
  primary: ReactNode;
  secondary?: ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
};

export function TwoColumn({
  primary,
  secondary,
  align = "end",
  className,
}: TwoColumnProps) {
  const alignClass =
    align === "start"
      ? "md:items-start"
      : align === "center"
        ? "md:items-center"
        : "md:items-end";

  return (
    <div
      className={cn(
        "grid gap-8 md:grid-cols-12 md:gap-x-10",
        alignClass,
        className,
      )}
    >
      <div className="md:col-span-7">{primary}</div>
      {secondary && (
        <div className="md:col-span-5 md:pl-8">{secondary}</div>
      )}
    </div>
  );
}
