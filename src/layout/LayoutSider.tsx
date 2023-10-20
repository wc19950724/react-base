import { Image, Layout as AntdLayout } from "antd";

import { useSider } from "@/hooks/useLayoutSider";

import LayoutMenu from "./LayoutMenu";

const LayoutSider = () => {
  const { collapsed, onCollapse } = useSider();

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
      <LayoutMenu theme="dark" />
    </AntdLayout.Sider>
  );
};

export default LayoutSider;
