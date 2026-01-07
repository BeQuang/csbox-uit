import React from "react"; // Đảm bảo import React
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import type { Role } from "@/utils/role";

interface Props {
  allowedRoles: Role[];
  children: React.ReactNode; // Thay JSX.Element bằng React.ReactNode
}

export const ProtectedRoute = ({ allowedRoles, children }: Props) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra user tồn tại và có role hợp lệ
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Bọc children trong Fragment để đảm bảo kiểu trả về là ReactNode hợp lệ
  return <>{children}</>;
};
