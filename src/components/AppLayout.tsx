import { Layout, Menu, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAuthStore } from "@/app/store/auth.store";
import { MENU_CONFIG } from "@/app/router/menu.config";
import { RootState } from "@/app/redux/store";

const { Sider, Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Redux: kiểm tra đang đăng nhập hay không
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // Zustand: lấy user + logout action
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const menuItems = MENU_CONFIG.filter(
    (item) => user && item.allowedRoles.includes(user.role)
  ).map((item) => ({
    key: item.key,
    label: item.label,
    onClick: () => navigate(item.path),
  }));

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={220}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* MENU */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname.split("/")[1]]}
          items={menuItems}
          style={{ flex: 1 }}
        />

        {/* 🔥 LOGOUT – CHỈ HIỆN KHI ĐÃ ĐĂNG NHẬP */}
        {isAuthenticated && (
          <div
            style={{
              padding: 16,
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Button
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              block
            >
              Đăng xuất
            </Button>
          </div>
        )}
      </Sider>

      <Layout>
        <Content style={{ padding: 24 }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
