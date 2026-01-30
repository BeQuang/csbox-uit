import React, { useMemo } from "react";
import "./styles.scss";

export type PaginationColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

interface CSPaginationProps {
  page: number; // Đã đổi từ currentPage
  rowsPerPage: number; // Đã đổi từ pageSize
  rowsNumber: number; // Đã đổi từ totalItems
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  siblingCount?: number;
  color?: PaginationColor;
}

export default function CSPagination({
  page,
  rowsPerPage,
  rowsNumber,
  onPageChange,
  onPageSizeChange,
  siblingCount = 1,
  color = "primary",
}: CSPaginationProps) {
  const totalPages = Math.ceil(rowsNumber / rowsPerPage) || 1;

  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, totalPages);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      return [
        ...Array.from({ length: leftItemCount }, (_, i) => i + 1),
        "...",
        totalPages,
      ];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1,
      );
      return [1, "...", ...rightRange];
    }
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i,
    );
    return [1, "...", ...middleRange, "...", totalPages];
  }, [totalPages, siblingCount, page]);

  return (
    <div className={`cs-pagination cs-pagination--${color}`}>
      <div className="cs-pagination__left">
        <div className="cs-pagination__size-box">
          <span>Số hàng</span>
          <select
            value={rowsPerPage}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {[10, 20, 50, 100].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <span className="cs-pagination__total">Tổng {rowsNumber} hàng</span>
      </div>

      <div className="cs-pagination__right">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="cs-pagination__item is-arrow"
        >
          <span className="arrow-left"></span>
        </button>
        {paginationRange.map((p, idx) =>
          p === "..." ? (
            <span key={idx} className="cs-pagination__dots">
              &#8230;
            </span>
          ) : (
            <button
              key={p}
              className={`cs-pagination__item ${p === page ? "is-active" : ""}`}
              onClick={() => onPageChange(Number(p))}
            >
              {p}
            </button>
          ),
        )}
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="cs-pagination__item is-arrow"
        >
          <span className="arrow-right"></span>
        </button>
      </div>
    </div>
  );
}
