import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/summerquest-nyc",
  images: { unoptimized: true },
};

export default nextConfig;
