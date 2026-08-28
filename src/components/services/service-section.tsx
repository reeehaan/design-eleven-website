import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/motion/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { CheckList } from "@/components/ui/check-list";
import type { Service } from "@/lib/services";

type ServiceSectionProps = {
  service: Service;
  index: number;
};

export function ServiceSection({ service, index }: ServiceSectionProps) {
  return (
    <section
      id={service.slug}
      aria-labelledby={`${service.slug}-title`}
      className="scroll-mt-24 py-20 md:scroll-mt-32 md:py-24"
    >
      <Container>
        {/* Image + meta sidebar */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-sunk">
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="md:col-span-4 md:col-start-9 md:py-4" delay={0.1}>
            <Eyebrow>{`0${index} · Service`}</Eyebrow>
            <h2
              id={`${service.slug}-title`}
              className="mt-5 font-title text-d3 font-medium text-ink"
            >
              {service.title}
            </h2>
            <p className="mt-5 text-copy text-graphite">{service.summary}</p>

            <dl className="mt-8 grid grid-cols-2 gap-y-4 border-t border-concrete pt-5 font-meta text-meta">
              <dt className="uppercase text-zinc">Timeline</dt>
              <dd className="text-right text-ink">{service.timeline}</dd>
              <dt className="uppercase text-zinc">Starts at</dt>
              <dd className="text-right text-ink">{service.startingFrom}</dd>
            </dl>

            <Link
              href={`/contact?service=${service.slug}`}
              className="mt-6 inline-flex items-center gap-3 text-base font-medium text-verdigris transition-colors hover:text-verdigris"
            >
              <span className="border-b border-current pb-1">Request a quote</span>
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>

        {/* Description */}
        <Reveal className="mt-16 md:mt-20">
          <div className="grid gap-10 md:grid-cols-12 md:gap-x-10">
            <div className="md:col-span-7">
              <Eyebrow>About this service</Eyebrow>
              <div className="mt-5 flex flex-col gap-5 text-lead text-graphite">
                {service.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* What's included */}
        <Reveal className="mt-16 md:mt-20">
          <div className="grid gap-8 md:grid-cols-12 md:gap-x-10">
            <div className="md:col-span-4">
              <Eyebrow>What&rsquo;s included</Eyebrow>
              <h3 className="mt-5 font-title text-2xl font-medium text-ink md:text-3xl">
                Standard scope of work.
              </h3>
              <p className="mt-3 max-w-xs text-graphite">
                Adjusted to your project during the quote stage.
              </p>
            </div>
            <div className="md:col-span-8">
              <CheckList items={service.included} columns={2} />
            </div>
          </div>
        </Reveal>

        {/* Process */}
        <Reveal className="mt-16 md:mt-20">
          <div className="grid gap-10 md:grid-cols-12 md:gap-x-10">
            <div className="md:col-span-4">
              <Eyebrow>The process</Eyebrow>
              <h3 className="mt-5 font-title text-2xl font-medium text-ink md:text-3xl">
                How a {service.title.toLowerCase()} project moves.
              </h3>
            </div>
            <ol className="md:col-span-8">
              {service.process.map((step, i) => (
                <li
                  key={step.title}
                  className="border-t border-concrete py-6 last:border-b"
                >
                  <div className="grid gap-4 md:grid-cols-12 md:gap-x-6">
                    <span className="font-meta text-meta-sm uppercase text-zinc md:col-span-1">
                      0{i + 1}
                    </span>
                    <h4 className="font-title text-xl font-medium text-ink md:col-span-4">
                      {step.title}
                    </h4>
                    <p className="text-graphite md:col-span-7">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
