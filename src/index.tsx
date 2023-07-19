import "@/styles/index.less";

import { ConfigProvider } from "antd";
import React from "react";
import { createRoot } from "react-dom/client";

import ErrorBoundary from "@/components/ErrorBoundary";
import { versionShow } from "@/utils";

import App from "./App";
const root = createRoot(document.getElementById("root") || document.body);

root.render(
  <React.StrictMode>
    <ConfigProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ConfigProvider>
  </React.StrictMode>,
);
versionShow();

window.onerror = (...arg: unknown[]) => {
  console.log(arg);
};
