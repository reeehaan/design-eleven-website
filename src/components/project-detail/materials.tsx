import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/motion/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { CheckList } from "@/components/ui/check-list";

export function Materials({ items }: { items: string[] }) {
  return (
    <section
      aria-labelledby="materials-heading"
      className="border-t border-concrete py-20 md:py-24"
    >
      <Container>
        <Reveal>
          <div className="grid gap-10 md:grid-cols-12 md:gap-x-10">
            <div className="md:col-span-4">
              <Eyebrow>04 &middot; Materials</Eyebrow>
              <h2
                id="materials-heading"
                className="mt-6 font-title text-d3 font-medium text-ink"
              >
                What it&apos;s <span className="text-graphite">made of</span>.
              </h2>
              <p className="mt-5 max-w-xs text-graphite">
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
