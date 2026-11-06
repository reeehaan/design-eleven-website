import { ScrollFx } from "@/components/motion/scroll-fx";

const body =
  "font-sans text-[1.0625rem] font-semibold leading-[1.15] tracking-[-0.01em] text-ink";

export function Materials({ items }: { items: string[] }) {
  return (
    <section
      aria-labelledby="materials-heading"
      className="grid grid-cols-12 gap-x-3 gap-y-8 bg-paper px-3 pb-14 md:pb-32"
    >
      <ScrollFx />
      <h2
        id="materials-heading"
        className={`col-span-12 text-zinc md:col-span-3 ${body}`}
      >
        What it&rsquo;s made of
      </h2>
      <ul className="col-span-12 border-t border-ink md:col-span-6 md:col-start-4">
        {items.map((item) => (
          <li key={item} className={`border-b border-concrete py-2 ${body}`}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
