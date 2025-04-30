import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['child_process', 'fs']
  },
};

export default nextConfig;
