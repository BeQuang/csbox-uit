/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import "./styles.scss";

export type TableColor = "primary" | "success" | "warning" | "danger" | "info";

interface CSTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  isStriped?: boolean;
  isHoverable?: boolean;
  loading?: boolean;
  color?: TableColor;
  sortBy?: string;
  descending?: boolean;
  onSort?: (columnId: string) => void;
}

export default function CSTable<TData>({
  columns,
  data,
  header,
  footer,
  isStriped = true,
  isHoverable = true,
  loading = false,
  color = "primary",
  sortBy,
  descending,
  onSort,
}: CSTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={`cs-table-container cs-table-container--${color}`}>
      {header && <div className="cs-table__header">{header}</div>}

      <div className="cs-table__wrapper" style={{ position: "relative" }}>
        {/* Thanh loading bar chạy nhỏ ở trên đỉnh bảng khi đang refresh data (đã có data cũ) */}
        {loading && data.length > 0 && (
          <div className="cs-table__progress-bar"></div>
        )}

        <table
          className={`cs-table ${isStriped ? "cs-table--striped" : ""} ${isHoverable ? "cs-table--hoverable" : ""}`}
        >
          <thead>
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((h) => {
                  const canSort = h.column.getCanSort();
                  return (
                    <th
                      key={h.id}
                      onClick={() => canSort && onSort?.(h.id)}
                      style={{ cursor: canSort ? "pointer" : "default" }}
                    >
                      <div className="cs-table__header-cell">
                        {flexRender(h.column.columnDef.header, h.getContext())}
                        {canSort && (
                          <span
                            className={`cs-table__sort-icon ${sortBy === h.id ? "is-active" : ""}`}
                          >
                            {sortBy === h.id ? (descending ? "▼" : "▲") : "⇅"}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading && data.length === 0 ? (
              // TRƯỜNG HỢP: Đang tải và chưa có dữ liệu (Lần đầu load)
              <tr>
                <td colSpan={columns.length}>
                  <div className="cs-table__body-loader">
                    <div className="cs-spinner"></div>
                    <p>Đang tải dữ liệu, vui lòng đợi...</p>
                  </div>
                </td>
              </tr>
            ) : data.length > 0 ? (
              // TRƯỜNG HỢP: Đã có dữ liệu (Sẽ hiển thị ngay khi có)
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className={loading ? "row-fade" : ""}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              // TRƯỜNG HỢP: Đã tải xong nhưng không có dữ liệu
              <tr>
                <td colSpan={columns.length} className="cs-table__empty">
                  Không có dữ liệu hiển thị.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {footer && <div className="cs-table__footer">{footer}</div>}
    </div>
  );
}
