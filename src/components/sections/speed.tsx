import { Reveal } from "@/components/motion/reveal";
import { SegmentLanes } from "@/components/demo/segment-lanes";
import { speed } from "@/content/site";

export function Speed() {
  return (
    <section aria-labelledby="speed-heading" className="scroll-mt-16 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <Reveal>
          <h2
            id="speed-heading"
            className="text-3xl font-semibold tracking-[-0.02em] text-balance md:text-5xl"
          >
            {speed.heading}
          </h2>
          <p className="mt-4 max-w-[56ch] text-base text-muted-foreground md:text-lg">
            {speed.sub}
          </p>
        </Reveal>
        <div className="mt-10">
          <SegmentLanes />
        </div>
      </div>
    </section>
  );
}
