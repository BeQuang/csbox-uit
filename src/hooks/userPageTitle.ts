import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routes } from "@/app/router/routes";
import { findRouteConfig } from "@/utils/router.helper";

/**
 * Hook tự động cập nhật document.title dựa trên route hiện tại
 * @param defaultTitle Tiêu đề mặc định nếu không tìm thấy config
 */
export const usePageTitle = (defaultTitle: string = "My App Platform") => {
  const location = useLocation();

  useEffect(() => {
    // 1. Tìm config của route hiện tại
    const route = findRouteConfig(routes, location.pathname);

    // 2. Lấy label (ưu tiên menuLabel, nếu không có thì dùng default)
    // Bạn có thể mở rộng AppRoute để thêm thuộc tính "pageTitle" riêng nếu muốn khác menuLabel
    const label = route?.menuLabel;

    if (label) {
      document.title = `${label} | ${defaultTitle}`;
    } else {
      // Trường hợp trang chi tiết hoặc trang không có menuLabel
      // Có thể xử lý logic riêng ở đây nếu muốn (VD: check ID)
      document.title = defaultTitle;
    }
  }, [location, defaultTitle]);
};
