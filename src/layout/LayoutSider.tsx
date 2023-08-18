import { Image, Layout as AntdLayout, Menu, MenuProps } from "antd";
import { SubMenuType } from "antd/es/menu/hooks/useItems";
import { useState } from "react";

import { routes } from "@/router";

type MenuItem = Required<MenuProps>["items"][number];

const formatRouteToMenuItem = (route: (typeof routes)[number]) => {
  const menuItem: MenuItem = {
    key: route.path || "",
  };
  if (route.meta?.title) {
    menuItem.label = route.meta.title;
  }
  if (route.path) {
    menuItem.key = route.path;
  } else if (route.index) {
    menuItem.key = "/index";
  }
  if (route.meta?.icon) {
    menuItem.icon = route.meta.icon;
  }
  if (route.children?.length) {
    const children = route.children
      .map((child) => formatRouteToMenuItem(child))
      .filter((child) => child.key && child.label);
    (menuItem as SubMenuType).children = children;
  }

  return menuItem;
};

const getMenuByRoutes = (): MenuItem[] => {
  return routes
    .map((route) => formatRouteToMenuItem(route))
    .filter((route) => route.key && route.label);
};

const LayoutSider = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AntdLayout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{ height: "64px" }}
        className="flex items-center justify-center"
      >
        <Image
          height={collapsed ? 34 : 54}
          preview={false}
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
        />
      </div>
      <Menu
        className="flex-1 overflow-y-auto"
        theme="dark"
        defaultSelectedKeys={["/index"]}
        defaultOpenKeys={["/"]}
        mode="inline"
        items={getMenuByRoutes()}
      />
    </AntdLayout.Sider>
  );
};

export default LayoutSider;
