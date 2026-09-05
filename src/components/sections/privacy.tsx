import { Reveal } from "@/components/motion/reveal";
import { privacy } from "@/content/site";

export function Privacy() {
  return (
    <section aria-labelledby="privacy-heading" className="py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <h2
            id="privacy-heading"
            className="max-w-4xl text-4xl font-semibold tracking-[-0.03em] text-balance md:text-6xl"
          >
            {privacy.heading}
          </h2>
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
            {privacy.body}
          </p>
          <a
            href={privacy.link.href}
            className="mt-8 inline-block text-[15px] font-medium text-primary underline-offset-4 hover:underline"
          >
            {privacy.link.label}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
