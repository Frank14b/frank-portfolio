import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained Node server in .next/standalone (used by the Dockerfile).
  output: "standalone",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
