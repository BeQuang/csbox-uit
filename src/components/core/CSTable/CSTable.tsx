/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  RowSelectionState,
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
  maxHeight?: number;
  sortBy?: string;
  descending?: boolean;
  onSort?: (columnId: string) => void;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: React.Dispatch<
    React.SetStateAction<RowSelectionState>
  >;
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
  maxHeight,
  sortBy,
  descending,
  onSort,
  rowSelection = {},
  onRowSelectionChange,
}: CSTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    enableRowSelection: true,
    enableSorting: true,
    onRowSelectionChange: onRowSelectionChange,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className={`cs-table-container cs-table-container--${color} ${loading ? "is-loading" : ""}`}
    >
      {header && <div className="cs-table__header">{header}</div>}

      <div
        className="cs-table__wrapper"
        style={{ position: "relative", maxHeight: maxHeight || "auto" }}
      >
        {loading && data.length > 0 && (
          <div className="cs-table__progress-bar"></div>
        )}

        <table
          className={`cs-table ${isStriped ? "cs-table--striped" : ""} ${isHoverable ? "cs-table--hoverable" : ""}`}
        >
          <thead>
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((h, index) => {
                  const meta = h.column.columnDef.meta as any;
                  // canSort chỉ true khi cột đó có enableSorting: true
                  const columnDef = h.column.columnDef as any;
                  const canSort = columnDef.enableSorting === true;
                  const isFirst = index === 0;
                  const isLast = index === group.headers.length - 1;
                  const isStickyLeft =
                    isFirst && meta?.sticky && meta?.stickySide === "left";
                  const isStickyRight =
                    isLast && meta?.sticky && meta?.stickySide === "right";

                  return (
                    <th
                      key={h.id}
                      onClick={() => canSort && onSort?.(h.id)}
                      className={
                        isStickyLeft || isStickyRight
                          ? `sticky-col sticky-col--${meta?.stickySide}`
                          : ""
                      }
                      style={{
                        cursor: canSort ? "pointer" : "default",
                        left: isStickyLeft ? 0 : undefined,
                        right: isStickyRight ? 0 : undefined,
                      }}
                    >
                      <div className="cs-table__header-cell">
                        {flexRender(h.column.columnDef.header, h.getContext())}

                        {/* Icon chỉ hiển thị khi canSort === true */}
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
              <tr>
                <td colSpan={columns.length}>
                  <div className="cs-table__body-loader">
                    <div className="cs-spinner"></div>
                    <p>Đang tải dữ liệu...</p>
                  </div>
                </td>
              </tr>
            ) : data.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`${row.getIsSelected() ? "is-selected" : ""} ${loading ? "row-fade" : ""}`}
                >
                  {row.getVisibleCells().map((cell, index) => {
                    const meta = cell.column.columnDef.meta as any;
                    const isFirst = index === 0;
                    const isLast = row.getVisibleCells().length - 1 === index;
                    const isStickyLeft =
                      isFirst && meta?.sticky && meta?.stickySide === "left";
                    const isStickyRight =
                      isLast && meta?.sticky && meta?.stickySide === "right";

                    return (
                      <td
                        key={cell.id}
                        className={
                          isStickyLeft || isStickyRight
                            ? `sticky-col sticky-col--${meta?.stickySide}`
                            : ""
                        }
                        style={{
                          left: isStickyLeft ? 0 : undefined,
                          right: isStickyRight ? 0 : undefined,
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
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
