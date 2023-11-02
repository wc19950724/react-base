import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Drawer, Image, Layout as AntdLayout, theme } from "antd";
import classNames from "classnames";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LayoutMenu from "./LayoutMenu";
import styles from "./styles.module.less";

interface IProps {
  isMobile: boolean;
}

const LayoutHeader = (props: IProps) => {
  const {
    token: { Layout: LayoutToken },
  } = theme.useToken();
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const [open, setOpen] = useState(false);

  const changeOpen = () => {
    setOpen(!open);
  };

  const PCHeader = () => {
    return "Header";
  };

  const mobileHeader = () => {
    return (
      <>
        <Image
          height={34}
          preview={false}
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
          className={classNames(styles["logo"])}
          onClick={goHome}
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
        props.isMobile && [
          styles["mobile"],
          "flex",
          "items-center",
          "justify-between",
        ],
      )}
    >
      {props.isMobile ? mobileHeader() : PCHeader()}
    </AntdLayout.Header>
  );
};

export default LayoutHeader;
