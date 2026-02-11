import type { AppRoute } from "@/app/router/routes";
import { ROLES } from "@/utils/role";
import {
  CSButtonGuidePage,
  CSDatePickerGuidePage,
  CSInputGuidePage,
  CSModalGuidePage,
  CSSelectGuidePage,
  CSTableGuidePage,
  CSToastGuidePage,
} from "../../../modules/admin-guide/core-guide.pages";

export const coreGuideRoutes: AppRoute = {
  path: "/admin-guide",
  isProtected: true,
  allowedRoles: [ROLES.ADMIN],
  menuLabel: "Hướng dẫn sử dụng",
  element: <CSButtonGuidePage />,
  children: [
    {
      path: "/admin-guide/CSButton",
      element: <CSButtonGuidePage />,
      menuLabel: "CSButton",
      allowedRoles: [ROLES.ADMIN],
    },
    {
      path: "/admin-guide/CSTable",
      element: <CSTableGuidePage />,
      menuLabel: "CSTable",
      allowedRoles: [ROLES.ADMIN],
    },
    {
      path: "/admin-guide/CSInput",
      element: <CSInputGuidePage />,
      menuLabel: "CSInput",
      allowedRoles: [ROLES.ADMIN],
    },
    {
      path: "/admin-guide/CSSelect",
      element: <CSSelectGuidePage />,
      menuLabel: "CSSelect",
      allowedRoles: [ROLES.ADMIN],
    },
    {
      path: "/admin-guide/CSModal",
      element: <CSModalGuidePage />,
      menuLabel: "CSModal",
      allowedRoles: [ROLES.ADMIN],
    },
    {
      path: "/admin-guide/CSDatePicker",
      element: <CSDatePickerGuidePage />,
      menuLabel: "CSDatePicker",
      allowedRoles: [ROLES.ADMIN],
    },
    {
      path: "/admin-guide/CSToast",
      element: <CSToastGuidePage />,
      menuLabel: "CSToast",
      allowedRoles: [ROLES.ADMIN],
    },
  ],
};
