import CSButton from "@/components/core/CSButton/CSButton";
import CSInput from "@/components/core/CSInput/CSInput";
import { useToast } from "@/components/core/CSToast";
import {
  Bell,
  Camera,
  Mail,
  RefreshCw,
  Rocket,
  Save,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const { toast } = useToast();
  const [fullName, setFullName] = useState("Admin Test");

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        display: "flex",
        gap: "50px",
        margin: "0 auto",
      }}
    >
      {/* KHU VỰC FORM CHÍNH */}
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
          Hồ sơ cá nhân
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User size={40} color="#94a3b8" />
            </div>
            <CSButton
              variant="outline"
              size="sm"
              onClick={() => toast("Tính năng đổi ảnh đang bảo trì", "warning")}
            >
              <Camera size={16} /> Đổi ảnh đại diện
            </CSButton>
          </div>

          <CSInput
            label="Họ và tên"
            value={fullName}
            onChange={setFullName}
            prependIcon={<User size={16} />}
          />
          <CSInput
            label="Email"
            value="admin@test.com"
            disabled
            prependIcon={<Mail size={16} />}
          />

          <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
            <CSButton
              color="success"
              onClick={() => toast("Lưu thay đổi thành công!", "success")}
            >
              <Save size={16} /> Lưu thay đổi
            </CSButton>
            <CSButton
              color="danger"
              variant="ghost"
              onClick={() => toast("Xác nhận xóa tài khoản qua email", "info")}
            >
              <Trash2 size={16} /> Xóa tài khoản
            </CSButton>
          </div>
        </div>
      </div>

      {/* KHU VỰC DEBUG/TEST SONNER */}
      <div
        style={{
          width: "350px",
          padding: "24px",
          border: "1px solid #e2e8f0",
          backgroundColor: "#f8fafc",
          borderRadius: "12px",
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 600,
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Bell size={18} /> Debug Toast Cases
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Case 1: Truyền String đơn giản */}
          <CSButton
            width="full"
            variant="outline"
            onClick={() => toast("Đây là thông báo mặc định")}
          >
            Default Toast
          </CSButton>

          {/* Case 2: Success có Description */}
          <CSButton
            width="full"
            variant="outline"
            onClick={() =>
              toast("Thanh toán thành công", {
                type: "success",
                description: "Số dư khả dụng: 10.000.000 VNĐ",
              })
            }
          >
            Success with Description
          </CSButton>

          {/* Case 3: Error có nút Action */}
          <CSButton
            width="full"
            variant="outline"
            onClick={() =>
              toast("Không thể kết nối Server", {
                type: "error",
                action: {
                  label: "Thử lại",
                  onClick: () => console.log("Retrying..."),
                },
              })
            }
          >
            Error with Action
          </CSButton>

          {/* Case 4: Custom Icon */}
          <CSButton
            width="full"
            variant="outline"
            onClick={() =>
              toast("Tăng tốc thành công", {
                icon: <Rocket size={18} color="#f97316" />,
                duration: 5000,
              })
            }
          >
            Custom Icon & Duration
          </CSButton>

          {/* Case 5: Loading State */}
          <CSButton
            width="full"
            variant="outline"
            onClick={() => toast("Đang xử lý dữ liệu...", "loading")}
          >
            <RefreshCw size={14} style={{ marginRight: 8 }} /> Loading State
          </CSButton>

          {/* Case 6: Action lồng trong Info */}
          <CSButton
            width="full"
            color="info"
            onClick={() =>
              toast("Đã xóa tin nhắn", {
                description: "Bạn có 5 giây để khôi phục",
                action: {
                  label: "Undo",
                  onClick: () => toast("Đã hoàn tác", "success"),
                },
                duration: 5000,
              })
            }
          >
            Complex Undo Action
          </CSButton>
        </div>
      </div>
    </div>
  );
}
