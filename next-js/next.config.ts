import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // lucide-react を最適化対象に指定
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
