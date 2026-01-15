import { Layout, Menu, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "@/app/redux/store";
import { getMenuConfigByRole } from "@/app/router/menu.config";
import { useAuthStore } from "@/app/store/auth.store";

export default function UserNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((s: RootState) => s.auth);
  const logout = useAuthStore((s) => s.logout);

  if (!user) return null;

  const menuItems = getMenuConfigByRole(user.role).map((item) => ({
    key: item.key,
    label: item.label,
    onClick: () => navigate(item.path),
  }));

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <Layout.Header className="user-navbar">
      {/* Logo */}
      <div className="user-navbar__logo">My App</div>

      {/* Menu */}
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname.split("/")[1]]}
        items={menuItems}
        className="user-navbar__menu"
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
