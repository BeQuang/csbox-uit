import { RootState } from "@/app/redux/store";
import { getMenuConfigByRole } from "@/app/router/menu.config";
import { useAuthStore } from "@/app/store/auth.store";
import AppBreadcrumb from "@/components/core/AppBreadcrumb";
import RouteProgress from "@/components/core/RouteProgress";
import { usePageTitle } from "@/hooks/userPageTitle";
import { Props } from "@/types/auth";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps } from "antd";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";
import { useToast } from "@/components/core/CSToast";

const { Sider, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export default function AdminLayout({ children }: Props) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  const logout = useAuthStore((s) => s.logout);

  usePageTitle("Admin Portal");

  const menuItems = user ? getMenuConfigByRole(user.role) : [];

  /**
   * Tính toán danh sách các `key` cần được active (bôi đậm) trên Menu.
   * Hỗ trợ menu đa cấp và logic "cha sáng khi con đang được chọn".
   */
  const getSelectedKeys = () => {
    const { pathname } = location; // Lấy đường dẫn hiện tại (ví dụ: /users/create)
    const keys: string[] = [];

    // Hàm đệ quy để duyệt qua toàn bộ cây menu (kể cả menu con)
    const findKeys = (items: MenuItem[]) => {
      items.forEach((item) => {
        // 1. Kiểm tra tính hợp lệ của item (phải có key)
        if (!item || !("key" in item) || !item.key) return;
        const itemKey = item.key as string;

        // 2. Logic so khớp tiền tố (Prefix Matching) - QUAN TRỌNG
        // Nếu đang ở "/users/create", thì menu "/users" cũng phải sáng.
        // Điều kiện: pathname bắt đầu bằng itemKey VÀ itemKey không phải là trang chủ "/"
        // (Lý do loại trừ "/": Vì mọi đường dẫn đều bắt đầu bằng "/", nếu không chặn lại thì menu Trang chủ lúc nào cũng sáng).
        if (pathname.startsWith(itemKey) && itemKey !== "/") {
          keys.push(itemKey);
        }

        // 3. Xử lý riêng cho trang chủ (Dashboard)
        // Trang chủ chỉ sáng khi đường dẫn khớp hoàn toàn là "/"
        if (itemKey === "/" && pathname === "/") {
          keys.push(itemKey);
        }

        // 4. Đệ quy (Recursive)
        // Nếu item này có con (children), tiếp tục gọi hàm findKeys để tìm sâu vào bên trong
        const itemChildren = (item as { children?: MenuItem[] }).children;
        if (itemChildren && itemChildren.length > 0) {
          findKeys(itemChildren);
        }
      });
    };

    // Bắt đầu tìm kiếm từ danh sách menu gốc
    if (menuItems) {
      findKeys(menuItems);
    }

    // 5. Luôn thêm đường dẫn hiện tại vào danh sách
    // Đảm bảo rằng route cụ thể đang đứng (ví dụ /users/create) luôn được chọn
    keys.push(pathname);

    // 6. Loại bỏ các key trùng lặp
    // Set giúp lọc trùng, Array.from chuyển lại thành mảng
    return Array.from(new Set(keys));
  };
  const rootPath = "/" + location.pathname.split("/")[1];

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
    toast("Đăng xuất thành công", "success");
  };

  return (
    // 1. QUAN TRỌNG: Khóa chiều cao Layout bằng đúng chiều cao màn hình (100vh)
    <Layout
      className="app-layout"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <RouteProgress />

      <Sider width={220} className="app-layout__sider">
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKeys()}
          defaultOpenKeys={[rootPath]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />

        <div className="app-layout__logout">
          <Button danger icon={<LogoutOutlined />} onClick={handleLogout} block>
            Đăng xuất
          </Button>
        </div>
      </Sider>

      <Layout
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        {/* 1. Header chứa Breadcrumb (Cố định) */}
        <div className="app-layout__topbar">
          <AppBreadcrumb />
        </div>

        {/* 2. Content chứa nội dung trang (Cuộn) */}
        <Content className="app-layout__content">
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "#fff",
              borderRadius: "8px",
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
