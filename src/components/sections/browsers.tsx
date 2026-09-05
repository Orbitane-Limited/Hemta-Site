import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { browsers } from "@/content/site";

export function Browsers() {
  return (
    <section aria-labelledby="browsers-heading" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 text-center md:px-6">
        <Reveal>
          <h2
            id="browsers-heading"
            className="text-3xl font-semibold tracking-[-0.02em] text-balance md:text-5xl"
          >
            {browsers.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-base text-muted-foreground md:text-lg">
            {browsers.sub}
          </p>
        </Reveal>
        <Reveal stagger className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14">
          {browsers.list.map((browser) => (
            <Image
              key={browser.name}
              src={`/logos/${browser.file}`}
              alt={browser.name}
              width={48}
              height={48}
              className="size-10 md:size-12"
            />
          ))}
        </Reveal>
        <Reveal>
          <p className="mt-12 text-sm text-faint">{browsers.honesty}</p>
        </Reveal>
      </div>
    </section>
  );
}
