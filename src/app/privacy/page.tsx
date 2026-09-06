import type { Metadata } from "next";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { privacyPage, site } from "@/content/site";

export const metadata: Metadata = {
  title: `Privacy | ${site.name}`,
  description:
    "Hemta is local first with zero usage telemetry, no account, and a local database. Privacy explained in plain words.",
};

export default function PrivacyPage() {
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
          {privacyPage.heading}
        </SplitHeading>
        <Reveal immediate delay={0.35}>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
            {privacyPage.sub}
          </p>
        </Reveal>

        <Reveal stagger className="mt-16 grid gap-4 md:grid-cols-2">
          {privacyPage.principles.map((principle) => (
            <div key={principle.title} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-medium tracking-[-0.01em]">{principle.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {principle.body}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal>
          <p className="mt-12 text-sm text-faint">{privacyPage.note}</p>
        </Reveal>
      </div>
    </main>
  );
}
