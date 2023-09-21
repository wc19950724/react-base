import { Spin } from "antd";
import { Suspense, SuspenseProps } from "react";

const PageLoading = ({
  children,
  fallback = <Spin className="all-full-center" />,
}: SuspenseProps) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

export default PageLoading;
