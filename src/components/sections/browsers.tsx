import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { browsers } from "@/content/site";

export function Browsers() {
  return (
    <section aria-labelledby="browsers-heading" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 text-center md:px-6">
        <SplitHeading
          id="browsers-heading"
          className="text-3xl font-semibold tracking-[-0.02em] text-balance md:text-5xl"
        >
          {browsers.heading}
        </SplitHeading>
        <Reveal>
          <p className="mx-auto mt-4 max-w-[48ch] text-base text-muted-foreground md:text-lg">
            {browsers.sub}
          </p>
        </Reveal>
        <Reveal stagger className="mt-12 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {browsers.list.map((browser) => (
            <span
              key={browser.name}
              title={browser.name}
              className="flex size-16 items-center justify-center rounded-2xl border border-border bg-card transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-fluid)] hover:-translate-y-1 hover:border-foreground/15 hover:shadow-float md:size-20"
            >
              <Image
                src={`/logos/${browser.file}`}
                alt={browser.name}
                width={48}
                height={48}
                className="size-9 md:size-11"
              />
            </span>
          ))}
        </Reveal>
        <Reveal>
          <p className="mt-12 text-sm text-faint">{browsers.honesty}</p>
        </Reveal>
      </div>
    </section>
  );
}
