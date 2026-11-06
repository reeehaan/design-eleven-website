import { ScrubText } from "@/components/motion/scrub-text";

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
      className="bg-paper px-3 pb-14 md:pb-32"
    >
      <div className="grid grid-cols-12 gap-x-3 gap-y-8">
        <ScrubText
          as="h2"
          kind="title"
          id="services-faq-heading"
          className="col-span-12 font-sans text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink md:col-span-4"
        >
          Before you ask.
        </ScrubText>

        <div className="col-span-12 md:col-span-7 md:col-start-6">
          {faqs.map((f) => (
            <details
              key={f.question}
              className="group border-t border-ink py-3 last:border-b"
            >
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 font-sans text-[clamp(1.125rem,1.8vw,1.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink transition-colors hover:text-verdigris [&::-webkit-details-marker]:hidden">
                {f.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-2xl leading-none transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-[34rem] pb-3 font-sans text-[1.0625rem] font-semibold leading-[1.2] tracking-[-0.01em] text-graphite">
                {f.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
