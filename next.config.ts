import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a phone on the same Wi-Fi load the dev server by its network address.
  // Without this the dev server blocks the scripts, and nothing animates.
  allowedDevOrigins: ["172.20.10.*", "192.168.*.*", "10.*.*.*"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
