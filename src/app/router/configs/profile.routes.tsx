// src/app/router/configs/study.routes.tsx
import ProfilePage from "@/modules/profile/ProfilePage";
import { ROLES } from "@/utils/role";
import { AppRoute } from "../routes";

export const profileRoutes: AppRoute = {
  path: "/profile",
  element: <ProfilePage />,
  isProtected: true,
  allowedRoles: [ROLES.ADMIN, ROLES.STAFF, ROLES.USER],
  menuLabel: "Profile",
};
