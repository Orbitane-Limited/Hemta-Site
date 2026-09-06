import { cn } from "cn";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { StateChip, type DownloadState } from "@/components/demo/download-row";
import { Wash } from "@/components/brand/wash";
import { useCases } from "@/content/site";

/** Persona cards with a Z-axis rhythm: offset middle card, dark third card. */
export function UseCases() {
  return (
    <section
      aria-labelledby="usecases-heading"
      className="relative overflow-hidden py-24 md:py-36"
    >
      <Wash className="-bottom-24 -left-40 h-[24rem] w-[36rem]" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-2xl">
          <SplitHeading
            id="usecases-heading"
            className="text-3xl font-semibold tracking-[-0.02em] text-balance md:text-5xl"
          >
            {useCases.heading}
          </SplitHeading>
          <Reveal>
            <p className="mt-4 max-w-[52ch] text-base text-muted-foreground md:text-lg">
              {useCases.sub}
            </p>
          </Reveal>
        </div>

        <Reveal stagger className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
          {useCases.cards.map((card, i) => {
            const dark = i === 2;
            return (
              <div
                key={card.title}
                className={cn(
                  "rounded-2xl border p-6 transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-fluid)] hover:-translate-y-1 hover:shadow-float md:p-7",
                  dark
                    ? "border-window-border bg-window hover:border-white/20"
                    : "border-border bg-card hover:border-foreground/15",
                  i === 1 && "md:translate-y-8",
                )}
              >
                <h3
                  className={cn(
                    "text-xl font-medium tracking-[-0.01em]",
                    dark && "text-window-text",
                  )}
                >
                  {card.title}
                </h3>
                <p
                  className={cn(
                    "mt-2.5 text-[15px] leading-relaxed",
                    dark ? "text-window-muted" : "text-muted-foreground",
                  )}
                >
                  {card.body}
                </p>
                <div
                  aria-hidden
                  className={cn(
                    "mt-6 rounded-xl border p-4",
                    dark ? "border-window-border bg-window-surface" : "border-window-border bg-window",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-xs font-medium text-window-text">{card.file.name}</p>
                    <StateChip state={card.file.state as DownloadState} />
                  </div>
                  <div className="mt-3 flex items-center justify-between font-mono text-[11px] tabular-nums text-window-muted">
                    <span>{card.file.size}</span>
                    {card.file.speed ? <span>{card.file.speed}</span> : null}
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
