import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { Reveal } from "@/components/ui/reveal";
import { TwoColumn } from "@/components/ui/two-column";
import { NumberedList, type NumberedItem } from "@/components/ui/numbered-list";

const principles: NumberedItem[] = [
  {
    title: "We finish what we start.",
    description:
      "Half-built projects, abandoned sites, ghosted contractors — we know the stories. We don't add to them. Once we commit, we deliver.",
  },
  {
    title: "Site is sacred.",
    description:
      "Your home, your office, your land. We treat it like ours: clean, secure, respected. Crew shows up on time, leaves the site tidy, and protects what's already there.",
  },
  {
    title: "Honest estimates.",
    description:
      "Itemised quotes in writing. If something changes, we tell you before we do it — never as an invoice line at the end. No vague 'extras', no surprises.",
  },
  {
    title: "Owner-led, always.",
    description:
      "Our principal is on every site, every week. Decisions go through someone who knows the build, not a manager who's never seen it. You always know who's responsible.",
  },
];

export function Principles() {
  return (
    <section
      aria-labelledby="principles-heading"
      className="border-t border-surface-line bg-bg-secondary py-section md:py-section-lg"
    >
      <Container>
        <Reveal>
          <TwoColumn
            primary={
              <>
                <EyebrowLabel number="02">Principles</EyebrowLabel>
                <h2
                  id="principles-heading"
                  className="mt-6 font-display text-display-lg text-fg-primary"
                >
                  How we{" "}
                  <span className="italic text-fg-muted">actually</span> work.
                </h2>
              </>
            }
            secondary={
              <p className="max-w-md text-body-lg text-fg-muted md:pb-3">
                Four things we hold ourselves to, on every project, regardless
                of size.
              </p>
            }
          />
        </Reveal>

        <NumberedList items={principles} columns={2} className="mt-16 md:mt-24" />
      </Container>
    </section>
  );
}
