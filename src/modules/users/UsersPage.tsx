/* eslint-disable @typescript-eslint/no-explicit-any */
import CSButton from "@/components/core/CSButton";
import CSPagination from "@/components/core/CSTable/CSPagination";
import CSTable from "@/components/core/CSTable/CSTable";
import { useCSPagination } from "@/components/core/CSTable/useCSPagination";
import {
  ColumnDef,
  createColumnHelper,
  RowSelectionState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// --- MOCK DATA ---
const MOCK_DATA = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  code: `USR-${(i + 1).toString().padStart(3, "0")}`,
  name: `Nhân viên ${String.fromCharCode(65 + (i % 26))}`,
  department: ["Kinh doanh", "Kỹ thuật", "Nhân sự", "Marketing"][i % 4],
  email: `user.name.${i}@example.com`,
  role: i % 3 === 0 ? "Admin" : "User",
  status: i % 4 === 0 ? "Blocked" : i % 3 === 0 ? "Pending" : "Active",
  lastLogin: "2024-05-20 10:30",
  balance: (1000000 * (i + 1)).toLocaleString("vi-VN") + "đ",
}));

type UserData = (typeof MOCK_DATA)[0];
const columnHelper = createColumnHelper<UserData>();

export default function UsersPage() {
  const navigate = useNavigate();
  // 1. Hook Pagination & Sort logic
  const {
    pagination,
    handlePageChange,
    handleRowsPerPageChange,
    handleSort, // Hàm này sẽ cập nhật state sortBy/descending
  } = useCSPagination("id");

  // 2. State Selection
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // 3. Columns Definition (Full Feature)
  const fullColumns = useMemo<ColumnDef<UserData, any>[]>(
    () => [
      // Cột 1: Checkbox (Sticky Left)
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            style={{ cursor: "pointer" }}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            style={{ cursor: "pointer" }}
          />
        ),
        meta: { sticky: true, stickySide: "left" },
        enableSorting: false, // Tắt sort cột này
        size: 50,
      },
      // Các cột dữ liệu thường
      columnHelper.accessor("code", { header: "Mã NV" }),
      columnHelper.accessor("name", { header: "Họ và tên" }),
      columnHelper.accessor("email", { header: "Email" }),
      columnHelper.accessor("department", { header: "Phòng ban" }),
      columnHelper.accessor("balance", {
        header: "Doanh số",
        cell: (info) => (
          <span style={{ fontFamily: "monospace", fontWeight: 600 }}>
            {info.getValue()}
          </span>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("status", {
        header: "Trạng thái",
        cell: (info) => {
          const val = info.getValue();
          const colors: Record<string, string> = {
            Active: "var(--color-success)",
            Pending: "var(--color-warning)",
            Blocked: "var(--color-danger)",
          };
          return (
            <span
              style={{
                color: colors[val],
                fontWeight: "bold",
                border: `1px solid ${colors[val]}`,
                padding: "2px 8px",
                borderRadius: "12px",
                fontSize: "12px",
              }}
            >
              {val}
            </span>
          );
        },
      }),
      // Cột cuối: Hành động (Sticky Right)
      {
        id: "actions",
        header: "Thao tác",
        cell: () => (
          <div style={{ display: "flex", gap: "5px" }}>
            <button
              style={{
                padding: "4px 8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Sửa
            </button>
            <button
              style={{
                padding: "4px 8px",
                border: "1px solid var(--color-danger)",
                color: "var(--color-danger)",
                borderRadius: "4px",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Xóa
            </button>
          </div>
        ),
        meta: { sticky: true, stickySide: "right" },
        enableSorting: false,
      },
    ],
    [],
  );

  // 4. Simple Columns (Cho các ví dụ nhỏ)
  const simpleColumns = useMemo(
    () => [
      columnHelper.accessor("name", { header: "Tên" }),
      columnHelper.accessor("role", { header: "Quyền" }),
      columnHelper.accessor("lastLogin", { header: "Đăng nhập" }),
    ],
    [],
  );

  // --- RENDER HELPERS ---
  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "var(--color-bg-app)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "60px",
      }}
    >
      {/* =================================================================================
          PHẦN 1: BẢNG "KITCHEN SINK" - TÍCH HỢP ĐẦY ĐỦ TÍNH NĂNG
          (Sort, Select, Sticky, Pagination, Custom Header, Scroll)
         ================================================================================= */}
      <section>
        <div style={{ marginBottom: "16px" }}>
          <h2 style={{ color: "var(--color-primary)", marginBottom: "8px" }}>
            1. Bảng dữ liệu chính (Full Features)
          </h2>
          <p style={{ color: "var(--color-text-secondary)" }}>
            Tính năng: <b>Sticky Col</b> (Trái/Phải), <b>Sort</b> (Click
            header),
            <b> Selection</b> (Checkbox), <b>Pagination</b>, <b>Max Height</b>{" "}
            (Scroll).
          </p>
        </div>

        <CSTable
          // Data & Columns
          data={MOCK_DATA.slice(0, pagination.rowsPerPage)} // Giả lập phân trang client
          columns={fullColumns}
          // Appearance
          color="primary" // Theme màu xanh dương
          maxHeight={400} // Bật chế độ cuộn dọc, cố định Header
          isStriped={true} // Nền sọc ngựa vằn
          isHoverable={true} // Hiệu ứng hover dòng
          // Selection Logic
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          // Sorting Logic
          sortBy={pagination.sortBy}
          descending={pagination.descending}
          onSort={handleSort} // Hàm từ hook useCSPagination
          // Custom Header (Thanh công cụ bên trên bảng)
          header={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: 600 }}>Danh sách nhân viên</span>
              {selectedCount > 0 ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "var(--color-primary)" }}>
                    Đã chọn: {selectedCount}
                  </span>
                  <CSButton size="sm" color="danger">
                    Xóa đã chọn
                  </CSButton>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 8 }}>
                  <CSButton
                    size="sm"
                    variant="outline"
                    color="primary"
                    onClick={() => console.log(pagination)}
                  >
                    Xuất Excel
                  </CSButton>
                  <CSButton size="sm" color="primary">
                    + Thêm mới
                  </CSButton>
                </div>
              )}
            </div>
          }
          // Custom Footer (Phân trang)
          footer={
            <CSPagination
              page={pagination.page}
              rowsPerPage={pagination.rowsPerPage}
              rowsNumber={MOCK_DATA.length} // Tổng số bản ghi
              onPageChange={handlePageChange}
              onPageSizeChange={handleRowsPerPageChange}
              color="primary" // Màu pagination đồng bộ với bảng
            />
          }
        />
      </section>

      {/* =================================================================================
          PHẦN 2: CÁC BIẾN THỂ GIAO DIỆN (THEME & STYLES)
         ================================================================================= */}
      <section>
        <h2 style={{ color: "var(--color-text)", marginBottom: "20px" }}>
          2. Giao diện & Màu sắc (Themes)
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
          }}
        >
          {/* CASE 2.1: SUCCESS COLOR - MINIMAL */}
          <div>
            <h4 style={{ color: "var(--color-success)", marginBottom: "10px" }}>
              Theme: Success (Minimal)
            </h4>
            <p
              style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}
            >
              <code>isStriped=false</code>, <code>footer=null</code>. Dùng cho
              bảng widget nhỏ.
            </p>
            <CSTable
              columns={simpleColumns}
              data={MOCK_DATA.slice(0, 5)}
              color="success"
              isStriped={false} // Tắt sọc
              isHoverable={true}
            />
          </div>

          {/* CASE 2.2: INFO COLOR - STATIC */}
          <div>
            <h4 style={{ color: "var(--color-info)", marginBottom: "10px" }}>
              Theme: Info (Static)
            </h4>
            <p
              style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}
            >
              <code>isHoverable=false</code>. Dùng cho bảng hiển thị thông tin
              tĩnh.
            </p>
            <CSTable
              columns={simpleColumns}
              data={MOCK_DATA.slice(0, 5)}
              color="info"
              isStriped={true}
              isHoverable={false} // Tắt hover
            />
          </div>
        </div>
      </section>

      {/* =================================================================================
          PHẦN 3: CÁC TRẠNG THÁI (STATES)
         ================================================================================= */}
      <section>
        <h2 style={{ color: "var(--color-text)", marginBottom: "20px" }}>
          3. Trạng thái dữ liệu (States)
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "30px",
          }}
        >
          {/* CASE 3.1: LOADING OVERLAY (Có dữ liệu cũ + Đang tải mới) */}
          <div>
            <h4 style={{ marginBottom: "10px" }}>Loading Overlay</h4>
            <p style={{ fontSize: "12px", color: "#666", marginBottom: 5 }}>
              Dữ liệu vẫn hiển thị, spinner đè lên (dùng khi refresh/filter).
            </p>
            <CSTable
              columns={simpleColumns}
              data={MOCK_DATA.slice(0, 3)}
              color="warning"
              loading={true} // <--- Key prop
            />
          </div>

          {/* CASE 3.2: INITIAL LOADING (Chưa có dữ liệu) */}
          <div>
            <h4 style={{ marginBottom: "10px" }}>Initial Loading</h4>
            <p style={{ fontSize: "12px", color: "#666", marginBottom: 5 }}>
              Bảng rỗng, hiển thị loader ở giữa body.
            </p>
            <CSTable
              columns={simpleColumns}
              data={[]} // Dữ liệu rỗng
              color="primary"
              loading={true} // <--- Key prop
            />
          </div>

          {/* CASE 3.3: EMPTY STATE (Không có dữ liệu) */}
          <div>
            <h4 style={{ marginBottom: "10px" }}>Empty State</h4>
            <p style={{ fontSize: "12px", color: "#666", marginBottom: 5 }}>
              Hiển thị thông báo khi không tìm thấy kết quả.
            </p>
            <CSTable
              columns={simpleColumns}
              data={[]} // Dữ liệu rỗng
              color="danger"
              loading={false} // Không loading
            />
          </div>
        </div>
      </section>
      <CSButton onClick={() => navigate("/users/roles/new")}>
        Điều hướng trong trang (Tới New)
      </CSButton>
    </div>
  );
}
