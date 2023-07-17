import React from "react";
import { createRoot } from "react-dom/client";

import ErrorBoundary from "@/components/ErrorBoundary";
import { versionShow } from "@/utils";

import App from "./App";
const root = createRoot(document.getElementById("root") || document.body);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
versionShow();

window.onerror = (...arg: unknown[]) => {
  console.log(arg);
};
