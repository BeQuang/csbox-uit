import { Button, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useAuthStore } from "@/app/store/auth.store";

const { Title, Paragraph } = Typography;

export default function LandingPage() {
  const navigate = useNavigate();

  // Redux → chỉ quan tâm login status
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // Zustand → thực hiện logout
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div style={{ padding: 40 }}>
      <Title>🚀 CORE WEBSITE FOUNDATION</Title>

      <Paragraph>
        Đây là trang giới thiệu. Người dùng có thể truy cập mà không cần đăng
        nhập.
      </Paragraph>

      <Space>
        {!isAuthenticated && (
          <Button type="primary" onClick={() => navigate("/login")}>
            Đăng nhập
          </Button>
        )}

        {isAuthenticated && (
          <>
            <Paragraph type="success" style={{ margin: 0 }}>
              ✅ Bạn đã đăng nhập
            </Paragraph>

            <Button danger onClick={handleLogout}>
              Đăng xuất
            </Button>
          </>
        )}
      </Space>
    </div>
  );
}
