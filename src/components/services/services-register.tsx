import Image from "next/image";
import { Button } from "@/components/ui/button";
import { OpenOnHash } from "./open-on-hash";
import { TradePreview } from "./trade-preview";
import { getServicesOrdered } from "@/lib/services";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * The seven capabilities, as an expandable register.
 *
 * Native <details> rather than state: the section stays a server component,
 * costs no hydration, and works with JS off. Each row carries its slug as an
 * id, which is what /services#plumbing from the home page has been trying to
 * reach — the old flat grid had no ids, so those links hit nothing. <OpenOnHash>
 * then opens the row the fragment names.
 *
 * Exclusive, and closed on arrival: every row starts shut and opening one
 * closes the last. Both come from the shared `name` attribute rather than
 * state, so the section stays a server component.
 */
export function ServicesRegister() {
  const services = getServicesOrdered();

  return (
    <>
      <OpenOnHash />
      {/* The preview lives on this wrapper, not inside the <ul> — a <ul> may
          only contain <li>, and the pointer listeners want the whole block
          anyway. */}
      <div className="relative mt-12 md:mt-14">
        <TradePreview
          shots={services.map((s) => ({ src: s.image.src, alt: s.image.alt }))}
        />
        <ul className="border-t border-concrete">
          {services.map((service, i) => (
            <li key={service.slug} className="border-b border-concrete">
              <details
                id={service.slug}
                data-trade={i}
                // Shared `name` makes this an exclusive accordion natively:
                // opening a row closes whichever was open, with no JS and no
                // state to keep in sync. Browsers without support degrade to
                // independent rows, which is how this behaved before.
                name="trades"
                className="group scroll-mt-20 md:scroll-mt-24"
              >
                <summary className="flex cursor-pointer list-none items-start gap-5 py-7 md:gap-8 md:py-8 [&::-webkit-details-marker]:hidden">
                  <span className="mt-1.5 font-meta text-meta-sm uppercase text-zinc transition-colors duration-300 group-open:text-verdigris md:mt-2 md:w-10 md:shrink-0">
                    {pad(i + 1)}
                  </span>

                  <div className="flex-1">
                    <h3 className="font-title text-d4 font-medium text-ink transition-colors duration-300 group-hover:text-verdigris group-open:text-verdigris">
                      {service.title}
                    </h3>
                    <p className="mt-2 max-w-measure text-copy text-graphite">
                      {service.summary}
                    </p>
                  </div>

                  {/* Duration on the closed row, so the seven can be compared
                  without opening any of them. */}
                  <span className="hidden shrink-0 pt-2 font-meta text-meta-sm uppercase text-zinc lg:block lg:w-44 lg:text-right">
                    {service.timeline}
                  </span>

                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center font-meta text-meta text-zinc transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>

                <div className="grid gap-x-12 gap-y-10 pb-10 md:pb-14 lg:grid-cols-12 lg:items-start lg:pl-18">
                  {/* Sticky, because the scope and process lists run long enough
                    that a fixed left column leaves a column of dead paper. The
                    price and the enquiry button stay in reach while you read. */}
                  <div className="lg:sticky lg:top-28 lg:col-span-5">
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-paper-sunk">
                      <Image
                        src={service.image.src}
                        alt={service.image.alt}
                        fill
                        sizes="(min-width: 1024px) 38vw, 100vw"
                        className="object-cover"
                      />
                    </div>

                    {/* The two numbers a client is actually here for */}
                    <dl className="mt-5 grid grid-cols-2 border-t border-concrete pt-4">
                      <div className="border-r border-concrete pr-4">
                        <dt className="font-meta text-meta-sm uppercase text-zinc">
                          Typical duration
                        </dt>
                        <dd className="mt-2 font-meta text-meta uppercase text-ink">
                          {service.timeline}
                        </dd>
                      </div>
                      <div className="pl-4">
                        <dt className="font-meta text-meta-sm uppercase text-zinc">
                          Starting from
                        </dt>
                        <dd className="mt-2 font-meta text-meta uppercase text-ink">
                          {service.startingFrom}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-7">
                      {/* Carries context so the contact form arrives pre-filled */}
                      <Button
                        variant="inline"
                        href={`/contact?service=${service.contactParam}`}
                      >
                        Enquire about this
                      </Button>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="flex max-w-measure flex-col gap-5 text-copy text-graphite">
                      {service.description.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>

                    <h4 className="mt-10 font-meta text-meta-sm uppercase text-zinc">
                      What&rsquo;s included
                    </h4>
                    <ul className="mt-4 grid border-t border-concrete sm:grid-cols-2 sm:gap-x-10">
                      {service.included.map((item, n) => (
                        <li
                          key={item}
                          className="flex items-baseline gap-4 border-b border-concrete py-3"
                        >
                          <span
                            aria-hidden="true"
                            className="font-meta text-meta-sm text-zinc"
                          >
                            {pad(n + 1)}
                          </span>
                          <span className="flex-1 text-fine text-ink">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* `service.process` is deliberately not rendered. All seven
                      lists are the same four beats as the canonical six stages
                      — brief, quote, do the work, hand over — so printing them
                      here told the reader the same story eight times. One link
                      to the page that tells it properly instead. */}
                    <p className="mt-8 border-t border-concrete pt-6">
                      <Button href="/process" variant="inline">
                        How this runs, stage by stage
                      </Button>
                    </p>
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
