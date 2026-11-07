"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsap";

const SEEN = "de-loaded";
const MAX_MS = 7000;

/** Fired when the loader starts lifting, so the page can begin its own intro. */
export const LOADER_DONE = "site-loader-done";

/**
 * First-visit loading screen, told as a short scene. DESIGN types itself in
 * letter by letter. A "1" flies in and hits it; a second "1" flies in and hits
 * the first, and the shove kicks DESIGN out to the left, leaving "1 1". Those
 * two figures zoom towards the viewer until the screen is black, then the black
 * lifts to reveal the page, whose own intro starts underneath. The scene plays
 * while the real loading (images, fonts) happens; the zoom waits for both.
 * Once per session; never waits past seven seconds; hidden without JavaScript.
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
    const q = <T extends HTMLElement>(sel: string) => el.querySelector<T>(sel);
    const stage = q("[data-stage]")!;
    const word = q("[data-word]")!;
    const one1 = q("[data-one='1']")!;
    const one2 = q("[data-one='2']")!;
    const letters = Array.from(el.querySelectorAll<HTMLElement>("[data-ch]"));

    let sceneDone = false;
    let finished = false;
    let killed = false;
    let readyDone = false;
    let outro: gsap.core.Timeline | null = null;
    let scene: gsap.core.Timeline | null = null;
    const start = performance.now();

    // ── Real readiness: lazy images load on demand, so only eager ones count.
    const imgs = Array.from(document.images).filter(
      (i) => i.loading !== "lazy",
    );
    let fontsOk = !document.fonts;
    document.fonts?.ready
      .then(() => (fontsOk = true))
      .catch(() => (fontsOk = true));

    const leave = () => {
      html.style.overflow = prevOverflow;
      try {
        sessionStorage.setItem(SEEN, "1");
      } catch {}
      el.remove();
      window.dispatchEvent(new Event("resize"));
    };

    const finish = () => {
      if (finished || killed) return;
      finished = true;
      window.clearInterval(timer);
      scene?.progress(1);

      if (reduce) {
        gsap.to(el, {
          opacity: 0,
          duration: 0.4,
          onStart: () => window.dispatchEvent(new Event(LOADER_DONE)),
          onComplete: leave,
        });
        return;
      }

      // The two figures zoom at the viewer; the screen goes black; it lifts.
      outro = gsap
        .timeline({ onComplete: leave })
        .to(
          stage,
          { scale: 46, duration: 1.5, ease: "power3.in", force3D: true },
          0,
        )
        .to(
          el,
          { backgroundColor: "#121110", duration: 1, ease: "power2.in" },
          0.35,
        )
        .add(() => window.dispatchEvent(new Event(LOADER_DONE)), 1.5)
        .to(el, { opacity: 0, duration: 1, ease: "power2.inOut" }, 1.5);
    };

    const measure = () => {
      const imgPart = imgs.length
        ? imgs.filter((i) => i.complete).length / imgs.length
        : 1;
      const loaded = document.readyState === "complete";
      readyDone = loaded && fontsOk && imgPart >= 1;
      const waited = performance.now() - start;
      if ((readyDone && sceneDone) || waited >= MAX_MS) finish();
    };
    const timer = window.setInterval(measure, 150);

    // ── The scene. Built once fonts are in, so the widths are the real ones.
    const build = () => {
      if (killed) return;
      const vw = window.innerWidth;
      const W = word.getBoundingClientRect().width;
      const w1 = one1.getBoundingClientRect().width;
      const gap = w1 * 0.14;
      const shake = (amp: number) =>
        gsap
          .timeline()
          .to(stage, { x: -amp, y: amp * 0.4, duration: 0.04 })
          .to(stage, { x: amp * 0.8, y: -amp * 0.3, duration: 0.05 })
          .to(stage, { x: -amp * 0.5, duration: 0.05 })
          .to(stage, { x: 0, y: 0, duration: 0.18, ease: "power2.out" });

      gsap.set(word, { x: 0 });
      gsap.set([one1, one2], { x: vw / 2 + w1 * 2, opacity: 1 });
      gsap.set(letters, { opacity: 0, yPercent: 40, scaleY: 1.3 });

      const pw = -W * 0.06; // where the first hit shoves the word
      const c1 = pw + W / 2 + w1 / 2; // first "1" resting against the word
      const half = (w1 + gap) / 2;

      scene = gsap
        .timeline({ delay: 0.1, onComplete: () => (sceneDone = true) })
        // DESIGN appears letter by letter
        .to(
          letters,
          {
            opacity: 1,
            yPercent: 0,
            scaleY: 1,
            duration: 0.45,
            ease: "power3.out",
            stagger: 0.13,
          },
          0.15,
        )
        // first "1" flies in and hits it
        .to(one1, { x: W / 2 + w1 / 2, duration: 0.5, ease: "power3.in" }, 1.5)
        .add(() => shake(18), 2.0)
        .to(
          word,
          {
            x: pw,
            skewX: -9,
            scaleX: 0.93,
            duration: 0.14,
            ease: "power4.out",
          },
          2.0,
        )
        .to(
          word,
          { skewX: 0, scaleX: 1, duration: 0.5, ease: "elastic.out(1,0.4)" },
          2.14,
        )
        .to(one1, { x: c1, duration: 0.14, ease: "power4.out" }, 2.0)
        // second "1" hits the first and the shove kicks DESIGN out
        .to(one2, { x: c1 + w1, duration: 0.5, ease: "power3.in" }, 2.9)
        .add(() => shake(14), 3.4)
        // DESIGN is pushed off to the left at a constant speed, no friction
        .to(word, { x: -(vw / 2 + W), duration: 0.45, ease: "none" }, 3.4)
        .to(one1, { x: -half, duration: 0.5, ease: "sine.out" }, 3.4)
        .to(one2, { x: half, duration: 0.5, ease: "sine.out" }, 3.4)
        .add(() => (sceneDone = true), 4.1);
      measure();
    };

    if (reduce) {
      gsap.set(word, { display: "none" });
      const w1 = one1.getBoundingClientRect().width;
      const half = (w1 + w1 * 0.14) / 2;
      gsap.set(one1, { x: -half, opacity: 1 });
      gsap.set(one2, { x: half, opacity: 1 });
      sceneDone = true;
      measure();
    } else {
      const ready = Promise.race([
        document.fonts?.ready ?? Promise.resolve(),
        new Promise((r) => setTimeout(r, 1500)),
      ]);
      ready.then(build, build);
    }

    return () => {
      killed = true;
      window.clearInterval(timer);
      scene?.kill();
      outro?.kill();
      html.style.overflow = prevOverflow;
    };
  }, []);

  const figure =
    "absolute inset-0 m-auto block h-fit w-fit whitespace-nowrap font-sans text-[min(16vw,26vh)] font-semibold leading-none tracking-[-0.06em]";

  return (
    <div
      ref={root}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      suppressHydrationWarning
      className="site-loader fixed inset-0 z-200 overflow-clip bg-paper px-3 pb-3 pt-5 text-ink"
    >
      <div
        data-stage
        aria-hidden="true"
        className="absolute inset-0 will-change-transform"
      >
        <span data-word className={`${figure}`}>
          {"DESIGN".split("").map((ch, i) => (
            <span
              key={i}
              data-ch
              className="inline-block"
              style={{ opacity: 0 }}
            >
              {ch}
            </span>
          ))}
        </span>
        <span data-one="1" className={figure} style={{ opacity: 0 }}>
          1
        </span>
        <span data-one="2" className={figure} style={{ opacity: 0 }}>
          1
        </span>
      </div>

      {/* Runs while the page is still being parsed, before first paint: on a
          refresh within the session the loader is hidden before it can flash. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem("${SEEN}")==="1"){document.currentScript.parentElement.style.display="none"}}catch(e){}`,
        }}
      />
      <noscript>
        <style>{`.site-loader{display:none!important}`}</style>
      </noscript>
    </div>
  );
}
