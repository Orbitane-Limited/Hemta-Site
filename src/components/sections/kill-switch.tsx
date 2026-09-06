"use client";

import { useRef, useState } from "react";
import { Wifi, WifiOff, FileArchive } from "lucide-react";
import { cn } from "cn";
import { gsap, useGSAP, NO_PREF } from "@/lib/gsap";
import { killSwitch } from "@/content/site";
import { StateChip, type DownloadState } from "@/components/demo/download-row";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { Wash } from "@/components/brand/wash";

const SPEEDS = ["38.2 MB/s", "41.5 MB/s", "39.8 MB/s", "42.3 MB/s"];

/**
 * The interactive proof: a live demo download the VISITOR can interrupt.
 * Wi-Fi off: Interrupted -> Recovering (retry loop). Wi-Fi on: resumes from
 * the same progress. All motion is user-initiated feedback; under reduced
 * motion the progress holds still and states flip instantly.
 */
export function KillSwitch() {
  const ref = useRef<HTMLElement>(null);
  const [wifi, setWifi] = useState(true);
  const [state, setState] = useState<DownloadState>("downloading");
  const tween = useRef<gsap.core.Tween | null>(null);
  const recoverTimer = useRef<gsap.core.Tween | null>(null);
  const speedIdx = useRef(0);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const bar = el.querySelector("[data-ks-bar]");
      const speedEl = el.querySelector("[data-ks-speed]");
      const mm = gsap.matchMedia();

      mm.add(NO_PREF, () => {
        // Continuous crawl; completes, rests, restarts (a demo, not a claim).
        tween.current = gsap.fromTo(
          bar,
          { scaleX: 0.34 },
          { scaleX: 1, duration: 90, ease: "none", repeat: -1, repeatDelay: 2 },
        );
        const tick = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
        tick.to(speedEl, {
          opacity: 0.4,
          duration: 0.15,
          onComplete: () => {
            if (speedEl && tween.current && !tween.current.paused()) {
              speedEl.textContent = SPEEDS[++speedIdx.current % SPEEDS.length];
            }
          },
        });
        tick.to(speedEl, { opacity: 1, duration: 0.15 });
      });
    },
    { scope: ref },
  );

  const toggle = () => {
    const next = !wifi;
    setWifi(next);
    recoverTimer.current?.kill();
    if (!next) {
      tween.current?.pause();
      setState("interrupted");
      // Hemta immediately starts trying again.
      recoverTimer.current = gsap.delayedCall(0.9, () => setState("recovering"));
    } else {
      setState("downloading");
      tween.current?.resume();
    }
  };

  return (
    <section
      ref={ref}
      aria-labelledby="ks-heading"
      className="relative overflow-hidden py-24 md:py-36"
    >
      <Wash className="top-1/4 -right-56 h-[26rem] w-[34rem]" />
      <div className="relative mx-auto max-w-3xl px-4 md:px-6">
        <SplitHeading
          id="ks-heading"
          className="text-3xl font-semibold tracking-[-0.02em] text-balance md:text-5xl"
        >
          {killSwitch.heading}
        </SplitHeading>
        <Reveal>
          <p className="mt-4 max-w-[56ch] text-base text-muted-foreground md:text-lg">
            {killSwitch.sub}
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="rounded-[1.75rem] bg-foreground/[0.045] p-2 ring-1 ring-foreground/[0.06]">
            <div className="rounded-[1.25rem] border border-window-border bg-window p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <FileArchive aria-hidden strokeWidth={1.75} className="size-5 shrink-0 text-window-muted" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-window-text">
                      {killSwitch.file.name}
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] tabular-nums text-window-muted">
                      {killSwitch.file.size}
                    </p>
                  </div>
                </div>
                <StateChip state={state} />
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  data-ks-bar
                  className={cn(
                    "h-full origin-left rounded-full transition-colors duration-300",
                    wifi ? "bg-primary" : "bg-wait",
                  )}
                  style={{ transform: "scaleX(0.34)" }}
                />
              </div>

              <div className="mt-5 flex items-center justify-between gap-4">
                <span className="font-mono text-xs tabular-nums text-window-muted">
                  {wifi ? <span data-ks-speed>38.2 MB/s</span> : <span className="text-wait">0 MB/s · retrying</span>}
                </span>

                {/* The switch */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={wifi}
                  aria-label={`${killSwitch.toggleLabel} ${wifi ? "on" : "off"}`}
                  onClick={toggle}
                  className="flex items-center gap-3 rounded-full border border-window-border bg-window-surface py-2 pr-2 pl-4 transition-colors duration-300 hover:border-white/25 focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none"
                >
                  <span className="flex items-center gap-2 text-xs font-medium text-window-text">
                    {wifi ? (
                      <Wifi aria-hidden strokeWidth={1.75} className="size-4" />
                    ) : (
                      <WifiOff aria-hidden strokeWidth={1.75} className="size-4 text-wait" />
                    )}
                    {killSwitch.toggleLabel}
                  </span>
                  <span
                    className={cn(
                      "relative h-6 w-10 rounded-full transition-colors duration-300 ease-[var(--ease-fluid)]",
                      wifi ? "bg-done" : "bg-white/15",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-sm transition-transform duration-300 ease-[var(--ease-fluid)]",
                        wifi && "translate-x-4",
                      )}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-faint">{killSwitch.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
