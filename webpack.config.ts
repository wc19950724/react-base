import { execSync } from "child_process";
import fs from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";
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
      new EnvironmentPlugin({
        __COMMITID__: commitId,
        __PKGNAME__: process.env.npm_package_name,
        __PKGVERSION__: process.env.npm_package_version,
      }),
    ],
    devServer: {
      open: true,
      host: "0.0.0.0",
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
