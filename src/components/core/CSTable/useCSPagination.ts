import { useState } from "react";

export interface PaginationState {
  sortBy: string;
  descending: boolean;
  page: number;
  rowsPerPage: number;
  rowsNumber: number;
}

export function useCSPagination(initialSortBy: string = "id") {
  const [pagination, setPagination] = useState<PaginationState>({
    sortBy: initialSortBy,
    descending: false,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0,
  });

  const handleSort = (columnId: string) => {
    setPagination((prev) => ({
      ...prev,
      sortBy: columnId,
      descending: prev.sortBy === columnId ? !prev.descending : false,
      page: 1, // Reset về trang 1 khi đổi tiêu chí sắp xếp
    }));
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleRowsPerPageChange = (size: number) => {
    setPagination((prev) => ({ ...prev, rowsPerPage: size, page: 1 }));
  };

  const setTotalRows = (total: number) => {
    setPagination((prev) => ({ ...prev, rowsNumber: total }));
  };

  return {
    pagination,
    handleSort,
    handlePageChange,
    handleRowsPerPageChange,
    setTotalRows,
  };
}
