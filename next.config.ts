import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "cdn.jsdelivr.net" },
      { hostname: "cdn.simpleicons.org" },
    ],
  },
};

export default nextConfig;

