import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/prophet', destination: '/games', permanent: true },
    ]
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@convex-dev/auth", "posthog-js"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

export default withSerwist(nextConfig);
