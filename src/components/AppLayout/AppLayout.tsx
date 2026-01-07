import { Layout, Menu, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAuthStore } from "@/app/store/auth.store";
import { getMenuConfigByRole } from "@/app/router/menu.config";
import { RootState } from "@/app/redux/store";

import "./AppLayout.scss";

const { Sider, Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const logout = useAuthStore((s) => s.logout);

  const menuItems = user
    ? getMenuConfigByRole(user.role).map((item) => ({
        key: item.key,
        label: item.label,
        onClick: () => navigate(item.path),
      }))
    : [];

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
        <Button onClick={() => console.log(user)}>Click nè</Button>

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
