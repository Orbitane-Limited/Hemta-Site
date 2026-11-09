import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), priority: 1 },
    { url: `${site.url}/features`, lastModified: new Date(), priority: 0.8 },
    { url: `${site.url}/download`, lastModified: new Date(), priority: 0.9 },
    { url: `${site.url}/changelog`, lastModified: new Date(), priority: 0.4 },
    { url: `${site.url}/privacy`, lastModified: new Date(), priority: 0.3 },
  ];
}
