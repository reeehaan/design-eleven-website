"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/motion/eyebrow";
import { ArrowLink } from "@/components/ui/arrow-link";
import { siteConfig } from "@/lib/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[error boundary]", error);
  }, [error]);

  return (
    <Container as="section" className="flex min-h-[70vh] items-center py-20">
      <div className="max-w-2xl">
        <Eyebrow>Something went wrong</Eyebrow>
        <h1 className="mt-6 font-title text-d2 font-medium text-ink">
          That didn&rsquo;t <span className="text-graphite">load right</span>.
        </h1>
        <p className="mt-6 text-lead text-graphite">
          We hit an unexpected error. Try refreshing, or reach out directly
          and we&rsquo;ll sort it.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-verdigris"
          >
            Try again <span aria-hidden="true">→</span>
          </button>
          <ArrowLink href="/" variant="subtle">
            Go home
          </ArrowLink>
        </div>

        <div className="mt-12 border-t border-concrete pt-6 font-meta text-meta-sm uppercase text-graphite">
          Or call us directly:{" "}
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="text-ink hover:text-verdigris"
          >
            {siteConfig.contact.phoneDisplay}
          </a>
        </div>
      </div>
    </Container>
  );
}
