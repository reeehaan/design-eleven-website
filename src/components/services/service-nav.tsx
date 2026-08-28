"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/services";

type ServiceNavProps = {
  services: Service[];
};

export function ServiceNav({ services }: ServiceNavProps) {
  const [activeSlug, setActiveSlug] = useState<string>(services[0]?.slug ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSlug(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -50% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    services.forEach((s) => {
      const el = document.getElementById(s.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [services]);

  return (
    <nav aria-label="Services on this page" className="sticky top-24 hidden md:block">
      <span className="font-meta text-meta-sm uppercase text-zinc">
        Services
      </span>

      <ul className="mt-6 flex flex-col gap-1">
        {services.map((service, i) => (
          <li key={service.slug}>
            <a
              href={`#${service.slug}`}
              className={cn(
                "group flex items-baseline gap-3 py-2 text-sm transition-colors",
                activeSlug === service.slug
                  ? "text-verdigris"
                  : "text-graphite hover:text-ink",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "font-meta text-meta-sm transition-colors",
                  activeSlug === service.slug ? "text-verdigris" : "text-zinc",
                )}
              >
                0{i + 1}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "h-px transition-all duration-300",
                  activeSlug === service.slug ? "w-8 bg-verdigris" : "w-4 bg-concrete",
                )}
              />
              <span>{service.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
