import type { NextConfig } from "next";

// ⚠️ Ignoramos validación estricta casteando a unknown primero
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
} as unknown as NextConfig;

export default nextConfig;
