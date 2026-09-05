// All visible copy and demo data for the landing page.
// Rules (docs/02 §4): plain, confident, concrete, honest. HTTP/HTTPS on macOS only.
// No em-dashes in any string. Demo numbers are illustrative, not claims.

export const site = {
  name: "Hemta",
  title: "Hemta | The download manager for macOS",
  description:
    "Hemta captures downloads from your browser, accelerates them, and recovers them through network drops, sleep, and restarts. Local first, zero telemetry, built only for macOS.",
  url: "https://hemta.app",
} as const;

export const nav = {
  links: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Download", href: "#download" },
} as const;

export const hero = {
  headline: "Downloads that finish.",
  sub: "Hemta captures downloads from your browser, accelerates them, and recovers them through network drops, sleep, and restarts.",
  cta: { label: "Download for macOS", href: "#download" },
} as const;

// Demo values, not claims.
export const heroDemo = {
  windowTitle: "Hemta",
  rows: [
    {
      id: "active",
      name: "4K-Drone-Footage-Master.mp4",
      size: "8.2 GB",
      state: "downloading",
      progress: 0.62,
      speed: "41.7 MB/s",
      segments: 5,
    },
    {
      id: "queued",
      name: "Logic-Sample-Library.pkg",
      size: "12.6 GB",
      state: "queued",
      progress: 0,
    },
    {
      id: "done",
      name: "Keynote-Assets-Q3.zip",
      size: "840 MB",
      state: "completed",
      progress: 1,
    },
  ],
} as const;

export const recovery = {
  heading: "Your Wi-Fi doesn't care about your download.",
  sub: "Hemta does. Watch what happens when the network dies at 8.4 GB.",
  file: { name: "Studio-Archive-2026.zip", totalGb: 12, startGb: 8.4 },
  ghostCard: { title: "Download failed.", sub: "This is where your browser gives up." },
  closer: "Hemta picks up exactly where it stopped. Not from zero.",
  chips: {
    downloading: "Downloading",
    interrupted: "Interrupted",
    recovering: "Recovering",
    completed: "Completed",
  },
} as const;

export const speed = {
  heading: "One file. Five connections.",
  sub: "Hemta splits a download into segments and pulls them in parallel, then assembles the file on your Mac.",
  laneLabel: "Hemta",
  compareLabel: "One connection",
  honesty:
    "Acceleration applies when a server supports ranged requests. When it doesn't, Hemta falls back to a single reliable connection.",
} as const;

export const browsers = {
  heading: "Click download. Hemta takes it from there.",
  sub: "A download starts in your browser and lands in Hemta automatically.",
  honesty: "Safari connects through an extension. Chromium browsers use native messaging.",
  list: [
    { name: "Safari", file: "safari.svg" },
    { name: "Google Chrome", file: "chrome.svg" },
    { name: "Microsoft Edge", file: "edge.svg" },
    { name: "Brave", file: "brave.svg" },
    { name: "Arc", file: "arc.svg" },
    { name: "Vivaldi", file: "vivaldi.svg" },
    { name: "Opera", file: "opera.svg" },
  ],
} as const;

export const agent = {
  heading: "Close the window. Keep the download.",
  sub: "A background agent owns your downloads. They keep moving while you work and survive quitting the app. Open Hemta anytime to see exactly where things stand.",
  points: [
    "Downloads continue with the window closed",
    "Progress lives in your menu bar",
    "Reopen later, everything is current",
  ],
} as const;

export const features = {
  heading: "Everything a download needs.",
  items: [
    {
      title: "Queue",
      body: "See what's downloading, what's waiting, and what's done, in one ordered list.",
      visual: "queue",
    },
    {
      title: "Bandwidth control",
      body: "Cap Hemta's speed so calls and games keep their headroom.",
      visual: "bandwidth",
    },
    {
      title: "Categories",
      body: "Apps, video, archives, documents. Downloads sort themselves as they arrive.",
    },
    {
      title: "Search & history",
      body: "Every download stays findable long after it finishes.",
    },
    {
      title: "Inspector",
      body: "Source, destination, size, segments, retries. The full story of any download.",
    },
    {
      title: "Scheduling",
      body: "Queue heavy downloads for overnight and let the agent run them.",
    },
  ],
} as const;

export const privacy = {
  heading: "Hemta doesn't phone home.",
  body: "Your downloads, your history, your habits: all of it stays on your Mac. Zero telemetry. No account. Local first.",
  link: { label: "Read the privacy policy", href: "/privacy" },
} as const;

export const faq = {
  heading: "Questions, answered honestly.",
  items: [
    {
      q: "Which browsers does Hemta work with?",
      a: "Safari, Chrome, Edge, Brave, Arc, Vivaldi, and Opera. Safari connects through a dedicated extension; Chromium browsers communicate with Hemta through native messaging.",
    },
    {
      q: "What happens if my Mac sleeps mid-download?",
      a: "Hemta checkpoints progress continuously. When your Mac wakes, downloads resume from where they stopped whenever the server allows it, instead of starting over.",
    },
    {
      q: "Does Hemta download torrents or FTP?",
      a: "No. Hemta focuses on doing one thing extremely well: HTTP and HTTPS downloads on macOS. No torrents, no FTP, no site crawling.",
    },
    {
      q: "Is any of my data sent anywhere?",
      a: "No. Hemta is local first with zero usage telemetry. Your download activity never leaves your Mac, and there is no account to create.",
    },
    {
      q: "Which macOS versions does Hemta support?",
      a: "Hemta is built natively for modern macOS. The exact version requirements will be published here at launch.",
    },
    {
      q: "How much does Hemta cost?",
      a: "Pricing will be announced at launch.",
    },
  ],
} as const;

export const download = {
  heading: "Ready for downloads that finish?",
  cta: { label: "Download for macOS", href: "#" },
  caption: "For Mac. Nothing else.",
} as const;

export const footer = {
  tagline: "A download manager built only for macOS.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "How it works", href: "#how" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Legal",
      links: [{ label: "Privacy", href: "/privacy" }],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Hemta`,
} as const;
