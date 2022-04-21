/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    // URLのホスト名を追加 (next/image)
    domains: ["images.microcms-assets.io"],
  },
  // SVGR を用いてsvgファイルをReactコンポーネントとして読込
  // @svgr/webpackをWebpackのloaderとして設定
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ["@svgr/webpack"],
  //   });
  //   return config;
  // },
};

module.exports = nextConfig;
//module.exports = withBundleAnalyzer({ nextConfig });
