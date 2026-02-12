import CSButton from "@/components/core/CSButton";
import CSModal from "@/components/core/CSModal";
import readmeCSModal from "@/components/core/CSModal/READMECSMODAL.md?raw";
import { useToast } from "@/components/core/CSToast";
import { AlertTriangle, CheckCircle, Layers, Settings } from "lucide-react";
import { useMemo, useState } from "react";
import CoreComponentGuidePage from "../CoreComponentGuidePage";

// Định nghĩa các loại Modal để tránh gõ nhầm string
type ModalType =
  | "minimal"
  | "info"
  | "success"
  | "warning"
  | "delete"
  | "full"
  | null;

export default function PreviewCSModal() {
  const { toast } = useToast();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const closeModal = () => setActiveModal(null);

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
              Hành động này sẽ xóa vĩnh viễn tài khoản <b>Bé Quang</b>.
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
  }, [activeModal, toast]);

  return (
    <CoreComponentGuidePage
      title="CSModal"
      description="Preview cơ bản của CSModal với footer và trạng thái đóng/mở."
      readme={readmeCSModal}
    >
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
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
            color="danger"
            size="sm"
            onClick={() => setActiveModal("delete")}
          >
            Xóa
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
    </CoreComponentGuidePage>
  );
}
