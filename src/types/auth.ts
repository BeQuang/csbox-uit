import { Role } from "@/utils/role";

export interface Props {
  children: React.ReactNode;
}

export interface User {
  id: number;
  username: string;
  role: Role;
}
