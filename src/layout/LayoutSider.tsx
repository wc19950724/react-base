import { Image, Layout as AntdLayout, Menu } from "antd";

import { useMenuByRoutes, useSider } from "@/hooks/useLayoutSider";
import { routes } from "@/router";

const LayoutSider = () => {
  const { collapsed, onCollapse } = useSider();
  const { menu, selectedKeys, openKeys, onSelect, onOpenChange } =
    useMenuByRoutes(routes);

  return (
    <AntdLayout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
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
        openKeys={openKeys}
        mode="inline"
        items={menu}
        onSelect={onSelect}
        onOpenChange={onOpenChange}
      />
    </AntdLayout.Sider>
  );
};

export default LayoutSider;
