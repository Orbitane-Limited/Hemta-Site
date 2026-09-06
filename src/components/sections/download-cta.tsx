import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { CtaButton } from "@/components/motion/cta-button";
import { download } from "@/content/site";

/** Lives inside the dark finale sheet. */
export function DownloadCta() {
  return (
    <section
      id="download"
      aria-labelledby="download-heading"
      className="relative scroll-mt-16 overflow-hidden py-28 text-center md:py-40"
    >
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mb-9 flex justify-center">
          <span className="relative">
            <span
              aria-hidden
              className="absolute inset-0 scale-150 rounded-full bg-primary/30 blur-2xl"
            />
            <Image
              src="/brand/app-icon.png"
              alt=""
              width={96}
              height={96}
              className="relative size-20 md:size-24"
            />
          </span>
        </Reveal>
        <SplitHeading
          id="download-heading"
          className="mx-auto max-w-[16ch] text-4xl font-semibold tracking-[-0.02em] text-balance text-window-text md:text-6xl"
        >
          {download.heading}
        </SplitHeading>
        <Reveal className="mt-10 flex justify-center">
          <CtaButton href={download.cta.href} magnetic>
            {download.cta.label}
          </CtaButton>
        </Reveal>
        <Reveal>
          <p className="mt-6 text-sm text-window-muted">{download.caption}</p>
        </Reveal>
      </div>
    </section>
  );
}
