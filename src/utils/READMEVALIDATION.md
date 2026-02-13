# ✅ Validation Utility Guide

File chính: `src/utils/validation.ts`

Bộ tiện ích này cung cấp các hàm validate dùng chung cho form, payload API và logic nghiệp vụ.

---

## 1) Required + Data Type

- `isRequired(value)`
- `isString(value)`
- `isNumber(value)`
- `isBoolean(value)`
- `isDateValue(value)`
- `isArray(value)`

```ts
isRequired("abc"); // true
isRequired("   "); // false
isNumber(10); // true
isDateValue(new Date()); // true
```

---

## 2) Regex / Format

- Email: `isEmail(value)`
- Gmail: `isGmail(value)`
- SĐT VN (0 + 10-11 số): `isPhoneNumberVN(value)`
- URL http/https: `isHttpUrl(value)`
- CCCD/CMND 9 hoặc 12 số: `isIdentityCardNumber(value)`
- Username không dấu/chỉ chữ số: `isAlphaNumeric(value)`

```ts
isEmail("user@company.com"); // true
isGmail("user@gmail.com"); // true
isPhoneNumberVN("0912345678"); // true
isHttpUrl("https://example.com"); // true
```

---

## 3) Length / Range

- Độ dài: `hasMinLength`, `hasMaxLength`, `isLengthInRange`
- Giá trị số: `hasMinValue`, `hasMaxValue`, `isNumberInRange`

```ts
isLengthInRange("username01", 6, 20); // true
isNumberInRange(8.5, 0, 10); // true
```

---

## 4) Business Validation

- Role hợp lệ: `isValidRole`
- Route tồn tại trong config: `isValidRoutePath(routes, pathname)`
- Confirm value (mật khẩu nhập lại): `isConfirmedValue`
- Blacklist: `hasForbiddenWord`, `isAllowedByBlacklist`
- Async server-side:
  - `isUniqueValue(value, checkUniqueFn)`
  - `isExistingEntity(id, checkExistFn)`

```ts
await isUniqueValue("new_user", async (username) => {
  // call API kiểm tra username đã tồn tại chưa
  return username !== "admin";
});
```

---

## 5) Date & Time

- `isPastDate`, `isFutureDate`
- `isDateRangeValid(start, end)`
- `getAge(birthday)`, `isMinAge(birthday, minAge)`

```ts
isMinAge(new Date("2000-01-01"), 18); // true
```

---

## 6) File Validation

- Extension: `hasAllowedFileExtension`
- MIME type: `hasAllowedMimeType`
- Dung lượng: `hasMaxFileSize`
- Kích thước ảnh: `hasMinImageDimension`

```ts
hasAllowedFileExtension("avatar.png", [".jpg", ".png"]); // true
```

---

## 7) Security Validation

- Sanitization HTML/XSS cơ bản: `sanitizeHtml`
- SQL Injection risk: `hasSqlInjectionRisk`, `isSafeInput`
- Strong password: `hasStrongPasswordPattern`
  - gồm chữ thường + chữ hoa + số + ký tự đặc biệt

```ts
hasStrongPasswordPattern("Admin@123"); // true
isSafeInput("SELECT * FROM users"); // false
```

---

## 8) Validate nhanh cho Form Đăng ký

Dùng `validateRegisterPayload(payload)`:

- username: required + 6-20 + alphanumeric
- email: required + email format
- password: required + min 8 + strong pattern
- confirmPassword: phải khớp password
- birthday: date quá khứ + tối thiểu 13 tuổi
- role: hợp lệ theo `ROLES`

```ts
const result = validateRegisterPayload({
  username: "user123",
  email: "user@gmail.com",
  password: "User@1234",
  confirmPassword: "User@1234",
  birthday: new Date("2005-05-01"),
  role: "USER",
});

if (!result.password) {
  // hiển thị lỗi password
}
```

---

## Gợi ý áp dụng trong form

- Front-end: dùng với AntD Rules / React Hook Form.
- Back-end: luôn validate lại dữ liệu trước khi ghi DB.
- Rule `isUniqueValue` và `isExistingEntity` nên chạy ở server để đảm bảo chính xác dữ liệu.
