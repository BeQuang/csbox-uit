# 📦 CSSelect Component

CSSelect là một **React controlled component** dùng để chọn dữ liệu dạng **dropdown**, được xây dựng trên **Radix UI Popover** và đồng bộ theo **Design System nội bộ**. Component này được thiết kế để dùng chung cho nhiều ngữ cảnh khác nhau nhưng vẫn giữ API nhất quán và dễ mở rộng.

> 🎯 Mục tiêu: chỉ cần học **1 component**, có thể dùng cho **Single Select**, **Multiple Select** và **Grouped Select**.

---

## 🧠 Cách CSSelect hoạt động

CSSelect là **controlled component 100%**:

- ❗ Không tự lưu state giá trị được chọn
- Giá trị luôn đi **từ ngoài vào (`value`)**
- Mọi thay đổi đều đi **ra ngoài (`onChange`)**

```txt
User click → CSSelect xử lý UI → onChange(value) → Parent update state → CSSelect render lại
```

Điều này giúp:

- Đồng bộ dễ với Form, React Hook Form, Redux, Zustand...
- Không bị lệ thuộc logic bên trong component

---

## 🚀 Cài đặt

```bash
npm install @radix-ui/react-popover @radix-ui/react-tooltip lucide-react
```

```ts
import CSSelect from "@/components/core/CSSelect";
```

---

## 🧩 Các kiểu dữ liệu hỗ trợ

### Option (dữ liệu phẳng)

```ts
export interface CSSelectOption {
  label: string;
  value: string;
}
```

### Group (dữ liệu phân nhóm)

```ts
export interface CSSelectGroup {
  group: string;
  items: CSSelectOption[];
}
```

---

## ✨ Tính năng nổi bật

Ngoài các chức năng select cơ bản, CSSelect còn được thiết kế để xử lý tốt các **case UI phức tạp trong dashboard/admin**:

- ✅ Single / Multiple / Grouping Select
- 🔍 Search dữ liệu (flat & grouped)
- 🏷️ Hiển thị tag khi multiple select
- ➕ Giới hạn số tag hiển thị (`maxTagDisplay`)
- 💬 **Tooltip hiển thị đầy đủ các tag bị ẩn** (khi vượt `maxTagDisplay`)
- ☑️ Select All / Clear All
- ⏳ Loading state
- 🎨 Variant theo Design System

---

## 📖 3 cách sử dụng chính

CSSelect chỉ có **1 component duy nhất**, nhưng được sử dụng theo **3 kiểu phổ biến** dưới đây.

---

### 1️⃣ Single Select (dữ liệu phẳng)

👉 Dùng khi **chỉ chọn 1 giá trị duy nhất** (status, type, enum...).

**Đặc điểm hoạt động**:

- `multiple = false` (mặc định)
- `value` là `string`
- Chọn xong → dropdown tự đóng

```tsx
const [value, setValue] = useState("active");

const options = [
  { label: "Hoạt động", value: "active" },
  { label: "Tạm dừng", value: "paused" },
  { label: "Đã xóa", value: "deleted" },
];

<CSSelect
  label="Trạng thái"
  placeholder="Chọn trạng thái"
  options={options}
  value={value}
  onChange={(v) => setValue(v as string)}
  isSearchable
  showClearAll
/>;
```

---

### 2️⃣ Multiple Select (dữ liệu phẳng)

👉 Dùng khi **chọn nhiều giá trị cùng lúc** (tags, roles, permissions...).

**Đặc điểm hoạt động**:

- `multiple = true`
- `value` là `string[]`
- Hiển thị tag đã chọn
- Có thể chọn / bỏ từng tag

```tsx
const [values, setValues] = useState<string[]>(["active", "paused"]);

<CSSelect
  label="Tags dự án"
  placeholder="Chọn nhiều tag"
  options={options}
  value={values}
  onChange={(v) => setValues(v as string[])}
  multiple
  isSearchable
  maxTagDisplay={3}
  showSelectAll
  showClearAll
/>;
```

📌 Khi số tag vượt `maxTagDisplay`, component sẽ hiển thị `+n` để giữ layout gọn gàng.

💬 **Tooltip thông minh**:

- Hover vào `+n` sẽ hiển thị tooltip
- Tooltip liệt kê **toàn bộ label của các option đang bị ẩn**
- Giúp người dùng xem đầy đủ dữ liệu mà **không cần mở dropdown lại**

---

### 3️⃣ Grouping Select (dữ liệu phân nhóm)

👉 Dùng khi dữ liệu **nhiều và cần phân loại rõ ràng**.

**Đặc điểm hoạt động**:

- `options` là `CSSelectGroup[]`
- Search hoạt động **xuyên nhóm**
- Có thể dùng cho Single hoặc Multiple

```tsx
const [value, setValue] = useState("");

const groupedOptions = [
  {
    group: "Trạng thái hệ thống",
    items: [
      { label: "Bản nháp", value: "draft" },
      { label: "Đang bảo trì", value: "maintenance" },
    ],
  },
  {
    group: "Tiến trình Game",
    items: [
      { label: "Đang thi đấu", value: "playing" },
      { label: "Hoàn thành", value: "completed" },
    ],
  },
];

<CSSelect
  label="Phân loại hệ thống"
  options={groupedOptions}
  value={value}
  onChange={(v) => setValue(v as string)}
  isSearchable
/>;
```

---

## 🛠️ Props API

### Props liên quan đến Tooltip

| Prop            | Kiểu     | Mô tả                                    |
| --------------- | -------- | ---------------------------------------- |
| `maxTagDisplay` | `number` | Số tag hiển thị trước khi gộp thành `+n` |

📌 Tooltip **tự động kích hoạt** khi:

- `multiple = true`
- Số lượng value > `maxTagDisplay`

> Tooltip sử dụng **Radix UI Tooltip**, đảm bảo accessibility và positioning chính xác.

---

## 🛠️ Props API

| Prop            | Kiểu                                              | Mặc định  | Ý nghĩa            |
| --------------- | ------------------------------------------------- | --------- | ------------------ |
| `label`         | `string`                                          | -         | Nhãn hiển thị      |
| `required`      | `boolean`                                         | `false`   | Hiện dấu \*        |
| `options`       | `Option[] \| Group[]`                             | -         | Dữ liệu select     |
| `value`         | `string \| string[]`                              | -         | Giá trị được chọn  |
| `onChange`      | `(val) => void`                                   | -         | Callback thay đổi  |
| `multiple`      | `boolean`                                         | `false`   | Chọn nhiều         |
| `isSearchable`  | `boolean`                                         | `false`   | Bật search         |
| `showSelectAll` | `boolean`                                         | `false`   | Chọn tất cả        |
| `showClearAll`  | `boolean`                                         | `false`   | Xóa nhanh          |
| `maxTagDisplay` | `number`                                          | `3`       | Giới hạn tag       |
| `isLoading`     | `boolean`                                         | `false`   | Trạng thái loading |
| `variant`       | `default \| success \| warning \| danger \| info` | `default` | Màu sắc            |
| `error`         | `string`                                          | -         | Thông báo lỗi      |

---

## 🎨 Styling & Variant

CSSelect sử dụng **CSS Variables**, tự động kế thừa theme của hệ thống:

- `--color-primary`
- `--color-danger`
- `--radius-md`

Variant chỉ thay đổi **semantic color**, không ảnh hưởng logic.

---

## ⚠️ Lưu ý quan trọng

- CSSelect **không dùng uncontrolled**
- `value` phải đúng kiểu với `multiple`
- Không truyền object vào `value`, chỉ dùng `string`

---

## ✅ Khi nào nên dùng CSSelect?

✔ Form Admin / Dashboard
✔ Filter / Search nâng cao
✔ Design System dùng chung

> CSSelect được thiết kế để **ổn định – dễ đọc – khó dùng sai**.
