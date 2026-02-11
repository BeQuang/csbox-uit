# CS Box UIT

Ứng dụng front-end React + TypeScript + Vite cho hệ thống học tập/quản trị theo vai trò (**Admin / Staff / User**), có Landing page giới thiệu và bộ CS custom components.

## 1) Yêu cầu môi trường

Trước khi chạy local, hãy đảm bảo máy đã cài:

- **Node.js**: khuyến nghị `>= 20`
- **npm**: khuyến nghị `>= 10`
- **Git**

Kiểm tra nhanh:

```bash
node -v
npm -v
git --version
```

---

## 2) Clone source code

```bash
git clone <repo-url>
cd csbox-uit
```

> Nếu bạn đã có source sẵn thì chỉ cần `cd` vào đúng thư mục dự án.

---

## 3) Cài dependencies

```bash
npm install
```

Lệnh này sẽ cài toàn bộ packages trong `package.json`.

---

## 4) Chạy dự án local (development)

```bash
npm run dev
```

Sau khi chạy, terminal sẽ hiển thị URL local, mặc định thường là:

- `http://localhost:5173`

Mở URL này trên trình duyệt để dùng ứng dụng.

---

## 5) Các lệnh hữu ích

### 5.1 Kiểm tra lint

```bash
npm run lint
```

- Dùng để kiểm tra coding style/rules theo ESLint.
- Có thể xuất hiện warning liên quan React Compiler/TanStack Table từ code hiện có.

### 5.2 Build production

```bash
npm run build
```

- Build mã nguồn cho môi trường production.
- Kết quả build nằm trong thư mục `dist/`.

### 5.3 Preview bản build

```bash
npm run preview
```

- Chạy thử bản đã build để kiểm tra trước khi deploy.

---

## 6) Luồng truy cập cơ bản

- **Landing page (`/`)**: giới thiệu dự án, điều hướng nhanh đến đăng nhập/đăng ký.
- Sau khi đăng nhập, hệ thống điều hướng theo role:
  - **Admin**: khu vực quản trị
  - **Staff**: khu vực vận hành
  - **User**: khu vực học tập/cá nhân

Bạn có thể dùng các tài khoản demo được hiển thị trên Landing page (nếu môi trường hiện tại đang bật sẵn).

---

## 7) Cấu trúc thư mục chính

```text
src/
  app/            # layout, router, guards, store/redux
  components/     # core components (CSButton, CSInput, CSTable, ...)
  modules/        # các module màn hình theo nghiệp vụ
  pages/          # Landing, Login, Register, NotFound, ...
  styles/         # global styles, variables, themes
public/
  image/logo/     # logo/asset public
```

---

## 8) Lưu ý quan trọng khi phát triển

1. **Không sửa trực tiếp file trong `dist/`** vì sẽ bị ghi đè sau mỗi lần build.
2. **Assets public** (logo, ảnh tĩnh) nên đặt trong `public/` và dùng path tuyệt đối dạng `/image/...`.
3. Dự án dùng **React + Vite + TypeScript**, ưu tiên viết component typed rõ ràng, không dùng `any` khi không cần thiết.
4. Trước khi push code, nên chạy:

```bash
npm run lint
npm run build
```

5. Nếu thấy warning chunk size khi build, đây là warning tối ưu bundle (không nhất thiết là lỗi blocking).

---

## 9) Troubleshooting nhanh

### Lỗi port đã được sử dụng

Chạy Vite ở port khác:

```bash
npm run dev -- --port 4173
```

### Lỗi thiếu package hoặc lockfile conflict

Thử xoá `node_modules` và cài lại:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 10) Quy ước làm việc đề xuất

- Tạo branch riêng cho từng task.
- Commit message ngắn gọn, rõ mục đích (`feat:`, `fix:`, `refactor:`...).
- Mỗi PR nên có:
  - Mô tả thay đổi
  - Cách test
  - Ảnh chụp UI (nếu có thay đổi giao diện)

---
