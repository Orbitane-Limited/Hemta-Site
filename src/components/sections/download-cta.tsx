import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { download } from "@/content/site";

export function DownloadCta() {
  return (
    <section id="download" aria-labelledby="download-heading" className="scroll-mt-16 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="rounded-xl border border-window-border bg-window px-6 py-16 text-center md:py-24">
          <h2
            id="download-heading"
            className="mx-auto max-w-[20ch] text-3xl font-semibold tracking-[-0.02em] text-balance text-window-text md:text-5xl"
          >
            {download.heading}
          </h2>
          <div className="mt-8">
            <Button asChild className="h-12 px-6 text-base shadow-cta">
              <a href={download.cta.href}>{download.cta.label}</a>
            </Button>
          </div>
          <p className="mt-5 text-sm text-window-muted">{download.caption}</p>
        </Reveal>
      </div>
    </section>
  );
}
