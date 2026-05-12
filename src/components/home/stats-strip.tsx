import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

type Stat = {
  value: string;
  label: string;
};

function getStats(): Stat[] {
  const years = new Date().getFullYear() - siteConfig.established;
  const yearsDisplay = years.toString().padStart(2, "0");

  return [
    { value: yearsDisplay, label: "Years building" },
    { value: "40+", label: "Projects delivered" },
    { value: "100%", label: "Licensed & insured" },
  ];
}

export function StatsStrip() {
  const stats = getStats();

  return (
    <section aria-label="Company at a glance" className="border-y border-surface-line">
      <Container>
        <ul className="grid grid-cols-1 divide-y divide-surface-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((stat, i) => (
            <li
              key={stat.label}
              className="flex items-baseline justify-between gap-6 py-8 md:flex-col md:items-start md:justify-start md:gap-4 md:py-12 md:pl-8 md:first:pl-0"
            >
              <span
                className="font-display text-5xl text-fg-primary md:text-7xl"
                aria-hidden="true"
              >
                {stat.value}
              </span>
              <span className="label-mono">
                <span className="sr-only">{stat.value} </span>
                {stat.label}
                <span aria-hidden="true" className="ml-3 text-fg-subtle">
                  / {(i + 1).toString().padStart(2, "0")}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
