"use client";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { Reveal } from "@/components/ui/reveal";
import type { BeforeAfter as BeforeAfterType } from "@/lib/projects";

export function BeforeAfter({ pair }: { pair: BeforeAfterType }) {
  return (
    <section
      aria-labelledby="before-after-heading"
      className="border-t border-surface-line bg-bg-secondary py-section md:py-section-lg"
    >
      <Container>
        <Reveal>
          <div className="grid gap-4 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <EyebrowLabel number="03">Before &amp; after</EyebrowLabel>
              <h2
                id="before-after-heading"
                className="mt-6 font-display text-display-md text-fg-primary"
              >
                Drag to compare.
              </h2>
            </div>
            <p className="text-fg-muted md:col-span-5 md:pb-3 md:pl-8">
              Drag the divider left or right to see the transformation.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-12 md:mt-16">
          <div className="overflow-hidden">
            <ReactCompareSlider
              itemOne={
                <ReactCompareSliderImage
                  src={pair.before.src}
                  alt={pair.before.alt}
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src={pair.after.src}
                  alt={pair.after.alt}
                />
              }
              defaultPosition={50}
              style={{ width: "100%", aspectRatio: "16 / 10" }}
              handle={
                <div
                  aria-hidden="true"
                  className="flex h-full w-1 items-center justify-center bg-accent"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-bg-primary shadow-lg">
                    <span className="font-mono text-sm">⇄</span>
                  </div>
                </div>
              }
            />
          </div>

          <div className="mt-4 flex justify-between font-mono text-xs uppercase tracking-[0.08em] text-fg-muted">
            <span>← Before</span>
            <span>After →</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
