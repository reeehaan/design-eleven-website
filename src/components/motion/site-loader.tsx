"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsap";
import { siteConfig } from "@/lib/site";

const SEEN = "de-loaded";
const MIN_MS = 1400;
const MAX_MS = 7000;

/** Fired when the loader starts lifting, so the page can begin its own intro. */
export const LOADER_DONE = "site-loader-done";

/**
 * First-visit loading screen. The studio name rises letter by letter out of a
 * mask at display size while a large figure counts the real loading (images,
 * fonts). When everything is in, the letters carry on upward and the sheet
 * peels away from the bottom, and the page's own intro starts underneath it,
 * so the name seems to hand over to the headline. Once per session; never
 * waits past seven seconds; hidden without JavaScript.
 */
export function SiteLoader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN) === "1";
    } catch {}
    if (seen) {
      el.remove();
      window.dispatchEvent(new Event(LOADER_DONE));
      return;
    }

    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const letters = Array.from(el.querySelectorAll<HTMLElement>("[data-ch]"));
    const num = el.querySelector<HTMLElement>("[data-num]");
    const bar = el.querySelector<HTMLElement>("[data-bar]");
    const meta = el.querySelectorAll<HTMLElement>("[data-meta]");

    if (!reduce) {
      gsap.set(letters, { yPercent: 115 });
      gsap.set(meta, { opacity: 0, y: 10 });
      gsap.to(letters, {
        yPercent: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.055,
        delay: 0.1,
      });
      gsap.to(meta, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        delay: 0.5,
      });
    }

    const shown = { v: 0 };
    const paint = () => {
      if (num) num.textContent = String(Math.round(shown.v)).padStart(3, "0");
      if (bar) bar.style.transform = `scaleX(${shown.v / 100})`;
    };

    const start = performance.now();
    let target = 0;
    let finished = false;

    // Lazy images below the fold load on demand, so only the ones that load
    // up front count towards "ready".
    const imgs = Array.from(document.images).filter(
      (i) => i.loading !== "lazy",
    );
    const imgDone = () => imgs.filter((i) => i.complete).length;
    let fontsOk = !document.fonts;
    document.fonts?.ready
      .then(() => (fontsOk = true))
      .catch(() => (fontsOk = true));

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearInterval(timer);
      gsap.to(shown, {
        v: 100,
        duration: 0.35,
        ease: "power1.out",
        onUpdate: paint,
      });

      const tl = gsap.timeline({
        delay: 0.4,
        onComplete: () => {
          html.style.overflow = prevOverflow;
          try {
            sessionStorage.setItem(SEEN, "1");
          } catch {}
          el.remove();
          window.dispatchEvent(new Event("resize"));
        },
      });
      tl.to(meta, { opacity: 0, duration: 0.3 }, 0)
        .to(
          letters,
          { yPercent: -115, duration: 0.8, ease: "expo.in", stagger: 0.03 },
          0.1,
        )
        .add(() => {
          // The page's intro starts under the sheet as it peels away.
          window.dispatchEvent(new Event(LOADER_DONE));
        }, 0.55)
        .to(
          el,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1,
            ease: "power4.inOut",
          },
          0.6,
        );
    };

    const measure = () => {
      const imgPart = imgs.length ? imgDone() / imgs.length : 1;
      const loaded = document.readyState === "complete";
      target = Math.min(
        100,
        Math.round(imgPart * 70 + (fontsOk ? 20 : 0) + (loaded ? 10 : 0)),
      );
      const waited = performance.now() - start;
      const ready = loaded && fontsOk && imgPart >= 1;
      if ((ready && waited >= MIN_MS) || waited >= MAX_MS) finish();
    };

    const tick = () => {
      measure();
      gsap.to(shown, {
        v: target,
        duration: 0.6,
        ease: "power1.out",
        onUpdate: paint,
      });
    };
    const timer = window.setInterval(tick, 150);
    tick();

    return () => {
      window.clearInterval(timer);
      html.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div
      ref={root}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      className="site-loader fixed inset-0 z-200 flex flex-col justify-between bg-paper px-3 pb-3 pt-5 text-ink"
    >
      <div
        data-meta
        className="flex justify-between font-sans text-base font-semibold text-graphite"
      >
        <span>Architecture, costing, construction</span>
        <span>{siteConfig.contact.address.city}, Sri Lanka</span>
      </div>

      <h1
        aria-hidden="true"
        className="whitespace-nowrap font-sans text-[15.5vw] font-semibold leading-[0.9] tracking-[-0.06em]"
      >
        {siteConfig.name.split(" ").map((word, w) => (
          <span
            key={w}
            className="mr-[0.22em] inline-block overflow-clip pb-[0.28em] align-top"
          >
            {word.split("").map((ch, i) => (
              <span key={i} data-ch className="inline-block">
                {ch}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <div>
        <div className="flex items-end justify-between pb-3">
          <span
            data-meta
            className="font-sans text-base font-semibold text-graphite"
          >
            Loading the studio
          </span>
          <span
            data-num
            className="font-sans text-[clamp(3rem,9vw,7rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums"
          >
            000
          </span>
        </div>
        <span className="relative block h-px w-full bg-concrete">
          <span
            data-bar
            className="absolute inset-0 origin-left bg-ink"
            style={{ transform: "scaleX(0)" }}
          />
        </span>
      </div>

      <noscript>
        <style>{`.site-loader{display:none!important}`}</style>
      </noscript>
    </div>
  );
}
