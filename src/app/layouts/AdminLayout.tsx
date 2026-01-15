import { RootState } from "@/app/redux/store";
import { getMenuConfigByRole } from "@/app/router/menu.config";
import { useAuthStore } from "@/app/store/auth.store";
import { Props } from "@/types/auth";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";

const { Sider, Content } = Layout;

export default function AppLayout({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
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
        />

        <div className="app-layout__logout">
          <Button danger icon={<LogoutOutlined />} onClick={handleLogout} block>
            Đăng xuất
          </Button>
        </div>
      </Sider>

      <Layout>
        <Content className="app-layout__content">{children}</Content>
      </Layout>
    </Layout>
  );
}
