# 📦 CSSelect Component

**CSSelect** là một React Component tùy chỉnh mạnh mẽ, được xây dựng trên nền tảng **Radix UI Popover** và **Lucide React**. Component này hỗ trợ cả chế độ **chọn đơn (Single)** và **chọn nhiều (Multiple)** với giao diện hiện đại, dễ dàng tùy chỉnh theo **Design System** của dự án.

---

## ✨ Tính năng chính

- ✅ **Single & Multiple**: Hỗ trợ chọn một giá trị hoặc nhiều giá trị linh hoạt.
- ✅ **Searchable**: Tích hợp ô tìm kiếm để lọc dữ liệu nhanh chóng trong danh sách.
- ✅ **Grouping**: Hiển thị dữ liệu theo nhóm (Category) giúp phân loại thông tin rõ ràng.
- ✅ **Variants**: Hỗ trợ 5 trạng thái màu sắc: `default`, `success`, `warning`, `danger`, `info`.
- ✅ **Select All**: Tùy chọn chọn tất cả các item nhanh chóng cho chế độ Multiple.
- ✅ **Loading State**: Hiển thị thông báo khi dữ liệu đang được tải về.
- ✅ **Clearable**: Xóa nhanh các lựa chọn bằng icon **Trash2**.

---

## 🚀 Hướng dẫn cài đặt

Trước khi sử dụng, hãy đảm bảo bạn đã cài đặt các thư viện cần thiết:

```bash
npm install @radix-ui/react-popover lucide-react
```

---

## 🛠️ API Reference (Props)

| Prop            | Kiểu dữ liệu          | Mặc định    | Mô tả                                           |
| --------------- | --------------------- | ----------- | ----------------------------------------------- |
| `label`         | `string`              | -           | Nhãn hiển thị phía trên Select                  |
| `required`      | `boolean`             | `false`     | Hiển thị dấu `*` đỏ bên cạnh nhãn               |
| `options`       | `Option[] \| Group[]` | -           | Mảng dữ liệu đầu vào (phẳng hoặc theo nhóm)     |
| `value`         | `string \| string[]`  | -           | Giá trị hiện tại đang được chọn                 |
| `onChange`      | `(val) => void`       | -           | Callback trả về giá trị mới khi thay đổi        |
| `multiple`      | `boolean`             | `false`     | Bật chế độ cho phép chọn nhiều giá trị          |
| `isSearchable`  | `boolean`             | `false`     | Hiển thị ô tìm kiếm trong dropdown              |
| `showSelectAll` | `boolean`             | `false`     | Hiển thị tùy chọn chọn tất cả (Multiple)        |
| `variant`       | `CSSelectVariant`     | `"default"` | Màu sắc hiển thị (`success`, `danger`, ...)     |
| `maxTagDisplay` | `number`              | `3`         | Số tag tối đa hiển thị trước khi gộp thành `+n` |
| `isLoading`     | `boolean`             | `false`     | Hiển thị trạng thái đang tải dữ liệu            |
| `error`         | `string`              | -           | Thông báo lỗi hiển thị phía dưới component      |

---

## 📖 Ví dụ sử dụng

### 1. Chọn đơn cơ bản (Single Select)

```tsx
import CSSelect from "./components/core/CSSelect";

const statusOptions = [
  { label: "Hoạt động", value: "active" },
  { label: "Tạm dừng", value: "paused" },
  { label: "Đã xóa", value: "deleted" },
];

<CSSelect
  label="Trạng thái"
  options={statusOptions}
  value={val}
  onChange={(v) => setVal(v as string)}
/>;
```

---

### 2. Chọn nhiều với Tìm kiếm & Phân nhóm

```tsx
<CSSelect
  label="Dự án Multiple"
  multiple
  isSearchable
  showSelectAll
  variant="success"
  options={[
    {
      group: "Phòng kỹ thuật",
      items: [
        { label: "Nguyễn Văn A", value: "a" },
        { label: "Trần Thị B", value: "b" },
      ],
    },
    {
      group: "Phòng nhân sự",
      items: [{ label: "Lê Văn C", value: "c" }],
    },
  ]}
  value={["a", "b"]}
  onChange={(v) => console.log(v)}
/>
```

---

## 🎨 Tùy chỉnh CSS (SCSS Variables)

Component sử dụng hệ thống **CSS Variables** để dễ dàng đồng bộ với UI chung. Hãy đảm bảo các biến sau đã được khai báo trong file CSS toàn cục (`variables.scss` hoặc tương đương):

```scss
--color-primary: #1677ff; // Màu chủ đạo
--color-danger: #ff4d4f; // Màu lỗi / xóa
--color-border: #d9d9d9; // Màu viền
--radius-md: 8px; // Bo góc Select
```

---

## 📝 Lưu ý quan trọng

- 🗑️ **Icon Thùng rác**: Toàn bộ icon xóa (từng tag và xóa tất cả) đã được thống nhất dùng **Trash2**.
- 🧩 **Layout Fix**: Component đã xử lý `flex-wrap` để khi chọn nhiều tag, các tag sẽ tự động xuống dòng mà không làm vỡ layout.

---

> 💡 CSSelect được thiết kế theo hướng **headless + design-system friendly**, phù hợp cho các dự án enterprise hoặc admin dashboard yêu cầu khả năng tái sử dụng cao.
