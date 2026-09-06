"use client";

import { useRef } from "react";
import { Wifi, WifiOff, FileArchive } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { recovery } from "@/content/site";
import { StateChip } from "@/components/demo/download-row";
import { SplitHeading } from "@/components/motion/split-heading";

const TOTAL = recovery.file.totalGb;

/**
 * The signature scene (docs/04 §2.1): a pinned, scrubbed timeline where a 12 GB
 * download survives a network drop and resumes from 8.4 GB, not from zero.
 * Reduced motion: a static three-frame storyboard (CSS motion-reduce variants).
 */
export function RecoveryStory() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { desktop } = ctx.conditions as { desktop: boolean };
          const bytes = { gb: 7.4 };
          const counter = q("[data-bytes]")[0];
          const setCounter = () => {
            if (!counter) return;
            const shown = bytes.gb >= TOTAL ? `${TOTAL}` : bytes.gb.toFixed(1);
            counter.textContent = `${shown} GB of ${TOTAL} GB`;
          };
          setCounter();

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: desktop ? "+=250%" : "+=180%",
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });

          // Beat 1: downloading normally.
          tl.to(bytes, { gb: 8.4, duration: 3, onUpdate: setCounter }, 0);
          tl.to(q("[data-bar]"), { scaleX: 8.4 / TOTAL, duration: 3 }, 0);

          // Beat 2: the network dies.
          tl.to(q("[data-wifi-on]"), { opacity: 0, duration: 0.4, ease: "power2.inOut" }, 3);
          tl.to(q("[data-wifi-off]"), { opacity: 1, duration: 0.4, ease: "power2.inOut" }, 3);
          tl.to(q("[data-speed-live]"), { opacity: 0, duration: 0.4 }, 3);
          tl.to(q("[data-speed-zero]"), { opacity: 1, duration: 0.4 }, 3);
          tl.to(q("[data-chip-downloading]"), { opacity: 0, duration: 0.3 }, 3);
          tl.to(q("[data-chip-interrupted]"), { opacity: 1, duration: 0.3 }, 3.2);

          // Beat 3: what a browser would do, ghosting past.
          tl.fromTo(
            q("[data-ghost]"),
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            3.7,
          );
          tl.to(q("[data-ghost]"), { opacity: 0, y: -18, duration: 0.6, ease: "power2.in" }, 5.1);

          // Beat 4: Hemta recovers.
          tl.to(q("[data-chip-interrupted]"), { opacity: 0, duration: 0.3 }, 5.2);
          tl.to(q("[data-chip-recovering]"), { opacity: 1, duration: 0.3 }, 5.4);
          tl.to(q("[data-wifi-off]"), { opacity: 0, duration: 0.4, ease: "power2.inOut" }, 6.1);
          tl.to(q("[data-wifi-on]"), { opacity: 1, duration: 0.4, ease: "power2.inOut" }, 6.1);
          tl.to(q("[data-chip-recovering]"), { opacity: 0, duration: 0.3 }, 6.4);
          tl.to(q("[data-chip-downloading]"), { opacity: 1, duration: 0.3 }, 6.6);
          tl.to(q("[data-speed-zero]"), { opacity: 0, duration: 0.4 }, 6.6);
          tl.to(q("[data-speed-live]"), { opacity: 1, duration: 0.4 }, 6.6);

          // Beat 5: finish from 8.4, not from zero.
          tl.to(bytes, { gb: TOTAL, duration: 3.4, onUpdate: setCounter }, 6.9);
          tl.to(q("[data-bar]"), { scaleX: 1, duration: 3.4 }, 6.9);
          tl.to(q("[data-chip-downloading]"), { opacity: 0, duration: 0.3 }, 10.2);
          tl.to(q("[data-chip-completed]"), { opacity: 1, duration: 0.3 }, 10.4);
          tl.to(q("[data-bar]"), { backgroundColor: "#1d9a4e", duration: 0.5, ease: "power2.inOut" }, 10.2);
          tl.to(q("[data-speed-live]"), { opacity: 0, duration: 0.3 }, 10.2);
          tl.fromTo(
            q("[data-closer]"),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            10.6,
          );
        },
      );
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="how" aria-labelledby="recovery-heading" className="bg-background">
      {/* Animated scene (hidden under reduced motion) */}
      <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-16 motion-reduce:hidden md:px-6">
        <div className="mx-auto w-full max-w-3xl text-center">
          <SplitHeading
            id="recovery-heading"
            className="text-3xl font-semibold tracking-[-0.02em] text-balance md:text-5xl"
          >
            {recovery.heading}
          </SplitHeading>
          <p className="mx-auto mt-4 max-w-[52ch] text-base text-muted-foreground md:text-lg">
            {recovery.sub}
          </p>
        </div>

        <div className="relative mx-auto mt-12 w-full max-w-2xl">
          <div
            aria-hidden
            className="absolute inset-x-10 top-1/2 -bottom-6 rounded-full bg-primary/20 blur-[80px]"
          />
          <div className="relative rounded-[1.75rem] bg-foreground/[0.045] p-2 ring-1 ring-foreground/[0.06]">
          <div className="rounded-[1.25rem] border border-window-border bg-window p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <FileArchive aria-hidden strokeWidth={1.75} className="size-5 shrink-0 text-window-muted" />
                <p className="truncate text-sm font-medium text-window-text">
                  {recovery.file.name}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="relative inline-flex size-5 items-center justify-center">
                  <Wifi
                    aria-hidden
                    data-wifi-on
                    strokeWidth={1.75}
                    className="absolute size-5 text-window-muted"
                  />
                  <WifiOff
                    aria-hidden
                    data-wifi-off
                    strokeWidth={1.75}
                    className="absolute size-5 text-wait opacity-0"
                  />
                </span>
                <span className="relative inline-flex h-6 w-24 items-center justify-end">
                  <span className="absolute" data-chip-downloading>
                    <StateChip state="downloading" />
                  </span>
                  <span className="absolute opacity-0" data-chip-interrupted>
                    <StateChip state="interrupted" />
                  </span>
                  <span className="absolute opacity-0" data-chip-recovering>
                    <StateChip state="recovering" />
                  </span>
                  <span className="absolute opacity-0" data-chip-completed>
                    <StateChip state="completed" />
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                data-bar
                className="h-full origin-left rounded-full bg-primary"
                style={{ transform: `scaleX(${7.4 / TOTAL})` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between font-mono text-xs tabular-nums text-window-muted">
              <span data-bytes>7.4 GB of {TOTAL} GB</span>
              <span className="relative inline-flex h-4 w-20 items-center justify-end">
                <span data-speed-live className="absolute">
                  38.4 MB/s
                </span>
                <span data-speed-zero className="absolute text-wait opacity-0">
                  0 MB/s
                </span>
              </span>
            </div>
          </div>
          </div>

          {/* The browser's version of this story */}
          <div
            data-ghost
            aria-hidden
            className="pointer-events-none absolute inset-x-8 -bottom-20 rounded-xl border border-border bg-card p-4 opacity-0 shadow-window md:inset-x-16"
          >
            <p className="text-sm font-semibold text-fail">{recovery.ghostCard.title}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{recovery.ghostCard.sub}</p>
          </div>
        </div>

        <p
          data-closer
          className="mt-24 max-w-[40ch] text-center text-xl font-medium tracking-[-0.01em] opacity-0 md:text-2xl"
        >
          {recovery.closer}
        </p>
      </div>

      {/* Reduced-motion storyboard */}
      <div className="hidden px-4 py-24 motion-reduce:block md:px-6 md:py-32">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-balance md:text-5xl">
            {recovery.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-base text-muted-foreground md:text-lg">
            {recovery.sub}
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-3xl gap-4">
          {(
            [
              { state: "interrupted", scale: 8.4 / TOTAL, bytes: `8.4 GB of ${TOTAL} GB`, caption: "The network drops at 8.4 GB. The download holds its progress." },
              { state: "recovering", scale: 8.4 / TOTAL, bytes: `8.4 GB of ${TOTAL} GB`, caption: "Hemta reconnects and picks the transfer back up." },
              { state: "completed", scale: 1, bytes: `${TOTAL} GB of ${TOTAL} GB`, caption: recovery.closer },
            ] as const
          ).map((frame) => (
            <div
              key={frame.state}
              className="rounded-xl border border-window-border bg-window p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="truncate text-sm font-medium text-window-text">
                  {recovery.file.name}
                </p>
                <StateChip state={frame.state} />
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full origin-left rounded-full ${frame.state === "completed" ? "bg-done" : "bg-primary"}`}
                  style={{ transform: `scaleX(${frame.scale})` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="font-mono text-xs tabular-nums text-window-muted">
                  {frame.bytes}
                </span>
                <span className="text-xs text-window-muted">{frame.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
