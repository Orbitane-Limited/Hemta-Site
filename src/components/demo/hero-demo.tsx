"use client";

import { useRef } from "react";
import { gsap, useGSAP, NO_PREF } from "@/lib/gsap";
import { heroDemo } from "@/content/site";
import { AppWindow } from "./app-window";
import { DownloadRow } from "./download-row";

const SPEEDS = ["41.7 MB/s", "39.2 MB/s", "43.5 MB/s", "40.8 MB/s", "42.1 MB/s"];

/**
 * The hero's live app window: the active download visibly progresses and its
 * speed ticks (justified perpetual motion: it communicates live state, docs/04 §1).
 * Reduced motion: fully static.
 */
export function HeroDemo() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(NO_PREF, () => {
        const active = el.querySelector('[data-row="downloading"]');
        if (!active) return;
        const bar = active.querySelector("[data-progress]");
        const speedEl = active.querySelector("[data-speed]");
        const segments = active.querySelectorAll("[data-segment]");

        // Main progress crawls forward for the whole visit; slow enough to feel real.
        gsap.to(bar, { scaleX: 0.96, duration: 120, ease: "none" });

        // Segments fill at organically different rates.
        segments.forEach((seg, i) => {
          gsap.to(seg, { scaleX: 1, duration: 40 + i * 14, ease: "none" });
        });

        // Speed readout ticks through plausible values.
        let i = 0;
        const tick = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });
        tick.to(speedEl, {
          opacity: 0.4,
          duration: 0.15,
          onComplete: () => {
            if (speedEl) speedEl.textContent = SPEEDS[++i % SPEEDS.length];
          },
        });
        tick.to(speedEl, { opacity: 1, duration: 0.15 });

        // Window entrance: one gentle rise after the headline paints.
        gsap.from(el, { opacity: 0, y: 24, duration: 0.8, ease: "power3.out", delay: 0.15 });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <AppWindow title={heroDemo.windowTitle}>
        {heroDemo.rows.map((row) => (
          <DownloadRow
            key={row.id}
            name={row.name}
            size={row.size}
            state={row.state}
            progress={row.progress}
            speed={"speed" in row ? row.speed : undefined}
            segments={"segments" in row ? row.segments : undefined}
          />
        ))}
      </AppWindow>
    </div>
  );
}
