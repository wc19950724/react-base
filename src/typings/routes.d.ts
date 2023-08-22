import { IndexRouteObject, NonIndexRouteObject } from "react-router-dom";

export interface RouteMetaType {
  title?: string;
  icon?: React.ReactNode;
}

export interface IndexRouteMenu extends IndexRouteObject {
  path: string;
  meta?: RouteMetaType;
  children?: undefined;
}

export interface NonIndexRouteMenu extends NonIndexRouteObject {
  path: string;
  meta?: RouteMetaType;
  children?: RouteMenu[];
}

export type RouteMenu = IndexRouteMenu | NonIndexRouteMenu;

export type MenuItem = RouteMetaType & {
  key: string;
  label?: RouteMetaType["title"];
  children?: MenuItem[];
};
