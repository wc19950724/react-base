import { PieChartOutlined } from "@ant-design/icons";
import { lazy } from "react";
import { Navigate } from "react-router-dom";

import { RouteMenu } from "@/typings/routes";

export const routes: RouteMenu[] = [
  {
    index: true,
    path: "/",
    element: <Navigate to="/index" />, // 重定向到 /index
  },
  {
    path: "/index",
    Component: lazy(() => import("@/pages/welcome")),
    meta: {
      title: "Welcome",
      icon: <PieChartOutlined />,
    },
  },
  {
    path: "*",
    Component: lazy(() => import("@/components/NotFound")),
  },
];
