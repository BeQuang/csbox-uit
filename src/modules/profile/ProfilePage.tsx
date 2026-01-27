// @/pages/ProfilePage.tsx
import {
  AlertTriangle,
  Bell,
  Camera,
  CheckCircle,
  Layers,
  Mail,
  Save,
  Settings,
  Trash2,
  User,
} from "lucide-react";
import { useMemo, useState } from "react";

import CSButton from "@/components/core/CSButton/CSButton";
import CSInput from "@/components/core/CSInput/CSInput";
import CSModal from "@/components/core/CSModal/CSModal";
import { useToast } from "@/components/core/CSToast";

// Định nghĩa các loại Modal để tránh gõ nhầm string
type ModalType =
  | "minimal"
  | "info"
  | "success"
  | "warning"
  | "delete"
  | "full"
  | null;

export default function ProfilePage() {
  const { toast } = useToast();
  const [fullName, setFullName] = useState("Admin Test");
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const closeModal = () => setActiveModal(null);

  // 1. Quản lý cấu hình Modal bằng useMemo để tối ưu
  const modalConfig = useMemo(() => {
    switch (activeModal) {
      case "minimal":
        return {
          title: "Modal Tối Giản",
          size: "md" as const,
          content: (
            <p>
              Giao diện phẳng, không viền, không bóng. Phù hợp cho thông báo
              nhẹ.
            </p>
          ),
          footer: (
            <CSButton variant="ghost" onClick={closeModal}>
              Đóng
            </CSButton>
          ),
        };
      case "info":
        return {
          title: "Cấu hình hệ thống",
          color: "info" as const,
          showShadow: true,
          content: (
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <Settings
                className="animate-spin"
                size={32}
                color="var(--color-info)"
              />
              <p>Đang kiểm tra các thông số kỹ thuật ngầm...</p>
            </div>
          ),
          footer: (
            <CSButton color="info" onClick={closeModal}>
              Xác nhận
            </CSButton>
          ),
        };
      case "success":
        return {
          title: "Thanh toán thành công",
          color: "success" as const,
          showBorderTop: true,
          showShadow: true,
          content: (
            <div style={{ textAlign: "center", padding: "10px" }}>
              <CheckCircle
                size={48}
                color="var(--color-success)"
                style={{ marginBottom: "12px" }}
              />
              <p>Hệ thống đã ghi nhận giao dịch của bạn.</p>
            </div>
          ),
          footer: (
            <CSButton color="success" width="full" onClick={closeModal}>
              Tuyệt vời
            </CSButton>
          ),
        };
      case "warning":
        return {
          title: "Cảnh báo bảo mật",
          color: "warning" as const,
          showBorderTop: true,
          content: (
            <div style={{ display: "flex", gap: "12px" }}>
              <AlertTriangle size={32} color="var(--color-warning)" />
              <p>
                Phiên đăng nhập của bạn sắp hết hạn. Vui lòng làm mới trang.
              </p>
            </div>
          ),
          footer: (
            <CSButton color="warning" onClick={closeModal}>
              Làm mới ngay
            </CSButton>
          ),
        };
      case "delete":
        return {
          title: "Xóa dữ liệu?",
          color: "danger" as const,
          size: "sm" as const,
          showBorderTop: true,
          showShadow: true,
          content: (
            <p>
              Hành động này sẽ xóa vĩnh viễn tài khoản <b>{fullName}</b>.
            </p>
          ),
          footer: (
            <>
              <CSButton variant="outline" onClick={closeModal}>
                Hủy
              </CSButton>
              <CSButton
                color="danger"
                onClick={() => {
                  toast("Đã xóa!", "success");
                  closeModal();
                }}
              >
                Xóa
              </CSButton>
            </>
          ),
        };
      case "full":
        return {
          title: "Toàn cảnh hệ thống",
          size: "full" as const,
          content: (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#64748b",
              }}
            >
              <Layers size={100} strokeWidth={1} />
              <h2 style={{ marginTop: "24px" }}>Chế độ xem tập trung</h2>
            </div>
          ),
          footer: <CSButton onClick={closeModal}>Thoát chế độ</CSButton>,
        };
      default:
        return null;
    }
  }, [activeModal, fullName, toast]);

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#1e293b" }}>
          Core UI Dashboard
        </h1>
        <p style={{ color: "#64748b" }}>
          Trang quản lý và kiểm thử hệ thống component tập trung
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {/* SECTION: PROFILE INFO */}
        <section
          style={{
            backgroundColor: "#fff",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            border: "1px solid #f1f5f9",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ fontWeight: 700 }}>Hồ sơ người dùng</h3>
            <CSButton
              variant="ghost"
              size="sm"
              onClick={() => setActiveModal("delete")}
            >
              <Trash2 size={16} color="var(--color-danger)" />
            </CSButton>
          </div>

          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#f8fafc",
                margin: "0 auto 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed #cbd5e1",
              }}
            >
              <User size={40} color="#94a3b8" />
            </div>
            <CSButton variant="outline" size="sm">
              <Camera size={14} /> Đổi ảnh
            </CSButton>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <CSInput
              label="Tên hiển thị"
              value={fullName}
              onChange={setFullName}
              prependIcon={<User size={16} />}
            />
            <CSInput
              label="Email liên hệ"
              value="admin@dev.com"
              disabled
              prependIcon={<Mail size={16} />}
            />
            <CSButton
              color="success"
              width="full"
              onClick={() => toast("Cập nhật thành công", "success")}
            >
              <Save size={16} /> Lưu thay đổi
            </CSButton>
          </div>
        </section>

        {/* SECTION: QUICK ACTIONS & MODAL TESTS */}
        <section
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "24px",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3
              style={{
                fontWeight: 700,
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Bell size={18} /> Thông báo & Modal
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <CSButton
                variant="outline"
                size="sm"
                onClick={() => setActiveModal("minimal")}
              >
                Tối giản
              </CSButton>
              <CSButton size="sm" onClick={() => setActiveModal("info")}>
                Thông tin
              </CSButton>
              <CSButton
                color="success"
                variant="ghost"
                size="sm"
                onClick={() => setActiveModal("success")}
              >
                Thành công
              </CSButton>
              <CSButton
                color="warning"
                size="sm"
                onClick={() => setActiveModal("warning")}
              >
                Cảnh báo
              </CSButton>
              <CSButton
                variant="outline"
                color="danger"
                size="sm"
                width="full"
                style={{ gridColumn: "span 2" }}
                onClick={() => setActiveModal("full")}
              >
                Mở Full Screen
              </CSButton>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3 style={{ fontWeight: 700, marginBottom: "16px" }}>
              Trạng thái Toast
            </h3>
            <div style={{ display: "flex", gap: "8px" }}>
              <CSButton
                variant="ghost"
                color="danger"
                onClick={() => toast("Lỗi kết nối!", "error")}
              >
                Lỗi
              </CSButton>
              <CSButton
                variant="ghost"
                color="info"
                onClick={() => toast("Đang tải...", "loading")}
              >
                Loading
              </CSButton>
            </div>
          </div>
        </section>
      </div>

      {/* --- RENDER MODAL DUY NHẤT --- */}
      {modalConfig && (
        <CSModal
          isOpen={!!activeModal}
          onClose={closeModal}
          title={modalConfig.title}
          size={modalConfig.size || "md"}
          color={modalConfig.color || "primary"}
          showBorderTop={modalConfig.showBorderTop}
          showShadow={modalConfig.showShadow}
          footer={modalConfig.footer}
        >
          {modalConfig.content}
        </CSModal>
      )}
    </div>
  );
}
