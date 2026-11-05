import type { Metadata } from "next";
import type { MastheadCell } from "@/components/ui/page-masthead";
import { ProcessRows } from "@/components/services/process-rows";
import { FinalCta } from "@/components/home/final-cta";
import { stages } from "@/lib/process";
import { siteConfig } from "@/lib/site";

/**
 * Read off the stage data rather than typed in, so the masthead cannot drift
 * from the six stages printed below it.
 *
 * "Free to change" counts the leading stages whose changeCost is nothing —
 * the single most useful figure on the page, and the one no competitor
 * publishes.
 */
function register(): MastheadCell[] {
  let free = 0;
  for (const s of stages) {
    if (!s.changeCost.startsWith("Nothing")) break;
    free += 1;
  }

  return [
    { label: "Stages", value: String(stages.length).padStart(2, "0") },
    { label: "First visit", value: stages[0].duration },
    { label: "Estimate in", value: stages[1].duration },
    { label: "Free to change", value: `Stages 01–0${free}` },
  ];
}

export const metadata: Metadata = {
  title: "How we work",
  description: `The six stages every ${siteConfig.name} build passes through, what you decide at each, and what changing your mind costs, plus exactly what a contract covers and what it does not.`,
  alternates: { canonical: "/process" },
  openGraph: {
    title: `How we work · ${siteConfig.name}`,
    description:
      "Six stages, the cost of changing your mind at each, and what a contract includes and excludes.",
    url: `${siteConfig.url}/process`,
  },
};

export default function ProcessPage() {
  const free = register().find((c) => c.label === "Free to change")?.value ?? "";
  return (
    <>
      <ProcessRows
        statement="Six stages, and what each one costs you."
        intro="Every job runs the same way, whatever its size. We publish the timings and the price of changing your mind at each stage, because those are the two things that actually go wrong."
        freeToChange={free}
      />

      <FinalCta />
    </>
  );
}
