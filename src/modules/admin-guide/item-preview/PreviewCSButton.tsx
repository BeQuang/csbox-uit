import CSButton from "@/components/core/CSButton";
import readmeCSButton from "@/components/core/CSButton/READMECSBUTTON.md?raw";
import { Link } from "react-router-dom";
import CoreComponentGuidePage from "../CoreComponentGuidePage";
import { Download, ExternalLink, Plus, Send, Settings } from "lucide-react";
import { Row } from "antd";

export default function PreviewCSButton() {
  return (
    <CoreComponentGuidePage
      title="CSButton"
      description="Toàn bộ các biến thể sử dụng chính của CSButton dành cho admin."
      readme={readmeCSButton}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          minWidth: "380px",
        }}
      >
        {/* 1. Nhóm Variant cơ bản */}
        <Row justify="space-between">
          <section>
            <p
              style={{
                fontSize: "12px",
                color: "#888",
                marginBottom: "10px",
                fontWeight: 600,
              }}
            >
              1. VARIANTS
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <CSButton variant="solid">Solid (Default)</CSButton>
              <CSButton variant="outline">Outline</CSButton>
              <CSButton variant="ghost">Ghost</CSButton>
            </div>
          </section>

          {/* 2. Nhóm Màu sắc (Sử dụng Outline để thấy rõ nền trắng) */}
          <section>
            <p
              style={{
                fontSize: "12px",
                color: "#888",
                marginBottom: "10px",
                fontWeight: 600,
              }}
            >
              2. COLORS (OUTLINE MODE)
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <CSButton color="primary" variant="outline">
                Primary
              </CSButton>
              <CSButton color="success" variant="outline">
                Success
              </CSButton>
              <CSButton color="danger" variant="outline">
                Danger
              </CSButton>
              <CSButton color="warning" variant="outline">
                Warning
              </CSButton>
              <CSButton color="info" variant="outline">
                Info
              </CSButton>
            </div>
          </section>

          {/* 3. Nhóm Kích thước */}
          <section>
            <p
              style={{
                fontSize: "12px",
                color: "#888",
                marginBottom: "10px",
                fontWeight: 600,
              }}
            >
              3. SIZES
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <CSButton size="sm">Small</CSButton>
              <CSButton size="md">Medium</CSButton>
              <CSButton size="lg">Large</CSButton>
            </div>
          </section>
        </Row>

        <Row justify="space-between">
          {/* 4. Trạng thái Loading và Icons */}
          <section>
            <p
              style={{
                fontSize: "12px",
                color: "#888",
                marginBottom: "10px",
                fontWeight: 600,
              }}
            >
              4. LOADING & ICONS
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <CSButton loading>Button Loading</CSButton>
              <CSButton variant="outline" loading color="danger">
                Delete
              </CSButton>
              <CSButton color="success">
                <Plus size={16} /> Thêm mới
              </CSButton>
              <CSButton variant="ghost" color="info">
                <Settings size={16} /> Cấu hình
              </CSButton>
            </div>
          </section>
        </Row>

        {/* 5. Trạng thái đặc biệt & asChild */}
        <section>
          <p
            style={{
              fontSize: "12px",
              color: "#888",
              marginBottom: "10px",
              fontWeight: 600,
            }}
          >
            5. SPECIAL STATES & ASCHILD
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <CSButton disabled width="full">
              Nút bị vô hiệu hóa (Disabled)
            </CSButton>

            <CSButton width="full" color="primary">
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Send size={16} /> Gửi biểu mẫu (Full Width)
              </span>
            </CSButton>

            {/* Sửa lỗi asChild: Bọc Icon + Text vào 1 thẻ span duy nhất */}
            <CSButton width="full" variant="outline" asChild color="info">
              <Link to="/users">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    justifyContent: "center",
                  }}
                >
                  <Download size={16} />
                  <span>Tải danh sách khách hàng (Link)</span>
                </span>
              </Link>
            </CSButton>

            <CSButton variant="ghost" asChild color="primary">
              <a href="https://google.com" target="_blank" rel="noreferrer">
                <span
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <ExternalLink size={16} />
                  <span>Mở liên kết ngoài</span>
                </span>
              </a>
            </CSButton>
          </div>
        </section>
      </div>
    </CoreComponentGuidePage>
  );
}
