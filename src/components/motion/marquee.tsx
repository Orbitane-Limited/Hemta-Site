import { cn } from "cn";

/**
 * The one marquee on the page (docs/04 budget): file formats drifting through
 * the dark passage. Decorative texture, aria-hidden, CSS-only, pauses under
 * reduced motion.
 */
export function Marquee({ items, className }: { items: readonly string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div aria-hidden className={cn("overflow-hidden py-10 select-none", className)}>
      <div className="flex w-max animate-marquee gap-14 motion-reduce:animate-none">
        {row.map((item, i) => (
          <span
            key={i}
            className="font-mono text-sm font-medium tracking-[0.35em] text-window-muted/40 uppercase"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
