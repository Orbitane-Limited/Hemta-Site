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
    { label: "Features", href: "/features" },
    { label: "How it works", href: "/#how" },
    { label: "FAQ", href: "/#faq" },
  ],
  cta: { label: "Download", href: "/download" },
} as const;

export const hero = {
  headline: "Downloads that",
  headlineAccent: "finish.",
  sub: "Hemta captures downloads from your browser, accelerates them, and recovers them through network drops, sleep, and restarts.",
  cta: { label: "Download for macOS", href: "/download" },
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

export const killSwitch = {
  heading: "Try to kill this download.",
  sub: "Flip the Wi-Fi off and watch Hemta refuse to lose your progress. Flip it back and it continues from the same byte.",
  file: { name: "Everything-Bundle-2026.zip", size: "9.6 GB" },
  toggleLabel: "Wi-Fi",
  note: "A simulation of the real recovery engine.",
} as const;

export const categories = {
  heading: "Sorted before you look.",
  sub: "Downloads land in the right place by type, automatically.",
  caption: "The rules are yours to change. Hemta just applies them.",
  tiles: [
    { name: "Apps", count: "38 files", color: "#2E7CF6", icon: "apps" },
    { name: "Video", count: "112 files", color: "#A550E0", icon: "video" },
    { name: "Archives", count: "260 files", color: "#F5A623", icon: "archives" },
    { name: "Documents", count: "473 files", color: "#2FBF62", icon: "documents" },
    { name: "Other", count: "51 files", color: "#8B909B", icon: "other" },
  ],
} as const;

export const useCases = {
  heading: "Built for heavy days.",
  sub: "If your work moves big files, Hemta is the difference between an afternoon and a retry loop.",
  cards: [
    {
      title: "Video editors",
      body: "Footage from set, stock libraries, client deliveries. Multi-gigabyte files that must arrive intact.",
      file: { name: "RED-R3D-Interview-A.mov", size: "48 GB", state: "downloading", speed: "44.6 MB/s" },
    },
    {
      title: "Developers",
      body: "SDKs, simulators, disk images. The downloads you need before you can even start working.",
      file: { name: "Xcode_16.4.xip", size: "3.2 GB", state: "completed", speed: "" },
    },
    {
      title: "Researchers",
      body: "Datasets from slow academic mirrors that drop connections halfway. Hemta's favorite food.",
      file: { name: "climate-grid-2025.parquet", size: "21 GB", state: "recovering", speed: "0 MB/s" },
    },
  ],
} as const;

export const comparison = {
  heading: "Your browser gives up.",
  sub: "Same situations, different endings.",
  columns: { bad: "Your browser", good: "Hemta" },
  rows: [
    { scenario: "Wi-Fi drops at 8.4 GB", bad: "Download failed", good: "Resumes at 8.4 GB" },
    { scenario: "Your Mac goes to sleep", bad: "Start over", good: "Picks up on wake" },
    { scenario: "The browser crashes", bad: "Download gone", good: "Hemta never noticed" },
    { scenario: "You quit the app", bad: "Transfer stops", good: "The agent keeps going" },
    { scenario: "The server hiccups", bad: "Network error", good: "Retries and recovers" },
  ],
} as const;

export const stats = {
  items: [
    { value: 0, suffix: "", label: "bytes of telemetry, ever" },
    { value: 7, suffix: "", label: "browsers captured" },
    { value: 1, suffix: "", label: "job: finishing downloads" },
  ],
} as const;

export const privacy = {
  heading: "Hemta doesn't phone home.",
  body: "Your downloads, your history, your habits: all of it stays on your Mac. Zero telemetry. No account. Local first.",
  facts: ["Zero telemetry", "No account", "No cloud", "Local database"],
  link: { label: "Read the privacy policy", href: "/privacy" },
} as const;

export const marqueeItems = [
  ".dmg",
  ".zip",
  ".pkg",
  ".iso",
  ".mp4",
  ".mkv",
  ".dng",
  ".pdf",
  ".aif",
] as const;

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
  cta: { label: "Download for macOS", href: "/download" },
  caption: "For Mac. Nothing else.",
} as const;

export const downloadPage = {
  heading: "Get Hemta.",
  sub: "The first public build lands here at launch. Everything below is how it will install.",
  cta: { label: "Download for macOS", href: "#" },
  caption: "For Mac. Nothing else.",
  steps: [
    {
      title: "Download the app",
      body: "One .dmg, straight from this page. No installer wizard, no bundled extras.",
    },
    {
      title: "Drag to Applications",
      body: "The install is the macOS install: drop Hemta into your Applications folder.",
    },
    {
      title: "Connect your browser",
      body: "Add the Safari extension or approve the Chromium connector once. Downloads route to Hemta from then on.",
    },
  ],
  requirements: {
    title: "Requirements",
    items: [
      "Modern macOS (exact version floor published at launch)",
      "Works with Safari, Chrome, Edge, Brave, Arc, Vivaldi, and Opera",
      "No account, no sign-in, nothing to configure on day one",
    ],
  },
} as const;

export const featuresPage = {
  heading: "Built for how downloads actually behave.",
  sub: "Networks drop. Macs sleep. Servers stall. Every Hemta feature exists because downloads live in the real world.",
  toc: [
    { id: "acceleration", label: "Acceleration" },
    { id: "recovery", label: "Recovery" },
    { id: "queue", label: "Queue & categories" },
    { id: "inspector", label: "Search & inspector" },
    { id: "control", label: "Bandwidth & scheduling" },
    { id: "trust", label: "Security" },
  ],
  blocks: {
    acceleration: {
      title: "Segmented acceleration",
      body: "Hemta opens multiple connections to the same file and pulls ranges in parallel, then assembles the result. When a server won't allow it, Hemta falls back to one reliable connection instead of failing.",
      facts: [
        "Multiple ranged connections per file, managed by the engine",
        "Automatic fallback to a single connection when ranges aren't supported",
        "Segments assembled and validated locally on your Mac",
      ],
    },
    recovery: {
      title: "Recovery engine",
      body: "Progress is checkpointed continuously. Network drops, sleep, crashes, restarts: a download resumes from its last byte whenever the server allows, never from zero.",
      facts: [
        "Continuous checkpointing of download state",
        "Survives sleep and wake, app crashes, and system restarts",
        "Automatic retries with recovery before anything is marked failed",
      ],
    },
    queue: {
      title: "Queue & categories",
      body: "Every download lives in one ordered queue with clear states. Files sort themselves into categories as they arrive, so your Downloads folder stops being a junk drawer.",
      facts: [
        "One ordered queue: downloading, queued, paused, completed, failed",
        "Concurrency and execution handled by the background agent",
        "Category rules applied automatically as files arrive",
      ],
      categories: ["Apps", "Video", "Archives", "Documents", "Other"],
    },
    inspector: {
      title: "Search, history & inspector",
      body: "Everything Hemta has ever downloaded stays findable. Open the inspector on any item for the full story: source, destination, size, segments, retries.",
      facts: [
        "Search across names, history, and categories",
        "Per-download inspector: source, destination, size, segments, retries",
        "Open files or reveal them in Finder from anywhere",
      ],
      inspectorRows: [
        ["Source", "cdn.example-studio.com"],
        ["Destination", "~/Downloads/Video"],
        ["Size", "8.2 GB"],
        ["Segments", "5 of 5 active"],
        ["Retries", "2 (recovered)"],
      ],
    },
    control: {
      title: "Bandwidth & scheduling",
      body: "Cap Hemta's total speed so calls and games keep their headroom, and queue heavy downloads for hours when nobody needs the connection.",
      facts: [
        "Global bandwidth cap with per-download visibility",
        "Schedule heavy downloads for quiet hours; the agent runs them",
        "Retry and backoff behavior tuned by the engine, not left to chance",
      ],
    },
    trust: {
      title: "Built like a Mac app should be",
      body: "Sandboxed components, hardened communication between the app and its background agent, and sensitive browser data handled in memory only. Trustworthy by architecture, not by promise.",
      facts: [
        "Sandboxed components where the platform allows",
        "Hardened communication between app and agent",
        "Sensitive browser session data handled in memory only",
      ],
    },
  },
} as const;

export const privacyPage = {
  heading: "Privacy, in plain words.",
  sub: "Hemta's answer to most privacy questions is that the data never exists anywhere but your Mac.",
  principles: [
    {
      title: "Zero usage telemetry",
      body: "Hemta does not record or transmit what you download, when, or how often. There is no analytics endpoint to send it to.",
    },
    {
      title: "No account",
      body: "Nothing to sign up for, so there is no profile of you to store, leak, or sell.",
    },
    {
      title: "Local database",
      body: "Your queue and history live in a local database on your Mac, readable by you and nobody else.",
    },
    {
      title: "Network traffic = your downloads",
      body: "Hemta talks to the servers you download from. That's the list.",
    },
  ],
  note: "The full legal policy will be published here before launch.",
} as const;

export const footer = {
  tagline: "A download manager built only for macOS.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Download", href: "/download" },
        { label: "How it works", href: "/#how" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Legal",
      links: [{ label: "Privacy", href: "/privacy" }],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Hemta`,
} as const;
