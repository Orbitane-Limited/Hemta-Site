"use client";

import { useRef } from "react";
import { gsap, useGSAP, NO_PREF } from "@/lib/gsap";

/**
 * The brand gimmick: the page behaves like a download. A cobalt progress bar
 * tracks scroll with a live mono percentage, exactly like a transfer.
 * Justified motion: it IS the product metaphor. Reduced motion: hidden.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const bar = el.querySelector("[data-bar]");
      const label = el.querySelector("[data-label]");
      const mm = gsap.matchMedia();

      mm.add(NO_PREF, () => {
        gsap.set(el, { autoAlpha: 1 });
        gsap.to(bar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: "max",
            scrub: 0.3,
            onUpdate: (self) => {
              if (label) label.textContent = `${Math.round(self.progress * 100)}%`;
            },
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden className="invisible">
      <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent">
        <div data-bar className="h-full origin-left scale-x-0 bg-primary" />
      </div>
      <span
        data-label
        className="fixed top-1.5 right-2 z-50 font-mono text-[10px] font-medium tabular-nums text-faint select-none"
      >
        0%
      </span>
    </div>
  );
}
