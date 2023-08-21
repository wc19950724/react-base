import { MenuProps } from "antd";

export type MenuItem = Required<MenuProps>["items"][number];

export type SelectEventHandler = MenuProps["onSelect"];

export type OpenChangeHandler = MenuProps["onOpenChange"];
