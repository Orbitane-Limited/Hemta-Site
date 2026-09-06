import { cn } from "cn";

/**
 * Atmosphere primitive (docs/03 elevation notes): a soft blurred cobalt wash.
 * Size/position via className. Always decorative, never above ~8% tint,
 * zero JS. Parent section needs `relative overflow-hidden`; content needs
 * `relative` to paint above it.
 */
export function Wash({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full bg-primary/[0.07] blur-[110px]",
        className,
      )}
    />
  );
}
