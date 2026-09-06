import { Check, X } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { comparison } from "@/content/site";

/** Honest scenario comparison: same situations, different endings. */
export function Comparison() {
  return (
    <section aria-labelledby="comparison-heading" className="relative py-24 md:py-36">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,#F1F4FC_25%,#F1F4FC_75%,transparent_100%)]"
      />
      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        <SplitHeading
          id="comparison-heading"
          className="text-3xl font-semibold tracking-[-0.02em] text-balance md:text-5xl"
        >
          {comparison.heading}
        </SplitHeading>
        <Reveal>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">{comparison.sub}</p>
        </Reveal>

        <Reveal className="mt-10 rounded-[1.75rem] bg-foreground/[0.035] p-2 ring-1 ring-foreground/[0.05]">
          <div className="overflow-hidden rounded-[1.25rem] border border-border bg-card">
            <div className="grid grid-cols-[1.1fr_1fr_1fr] items-center gap-3 border-b border-border px-5 py-4 md:px-8">
              <span />
              <span className="text-sm font-medium text-muted-foreground">
                {comparison.columns.bad}
              </span>
              <span className="text-sm font-semibold text-primary">{comparison.columns.good}</span>
            </div>
            {comparison.rows.map((row, i) => (
              <div
                key={row.scenario}
                className={`grid grid-cols-[1.1fr_1fr_1fr] items-center gap-3 px-5 py-4 md:px-8 md:py-5 ${
                  i % 2 === 1 ? "bg-muted/50" : ""
                }`}
              >
                <span className="text-sm font-medium md:text-[15px]">{row.scenario}</span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <X aria-hidden strokeWidth={2} className="size-4 shrink-0 text-fail/60" />
                  {row.bad}
                </span>
                <span className="flex items-center gap-2 text-sm font-medium md:text-[15px]">
                  <Check aria-hidden strokeWidth={2.25} className="size-4 shrink-0 text-done" />
                  {row.good}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
