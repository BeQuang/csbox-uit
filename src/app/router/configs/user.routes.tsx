// src/app/router/configs/user.routes.tsx
import { AppRoute } from "../routes";
import { ROLES } from "@/utils/role";
import UsersPage from "@/modules/users/UsersPage";
import UserRoles from "@/modules/users/UserRoles";

export const userRoutes: AppRoute = {
  path: "/users",
  isProtected: true,
  allowedRoles: [ROLES.ADMIN],
  menuLabel: "Quản lý User",
  element: <UsersPage />,
  children: [
    {
      path: "/users/list",
      element: <UsersPage />,
      menuLabel: "Danh sách User",
      allowedRoles: [ROLES.ADMIN],
    },
    {
      path: "/users/roles",
      element: <UserRoles />,
      menuLabel: "Phân quyền",
      allowedRoles: [ROLES.ADMIN],
      children: [
        {
          path: "/users/roles/new",
          element: <div>Giao diện tạo mới Role</div>,
        },
      ],
    },
  ],
};
