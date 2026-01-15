import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { redirectByRole } from "@/utils/redirectByRole";
import { Props } from "@/types/auth";

export const GuestRoute = ({ children }: Props) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  // Đã login → đá về trang đúng role
  if (isAuthenticated && user?.role) {
    return <Navigate to={redirectByRole(user.role)} replace />;
  }

  return children;
};
