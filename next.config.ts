import type { NextConfig } from "next";

// GitHub Pages serves a project site from /<repo>, so every asset and link
// needs that prefix. Driven by an env var, so local dev and a future custom
// domain are unaffected.
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  // No server features are used, so the site exports to static HTML.
  output: "export",
  // Pages has no rewrite layer, so emit <route>/index.html rather than
  // <route>.html and let directory resolution do the work.
  trailingSlash: Boolean(basePath),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  images: { unoptimized: true },
};

export default nextConfig;
