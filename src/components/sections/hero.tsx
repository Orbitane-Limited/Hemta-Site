import { SplitHeading } from "@/components/motion/split-heading";
import { CtaButton } from "@/components/motion/cta-button";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { HeroDemo } from "@/components/demo/hero-demo";
import { hero } from "@/content/site";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-20"
    >
      {/* Atmosphere: dot grid + two soft cobalt washes. Decorative only. */}
      <div aria-hidden className="dot-grid absolute inset-0" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-primary/[0.06] blur-[100px]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 py-16 md:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <Reveal immediate>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-float">
              <span className="size-1.5 rounded-full bg-done" />
              Native macOS download manager
            </p>
          </Reveal>
          <SplitHeading
            as="h1"
            id="hero-heading"
            immediate
            delay={0.1}
            className="mt-6 text-6xl font-semibold tracking-[-0.03em] text-balance md:text-7xl xl:text-8xl"
          >
            <span style={{ lineHeight: 1.02, display: "block" }}>
              {hero.headline} <span className="text-primary">{hero.headlineAccent}</span>
            </span>
          </SplitHeading>
          <Reveal immediate delay={0.45}>
            <p className="mt-7 max-w-[44ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
              {hero.sub}
            </p>
          </Reveal>
          <Reveal immediate delay={0.6} className="mt-9">
            <CtaButton href={hero.cta.href} magnetic>
              {hero.cta.label}
            </CtaButton>
          </Reveal>
        </div>

        <Reveal immediate delay={0.3}>
          <Tilt>
            <div className="relative">
              {/* Under-glow */}
              <div
                aria-hidden
                className="absolute inset-x-6 top-1/2 bottom-[-10%] rounded-full bg-primary/25 blur-[90px]"
              />
              {/* Double bezel: machined outer tray, glass inner window */}
              <div className="relative rounded-[1.75rem] bg-foreground/[0.045] p-2 shadow-float ring-1 ring-foreground/[0.06]">
                <HeroDemo />
              </div>
            </div>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}
