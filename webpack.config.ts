import { execSync } from "child_process";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import fs from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { Configuration, EnvironmentPlugin } from "webpack";
import { Configuration as DevConfiguration } from "webpack-dev-server";

interface WebpackEnv {
  WEBPACK_SERVE: boolean;
  [key: string]: unknown;
}

interface WebpackParams extends WebpackEnv {
  mode: Configuration["mode"];
}

// 获取当前分支 commitId
let commitId = "";
if (fs.existsSync(".git")) {
  try {
    commitId = execSync("git rev-parse --short HEAD").toString().trim();
  } catch (error) {
    commitId = "";
  }
}

export default (
  env: WebpackEnv,
  { mode }: WebpackParams,
): Configuration & DevConfiguration => {
  return {
    mode,
    entry: "./src",
    output: {
      clean: true,
      chunkFilename: "js/[name].[contenthash].js",
      filename: "js/[name].[contenthash].js",
      assetModuleFilename: "[ext]/[name].[contenthash].[ext]",
      path: path.resolve(__dirname, "dist"),
    },
    performance: {
      hints: mode === "production" && "warning",
      maxEntrypointSize: 1024 * 1024, // 1 MiB
      maxAssetSize: 512 * 1024, // 512 KiB
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
      minimizer: ["...", mode === "production" && new CssMinimizerPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.(jsx?|tsx?)$/i,
          exclude: /node_modules/,
          use: "ts-loader",
        },
        {
          test: /\.(css|less)$/i,
          use: [
            mode === "production"
              ? MiniCssExtractPlugin.loader
              : "style-loader",
            "css-loader",
            "less-loader",
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
      }),
      new EnvironmentPlugin({
        __COMMITID__: commitId,
        __PKGNAME__: process.env.npm_package_name,
        __PKGVERSION__: process.env.npm_package_version,
      }),
      mode === "production" &&
        new MiniCssExtractPlugin({
          filename: "css/[name].[contenthash].css",
          chunkFilename: "css/[name].[contenthash].css",
        }),
    ],
    devServer: {
      open: true,
      host: "0.0.0.0",
      historyApiFallback: true,
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        "@": path.join(__dirname, "src"),
        "~": path.join(__dirname),
      },
    },
  };
};
