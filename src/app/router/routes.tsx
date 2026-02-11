// src/app/router/routes.tsx
import DashboardPage from "@/modules/dashboard/DashboardPage";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import UnauthorizedPage from "@/pages/UnauthorizedPage";
import type { Role } from "@/utils/role";
import { ROLES } from "@/utils/role";
import { profileRoutes } from "./configs/profile.routes";
import { studyRoutes } from "./configs/study.routes";
import { userRoutes } from "./configs/user.routes";
import NotFoundPage from "@/pages/NotFoundPage";

export interface AppRoute {
  path: string;
  element?: React.ReactNode;
  isProtected?: boolean;
  allowedRoles?: Role[];
  menuLabel?: string;
  icon?: React.ReactNode; // Thêm icon cho đẹp (optional)
  children?: AppRoute[]; // <--- Thêm dòng này để hỗ trợ Sub-menu
}

export const routes: AppRoute[] = [
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/unauthorized", element: <UnauthorizedPage /> },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF],
    menuLabel: "Dashboard",
  },
  // Spread các biến đã tách vào đây
  userRoutes,
  studyRoutes,
  profileRoutes,
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
