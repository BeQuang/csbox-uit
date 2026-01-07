import { Layout, Menu, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAuthStore } from "@/app/store/auth.store";
import { MENU_CONFIG } from "@/app/router/menu.config";
import { RootState } from "@/app/redux/store";

import "./AppLayout.scss";

const { Sider, Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

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
    <Layout className="app-layout">
      <Sider width={220} className="app-layout__sider">
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname.split("/")[1]]}
          items={menuItems}
          className="app-layout__menu"
        />

        {isAuthenticated && (
          <div className="app-layout__logout">
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
        <Content className="app-layout__content">{children}</Content>
      </Layout>
    </Layout>
  );
}
