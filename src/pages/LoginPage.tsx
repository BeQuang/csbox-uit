import { Button, Card, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/app/store/auth.store";
import { redirectByRole } from "@/utils/redirectByRole";

const { Title } = Typography;

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const onFinish = (values: { username: string; password: string }) => {
    const success = login(values.username, values.password);

    if (!success || !user) {
      message.error("Sai tài khoản hoặc mật khẩu");
      return;
    }

    navigate(redirectByRole(user.role), { replace: true });
  };

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

        <Button type="primary" htmlType="submit" block>
          Đăng nhập
        </Button>
      </Form>
    </Card>
  );
}
