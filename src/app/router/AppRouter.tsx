import { Routes, Route } from "react-router-dom";
import { AppRoute, routes } from "./routes";
import { ProtectedRoute } from "../guards/ProtectedRoute";
import { GuestRoute } from "../guards/GuestRoute";

// Hàm bổ trợ để trải phẳng tất cả route con ra ngoài
const flattenRoutes = (routeList: AppRoute[]): AppRoute[] => {
  let flat: AppRoute[] = [];
  routeList.forEach((r) => {
    if (r.element) flat.push(r); // Chỉ lấy route có trang cụ thể
    if (r.children) {
      flat = [...flat, ...flattenRoutes(r.children)];
    }
  });
  return flat;
};

export const AppRouter = () => {
  const allFlatRoutes = flattenRoutes(routes); // <--- Trải phẳng mảng

  return (
    <Routes>
      {allFlatRoutes.map((route) => {
        if (route.path === "/login") {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<GuestRoute>{route.element}</GuestRoute>}
            />
          );
        }

        return route.isProtected ? (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute allowedRoles={route.allowedRoles!}>
                {route.element}
              </ProtectedRoute>
            }
          />
        ) : (
          <Route key={route.path} path={route.path} element={route.element} />
        );
      })}
    </Routes>
  );
};
