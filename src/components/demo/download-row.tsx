import { cn } from "cn";
import { FileVideo, Package, FileArchive, type LucideIcon } from "lucide-react";

export type DownloadState = "downloading" | "queued" | "completed" | "interrupted" | "recovering";

const ICONS: Record<string, LucideIcon> = {
  mp4: FileVideo,
  pkg: Package,
  zip: FileArchive,
};

// Chip colors are the product's real lifecycle states (docs/03 §2.4), tuned for the dark window surface.
const CHIP: Record<DownloadState, { label: string; className: string }> = {
  downloading: { label: "Downloading", className: "bg-primary/25 text-[#A7B6FF]" },
  queued: { label: "Queued", className: "bg-white/10 text-window-muted" },
  completed: { label: "Completed", className: "bg-done/20 text-[#5BD48E]" },
  interrupted: { label: "Interrupted", className: "bg-wait/20 text-[#F0A94B]" },
  recovering: { label: "Recovering", className: "bg-wait/20 text-[#F0A94B]" },
};

export function StateChip({ state, className }: { state: DownloadState; className?: string }) {
  const chip = CHIP[state];
  return (
    <span
      data-chip
      className={cn(
        "rounded-full px-2 py-0.5 text-[11px] font-medium whitespace-nowrap",
        chip.className,
        className,
      )}
    >
      {chip.label}
    </span>
  );
}

/**
 * One download inside a demo window. Purely presentational; GSAP scenes drive
 * the [data-*] hooks (progress bar scaleX, speed text). Demo values, not claims.
 */
export function DownloadRow({
  name,
  size,
  state,
  progress,
  speed,
  segments,
}: {
  name: string;
  size: string;
  state: DownloadState;
  progress: number;
  speed?: string;
  segments?: number;
}) {
  const ext = name.split(".").pop() ?? "zip";
  const Icon = ICONS[ext] ?? FileArchive;
  const active = state === "downloading" || state === "recovering";

  return (
    <div data-row={state} className="border-b border-window-border px-4 py-3 last:border-b-0">
      <div className="flex items-center gap-3">
        <Icon aria-hidden strokeWidth={1.75} className="size-5 shrink-0 text-window-muted" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-[13px] font-medium text-window-text">{name}</p>
            <StateChip state={state} />
          </div>
          <div className="mt-1 flex items-center justify-between gap-3 font-mono text-[11px] tabular-nums text-window-muted">
            <span>{size}</span>
            {speed ? <span data-speed>{speed}</span> : null}
          </div>
        </div>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
        <div
          data-progress
          className={cn("h-full origin-left rounded-full", active || state === "queued" ? "bg-primary" : "bg-done")}
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      {segments ? (
        <div data-segments className="mt-2 grid grid-cols-5 gap-1">
          {Array.from({ length: segments }).map((_, i) => (
            <div key={i} className="h-0.5 overflow-hidden rounded-full bg-white/10">
              <div
                data-segment
                className="h-full origin-left rounded-full bg-primary/70"
                style={{ transform: `scaleX(${0.35 + i * 0.12})` }}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
