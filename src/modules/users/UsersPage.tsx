import React, { useMemo, useState, useEffect, useCallback } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import CSTable from "@/components/core/CSTable/CSTable";
import CSPagination from "@/components/core/CSTable/CSPagination";
import { useCSPagination } from "@/components/core/CSTable/useCSPagination";
import CSButton from "@/components/core/CSButton";

// 1. Định nghĩa interface chuẩn để không dùng 'any'
interface ITableData {
  id: number;
  code: string;
  name: string;
  amount: string;
  status: "Active" | "Pending" | "Blocked";
}

const columnHelper = createColumnHelper<ITableData>();

export default function UsersPage() {
  const {
    pagination,
    handleSort,
    handlePageChange,
    handleRowsPerPageChange,
    setTotalRows,
  } = useCSPagination("id");
  const [managerData, setManagerData] = useState<ITableData[]>([]);
  const [loading, setLoading] = useState(false);

  // 2. Tách hàm fetch ra để fix lỗi cascading renders của useEffect
  const loadData = useCallback(async () => {
    setLoading(true); // Gọi trong flow async
    try {
      // Giả lập delay API
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mock: ITableData[] = Array.from({
        length: pagination.rowsPerPage,
      }).map((_, i) => ({
        id: (pagination.page - 1) * pagination.rowsPerPage + i + 1,
        code: `USR-00${(pagination.page - 1) * pagination.rowsPerPage + i + 1}`,
        name: `Nguyễn Văn ${String.fromCharCode(65 + i)}`,
        amount: "5.000.000đ",
        status: i % 2 === 0 ? "Active" : "Pending",
      }));

      setManagerData(mock);
      setTotalRows(100);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.rowsPerPage, setTotalRows]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 3. Định nghĩa cột
  const columns = useMemo(
    () => [
      columnHelper.accessor("code", { header: "Mã số", enableSorting: true }),
      columnHelper.accessor("name", {
        header: "Họ và tên",
        enableSorting: true,
      }),
      columnHelper.accessor("amount", { header: "Số dư", enableSorting: true }),
      columnHelper.accessor("status", {
        header: "Trạng thái",
        cell: (info) => (
          <span
            className={`cs-status-badge cs-status-badge--${info.getValue().toLowerCase()}`}
          >
            {info.getValue()}
          </span>
        ),
      }),
    ],
    [],
  );

  // Dữ liệu tĩnh cho các bảng demo khác để tránh lỗi linter
  const staticData: ITableData[] = [
    {
      id: 1,
      code: "STATIC-01",
      name: "Dữ liệu mẫu 1",
      amount: "1.000đ",
      status: "Active",
    },
    {
      id: 2,
      code: "STATIC-02",
      name: "Dữ liệu mẫu 2",
      amount: "2.000đ",
      status: "Blocked",
    },
  ];

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "60px",
      }}
    >
      {/* CASE 1: QUẢN TRỊ (MÀU WARNING) */}
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <h3 style={{ color: "var(--color-warning)" }}>
            1. Quản lý chính (Warning Theme)
          </h3>
          <CSButton color="warning" size="sm" onClick={() => {}}>
            Thêm mới
          </CSButton>
        </div>
        <CSTable
          columns={columns}
          data={managerData}
          loading={loading}
          color="warning"
          sortBy={pagination.sortBy}
          descending={pagination.descending}
          onSort={handleSort}
          footer={
            <CSPagination
              {...pagination}
              onPageChange={handlePageChange}
              onPageSizeChange={handleRowsPerPageChange}
              color="warning"
            />
          }
        />
      </section>

      {/* CASE 2: THÀNH CÔNG (SUCCESS) */}
      <section>
        <h3 style={{ color: "var(--color-success)", marginBottom: "16px" }}>
          2. Giao dịch hoàn tất (Success + Striped)
        </h3>
        <CSTable
          columns={columns}
          data={staticData}
          color="success"
          isStriped={true}
          isHoverable={true}
        />
      </section>

      {/* CASE 3: CẢNH BÁO (DANGER) */}
      <section>
        <h3 style={{ color: "var(--color-danger)", marginBottom: "16px" }}>
          3. Danh sách vi phạm (Danger)
        </h3>
        <CSTable
          columns={columns}
          data={staticData}
          color="danger"
          isStriped={false}
        />
      </section>

      {/* CASE 4: ĐANG TẢI (LOADING) */}
      <section>
        <h3 style={{ color: "var(--color-info)", marginBottom: "16px" }}>
          4. Trạng thái Loading
        </h3>
        <CSTable columns={columns} data={[]} color="info" loading={true} />
      </section>

      {/* CASE 5: TRỐNG (EMPTY) */}
      <section>
        <h3 style={{ color: "#999", marginBottom: "16px" }}>
          5. Trạng thái rỗng
        </h3>
        <CSTable columns={columns} data={[]} color="primary" />
      </section>
    </div>
  );
}
