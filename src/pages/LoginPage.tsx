import { Card, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/app/store/auth.store";
import { redirectByRole } from "@/utils/redirectByRole";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useEffect, useState } from "react";
import CSButton from "@/components/core/CSButton/CSButton";
import { usePageTitle } from "@/hooks/userPageTitle";

const { Title } = Typography;

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const navigate = useNavigate();
  usePageTitle("Trang đăng nhập");

  const [loading, setLoading] = useState(false);

  const onFinish = (values: { username: string; password: string }) => {
    setLoading(true);

    // ⏳ fake delay để giả lập gọi API
    setTimeout(() => {
      const success = login(values.username, values.password);

      if (!success) {
        message.error("Sai tài khoản hoặc mật khẩu");
        setLoading(false);
      }
    }, 1200);
  };

  // 👇 Khi redux auth đổi -> redirect
  useEffect(() => {
    if (isAuthenticated && user?.role) {
      navigate(redirectByRole(user.role), { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <Card style={{ width: 360, margin: "100px auto" }}>
      <Title level={3}>Đăng nhập</Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input placeholder="admin / staff / user" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="admin123 / staff123 / user123" />
        </Form.Item>

        <CSButton
          type="submit"
          size="lg"
          style={{ width: "100%" }}
          loading={loading}
        >
          Đăng nhập
        </CSButton>
      </Form>
    </Card>
  );
}
