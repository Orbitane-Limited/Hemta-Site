"use client";

import { useRef } from "react";
import {
  Folder,
  Package,
  FileVideo,
  FileArchive,
  FileText,
  File,
  type LucideIcon,
} from "lucide-react";
import { gsap, useGSAP, ScrollTrigger, NO_PREF } from "@/lib/gsap";
import { categories } from "@/content/site";
import { StateChip } from "@/components/demo/download-row";
import { AppWindow } from "@/components/demo/app-window";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { Wash } from "@/components/brand/wash";

type DemoFile = { name: string; size: string; icon: LucideIcon; folder: number };

// Two concurrent lanes (a real download manager runs several at once).
// folder = index into categories.tiles: 0 Apps, 1 Video, 2 Archives, 3 Documents, 4 Other.
const LANES: DemoFile[][] = [
  [
    { name: "Pixelmator-Pro.dmg", size: "2.1 GB", icon: Package, folder: 0 },
    { name: "Client-Assets.zip", size: "940 MB", icon: FileArchive, folder: 2 },
    { name: "Firmware-Update.bin", size: "312 MB", icon: File, folder: 4 },
    { name: "Sketch-Library.dmg", size: "1.4 GB", icon: Package, folder: 0 },
  ],
  [
    { name: "Drone-B-Roll.mp4", size: "6.4 GB", icon: FileVideo, folder: 1 },
    { name: "Q3-Contract.pdf", size: "18 MB", icon: FileText, folder: 3 },
    { name: "Interview-Cut-02.mp4", size: "3.8 GB", icon: FileVideo, folder: 1 },
    { name: "Research-Notes.pdf", size: "9 MB", icon: FileText, folder: 3 },
  ],
];

const LANE_SPEED = [1.5, 1.85]; // seconds per download fill; offset keeps lanes drifting

/**
 * "Sorted before you look", demonstrated as a living Finder window
 * (purpose: explanation, rare tier): two downloads run concurrently; each
 * completed file arcs into its folder in the directory tree, the folder
 * flashes, the newest file slides into its slot, the count badge ticks and
 * a "+1" floats off it. Connector rails draw themselves on first view.
 * Reduced motion: a static, pre-populated tree.
 */
export function Categories() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const stage = el.querySelector<HTMLElement>("[data-stage]");
      if (!stage) return;
      const q = (sel: string) => el.querySelectorAll<HTMLElement>(sel);
      const one = (sel: string) => el.querySelector<HTMLElement>(sel);

      const folderRows = q("[data-folder-row]");
      const folderIcons = q("[data-folder-icon]");
      const badges = q("[data-badge]");
      const plusOnes = q("[data-plus-one]");
      const slots = q("[data-slot]");
      const slotNames = q("[data-slot-name]");
      const slotIcons = q("[data-slot-icons]");
      const rail = one("[data-rail]");
      const ticks = q("[data-tick]");

      const counts = Array.from(badges).map((b) => parseInt(b.textContent ?? "0", 10));
      const tileColors = categories.tiles.map((t) => t.color);
      const mm = gsap.matchMedia();

      mm.add(NO_PREF, () => {
        let active = false;
        const running = [false, false];
        const idx = [0, 0];

        // Markup defaults to the static completed state (reduced motion);
        // under animation, reset the lanes to "about to download".
        gsap.set(q("[data-lane-bar='0'], [data-lane-bar='1']"), { scaleX: 0 });
        gsap.set(q("[data-lane-chip-done='0'], [data-lane-chip-done='1']"), { opacity: 0 });
        gsap.set(q("[data-lane-chip-down='0'], [data-lane-chip-down='1']"), { opacity: 1 });

        // Intro: rails draw, rows settle in.
        gsap.set(rail, { scaleY: 0, transformOrigin: "top" });
        gsap.set(ticks, { scaleX: 0, transformOrigin: "left" });
        const intro = gsap.timeline({
          scrollTrigger: { trigger: stage, start: "top 75%", once: true },
        });
        intro.from(q("[data-tree-row]"), {
          opacity: 0,
          y: 10,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.05,
        });
        intro.to(rail, { scaleY: 1, duration: 0.5, ease: "power2.inOut" }, 0.1);
        intro.to(ticks, { scaleX: 1, duration: 0.3, ease: "power2.out", stagger: 0.06 }, 0.3);

        const runLane = (lane: number) => {
          if (!active) {
            running[lane] = false;
            return;
          }
          running[lane] = true;
          const files = LANES[lane];
          const file = files[idx[lane] % files.length];
          idx[lane] += 1;
          const f = file.folder;

          const nameEl = one(`[data-lane-name="${lane}"]`);
          const sizeEl = one(`[data-lane-size="${lane}"]`);
          const bar = one(`[data-lane-bar="${lane}"]`);
          const chipDown = one(`[data-lane-chip-down="${lane}"]`);
          const chipDone = one(`[data-lane-chip-done="${lane}"]`);
          const laneIcons = q(`[data-lane-icon="${lane}"]`);
          const flyer = one(`[data-flyer="${lane}"]`);
          const flyIcons = q(`[data-fly-icon="${lane}"]`);
          if (!bar || !flyer) return;

          if (nameEl) nameEl.textContent = file.name;
          if (sizeEl) sizeEl.textContent = file.size;
          const fileIdx = files.indexOf(file);
          laneIcons.forEach((icon, j) => gsap.set(icon, { display: j === fileIdx ? "flex" : "none" }));
          flyIcons.forEach((icon, j) => gsap.set(icon, { display: j === fileIdx ? "flex" : "none" }));
          gsap.set(bar, { scaleX: 0, backgroundColor: "#2144DF" });
          gsap.set(chipDone, { opacity: 0 });
          gsap.set(chipDown, { opacity: 1 });

          const stageRect = stage.getBoundingClientRect();
          const fromRect = laneIcons[fileIdx].getBoundingClientRect();
          const toRect = folderIcons[f].getBoundingClientRect();
          const fx = fromRect.left - stageRect.left;
          const fy = fromRect.top - stageRect.top;
          const tx = toRect.left - stageRect.left + (toRect.width - fromRect.width) / 2;
          const ty = toRect.top - stageRect.top + (toRect.height - fromRect.height) / 2;

          const tl = gsap.timeline({ onComplete: () => runLane(lane) });
          tl.to(bar, { scaleX: 1, duration: LANE_SPEED[lane], ease: "none" });
          tl.to(chipDown, { opacity: 0, duration: 0.25, ease: "power2.out" }, ">-0.05");
          tl.to(chipDone, { opacity: 1, duration: 0.25, ease: "power2.out" }, "<");
          tl.to(bar, { backgroundColor: "#1d9a4e", duration: 0.3, ease: "power2.inOut" }, "<");
          tl.set(flyer, { x: fx, y: fy, scale: 0.9, opacity: 0 }, "<");
          tl.to(flyer, { opacity: 1, scale: 1, duration: 0.18, ease: "power2.out" });
          tl.to(flyer, {
            motionPath: {
              path: [
                { x: fx, y: fy },
                { x: (fx + tx) / 2 + (lane === 0 ? -24 : 24), y: Math.min(fy, ty) - (lane === 0 ? 44 : 64) },
                { x: tx, y: ty },
              ],
              curviness: 1.2,
            },
            scale: 0.7,
            duration: 0.75,
            ease: "power2.inOut",
          });
          tl.to(flyer, { opacity: 0, scale: 0.5, duration: 0.16, ease: "power2.in" }, ">-0.12");
          // Landing: flash, slot fill, badge tick, +1 float.
          tl.add(() => {
            counts[f] += 1;
            if (badges[f]) badges[f].textContent = String(counts[f]);
            if (slotNames[f]) slotNames[f].textContent = file.name;
            const icons = slotIcons[f]?.querySelectorAll<HTMLElement>("[data-slot-icon]");
            icons?.forEach((icon) => {
              gsap.set(icon, { display: icon.dataset.slotIcon === file.name ? "flex" : "none" });
            });
          }, "<");
          tl.fromTo(
            folderRows[f],
            { backgroundColor: `color-mix(in oklab, ${tileColors[f]} 22%, transparent)` },
            { backgroundColor: "rgba(0,0,0,0)", duration: 0.7, ease: "power2.out" },
            "<",
          );
          tl.fromTo(
            slots[f],
            { opacity: 0, y: -6 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
            "<",
          );
          tl.fromTo(
            plusOnes[f],
            { opacity: 1, y: 0 },
            { opacity: 0, y: -14, duration: 0.7, ease: "power2.out" },
            "<",
          );
          tl.to({}, { duration: 0.5 });
        };

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 70%",
          end: "bottom 15%",
          onToggle: (self) => {
            active = self.isActive;
            if (active) {
              if (!running[0]) gsap.delayedCall(0.8, () => active && !running[0] && runLane(0));
              if (!running[1]) gsap.delayedCall(1.9, () => active && !running[1] && runLane(1));
            }
          },
        });
        return () => st.kill();
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      aria-labelledby="categories-heading"
      className="relative overflow-hidden py-24 md:py-36"
    >
      <Wash className="-top-20 -right-48 h-[26rem] w-[38rem]" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-2xl">
          <SplitHeading
            id="categories-heading"
            className="text-3xl font-semibold tracking-[-0.02em] text-balance md:text-5xl"
          >
            {categories.heading}
          </SplitHeading>
          <Reveal>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">{categories.sub}</p>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-12 max-w-2xl">
          <div className="rounded-[1.75rem] bg-foreground/[0.045] p-2 ring-1 ring-foreground/[0.06]">
            <div data-stage aria-hidden className="relative">
              <AppWindow title="Downloads" className="rounded-[1.25rem] shadow-none">
                {/* Two concurrent download lanes */}
                <div className="border-b border-window-border">
                  {LANES.map((files, lane) => (
                    <div key={lane} className="border-b border-window-border px-4 py-3 last:border-b-0">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          {files.map((file, i) => {
                            const Icon = file.icon;
                            return (
                              <span
                                key={file.name}
                                data-lane-icon={lane}
                                className="size-8 shrink-0 items-center justify-center rounded-lg bg-white/10"
                                style={{ display: i === 0 ? "flex" : "none" }}
                              >
                                <Icon strokeWidth={1.75} className="size-4 text-window-text" />
                              </span>
                            );
                          })}
                          <div className="min-w-0">
                            <p
                              data-lane-name={lane}
                              className="truncate text-[12.5px] font-medium text-window-text"
                            >
                              {files[0].name}
                            </p>
                            <p
                              data-lane-size={lane}
                              className="font-mono text-[10.5px] tabular-nums text-window-muted"
                            >
                              {files[0].size}
                            </p>
                          </div>
                        </div>
                        <span className="relative inline-flex h-6 w-24 items-center justify-end">
                          <span data-lane-chip-down={lane} className="absolute opacity-0">
                            <StateChip state="downloading" />
                          </span>
                          <span data-lane-chip-done={lane} className="absolute">
                            <StateChip state="completed" />
                          </span>
                        </span>
                      </div>
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                        <div
                          data-lane-bar={lane}
                          className="h-full origin-left rounded-full bg-primary"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* The tree */}
                <div className="relative px-4 py-4 md:px-5">
                  <div data-tree-row className="flex items-center gap-2.5 px-2 py-1.5">
                    <Folder
                      strokeWidth={1.5}
                      className="size-4.5 text-window-muted"
                      fill="currentColor"
                      fillOpacity={0.25}
                    />
                    <span className="font-mono text-[12px] text-window-text">~/Downloads</span>
                  </div>

                  <div className="relative ml-[1.35rem]">
                    {/* Vertical rail */}
                    <span
                      data-rail
                      className="absolute top-0 bottom-[2.4rem] left-0 w-px bg-window-border"
                    />
                    {categories.tiles.map((tile, i) => (
                      <div key={tile.name} data-tree-row className="relative pl-5">
                        {/* Horizontal tick */}
                        <span
                          data-tick
                          className="absolute top-[1.15rem] left-0 h-px w-4 bg-window-border"
                        />
                        <div
                          data-folder-row
                          className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5"
                        >
                          <span className="flex min-w-0 items-center gap-2.5">
                            <span data-folder-icon className="flex size-6 items-center justify-center">
                              <Folder
                                strokeWidth={1.5}
                                className="size-4.5"
                                style={{ color: tile.color }}
                                fill="currentColor"
                                fillOpacity={0.85}
                              />
                            </span>
                            <span className="truncate text-[13px] font-medium text-window-text">
                              {tile.name}
                            </span>
                          </span>
                          <span className="relative">
                            <span
                              data-badge
                              className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10.5px] tabular-nums text-window-muted"
                            >
                              {parseInt(tile.count, 10)}
                            </span>
                            <span
                              data-plus-one
                              className="absolute -top-1 right-0 font-mono text-[10.5px] font-medium text-done opacity-0"
                            >
                              +1
                            </span>
                          </span>
                        </div>
                        {/* Newest-file slot (height always reserved; no layout shift) */}
                        <div
                          data-slot
                          className="flex h-7 items-center gap-2 pl-[2.35rem] opacity-0"
                        >
                          <span data-slot-icons className="flex items-center">
                            {LANES.flat()
                              .filter((f) => f.folder === i)
                              .map((f) => {
                                const Icon = f.icon;
                                return (
                                  <span key={f.name} data-slot-icon={f.name} className="hidden">
                                    <Icon
                                      strokeWidth={1.75}
                                      className="size-3.5 text-window-muted"
                                    />
                                  </span>
                                );
                              })}
                          </span>
                          <span
                            data-slot-name
                            className="truncate font-mono text-[11px] text-window-muted"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AppWindow>

              {/* Flyers, one per lane */}
              {[0, 1].map((lane) => (
                <span
                  key={lane}
                  data-flyer={lane}
                  className="pointer-events-none absolute top-0 left-0 z-10 size-8 rounded-lg border border-window-border bg-window opacity-0 shadow-window"
                >
                  {LANES[lane].map((file, i) => {
                    const Icon = file.icon;
                    return (
                      <span
                        key={file.name}
                        data-fly-icon={lane}
                        className="size-full items-center justify-center"
                        style={{ display: i === 0 ? "flex" : "none" }}
                      >
                        <Icon strokeWidth={1.75} className="size-4 text-window-text" />
                      </span>
                    );
                  })}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-faint">{categories.caption}</p>
        </Reveal>
      </div>
    </section>
  );
}
