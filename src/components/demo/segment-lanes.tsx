"use client";

import { useRef } from "react";
import { RotateCcw } from "lucide-react";
import { gsap, useGSAP, NO_PREF, REDUCED } from "@/lib/gsap";
import { speed } from "@/content/site";

const LANES = 5;

/**
 * Speed section visualization (docs/04 §2.2): one file splits into five lanes
 * that fill in parallel and merge; a single-connection lane crawls alongside.
 * Plays once on enter; replayable. Reduced motion: final state rendered.
 */
export function SegmentLanes() {
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const lanes = el.querySelectorAll("[data-lane]");
      const merged = el.querySelector("[data-merged]");
      const done = el.querySelector("[data-done]");
      const single = el.querySelector("[data-single]");
      const counter = el.querySelector("[data-counter]");
      const mm = gsap.matchMedia();

      mm.add(NO_PREF, () => {
        const timeline = gsap.timeline({
          paused: true,
          scrollTrigger: { trigger: el, start: "top 70%", once: true },
        });

        lanes.forEach((lane, i) => {
          timeline.to(
            lane,
            { scaleX: 1, duration: 2.2 + i * 0.3, ease: "power1.inOut" },
            0.2,
          );
        });
        timeline.to(merged, { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, ">-0.2");
        timeline.to(done, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "<");

        const progress = { value: 0 };
        timeline.to(
          progress,
          {
            value: 100,
            duration: 11,
            ease: "none",
            onUpdate: () => {
              if (counter) counter.textContent = `${Math.round(progress.value)}%`;
            },
          },
          0.2,
        );
        timeline.to(single, { scaleX: 1, duration: 11, ease: "none" }, 0.2);

        tl.current = timeline;
      });

      mm.add(REDUCED, () => {
        gsap.set([...lanes, merged, single], { scaleX: 1 });
        gsap.set(done, { opacity: 1, y: 0 });
        if (counter) counter.textContent = "100%";
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="rounded-[1.25rem] border border-border bg-card p-6 md:p-8"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {speed.laneLabel}
        </span>
        <span
          data-done
          className="translate-y-1 rounded-full bg-done/10 px-2 py-0.5 text-[11px] font-medium text-done opacity-0"
        >
          Completed
        </span>
      </div>
      <div className="mt-3 space-y-1.5" aria-hidden>
        {Array.from({ length: LANES }).map((_, i) => (
          <div key={i} className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              data-lane
              className="h-full origin-left scale-x-0 rounded-full bg-primary"
            />
          </div>
        ))}
        <div className="pt-2">
          <div className="h-2.5 overflow-hidden rounded-full bg-muted">
            <div
              data-merged
              className="h-full origin-left scale-x-0 rounded-full bg-primary"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-baseline justify-between gap-4">
        <span className="font-mono text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {speed.compareLabel}
        </span>
        <span data-counter className="font-mono text-xs tabular-nums text-faint">
          0%
        </span>
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted" aria-hidden>
        <div
          data-single
          className="h-full origin-left scale-x-0 rounded-full bg-faint"
        />
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="max-w-[52ch] text-sm text-faint">{speed.honesty}</p>
        <button
          type="button"
          aria-label="Replay animation"
          onClick={() => tl.current?.play(0)}
          className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none active:translate-y-px"
        >
          <RotateCcw aria-hidden strokeWidth={1.75} className="size-4" />
        </button>
      </div>
    </div>
  );
}
