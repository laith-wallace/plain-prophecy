import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/prophet', destination: '/games', permanent: true },
    ]
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@convex-dev/auth"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

export default nextConfig;
