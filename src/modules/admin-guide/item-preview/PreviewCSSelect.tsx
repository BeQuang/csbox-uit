import CSSelect from "@/components/core/CSSelect";
import readmeCSSelect from "@/components/core/CSSelect/READMECSSELECT.md?raw";
import { useState } from "react";
import CoreComponentGuidePage from "../CoreComponentGuidePage";

export default function PreviewCSSelect() {
  const [singleValue, setSingleValue] = useState("active");
  const [multiValue, setMultiValue] = useState<string[]>(["active", "paused"]);
  const [groupValue, setGroupValue] = useState("");

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
    <CoreComponentGuidePage
      title="CSSelect"
      description="Single, multiple, grouped, searchable và state lỗi/disabled."
      readme={readmeCSSelect}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          minWidth: "320px",
        }}
      >
        <div style={{ display: "flex", gap: "24px" }}>
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
        </div>

        <div style={{ display: "flex", gap: "24px" }}>
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
      </div>
    </CoreComponentGuidePage>
  );
}
