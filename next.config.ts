import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    resolveAlias: {
      canvas: "./empty-module.js",
    },
  },
};

export default nextConfig;
