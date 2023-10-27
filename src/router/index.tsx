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
    path: "/fabric",
    meta: {
      title: "Fabric.js渲染优化",
      icon: <PieChartOutlined />,
    },
    children: [
      {
        path: "/fabric",
        element: <Navigate to="/fabric/object" />,
      },
      {
        path: "/fabric/object",
        Component: lazy(() => import("@/pages/fabric/object")),
        meta: {
          title: "fabric-object",
          icon: <PieChartOutlined />,
        },
      },
      {
        path: "/fabric/group",
        Component: lazy(() => import("@/pages/fabric/group")),
        meta: {
          title: "fabric-group",
          icon: <PieChartOutlined />,
        },
      },
    ],
  },
  {
    path: "/pixi",
    meta: {
      title: "Pixi.js渲染优化",
      icon: <PieChartOutlined />,
    },
    children: [
      {
        path: "/pixi",
        element: <Navigate to="/pixi/index" />,
      },
      {
        path: "/pixi/index",
        Component: lazy(() => import("@/pages/pixi/index")),
        meta: {
          title: "pixi-index",
          icon: <PieChartOutlined />,
        },
      },
    ],
  },
  {
    path: "/three",
    meta: {
      title: "Three.js",
      icon: <PieChartOutlined />,
    },
    children: [
      {
        path: "/three",
        element: <Navigate to="/three/grid" />,
      },
      {
        path: "/three/grid",
        Component: lazy(() => import("@/pages/three/grid")),
        meta: {
          title: "three-grid",
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
