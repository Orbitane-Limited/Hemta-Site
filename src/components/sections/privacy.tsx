import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { privacy } from "@/content/site";

/** Dark manifesto: the page descends into Hemta's local-first world. */
export function Privacy() {
  return (
    <section aria-labelledby="privacy-heading" className="relative overflow-hidden py-28 md:py-40">
      <div
        aria-hidden
        className="absolute top-0 left-1/2 h-72 w-[50rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <SplitHeading
          id="privacy-heading"
          className="max-w-4xl text-4xl font-semibold tracking-[-0.03em] text-balance text-window-text md:text-7xl"
        >
          {privacy.heading}
        </SplitHeading>
        <Reveal>
          <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-window-muted md:text-xl">
            {privacy.body}
          </p>
        </Reveal>
        <Reveal stagger className="mt-12 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
          {privacy.facts.map((fact) => (
            <div
              key={fact}
              className="rounded-2xl border border-window-border bg-window-surface px-4 py-5 text-center text-sm font-medium text-window-text"
            >
              {fact}
            </div>
          ))}
        </Reveal>
        <Reveal>
          <Link
            href={privacy.link.href}
            className="mt-10 inline-block text-[15px] font-medium text-[#A7B6FF] underline-offset-4 hover:underline"
          >
            {privacy.link.label}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
