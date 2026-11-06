"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, useGSAP, fontsReady } from "@/lib/motion/gsap";
import { animateText } from "@/lib/motion/text-anim";
import { LOADER_DONE } from "@/components/motion/site-loader";

/** Anything inside these keeps its own animation (or none at all). */
const SKIP =
  "[data-fx],[data-no-fx],[data-fade],[data-rise],[data-lead],[data-text],[data-line],[data-word],[data-ch],[data-meta],[data-slide],.site-loader,header,footer,nav,form,button,summary,details,[role=dialog]";

/**
 * One text animation for the whole site, the one the services page uses:
 * headings lift line by line out of a mask, and paragraphs, lists and quotes
 * rise and fade in once as they reach the screen. It runs over every page's
 * content after it mounts, leaving alone anything that already animates
 * itself (marked with data-fx or data-no-fx) and anything with no motion
 * budget (forms, nav, footer). Content is visible by default; this only
 * animates *from* a hidden state once script and motion are available.
 */
export function TextFx() {
  const pathname = usePathname();
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const undo: Array<() => void> = [];
        let cancelled = false;

        const run = () => {
          if (cancelled) return;
          const main = document.querySelector("main");
          if (!main) return;

          const free = (el: Element) => !el.closest(SKIP);

          const marked = (el: HTMLElement) => {
            el.setAttribute("data-tfx", "");
          };

          main.querySelectorAll<HTMLElement>("h1, h2, h3").forEach((el) => {
            if (!free(el)) return;
            marked(el);
            undo.push(animateText(el, { kind: "title" }));
          });

          main
            .querySelectorAll<HTMLElement>(
              "p, ul, ol, dl, blockquote, figcaption",
            )
            .forEach((el) => {
              if (
                !free(el) ||
                // Only the outermost block: a list animates as one.
                el.parentElement?.closest("p, ul, ol, dl, blockquote") ||
                !el.textContent!.trim()
              ) {
                return;
              }
              marked(el);
              undo.push(animateText(el, { kind: "body" }));
            });
        };

        // Wait for fonts (line splitting measures them) and for the loading
        // screen, if there is one, so nothing plays behind it.
        let started = false;
        let timer = 0;
        const start = () => {
          if (started) return;
          started = true;
          // Never touch the DOM while React is still hydrating it: wait for the
          // page to finish loading, then a beat more. (Splitting early made
          // hydration fail with a text mismatch.)
          const afterLoad = () =>
            window.setTimeout(() => fontsReady().then(run), 600);
          if (document.readyState === "complete")
            timer = window.setTimeout(() => fontsReady().then(run), 250);
          else
            window.addEventListener("load", () => (timer = afterLoad()), {
              once: true,
            });
        };
        if (document.querySelector(".site-loader")) {
          window.addEventListener(LOADER_DONE, start, { once: true });
        } else {
          start();
        }

        return () => {
          cancelled = true;
          window.clearTimeout(timer);
          window.removeEventListener(LOADER_DONE, start);
          undo.forEach((u) => u());
          document.querySelectorAll("[data-tfx]").forEach((e) => {
            e.removeAttribute("data-tfx");
            gsap.set(e, { clearProps: "transform,opacity" });
          });
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [pathname], revertOnUpdate: true },
  );

  return <span ref={ref} hidden />;
}
