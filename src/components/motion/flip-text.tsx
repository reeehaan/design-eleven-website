"use client";

import { useRef } from "react";
import { gsap, reduced } from "@/lib/motion/gsap";

/**
 * A highlighted phrase whose letters flip over one after another when the
 * pointer moves onto it. Touch and reduced motion get the plain phrase.
 */
export function FlipText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const flip = () => {
    if (reduced() || !ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll("[data-letter]"),
      { rotationX: 0 },
      {
        rotationX: 360,
        duration: 0.7,
        ease: "power3.inOut",
        stagger: 0.03,
        overwrite: true,
      },
    );
  };

  return (
    <span
      ref={ref}
      onPointerEnter={(e) => e.pointerType === "mouse" && flip()}
      className={className}
      aria-label={children}
    >
      {children.split(" ").map((word, w, all) => (
        <span key={w} aria-hidden="true">
          {/* Words never break mid-way, only between them. */}
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((ch, i) => (
              <span
                key={i}
                data-letter
                className="inline-block [transform-style:preserve-3d] [perspective:400px]"
              >
                {ch}
              </span>
            ))}
          </span>
          {w < all.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
