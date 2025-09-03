import { type NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        as: '*.js',
        loaders: ['@svgr/webpack'],
      },
    },
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    if (isServer) {
      // Ignorar libs que só funcionam no Node.js
      config.externals.push('handlebars', 'fs', 'path', 'puppeteer');
    }

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://us.i.posthog.com/decide',
      },
    ];
  },
  experimental: {
    nodeMiddleware: true,
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
