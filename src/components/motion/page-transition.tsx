"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";

/**
 * Page transition. Clicking an internal link darkens the screen under a near
 * black sheet; the next page then loads and rises into place from below as a
 * light card, slightly inset, while the sheet drains away behind it. Back and
 * forward, hash links and reduced motion navigate as normal.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const overlay = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const failsafe = useRef<number | undefined>(undefined);
  const reveal = useRef<() => void>(() => {});

  useEffect(() => {
    const el = overlay.current;
    if (!el) return;

    reveal.current = () => {
      window.clearTimeout(failsafe.current);
      const main = document.querySelector("main");
      // The sheet drops behind the page so the card lifts off the dark.
      gsap.set(el, { zIndex: 5 });
      if (main) {
        gsap.fromTo(
          main,
          { y: 90, scale: 0.985, transformOrigin: "50% 0%" },
          {
            y: 0,
            scale: 1,
            duration: 1,
            ease: "expo.out",
            clearProps: "transform",
            onComplete: () => ScrollTrigger.refresh(),
          },
        );
      }
      gsap.to(el, {
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(el, { display: "none", zIndex: 100 });
          busy.current = false;
        },
      });
    };

    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        busy.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.matchMedia("(max-width: 1023px), (pointer: coarse)").matches
      ) {
        return;
      }
      const a = (e.target as Element | null)?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (
        !href ||
        !href.startsWith("/") ||
        href.startsWith("//") ||
        (a.target && a.target !== "_self") ||
        a.hasAttribute("download")
      ) {
        return;
      }
      const url = new URL(href, window.location.href);
      if (url.pathname === window.location.pathname) return;

      e.preventDefault();
      busy.current = true;

      gsap.set(el, { display: "block", opacity: 0, zIndex: 100 });
      gsap.to(el, {
        opacity: 0.92,
        duration: 0.55,
        ease: "power2.inOut",
        onComplete: () => {
          router.push(url.pathname + url.search + url.hash);
          // If the next page is slow, do not leave the screen dark.
          failsafe.current = window.setTimeout(() => reveal.current(), 6000);
        },
      });
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(failsafe.current);
    };
  }, [router]);

  // The next page has mounted: lift it into place.
  useEffect(() => {
    if (busy.current) reveal.current();
  }, [pathname]);

  return (
    <div
      ref={overlay}
      aria-hidden="true"
      style={{ display: "none" }}
      className="pointer-events-none fixed inset-0 bg-void"
    />
  );
}
