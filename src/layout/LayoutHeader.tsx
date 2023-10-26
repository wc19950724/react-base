import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Drawer, Image, Layout as AntdLayout, theme } from "antd";
import classNames from "classnames";
import { useState } from "react";

import LayoutMenu from "./LayoutMenu";
import styles from "./styles.module.less";

interface IProps {
  isMobile: boolean;
}

const LayoutHeader = (props: IProps) => {
  const {
    token: { Layout: LayoutToken },
  } = theme.useToken();

  const PCHeader = () => {
    return "Header";
  };

  const mobileHeader = () => {
    const [open, setOpen] = useState(false);

    const changeOpen = () => {
      setOpen(!open);
    };

    return (
      <>
        <Image
          height={34}
          preview={false}
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
          className={classNames(styles["logo"])}
        />
        <div className={classNames(styles["menu"])} onClick={changeOpen}>
          {open ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </div>
        <Drawer
          width={200}
          closeIcon={false}
          open={open}
          onClose={changeOpen}
          placement="left"
          className={classNames(styles["header-drawer"])}
        >
          <LayoutMenu theme="light" />
        </Drawer>
      </>
    );
  };

  return (
    <AntdLayout.Header
      style={{
        backgroundColor: props.isMobile ? LayoutToken?.colorBgHeader : "#fff",
      }}
      className={classNames(
        styles["layout-header"],
        props.isMobile && [styles["mobile"], "flex", "items-center"],
      )}
    >
      {props.isMobile ? mobileHeader() : PCHeader()}
    </AntdLayout.Header>
  );
};

export default LayoutHeader;
