import { execSync } from "child_process";
import CopyPlugin from "copy-webpack-plugin";
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

export default (
  env: WebpackEnv,
  { mode }: WebpackParams,
): Configuration & DevConfiguration => {
  // 获取当前分支 commitId
  let commitId = "";
  if (fs.existsSync(".git")) {
    try {
      commitId = execSync("git rev-parse --short HEAD").toString().trim();
    } catch (error) {
      commitId = "";
    }
  }

  const buildTime = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Shanghai", // 使用中国时区
  }).format(new Date());

  return {
    mode,
    entry: "./src",
    output: {
      clean: true,
      chunkFilename: "js/[name].[contenthash].js",
      filename: "js/[name].[contenthash].js",
      assetModuleFilename: "[ext]/[name].[contenthash].[ext]",
    },
    performance: {
      hints: mode === "production" && "warning",
      maxEntrypointSize: 1024 * 1024, // 1 MiB
      maxAssetSize: 1024 * 1024, // 512 KiB
      assetFilter: (assetFilename: string) => /\/assets\//.test(assetFilename), // 忽略 /assets 目录文件大小
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
        {
          test: /\.(hdr|usdz|gltf)$/i,
          use: {
            loader: "file-loader",
            options: {
              name: "assets/[name].[ext]", // 输出到 assets 目录
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
      }),
      new EnvironmentPlugin({
        __COMMITID__: commitId,
        __BUILDTIME__: buildTime,
        __PKGNAME__: process.env.npm_package_name,
        __PKGVERSION__: process.env.npm_package_version,
      }),
      mode === "production" &&
        new MiniCssExtractPlugin({
          filename: "css/[name].[contenthash].css",
          chunkFilename: "css/[name].[contenthash].css",
        }),
      new CopyPlugin({
        patterns: [
          {
            from: "src/assets",
            to: "assets",
          },
        ],
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
    devtool: mode !== "production" && "inline-source-map",
  };
};
