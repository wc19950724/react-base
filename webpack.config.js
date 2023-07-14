/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (env, { mode }) => {
  return {
    mode,
    entry: "./src/index.tsx",
    output: {
      clean: true,
      chunkFilename: "js/[name].[contenthash].js",
      filename: "js/[name].[contenthash].js",
      assetModuleFilename: "[ext]/[name].[contenthash].[ext]",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.(jsx?|tsx?)$/i,
          exclude: /node_modules/,
          use: "ts-loader",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
      }),
    ],
    devServer: {
      open: false,
      host: "0.0.0.0",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
  };
};
