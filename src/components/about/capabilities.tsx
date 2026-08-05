import { Eyebrow } from "@/components/motion/eyebrow";
import { RevealLines } from "@/components/motion/reveal-lines";
import { Reveal } from "@/components/ui/reveal";

type Capability = {
  label: string;
  value: string;
};

/**
 * Crew size and concurrent projects used to head this list. They are now the
 * second and third cells of the page masthead, so repeating them here put the
 * same two numbers on screen twice before the reader had scrolled once.
 */
const capabilities: Capability[] = [
  { label: "Project sizes", value: "500 sqft – 10,000+ sqft" },
  { label: "Build types", value: "Residential · commercial · interior" },
  { label: "Service area", value: "Western Province · island-wide on request" },
  { label: "Lead time", value: "2–6 weeks from estimate to start" },
];

export function Capabilities() {
  return (
    <section
      aria-labelledby="capabilities-heading"
      className="border-t border-concrete bg-paper"
    >
      <div className="mx-auto w-full max-w-360 px-6 py-20 md:px-10 md:py-24 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>B-03 &middot; Capabilities</Eyebrow>
            <RevealLines
              as="h2"
              id="capabilities-heading"
              className="mt-8 max-w-[16ch] font-title text-d2 font-medium text-ink"
            >
              What we can <span className="text-zinc">deliver.</span>
            </RevealLines>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="max-w-measure text-lead text-graphite">
              Honest about what we are built for. If a project is outside our
              scope we will say so, and recommend someone who fits.
            </p>
          </div>
        </div>

        <Reveal className="mt-14 md:mt-16">
          <dl className="border-t border-concrete">
            {capabilities.map((cap) => (
              <div
                key={cap.label}
                className="grid gap-x-8 gap-y-1 border-b border-concrete py-6 md:grid-cols-12 md:items-baseline"
              >
                <dt className="font-meta text-meta-sm uppercase text-zinc md:col-span-3">
                  {cap.label}
                </dt>
                <dd className="font-title text-d4 font-medium text-ink md:col-span-9">
                  {cap.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
