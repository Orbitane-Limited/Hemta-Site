import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { RecoveryStory } from "@/components/sections/recovery-story";
import { Speed } from "@/components/sections/speed";
import { Browsers } from "@/components/sections/browsers";
import { BackgroundAgent } from "@/components/sections/background-agent";
import { FeatureBento } from "@/components/sections/feature-bento";
import { Privacy } from "@/components/sections/privacy";
import { Faq } from "@/components/sections/faq";
import { DownloadCta } from "@/components/sections/download-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <RecoveryStory />
        <Speed />
        <Browsers />
        <BackgroundAgent />
        <FeatureBento />
        <Privacy />
        <Faq />
        <DownloadCta />
      </main>
      <Footer />
    </>
  );
}
