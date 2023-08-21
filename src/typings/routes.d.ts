import { IndexRouteObject, NonIndexRouteObject } from "react-router-dom";

export interface IndexRouteMenu extends IndexRouteObject {
  path: string;
  meta?: {
    title?: string;
    icon?: React.ReactNode;
  };
  children?: undefined;
}

export interface NonIndexRouteMenu extends NonIndexRouteObject {
  path: string;
  meta?: {
    title?: string;
    icon?: React.ReactNode;
  };
  children?: RouteMenu[];
}

export type RouteMenu = IndexRouteMenu | NonIndexRouteMenu;
