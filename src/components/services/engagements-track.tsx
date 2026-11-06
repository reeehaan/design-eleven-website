"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { ScrubText } from "@/components/motion/scrub-text";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion/gsap";
import { engagements } from "@/lib/process";

const body =
  "font-sans text-[1.0625rem] font-semibold leading-[1.15] tracking-[-0.01em]";

/**
 * The four engagements as one horizontal pass. The stage sticks to the screen
 * while scrolling slides the cards sideways, a rule underneath filling as you
 * go. Each card's title lifts in as it reaches the middle. With reduced motion
 * (or no script) the row is an ordinary swipeable strip.
 */
export function EngagementsTrack() {
  const outer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const run = outer.current;
        const track = run?.querySelector<HTMLElement>("[data-track]");
        const stage = run?.querySelector<HTMLElement>("[data-stage]");
        if (!run || !track || !stage) return;

        stage.style.overflow = "clip";
        track.style.overflowX = "visible";
        const set = () => {
          const dist = Math.max(0, track.scrollWidth - stage.clientWidth);
          run.style.height = `${Math.round(window.innerHeight + dist)}px`;
          return dist;
        };
        let dist = set();

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: run,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
            invalidateOnRefresh: true,
            onRefreshInit: () => {
              dist = set();
            },
          },
        });
        // A short hold at both ends: the first card sits fully in view when the
        // stage lands (even if layout above has nudged the start a little),
        // and the last one rests before the page carries on.
        tl.to(track, { x: () => -dist, duration: 1 }, 0.14).fromTo(
          "[data-fill]",
          { scaleX: 0 },
          { scaleX: 1, duration: 1 },
          0.14,
        );
        tl.to({}, { duration: 0.12 }, 1.14);

        const onResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", onResize);
        return () => {
          window.removeEventListener("resize", onResize);
          tl.scrollTrigger?.kill();
          tl.kill();
          run.style.height = "";
          stage.style.overflow = "";
          track.style.overflowX = "";
          gsap.set(track, { clearProps: "transform" });
        };
      });
      return () => mm.revert();
    },
    { scope: outer },
  );

  return (
    <div ref={outer} className="relative bg-paper motion-safe:h-[300svh]">
      <div
        data-stage
        className="sticky top-0 flex h-svh flex-col justify-center gap-8 overflow-clip pt-16 md:gap-12 md:pt-20"
      >
        <div className="grid grid-cols-12 gap-x-3 px-3">
          <ScrubText
            as="h2"
            kind="title"
            id="engagements-heading"
            className="col-span-12 max-w-[14ch] font-sans text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink md:col-span-6"
          >
            Four ways to work with us.
          </ScrubText>
          <ScrubText
            className={`col-span-12 mt-4 text-ink md:col-span-3 md:col-start-10 md:mt-0 ${body}`}
          >
            Every range is typical, not a quote. The real number comes from a
            site visit.
          </ScrubText>
        </div>

        <div
          data-track
          className="flex w-max gap-3 overflow-x-auto px-3 pb-2 [scrollbar-width:none]"
        >
          {engagements.map((e) => (
            <article
              key={e.slug}
              className="flex w-[82vw] shrink-0 flex-col justify-between border-t border-ink pt-3 md:w-[34vw] md:min-w-[380px]"
            >
              <div>
                <p className={`text-zinc ${body}`}>{e.ref}</p>
                <h3 className="mt-6 font-sans text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
                  {e.title}
                </h3>
                <p className={`mt-5 max-w-[26rem] text-ink ${body}`}>
                  {e.whatItIs}
                </p>
                <p className={`mt-3 max-w-[26rem] text-zinc ${body}`}>
                  {e.whoItsFor}
                </p>
              </div>
              <div className="mt-8">
                <dl className={`grid grid-cols-2 gap-x-3 text-ink ${body}`}>
                  <div>
                    <dt className="text-zinc">Typical range</dt>
                    <dd>{e.typicalRange}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc">Typical duration</dt>
                    <dd>{e.typicalDuration}</dd>
                  </div>
                </dl>
                <Link
                  href={`/contact?service=${e.contactParam}`}
                  className={`group mt-5 flex items-center justify-between border-t border-ink pt-2 text-ink transition-colors hover:text-verdigris ${body}`}
                >
                  Enquire about this
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="px-3">
          <span className="relative block h-px w-full bg-concrete">
            <span
              data-fill
              className="absolute inset-0 origin-left bg-ink"
              style={{ transform: "scaleX(0)" }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
