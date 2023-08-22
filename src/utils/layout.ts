import { SubMenuType } from "antd/es/menu/hooks/useItems";

import { MenuItem, RouteMenu } from "@/typings/routes";

/**
 * 通过路由配置格式化菜单配置
 * @param {RouteMenu} route 每一项路由配置
 * @returns menuItem 路由配置对应格式化的菜单配置
 */
export const formatMenuByRoute = <T extends RouteMenu>(route: T) => {
  const menuItem: MenuItem = {
    key: route.path,
  };
  if (route.meta?.title) {
    menuItem.label = route.meta.title;
  }
  if (route.meta?.icon) {
    menuItem.icon = route.meta.icon;
  }
  if (route.children?.length) {
    const children = route.children
      .map((child) => formatMenuByRoute(child))
      .filter((child) => child.key && child.label);
    menuItem.children = children;
  }

  return menuItem;
};

/**
 * 通过当前选中的菜单项 key 数组 获取 当前展开的 SubMenu 菜单项 key 数组
 * @param {string[]} selectedKeys 通过当前选中的菜单项key数组
 * @returns {string[]} openKeys 当前展开的 SubMenu 菜单项 key 数组
 */
export const getOpenKeysBySelectedKeys = <T extends string, K extends MenuItem>(
  selectedKeys: T[],
  menu: K[],
): T[] => {
  const findOpenKeys = (currentMenu: K[]): T[] => {
    return currentMenu.reduce((openKeys, item) => {
      const key = item?.key as T;
      const children = (item as SubMenuType).children;
      if (key && selectedKeys.indexOf(key) > -1) {
        openKeys.push(key);
      }
      if (children?.length) {
        const childOpenKeys = findOpenKeys(children as K[]);
        return openKeys.concat(childOpenKeys.length ? [key] : []);
      }
      return openKeys;
    }, [] as T[]);
  };

  return findOpenKeys(menu);
};
