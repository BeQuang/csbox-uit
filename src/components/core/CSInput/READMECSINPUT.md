# 📦 CSInput Component

CSInput là một **React controlled input component** được xây dựng theo **Design System nội bộ**, tập trung vào:

- UX rõ ràng cho form
- Xử lý tốt các case nhập liệu thực tế (password, number, unit…)
- API thống nhất, dễ mở rộng cho hệ thống lớn

> 🎯 Mục tiêu: thay thế `<input />` mặc định bằng **một component duy nhất**, dùng xuyên suốt toàn bộ form.

---

## 🧠 Cách CSInput hoạt động

CSInput là **controlled component 100%**:

- Không tự lưu giá trị nhập
- `value` luôn được truyền từ component cha
- Mọi thay đổi đều thông qua `onChange`

```txt
User nhập → CSInput xử lý format/UI → onChange(value) → Parent update state → CSInput render lại
```

Điều này giúp:

- Dễ tích hợp với React Hook Form, Formik, Redux Form…
- Logic dữ liệu luôn tập trung ở parent

---

## 🚀 Cài đặt

```bash
npm install lucide-react
```

```ts
import CSInput from "@/components/core/CSInput";
```

---

## ✨ Tính năng nổi bật

CSInput không chỉ là input thường, mà được thiết kế để xử lý **các tình huống form thực tế trong admin/dashboard**:

- ✏️ Text / Number / Password
- 👁️ Hiện / Ẩn mật khẩu
- 🧹 Clear nhanh nội dung
- 🔢 Format số (thousand separator, decimal)
- 📐 Hỗ trợ đơn vị (unit / unit select)
- 🎨 Variant theo Design System
- ♿ Hỗ trợ keyboard & accessibility cơ bản

---

## 📖 Các cách sử dụng phổ biến

### 1️⃣ Input text cơ bản

```tsx
const [name, setName] = useState("");

<CSInput
  label="Tên sản phẩm"
  placeholder="Nhập tên"
  value={name}
  onChange={setName}
/>;
```

---

### 2️⃣ Input password (ẩn / hiện)

```tsx
const [password, setPassword] = useState("");

<CSInput
  label="Mật khẩu"
  type="password"
  value={password}
  onChange={setPassword}
  required
/>;
```

🔐 CSInput tự xử lý:

- Toggle Eye / EyeOff
- Giữ nguyên value ở parent

---

### 3️⃣ Input số có format

👉 Phù hợp cho tiền, số lượng, giá trị lớn.

```tsx
const [price, setPrice] = useState("");

<CSInput
  label="Giá bán"
  type="number"
  value={price}
  onChange={setPrice}
  formatNumber
  decimalSeparator="," // hoặc "."
/>;
```

📌 Cách hoạt động:

- UI hiển thị: `1,000,000`
- Value trả ra: `1000000` (chuẩn số học)

---

### 4️⃣ Input kèm đơn vị (unit)

```tsx
<CSInput label="Khối lượng" value={weight} onChange={setWeight} unit="kg" />
```

---

### 5️⃣ Input kèm nhiều đơn vị (select)

```tsx
const [unit, setUnit] = useState("kg");

<CSInput
  label="Kích thước"
  value={size}
  onChange={setSize}
  units={["px", "rem", "%"]}
  selectedUnit={unit}
  onChangeUnit={setUnit}
/>;
```

---

## 🛠️ Props API

| Prop               | Kiểu                                              | Mặc định  | Ý nghĩa           |
| ------------------ | ------------------------------------------------- | --------- | ----------------- |
| `label`            | `string`                                          | -         | Nhãn input        |
| `required`         | `boolean`                                         | `false`   | Hiện dấu \*       |
| `value`            | `string \| number`                                | -         | Giá trị input     |
| `onChange`         | `(val: string) => void`                           | -         | Callback thay đổi |
| `type`             | `text \| number \| password`                      | `text`    | Kiểu input        |
| `formatNumber`     | `boolean`                                         | `false`   | Format số         |
| `decimalSeparator` | `"." \| ","`                                      | `"."`     | Dấu thập phân     |
| `unit`             | `string`                                          | -         | Đơn vị cố định    |
| `units`            | `string[]`                                        | -         | Danh sách đơn vị  |
| `selectedUnit`     | `string`                                          | -         | Đơn vị đang chọn  |
| `onChangeUnit`     | `(unit: string) => void`                          | -         | Đổi đơn vị        |
| `prependIcon`      | `ReactNode`                                       | -         | Icon đầu input    |
| `disabled`         | `boolean`                                         | `false`   | Vô hiệu hóa       |
| `variant`          | `default \| success \| warning \| danger \| info` | `default` | Trạng thái        |
| `error`            | `string`                                          | -         | Thông báo lỗi     |

---

## 🎨 Styling & Variant

CSInput sử dụng **CSS Variables + modifier class**:

- `cs-input--error`
- `cs-input--success`
- `cs-input--warning`
- `cs-input--info`

Tự động kế thừa theme:

- `--color-primary`
- `--color-danger`
- `--radius-md`

---

## ⚠️ Lưu ý quan trọng

- CSInput **không dùng uncontrolled**
- `formatNumber` chỉ ảnh hưởng UI, **value luôn chuẩn số học**
- Với `units`, bạn cần tự quản lý `selectedUnit`

---

## ✅ Khi nào nên dùng CSInput?

✔ Form Admin / Dashboard
✔ Nhập số liệu, tiền tệ
✔ Password / Sensitive data
✔ Design System dùng chung

> CSInput được thiết kế để **dễ dùng – khó sai – dễ mở rộng**.
