"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/lib/projects";

export function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const open = lightboxIndex !== null;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, closeLightbox, goPrev, goNext]);

  return (
    <section
      aria-labelledby="gallery-heading"
      className="border-t border-surface-line py-section md:py-section-lg"
    >
      <Container>
        <Reveal>
          <EyebrowLabel number="02">Gallery</EyebrowLabel>
          <h2
            id="gallery-heading"
            className="mt-6 font-display text-display-md text-fg-primary"
          >
            More from the build.
          </h2>
        </Reveal>

        <Reveal className="mt-12 md:mt-16">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {images.map((image, i) => (
              <li key={image.src} className={cn(i === 0 && "sm:col-span-2")}>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="group block w-full"
                  aria-label={`Open image: ${image.alt}`}
                >
                  <div
                    className={cn(
                      "relative w-full overflow-hidden bg-bg-secondary",
                      i === 0 ? "aspect-[16/9]" : "aspect-[4/3]",
                    )}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes={
                        i === 0
                          ? "(min-width: 768px) 66vw, 100vw"
                          : "(min-width: 768px) 33vw, 50vw"
                      }
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {open && lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-surface-dark/95"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close image viewer"
              className="absolute right-4 top-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-bg-primary transition-colors hover:border-accent hover:text-accent md:right-8 md:top-8"
            >
              <X size={20} />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="Previous image"
              className="absolute left-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-bg-primary transition-colors hover:border-accent hover:text-accent md:left-8"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              aria-label="Next image"
              className="absolute right-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-bg-primary transition-colors hover:border-accent hover:text-accent md:right-20"
            >
              <ChevronRight size={20} />
            </button>

            <div
              className="relative h-[80vh] w-[90vw] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={images[lightboxIndex].src}
                    alt={images[lightboxIndex].alt}
                    fill
                    sizes="90vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.08em] text-bg-primary/60">
              {(lightboxIndex + 1).toString().padStart(2, "0")}{" "}
              <span className="text-bg-primary/30">
                / {images.length.toString().padStart(2, "0")}
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
