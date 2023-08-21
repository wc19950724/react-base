import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { OpenChangeHandler, SelectEventHandler } from "@/typings/antd";
import { RouteMenu } from "@/typings/routes";
import { formatMenuByRoute, getOpenKeysBySelectedKeys } from "@/utils/layout";

export const useMenuByRoutes = <T extends RouteMenu[]>(routes: T) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const menu = routes
    .map((route) => formatMenuByRoute(route))
    .filter((route) => route.key && route.label);

  const onSelect: SelectEventHandler = (e) => {
    navigate(e.key);
  };

  const onOpenChange: OpenChangeHandler = (e) => {
    setOpenKeys(e);
  };

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location]);

  useEffect(() => {
    const keys = getOpenKeysBySelectedKeys(selectedKeys, menu);
    setOpenKeys(keys);
  }, [selectedKeys]);

  return {
    menu,
    selectedKeys,
    openKeys,
    onSelect,
    onOpenChange,
  };
};

export const useSider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (value: boolean) => {
    setCollapsed(value);
  };
  return {
    collapsed,
    onCollapse,
  };
};
