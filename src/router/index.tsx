import { PieChartOutlined } from "@ant-design/icons";
import { lazy, ReactNode } from "react";
import {
  IndexRouteObject,
  Navigate,
  NonIndexRouteObject,
} from "react-router-dom";

import Layout from "@/layout";

export interface IndexRouteMenu extends IndexRouteObject {
  meta?: {
    title?: string;
    icon?: ReactNode;
  };
  children?: undefined;
}

export interface NonIndexRouteMenu extends NonIndexRouteObject {
  meta?: {
    title?: string;
    icon?: ReactNode;
  };
  children?: RouteMenu[];
}

export type RouteMenu = IndexRouteMenu | NonIndexRouteMenu;

export const HOME_PATH = "/index";
export const HOME_PARENT = "/";

export const routes: RouteMenu[] = [
  {
    path: "/",
    element: <Layout />,
    meta: {
      title: "首页",
      icon: <PieChartOutlined />,
    },
    children: [
      {
        index: true,
        path: "/",
        element: <Navigate to={HOME_PATH} />, // 重定向到 /index
      },
      {
        path: HOME_PATH,
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
        path: "*",
        Component: lazy(() => import("@/components/NotFound")),
      },
    ],
  },
];
