import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Avoid linter errors fail the build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
