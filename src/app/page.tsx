import { Hero } from "@/components/sections/hero";
import { RecoveryStory } from "@/components/sections/recovery-story";
import { KillSwitch } from "@/components/sections/kill-switch";
import { Browsers } from "@/components/sections/browsers";
import { DesktopScene } from "@/components/sections/desktop-scene";
import { Categories } from "@/components/sections/categories";
import { UseCases } from "@/components/sections/use-cases";
import { Comparison } from "@/components/sections/comparison";
import { Privacy } from "@/components/sections/privacy";
import { Faq } from "@/components/sections/faq";
import { DownloadCta } from "@/components/sections/download-cta";
import { StatsBand } from "@/components/sections/stats-band";
import { Marquee } from "@/components/motion/marquee";
import { marqueeItems } from "@/content/site";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <RecoveryStory />
      <KillSwitch />
      <Browsers />
      <DesktopScene />
      <Categories />
      <UseCases />
      <Comparison />
      <Faq />
      {/* The dark finale: one deliberate theme descent that runs to the footer. */}
      <div className="mt-12 rounded-t-[3rem] bg-window">
        <StatsBand />
        <Privacy />
        <Marquee items={marqueeItems} className="border-y border-window-border/60" />
        <DownloadCta />
      </div>
    </main>
  );
}
