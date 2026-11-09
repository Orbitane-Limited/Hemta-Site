/** Hemta release history, newest first. Mirrors the repo's CHANGELOG.md in plain language; add a block per release. */
export const changelog = [
  {
    version: "1.0.1",
    date: "9 November 2026",
    summary: "A fix for the browser extension's two buttons.",
    changes: [
      "The browser extension's Open Hemta button now brings the app forward, and reopens its window if you had closed it.",
      "The extension's Show in Finder button now reveals a finished download's file in Finder.",
    ],
  },
  {
    version: "1.0.0",
    date: "9 November 2026",
    summary: "The first public release of Hemta.",
    changes: [
      "A native macOS download manager for HTTP and HTTPS: segmented downloads that resume through network drops, sleep and restarts.",
      "Capture from Chrome and other Chromium browsers through the Hemta Browser Bridge extension. Safari capture is not included yet.",
      "Automatic updates, signed so only genuine Hemta releases can be installed.",
    ],
  },
] as const;
