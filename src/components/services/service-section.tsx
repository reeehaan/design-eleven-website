import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
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
      className="scroll-mt-24 py-section md:scroll-mt-32 md:py-section-lg"
    >
      <Container>
        {/* Image + meta sidebar */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-secondary">
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
            <EyebrowLabel number={`0${index}`}>Service</EyebrowLabel>
            <h2
              id={`${service.slug}-title`}
              className="mt-5 font-display text-display-md text-fg-primary"
            >
              {service.title}
            </h2>
            <p className="mt-5 text-body text-fg-muted">{service.summary}</p>

            <dl className="mt-8 grid grid-cols-2 gap-y-4 border-t border-surface-line pt-5 font-mono text-xs">
              <dt className="uppercase tracking-[0.08em] text-fg-subtle">Timeline</dt>
              <dd className="text-right text-fg-primary">{service.timeline}</dd>
              <dt className="uppercase tracking-[0.08em] text-fg-subtle">Starts at</dt>
              <dd className="text-right text-fg-primary">{service.startingFrom}</dd>
            </dl>

            <Link
              href={`/contact?service=${service.slug}`}
              className="mt-6 inline-flex items-center gap-3 text-base font-medium text-accent transition-colors hover:text-accent-deep"
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
              <EyebrowLabel>About this service</EyebrowLabel>
              <div className="mt-5 flex flex-col gap-5 text-body-lg text-fg-muted">
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
              <EyebrowLabel>What&rsquo;s included</EyebrowLabel>
              <h3 className="mt-5 font-display text-2xl text-fg-primary md:text-3xl">
                Standard scope of work.
              </h3>
              <p className="mt-3 max-w-xs text-fg-muted">
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
              <EyebrowLabel>The process</EyebrowLabel>
              <h3 className="mt-5 font-display text-2xl text-fg-primary md:text-3xl">
                How a {service.title.toLowerCase()} project moves.
              </h3>
            </div>
            <ol className="md:col-span-8">
              {service.process.map((step, i) => (
                <li
                  key={step.title}
                  className="border-t border-surface-line py-6 last:border-b"
                >
                  <div className="grid gap-4 md:grid-cols-12 md:gap-x-6">
                    <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-subtle md:col-span-1">
                      0{i + 1}
                    </span>
                    <h4 className="font-display text-xl text-fg-primary md:col-span-4">
                      {step.title}
                    </h4>
                    <p className="text-fg-muted md:col-span-7">{step.description}</p>
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
