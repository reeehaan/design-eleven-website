import { Eyebrow } from "@/components/motion/eyebrow";
import { RevealLines } from "@/components/motion/reveal-lines";
import { Reveal } from "@/components/ui/reveal";

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
      className="border-t border-concrete bg-paper"
    >
      <div className="mx-auto w-full max-w-360 px-6 py-20 md:px-10 md:py-24 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>S-03 &middot; Common questions</Eyebrow>
            <RevealLines
              as="h2"
              id="services-faq-heading"
              className="mt-8 max-w-[16ch] font-title text-d2 font-medium text-ink"
            >
              Before you ask.
            </RevealLines>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="max-w-measure text-lead text-graphite">
              The questions clients ask most often. Anything not covered here,
              just call.
            </p>
          </div>
        </div>

        {/* Same open/close mechanism as the services register, so the two
            accordions on this page behave identically. */}
        <Reveal className="mt-14">
          <ul className="border-t border-concrete">
            {faqs.map((faq) => (
              <li key={faq.question} className="border-b border-concrete">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 md:py-7 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-title text-d4 font-medium text-ink transition-colors duration-300 group-hover:text-verdigris group-open:text-verdigris">
                      {faq.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center font-meta text-meta text-zinc transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="max-w-measure pb-7 text-copy text-graphite md:pb-8">
                    {faq.answer}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
