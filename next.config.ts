import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  experimental: { globalNotFound: true },
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default config;
