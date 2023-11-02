import { Layout as AntdLayout } from "antd";
import { FC, ReactNode, useEffect } from "react";

import PageLoading from "@/components/PageLoading";
import { useScreenSize } from "@/hooks/useScreenSize";

import LayoutHeader from "./LayoutHeader";
import LayoutSider from "./LayoutSider";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { isMobile, observe, disconnect } = useScreenSize(768);
  useEffect(() => {
    observe();
    return () => disconnect();
  }, []);

  return (
    <AntdLayout hasSider className="h-full">
      {isMobile ? "" : <LayoutSider />}
      <AntdLayout>
        <LayoutHeader isMobile={isMobile} />
        <AntdLayout.Content className="overflow-auto">
          <PageLoading>{children}</PageLoading>
        </AntdLayout.Content>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
