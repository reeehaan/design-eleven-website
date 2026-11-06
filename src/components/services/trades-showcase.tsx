"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ScrubText } from "@/components/motion/scrub-text";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion/gsap";
import { getServicesOrdered } from "@/lib/services";

const body =
  "font-sans text-[1.0625rem] font-semibold leading-[1.15] tracking-[-0.01em]";

/**
 * The seven trades. On a laptop the photograph is held on the left and
 * swaps (a wipe from the bottom) as each trade's text reaches the middle of
 * the screen, with a running count. On a phone every trade carries its own
 * photograph, which opens from an inset frame as it scrolls in.
 */
export function TradesShowcase() {
  const trades = getServicesOrdered();
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const layers = gsap.utils.toArray<HTMLElement>("[data-layer]");
          gsap.set(layers.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
          const triggers = gsap.utils
            .toArray<HTMLElement>("[data-trade]")
            .map((el, i) =>
              ScrollTrigger.create({
                trigger: el,
                start: "top 55%",
                end: "bottom 55%",
                onToggle: (self) => {
                  if (!self.isActive) return;
                  setActive(i);
                  layers.forEach((l, k) => {
                    if (k <= i) {
                      gsap.to(l, {
                        clipPath: "inset(0% 0% 0% 0%)",
                        duration: 0.8,
                        ease: "power3.inOut",
                        overwrite: true,
                      });
                    } else {
                      gsap.to(l, {
                        clipPath: "inset(100% 0% 0% 0%)",
                        duration: 0.8,
                        ease: "power3.inOut",
                        overwrite: true,
                      });
                    }
                  });
                },
              }),
            );
          return () => triggers.forEach((t) => t.kill());
        },
      );

      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          const made: gsap.core.Tween[] = [];
          gsap.utils.toArray<HTMLElement>("[data-mimg]").forEach((el) => {
            made.push(
              gsap.fromTo(
                el,
                { clipPath: "inset(14% 10% 14% 10%)" },
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                  ease: "none",
                  scrollTrigger: {
                    trigger: el,
                    start: "top 92%",
                    end: "top 35%",
                    scrub: 0.3,
                  },
                },
              ),
            );
          });
          return () => {
            made.forEach((t) => {
              t.scrollTrigger?.kill();
              t.kill();
            });
          };
        },
      );

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const made: gsap.core.Tween[] = [];
        gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
          made.push(
            gsap.from(el, {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }),
          );
        });
        return () => {
          made.forEach((t) => {
            t.scrollTrigger?.kill();
            t.kill();
          });
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="trades-heading"
      className="bg-paper px-3 pb-14 md:pb-32"
    >
      <div className="grid grid-cols-12 gap-x-3 pb-10 md:pb-24">
        <ScrubText
          as="h2"
          kind="title"
          id="trades-heading"
          className="col-span-12 max-w-[16ch] font-sans text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink md:col-span-7"
        >
          Fewer subcontractors, fewer excuses.
        </ScrubText>
        <ScrubText
          className={`col-span-12 mt-5 text-ink md:col-span-3 md:col-start-10 md:mt-0 ${body}`}
        >
          Work we do ourselves rather than sublet. It is why programmes hold:
          there is no third party to wait on, and no one to blame.
        </ScrubText>
      </div>

      <div className="grid grid-cols-12 gap-x-3">
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-24 h-[calc(100svh-8rem)]">
            <div className="relative h-full w-full overflow-clip bg-paper-sunk">
              {trades.map((s, i) => (
                <div key={s.slug} data-layer className="absolute inset-0">
                  <Image
                    src={s.image.src}
                    alt={i === active ? s.image.alt : ""}
                    fill
                    sizes="40vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p
              aria-hidden="true"
              className={`mt-3 flex justify-between text-ink tabular-nums ${body}`}
            >
              <span>{trades[active]?.title}</span>
              <span>
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(trades.length).padStart(2, "0")}
              </span>
            </p>
          </div>
        </div>

        <ol className="col-span-12 lg:col-span-6 lg:col-start-7">
          {trades.map((s, i) => (
            <li
              key={s.slug}
              id={s.slug}
              data-trade
              className="scroll-mt-24 border-t border-ink py-6 lg:min-h-[78svh] lg:py-8"
            >
              <p className={`text-zinc ${body}`}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <div
                data-mimg
                className="relative mt-4 aspect-video w-full overflow-clip bg-paper-sunk lg:hidden"
              >
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <ScrubText
                as="h3"
                kind="title"
                className="mt-6 font-sans text-[clamp(1.75rem,3.4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink"
              >
                {s.title}
              </ScrubText>
              <ScrubText className={`mt-5 max-w-[30rem] text-ink ${body}`}>
                {s.summary}
              </ScrubText>

              <ul
                className={`mt-8 max-w-[30rem] border-t border-concrete text-ink ${body}`}
              >
                {s.included.slice(0, 5).map((item) => (
                  <li key={item} className="border-b border-concrete py-2">
                    {item}
                  </li>
                ))}
              </ul>

              <dl
                className={`mt-6 grid max-w-[30rem] grid-cols-2 gap-x-3 text-ink ${body}`}
              >
                <div>
                  <dt className="text-zinc">Typical timeline</dt>
                  <dd>{s.timeline}</dd>
                </div>
                <div>
                  <dt className="text-zinc">Priced as</dt>
                  <dd>{s.startingFrom}</dd>
                </div>
              </dl>

              <Link
                href={`/contact?service=${s.contactParam}`}
                className={`group mt-8 flex max-w-[30rem] items-center justify-between border-t border-ink pt-2 text-ink transition-colors hover:text-verdigris ${body}`}
              >
                Enquire about this
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
