import { cn } from "@/lib/utils";

type CheckListProps = {
  items: string[];
  columns?: 1 | 2;
  className?: string;
};

export function CheckList({ items, columns = 2, className }: CheckListProps) {
  const gridClass = columns === 2 ? "md:grid-cols-2 md:gap-x-10" : "";

  return (
    <ul className={cn("grid border-t border-surface-line", gridClass, className)}>
      {items.map((item, i) => (
        <li
          key={item}
          className="flex items-baseline gap-4 border-b border-surface-line py-3 text-fg-primary"
        >
          <span aria-hidden="true" className="font-mono text-xs text-fg-subtle md:w-8">
            {(i + 1).toString().padStart(2, "0")}
          </span>
          <span className="flex-1 text-body">{item}</span>
        </li>
      ))}
    </ul>
  );
}
