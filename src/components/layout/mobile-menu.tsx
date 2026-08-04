"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { gsap, reduced } from "@/lib/motion/gsap";
import { ease } from "@/lib/motion/tokens";

/** Full-screen navigation overlay. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const openBtn = useRef<HTMLButtonElement>(null);

  // The overlay is portalled to <body>. The sticky header uses backdrop-blur,
  // which establishes a containing block for fixed descendants — inside it,
  // `fixed inset-0` sizes to the 64px header instead of the viewport.
  // No mount guard is needed: `open` starts false and only a click flips it,
  // so the portal never runs during SSR.

  // Scroll lock, Escape to dismiss, and focus handling.
  useEffect(() => {
    if (!open) return;

    const original = document.body.style.overflow;
    const trigger = openBtn.current; // captured for cleanup
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
      // Return focus to the trigger so keyboard users don't lose their place.
      trigger?.focus();
    };
  }, [open]);

  // Entry animation.
  useEffect(() => {
    const el = panel.current;
    if (!el || !open) return;

    const links = el.querySelectorAll<HTMLElement>("[data-nav-line]");
    const tail = el.querySelectorAll<HTMLElement>("[data-nav-tail]");

    if (reduced()) {
      gsap.set(el, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set([...links, ...tail], { yPercent: 0, opacity: 1 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: ease.out } });
    tl.fromTo(
      el,
      { clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55 },
    )
      .fromTo(
        links,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.65, stagger: 0.06 },
        0.15,
      )
      .fromTo(
        tail,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 },
        0.35,
      );

    return () => {
      tl.kill();
    };
  }, [open]);

  return (
    <>
      <button
        ref={openBtn}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-verdigris md:hidden"
      >
        <Menu size={22} />
      </button>

      {open &&
        createPortal(
        <div
          id="mobile-menu"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 flex flex-col bg-ink text-paper md:hidden"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-graphite px-6">
            <span className="font-meta text-meta uppercase text-zinc">
              Menu
            </span>
            <button
              ref={closeBtn}
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center text-paper transition-colors hover:text-verdigris-light"
            >
              <X size={22} />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="flex flex-1 flex-col justify-center px-6"
          >
            <ul>
              {siteConfig.nav.map((item, i) => (
                <li
                  key={item.href}
                  className="border-b border-graphite last:border-0"
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-5 py-5"
                  >
                    <span className="font-meta text-meta-sm uppercase text-zinc">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="block overflow-hidden pb-[0.06em]">
                      <span
                        data-nav-line
                        className="block font-title text-d3 font-medium text-paper"
                      >
                        {item.label}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              data-nav-tail
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-10 inline-flex items-center justify-center gap-2 bg-verdigris px-6 py-4 font-meta text-meta uppercase text-paper"
            >
              Start a project
              <span aria-hidden="true">→</span>
            </Link>
          </nav>

          {/* Title block, not a link farm */}
          <div
            data-nav-tail
            className="shrink-0 border-t border-graphite px-6 py-6"
          >
            <p className="font-meta text-meta-sm uppercase text-zinc">Direct</p>
            <div className="mt-3 flex flex-col gap-1">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="font-meta text-meta uppercase text-paper"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-meta text-meta-sm text-concrete"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>,
          document.body,
        )}
    </>
  );
}
