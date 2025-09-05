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

    // Handle node: imports
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };

    if (isServer) {
      // Ignorar libs que só funcionam no Node.js
      config.externals.push('handlebars', 'fs', 'path', 'puppeteer');
    } else {
      // For client-side builds, externalize node: modules and better-auth server parts
      config.externals = config.externals || [];
      config.externals.push({
        'node:sqlite': 'commonjs node:sqlite',
        'node:crypto': 'commonjs node:crypto',
        'node:fs': 'commonjs node:fs',
        'node:path': 'commonjs node:path',
        'node:url': 'commonjs node:url',
        'node:buffer': 'commonjs node:buffer',
        'node:stream': 'commonjs node:stream',
        'better-auth': 'commonjs better-auth',
        'better-auth/adapters/drizzle': 'commonjs better-auth/adapters/drizzle',
      });
    }

    return config;
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
