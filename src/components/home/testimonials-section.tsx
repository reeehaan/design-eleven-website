"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/lib/testimonials";

const FADE_MS = 250;

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const total = testimonials.length;

  const navigate = useCallback(
    (newIndex: number) => {
      // Clear any in-flight navigation so rapid clicks don't queue
      if (timerRef.current) clearTimeout(timerRef.current);

      setFading(true);
      timerRef.current = setTimeout(() => {
        setIndex(newIndex);
        setFading(false);
      }, FADE_MS);
    },
    [],
  );

  const goPrev = () => navigate((index - 1 + total) % total);
  const goNext = () => navigate((index + 1) % total);

  const current = testimonials[index];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="border-t border-surface-line py-section md:py-section-lg"
    >
      <Container>
        <Reveal>
          <EyebrowLabel number="04">Word from clients</EyebrowLabel>
          <h2 id="testimonials-heading" className="sr-only">
            Client testimonials
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-9">
            <blockquote
              style={{
                opacity: fading ? 0 : 1,
                transform: fading ? "translateY(8px)" : "none",
                transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
              }}
            >
              <span
                aria-hidden="true"
                className="block font-display text-7xl leading-none text-accent md:text-8xl"
              >
                &ldquo;
              </span>
              <p className="mt-2 font-display text-3xl italic leading-snug text-fg-primary md:text-5xl md:leading-tight">
                {current.quote}
              </p>
              <footer className="mt-10 flex flex-col gap-1 border-t border-surface-line pt-5 font-mono text-xs uppercase tracking-[0.08em] md:flex-row md:items-center md:gap-6">
                <cite className="not-italic text-fg-primary">
                  — {current.name}
                </cite>
                <span className="text-fg-muted">{current.role}</span>
                {current.projectSlug && (
                  <Link
                    href={`/projects/${current.projectSlug}`}
                    className="text-accent transition-colors hover:text-accent-deep md:ml-auto"
                  >
                    View project →
                  </Link>
                )}
              </footer>
            </blockquote>
          </div>

          <div className="flex items-center justify-between md:col-span-3 md:flex-col md:items-end md:justify-between md:gap-12">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-muted">
              {(index + 1).toString().padStart(2, "0")}{" "}
              <span className="text-fg-subtle">
                / {total.toString().padStart(2, "0")}
              </span>
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous testimonial"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-surface-line text-fg-primary transition-colors hover:border-accent hover:text-accent"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next testimonial"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-surface-line text-fg-primary transition-colors hover:border-accent hover:text-accent"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
