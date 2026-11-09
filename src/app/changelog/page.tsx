import type { Metadata } from "next";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { changelog } from "@/content/changelog";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Changelog | ${site.name}`,
  description: "What changed in each Hemta release, newest first.",
};

export default function ChangelogPage() {
  return (
    <main className="relative flex-1 overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[110px]"
      />
      <div className="relative mx-auto max-w-4xl px-4 pt-40 pb-24 md:px-6 md:pb-32">
        <SplitHeading
          as="h1"
          immediate
          className="text-5xl font-semibold tracking-[-0.03em] text-balance md:text-7xl"
        >
          Changelog
        </SplitHeading>
        <Reveal immediate delay={0.35}>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
            What changed in each Hemta release, newest first.
          </p>
        </Reveal>

        <div className="mt-16 space-y-4">
          {changelog.map((release) => (
            <Reveal key={release.version}>
              <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-2xl font-medium tracking-[-0.01em]">
                    Hemta {release.version}
                  </h2>
                  <time className="text-sm text-faint">{release.date}</time>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {release.summary}
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted-foreground">
                  {release.changes.map((change) => (
                    <li key={change}>{change}</li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
