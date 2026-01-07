import type { Role } from "@/utils/role";
import { ROLES } from "@/utils/role";

import DashboardPage from "@/modules/dashboard/DashboardPage";
import ProfilePage from "@/modules/profile/ProfilePage";
import LoginPage from "@/pages/LoginPage";
import UnauthorizedPage from "@/pages/UnauthorizedPage";
import UsersPage from "@/modules/users/UsersPage";
import LandingPage from "@/pages/LandingPage";

export interface AppRoute {
  path: string;
  element: React.ReactNode;
  isProtected?: boolean;
  allowedRoles?: Role[];
}

/**
 * 👉 Add new protected route:
 * - Add object
 * - Define allowedRoles
 */
export const routes: AppRoute[] = [
  {
    path: "/",
    element: <LandingPage />,
    isProtected: false,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF],
  },
  {
    path: "/users",
    element: <UsersPage />,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN],
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF, ROLES.USER],
  },
];
