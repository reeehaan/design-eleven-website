import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { Reveal } from "@/components/ui/reveal";
import { CheckList } from "@/components/ui/check-list";

export function Materials({ items }: { items: string[] }) {
  return (
    <section
      aria-labelledby="materials-heading"
      className="border-t border-surface-line py-section md:py-section-lg"
    >
      <Container>
        <Reveal>
          <div className="grid gap-10 md:grid-cols-12 md:gap-x-10">
            <div className="md:col-span-4">
              <EyebrowLabel number="04">Materials</EyebrowLabel>
              <h2
                id="materials-heading"
                className="mt-6 font-display text-display-md text-fg-primary"
              >
                What it&apos;s{" "}
                <span className="italic text-fg-muted">made of</span>.
              </h2>
              <p className="mt-5 max-w-xs text-fg-muted">
                Material selections that determined the build&apos;s character
                and durability.
              </p>
            </div>
            <div className="md:col-span-8">
              <CheckList items={items} columns={1} />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
