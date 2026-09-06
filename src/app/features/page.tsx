import type { Metadata } from "next";
import { FolderOpen, Search } from "lucide-react";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { CtaButton } from "@/components/motion/cta-button";
import { SegmentLanes } from "@/components/demo/segment-lanes";
import { AppWindow } from "@/components/demo/app-window";
import { DownloadRow, StateChip } from "@/components/demo/download-row";
import { featuresPage, recovery, site } from "@/content/site";

export const metadata: Metadata = {
  title: `Features | ${site.name}`,
  description:
    "Segmented acceleration, a recovery engine, queue and categories, search and inspector, bandwidth control and scheduling. Every Hemta feature, explained honestly.",
};

const TOTAL = recovery.file.totalGb;
const b = featuresPage.blocks;

export default function FeaturesPage() {
  return (
    <main className="flex-1 overflow-hidden">
      {/* Header */}
      <section className="relative pt-40 pb-20 md:pb-28">
        <div aria-hidden className="dot-grid absolute inset-0" />
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[110px]"
        />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <SplitHeading
            as="h1"
            immediate
            className="max-w-3xl text-5xl font-semibold tracking-[-0.03em] text-balance md:text-7xl"
          >
            {featuresPage.heading}
          </SplitHeading>
          <Reveal immediate delay={0.4}>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
              {featuresPage.sub}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Acceleration: full-width visualization */}
      <section aria-labelledby="f-accel" className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <SplitHeading id="f-accel" className="text-3xl font-semibold tracking-[-0.02em] md:text-5xl">
            {b.acceleration.title}
          </SplitHeading>
          <Reveal>
            <p className="mt-4 max-w-[56ch] text-base text-muted-foreground md:text-lg">
              {b.acceleration.body}
            </p>
          </Reveal>
          <Reveal className="mt-10 rounded-[1.75rem] bg-foreground/[0.035] p-2 ring-1 ring-foreground/[0.05]">
            <SegmentLanes />
          </Reveal>
        </div>
      </section>

      {/* Recovery: split with storyboard frames */}
      <section aria-labelledby="f-recovery" className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <SplitHeading id="f-recovery" className="text-3xl font-semibold tracking-[-0.02em] md:text-5xl">
              {b.recovery.title}
            </SplitHeading>
            <Reveal>
              <p className="mt-4 max-w-[52ch] text-base text-muted-foreground md:text-lg">
                {b.recovery.body}
              </p>
            </Reveal>
          </div>
          <Reveal stagger className="grid gap-3">
            {(
              [
                { state: "interrupted", scale: 8.4 / TOTAL, bytes: `8.4 GB of ${TOTAL} GB` },
                { state: "recovering", scale: 8.4 / TOTAL, bytes: `8.4 GB of ${TOTAL} GB` },
                { state: "completed", scale: 1, bytes: `${TOTAL} GB of ${TOTAL} GB` },
              ] as const
            ).map((frame) => (
              <div
                key={frame.state}
                className="rounded-2xl border border-window-border bg-window p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="truncate text-sm font-medium text-window-text">
                    {recovery.file.name}
                  </p>
                  <StateChip state={frame.state} />
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full origin-left rounded-full ${frame.state === "completed" ? "bg-done" : "bg-primary"}`}
                    style={{ transform: `scaleX(${frame.scale})` }}
                  />
                </div>
                <p className="mt-3 font-mono text-xs tabular-nums text-window-muted">
                  {frame.bytes}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Queue & categories: split mirrored */}
      <section aria-labelledby="f-queue" className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:order-first">
            <div className="rounded-[1.75rem] bg-foreground/[0.045] p-2 shadow-float ring-1 ring-foreground/[0.06]">
              <AppWindow title="Hemta" className="rounded-[1.25rem] shadow-none">
                <DownloadRow
                  name="4K-Drone-Footage-Master.mp4"
                  size="8.2 GB"
                  state="downloading"
                  progress={0.62}
                  speed="41.7 MB/s"
                />
                <DownloadRow
                  name="Logic-Sample-Library.pkg"
                  size="12.6 GB"
                  state="queued"
                  progress={0}
                />
                <DownloadRow
                  name="Keynote-Assets-Q3.zip"
                  size="840 MB"
                  state="completed"
                  progress={1}
                />
              </AppWindow>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {b.queue.categories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  <FolderOpen aria-hidden strokeWidth={1.75} className="size-3.5 text-primary" />
                  {cat}
                </span>
              ))}
            </div>
          </Reveal>
          <div>
            <SplitHeading id="f-queue" className="text-3xl font-semibold tracking-[-0.02em] md:text-5xl">
              {b.queue.title}
            </SplitHeading>
            <Reveal>
              <p className="mt-4 max-w-[52ch] text-base text-muted-foreground md:text-lg">
                {b.queue.body}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Search & inspector: full-width tinted panel */}
      <section aria-labelledby="f-inspector" className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <SplitHeading id="f-inspector" className="text-3xl font-semibold tracking-[-0.02em] md:text-5xl">
            {b.inspector.title}
          </SplitHeading>
          <Reveal>
            <p className="mt-4 max-w-[56ch] text-base text-muted-foreground md:text-lg">
              {b.inspector.body}
            </p>
          </Reveal>
          <Reveal className="mt-10 grid gap-4 md:grid-cols-[1.2fr_1fr]">
            <div aria-hidden className="rounded-2xl border border-border bg-accent p-5">
              <div className="flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2.5">
                <Search strokeWidth={1.75} className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">drone footage</span>
              </div>
              <div className="mt-4 space-y-2">
                {["4K-Drone-Footage-Master.mp4", "Drone-B-Roll-Sunset.mp4", "Drone-LUT-Pack.zip"].map(
                  (name) => (
                    <div
                      key={name}
                      className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3"
                    >
                      <span className="truncate text-sm font-medium">{name}</span>
                      <span className="font-mono text-xs text-faint">Video</span>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div aria-hidden className="rounded-2xl border border-window-border bg-window p-5">
              <p className="text-xs font-medium text-window-muted">Inspector</p>
              <dl className="mt-3 space-y-2.5">
                {b.inspector.inspectorRows.map(([key, value]) => (
                  <div key={key} className="flex items-baseline justify-between gap-4">
                    <dt className="text-xs text-window-muted">{key}</dt>
                    <dd className="truncate font-mono text-xs tabular-nums text-window-text">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bandwidth & scheduling + trust: dark closer */}
      <div className="mt-12 rounded-t-[3rem] bg-window">
        <section aria-labelledby="f-control" className="py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <SplitHeading
                id="f-control"
                className="text-3xl font-semibold tracking-[-0.02em] text-window-text md:text-5xl"
              >
                {b.control.title}
              </SplitHeading>
              <Reveal>
                <p className="mt-4 max-w-[52ch] text-base text-window-muted md:text-lg">
                  {b.control.body}
                </p>
              </Reveal>
            </div>
            <Reveal aria-hidden className="rounded-2xl border border-window-border bg-window-surface p-6">
              <div className="flex items-baseline justify-between font-mono text-xs tabular-nums">
                <span className="text-window-muted">Cap</span>
                <span className="font-medium text-window-text">4.0 MB/s</span>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-white/10">
                <div className="relative h-full w-[40%] rounded-full bg-primary">
                  <span className="absolute -top-[3px] -right-1.5 size-3 rounded-full border-2 border-window-surface bg-primary" />
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between rounded-xl border border-window-border px-4 py-3 font-mono text-xs tabular-nums text-window-muted">
                <span>Starts 02:00</span>
                <span>3 queued</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="f-trust" className="pb-24 text-center md:pb-32">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <SplitHeading
              id="f-trust"
              className="text-3xl font-semibold tracking-[-0.02em] text-balance text-window-text md:text-5xl"
            >
              {b.trust.title}
            </SplitHeading>
            <Reveal>
              <p className="mx-auto mt-4 max-w-[54ch] text-base text-window-muted md:text-lg">
                {b.trust.body}
              </p>
            </Reveal>
            <Reveal className="mt-10 flex justify-center">
              <CtaButton href="/download" magnetic>
                Download for macOS
              </CtaButton>
            </Reveal>
          </div>
        </section>
      </div>
    </main>
  );
}
