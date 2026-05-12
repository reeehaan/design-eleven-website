import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { Reveal } from "@/components/ui/reveal";
import { TwoColumn } from "@/components/ui/two-column";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "Do you provide free site visits and estimates?",
    answer:
      "Yes. The first site visit and the resulting written estimate are free, regardless of whether you proceed. We commit time upfront because honest scoping is the foundation of an honest project.",
  },
  {
    question: "How are payments structured?",
    answer:
      "Project payments are milestone-based, not time-based. The full schedule is agreed in writing before work starts — typically tied to foundation, structure, finishes, and handover. No upfront full payment.",
  },
  {
    question: "Do you handle drawings and council approvals?",
    answer:
      "We work with your architect and engineer if you have them, or recommend trusted partners. We can manage council submission and approval coordination as part of the build scope when needed.",
  },
  {
    question: "What's the typical lead time before you can start?",
    answer:
      "From the day a quote is accepted, we typically start within 2–6 weeks. The exact window depends on our current project load — we keep a maximum of 2–3 active sites at any time.",
  },
  {
    question: "Do you take projects outside Western Province?",
    answer:
      "Yes, on a case-by-case basis. Travel and site logistics are factored into the quote, and we're transparent about what's reasonable for the project size. Reach out and we'll be honest about whether we're the right fit.",
  },
  {
    question: "What happens after handover if there are issues?",
    answer:
      "Every project has an agreed defects period during which we address any issues at no extra cost. Beyond that, structural elements carry warranties as per industry standards, documented in your handover package.",
  },
];

export function ServicesFaq() {
  return (
    <section
      aria-labelledby="services-faq-heading"
      className="border-t border-surface-line bg-bg-secondary py-section md:py-section-lg"
    >
      <Container>
        <Reveal>
          <TwoColumn
            primary={
              <>
                <EyebrowLabel>Common questions</EyebrowLabel>
                <h2
                  id="services-faq-heading"
                  className="mt-6 font-display text-display-lg text-fg-primary"
                >
                  Before you{" "}
                  <span className="italic text-fg-muted">ask</span>.
                </h2>
              </>
            }
            secondary={
              <p className="max-w-md text-body-lg text-fg-muted md:pb-3">
                The questions clients ask most often. Anything not covered here, just call.
              </p>
            }
          />
        </Reveal>

        <Reveal className="mt-16 md:mt-20">
          <ul className="border-t border-surface-line">
            {faqs.map((faq) => (
              <li key={faq.question} className="border-b border-surface-line">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 transition-colors hover:text-accent md:py-8 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-display text-xl text-fg-primary group-hover:text-accent md:text-2xl">
                      {faq.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center font-mono text-fg-muted transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="pb-6 pr-12 text-body-lg text-fg-muted md:pb-8">
                    {faq.answer}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
