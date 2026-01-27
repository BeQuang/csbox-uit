# 🪟 CSModal – Hệ thống Modal chuẩn Design System

`CSModal` là component **Modal/Dialog dùng chung** cho toàn bộ ứng dụng, xây dựng trên nền tảng **Radix UI Dialog**, tối ưu hiệu năng và hỗ trợ **Compound Component Pattern** giúp layout linh hoạt hơn.

> 🎯 Mục tiêu: Modal thống nhất giao diện, dễ mở rộng, dễ kiểm soát layout và tái sử dụng trong toàn hệ thống.

---

## 🚀 Tính năng nổi bật

✅ Dựa trên **Radix Dialog** → chuẩn accessibility  
✅ Render bằng **Portal** → không bị ảnh hưởng layout cha  
✅ Hỗ trợ nhiều kích thước (`sm → full screen`)  
✅ Hỗ trợ màu theo **Design System**  
✅ Có thể bật **border top accent** và **shadow**  
✅ **Hiệu năng cao** với `React.memo` + `forwardRef`  
✅ **Compound Components API** → tự do bố cục Header / Body / Footer

---

## 📦 Cài đặt

```bash
npm install @radix-ui/react-dialog lucide-react
```

---

## 📥 Import

```tsx
import CSModal from "@/components/core/CSModal/CSModal";
```

---

# 1️⃣ Cách dùng nhanh (Classic Props API)

Dành cho trường hợp modal tiêu chuẩn.

```tsx
<CSModal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Xóa dữ liệu?"
  description="Hành động này không thể hoàn tác"
  footer={
    <>
      <CSButton variant="outline">Hủy</CSButton>
      <CSButton color="danger">Xóa</CSButton>
    </>
  }
>
  Nội dung chính của modal
</CSModal>
```

---

# 2️⃣ Cách dùng nâng cao (Compound Components API) ⭐

Cho phép kiểm soát layout linh hoạt hơn.

```tsx
<CSModal isOpen={open} onClose={closeModal} size="lg" color="info">
  <CSModal.Header title="Cấu hình hệ thống" />

  <CSModal.Body>Nội dung có thể dài, form, bảng dữ liệu...</CSModal.Body>

  <CSModal.Footer>
    <CSButton variant="outline">Hủy</CSButton>
    <CSButton color="info">Lưu thay đổi</CSButton>
  </CSModal.Footer>
</CSModal>
```

### Khi nào nên dùng Compound API?

| Trường hợp                          | Nên dùng     |
| ----------------------------------- | ------------ |
| Modal đơn giản                      | ❌ Không cần |
| Modal form dài                      | ✅           |
| Modal layout phức tạp               | ✅           |
| Muốn custom hoàn toàn header/footer | ✅           |

---

## 🧩 CSModal.Header

```tsx
<CSModal.Header title="Tiêu đề" description="Mô tả ngắn" showCloseButton />
```

| Prop              | Mô tả         |
| ----------------- | ------------- |
| `title`           | Tiêu đề modal |
| `description`     | Mô tả phụ     |
| `showCloseButton` | Hiện nút đóng |

---

## 📄 CSModal.Body

```tsx
<CSModal.Body>Nội dung chính ở đây</CSModal.Body>
```

Tự động scroll khi nội dung dài.

---

## 🦶 CSModal.Footer

```tsx
<CSModal.Footer>
  <CSButton>Hủy</CSButton>
  <CSButton color="primary">Xác nhận</CSButton>
</CSModal.Footer>
```

Tự động căn phải, có spacing chuẩn.

---

## 🧾 Props API (CSModal)

| Prop            | Kiểu                                     | Mặc định    | Mô tả              |
| --------------- | ---------------------------------------- | ----------- | ------------------ |
| `isOpen`        | `boolean`                                | —           | Trạng thái modal   |
| `onClose`       | `() => void`                             | —           | Gọi khi đóng       |
| `size`          | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"`      | Kích thước         |
| `color`         | `ButtonColor`                            | `"primary"` | Màu chủ đạo        |
| `showBorderTop` | `boolean`                                | `false`     | Hiện viền màu trên |
| `showShadow`    | `boolean`                                | `false`     | Bật đổ bóng        |
| `className`     | `string`                                 | `""`        | Custom class       |
| `style`         | `CSSProperties`                          | —           | Custom style       |

---

## 📐 Kích thước hỗ trợ

| Size | Chiều rộng   |
| ---- | ------------ |
| sm   | 400px        |
| md   | 550px        |
| lg   | 800px        |
| xl   | 1100px       |
| full | 95% màn hình |

---

## 🎨 Màu sắc hỗ trợ

```tsx
color = "primary" | "success" | "warning" | "danger" | "info";
```

Áp dụng cho:

- Border top accent
- Nút close hover
- Header highlight

---

## ✨ Ví dụ thực tế

### Modal cảnh báo

```tsx
<CSModal isOpen size="sm" color="warning" showBorderTop>
  <CSModal.Header title="Cảnh báo bảo mật" />
  <CSModal.Body>Phiên đăng nhập của bạn sắp hết hạn.</CSModal.Body>
  <CSModal.Footer>
    <CSButton color="warning">Làm mới</CSButton>
  </CSModal.Footer>
</CSModal>
```

### Modal full screen

```tsx
<CSModal isOpen size="full">
  <CSModal.Body>Nội dung toàn màn hình</CSModal.Body>
</CSModal>
```

---

## ♿ Accessibility

Nhờ Radix UI:

✔ Focus trap  
✔ Đóng bằng ESC  
✔ Screen reader support  
✔ Portal rendering

---

## ⚡ Tối ưu hiệu năng

CSModal sử dụng:

- `React.memo` → tránh re-render không cần thiết
- `forwardRef` → hỗ trợ ref cho animation/measure
- Chỉ mount vào DOM khi `isOpen = true`

---

## 🎯 Khi nào nên dùng CSModal?

| Tình huống         | Dùng CSModal |
| ------------------ | ------------ |
| Xác nhận xóa       | ✅           |
| Form chỉnh sửa     | ✅           |
| Popup nội dung dài | ✅           |
| Tooltip nhỏ        | ❌           |
| Dropdown menu      | ❌           |

---

CSModal giúp hệ thống modal trong ứng dụng **đồng bộ – mạnh mẽ – linh hoạt – chuẩn accessibility** 🚀
