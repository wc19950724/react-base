import { Spin } from "antd";
import { Suspense, SuspenseProps } from "react";

const PageLoading = ({ children, fallback }: SuspenseProps) => {
  return <Suspense fallback={fallback || <Spin />}>{children}</Suspense>;
};

export default PageLoading;
