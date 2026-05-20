import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  // Optimizar el bundle
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'swiper'],
  },
};

export default nextConfig;
