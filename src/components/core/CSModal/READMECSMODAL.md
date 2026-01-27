# 🪟 CSModal – Hệ thống Modal dùng chung

`CSModal` là component **Modal/Dialog** dùng chung cho toàn bộ ứng dụng, được xây dựng trên nền tảng **Radix UI Dialog** và tuân theo **Design System** của dự án.

> 🎯 Mục tiêu: Tạo modal có cấu trúc chuẩn, dễ tái sử dụng, hỗ trợ nhiều kích thước, màu sắc và layout linh hoạt.

---

## 🧠 Kiến trúc

CSModal được xây dựng trên:

- **@radix-ui/react-dialog** → xử lý accessibility, focus trap, portal
- **Design System tokens** → màu sắc, shadow, border, radius
- **Compound layout** → Header / Body / Footer rõ ràng

Modal luôn được render qua **Portal** nên không bị ảnh hưởng bởi layout cha.

---

## 🚀 Cài đặt thư viện cần thiết

```bash
npm install @radix-ui/react-dialog lucide-react
```

---

## 📦 Import

```tsx
import CSModal from "@/components/core/CSModal/CSModal";
```

---

## 🧩 Cách sử dụng cơ bản

```tsx
const [open, setOpen] = useState(false);

<CSModal isOpen={open} onClose={() => setOpen(false)} title="Tiêu đề Modal">
  Nội dung bên trong modal
</CSModal>;
```

---

## 🧾 Props API

| Prop              | Kiểu                                     | Mặc định    | Mô tả                       |
| ----------------- | ---------------------------------------- | ----------- | --------------------------- |
| `isOpen`          | `boolean`                                | —           | Trạng thái đóng/mở modal    |
| `onClose`         | `() => void`                             | —           | Hàm gọi khi modal đóng      |
| `title`           | `string`                                 | —           | Tiêu đề modal               |
| `description`     | `string`                                 | —           | Mô tả ngắn dưới title       |
| `children`        | `ReactNode`                              | —           | Nội dung chính              |
| `footer`          | `ReactNode`                              | —           | Khu vực nút hành động       |
| `size`            | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"`      | Kích thước modal            |
| `color`           | `ButtonColor`                            | `"primary"` | Màu chủ đạo của modal       |
| `showCloseButton` | `boolean`                                | `true`      | Hiển thị nút X góc phải     |
| `showBorderTop`   | `boolean`                                | `false`     | Hiển thị viền màu phía trên |
| `showShadow`      | `boolean`                                | `false`     | Hiển thị đổ bóng            |
| `className`       | `string`                                 | `""`        | Thêm class tuỳ chỉnh        |

---

## 📐 Kích thước Modal

| Size   | Chiều rộng   |
| ------ | ------------ |
| `sm`   | 400px        |
| `md`   | 550px        |
| `lg`   | 800px        |
| `xl`   | 1100px       |
| `full` | 95% màn hình |

```tsx
<CSModal size="lg" />
```

---

## 🎨 Màu sắc (Color Variants)

Modal hỗ trợ các màu theo design system:

```tsx
<CSModal color="success" />
<CSModal color="danger" />
<CSModal color="warning" />
<CSModal color="info" />
<CSModal color="primary" />
```

Màu này ảnh hưởng tới:

- Viền trên (nếu bật `showBorderTop`)
- Hiệu ứng hover nút đóng
- Accent trong header

---

## 🧱 Layout chuẩn

Modal có 3 vùng:

### Header

Hiển thị khi có `title` hoặc `showCloseButton = true`

### Body

Luôn hiển thị – chứa `children`

### Footer

Chỉ hiển thị khi truyền prop `footer`

```tsx
<CSModal
  title="Xóa dữ liệu?"
  footer={
    <>
      <CSButton variant="outline">Hủy</CSButton>
      <CSButton color="danger">Xóa</CSButton>
    </>
  }
>
  Hành động này không thể hoàn tác.
</CSModal>
```

---

## ✨ Modal có viền màu + shadow

```tsx
<CSModal showBorderTop showShadow color="success" title="Thành công!">
  Dữ liệu đã được lưu.
</CSModal>
```

---

## 🖥 Modal Full Screen

```tsx
<CSModal
  size="full"
  title="Chế độ toàn màn hình"
  footer={<CSButton>Thoát</CSButton>}
>
  Nội dung hiển thị toàn bộ không gian.
</CSModal>
```

---

## ❌ Ẩn nút đóng (X)

```tsx
<CSModal showCloseButton={false} />
```

---

## 🧪 Ví dụ thực tế (trong ProfilePage)

### Modal xác nhận xóa

```tsx
<CSModal
  isOpen={isDeleteOpen}
  onClose={() => setDeleteOpen(false)}
  title="Xóa dữ liệu?"
  color="danger"
  size="sm"
  showBorderTop
  showShadow
  footer={
    <>
      <CSButton variant="outline">Hủy</CSButton>
      <CSButton color="danger">Xóa</CSButton>
    </>
  }
>
  Hành động này sẽ xóa vĩnh viễn tài khoản.
</CSModal>
```

---

## ♿ Accessibility (nhờ Radix)

CSModal tự động hỗ trợ:

✔ Focus trap trong modal  
✔ Đóng bằng phím `ESC`  
✔ Screen reader friendly  
✔ Portal render ngoài DOM tree chính

---

## 🎯 Khi nào nên dùng CSModal?

| Tình huống                         | Có nên dùng |
| ---------------------------------- | ----------- |
| Xác nhận hành động nguy hiểm       | ✅          |
| Form chỉnh sửa                     | ✅          |
| Thông báo quan trọng cần tương tác | ✅          |
| Tooltip nhỏ                        | ❌          |
| Dropdown menu                      | ❌          |

---

## 💡 Best Practices

✔ Chỉ nên có **1 modal mở tại một thời điểm**  
✔ Dùng `footer` để chứa action buttons  
✔ Không nhồi quá nhiều nội dung dài → dùng scroll trong body  
✔ Với mobile → ưu tiên `size="full"`

---

CSModal giúp hệ thống modal trong ứng dụng **đồng bộ – dễ mở rộng – chuẩn UX – chuẩn accessibility** 🚀
