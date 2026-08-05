import Image from "next/image";
import { Eyebrow } from "@/components/motion/eyebrow";
import { RevealLines } from "@/components/motion/reveal-lines";
import { RevealItems } from "@/components/motion/reveal-items";
import { aboutImages } from "@/lib/images";

export function BehindScenes() {
  return (
    <section
      aria-labelledby="bts-heading"
      className="border-t border-concrete bg-paper"
    >
      <div className="mx-auto w-full max-w-360 px-6 py-20 md:px-10 md:py-24 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>B-04 &middot; Behind the scenes</Eyebrow>
            <RevealLines
              as="h2"
              id="bts-heading"
              className="mt-8 max-w-[16ch] font-title text-d2 font-medium text-ink"
            >
              Work in <span className="text-zinc">progress.</span>
            </RevealLines>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="max-w-measure text-lead text-graphite">
              Sites mid-build, before the photographs get tidy. This is what
              most of the job actually looks like.
            </p>
          </div>
        </div>

        <RevealItems
          as="ul"
          className="mt-14 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8"
          selector=":scope > li"
        >
          {aboutImages.bts.map((img, i) => (
            <li
              key={img.src}
              // The middle frame drops, so the row reads as a contact sheet
              // rather than three images in a row.
              className={i === 1 ? "md:translate-y-12" : undefined}
            >
              <div className="relative aspect-4/5 w-full overflow-hidden bg-paper-sunk">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 font-meta text-meta-sm uppercase text-zinc">
                {String(i + 1).padStart(2, "0")} — {img.alt}
              </p>
            </li>
          ))}
        </RevealItems>
      </div>
    </section>
  );
}
