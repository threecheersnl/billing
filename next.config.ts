import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: isProd ? '/billing' : '',
  basePath: isProd ? '/billing' : '',
};

export default nextConfig;
