# 🔔 CSToast – Hệ thống thông báo toàn cục

CSToast là **toast notification system** dùng chung cho toàn bộ ứng dụng, được xây dựng trên nền tảng **Sonner** và bọc lại bằng **Context + Hook** để sử dụng đơn giản, thống nhất theo Design System.

> 🎯 Mục tiêu: Gọi thông báo ở bất kỳ đâu chỉ với `useToast()` mà vẫn giữ full sức mạnh của Sonner.

---

## 🧠 Kiến trúc hoạt động

CSToast gồm 3 phần chính:

| Thành phần        | Vai trò                                          |
| ----------------- | ------------------------------------------------ |
| **ToastProvider** | Bọc toàn bộ app và cấu hình Sonner Toaster       |
| **ToastContext**  | Cung cấp hàm `toast()` cho toàn bộ cây component |
| **useToast()**    | Hook để gọi toast ở bất kỳ đâu                   |

Luồng hoạt động:

```txt
Component → useToast() → toast(message, options) → Sonner render Toast UI
```

👉 Toàn bộ hiển thị do **Sonner Toaster** xử lý.

---

## 🚀 Cài đặt

```bash
npm install sonner lucide-react
```

---

## 🧩 Bọc ứng dụng bằng Provider

Bắt buộc phải đặt `ToastProvider` ở root (thường trong `App.tsx` hoặc `main.tsx`).

```tsx
import { ToastProvider } from "@/components/core/CSToast";

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}
```

Provider đã cấu hình sẵn:

- Vị trí toast: `top-right`
- Có nút đóng (closeButton)
- Màu sắc phong phú (`richColors`)
- Theme: `light`

---

## 🎣 Cách sử dụng Hook

```tsx
const { toast } = useToast();
```

Hàm `toast` hỗ trợ **2 cách truyền tham số**.

---

## ✨ Cách 1 — Truyền type dạng string (đơn giản)

```tsx
toast("Lưu thay đổi thành công!", "success");
toast("Không thể kết nối server", "error");
toast("Đang xử lý dữ liệu...", "loading");
toast("Cảnh báo bảo trì hệ thống", "warning");
```

Có thể truyền thêm thời gian hiển thị:

```tsx
toast("Tự đóng sau 5 giây", "info", 5000);
```

---

## ✨ Cách 2 — Truyền object cấu hình (nâng cao)

Bạn có thể dùng toàn bộ cấu hình của **Sonner**.

```tsx
toast("Thanh toán thành công", {
  type: "success",
  description: "Số dư khả dụng: 10.000.000 VNĐ",
});
```

### Các tuỳ chọn phổ biến

```tsx
toast("Không thể kết nối Server", {
  type: "error",
  description: "Vui lòng kiểm tra mạng",
  action: {
    label: "Thử lại",
    onClick: () => console.log("Retrying..."),
  },
  duration: 5000,
});
```

---

## 🎨 Custom Icon

Bạn có thể truyền icon React bất kỳ:

```tsx
import { Rocket } from "lucide-react";

toast("Tăng tốc thành công", {
  icon: <Rocket size={18} color="#f97316" />,
  duration: 5000,
});
```

---

## ⏳ Toast Loading

```tsx
toast("Đang xử lý dữ liệu...", "loading");
```

Dùng khi gọi API, submit form, upload file...

---

## 🔁 Undo Action (Mẫu nâng cao)

```tsx
toast("Đã xóa tin nhắn", {
  description: "Bạn có 5 giây để khôi phục",
  action: {
    label: "Undo",
    onClick: () => toast("Đã hoàn tác", "success"),
  },
  duration: 5000,
});
```

---

## 🛠️ API của hàm `toast`

```ts
toast(
  message: string,
  options?: ToastType | CSToastOptions,
  duration?: number
)
```

### ToastType (string nhanh gọn)

```ts
"success" | "error" | "warning" | "info" | "loading";
```

### CSToastOptions (object nâng cao)

Kế thừa toàn bộ từ **Sonner ExternalToast**, thêm thuộc tính `type`.

| Thuộc tính    | Ý nghĩa                        |
| ------------- | ------------------------------ |
| `type`        | Loại toast (success, error...) |
| `description` | Nội dung phụ                   |
| `action`      | Nút thao tác trong toast       |
| `icon`        | Icon tuỳ chỉnh                 |
| `duration`    | Thời gian hiển thị             |

---

## ⚠️ Lưu ý quan trọng

- `useToast()` **chỉ dùng được bên trong `ToastProvider`**
- Không cần tự quản lý state toast
- Không render component Toast thủ công
- Hệ thống toast đã tối ưu để dùng toàn app

---

## Advanced Configuration

### 1️⃣ Vị trí hiển thị Toast

Bạn có thể cấu hình vị trí toast trong `ToastProvider`:

```tsx
<ToastProvider position="top-right" />
```

**Các vị trí hỗ trợ (Sonner):**
`top-left` | `top-center` | `top-right` | `bottom-left` | `bottom-center` | `bottom-right`

---

### 2️⃣ Giới hạn số lượng Toast cùng lúc

Tránh spam quá nhiều toast bằng cách giới hạn số lượng hiển thị:

```tsx
<ToastProvider visibleToasts={3} />
```

---

### 3️⃣ Dark Mode theo hệ thống

Cho toast tự động đổi theme theo hệ điều hành:

```tsx
<ToastProvider theme="system" />
```

Hoặc ép cứng:

```tsx
<ToastProvider theme="dark" />
```

---

### 4️⃣ Thời gian mặc định cho Toast

Cấu hình thời gian hiển thị mặc định:

```tsx
<ToastProvider duration={4000} />
```

---

### 5️⃣ Promise Toast (Loading → Success/Error)

Dùng cho các tác vụ async như gọi API:

```tsx
const { toast } = useToast();

const handleSave = async () => {
  const promise = fakeApiCall();

  toast.promise(promise, {
    loading: "Đang lưu dữ liệu...",
    success: "Lưu thành công 🎉",
    error: "Có lỗi xảy ra ❌",
  });
};
```
