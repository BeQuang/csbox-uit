import CSButton from "@/components/core/CSButton/CSButton";
import CSInput from "@/components/core/CSInput/CSInput";
import CSSelect from "@/components/core/CSSelect";
import {
  DollarSign,
  Download,
  ExternalLink,
  Lock,
  Mail,
  Plus,
  Send,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  // --- Giữ nguyên State cũ của bạn ---
  const [singleValue, setSingleValue] = useState("active");
  const [multiValue, setMultiValue] = useState<string[]>(["active", "paused"]);
  const [groupValue, setGroupValue] = useState("");

  const [price, setPrice] = useState("1500000");
  const [balance, setBalance] = useState("1500000");
  const [unit, setUnit] = useState("VNĐ");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("admin_test");
  const [phone, setPhone] = useState("");

  const statusOptions = [
    { label: "Hoạt động", value: "active" },
    { label: "Tạm dừng", value: "paused" },
    { label: "Đã xóa", value: "deleted" },
    { label: "Tiếp tục", value: "continue" },
  ];

  const groupedOptions = [
    {
      group: "Trạng thái hệ thống",
      items: [
        { label: "Bản nháp", value: "draft" },
        { label: "Đang bảo trì", value: "maintenance" },
        { label: "Lưu trữ", value: "archived" },
      ],
    },
    {
      group: "Tiến trình Game",
      items: [
        { label: "Đang vào game", value: "matching" },
        { label: "Đang thi đấu", value: "playing" },
        { label: "Hoàn thành", value: "completed" },
      ],
    },
  ];

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        flexDirection: "row",
        gap: "40px",
        backgroundColor: "var(--color-bg-main)",
        minHeight: "100vh",
        overflowX: "auto",
      }}
    >
      {/* CỘT 1: TEST TOÀN BỘ TRƯỜNG HỢP CSSELECT */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          minWidth: "320px",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: 700 }}>
          🧪 Test CSSelect Cases
        </h2>

        {/* 1. Chọn đơn cơ bản + Variant Success */}
        <CSSelect
          label="1. Chọn đơn + Success Variant"
          placeholder="Chọn trạng thái..."
          options={statusOptions}
          value={singleValue}
          onChange={(val) => setSingleValue(val as string)}
          variant="success"
        />

        {/* 2. Chọn đơn + Tìm kiếm (Searchable) */}
        <CSSelect
          label="2. Chọn đơn + Searchable"
          placeholder="Tìm kiếm trạng thái..."
          options={statusOptions}
          value={singleValue}
          onChange={(val) => setSingleValue(val as string)}
          isSearchable
        />

        {/* 3. Chọn nhiều + Xóa nhanh (Clear All) */}
        <CSSelect
          label="3. Chọn nhiều + Clear All"
          placeholder="Chọn nhiều mục..."
          options={statusOptions}
          value={multiValue}
          onChange={(val) => setMultiValue(val as string[])}
          multiple
          showClearAll
        />

        {/* 4. Chọn nhiều + Chọn tất cả + Giới hạn hiển thị Tag */}
        <CSSelect
          label="4. Multi + Select All + Max Tags (2)"
          placeholder="Chọn nhiều..."
          options={statusOptions}
          value={multiValue}
          onChange={(val) => setMultiValue(val as string[])}
          multiple
          showSelectAll
          maxTagDisplay={2}
        />

        {/* 5. Phân nhóm (Grouping) + Searchable */}
        <CSSelect
          label="5. Phân nhóm + Searchable"
          placeholder="Chọn mục từ nhóm..."
          options={groupedOptions}
          value={groupValue}
          onChange={(val) => setGroupValue(val as string)}
          isSearchable
        />

        {/* 6. Trạng thái Lỗi (Error State) */}
        <CSSelect
          label="6. Trạng thái lỗi (Danger)"
          placeholder="Vui lòng chọn..."
          options={statusOptions}
          value=""
          onChange={() => {}}
          variant="danger"
          error="Trường này là bắt buộc"
        />

        {/* 7. Trạng thái Vô hiệu hóa (Disabled) */}
        <CSSelect
          label="7. Vô hiệu hóa (Disabled)"
          placeholder="Không thể chọn..."
          options={statusOptions}
          value="active"
          onChange={() => {}}
          disabled
        />

        {/* 8. Variant Info + Không có kết quả tìm kiếm */}
        <CSSelect
          label="8. Variant Info"
          placeholder="Thử tìm kiếm thứ gì đó không tồn tại..."
          options={statusOptions}
          value=""
          onChange={() => {}}
          isSearchable
          variant="info"
        />
      </div>

      {/* CỘT 2: TEST CSINPUT (Giữ nguyên của bạn) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          minWidth: "320px",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: 700 }}>
          🧪 Test CSInput Cases
        </h2>
        <CSInput
          label="Giá sản phẩm (Format Number)"
          required
          value={price}
          onChange={setPrice}
          formatNumber
          prependIcon={<DollarSign size={16} />}
          units={["VNĐ", "USD", "EUR"]}
          selectedUnit={unit}
          onChangeUnit={setUnit}
          variant="info"
        />
        <CSInput
          label="Số dư tài khoản (Thập phân)"
          value={balance}
          onChange={setBalance}
          formatNumber
          decimalSeparator="."
          unit="USD"
        />
        <CSInput
          label="Email liên hệ"
          value={email}
          onChange={setEmail}
          prependIcon={<Mail size={16} />}
        />
        <CSInput
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={setPassword}
          prependIcon={<Lock size={16} />}
        />
        <CSInput
          label="Số điện thoại"
          value={phone}
          onChange={setPhone}
          error="Số điện thoại không hợp lệ"
          variant="danger"
        />
        <CSInput
          label="Tên đăng nhập (Disabled)"
          value={username}
          onChange={setUsername}
          prependIcon={<User size={16} />}
          disabled
        />
        <CSInput label="Mã giảm giá" variant="success" unit="Apply" />
      </div>

      {/* CỘT 3: TEST CSBUTTON (Cập nhật đầy đủ các trường hợp) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          minWidth: "380px",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: 700 }}>
          🧪 Test CSButton Cases
        </h2>

        {/* 1. Nhóm Variant cơ bản */}
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
    </div>
  );
}
