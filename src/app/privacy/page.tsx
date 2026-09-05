import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Privacy | ${site.name}`,
  description: "Hemta is local first with zero usage telemetry. Read the privacy policy.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-24 md:px-6 md:py-32">
      <h1 className="text-4xl font-semibold tracking-[-0.02em] md:text-5xl">Privacy</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Hemta is local first. Your downloads, history, and settings stay on your Mac. The app
        sends no usage telemetry and requires no account.
      </p>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        The full privacy policy will be published here before launch.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block text-[15px] font-medium text-primary underline-offset-4 hover:underline"
      >
        Back to home
      </Link>
    </main>
  );
}
