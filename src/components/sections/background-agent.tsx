import { Check, ArrowDown } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { AppWindow } from "@/components/demo/app-window";
import { DownloadRow } from "@/components/demo/download-row";
import { agent } from "@/content/site";

export function BackgroundAgent() {
  return (
    <section aria-labelledby="agent-heading" className="py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <SplitHeading
            id="agent-heading"
            className="text-3xl font-semibold tracking-[-0.02em] text-balance md:text-5xl"
          >
            {agent.heading}
          </SplitHeading>
          <Reveal>
          <p className="mt-4 max-w-[52ch] text-base text-muted-foreground md:text-lg">
            {agent.sub}
          </p>
          <ul className="mt-8 space-y-3">
            {agent.points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-[15px]">
                <span className="flex size-5 items-center justify-center rounded-full bg-accent">
                  <Check aria-hidden strokeWidth={2.25} className="size-3 text-accent-foreground" />
                </span>
                {point}
              </li>
            ))}
          </ul>
          </Reveal>
        </div>

        <Reveal className="relative lg:order-first">
          {/* Menu bar glimpse: downloads persist outside the window */}
          <div
            aria-hidden
            className="absolute -top-5 right-6 z-10 flex items-center gap-2.5 rounded-full border border-window-border bg-window py-2 pr-4 pl-3 shadow-window"
          >
            <ArrowDown strokeWidth={2.25} className="size-3.5 text-primary" />
            <span className="h-1 w-16 overflow-hidden rounded-full bg-white/10">
              <span className="block h-full w-[45%] rounded-full bg-primary" />
            </span>
            <span className="font-mono text-[11px] tabular-nums text-window-muted">2 active</span>
          </div>
          <div className="rounded-[1.75rem] bg-foreground/[0.045] p-2 shadow-float ring-1 ring-foreground/[0.06]">
            <AppWindow title="Hemta" className="rounded-[1.25rem] shadow-none">
              <DownloadRow
                name="Logic-Sample-Library.pkg"
                size="12.6 GB"
                state="downloading"
                progress={0.45}
                speed="36.9 MB/s"
              />
              <DownloadRow
                name="Keynote-Assets-Q3.zip"
                size="840 MB"
                state="completed"
                progress={1}
              />
            </AppWindow>
          </div>
          <p className="mt-4 text-center text-sm text-faint lg:text-left">
            The window is optional. The agent is not.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
