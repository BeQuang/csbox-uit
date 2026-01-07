import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import type { Role } from "@/utils/role";

interface Props {
  allowedRoles: Role[];
  children: React.ReactNode;
}

export const ProtectedRoute = ({ allowedRoles, children }: Props) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  // 🔥 QUAN TRỌNG: chờ redux-persist hydrate xong
  if (isAuthenticated === undefined) {
    return null; // hoặc loading
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
