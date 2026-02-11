import { RootState } from "@/app/redux/store";
import { getMenuConfigByRole } from "@/app/router/menu.config";
import { useAuthStore } from "@/app/store/auth.store";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps } from "antd";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// 2. Định nghĩa kiểu MenuItem để TypeScript hiểu cấu trúc
type MenuItem = Required<MenuProps>["items"][number];

export default function UserNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((s: RootState) => s.auth);
  const logout = useAuthStore((s) => s.logout);

  if (!user) return null;

  const menuItems = getMenuConfigByRole(user.role);

  /**
   * 3. LOGIC ACTIVE MENU CẢI TIẾN (ĐỆ QUY)
   * Giúp menu sáng kể cả khi vào route con (VD: /study/123 -> Sáng menu Study)
   * và loại bỏ hoàn toàn việc dùng 'any'.
   */
  const getSelectedKeys = () => {
    const { pathname } = location;
    const keys: string[] = [];

    // Hàm đệ quy duyệt qua cây menu
    const findKeys = (items: MenuItem[]) => {
      items.forEach((item) => {
        // Kiểm tra an toàn: item phải tồn tại và có key
        if (!item || !("key" in item) || !item.key) return;

        const itemKey = item.key as string;

        // Logic so khớp:
        // 1. Nếu pathname bắt đầu bằng key (VD: /study/new bắt đầu bằng /study)
        // 2. Loại trừ trường hợp trang chủ '/' (vì mọi path đều bắt đầu bằng /)
        if (pathname.startsWith(itemKey) && itemKey !== "/") {
          keys.push(itemKey);
        }

        // Xử lý riêng cho trang chủ (chỉ active khi khớp hoàn toàn)
        if (itemKey === "/" && pathname === "/") {
          keys.push(itemKey);
        }

        // Nếu có con (children), tiếp tục đệ quy
        // Ép kiểu nhẹ ở đây vì Antd type definition cho children hơi phức tạp
        const itemChildren = (item as { children?: MenuItem[] }).children;
        if (itemChildren && itemChildren.length > 0) {
          findKeys(itemChildren);
        }
      });
    };

    if (menuItems) {
      findKeys(menuItems);
    }

    // Luôn active chính pathname hiện tại (để khớp với các mục con cụ thể)
    keys.push(pathname);

    // Loại bỏ các key trùng lặp (nếu có)
    return Array.from(new Set(keys));
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <Layout.Header className="user-navbar">
      {/* Logo */}
      <button
        type="button"
        className="user-navbar__logo"
        onClick={() => navigate("/")}
      >
        <img src="/image/logo/logo_bequang.png" alt="CS Box logo" />
        <span>CS Box UIT</span>
      </button>

      {/* Menu */}
      <Menu
        theme="dark"
        mode="horizontal"
        // Áp dụng logic lấy key mới
        selectedKeys={getSelectedKeys()}
        items={menuItems}
        className="user-navbar__menu"
        onClick={({ key }) => navigate(key)}
        style={{ flex: 1, minWidth: 0 }}
      />

      {/* Logout */}
      <Button
        type="text"
        danger
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        className="user-navbar__logout"
      >
        Đăng xuất
      </Button>
    </Layout.Header>
  );
}
