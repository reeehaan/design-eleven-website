import { Eyebrow } from "@/components/motion/eyebrow";
import { RevealLines } from "@/components/motion/reveal-lines";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export type MastheadCell = {
  label: string;
  value: string;
  /** Rendered small and grey after the value — "sq ft", "weeks". */
  unit?: string;
  /**
   * Set the value in the mono face at meta size instead of the display face.
   * For codes rather than quantities — a registration number is not a figure
   * you read at 2rem, and it wraps badly in a half-width mobile cell.
   */
  code?: boolean;
};

type PageMastheadProps = {
  /** Drawing reference and section name, e.g. "S-00 · Services". */
  eyebrow: string;
  title: string;
  /** Second clause, set in zinc so the headline reads as two beats. */
  titleAccent?: string;
  intro: string;
  /**
   * Title-block figures. Two to four; the grid is two columns on mobile and
   * four from md, so three leaves a hole. Omit entirely on a page with no
   * facts worth stating — an invented figure is worse than a plain header.
   */
  cells?: MastheadCell[];
};

/**
 * The masthead every content page opens with.
 *
 * Replaces the old <PageHero>, which set the title and then left the lower
 * half of the screen empty. The register underneath is the difference: it
 * puts the page's few load-bearing numbers above the fold, where a client
 * deciding whether to keep reading can see them.
 *
 * Deliberately tighter than a conventional hero. These pages all open onto
 * content — a grid, a list, a story — and a masthead that fills the viewport
 * on its own just delays it.
 */
export function PageMasthead({
  eyebrow,
  title,
  titleAccent,
  intro,
  cells,
}: PageMastheadProps) {
  return (
    <section
      aria-labelledby="page-masthead-title"
      className="border-b border-concrete bg-paper"
    >
      <div className="mx-auto w-full max-w-360 px-6 pt-12 md:px-10 md:pt-16 lg:px-16">
        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow>{eyebrow}</Eyebrow>
            <RevealLines
              as="h1"
              id="page-masthead-title"
              className="mt-7 font-title text-d1 font-medium text-ink"
            >
              {title}
              {titleAccent && (
                <>
                  {" "}
                  <span className="text-zinc">{titleAccent}</span>
                </>
              )}
            </RevealLines>
          </div>

          <div className="lg:col-span-4 lg:pb-2">
            <Reveal>
              <p className="max-w-measure font-body text-lead text-graphite">
                {intro}
              </p>
            </Reveal>
          </div>
        </div>

        {cells && cells.length > 0 && (
          /* The gap-px rules do the dividing, so the cells reflow from four
             columns to two without any of them growing a stray edge or
             needing a border rule per breakpoint. */
          <Reveal className="mt-10 md:mt-14">
            <dl className="grid grid-cols-2 gap-px border-t border-concrete bg-concrete md:grid-cols-4">
              {cells.map((cell, i) => (
                <div
                  key={cell.label}
                  className={cn(
                    "bg-paper py-6 md:py-8",
                    // Whichever cell opens a row sits flush with the container
                    // gutter; the rest clear the hairline to their left. Rows
                    // are two wide on mobile and four from md.
                    i % 2 === 0 ? "pl-0" : "pl-5",
                    i === 0 ? "md:pl-0" : "md:pl-6",
                  )}
                >
                  <dt className="font-meta text-meta-sm uppercase text-zinc">
                    {cell.label}
                  </dt>
                  <dd
                    className={cn(
                      "mt-2.5 text-ink",
                      cell.code
                        ? "font-meta text-meta uppercase break-all"
                        : "font-title text-d4 font-medium tabular-nums",
                    )}
                  >
                    {cell.value}
                    {cell.unit && (
                      <span className="ml-1.5 font-meta text-meta uppercase text-zinc">
                        {cell.unit}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </section>
  );
}
