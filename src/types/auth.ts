import { Role } from "@/utils/role";

export interface User {
  id: number;
  username: string;
  role: Role;
}
