"use client";

import { useRef, useState } from "react";
import { Globe, FileArchive } from "lucide-react";
import { cn } from "cn";
import { gsap, useGSAP, ScrollTrigger, NO_PREF } from "@/lib/gsap";
import { StateChip } from "@/components/demo/download-row";

const STREAMS = 5;
const BASE_DURATION = 24; // seconds per download at 1 connection (demo-compressed)
const BASE_SPEED = 8.4; // MB/s per connection (demo values, not claims)
const FILE = { name: "Studio-Sample-Pack.zip", size: "8.2 GB" };

const fmtEta = (seconds: number) => {
  const s = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

/**
 * Segmented acceleration you can FEEL (purpose: explanation + feedback):
 * a download runs continuously; the visitor sets the number of connections
 * (1-5) mid-flight. More connections = more live streams, a multiplied
 * speed readout, a collapsing ETA, and a visibly faster fill. The one
 * control IS the comparison. Reduced motion: static state, readouts still
 * respond to the control.
 */
export function AccelerationScene() {
  const ref = useRef<HTMLDivElement>(null);
  const api = useRef<{ setN: (n: number) => void } | null>(null);
  const [n, setNState] = useState(1);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const one = (s: string) => el.querySelector<HTMLElement>(s);
      const server = one("[data-server]");
      const paths = el.querySelectorAll<SVGPathElement>("[data-stream]");
      const packets = el.querySelectorAll<SVGCircleElement>("[data-packet]");
      const fill = one("[data-fill]");
      const seams = one("[data-seams]");
      const card = one("[data-card]");
      const speedEl = one("[data-speed]");
      const etaEl = one("[data-eta]");
      const pctEl = one("[data-pct]");
      const chipDown = one("[data-acc-down]");
      const chipDone = one("[data-acc-done]");
      const btn5 = one('[data-conn="5"]');
      if (!server || !fill || !card) return;

      const layoutStreams = () => {
        const box = el.getBoundingClientRect();
        const s = server.getBoundingClientRect();
        const sx = s.left - box.left + s.width / 2;
        const sy = s.top - box.top + s.height;
        const cols = el.querySelectorAll<HTMLElement>("[data-anchor]");
        paths.forEach((path, i) => {
          const c = cols[i].getBoundingClientRect();
          const tx = c.left - box.left + c.width / 2;
          const ty = c.top - box.top;
          path.setAttribute("d", `M ${sx} ${sy} C ${sx} ${sy + 44}, ${tx} ${ty - 44}, ${tx} ${ty}`);
        });
      };

      const mm = gsap.matchMedia();

      mm.add(NO_PREF, () => {
        let active = false;
        let currentN = 1;
        let mainTween: gsap.core.Tween | null = null;
        let packetTweens: gsap.core.Tween[] = [];
        let dashTweens: gsap.core.Tween[] = [];
        let restartCall: gsap.core.Tween | null = null;
        const progress = { p: 0 };

        const updateReadouts = () => {
          if (pctEl) pctEl.textContent = `${Math.round(progress.p)}%`;
          if (etaEl)
            etaEl.textContent = fmtEta(((100 - progress.p) / 100) * (BASE_DURATION / currentN));
        };

        const applyStreams = () => {
          paths.forEach((path, i) => {
            const on = i < currentN;
            gsap.to(path, { opacity: on ? 0.45 : 0.07, duration: 0.35, ease: "power2.out" });
          });
          packetTweens.forEach((t, idx) => {
            const stream = Math.floor(idx / 2);
            if (stream < currentN) t.play();
            else {
              t.pause();
              gsap.set(packets[idx], { opacity: 0 });
            }
          });
        };

        const buildStreamMotion = () => {
          packetTweens.forEach((t) => t.kill());
          dashTweens.forEach((t) => t.kill());
          packetTweens = [];
          dashTweens = [];
          paths.forEach((path, i) => {
            dashTweens.push(
              gsap.to(path, { strokeDashoffset: -160, duration: 2, ease: "none", repeat: -1 }),
            );
            [0, 1].forEach((j) => {
              const packet = packets[i * 2 + j];
              const t = gsap.fromTo(
                packet,
                { opacity: 0 },
                {
                  opacity: 1,
                  duration: 0.85,
                  ease: "none",
                  repeat: -1,
                  delay: i * 0.13 + j * 0.42,
                  motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
                  paused: true,
                  onRepeat: () => gsap.set(packet, { opacity: 1 }),
                },
              );
              packetTweens.push(t);
            });
          });
        };

        const startCycle = () => {
          if (!active) return;
          layoutStreams();
          buildStreamMotion();
          progress.p = 0;
          gsap.set(fill, { scaleY: 0 });
          gsap.set(seams, { opacity: 1 });
          gsap.set(chipDone, { opacity: 0 });
          gsap.set(chipDown, { opacity: 1 });
          if (speedEl) speedEl.textContent = `${(BASE_SPEED * currentN).toFixed(1)} MB/s`;
          applyStreams();

          mainTween = gsap.fromTo(
            fill,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: BASE_DURATION,
              ease: "none",
              onUpdate: function () {
                progress.p = this.progress() * 100;
                updateReadouts();
              },
              onComplete: completeCycle,
            },
          );
          mainTween.timeScale(currentN);
        };

        const completeCycle = () => {
          packetTweens.forEach((t) => t.pause());
          gsap.set(packets, { opacity: 0 });
          gsap.to(paths, { opacity: 0.1, duration: 0.5, ease: "power2.out" });
          gsap.to(seams, { opacity: 0, duration: 0.4, ease: "power2.inOut", delay: 0.1 });
          gsap.to(card, {
            keyframes: [{ scale: 1.015, duration: 0.16 }, { scale: 1, duration: 0.34 }],
            ease: "power2.out",
          });
          gsap.to(chipDown, { opacity: 0, duration: 0.25, ease: "power2.out" });
          gsap.to(chipDone, { opacity: 1, duration: 0.25, ease: "power2.out" });
          if (etaEl) etaEl.textContent = "0:00";
          restartCall = gsap.delayedCall(1.8, startCycle);
        };

        api.current = {
          setN: (k) => {
            currentN = k;
            if (speedEl) speedEl.textContent = `${(BASE_SPEED * k).toFixed(1)} MB/s`;
            mainTween?.timeScale(k);
            applyStreams();
            updateReadouts();
          },
        };

        // One gentle nudge toward the "5" button for visitors who don't poke controls.
        const hint = gsap.delayedCall(2.6, () => {
          if (btn5)
            gsap.fromTo(
              btn5,
              { scale: 1 },
              { scale: 1.12, duration: 0.22, ease: "power2.out", yoyo: true, repeat: 3 },
            );
        });

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 75%",
          end: "bottom 15%",
          onToggle: (self) => {
            active = self.isActive;
            if (active) {
              if (mainTween && mainTween.progress() < 1) {
                mainTween.play();
                applyStreams();
                dashTweens.forEach((t) => t.play());
              } else {
                startCycle();
              }
            } else {
              mainTween?.pause();
              restartCall?.kill();
              packetTweens.forEach((t) => t.pause());
              dashTweens.forEach((t) => t.pause());
            }
          },
        });

        return () => {
          st.kill();
          hint.kill();
          restartCall?.kill();
          mainTween?.kill();
          packetTweens.forEach((t) => t.kill());
          dashTweens.forEach((t) => t.kill());
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        layoutStreams();
        gsap.set(fill, { scaleY: 0.62 });
        gsap.set(seams, { opacity: 1 });
        if (pctEl) pctEl.textContent = "62%";
        let currentN = 1;
        const paint = () => {
          paths.forEach((path, i) => gsap.set(path, { opacity: i < currentN ? 0.35 : 0.07 }));
          if (speedEl) speedEl.textContent = `${(BASE_SPEED * currentN).toFixed(1)} MB/s`;
          if (etaEl) etaEl.textContent = fmtEta(0.38 * (BASE_DURATION / currentN));
        };
        paint();
        api.current = {
          setN: (k) => {
            currentN = k;
            paint();
          },
        };
      });
    },
    { scope: ref },
  );

  const pick = (k: number) => {
    setNState(k);
    api.current?.setN(k);
  };

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[1.25rem] border border-window-border bg-window p-6 md:p-8"
    >
      {/* Server */}
      <div aria-hidden className="flex justify-center">
        <span
          data-server
          className="inline-flex items-center gap-2 rounded-full border border-window-border bg-window-surface px-3.5 py-1.5"
        >
          <Globe strokeWidth={1.75} className="size-3.5 text-window-muted" />
          <span className="font-mono text-[11px] text-window-muted">cdn.example.com</span>
        </span>
      </div>

      {/* Streams */}
      <svg aria-hidden data-streams className="pointer-events-none absolute inset-0 h-full w-full">
        {Array.from({ length: STREAMS }).map((_, i) => (
          <path
            key={i}
            data-stream
            fill="none"
            stroke="#2144DF"
            strokeWidth="1.5"
            strokeDasharray="5 9"
            opacity={i === 0 ? 0.45 : 0.07}
          />
        ))}
        {Array.from({ length: STREAMS * 2 }).map((_, i) => (
          <circle key={i} data-packet r="2.5" fill="#5B7BFA" opacity="0" />
        ))}
      </svg>

      {/* The file */}
      <div
        aria-hidden
        data-card
        className="relative mt-24 rounded-xl border border-window-border bg-window-surface p-4 md:mt-28 md:p-5"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <FileArchive strokeWidth={1.75} className="size-4.5 shrink-0 text-window-muted" />
            <p className="truncate text-[13px] font-medium text-window-text">{FILE.name}</p>
          </div>
          <span className="relative inline-flex h-6 w-24 items-center justify-end">
            <span data-acc-down className="absolute">
              <StateChip state="downloading" />
            </span>
            <span data-acc-done className="absolute opacity-0">
              <StateChip state="completed" />
            </span>
          </span>
        </div>

        {/* Live readouts: the numbers are where the difference is felt */}
        <div className="mt-4 flex items-baseline justify-between font-mono tabular-nums">
          <span data-speed className="text-xl font-medium text-window-text md:text-2xl">
            8.4 MB/s
          </span>
          <span className="text-xs text-window-muted">
            ETA <span data-eta>{fmtEta(BASE_DURATION)}</span>
          </span>
        </div>

        <div className="relative mt-3 grid h-16 grid-cols-5 overflow-hidden rounded-lg bg-white/[0.06] md:h-20">
          {/* Anchors for the stream endpoints (one per column) */}
          {Array.from({ length: STREAMS }).map((_, i) => (
            <div key={i} data-anchor />
          ))}
          <div data-fill className="absolute inset-0 origin-bottom scale-y-0 bg-primary/75" />
          {/* Seams show how many ranges the file is split into */}
          <div data-seams className="absolute inset-0">
            {Array.from({ length: STREAMS - 1 }).map((_, i) => (
              <span
                key={i}
                className="absolute inset-y-0 w-px bg-window transition-opacity duration-300"
                style={{ left: `${((i + 1) / STREAMS) * 100}%`, opacity: i < n - 1 ? 1 : 0 }}
              />
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between font-mono text-xs tabular-nums text-window-muted">
          <span>{FILE.size}</span>
          <span data-pct>0%</span>
        </div>
      </div>

      {/* The control: this is the whole point */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <div
          role="group"
          aria-label="Number of connections"
          className="flex items-center gap-1 rounded-full border border-window-border bg-window-surface p-1"
        >
          {[1, 2, 3, 4, 5].map((k) => (
            <button
              key={k}
              type="button"
              data-conn={k}
              aria-pressed={n === k}
              onClick={() => pick(k)}
              className={cn(
                "size-9 rounded-full font-mono text-sm tabular-nums transition-colors duration-300 ease-[var(--ease-fluid)] focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none active:scale-[0.96]",
                n === k
                  ? "bg-primary font-semibold text-white"
                  : "text-window-muted hover:bg-white/10 hover:text-window-text",
              )}
            >
              {k}
            </button>
          ))}
        </div>
        <p className="text-xs text-window-muted">
          Connections. Change it mid-download.
        </p>
      </div>
    </div>
  );
}
