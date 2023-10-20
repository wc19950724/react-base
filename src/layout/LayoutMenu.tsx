import { Menu, MenuProps } from "antd";

import { useMenuByRoutes } from "@/hooks/useLayoutSider";
import { routes } from "@/router";

type IProps = {
  theme: MenuProps["theme"];
};

const LayoutMenu = (props: IProps) => {
  const { menu, selectedKeys, openKeys, onSelect, onOpenChange } =
    useMenuByRoutes(routes);

  return (
    <Menu
      className="flex-1 overflow-y-auto"
      theme={props.theme}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      mode="inline"
      items={menu}
      onSelect={onSelect}
      onOpenChange={onOpenChange}
    />
  );
};

export default LayoutMenu;
