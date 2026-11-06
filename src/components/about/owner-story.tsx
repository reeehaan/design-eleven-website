"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { FlipText } from "@/components/motion/flip-text";
import { aboutImages } from "@/lib/images";
import { siteConfig } from "@/lib/site";

/**
 * Centred portrait. As it scrolls into view the photograph grows to full size
 * while the owner's first and last names travel in from the left and right
 * edges of the screen and stop with a few letters over the photo's sides.
 */
const mark = "cursor-default text-verdigris";

export function OwnerStory() {
  const [first, ...rest] = siteConfig.owner.split(" ");
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const vw = window.innerWidth;
        const overlap = vw < 768 ? 14 : 28;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            end: "top 15%",
            scrub: 0.3,
          },
        });
        tl.fromTo("[data-photo]", { scale: 0.55 }, { scale: 1 }, 0)
          .fromTo("[data-first]", { x: -vw * 0.6 }, { x: overlap }, 0)
          .fromTo("[data-last]", { x: vw * 0.6 }, { x: -overlap }, 0);
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const name =
    "absolute top-1/2 z-10 -translate-y-1/2 whitespace-nowrap font-sans text-[clamp(0.9rem,3.8vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink";

  return (
    <section
      ref={root}
      aria-labelledby="owner-story-heading"
      className="overflow-clip bg-paper px-3 pb-14 md:pb-40"
    >
      <h2
        id="owner-story-heading"
        className="text-center font-sans text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-none tracking-[-0.03em] text-ink"
      >
        Meet the owner
      </h2>

      <div className="relative mx-auto mt-8 w-[48%] max-w-sm md:w-[36%] md:max-w-none">
        <div
          data-photo
          className="relative aspect-4/5 w-full overflow-clip bg-paper-sunk"
        >
          <Image
            src={aboutImages.owner.src}
            alt={aboutImages.owner.alt}
            fill
            sizes="(min-width: 768px) 36vw, 50vw"
            className="object-cover"
          />
        </div>
        <p data-first className={`${name} right-full`} aria-hidden="true">
          {first}
        </p>
        <p data-last className={`${name} left-full`} aria-hidden="true">
          {rest.join(" ")}
        </p>
        <p className="sr-only">{siteConfig.owner}</p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl space-y-5 text-center font-sans text-[clamp(1.0625rem,1.6vw,1.375rem)] font-semibold leading-[1.25] tracking-[-0.01em] text-ink">
        <p>
          {siteConfig.owner} is a{" "}
          <FlipText className={mark}>qualified quantity surveyor</FlipText> and
          the <FlipText className={mark}>proprietor</FlipText> of{" "}
          {siteConfig.name}. He holds {siteConfig.ownerCredentials}, and founded
          the studio in{" "}
          <FlipText className={mark}>{String(siteConfig.established)}</FlipText>{" "}
          after years working on residential and commercial sites across Sri
          Lanka.
        </p>
        <p>
          He <FlipText className={mark}>prices every job himself</FlipText> and
          is <FlipText className={mark}>on site</FlipText> for every visit,
          every key decision and every handover, so the person who gave you the
          number is the person standing on your project.
        </p>
      </div>
    </section>
  );
}
