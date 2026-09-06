import {
  ListOrdered,
  Gauge,
  FolderOpen,
  Search,
  ScanSearch,
  CalendarClock,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { StateChip } from "@/components/demo/download-row";
import { features } from "@/content/site";

const ICONS: Record<string, LucideIcon> = {
  Queue: ListOrdered,
  "Bandwidth control": Gauge,
  Categories: FolderOpen,
  "Search & history": Search,
  Inspector: ScanSearch,
  Scheduling: CalendarClock,
};

function CellHeading({ title, body }: { title: string; body: string }) {
  const Icon = ICONS[title];
  return (
    <div>
      <div className="flex items-center gap-2.5">
        {Icon ? (
          <Icon aria-hidden strokeWidth={1.75} className="size-5 text-primary" />
        ) : null}
        <h3 className="text-lg font-medium tracking-[-0.01em]">{title}</h3>
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

/**
 * Six features, six cells (docs/02 §3.7): 2+1 / 1+1+1 / full-width strip.
 * Queue and bandwidth cells carry real visual previews, not text-on-white.
 */
export function FeatureBento() {
  const [queue, bandwidth, categories, search, inspector, scheduling] = features.items;

  return (
    <section id="features" aria-labelledby="features-heading" className="scroll-mt-16 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SplitHeading
          id="features-heading"
          className="text-3xl font-semibold tracking-[-0.02em] text-balance md:text-5xl"
        >
          {features.heading}
        </SplitHeading>

        <Reveal stagger className="mt-12 grid gap-4 md:grid-cols-3">
          {/* Queue: large cell with a mini live-list preview */}
          <div className="rounded-2xl border border-border bg-card p-6 transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-fluid)] hover:-translate-y-1 hover:border-foreground/15 hover:shadow-float md:col-span-2">
            <CellHeading title={queue.title} body={queue.body} />
            <div aria-hidden className="mt-5 overflow-hidden rounded-lg border border-window-border bg-window">
              {[
                { name: "4K-Drone-Footage-Master.mp4", state: "downloading" as const, w: "62%" },
                { name: "Logic-Sample-Library.pkg", state: "queued" as const, w: "0%" },
                { name: "Keynote-Assets-Q3.zip", state: "completed" as const, w: "100%" },
              ].map((row) => (
                <div
                  key={row.name}
                  className="flex items-center justify-between gap-4 border-b border-window-border px-4 py-2.5 last:border-b-0"
                >
                  <span className="truncate text-xs font-medium text-window-text">{row.name}</span>
                  <span className="flex shrink-0 items-center gap-3">
                    <span className="hidden h-1 w-20 overflow-hidden rounded-full bg-white/10 sm:block">
                      <span
                        className={`block h-full rounded-full ${row.state === "completed" ? "bg-done" : "bg-primary"}`}
                        style={{ width: row.w }}
                      />
                    </span>
                    <StateChip state={row.state} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bandwidth: tinted cell with a cap readout */}
          <div className="rounded-2xl border border-border bg-accent p-6 transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-fluid)] hover:-translate-y-1 hover:border-primary/25 hover:shadow-float">
            <CellHeading title={bandwidth.title} body={bandwidth.body} />
            <div aria-hidden className="mt-5 rounded-lg border border-border bg-card p-4">
              <div className="flex items-baseline justify-between font-mono text-xs tabular-nums">
                <span className="text-muted-foreground">Cap</span>
                <span className="font-medium text-foreground">4.0 MB/s</span>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-muted">
                <div className="relative h-full w-[40%] rounded-full bg-primary">
                  <span className="absolute -right-1.5 -top-[3px] size-3 rounded-full border-2 border-card bg-primary" />
                </div>
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] tabular-nums text-faint">
                <span>0</span>
                <span>10 MB/s</span>
              </div>
            </div>
          </div>

          {[categories, search, inspector].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-6 transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-fluid)] hover:-translate-y-1 hover:border-foreground/15 hover:shadow-float">
              <CellHeading title={item.title} body={item.body} />
            </div>
          ))}

          {/* Scheduling: full-width strip */}
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-fluid)] hover:-translate-y-1 hover:border-foreground/15 hover:shadow-float md:col-span-3 md:flex-row md:items-center md:justify-between">
            <CellHeading title={scheduling.title} body={scheduling.body} />
            <div aria-hidden className="flex items-center gap-3 rounded-lg border border-border bg-muted px-4 py-3 font-mono text-xs tabular-nums text-muted-foreground">
              <CalendarClock strokeWidth={1.75} className="size-4 text-primary" />
              <span>Starts 02:00</span>
              <span className="text-faint">3 queued</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
