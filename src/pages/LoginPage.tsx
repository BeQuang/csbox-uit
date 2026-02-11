import { RootState } from "@/app/redux/store";
import { useAuthStore } from "@/app/store/auth.store";
import CSButton from "@/components/core/CSButton/CSButton";
import { useToast } from "@/components/core/CSToast";
import { usePageTitle } from "@/hooks/userPageTitle";
import { redirectByRole } from "@/utils/redirectByRole";
import { Card, Form, Input, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function LoginPage() {
  const { toast } = useToast();
  const login = useAuthStore((s) => s.login);
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const navigate = useNavigate();
  usePageTitle("Trang đăng nhập");

  const [loading, setLoading] = useState(false);

  const onFinish = (values: { username: string; password: string }) => {
    setLoading(true);

    setTimeout(() => {
      const success = login(values.username, values.password, toast);

      if (!success) {
        setLoading(false);
      }
    }, 900);
  };

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      navigate(redirectByRole(user.role), { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <Card style={{ width: 380, margin: "90px auto" }}>
      <Title level={3}>Đăng nhập</Title>
      <Paragraph type="secondary" style={{ marginTop: -8 }}>
        Dùng tài khoản demo: admin/admin123, staff/staff123, user/user123.
      </Paragraph>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input placeholder="Nhập tên tài khoản" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Row gutter={[0, 10]} justify="space-between" align="middle">
          <CSButton type="submit" size="md" loading={loading}>
            Đăng nhập
          </CSButton>
          <CSButton
            variant="outline"
            size="md"
            onClick={() => navigate("/register")}
          >
            Đăng ký tài khoản
          </CSButton>
        </Row>
      </Form>
    </Card>
  );
}
