import { Image, Layout as AntdLayout, Menu, MenuProps } from "antd";
import { SubMenuType } from "antd/es/menu/hooks/useItems";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { HOME_PARENT, HOME_PATH, routes } from "@/router";

type MenuItem = Required<MenuProps>["items"][number];

type SelectEventHandler = MenuProps["onSelect"];

const formatRouteToMenuItem = (route: (typeof routes)[number]) => {
  const menuItem: MenuItem = {
    key: route.path || "",
  };
  if (route.meta?.title) {
    menuItem.label = route.meta.title;
  }
  if (route.path) {
    menuItem.key = route.path;
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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location]);

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([HOME_PATH]);

  const selectHandler: SelectEventHandler = (e) => {
    navigate(e.key);
  };

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
        selectedKeys={selectedKeys}
        defaultOpenKeys={[HOME_PARENT]}
        mode="inline"
        items={getMenuByRoutes()}
        onSelect={selectHandler}
      />
    </AntdLayout.Sider>
  );
};

export default LayoutSider;
