import Image from "next/image";
import { Check, Wifi, BatteryMedium, ArrowDown } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { AppWindow } from "@/components/demo/app-window";
import { DownloadRow } from "@/components/demo/download-row";
import { agent } from "@/content/site";

/**
 * The big native set piece: a full macOS desktop built in CSS (wallpaper,
 * menu bar, dock) with Hemta living in it. Swaps its wallpaper for a
 * generated render (public/brand/wallpaper.jpg) when supplied.
 */
export function DesktopScene() {
  return (
    <section aria-labelledby="agent-heading" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-2xl">
          <SplitHeading
            id="agent-heading"
            className="text-3xl font-semibold tracking-[-0.02em] text-balance md:text-5xl"
          >
            {agent.heading}
          </SplitHeading>
          <Reveal>
            <p className="mt-4 max-w-[52ch] text-base text-muted-foreground md:text-lg">
              {agent.sub}
            </p>
          </Reveal>
          <Reveal stagger className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {agent.points.map((point) => (
              <span key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check aria-hidden strokeWidth={2.25} className="size-4 text-primary" />
                {point}
              </span>
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <div className="rounded-[2rem] bg-foreground/[0.045] p-2 shadow-float ring-1 ring-foreground/[0.06]">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              {/* Wallpaper (generated render) */}
              <Image
                src="/brand/wallpaper.jpg"
                alt=""
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-black/10" />

              <div className="relative flex min-h-[30rem] flex-col md:min-h-[36rem]">
                {/* Menu bar */}
                <div
                  aria-hidden
                  className="flex h-8 items-center justify-between bg-black/25 px-4 text-[11px] font-medium text-white/85"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">Hemta</span>
                    <span className="hidden gap-4 text-white/60 sm:flex">
                      <span>File</span>
                      <span>Edit</span>
                      <span>View</span>
                      <span>Window</span>
                      <span>Help</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 rounded-full bg-white/15 py-0.5 pr-2 pl-1.5">
                      <ArrowDown strokeWidth={2.5} className="size-3 text-white" />
                      <span className="h-1 w-10 overflow-hidden rounded-full bg-white/25">
                        <span className="block h-full w-[45%] rounded-full bg-white" />
                      </span>
                    </span>
                    <Wifi strokeWidth={2} className="size-3.5" />
                    <BatteryMedium strokeWidth={2} className="size-4" />
                    <span className="font-mono tabular-nums">Fri 9:41</span>
                  </div>
                </div>

                {/* Floating Hemta window */}
                <div className="flex flex-1 items-center justify-center px-6 py-10 md:px-16">
                  <div className="w-full max-w-xl">
                    <AppWindow title="Hemta" className="rounded-[1.1rem] shadow-[0_24px_80px_-12px_rgba(4,8,40,0.7)]">
                      <DownloadRow
                        name="DaVinci-Resolve-Studio.dmg"
                        size="3.4 GB"
                        state="downloading"
                        progress={0.45}
                        speed="38.2 MB/s"
                        segments={5}
                      />
                      <DownloadRow
                        name="Wedding-Highlights-4K.mp4"
                        size="2.1 GB"
                        state="completed"
                        progress={1}
                      />
                    </AppWindow>
                  </div>
                </div>

                {/* Dock (generated render, Hemta icon running at the right) */}
                <div aria-hidden className="flex justify-center pb-3">
                  <Image
                    src="/brand/dock.png"
                    alt=""
                    width={1730}
                    height={660}
                    className="h-auto w-[19rem] drop-shadow-[0_10px_28px_rgba(4,8,40,0.55)] md:w-[24rem]"
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-faint">
            The window is optional. The agent is not.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
