import { PieChartOutlined } from "@ant-design/icons";
import { lazy, ReactNode } from "react";
import { IndexRouteObject, NonIndexRouteObject } from "react-router-dom";

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
