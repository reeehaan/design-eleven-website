"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { ArrowLink } from "@/components/ui/arrow-link";
import { heroImages } from "@/lib/images";
import { siteConfig } from "@/lib/site";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const headlineSegments = [
  { text: "Construction & design,", italic: false, breakAfter: true },
  { text: "build with precision", italic: true, breakAfter: true },
  { text: "in Sri Lanka.", italic: false, breakAfter: false },
] satisfies { text: string; italic: boolean; breakAfter: boolean }[];

const FULL_LENGTH = headlineSegments.reduce((n, s) => n + s.text.length, 0);
const TYPING_SPEED_MS = 60;
const START_DELAY_MS = 200;

function TypingHeadline({
  reducedMotion,
  onTyping,
}: {
  reducedMotion: boolean;
  onTyping?: (active: boolean) => void;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const delay = reducedMotion ? 0 : START_DELAY_MS;
    const t = setTimeout(() => {
      if (reducedMotion) {
        setCount(FULL_LENGTH);
      } else {
        setStarted(true);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  useEffect(() => {
    if (!started || count >= FULL_LENGTH) return;
    const t = setTimeout(() => setCount((c) => c + 1), TYPING_SPEED_MS);
    return () => clearTimeout(t);
  }, [started, count]);

  useEffect(() => {
    const active = !reducedMotion && started && count < FULL_LENGTH;
    onTyping?.(active);
  }, [reducedMotion, started, count, onTyping]);

  const segmentOffsets = headlineSegments.map((_, i) =>
    headlineSegments.slice(0, i).reduce((n, s) => n + s.text.length, 0),
  );

  const typingSegmentIndex = headlineSegments.findIndex((seg, i) => {
    const start = segmentOffsets[i];
    const end = start + seg.text.length;
    return count > start && count < end;
  });

  return (
    <>
      {headlineSegments.map((seg, i) => {
        const visible = Math.min(
          Math.max(count - segmentOffsets[i], 0),
          seg.text.length,
        );
        const isFullyTyped = visible === seg.text.length;
        const text = seg.text.slice(0, visible);

        return (
          <div key={i} className="block">
            {visible === 0 ? (
              <span
                aria-hidden="true"
                style={{
                  visibility: "hidden",
                  display: "inline-block",
                  height: "0.85em",
                }}
              >
                &nbsp;
              </span>
            ) : seg.italic ? (
              <span className="italic text-fg-muted">
                {text}
                {i === typingSegmentIndex && count < FULL_LENGTH && (
                  <span
                    aria-hidden="true"
                    className="ml-px inline-block w-0.5 animate-pulse bg-accent align-[-0.05em]"
                    style={{ height: "0.85em" }}
                  />
                )}
              </span>
            ) : (
              <>
                {text}
                {i === typingSegmentIndex && count < FULL_LENGTH && (
                  <span
                    aria-hidden="true"
                    className="ml-px inline-block w-0.5 animate-pulse bg-accent align-[-0.05em]"
                    style={{ height: "0.85em" }}
                  />
                )}
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [typingActive, setTypingActive] = useState(!prefersReducedMotion);

  const animationProps = prefersReducedMotion
    ? {}
    : {
        variants: containerVariants,
        initial: "hidden" as const,
        animate: "visible" as const,
      };

  const itemProps = prefersReducedMotion ? {} : { variants: itemVariants };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pb-section-sm pt-12 md:pb-section md:pt-16"
    >
      <Container>
        <motion.div
          {...animationProps}
          className={`grid ${typingActive ? "items-start" : "items-end"} gap-12 md:grid-cols-12 md:gap-x-10`}
        >
          {/* Copy column */}
          <div className="md:col-span-6 md:pb-8">
            <motion.div {...itemProps}>
              <EyebrowLabel>
                Est. {siteConfig.established} · Sri Lanka
              </EyebrowLabel>
            </motion.div>

            <h1
              id="hero-heading"
              aria-label="Construction & design, build with precision in Sri Lanka."
              className="mt-6 font-display text-display-xl text-fg-primary"
            >
              <span aria-hidden="true">
                <TypingHeadline
                  reducedMotion={!!prefersReducedMotion}
                  onTyping={setTypingActive}
                />
              </span>
            </h1>

            <motion.p
              {...itemProps}
              className="mt-8 max-w-md text-body-lg text-fg-muted"
            >
              Specialized in building construction, steel fabrication, plumbing,
              titanium work, consulting, costing, and modern design solutions -
              delivered with quality workmanship and clear communication
            </motion.p>

            <motion.div
              {...itemProps}
              className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4"
            >
              <ArrowLink href="/contact">Start your project</ArrowLink>
              <span className="font-mono text-sm text-fg-muted">
                or call{" "}
                <a
                  href={`tel:${siteConfig.contact.whatsapp}`}
                  className="text-fg-primary underline-offset-4 hover:text-accent hover:underline"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </span>
            </motion.div>
          </div>

          {/* Image column */}
          <motion.div {...itemProps} className="md:col-span-6">
            <div
              className={`relative aspect-[3/4] w-full overflow-hidden bg-bg-secondary md:aspect-[4/5] ${
                typingActive ? "md:translate-y-0" : ""
              }`}
            >
              <Image
                src={heroImages.home.src}
                alt={heroImages.home.alt}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 hidden font-mono text-xs text-fg-muted md:block">
              <span className="text-fg-subtle">FEATURED PROJECT —</span>{" "}
              Homestay, Anuradhapura · 2024
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
