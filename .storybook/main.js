module.exports = {
  stories: ["../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  webpackFinal: async (baseConfig) => {
    baseConfig.module.rules.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: {
              localIdentName: "[local]___[hash:base64:2]",
            },
          },
        },
        "sass-loader",
      ],
    });
    return { ...baseConfig };
  },
};
