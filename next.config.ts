import type { NextConfig } from "next";

/** The Sparkle update feed is served from its own host (the Hemta app's SUFeedURL). */
const updatesHost = "updates.hemta.app";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/appcast.xml",
          has: [{ type: "host", value: updatesHost }],
          destination: "/updates/appcast.xml",
        },
      ],
    };
  },
  async headers() {
    return [
      {
        // The feed is EdDSA-signed and must never be served stale: a new release has to be visible at once.
        source: "/appcast.xml",
        has: [{ type: "host", value: updatesHost }],
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
      {
        // The managed-tool manifest and its detached signature (docs/RELEASING.md §18 in the app repo): a hold, a rollback
        // or a kill-switch entry has to reach every Mac at once, so neither file is ever served stale.
        source: "/tools/:file(manifest\\.json|manifest\\.json\\.sig)",
        has: [{ type: "host", value: updatesHost }],
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
