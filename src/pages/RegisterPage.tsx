import { useAuthStore } from "@/app/store/auth.store";
import CSButton from "@/components/core/CSButton/CSButton";
import { useToast } from "@/components/core/CSToast";
import { usePageTitle } from "@/hooks/userPageTitle";
import { redirectByRole } from "@/utils/redirectByRole";
import { ROLES, Role } from "@/utils/role";
import { Card, Form, Input, Select, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function RegisterPage() {
  const { toast } = useToast();
  const register = useAuthStore((s) => s.register);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  usePageTitle("Trang đăng ký");

  const onFinish = (values: {
    username: string;
    password: string;
    confirmPassword: string;
    role: Role;
  }) => {
    setLoading(true);

    setTimeout(() => {
      const result = register({
        username: values.username,
        password: values.password,
        role: values.role,
      });

      if (!result.success) {
        toast(result.message, "error");
        setLoading(false);
        return;
      }

      toast(
        "Đăng ký thành công. Đang chuyển đến khu vực của bạn...",
        "success",
      );
      navigate(redirectByRole(values.role), { replace: true });
    }, 700);
  };

  return (
    <Card style={{ width: 420, margin: "70px auto" }}>
      <Title level={3}>Đăng ký tài khoản</Title>
      <Paragraph type="secondary" style={{ marginTop: -8 }}>
        Chọn vai trò phù hợp để truy cập khu vực Admin / Staff / User sau khi
        tạo tài khoản.
      </Paragraph>

      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ role: ROLES.USER }}
      >
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
        >
          <Input placeholder="Ví dụ: minhnguyen" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu" },
            { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
          ]}
        >
          <Input.Password placeholder="Tối thiểu 6 ký tự" />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp"),
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" />
        </Form.Item>

        <Form.Item
          label="Vai trò"
          name="role"
          rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
        >
          <Select
            options={[
              { value: ROLES.ADMIN, label: "Admin" },
              { value: ROLES.STAFF, label: "Staff" },
              { value: ROLES.USER, label: "User" },
            ]}
          />
        </Form.Item>

        <CSButton
          type="submit"
          size="lg"
          style={{ width: "100%" }}
          loading={loading}
        >
          Tạo tài khoản
        </CSButton>
      </Form>
    </Card>
  );
}
