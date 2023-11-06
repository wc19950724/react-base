import { Layout as AntdLayout } from "antd";
import { FC, ReactNode, useEffect, useState } from "react";

import PageLoading from "@/components/PageLoading";
import { useMobileDetect } from "@/hooks/useMobileDetect";

import LayoutHeader from "./LayoutHeader";
import LayoutSider from "./LayoutSider";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { observe, disconnect } = useMobileDetect();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    observe((bool) => {
      setIsMobile(bool);
    });
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
