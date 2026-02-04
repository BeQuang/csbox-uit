import { MenuProps } from "antd";
import { AppRoute, routes } from "./routes";
import type { Role } from "@/utils/role";

// Sử dụng Type chuẩn của Ant Design
type MenuItem = Required<MenuProps>["items"][number];

export const getMenuConfigByRole = (
  role: Role,
  routeList: AppRoute[] = routes,
): MenuItem[] => {
  return routeList
    .filter((r) => r.menuLabel && r.allowedRoles?.includes(role))
    .map((r) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const item: any = {
        key: r.path,
        label: r.menuLabel,
        icon: r.icon,
      };

      if (r.children && r.children.length > 0) {
        // QUAN TRỌNG: Phải gọi lại chính nó để tạo mảng children
        const children = getMenuConfigByRole(role, r.children);
        if (children.length > 0) {
          item.children = children;
        }
      }
      return item as MenuItem;
    });
};
