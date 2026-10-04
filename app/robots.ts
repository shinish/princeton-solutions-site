import type { MetadataRoute } from "next";
import { SITE } from "./content";

// Required by output: "export" — these must be emitted at build time.
export const dynamic = "force-static";

/**
 * Until a production origin is confirmed via NEXT_PUBLIC_SITE_ORIGIN, this
 * disallows everything. That is deliberate: it stops a preview or staging
 * deploy being indexed under the wrong hostname. Set the env var to go live.
 */
export default function robots(): MetadataRoute.Robots {
  if (!SITE.originConfirmed) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.origin}/sitemap.xml`,
    host: SITE.origin,
  };
}
