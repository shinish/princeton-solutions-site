import type { MetadataRoute } from "next";
import { SITE, serviceSlugs } from "./content";

// Required by output: "export" — these must be emitted at build time.
export const dynamic = "force-static";

/** Canonical, indexable pages only. 404 and any future private routes stay out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    { path: "/", priority: 1.0, freq: "monthly" as const },
    { path: "/services", priority: 0.9, freq: "monthly" as const },
    { path: "/about", priority: 0.8, freq: "yearly" as const },
    { path: "/faq", priority: 0.7, freq: "yearly" as const },
    { path: "/contact", priority: 0.8, freq: "yearly" as const },
    { path: "/privacy", priority: 0.3, freq: "yearly" as const },
    { path: "/terms", priority: 0.3, freq: "yearly" as const },
    { path: "/accessibility", priority: 0.3, freq: "yearly" as const },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE.origin}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...serviceSlugs.map((slug) => ({
      url: `${SITE.origin}/services/${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
