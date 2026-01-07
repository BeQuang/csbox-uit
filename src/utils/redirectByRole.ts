import { Role, ROLES } from "@/utils/role";

export function redirectByRole(role: Role): string {
  switch (role) {
    case ROLES.ADMIN:
    case ROLES.STAFF:
      return "/dashboard";

    case ROLES.USER:
      return "/profile";

    default:
      return "/";
  }
}
