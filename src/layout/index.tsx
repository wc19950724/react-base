import { Layout as AntdLayout } from "antd";
import { Outlet } from "react-router-dom";

import PageLoading from "@/components/PageLoading";

import LayoutHeader from "./LayoutHeader";
import LayoutSider from "./LayoutSider";

const Layout = () => {
  return (
    <AntdLayout hasSider className="h-full">
      <LayoutSider />
      <AntdLayout>
        <LayoutHeader />
        <AntdLayout.Content className="overflow-auto">
          <PageLoading>
            <Outlet />
          </PageLoading>
        </AntdLayout.Content>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
