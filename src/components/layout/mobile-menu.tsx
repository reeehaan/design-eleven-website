"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-fg-primary transition-colors hover:bg-bg-secondary md:hidden"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={cn(
          "fixed inset-x-0 top-16 z-50 origin-top border-b border-surface-line bg-bg-primary transition-all duration-300 ease-out md:hidden",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        <nav aria-label="Mobile" className="container-x flex flex-col gap-1 py-6">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-surface-line py-4 font-display text-2xl text-fg-primary transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-fg-primary px-6 py-4 text-sm font-medium text-bg-primary transition-colors hover:bg-accent"
          >
            Start a project
            <span aria-hidden="true">→</span>
          </Link>

          <div className="mt-6 flex flex-col gap-2 pb-4">
            <span className="label-mono">Direct</span>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              className="font-sans text-base text-fg-primary"
            >
              {siteConfig.contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-sans text-base text-fg-muted"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
