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
    path: "/canvas",
    Component: lazy(() => import("@/pages/canvas")),
    meta: {
      title: "Canvas",
      icon: <PieChartOutlined />,
    },
  },
  {
    path: "/test",
    meta: {
      title: "测试",
      icon: <PieChartOutlined />,
    },
    children: [
      {
        path: "/test",
        element: <Navigate to="/test/test" />, // 重定向到 /test/test
      },
      {
        path: "/test/test",
        Component: lazy(() => import("@/pages/welcome")),
        meta: {
          title: "测试页面",
          icon: <PieChartOutlined />,
        },
      },
    ],
  },
  {
    path: "*",
    Component: lazy(() => import("@/components/NotFound")),
  },
];
