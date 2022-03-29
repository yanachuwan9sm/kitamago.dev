/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // URLのホスト名を追加 (next/image)
  images: {
    domains: ["images.microcms-assets.io"],
  },
};

module.exports = nextConfig;
