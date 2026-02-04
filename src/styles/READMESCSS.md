# 🎨 SCSS & Design System Guide

Tài liệu hướng dẫn cách sử dụng, quản lý và mở rộng hệ thống **Styles / Design System** của dự án.

Hệ thống kết hợp giữa:

- **SCSS Variables** → dùng lúc **build-time** (tính toán, mixin, media query…)
- **CSS Variables** → dùng lúc **run-time** (đổi theme, debug nhanh trên trình duyệt…)

---

## 📂 Cấu trúc thư mục (Theo dự án hiện tại)

Dựa theo cấu trúc source của bạn:

```
src/styles/
├── abstracts/
│   ├── _colors.scss        # 🎨 Bảng màu gốc (palette)
│   ├── _css_vars.scss      # 🌍 Khai báo CSS Variables (:root)
│   ├── _shadows.scss       # 🌫️ Hệ thống shadow
│   └── _variables.scss     # 📏 Spacing, radius, font-size, z-index...
├── base/
│   └── main.scss           # 🧱 Reset CSS, base typography, global element styles
└── index.scss (hoặc file import tổng)  # Import toàn bộ abstracts + base
```

### Ý nghĩa từng nhóm

| Thư mục/File | Vai trò                                                                    |
| ------------ | -------------------------------------------------------------------------- |
| `abstracts/` | Chứa **biến, design token, hệ thống thiết kế**, không viết class UI cụ thể |
| `base/`      | Style nền tảng cho toàn app (body, h1–h6, a, button reset…)                |
| `main.scss`  | File gốc được import vào app (VD: trong `main.tsx` hoặc `App.tsx`)         |

---

## 🚀 1. Cách sử dụng biến (2 Cách)

Có **2 cách** dùng biến trong hệ thống.

---

### ✅ Cách 1: Dùng CSS Variables (Khuyên dùng)

Dùng các biến dạng `var(--...)` đã được khai báo trong `_css_vars.scss`.

**Ưu điểm:**

- Không cần import file SCSS
- Có thể chỉnh trực tiếp trên DevTools
- Hỗ trợ Dark Mode / Theme động sau này

**Áp dụng cho:** hầu hết thuộc tính CSS thông thường

```scss
.my-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  box-shadow: var(--shadow-sm);
}
```

---

### ⚡ Cách 2: Dùng trực tiếp SCSS Variables (`@use`)

Dùng khi bạn cần **giá trị gốc để tính toán** hoặc trong các trường hợp **CSS Variables không hỗ trợ**.

```scss
@use "@/styles/abstracts/variables" as v;
@use "@/styles/abstracts/colors" as c;

.custom-button {
  // Làm mờ màu gốc
  background-color: rgba(c.$primary-600, 0.9);

  // Media Query (CSS Variable không dùng được ở đây)
  @media (max-width: 768px) {
    border-radius: v.$radius-sm;
  }
}
```

**Áp dụng cho:**

- Media Queries
- Hàm Sass (`darken`, `lighten`, `rgba`…)
- Vòng lặp `@for`, `@each`

---

## 🎯 2. Viết SCSS Lồng nhau (Nesting)

Dùng ký tự `&` để đại diện cho class cha → rất hợp với cấu trúc **BEM**.

```scss
.user-profile {
  padding: 24px;
  background: var(--color-surface);

  /* Element */
  &__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  /* State */
  &:hover {
    box-shadow: var(--shadow-md);
  }

  /* Modifier */
  &--active {
    border: 1px solid var(--color-primary);
  }

  /* Tag con bên trong */
  h3 {
    color: var(--color-text-primary);
    margin-bottom: 8px;
  }
}
```

---

## 🛠 3. Quy trình tạo biến mới (How to Create)

Khi cần thêm màu hoặc thông số mới → làm đủ **3 bước** sau.

---

### 🧩 Bước 1: Thêm vào SCSS gốc

**File:** `abstracts/_colors.scss` hoặc `_variables.scss`

```scss
// abstracts/_colors.scss
$brand-purple: #722ed1;
```

---

### 🌍 Bước 2: Map sang CSS Variable

**File:** `abstracts/_css_vars.scss`

👉 Đặt tên theo **ngữ nghĩa sử dụng**, không đặt theo màu.

```scss
@use "./colors" as c;

:root {
  --color-brand-accent: #{c.$brand-purple};
}
```

❌ Không nên: `--color-purple`
✅ Nên: `--color-sidebar-active`, `--color-brand-accent`

---

### 🎨 Bước 3: Sử dụng trong component

```scss
.promo-banner {
  background: var(--color-brand-accent);
}
```

---

## 💡 Mẹo & Best Practices

### ✅ Ưu tiên CSS Variables

Chỉ dùng SCSS variable khi cần tính toán hoặc media query.

### ❌ Không hardcode màu

```scss
color: #1677ff; // ❌
color: var(--color-primary); // ✅
```

### 📦 Tổ chức file đúng vai trò

| File              | Chỉ nên chứa                        |
| ----------------- | ----------------------------------- |
| `_colors.scss`    | Mã màu gốc (palette)                |
| `_variables.scss` | spacing, radius, font-size, z-index |
| `_css_vars.scss`  | `:root { --variable: value }`       |
| `base/main.scss`  | reset + style HTML cơ bản           |

### 🧱 Z-Index có hệ thống

```scss
z-index: var(--z-modal);
z-index: var(--z-dropdown);
```

Tránh dùng số như `9999` lung tung.

---

## 🆘 Cheat Sheet nhanh

| Tác vụ   | Cú pháp                 | Ví dụ                                    |
| -------- | ----------------------- | ---------------------------------------- |
| Màu chữ  | `var(--color-text-...)` | `color: var(--color-text-secondary);`    |
| Màu nền  | `var(--color-bg-...)`   | `background: var(--color-bg-app);`       |
| Border   | `var(--color-border)`   | `border: 1px solid var(--color-border);` |
| Shadow   | `var(--shadow-...)`     | `box-shadow: var(--shadow-sm);`          |
| Radius   | `var(--radius-...)`     | `border-radius: var(--radius-md);`       |
| SCSS gốc | `v.$variable`           | `border-radius: v.$radius-sm;`           |

---

Sau khi tuân thủ đúng cấu trúc này, hệ thống style sẽ:

- Dễ scale khi dự án lớn dần
- Hỗ trợ theme/dark mode về sau
- Tránh xung đột màu sắc và spacing
- Giữ UI đồng bộ giữa các module
