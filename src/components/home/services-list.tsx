"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Reveal } from "@/components/ui/reveal";
import { getHomeServices, type Service } from "@/lib/services";

export function ServicesList() {
  const services = getHomeServices();
  const [hovered, setHovered] = useState<Service | null>(null);

  return (
    <section
      aria-labelledby="services-heading"
      className="border-t border-surface-line py-section md:py-section-lg"
    >
      <Container>
        <Reveal>
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <EyebrowLabel number="02">What we build</EyebrowLabel>
              <h2
                id="services-heading"
                className="mt-6 font-display text-display-lg text-fg-primary"
              >
                Everything you need,{" "}
                <span className="italic text-fg-muted">under one roof</span>.
              </h2>
            </div>
            <div className="md:col-span-5 md:pb-3 md:pl-8">
              <p className="max-w-md text-body-lg text-fg-muted">
                From design and costing through to construction, steel
                fabrication, and plumbing — every service is owner-led from
                first visit to handover.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="relative mt-12 md:mt-16">
          {/* Floating preview image — desktop only */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 hidden h-full w-[42%] md:block"
          >
            <AnimatePresence mode="wait">
              {hovered && (
                <motion.div
                  key={hovered.slug}
                  initial={{ opacity: 0, scale: 0.98, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="sticky top-24"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-secondary">
                    <Image
                      src={hovered.image.src}
                      alt={hovered.image.alt}
                      fill
                      sizes="42vw"
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* List */}
          <ul className="md:max-w-[55%]">
            {services.map((service, i) => (
              <li
                key={service.slug}
                className="border-t border-surface-line last:border-b"
                onMouseEnter={() => setHovered(service)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link
                  href={`/services#${service.slug}`}
                  className="group flex flex-col gap-4 py-8 transition-colors md:flex-row md:items-baseline md:gap-8 md:py-10"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs text-fg-subtle md:w-12 md:shrink-0"
                  >
                    {(i + 1).toString().padStart(2, "0")}
                  </span>

                  <div className="flex-1">
                    <h3 className="font-display text-4xl text-fg-primary transition-colors group-hover:text-accent md:text-5xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-md text-body text-fg-muted md:mt-4">
                      {service.summary}
                    </p>

                    {/* Inline image — mobile only */}
                    <div className="relative mt-5 aspect-[4/3] w-full overflow-hidden bg-bg-secondary md:hidden">
                      <Image
                        src={service.image.src}
                        alt={service.image.alt}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className="font-mono text-xs text-fg-subtle transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent md:shrink-0"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex justify-end md:mt-16">
          <ArrowLink href="/services" variant="subtle">
            All services &amp; pricing
          </ArrowLink>
        </div>
      </Container>
    </section>
  );
}
