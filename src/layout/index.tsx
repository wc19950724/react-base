import { Layout as AntdLayout } from "antd";
import { FC, ReactNode } from "react";

import PageLoading from "@/components/PageLoading";

import LayoutHeader from "./LayoutHeader";
import LayoutSider from "./LayoutSider";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AntdLayout hasSider className="h-full">
      <LayoutSider />
      <AntdLayout>
        <LayoutHeader />
        <AntdLayout.Content className="overflow-auto">
          <PageLoading>{children}</PageLoading>
        </AntdLayout.Content>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
