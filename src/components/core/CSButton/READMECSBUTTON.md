# 📦 CSButton Component

CSButton là **React Button component** được thiết kế cho **Design System nội bộ**, tập trung vào:

- Tính nhất quán UI / UX
- API rõ ràng, khó dùng sai
- Dùng tốt cho cả **Button**, **Link**, **Action Trigger** trong Dashboard / Admin

CSButton hỗ trợ đầy đủ các trạng thái thường gặp trong sản phẩm thực tế: loading, disabled, icon, full width, submit form và render linh hoạt thông qua `asChild`.

---

## 🧠 Cách CSButton hoạt động

CSButton là **controlled UI component một phần**:

- ❗ Không quản lý state business
- Chỉ kiểm soát **trạng thái hiển thị** (`loading`, `disabled`)
- Hành vi click được **chặn an toàn** khi `loading` hoặc `disabled`

```txt
User click → CSButton kiểm tra state → onClick (nếu hợp lệ)
```

Điều này giúp:

- Tránh double submit
- Tránh trigger action khi đang loading
- Dễ tích hợp với form / mutation / API

---

## 🚀 Cài đặt

```bash
npm install @radix-ui/react-slot lucide-react react-spinners
```

```ts
import CSButton from "@/components/core/CSButton/CSButton";
```

📌 **Vai trò các thư viện**:

| Thư viện               | Mục đích                                               |
| ---------------------- | ------------------------------------------------------ |
| `@radix-ui/react-slot` | Hỗ trợ `asChild` để render Link / a / custom component |
| `lucide-react`         | Icon SVG (Plus, Send, Download, …)                     |
| `react-spinners`       | Hiển thị loading spinner                               |

---

## ✨ Tính năng nổi bật

- 🎨 **Color & Variant system** (solid / outline / ghost)
- 📏 **Size linh hoạt** (sm / md / lg)
- ⏳ **Loading state** (tự khóa click + spinner)
- 🚫 **Disabled state** (UI & behavior)
- 📐 **Full width / Auto width**
- 🔁 **asChild pattern** (Button = Link / a / RouterLink)
- 🧩 Hoạt động tốt trong form submit

---

## 📖 Các cách sử dụng phổ biến

CSButton chỉ có **1 component**, nhưng được dùng theo nhiều ngữ cảnh khác nhau.

---

### 1️⃣ Button cơ bản

```tsx
<CSButton>Submit</CSButton>
<CSButton variant="outline">Cancel</CSButton>
<CSButton variant="ghost">Xem thêm</CSButton>
```

---

### 2️⃣ Color system

```tsx
<CSButton color="primary">Primary</CSButton>
<CSButton color="success">Success</CSButton>
<CSButton color="danger">Delete</CSButton>
<CSButton color="warning">Warning</CSButton>
<CSButton color="info">Info</CSButton>
```

> Color chỉ ảnh hưởng **semantic**, không ảnh hưởng logic.

---

### 3️⃣ Size

```tsx
<CSButton size="sm">Small</CSButton>
<CSButton size="md">Medium</CSButton>
<CSButton size="lg">Large</CSButton>
```

---

### 4️⃣ Loading & Disabled

```tsx
<CSButton loading>Đang xử lý...</CSButton>

<CSButton disabled>Nút bị khóa</CSButton>
```

📌 Khi `loading = true`:

- Spinner hiển thị
- Nội dung bị ẩn
- Click bị chặn hoàn toàn

---

### 5️⃣ Button có Icon

```tsx
<CSButton color="success">
  <Plus size={16} /> Thêm mới
</CSButton>
```

CSButton **không ép layout icon**, cho phép tự do sắp xếp.

---

### 6️⃣ Full width Button

```tsx
<CSButton width="full">Gửi biểu mẫu</CSButton>
```

---

### 7️⃣ asChild – Button dạng Link / Router

CSButton hỗ trợ **Radix Slot pattern** để render thành component khác.

```tsx
<CSButton asChild variant="outline">
  <Link to="/users">Danh sách người dùng</Link>
</CSButton>
```

📌 **Lưu ý quan trọng khi dùng `asChild`**:

- `children` **phải là 1 element duy nhất**
- Không hỗ trợ spinner tự động (tránh lỗi Slot)

---

## 🛠️ Props API

| Prop        | Kiểu                                              | Mặc định  | Mô tả                 |
| ----------- | ------------------------------------------------- | --------- | --------------------- |
| `children`  | `ReactNode`                                       | -         | Nội dung button       |
| `onClick`   | `(e) => void`                                     | -         | Callback click        |
| `color`     | `primary \| success \| warning \| danger \| info` | `primary` | Màu semantic          |
| `variant`   | `solid \| outline \| ghost`                       | `solid`   | Kiểu hiển thị         |
| `size`      | `sm \| md \| lg`                                  | `md`      | Kích thước            |
| `loading`   | `boolean`                                         | `false`   | Trạng thái loading    |
| `disabled`  | `boolean`                                         | `false`   | Vô hiệu hóa           |
| `width`     | `auto \| full`                                    | `auto`    | Chiều rộng            |
| `type`      | `button \| submit \| reset`                       | `button`  | HTML button type      |
| `asChild`   | `boolean`                                         | `false`   | Render component khác |
| `className` | `string`                                          | -         | Custom CSS            |

---

## 🎨 Styling & Variant

CSButton sử dụng **CSS Variables** và modifier class:

- `cs-btn--primary`, `cs-btn--danger`, …
- `cs-btn--solid`, `cs-btn--outline`, `cs-btn--ghost`
- `cs-btn--sm`, `cs-btn--md`, `cs-btn--lg`

👉 Dễ override trong Design System mà không phá API.

---

## ⚠️ Lưu ý quan trọng

- Không dùng `onClick` để xử lý async mà **quên set `loading`**
- Với `asChild`, tự kiểm soát accessibility
- CSButton **không tự inject icon**, layout do consumer quyết định

---

## ✅ Khi nào nên dùng CSButton?

✔ Button hành động trong Admin / Dashboard
✔ Submit / Action Button
✔ Link có style như Button
✔ Design System dùng chung

> CSButton được thiết kế để **linh hoạt – an toàn – nhất quán UI**.
