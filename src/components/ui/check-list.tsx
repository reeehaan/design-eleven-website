import { cn } from "@/lib/utils";

type CheckListProps = {
  items: string[];
  columns?: 1 | 2;
  className?: string;
};

export function CheckList({ items, columns = 2, className }: CheckListProps) {
  const gridClass = columns === 2 ? "md:grid-cols-2 md:gap-x-10" : "";

  return (
    <ul className={cn("grid border-t border-concrete", gridClass, className)}>
      {items.map((item, i) => (
        <li
          key={item}
          className="flex items-baseline gap-4 border-b border-concrete py-3 text-ink"
        >
          <span aria-hidden="true" className="font-meta text-meta-sm text-zinc md:w-8">
            {(i + 1).toString().padStart(2, "0")}
          </span>
          <span className="flex-1 text-copy">{item}</span>
        </li>
      ))}
    </ul>
  );
}
