# 🚀 Hướng dẫn Cấu hình Hệ thống Router & Menu

Hệ thống Router của dự án được xây dựng dựa trên **React Router v6** kết hợp với cơ chế **RBAC (Role-Based Access Control)** và **Ant Design Menu**.

Hệ thống hỗ trợ:

- Tách file cấu hình theo module
- Route động (dynamic params)
- Tự động giữ trạng thái **Active** cho Menu

---

## 📂 1. Cấu trúc thư mục

Để đảm bảo code sạch và dễ mở rộng, **không viết tất cả route trong một file**.
Mỗi module chức năng sẽ có file cấu hình riêng.

```
src/app/router/
├── configs/                  # 📦 Thư mục chứa cấu hình Route riêng lẻ
│   ├── user.routes.tsx       # Cấu hình cho nhóm /users
│   ├── study.routes.tsx      # Cấu hình cho nhóm /study
│   └── profile.routes.tsx    # Cấu hình cho nhóm /profile
├── routes.tsx                # 🔗 File tổng hợp (Main Entry)
├── menu.config.ts            # 🛠️ Logic chuyển đổi Route -> Ant Design Menu Item
├── AppRouter.tsx             # 🏗️ Khởi tạo Router & Flatten Routes
└── README.md                 # 📖 Tài liệu hướng dẫn này
```

---

## 🛠️ 2. Định nghĩa Route (`AppRoute`)

Mọi route trong hệ thống phải tuân thủ interface `AppRoute`.

| Thuộc tính     | Kiểu dữ liệu | Bắt buộc | Mô tả                                                              |
| -------------- | ------------ | -------- | ------------------------------------------------------------------ |
| `path`         | `string`     | ✅       | Đường dẫn URL (khuyên dùng tuyệt đối: `/study` thay vì `study`)    |
| `element`      | `ReactNode`  | ❌       | Component hiển thị. Nếu là route cha có con, cần chứa `<Outlet />` |
| `children`     | `AppRoute[]` | ❌       | Danh sách các route con (Nested Routes)                            |
| `isProtected`  | `boolean`    | ❌       | `true` nếu yêu cầu đăng nhập                                       |
| `allowedRoles` | `Role[]`     | ❌       | Danh sách quyền được phép truy cập (VD: `[ROLES.ADMIN]`)           |
| `menuLabel`    | `string`     | ❌       | Tên hiển thị trên Menu. Để trống nếu muốn ẩn khỏi Menu             |

---

## 🛣️ 3. Các loại Đường dẫn (Path Types)

Hệ thống hỗ trợ 3 dạng đường dẫn chính:

### A. Đường dẫn tĩnh (Static Paths)

Là các trang cố định, thường dùng cho danh sách hoặc dashboard.

**Ví dụ:**

```
/study
/users/list
```

👉 Thường đi kèm với `menuLabel`.

---

### B. Đường dẫn động (Dynamic Routes / Prefix)

Sử dụng tiền tố `:` để định nghĩa tham số biến thiên (ID, Slug, Code).

**Cấu trúc:**

```
/:id
/:slug
```

**Ví dụ:**

```
/study/:id     → Khớp với /study/1, /study/abc...
```

⚠️ Thường **không đặt `menuLabel`** vì không biết ID cụ thể để hiển thị lên menu.

---

### C. Đường dẫn hành động (Suffix Paths)

Kết hợp tham số động và hành động phía sau.

**Ví dụ:**

```
/study/:id/edit
/study/:id/gift
```

🎯 Dùng để tạo các trang chức năng sâu cho một đối tượng cụ thể.

---

## 📖 4. Hướng dẫn tạo Router mới (Step-by-Step)

### ✅ Bước 1: Tạo file cấu hình trong `configs/`

Ví dụ: `src/app/router/configs/study.routes.tsx`

```tsx
import { AppRoute } from "../routes";
import { ROLES } from "@/utils/role";
import StudyPage from "@/modules/study/StudyPage"; // Layout cha chứa <Outlet>
import StudyDetail from "@/modules/study/StudyDetail";

export const studyRoutes: AppRoute = {
  path: "/study",
  element: <StudyPage />, // Quan trọng: Component này phải có <Outlet />
  isProtected: true,
  allowedRoles: [ROLES.ADMIN, ROLES.USER],
  menuLabel: "Học tập",
  children: [
    {
      path: "/study", // Mặc định khi vào /study
      element: <div>Danh sách bài học</div>,
    },
    {
      // ⚠️ Route Tĩnh: Phải đặt TRƯỚC route động
      path: "/study/new",
      element: <div>Trang tạo mới</div>,
    },
    {
      // ⚠️ Route Động
      path: "/study/:id",
      element: <StudyDetail />,
    },
    {
      // Route hành động
      path: "/study/:id/edit",
      element: <div>Trang chỉnh sửa bài học</div>,
    },
  ],
};
```

---

### ✅ Bước 2: Lấy dữ liệu ID trong Component

Trong `StudyDetail.tsx`:

```tsx
import { useParams } from "react-router-dom";

export default function StudyDetail() {
  const { id } = useParams();
  return <div>Đang xem bài học số: {id}</div>;
}
```

---

### ✅ Bước 3: Đăng ký vào `routes.tsx`

```tsx
import { studyRoutes } from "./configs/study.routes";

export const routes: AppRoute[] = [
  { path: "/", element: <LandingPage /> },
  studyRoutes,
];
```

---

## ⚡ 5. Logic Menu & Active State (Quan trọng)

Sidebar/Navbar sử dụng **so khớp tiền tố (`startsWith`)** để giữ trạng thái Active.

### 🔍 Quy tắc hoạt động

| URL hiện tại       | Menu được Active                             |
| ------------------ | -------------------------------------------- |
| `/study/123/edit`  | "Học tập" (`/study`)                         |
| `/users/roles/new` | Cả menu cha `Users` và menu con `Phân quyền` |

📌 Vì `/study/123/edit`.startsWith(`/study`) → `true`

---

### 🧭 Điều hướng trong code

```tsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

<Button onClick={() => navigate(`/study/${item.id}`)}>Xem chi tiết</Button>;
```

---

## ⚠️ 6. Các lưu ý quan trọng (Best Practices)

### 🥇 Thứ tự ưu tiên Route

Luôn đặt **Route Tĩnh** trước **Route Động**

✅ Đúng:

```
/study/new
/study/:id
```

❌ Sai:

```
/study/:id   ← Router sẽ hiểu "new" là id
/study/new
```

---

### 🌍 Path tuyệt đối

Nên dùng path đầy đủ:

```
/users/list   ✅
list          ❌ (dễ gây nhầm khi render Menu)
```

---

### 🧩 Outlet là bắt buộc với route cha

Nếu route có `children`, component cha **phải có**:

```tsx
import { Outlet } from "react-router-dom";

export default function StudyPage() {
  return (
    <div>
      <h1>Study</h1>
      <Outlet />
    </div>
  );
}
```

---

📌 Sau khi tuân thủ đúng cấu trúc trên, hệ thống Router sẽ:

- Dễ mở rộng theo module
- Quản lý quyền truy cập rõ ràng
- Menu tự động active chính xác theo URL
- Hạn chế bug do route lồng nhau
