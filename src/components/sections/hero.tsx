import { Button } from "@/components/ui/button";
import { HeroDemo } from "@/components/demo/hero-demo";
import { hero } from "@/content/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="flex min-h-[100dvh] items-center pt-16">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1
            id="hero-heading"
            className="text-6xl font-semibold tracking-[-0.03em] text-balance md:text-7xl"
            style={{ lineHeight: 1.05 }}
          >
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
            {hero.sub}
          </p>
          <div className="mt-8">
            <Button asChild className="h-12 px-6 text-base shadow-cta">
              <a href={hero.cta.href}>{hero.cta.label}</a>
            </Button>
          </div>
        </div>
        <HeroDemo />
      </div>
    </section>
  );
}
