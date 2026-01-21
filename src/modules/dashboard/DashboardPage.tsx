import CSButton from "@/components/core/CSButton/CSButton";
import CSInput from "@/components/core/CSInput/CSInput";
import CSSelect from "@/components/core/CSSelect";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("VNĐ");

  // State cho 3 loại Select
  const [singleValue, setSingleValue] = useState("active");
  const [multiValue, setMultiValue] = useState<string[]>(["active", "paused"]);
  const [groupValue, setGroupValue] = useState("");

  // Dữ liệu phẳng (Flat Options)
  const statusOptions = [
    { label: "Hoạt động", value: "active" },
    { label: "Tạm dừng", value: "paused" },
    { label: "Đã xóa", value: "deleted" },
    { label: "Chờ duyệt", value: "pending" },
    { label: "Vi phạm (Spam)", value: "spam" },
  ];

  // Dữ liệu phân nhóm (Grouped Options)
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
        flexDirection: "column",
        gap: "32px",
        maxWidth: "400px",
      }}
    >
      {/* DẠNG 1: SINGLE SELECT + SEARCH */}
      <CSSelect
        label="Trạng thái (Single)"
        placeholder="Tìm trạng thái..."
        options={statusOptions}
        value={singleValue}
        onChange={(val) => setSingleValue(val as string)}
        isSearchable
        showClearAll
        variant="success"
      />

      {/* DẠNG 2: MULTIPLE SELECT + MAX TAGS + SELECT ALL */}
      <CSSelect
        label="Tags dự án (Multiple)"
        placeholder="Chọn nhiều tag..."
        options={statusOptions}
        value={multiValue}
        onChange={(val) => setMultiValue(val as string[])}
        multiple
        isSearchable
        maxTagDisplay={3} // Chỉ hiện 2 tag, cái thứ 3 hiện +1...
        showSelectAll
        showClearAll
      />

      {/* DẠNG 3: GROUPING SELECT */}
      <CSSelect
        label="Phân loại hệ thống (Grouping)"
        placeholder="Chọn mục trong nhóm..."
        options={groupedOptions}
        value={groupValue}
        onChange={(val) => setGroupValue(val as string)}
        isSearchable
      />

      <hr
        style={{
          border: "none",
          borderTop: "1px solid var(--color-border)",
          margin: "10px 0",
        }}
      />

      <CSInput
        label="Giá bán"
        required
        type="number"
        value={price}
        onChange={setPrice}
        placeholder="Nhập giá"
        formatNumber
        units={["VNĐ", "USD", "JPY"]}
        selectedUnit={unit}
        onChangeUnit={setUnit}
      />

      <CSButton>
        <Link to="/users" style={{ color: "inherit", textDecoration: "none" }}>
          Vào danh sách User
        </Link>
      </CSButton>
    </div>
  );
}
