import { useEffect, useMemo, useState } from "react";
import type { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import type { Dayjs } from "dayjs";
import CSButton from "@/components/core/CSButton";
import CSInput from "@/components/core/CSInput";
import CSModal from "@/components/core/CSModal";
import CSSelect from "@/components/core/CSSelect";
import CSTable from "@/components/core/CSTable/CSTable";
import CSPagination from "@/components/core/CSTable/CSPagination";
import { useCSPagination } from "@/components/core/CSTable/useCSPagination";
import CSDatePicker from "@/components/core/CSDatePicker/CSDatePicker";
import CSRangePicker from "@/components/core/CSDatePicker/CSRangerPicker";
import { useToast } from "@/components/core/CSToast";
import CoreComponentGuidePage from "./CoreComponentGuidePage";

import readmeCSButton from "@/components/core/CSButton/READMECSBUTTON.md?raw";
import readmeCSInput from "@/components/core/CSInput/READMECSINPUT.md?raw";
import readmeCSSelect from "@/components/core/CSSelect/READMECSSELECT.md?raw";
import readmeCSTable from "@/components/core/CSTable/READMECSTABLE.md?raw";
import readmeCSModal from "@/components/core/CSModal/READMECSMODAL.md?raw";
import readmeCSDatePicker from "@/components/core/CSDatePicker/READMECSDATEPICKER.md?raw";
import readmeCSToast from "@/components/core/CSToast/READMECSTOAST.md?raw";

export function CSButtonGuidePage() {
  return (
    <CoreComponentGuidePage
      title="CSButton"
      description="Toàn bộ các biến thể sử dụng chính của CSButton dành cho admin."
      readme={readmeCSButton}
    >
      <div className="core-guide-page__row">
        <CSButton>Solid</CSButton>
        <CSButton variant="outline">Outline</CSButton>
        <CSButton variant="ghost">Ghost</CSButton>
      </div>
      <div className="core-guide-page__row">
        <CSButton color="success">Success</CSButton>
        <CSButton color="danger">Danger</CSButton>
        <CSButton color="warning">Warning</CSButton>
        <CSButton color="info">Info</CSButton>
      </div>
      <div className="core-guide-page__row">
        <CSButton size="sm">SM</CSButton>
        <CSButton size="md">MD</CSButton>
        <CSButton size="lg">LG</CSButton>
      </div>
      <div className="core-guide-page__row">
        <CSButton loading>Loading</CSButton>
        <CSButton disabled>Disabled</CSButton>
      </div>
      <div className="core-guide-page__row">
        <CSButton asChild variant="outline" color="info">
          <Link to="/users/list">asChild Link</Link>
        </CSButton>
      </div>
    </CoreComponentGuidePage>
  );
}

export function CSInputGuidePage() {
  const [price, setPrice] = useState("1500000");
  const [unit, setUnit] = useState("VNĐ");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <CoreComponentGuidePage
      title="CSInput"
      description="Preview đầy đủ các trạng thái input, number formatter, icon, password."
      readme={readmeCSInput}
    >
      <div className="core-guide-page__stack">
        <CSInput
          label="Giá sản phẩm"
          required
          formatNumber
          value={price}
          onChange={setPrice}
          units={["VNĐ", "USD"]}
          selectedUnit={unit}
          onChangeUnit={setUnit}
          variant="info"
        />
        <CSInput
          label="Email"
          value={email}
          onChange={setEmail}
          prependIcon={<Mail size={16} />}
          placeholder="admin@csbox.vn"
        />
        <CSInput
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={setPassword}
          error={
            password.length > 0 && password.length < 6
              ? "Tối thiểu 6 ký tự"
              : ""
          }
          variant="danger"
        />
        <CSInput
          label="Disabled"
          value="readonly"
          onChange={() => {}}
          disabled
        />
      </div>
    </CoreComponentGuidePage>
  );
}

export function CSSelectGuidePage() {
  const [single, setSingle] = useState("active");
  const [multi, setMulti] = useState<string[]>(["active"]);

  const options = [
    { label: "Hoạt động", value: "active" },
    { label: "Tạm dừng", value: "paused" },
    { label: "Khoá", value: "blocked" },
  ];

  const grouped = [
    {
      group: "Hệ thống",
      items: options,
    },
    {
      group: "Nâng cao",
      items: [
        { label: "Draft", value: "draft" },
        { label: "Archived", value: "archived" },
      ],
    },
  ];

  return (
    <CoreComponentGuidePage
      title="CSSelect"
      description="Single, multiple, grouped, searchable và state lỗi/disabled."
      readme={readmeCSSelect}
    >
      <div className="core-guide-page__stack">
        <CSSelect
          label="Single"
          options={options}
          value={single}
          onChange={(value) => setSingle(value as string)}
        />
        <CSSelect
          label="Multiple + tags"
          options={options}
          value={multi}
          onChange={(value) => setMulti(value as string[])}
          multiple
          showSelectAll
          showClearAll
          maxTagDisplay={2}
        />
        <CSSelect
          label="Grouped + Search"
          options={grouped}
          value={single}
          onChange={(value) => setSingle(value as string)}
          isSearchable
        />
        <CSSelect
          label="Error"
          options={options}
          value=""
          onChange={() => {}}
          error="Bắt buộc chọn trạng thái"
          variant="danger"
        />
      </div>
    </CoreComponentGuidePage>
  );
}

type DemoUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export function CSTableGuidePage() {
  const data = useMemo<DemoUser[]>(
    () => [
      { id: 1, name: "Nguyễn Văn A", email: "a@csbox.vn", role: "Admin" },
      { id: 2, name: "Trần Thị B", email: "b@csbox.vn", role: "Staff" },
      { id: 3, name: "Lê Văn C", email: "c@csbox.vn", role: "User" },
      { id: 4, name: "Phạm Thị D", email: "d@csbox.vn", role: "Staff" },
      { id: 5, name: "Hoàng Văn E", email: "e@csbox.vn", role: "User" },
    ],
    [],
  );

  const columns = useMemo<ColumnDef<DemoUser>[]>(
    () => [
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "name", header: "Tên", enableSorting: true },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "role", header: "Role" },
    ],
    [],
  );

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const {
    pagination,
    handlePageChange,
    handleRowsPerPageChange,
    handleSort,
    setTotalRows,
  } = useCSPagination("id");

  const sortedData = useMemo(() => {
    const cloned = [...data];
    return cloned.sort((a, b) => {
      const left = String(a[pagination.sortBy as keyof DemoUser]);
      const right = String(b[pagination.sortBy as keyof DemoUser]);
      return pagination.descending
        ? right.localeCompare(left)
        : left.localeCompare(right);
    });
  }, [data, pagination.descending, pagination.sortBy]);

  useEffect(() => {
    setTotalRows(sortedData.length);
  }, [setTotalRows, sortedData.length]);

  const start = (pagination.page - 1) * pagination.rowsPerPage;
  const paginatedData = sortedData.slice(start, start + pagination.rowsPerPage);

  return (
    <CoreComponentGuidePage
      title="CSTable"
      description="Preview sorting, row selection, loading state và phân trang."
      readme={readmeCSTable}
    >
      <CSTable
        columns={columns}
        data={paginatedData}
        color="info"
        isStriped
        isHoverable
        sortBy={pagination.sortBy}
        descending={pagination.descending}
        onSort={handleSort}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        header={<strong>Danh sách tài khoản</strong>}
        footer={<span>Đang chọn {Object.keys(rowSelection).length} dòng</span>}
      />
      <CSPagination
        page={pagination.page}
        rowsPerPage={pagination.rowsPerPage}
        rowsNumber={pagination.rowsNumber}
        onPageChange={handlePageChange}
        onPageSizeChange={handleRowsPerPageChange}
      />
    </CoreComponentGuidePage>
  );
}

export function CSModalGuidePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CoreComponentGuidePage
      title="CSModal"
      description="Preview cơ bản của CSModal với footer và trạng thái đóng/mở."
      readme={readmeCSModal}
    >
      <div className="core-guide-page__row">
        <CSButton onClick={() => setIsOpen(true)}>Mở modal</CSButton>
      </div>
      <CSModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Xác nhận hành động"
        description="Bạn có chắc muốn cập nhật dữ liệu người dùng?"
        footer={
          <div className="core-guide-page__row">
            <CSButton variant="outline" onClick={() => setIsOpen(false)}>
              Huỷ
            </CSButton>
            <CSButton color="success" onClick={() => setIsOpen(false)}>
              Đồng ý
            </CSButton>
          </div>
        }
      >
        <p>Modal hỗ trợ custom nội dung và quản lý state từ bên ngoài.</p>
      </CSModal>
    </CoreComponentGuidePage>
  );
}

export function CSDatePickerGuidePage() {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  return (
    <CoreComponentGuidePage
      title="CSDatePicker"
      description="Preview CSDatePicker và CSRangePicker theo đúng API hiện tại."
      readme={readmeCSDatePicker}
    >
      <div className="core-guide-page__stack">
        <CSDatePicker
          label="Ngày bắt đầu"
          value={date}
          onChange={(value) => setDate(value)}
          color="primary"
          placeholder="Chọn ngày"
        />
        <CSRangePicker
          label="Khoảng thời gian"
          value={range}
          onChange={(value) => setRange(value)}
          color="info"
        />
        <CSDatePicker
          label="Trạng thái lỗi"
          value={null}
          onChange={() => {}}
          error="Vui lòng chọn ngày"
          color="danger"
        />
      </div>
    </CoreComponentGuidePage>
  );
}

export function CSToastGuidePage() {
  const { toast } = useToast();

  return (
    <CoreComponentGuidePage
      title="CSToast"
      description="Preview các loại toast hỗ trợ qua hook useToast."
      readme={readmeCSToast}
    >
      <div className="core-guide-page__row">
        <CSButton
          color="success"
          onClick={() => toast("Thành công", "success")}
        >
          Success
        </CSButton>
        <CSButton
          color="danger"
          onClick={() => toast("Có lỗi xảy ra", "error")}
        >
          Error
        </CSButton>
        <CSButton color="warning" onClick={() => toast("Cảnh báo", "warning")}>
          Warning
        </CSButton>
        <CSButton color="info" onClick={() => toast("Đang xử lý", "loading")}>
          Loading
        </CSButton>
        <CSButton
          variant="outline"
          onClick={() =>
            toast("Toast dạng object", {
              type: "info",
              description: "Có thể truyền options đầy đủ từ Sonner.",
            })
          }
        >
          Object options
        </CSButton>
      </div>
    </CoreComponentGuidePage>
  );
}
