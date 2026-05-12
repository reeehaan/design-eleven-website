import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export type NumberedItem = {
  title: string;
  description: string;
};

type NumberedListProps = {
  items: NumberedItem[];
  columns?: 1 | 2 | 3;
  className?: string;
};

export function NumberedList({ items, columns = 1, className }: NumberedListProps) {
  const gridClass =
    columns === 3
      ? "md:grid-cols-3"
      : columns === 2
        ? "md:grid-cols-2"
        : "";

  return (
    <ol
      className={cn(
        "grid gap-x-10 gap-y-12",
        columns > 1 && gridClass,
        className,
      )}
    >
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={i * 0.06}>
          <div className="flex items-baseline gap-6">
            <span aria-hidden="true" className="font-mono text-xs text-fg-subtle">
              {(i + 1).toString().padStart(2, "0")}
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-surface-line" />
          </div>
          <h3 className="mt-5 font-display text-3xl text-fg-primary md:text-4xl">
            {item.title}
          </h3>
          <p className="mt-3 max-w-prose text-fg-muted">{item.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}
