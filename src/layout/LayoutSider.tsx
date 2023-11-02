import { Image, Layout as AntdLayout } from "antd";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { useSider } from "@/hooks/useLayoutSider";

import LayoutMenu from "./LayoutMenu";
import styles from "./styles.module.less";

const LayoutSider = () => {
  const navigate = useNavigate();
  const { collapsed, onCollapse } = useSider();

  const goHome = () => {
    navigate("/");
  };

  return (
    <AntdLayout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div
        style={{ height: "64px" }}
        className="flex items-center justify-center"
      >
        <Image
          height={collapsed ? 34 : 54}
          preview={false}
          onClick={goHome}
          className={classNames(styles["logo"])}
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
        />
      </div>
      <LayoutMenu theme="dark" />
    </AntdLayout.Sider>
  );
};

export default LayoutSider;
