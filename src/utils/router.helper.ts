import { AppRoute } from "@/app/router/routes";
import { matchPath } from "react-router-dom";

/**
 * Tìm route config dựa trên URL hiện tại
 * Hỗ trợ cả nested route và dynamic route (:id)
 */
export const findRouteConfig = (
  routes: AppRoute[],
  pathname: string,
): AppRoute | null => {
  for (const route of routes) {
    // 1. Kiểm tra xem route hiện tại có khớp không
    const match = matchPath(
      {
        path: route.path,
        // Nếu có children thì chỉ cần khớp phần đầu (prefix), ngược lại phải khớp hết
        end: !route.children || route.children.length === 0,
      },
      pathname,
    );

    if (match) {
      // Logic quan trọng:
      // match.pathname là phần URL mà router đã "ăn" được.
      // Nếu phần "ăn" được === pathname đầu vào => Đã tìm thấy đúng route cuối cùng.
      if (match.pathname === pathname) {
        return route;
      }
    }

    // 2. Nếu không phải route đích danh mà có con, đệ quy tìm tiếp
    if (route.children) {
      // Trước khi đệ quy, nên kiểm tra xem route cha này có phải là prefix của pathname không
      // Để tránh tìm kiếm vô ích vào nhánh sai
      const prefixMatch = matchPath({ path: route.path, end: false }, pathname);

      if (prefixMatch) {
        const childMatch = findRouteConfig(route.children, pathname);
        if (childMatch) {
          return childMatch;
        }
      }
    }
  }
  return null;
};
