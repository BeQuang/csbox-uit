// src/app/router/menu.config.ts
import { routes } from "./routes";
import type { Role } from "@/utils/role";

export interface AppMenuItem {
  key: string;
  label: string;
  path: string;
  allowedRoles: Role[];
}

export const getMenuConfigByRole = (role: Role): AppMenuItem[] =>
  routes
    .filter(
      (r) => r.menuLabel && r.allowedRoles && r.allowedRoles.includes(role)
    )
    .map((r) => ({
      key: r.path.replace("/", ""),
      label: r.menuLabel!,
      path: r.path,
      allowedRoles: r.allowedRoles!,
    }));
