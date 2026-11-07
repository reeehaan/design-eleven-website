import type { NextConfig } from "next";

const securityHeaders = [
  // Browsers remember to use HTTPS only, for two years, subdomains included.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Only this site and the portfolio (which shows a live preview of it) may put the pages in a frame.
  // This replaces X-Frame-Options, which cannot name an allowed site. localhost:3000 is for portfolio development.
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self' https://www.rehanhansaja.dev https://rehanhansaja.dev http://localhost:3000",
  },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
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
