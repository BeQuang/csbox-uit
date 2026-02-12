import type { AppRoute } from "@/app/router/routes";
import PreviewCSButton from "@/modules/admin-guide/item-preview/PreviewCSButton";
import PreviewCSDatePicker from "@/modules/admin-guide/item-preview/PreviewCSDatePicker";
import PreviewCSInput from "@/modules/admin-guide/item-preview/PreviewCSInput";
import PreviewCSModal from "@/modules/admin-guide/item-preview/PreviewCSModal";
import PreviewCSSelect from "@/modules/admin-guide/item-preview/PreviewCSSelect";
import PreviewCSTable from "@/modules/admin-guide/item-preview/PreviewCSTable";
import PreviewCSToast from "@/modules/admin-guide/item-preview/PreviewCSToast";
import { ROLES } from "@/utils/role";

export const coreGuideRoutes: AppRoute = {
  path: "/admin-guide",
  isProtected: true,
  allowedRoles: [ROLES.ADMIN],
  menuLabel: "Hướng dẫn sử dụng",
  children: [
    {
      path: "/admin-guide/CSButton",
      element: <PreviewCSButton />,
      menuLabel: "CSButton",
      allowedRoles: [ROLES.ADMIN],
    },
    {
      path: "/admin-guide/CSTable",
      element: <PreviewCSTable />,
      menuLabel: "CSTable",
      allowedRoles: [ROLES.ADMIN],
    },
    {
      path: "/admin-guide/CSInput",
      element: <PreviewCSInput />,
      menuLabel: "CSInput",
      allowedRoles: [ROLES.ADMIN],
    },
    {
      path: "/admin-guide/CSSelect",
      element: <PreviewCSSelect />,
      menuLabel: "CSSelect",
      allowedRoles: [ROLES.ADMIN],
    },
    {
      path: "/admin-guide/CSModal",
      element: <PreviewCSModal />,
      menuLabel: "CSModal",
      allowedRoles: [ROLES.ADMIN],
    },
    {
      path: "/admin-guide/CSDatePicker",
      element: <PreviewCSDatePicker />,
      menuLabel: "CSDatePicker",
      allowedRoles: [ROLES.ADMIN],
    },
    {
      path: "/admin-guide/CSToast",
      element: <PreviewCSToast />,
      menuLabel: "CSToast",
      allowedRoles: [ROLES.ADMIN],
    },
  ],
};
