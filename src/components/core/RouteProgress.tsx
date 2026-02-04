import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

// Cấu hình NProgress (tùy chỉnh màu sắc trong file css hoặc scss global)
nprogress.configure({ showSpinner: false, speed: 500 });

export default function RouteProgress() {
  const location = useLocation();

  useEffect(() => {
    // Khi URL thay đổi -> Bắt đầu chạy
    nprogress.start();

    // Kết thúc ngay sau đó (để tạo cảm giác đã load xong)
    // Trong thực tế với Lazy Load, Suspense sẽ giữ UI, nhưng NProgress tạo cảm giác phản hồi nhanh
    const timer = setTimeout(() => {
      nprogress.done();
    }, 300); // Delay nhỏ để mắt người kịp nhìn thấy

    return () => {
      clearTimeout(timer);
      nprogress.done();
    };
  }, [location]);

  return null; // Component này không render ra UI, chỉ chạy logic
}
