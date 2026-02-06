# 📊 CSTable – Data Table chuẩn Design System

**CSTable** là component bảng dữ liệu dùng chung trong hệ thống, được xây dựng trên nền tảng **@tanstack/react-table v8**. Component hỗ trợ đầy đủ các nhu cầu hiển thị dữ liệu trong các màn hình quản trị theo chuẩn Design System.

CSTable được thiết kế theo hướng **server-side controlled table** — toàn bộ sorting, pagination và data fetching đều do component cha quản lý thông qua API.

---

## ✨ Tính năng nổi bật

✅ Xây dựng trên TanStack Table v8  
✅ Sticky header khi scroll  
✅ Sticky column trái / phải  
✅ Hỗ trợ row selection  
✅ Hỗ trợ server-side sorting (icon + callback)  
✅ Loading overlay & initial loading state  
✅ Empty state khi không có dữ liệu  
✅ Theme màu theo Design System  
`primary | success | warning | danger | info`  
✅ Phân trang tách riêng qua **CSPagination**  
✅ Hook quản lý state chuẩn: **useCSPagination**

---

## 🧠 Data Flow (QUAN TRỌNG)

CSTable hoạt động theo cơ chế **server-side control**:

```
User click sort / đổi trang / đổi page size
            ↓
useCSPagination cập nhật state
            ↓
Component cha gọi API với state mới
            ↓
API trả về: items + total
            ↓
setData(items) & setTotalRows(total)
            ↓
CSTable render lại
```

### CSTable KHÔNG tự xử lý

❌ Không tự sort data  
❌ Không tự phân trang data  
❌ Không tự filter data

👉 Mọi xử lý dữ liệu đều nằm ở phía **server/API**

---

## 📦 Cài đặt

```bash
npm install @tanstack/react-table
```

---

## 📥 Import

```ts
import CSTable from "@/components/core/CSTable/CSTable";
import CSPagination from "@/components/core/CSTable/CSPagination";
import { useCSPagination } from "@/components/core/CSTable/useCSPagination";
```

---

## 1️⃣ Cách dùng cơ bản

```tsx
<CSTable columns={columns} data={data} />
```

---

## 2️⃣ Ví dụ đầy đủ (Sort + Select + Pagination)

```tsx
const {
  pagination,
  handlePageChange,
  handleRowsPerPageChange,
  handleSort,
  setTotalRows,
} = useCSPagination("id");

const [rowSelection, setRowSelection] = useState({});
const [data, setData] = useState<User[]>([]);

useEffect(() => {
  const fetchUsers = async () => {
    const res = await api.getUsers({
      page: pagination.page,
      limit: pagination.rowsPerPage,
      sortBy: pagination.sortBy,
      order: pagination.descending ? "desc" : "asc",
    });

    setData(res.items);
    setTotalRows(res.total); // 🔥 BẮT BUỘC để pagination đúng
  };

  fetchUsers();
}, [
  pagination.page,
  pagination.rowsPerPage,
  pagination.sortBy,
  pagination.descending,
]);

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
      rowsNumber={pagination.rowsNumber}
      onPageChange={handlePageChange}
      onPageSizeChange={handleRowsPerPageChange}
    />
  }
/>;
```

---

## 3️⃣ Props của CSTable

| Prop                 | Kiểu                       | Mặc định | Mô tả                          |
| -------------------- | -------------------------- | -------- | ------------------------------ |
| columns              | ColumnDef<TData>[]         | —        | Cấu hình cột                   |
| data                 | TData[]                    | —        | Dữ liệu của trang hiện tại     |
| header               | ReactNode                  | —        | Thanh phía trên bảng           |
| footer               | ReactNode                  | —        | Footer (thường là phân trang)  |
| isStriped            | boolean                    | true     | Hiển thị zebra row             |
| isHoverable          | boolean                    | true     | Highlight khi hover            |
| loading              | boolean                    | false    | Trạng thái loading             |
| color                | TableColor                 | primary  | Theme màu bảng                 |
| maxHeight            | number                     | —        | Chiều cao tối đa để bật scroll |
| sortBy               | string                     | —        | ID cột đang sort               |
| descending           | boolean                    | —        | Hướng sort                     |
| onSort               | (columnId: string) => void | —        | Callback khi click header      |
| rowSelection         | RowSelectionState          | {}       | State selected rows            |
| onRowSelectionChange | function                   | —        | Callback khi chọn dòng         |

---

## 4️⃣ Định nghĩa Column

```ts
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
    enableSorting: true, // ⚠️ Phải bật nếu muốn sort
  },
];
```

### ⚠️ Sorting Rule

Mặc định cột **KHÔNG được sort**.  
Muốn bật sort:

```ts
{
  accessorKey: "name",
  header: "Họ tên",
  enableSorting: true
}
```

Nếu không có `enableSorting: true` → icon sort sẽ không xuất hiện.

---

## 📌 Sticky Column

```ts
meta: {
  sticky: true,
  stickySide: "left" // hoặc "right"
}
```

🔸 Khuyến nghị chỉ dùng **tối đa 1 cột mỗi bên** để tránh vỡ layout.

---

## 5️⃣ Loading States

### Loading khi đã có dữ liệu

```tsx
<CSTable data={data} columns={columns} loading />
```

### Loading ban đầu (chưa có data)

```tsx
<CSTable data={[]} columns={columns} loading />
```

---

## 6️⃣ Empty State

```tsx
<CSTable data={[]} columns={columns} />
```

Hiển thị: **"Không có dữ liệu hiển thị."**

---

## 7️⃣ Scroll & Sticky Header

```tsx
<CSTable columns={columns} data={data} maxHeight={400} />
```

✔ Header cố định  
✔ Body cuộn dọc

---

## 8️⃣ CSPagination

```tsx
<CSPagination
  page={page}
  rowsPerPage={rowsPerPage}
  rowsNumber={totalRows}
  onPageChange={setPage}
  onPageSizeChange={setRowsPerPage}
/>
```

---

## 9️⃣ useCSPagination Hook

```ts
const {
  pagination,
  handleSort,
  handlePageChange,
  handleRowsPerPageChange,
  setTotalRows,
} = useCSPagination("id");
```

### State quản lý

```ts
{
  (sortBy, descending, page, rowsPerPage, rowsNumber);
}
```

---

## 🔒 Controlled Component

CSTable là **controlled component**

| State         | Quản lý ở đâu |
| ------------- | ------------- |
| Sorting       | Component cha |
| Pagination    | Component cha |
| Row Selection | Component cha |

---

## ✅ Best Practices

✔ Luôn gọi `setTotalRows(total)` sau mỗi lần fetch API  
✔ Không truyền toàn bộ data khi dùng server-side pagination  
✔ Sticky column chỉ nên dùng tối đa 1 cột mỗi bên  
✔ Không xử lý sort/filter ở client nếu đã dùng server-side

---

## 🎯 Khi nào nên dùng CSTable?

| Trường hợp             | Dùng CSTable |
| ---------------------- | ------------ |
| Danh sách người dùng   | ✅           |
| Quản lý đơn hàng       | ✅           |
| Bảng báo cáo           | ✅           |
| Layout tĩnh không data | ❌           |

---

**CSTable** giúp toàn hệ thống có một chuẩn bảng dữ liệu thống nhất, mạnh mẽ và dễ mở rộng. 🚀
