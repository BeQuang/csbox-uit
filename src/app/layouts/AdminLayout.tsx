import { RootState } from "@/app/redux/store";
import { getMenuConfigByRole } from "@/app/router/menu.config";
import { useAuthStore } from "@/app/store/auth.store";
import AppBreadcrumb from "@/components/core/AppBreadcrumb";
import RouteProgress from "@/components/core/RouteProgress";
import { Props } from "@/types/auth";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";

const { Sider, Content } = Layout;

export default function AdminLayout({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  const logout = useAuthStore((s) => s.logout);

  const menuItems = user ? getMenuConfigByRole(user.role) : [];

  /**
   * LOGIC XỬ LÝ ACTIVE:
   * Tìm key chính xác nhất để active menu.
   * Nếu đang ở /study/new-interface, nó sẽ tìm xem trong menuItems có
   * mục nào là tiền tố của path này không (ví dụ /study).
   */
  const getSelectedKeys = () => {
    const { pathname } = location;
    const selectedKeys: string[] = [pathname];
    // Duyệt qua menuItems để tìm key cha nếu pathname hiện tại là route con ẩn
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menuItems.forEach((item: any) => {
      // Nếu pathname bắt đầu bằng path của item (ví dụ /users/roles/new bắt đầu bằng /users/roles)
      if (pathname.startsWith(item.key) && item.key !== "/") {
        selectedKeys.push(item.key);
      }
      // Kiểm tra sâu hơn trong các sub-menu
      if (item.children) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        item.children.forEach((sub: any) => {
          if (pathname.startsWith(sub.key)) {
            selectedKeys.push(sub.key);
          }
        });
      }
    });
    return selectedKeys;
  };

  // Menu cha cần mở (luôn lấy phần đầu tiên của path: /users, /study, /profile)
  const rootPath = "/" + location.pathname.split("/")[1];

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <Layout className="app-layout">
      <RouteProgress />
      <Sider width={220} className="app-layout__sider">
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKeys()}
          // TRUYỀN VÀO ĐÂY: Giúp mở rộng menu cha tự động
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

      <Layout>
        <Content className="app-layout__content" style={{ padding: "0 24px" }}>
          {/* 2. Đặt Breadcrumb ngay trên Content */}
          <AppBreadcrumb />
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
