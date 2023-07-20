import "@/styles/index.less";

import { ConfigProvider } from "antd";
import React from "react";
import { createRoot } from "react-dom/client";

import { versionShow } from "@/utils";

import App from "./App";
const root = createRoot(document.getElementById("root") || document.body);

root.render(
  <React.StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
versionShow();
