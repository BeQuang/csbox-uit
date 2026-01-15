import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { ProtectedRoute } from "../guards/ProtectedRoute";
import { GuestRoute } from "../guards/GuestRoute";

export const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route) => {
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
