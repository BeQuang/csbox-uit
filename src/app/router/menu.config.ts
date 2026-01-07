import { Role, ROLES } from "@/utils/role";

export interface AppMenuItem {
  key: string;
  label: string;
  path: string;
  allowedRoles: Role[];
}

export const MENU_CONFIG: AppMenuItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF],
  },
  {
    key: "users",
    label: "Users",
    path: "/users",
    allowedRoles: [ROLES.ADMIN],
  },
  {
    key: "profile",
    label: "Profile",
    path: "/profile",
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF, ROLES.USER],
  },
];
