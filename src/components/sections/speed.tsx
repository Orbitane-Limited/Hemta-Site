import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { SegmentLanes } from "@/components/demo/segment-lanes";
import { speed } from "@/content/site";

export function Speed() {
  return (
    <section aria-labelledby="speed-heading" className="scroll-mt-16 py-24 md:py-36">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <SplitHeading
          id="speed-heading"
          className="text-3xl font-semibold tracking-[-0.02em] text-balance md:text-5xl"
        >
          {speed.heading}
        </SplitHeading>
        <Reveal>
          <p className="mt-4 max-w-[56ch] text-base text-muted-foreground md:text-lg">
            {speed.sub}
          </p>
        </Reveal>
        <Reveal className="mt-10 rounded-[1.75rem] bg-foreground/[0.035] p-2 ring-1 ring-foreground/[0.05]">
          <SegmentLanes />
        </Reveal>
      </div>
    </section>
  );
}
