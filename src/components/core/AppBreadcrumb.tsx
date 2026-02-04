import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import { routes } from "@/app/router/routes";
import { findRouteConfig } from "@/utils/router.helper";

export default function AppBreadcrumb() {
  const location = useLocation();

  // Tách URL thành các phần: /study/123/edit -> ["study", "123", "edit"]
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  // Tạo danh sách breadcrumb items
  const breadcrumbItems = pathSnippets.map((_, index) => {
    // Tái tạo lại đường dẫn url từ đầu đến vị trí hiện tại
    // VD: index 0 -> /study
    // VD: index 1 -> /study/123
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

    // Tìm cấu hình route tương ứng để lấy menuLabel
    const routeConfig = findRouteConfig(routes, url);

    // Xác định tên hiển thị
    let label = routeConfig?.menuLabel;

    // Xử lý trường hợp không có label (thường là Dynamic ID: 123, abc)
    if (!label) {
      // Nếu là ID, hiển thị chính nó hoặc text mặc định
      // Bạn có thể custom logic ở đây để đẹp hơn
      label = `Chi tiết (${pathSnippets[index]})`;
    }

    // Item cuối cùng thì không cần Link (chỉ là text)
    const isLast = index === pathSnippets.length - 1;

    return {
      key: url,
      title: isLast ? <span>{label}</span> : <Link to={url}>{label}</Link>,
    };
  });

  // Thêm "Trang chủ" vào đầu
  const finalItems = [
    {
      key: "/",
      title: <Link to="/dashboard">Trang chủ</Link>,
    },
    ...breadcrumbItems,
  ];

  return <Breadcrumb items={finalItems} style={{ margin: "16px 0" }} />;
}
