/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    // URLのホスト名を追加 (next/image)
    domains: ['images.microcms-assets.io'],
  },
};

if (process.env.ANALYZE === 'true') {
  module.exports = withBundleAnalyzer({ nextConfig });
} else {
  module.exports = nextConfig;
}
