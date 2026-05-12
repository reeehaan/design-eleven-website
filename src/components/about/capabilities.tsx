import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { Reveal } from "@/components/ui/reveal";
import { TwoColumn } from "@/components/ui/two-column";

type Capability = {
  label: string;
  value: string;
};

const capabilities: Capability[] = [
  { label: "Crew size", value: "8–12 skilled workers" },
  { label: "Concurrent projects", value: "2–3 maximum" },
  { label: "Project sizes", value: "500 sqft – 10,000+ sqft" },
  { label: "Service area", value: "Western Province · island-wide on request" },
  { label: "Build types", value: "Residential · commercial · interior" },
  { label: "Project lead time", value: "2–6 weeks from estimate to start" },
];

export function Capabilities() {
  return (
    <section
      aria-labelledby="capabilities-heading"
      className="py-section md:py-section-lg"
    >
      <Container>
        <Reveal>
          <TwoColumn
            primary={
              <>
                <EyebrowLabel number="03">Capabilities</EyebrowLabel>
                <h2
                  id="capabilities-heading"
                  className="mt-6 font-display text-display-lg text-fg-primary"
                >
                  What we can{" "}
                  <span className="italic text-fg-muted">deliver</span>.
                </h2>
              </>
            }
            secondary={
              <p className="max-w-md text-body-lg text-fg-muted md:pb-3">
                Honest about what we&apos;re built for. If a project is outside
                our scope, we&apos;ll tell you — and recommend someone who fits.
              </p>
            }
          />
        </Reveal>

        <Reveal className="mt-16 md:mt-24">
          <dl className="grid grid-cols-1 divide-y divide-surface-line border-y border-surface-line md:grid-cols-2">
            {capabilities.map((cap) => (
              <div
                key={cap.label}
                className="flex flex-col gap-1 py-6 md:flex-row md:items-baseline md:gap-8 md:px-6 odd:md:pl-0 even:md:border-l even:md:border-surface-line"
              >
                <dt className="font-mono text-xs uppercase tracking-[0.08em] text-fg-subtle md:w-40 md:shrink-0">
                  {cap.label}
                </dt>
                <dd className="font-display text-xl text-fg-primary md:text-2xl">
                  {cap.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
