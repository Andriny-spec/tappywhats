import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Desabilitar a verificação de ESLint durante o build
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
