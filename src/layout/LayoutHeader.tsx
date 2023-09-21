import { Layout as AntdLayout, theme } from "antd";

const LayoutHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <AntdLayout.Header style={{ backgroundColor: colorBgContainer }}>
      Header
    </AntdLayout.Header>
  );
};

export default LayoutHeader;
