import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { CtaButton } from "@/components/motion/cta-button";
import { downloadPage, site } from "@/content/site";

export const metadata: Metadata = {
  title: `Download | ${site.name}`,
  description:
    "Get Hemta for macOS. One .dmg, drag to Applications, connect your browser once. No account, no telemetry.",
};

export default function DownloadPage() {
  return (
    <main className="relative flex-1 overflow-hidden">
      {/* Light wallpaper render fading into the page background */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[46rem]">
        <Image
          src="/brand/wallpaper-light.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,var(--background)_96%)]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 pt-40 pb-24 md:px-6 md:pb-32">
        <div className="text-center">
          <Reveal immediate className="mb-8 flex justify-center">
            <span className="relative">
              <span
                aria-hidden
                className="absolute inset-0 scale-125 rounded-full bg-primary/25 blur-2xl"
              />
              <Image
                src="/brand/app-icon.png"
                alt=""
                width={112}
                height={112}
                priority
                className="relative size-24 md:size-28"
              />
            </span>
          </Reveal>
          <SplitHeading
            as="h1"
            immediate
            delay={0.15}
            className="text-6xl font-semibold tracking-[-0.03em] md:text-8xl"
          >
            {downloadPage.heading}
          </SplitHeading>
          <Reveal immediate delay={0.35}>
            <p className="mx-auto mt-6 max-w-[46ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
              {downloadPage.sub}
            </p>
          </Reveal>
          <Reveal immediate delay={0.5} className="mt-10 flex justify-center">
            <CtaButton href={downloadPage.cta.href} magnetic>
              {downloadPage.cta.label}
            </CtaButton>
          </Reveal>
          <Reveal immediate delay={0.6}>
            <p className="mt-5 text-sm text-faint">{downloadPage.caption}</p>
          </Reveal>
        </div>

        <Reveal stagger className="mt-24 grid gap-4 md:grid-cols-3">
          {downloadPage.steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-border bg-card p-6 transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-fluid)] hover:-translate-y-1 hover:border-foreground/15 hover:shadow-float"
            >
              <h2 className="text-lg font-medium tracking-[-0.01em]">{step.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-6 rounded-2xl border border-border bg-accent p-6 md:p-8">
          <h2 className="text-lg font-medium tracking-[-0.01em]">
            {downloadPage.requirements.title}
          </h2>
          <ul className="mt-4 space-y-3">
            {downloadPage.requirements.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-muted-foreground">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-card">
                  <Check aria-hidden strokeWidth={2.25} className="size-3 text-accent-foreground" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </main>
  );
}
