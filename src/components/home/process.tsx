import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { Reveal } from "@/components/ui/reveal";

type Step = {
  title: string;
  description: string;
  duration: string;
};

const steps: Step[] = [
  {
    title: "Site Visit",
    description:
      "We come to your property, listen to what you want, and look at what's possible. No commitment.",
    duration: "Day 1",
  },
  {
    title: "Estimate",
    description:
      "Itemised written quote. Materials, labour, timeline, payment milestones — all in writing before we start.",
    duration: "Within 1 week",
  },
  {
    title: "Build",
    description:
      "We start on the agreed date. Weekly site updates, photos, and a single point of contact throughout.",
    duration: "Per project",
  },
  {
    title: "Handover",
    description:
      "Walk-through, defect check, all documents handed over. We stand behind our work after handover too.",
    duration: "Final week",
  },
];

export function Process() {
  return (
    <section
      aria-labelledby="process-heading"
      className="border-t border-surface-line bg-bg-secondary py-section md:py-section-lg"
    >
      <Container>
        <Reveal>
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <EyebrowLabel number="03">How we work</EyebrowLabel>
              <h2
                id="process-heading"
                className="mt-6 font-display text-display-lg text-fg-primary"
              >
                A simple,{" "}
                <span className="italic text-fg-muted">honest</span> process.
              </h2>
            </div>
            <div className="md:col-span-5 md:pb-3 md:pl-8">
              <p className="max-w-md text-body-lg text-fg-muted">
                Four steps from your first call to handover. No surprises, no
                vague timelines, no hidden costs.
              </p>
            </div>
          </div>
        </Reveal>

        <ol className="mt-16 grid gap-12 md:mt-24 md:grid-cols-4 md:gap-x-6">
          {steps.map((step, i) => (
            <Reveal key={step.title} as="li" delay={i * 0.08}>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-fg-muted">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-surface-line" />
              </div>
              <h3 className="mt-6 font-display text-3xl text-fg-primary">
                {step.title}
              </h3>
              <p className="mt-3 text-body text-fg-muted">{step.description}</p>
              <span className="mt-5 inline-block font-mono text-xs uppercase tracking-[0.08em] text-fg-subtle">
                {step.duration}
              </span>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
