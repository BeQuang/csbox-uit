import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import PublicLayout from "./PublicLayout";
import UserLayout from "./UserLayout";
import AppLayout from "./AdminLayout";

interface Props {
  children: React.ReactNode;
}

export default function LayoutSwitch({ children }: Props) {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (isAuthenticated === undefined) return null;

  if (!isAuthenticated || !user) {
    return <PublicLayout>{children}</PublicLayout>;
  }

  if (user.role === "USER") {
    return <UserLayout>{children}</UserLayout>;
  }

  return <AppLayout>{children}</AppLayout>;
}
