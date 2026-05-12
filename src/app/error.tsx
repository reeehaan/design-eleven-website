"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
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
    <Container as="section" className="flex min-h-[70vh] items-center py-section">
      <div className="max-w-2xl">
        <EyebrowLabel>Something went wrong</EyebrowLabel>
        <h1 className="mt-6 font-display text-display-lg text-fg-primary">
          That didn&rsquo;t{" "}
          <span className="italic text-fg-muted">load right</span>.
        </h1>
        <p className="mt-6 text-body-lg text-fg-muted">
          We hit an unexpected error. Try refreshing, or reach out directly
          and we&rsquo;ll sort it.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-3 rounded-full bg-fg-primary px-6 py-3 text-sm font-medium text-bg-primary transition-colors hover:bg-accent"
          >
            Try again <span aria-hidden="true">→</span>
          </button>
          <ArrowLink href="/" variant="subtle">
            Go home
          </ArrowLink>
        </div>

        <div className="mt-12 border-t border-surface-line pt-6 font-mono text-xs uppercase tracking-[0.08em] text-fg-muted">
          Or call us directly:{" "}
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="text-fg-primary hover:text-accent"
          >
            {siteConfig.contact.phoneDisplay}
          </a>
        </div>
      </div>
    </Container>
  );
}
