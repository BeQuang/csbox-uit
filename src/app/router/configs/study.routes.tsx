// src/app/router/configs/study.routes.tsx
import { AppRoute } from "../routes";
import { ROLES } from "@/utils/role";
import StudyPage from "@/modules/study/StudyPage";
import StudyDetail from "@/modules/study/StudyDetail";

export const studyRoutes: AppRoute = {
  path: "/study",
  element: <StudyPage />,
  isProtected: true,
  allowedRoles: [ROLES.ADMIN, ROLES.USER],
  menuLabel: "Study",
  children: [
    {
      // Thay đổi path thành dynamic route
      path: "/study/:id",
      element: <StudyDetail />,
    },
  ],
};
