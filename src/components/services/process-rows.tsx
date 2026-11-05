import Image from "next/image";
import { ScrollFx } from "@/components/motion/scroll-fx";
import { stages } from "@/lib/process";

/**
 * PLACEHOLDERS: Unsplash stand-ins, one per stage and one for the header.
 * Swap each for the studio's own photograph when it exists.
 */
const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const HEADER = {
  src: u("photo-1704457030855-9d7e726e48a1", 2400),
  alt: "A modern timber home under a clear blue sky",
};

const STAGE_IMAGES = [
  {
    src: u("photo-1621905253185-95614217f357"),
    alt: "A site lead in a hard hat on the plot",
  },
  {
    src: u("photo-1503387762-592deb58ef4e"),
    alt: "Drawings and a pencil being worked on at a desk",
  },
  {
    src: u("photo-1603901622056-0a5bee231395"),
    alt: "Blueprints with drafting pencils and a ruler",
  },
  {
    src: u("photo-1780849328094-228dc15a6e10"),
    alt: "A builder in safety gear beside scaffolding",
  },
  {
    src: u("photo-1760067537639-0fb475c87657"),
    alt: "A finished living room with large windows",
  },
  {
    src: u("photo-1657346088167-b982455bf29a"),
    alt: "A finished modern house at dusk",
  },
];

const WORDS = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];

const body =
  "font-sans text-[1.0625rem] font-semibold leading-[1.15] tracking-[-0.01em] text-ink";

/**
 * The process on a twelve-column grid. Statement and a full-width photograph,
 * then the intro (copy in column four, the stage index in column ten), then
 * one hairline row per stage: label first, title and copy from column four,
 * the facts in column ten. Rows stack as they scroll.
 */
export function ProcessRows({
  statement,
  intro,
  freeToChange,
}: {
  statement: string;
  intro: string;
  freeToChange: string;
}) {
  return (
    <div className="bg-paper px-3">
      <ScrollFx />
      <h1
        id="process-title"
        className="max-w-[24ch] pt-12 font-sans text-[clamp(1.75rem,2.9vw,2.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink md:pt-60"
      >
        {statement}
      </h1>

      <div
        data-fx="img"
        className="relative mt-8 h-[52svh] w-full md:h-[min(105svh,980px)] overflow-clip bg-paper-sunk"
      >
        <Image
          src={HEADER.src}
          alt={HEADER.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-12 gap-x-3 gap-y-10 py-6 md:pb-32">
        <p className={`col-span-12 md:col-span-4 md:col-start-4 ${body}`}>
          {intro}
        </p>
        <div className="col-span-12 md:col-span-3 md:col-start-10">
          <ol className={`list-inside list-decimal ${body}`}>
            {stages.map((s) => (
              <li key={s.ref}>
                <a
                  href={`#stage-${s.n}`}
                  className="transition-colors duration-200 hover:text-verdigris"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
          <p className={`mt-8 ${body}`}>
            <span className="text-zinc">Free to change </span>
            {freeToChange}
          </p>
        </div>
      </div>

      <ol>
        {stages.map((stage, i) => (
          <li
            key={stage.ref}
            id={`stage-${stage.n}`}
            style={{
              top: `calc(var(--nav-h, 4rem) + ${i} * var(--step, 2.25rem))`,
            }}
            className="sticky border-t border-ink bg-paper pb-10 pt-3 [--nav-h:4rem] [--step:2.25rem] md:[--nav-h:5rem] lg:min-h-[60svh] lg:[--step:4rem]"
          >
            <div className="grid grid-cols-12 gap-x-3 gap-y-6">
              <p className={`col-span-12 md:col-span-3 ${body}`}>
                Step {WORDS[i] ?? stage.n}
              </p>

              <div className="col-span-12 md:col-span-6 md:col-start-4">
                <h2
                  data-fx="rise"
                  className="font-sans text-[clamp(1.75rem,2.9vw,2.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink"
                >
                  {stage.title}
                </h2>
                <p
                  data-fx="rise"
                  className={`mt-6 max-w-[26rem] md:mt-20 ${body}`}
                >
                  {stage.does}
                </p>
              </div>

              <div className="col-span-12 md:col-span-3 md:col-start-10">
                {STAGE_IMAGES[i] && (
                  <div
                    data-fx="img"
                    className="relative aspect-4/3 w-full overflow-clip bg-paper-sunk"
                  >
                    <Image
                      src={STAGE_IMAGES[i].src}
                      alt={STAGE_IMAGES[i].alt}
                      fill
                      sizes="(min-width: 768px) 25vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <dl className={`mt-4 space-y-4 ${body}`}>
                  <div>
                    <dt className="text-zinc">You decide</dt>
                    <dd>{stage.decides}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc">Cost to change your mind</dt>
                    <dd>{stage.changeCost}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc">Typically</dt>
                    <dd>{stage.duration}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
