import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${site.name}`,
  description:
    "How the Hemta download manager for macOS and the Hemta Browser Bridge extension handle your data.",
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="text-xl font-medium tracking-[-0.01em]">{title}</h2>
        <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
          {children}
        </div>
      </section>
    </Reveal>
  );
}

function List({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5">{children}</ul>;
}

function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-foreground">{children}</strong>;
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-card px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
      {children}
    </code>
  );
}

export default function PrivacyPage() {
  return (
    <main className="relative flex-1 overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[110px]"
      />
      <div className="relative mx-auto max-w-4xl px-4 pt-40 pb-24 md:px-6 md:pb-32">
        <SplitHeading
          as="h1"
          immediate
          className="text-5xl font-semibold tracking-[-0.03em] text-balance md:text-7xl"
        >
          Hemta Privacy Policy
        </SplitHeading>
        <Reveal immediate delay={0.35}>
          <p className="mt-6 text-sm text-faint">Last updated: 5 November 2026</p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-medium tracking-[-0.01em]">The short version</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted-foreground">
              <li>
                Hemta is a download manager for macOS. The <Strong>Hemta Browser Bridge</Strong>{" "}
                extension hands a download from your browser to the Hemta app on the same Mac.
              </li>
              <li>
                <Strong>We do not collect analytics or usage data.</Strong> We never see what you
                download, from where, or when.
              </li>
              <li>
                The extension talks <Strong>only to the Hemta app on your own Mac</Strong>. It sends
                nothing to any server of ours, and we run no server it could send to.
              </li>
              <li>Your download list, history and settings stay on your Mac.</li>
              <li>
                We do not sell your data, share it with third parties, or use it for advertising.
              </li>
            </ul>
          </div>
        </Reveal>

        <Section title="1. Who this applies to">
          <p>
            This policy covers the <Strong>Hemta</Strong> app for macOS (including its background
            download engine) and the <Strong>Hemta Browser Bridge</Strong> browser extension for
            Chrome and other Chromium-based browsers. In this policy, &ldquo;Hemta&rdquo;,
            &ldquo;we&rdquo; and &ldquo;us&rdquo; mean the developer of these products. Contact
            details are in section 10.
          </p>
        </Section>

        <Section title="2. What the browser extension handles">
          <p>
            The extension exists for one purpose: handing downloads from your browser to the Hemta
            app. To do that it handles the following information, only when you ask Hemta to take a
            download or when you have turned on automatic takeover of downloads:
          </p>
          <List>
            <li>
              <Strong>Download links and page addresses.</Strong> The address of the file, and the
              address of the page it came from (the referrer), so Hemta can fetch the file the way
              your browser would have.
            </li>
            <li>
              <Strong>Request headers.</Strong> Headers of the download request, such as the
              referrer and user agent. The extension observes them; it does not block or change any
              request.
            </li>
            <li>
              <Strong>Cookies (optional).</Strong> The <Code>cookies</Code> permission is optional
              and is requested only when you start a download from a site that needs you to be
              signed in. The cookies for that download&rsquo;s own address are read once and passed
              to the Hemta app so the file can be fetched with your session.
            </li>
            <li>
              <Strong>The link under your pointer.</Strong> A small script on web pages notes which
              link your pointer is over, so the keyboard shortcut &ldquo;Download link under cursor
              with Hemta&rdquo; knows which link you mean. It is kept in memory only. The extension
              does not read, collect or change page content.
            </li>
            <li>
              <Strong>Settings.</Strong> The extension stores its own settings (for example whether
              to take over downloads, and sites to skip) in your browser&rsquo;s extension storage
              on your device. Nothing else is written to storage: no browsing history, no list of
              downloads.
            </li>
          </List>
          <p>
            All of this information goes <Strong>only to the Hemta app installed on your Mac</Strong>
            , through your browser&rsquo;s native messaging channel. It is never sent to us or to
            any other server, and it is not used for analytics, advertising or profiling. Cookies
            and headers are held in memory for the transfer you asked for and are never stored by
            the extension or by Hemta, and never written to logs.
          </p>
          <p>
            The extension contains no remote code: everything it runs ships inside the extension
            package.
          </p>
        </Section>

        <Section title="3. What the Hemta app does with your data">
          <List>
            <li>
              <Strong>Your downloads stay on your Mac.</Strong> The download list, history,
              categories, queues and settings are stored in a database on your computer. They are
              never uploaded.
            </li>
            <li>
              <Strong>The files you download</Strong> come directly from the websites you choose,
              exactly as when you use a browser. Those sites can see your IP address and the
              request, as they normally would. We are not involved in those connections.
            </li>
            <li>
              <Strong>Cookies and sign-in headers</Strong> handed over for an authenticated
              download are kept in memory only, are used only for the site they came from, and are
              discarded after the transfer. They are never saved to disk or logged.
            </li>
            <li>
              <Strong>Safety checks on files.</Strong> Hemta marks downloaded files with
              macOS&rsquo;s standard quarantine attribute, which records the download source
              locally on the file so macOS can warn you before you open it.
            </li>
            <li>
              <Strong>Logs.</Strong> Hemta writes diagnostic messages to your Mac&rsquo;s system log
              with web addresses, file names, cookies and tokens marked private. They stay on your
              Mac.
            </li>
          </List>
        </Section>

        <Section title="4. Information that leaves your Mac">
          <p>Hemta itself contacts only these destinations:</p>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-faint">
                  <th className="px-4 py-3 font-medium">Destination</th>
                  <th className="px-4 py-3 font-medium">Why</th>
                  <th className="px-4 py-3 font-medium">What it can see</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr className="border-b border-border">
                  <td className="px-4 py-3">The websites you download from</td>
                  <td className="px-4 py-3">To fetch the files you ask for</td>
                  <td className="px-4 py-3">
                    What any browser request reveals, such as your IP address
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    Our update server (<Code>updates.hemta.app</Code>), when automatic updates are
                    enabled
                  </td>
                  <td className="px-4 py-3">To check whether a newer version of Hemta is available</td>
                  <td className="px-4 py-3">
                    Your IP address and the Hemta version. The request carries no identifier,
                    account or download information. You can turn automatic update checks off in
                    Settings.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>That is the complete list. The extension itself makes no network connections to us.</p>
        </Section>

        <Section title="5. What we do not do">
          <List>
            <li>We do not collect analytics, usage statistics, or behavioural data.</li>
            <li>
              We do not collect or transmit your download URLs, file names, file contents, download
              history, browsing history or cookies.
            </li>
            <li>
              We do not sell or transfer user data to third parties, other than as part of the
              approved uses described by the Chrome Web Store User Data Policy, and in this product
              no user data is transferred at all.
            </li>
            <li>
              We do not use or transfer user data for purposes unrelated to the single purpose of
              handing downloads to Hemta.
            </li>
            <li>
              We do not use or transfer user data to determine creditworthiness or for lending.
            </li>
            <li>We do not use advertising identifiers or fingerprinting.</li>
          </List>
          <p>
            The use of information received through browser extension APIs adheres to the{" "}
            <a
              href="https://developer.chrome.com/docs/webstore/program-policies/user-data-faq"
              className="text-primary underline-offset-4 hover:underline"
            >
              Chrome Web Store User Data Policy
            </a>
            , including its Limited Use requirements.
          </p>
        </Section>

        <Section title="6. Diagnostics and crash reports">
          <p>
            Hemta does not send diagnostics or crash reports automatically. If you choose to export
            a diagnostics bundle to attach to a support request, it is created on your Mac and you
            decide whether to send it. The export removes download addresses, file names, paths,
            host names, cookies, headers and tokens.
          </p>
        </Section>

        <Section title="7. How long data is kept, and your control">
          <List>
            <li>
              <Strong>On your Mac.</Strong> Your download list and history stay until you remove
              them. You can delete a download from the list (optionally together with its file)
              inside Hemta. Removing the Hemta app and its data folder deletes everything it
              stored.
            </li>
            <li>
              <Strong>In the extension.</Strong> Settings are removed when you uninstall the
              extension. Disabling the optional cookie permission in your browser&rsquo;s extension
              settings stops cookie access at once.
            </li>
            <li>
              <Strong>With us.</Strong> We hold no personal data about your use of Hemta, so there
              is nothing to export or delete on our side. Update-server access logs contain IP
              addresses and are rotated after about a week; they are not used for analytics.
            </li>
          </List>
        </Section>

        <Section title="8. Security">
          <p>
            The Hemta app and its background engine communicate only on your Mac, using
            macOS&rsquo;s own inter-process mechanism and your browser&rsquo;s native messaging; the
            engine does not listen on any network port. Only the Hemta extension, identified by its
            extension ID, is allowed to connect the browser to the app. Downloaded files are
            written with restrictive permissions and checked before being finalised.
          </p>
        </Section>

        <Section title="9. Children and changes">
          <p>
            Hemta is not directed at children and we do not knowingly collect information from
            anyone, including children.
          </p>
          <p>
            If we change this policy &mdash; for example, if we introduce paid plans or accounts
            that involve sending any information to our servers &mdash; we will update this page and
            the date above <em>before</em> the change takes effect, and describe exactly what is
            sent. Material changes will also be noted in the app&rsquo;s release notes.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            Questions about this policy or about privacy in Hemta:{" "}
            <a
              href="mailto:support@orbitane.com"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              support@orbitane.com
            </a>
          </p>
        </Section>
      </div>
    </main>
  );
}
