# 📊 CSTable – Bảng dữ liệu chuẩn Design System

`CSTable` là component bảng dữ liệu dùng chung trong hệ thống, xây dựng trên nền tảng **@tanstack/react-table**, hỗ trợ:

- Sticky column trái/phải
- Chọn dòng (row selection)
- Sắp xếp (server-side sort trigger)
- Loading states
- Scroll cố định header
- Theme màu theo Design System
- Tích hợp phân trang với `CSPagination`

---

## 🚀 Tính năng nổi bật

✅ Dựa trên **TanStack Table v8**  
✅ Sticky header khi scroll  
✅ Sticky column trái/phải  
✅ Hỗ trợ **row selection (checkbox)**  
✅ Hỗ trợ **sort icon + callback server-side**  
✅ Có **loading overlay** & **initial loading**  
✅ Có **empty state**  
✅ Theme màu: `primary | success | warning | danger | info`  
✅ Tách riêng `CSPagination` + `useCSPagination` để quản lý state

---

## 📦 Cài đặt

```bash
npm install @tanstack/react-table
```

---

## 📥 Import

```tsx
import CSTable from "@/components/core/CSTable/CSTable";
import CSPagination from "@/components/core/CSTable/CSPagination";
import { useCSPagination } from "@/components/core/CSTable/useCSPagination";
```

---

# 1️⃣ Cách dùng cơ bản

```tsx
<CSTable columns={columns} data={data} />
```

---

# 2️⃣ Ví dụ đầy đủ (Sort + Select + Pagination)

```tsx
const { pagination, handlePageChange, handleRowsPerPageChange, handleSort } =
  useCSPagination("id");

const [rowSelection, setRowSelection] = useState({});

<CSTable
  data={data}
  columns={columns}
  rowSelection={rowSelection}
  onRowSelectionChange={setRowSelection}
  sortBy={pagination.sortBy}
  descending={pagination.descending}
  onSort={handleSort}
  header={<div>Danh sách người dùng</div>}
  footer={
    <CSPagination
      page={pagination.page}
      rowsPerPage={pagination.rowsPerPage}
      rowsNumber={totalRows}
      onPageChange={handlePageChange}
      onPageSizeChange={handleRowsPerPageChange}
    />
  }
/>;
```

---

# 3️⃣ Props của CSTable

| Prop                   | Kiểu                 | Mặc định  | Mô tả                          |
| ---------------------- | -------------------- | --------- | ------------------------------ |
| `columns`              | `ColumnDef<TData>[]` | —         | Cấu hình cột                   |
| `data`                 | `TData[]`            | —         | Dữ liệu bảng                   |
| `header`               | `ReactNode`          | —         | Thanh phía trên bảng           |
| `footer`               | `ReactNode`          | —         | Footer (thường là phân trang)  |
| `isStriped`            | `boolean`            | `true`    | Sọc zebra                      |
| `isHoverable`          | `boolean`            | `true`    | Hover highlight                |
| `loading`              | `boolean`            | `false`   | Trạng thái loading             |
| `color`                | `TableColor`         | `primary` | Theme màu                      |
| `maxHeight`            | `number`             | —         | Chiều cao tối đa để bật scroll |
| `sortBy`               | `string`             | —         | ID cột đang sort               |
| `descending`           | `boolean`            | —         | Hướng sort                     |
| `onSort`               | `(columnId) => void` | —         | Callback khi click header      |
| `rowSelection`         | `RowSelectionState`  | `{}`      | State selected rows            |
| `onRowSelectionChange` | `fn`                 | —         | Callback khi chọn dòng         |

---

# 4️⃣ Định nghĩa Column

```tsx
const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    enableSorting: false,
    meta: { sticky: true, stickySide: "left" },
  },
  {
    accessorKey: "name",
    header: "Họ tên",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: () => <button>Sửa</button>,
    enableSorting: false,
    meta: { sticky: true, stickySide: "right" },
  },
];
```

---

## 📌 Sticky Column

Để cố định cột trái/phải:

```ts
meta: {
  sticky: true,
  stickySide: "left" // hoặc "right"
}
```

---

## 🔃 Sorting (Server-side)

CSTable **không tự sort data**, mà chỉ bắn sự kiện:

```tsx
<CSTable
  sortBy={pagination.sortBy}
  descending={pagination.descending}
  onSort={handleSort}
/>
```

Hook hỗ trợ:

```tsx
const { pagination, handleSort } = useCSPagination("id");
```

---

# 5️⃣ Loading States

### Loading khi đã có dữ liệu (overlay)

```tsx
<CSTable data={data} columns={columns} loading />
```

### Loading ban đầu (chưa có data)

```tsx
<CSTable data={[]} columns={columns} loading />
```

---

# 6️⃣ Empty State

```tsx
<CSTable data={[]} columns={columns} />
```

Hiển thị: **"Không có dữ liệu hiển thị."**

---

# 7️⃣ Theme màu

```tsx
color = "primary" | "success" | "warning" | "danger" | "info";
```

Áp dụng cho:

- Border top
- Header background
- Hover row
- Spinner
- Pagination active

---

# 8️⃣ Scroll & Sticky Header

```tsx
<CSTable columns={columns} data={data} maxHeight={400} />
```

Khi đó:

- Header cố định
- Body cuộn dọc

---

# 9️⃣ CSPagination

```tsx
<CSPagination
  page={page}
  rowsPerPage={rowsPerPage}
  rowsNumber={totalRows}
  onPageChange={setPage}
  onPageSizeChange={setRowsPerPage}
/>
```

### Props

| Prop               | Mô tả                 |
| ------------------ | --------------------- |
| `page`             | Trang hiện tại        |
| `rowsPerPage`      | Số dòng mỗi trang     |
| `rowsNumber`       | Tổng số dòng          |
| `onPageChange`     | Đổi trang             |
| `onPageSizeChange` | Đổi số dòng mỗi trang |

---

# 🔟 useCSPagination Hook

```tsx
const {
  pagination,
  handleSort,
  handlePageChange,
  handleRowsPerPageChange,
  setTotalRows,
} = useCSPagination("id");
```

### State trả về

```ts
{
  (sortBy, descending, page, rowsPerPage, rowsNumber);
}
```

---

## 🎯 Khi nào nên dùng CSTable?

| Trường hợp                | Dùng CSTable |
| ------------------------- | ------------ |
| Danh sách người dùng      | ✅           |
| Bảng quản lý đơn hàng     | ✅           |
| Bảng báo cáo              | ✅           |
| Layout tĩnh không có data | ❌           |

---

CSTable giúp toàn bộ hệ thống có **một chuẩn bảng dữ liệu thống nhất, mạnh mẽ và mở rộng dễ dàng** 🚀
