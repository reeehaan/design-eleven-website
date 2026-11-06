"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";

/**
 * Page transition (laptops and desktops with a mouse; phones navigate
 * instantly). The page is run through an SVG displacement filter, the way a
 * liquid-slider portfolio ripples one slide into the next: clicking a link
 * makes the current page warp and melt away, the route changes while it is
 * dissolved, and the new page forms out of the same ripple and settles flat.
 * Back and forward, hash links and reduced motion navigate as normal.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const map = useRef<SVGFEDisplacementMapElement>(null);
  const noise = useRef<SVGFETurbulenceElement>(null);
  const busy = useRef(false);
  const failsafe = useRef<number | undefined>(undefined);
  const reveal = useRef<() => void>(() => {});

  useEffect(() => {
    const dm = map.current;
    const tb = noise.current;
    if (!dm || !tb) return;

    const MAX = 160;
    const state = { s: 0, f: 0.004 };
    const apply = () => {
      dm.setAttribute("scale", String(state.s));
      tb.setAttribute("baseFrequency", `${state.f} ${state.f * 1.7}`);
    };
    // The page body and the footer move together; the navbar stays put.
    const target = () =>
      Array.from(document.querySelectorAll<HTMLElement>("main, body > footer"));
    const off = () => {
      target().forEach((t) => {
        t.style.filter = "";
        t.style.willChange = "";
      });
      busy.current = false;
      ScrollTrigger.refresh();
    };

    reveal.current = () => {
      window.clearTimeout(failsafe.current);
      const t = target();
      t.forEach((e) => {
        e.style.filter = "url(#liquid)";
        e.style.willChange = "filter, opacity";
      });
      gsap.set(t, { opacity: 0 });
      state.s = MAX;
      state.f = 0.012;
      apply();
      gsap
        .timeline({ onComplete: off })
        .to(t, { opacity: 1, duration: 0.7, ease: "power2.out" }, 0)
        .to(
          state,
          {
            s: 0,
            f: 0.004,
            duration: 1.1,
            ease: "power3.out",
            onUpdate: apply,
          },
          0,
        );
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
      const t = target();
      t.forEach((e) => {
        e.style.filter = "url(#liquid)";
        e.style.willChange = "filter, opacity";
      });
      state.s = 0;
      state.f = 0.004;
      apply();
      gsap
        .timeline({
          onComplete: () => {
            router.push(url.pathname + url.search + url.hash);
            // If the next page is slow, do not leave the screen blank.
            failsafe.current = window.setTimeout(() => reveal.current(), 6000);
          },
        })
        .to(
          state,
          {
            s: MAX,
            f: 0.012,
            duration: 0.75,
            ease: "power2.in",
            onUpdate: apply,
          },
          0,
        )
        .to(t, { opacity: 0, duration: 0.55, ease: "power2.in" }, 0.2);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(failsafe.current);
      off();
    };
  }, [router]);

  // The next page has mounted: let it ripple into place.
  useEffect(() => {
    if (busy.current) reveal.current();
  }, [pathname]);

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      className="pointer-events-none absolute"
    >
      <filter
        id="liquid"
        x="-5%"
        y="-5%"
        width="110%"
        height="110%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          ref={noise}
          type="fractalNoise"
          baseFrequency="0.004 0.007"
          numOctaves="2"
          seed="7"
          result="noise"
        />
        <feDisplacementMap
          ref={map}
          in="SourceGraphic"
          in2="noise"
          scale="0"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
