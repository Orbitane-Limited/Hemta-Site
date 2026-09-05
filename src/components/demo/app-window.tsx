import type { ReactNode } from "react";
import { cn } from "cn";

/**
 * macOS window chrome for the live demo previews (docs/05 §4).
 * Dark imagery on the light page; swaps for real screenshots when the app UI ships.
 */
export function AppWindow({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-window-border bg-window shadow-window",
        className,
      )}
    >
      <div className="flex h-10 items-center gap-2 border-b border-window-border bg-window-surface px-4">
        <span aria-hidden className="size-3 rounded-full bg-[#FF5F57]" />
        <span aria-hidden className="size-3 rounded-full bg-[#FEBC2E]" />
        <span aria-hidden className="size-3 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-xs font-medium text-window-muted">{title}</span>
      </div>
      {children}
    </div>
  );
}
