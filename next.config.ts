import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The page uses no server features, so it exports to static HTML.
  // This is what lets scripts/validate.mjs diff out/index.html against the
  // original artifact as plain files, with no dev server and no port.
  output: "export",
};

export default nextConfig;
