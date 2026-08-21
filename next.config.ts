import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  typedRoutes: false,
  typescript: {
    // Source type-checking still runs via `npx tsc --noEmit`.
    // Next 16 currently emits a generated route validator error for this static-export app.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
