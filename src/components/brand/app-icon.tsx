import { ArrowDown } from "lucide-react";
import { cn } from "cn";

/**
 * The Hemta app icon: macOS squircle, cobalt glass gradient, down arrow.
 * CSS-built brand mark; swaps for a 3D render (public/brand/app-icon.png)
 * when the owner supplies one.
 */
export function AppIcon({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-[24%]",
        "bg-[linear-gradient(160deg,#5B7BFA_0%,#2144DF_48%,#14229B_100%)]",
        "shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),inset_0_-2px_6px_rgba(10,16,80,0.55),0_1px_2px_rgba(22,24,29,0.2)]",
        className,
      )}
    >
      {/* Glass top highlight */}
      <span className="absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.32),rgba(255,255,255,0))]" />
      <ArrowDown
        strokeWidth={2.5}
        className={cn(
          "relative text-white drop-shadow-[0_1px_2px_rgba(10,16,80,0.5)]",
          iconClassName,
        )}
      />
    </span>
  );
}
