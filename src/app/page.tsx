import { Hero } from "@/components/sections/hero";
import { RecoveryStory } from "@/components/sections/recovery-story";
import { Speed } from "@/components/sections/speed";
import { Browsers } from "@/components/sections/browsers";
import { BackgroundAgent } from "@/components/sections/background-agent";
import { FeatureBento } from "@/components/sections/feature-bento";
import { Privacy } from "@/components/sections/privacy";
import { Faq } from "@/components/sections/faq";
import { DownloadCta } from "@/components/sections/download-cta";
import { Marquee } from "@/components/motion/marquee";
import { marqueeItems } from "@/content/site";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <RecoveryStory />
      <Speed />
      <Browsers />
      <BackgroundAgent />
      <FeatureBento />
      <Faq />
      {/* The dark finale: one deliberate theme descent that runs to the footer. */}
      <div className="mt-12 rounded-t-[3rem] bg-window">
        <Privacy />
        <Marquee items={marqueeItems} className="border-y border-window-border/60" />
        <DownloadCta />
      </div>
    </main>
  );
}
