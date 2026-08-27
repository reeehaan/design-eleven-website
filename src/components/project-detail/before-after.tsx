"use client";

import dynamic from "next/dynamic";
import { ReactCompareSliderImage } from "react-compare-slider";
import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { Reveal } from "@/components/ui/reveal";
import type { BeforeAfter as BeforeAfterType } from "@/lib/projects";

/**
 * Client-only. The library renders a different inline `style` on the server
 * than on the client — it adds its own `transition` and `cursor` once mounted
 * — which React reports as a hydration mismatch it "won't patch up", leaving
 * the server's attributes in place on the element the drag depends on.
 * Skipping SSR for the widget removes the mismatch at its source. The images
 * drop out of the server HTML with it, which is an acceptable trade for a
 * below-the-fold interactive element.
 */
const ReactCompareSlider = dynamic(
  () => import("react-compare-slider").then((m) => m.ReactCompareSlider),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full bg-bg-secondary"
        style={{ aspectRatio: "16 / 10" }}
      />
    ),
  },
);

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
          {/* Lenis owns touchmove globally and preventDefaults it to drive its
              own scrolling, which cancels the pointer stream the slider drags
              on — so on a phone the divider could not be moved at all. The
              -touch variant only releases touch: the wheel still scrolls the
              page smoothly, and `touch-action: pan-y` on the slider keeps
              vertical swipes scrolling natively while horizontal ones drag. */}
          <div data-lenis-prevent-touch className="overflow-hidden">
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
              // touch-action must be none, and it must be here on the root.
              //
              // The library ships pan-y, which lets the browser treat a drag as
              // a possible scroll: on a phone the sequence was pointerdown ->
              // touchstart -> pointercancel, with not one pointermove, so the
              // divider never moved. Its handle layer is pointer-events:none
              // (onlyHandleDraggable does not change that), so the root is the
              // only element that ever receives the gesture and the only place
              // this can be set.
              //
              // The cost is that a vertical swipe starting on the image no
              // longer scrolls the page — scroll from above or below it. That
              // is the standard trade for a horizontal-drag control, and a
              // slider that cannot be dragged is worse.
              style={{
                width: "100%",
                aspectRatio: "16 / 10",
                touchAction: "none",
              }}
              handle={
                <div
                  aria-hidden="true"
                  // touch-action:none makes the handle claim the gesture
                  // outright rather than leaving it to the browser's scroll
                  // heuristics — the drag then works whether or not Lenis
                  // cooperates. The slider body keeps pan-y, so swiping the
                  // image still scrolls the page.
                  style={{ touchAction: "none" }}
                  className="relative flex h-full w-0.5 items-center justify-center bg-verdigris"
                >
                  {/* Absolute, not a flex child: as a child of a 4px-wide flex
                      container the 48px circle shrank to fit and rendered 8px
                      across — a target no finger can hit. */}
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-verdigris text-bg-primary">
                    <span className="font-mono text-base leading-none">⇄</span>
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
