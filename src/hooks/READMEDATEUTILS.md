# 🧠 useDateUtils – Date Formatting & API Helper

`useDateUtils` là custom hook dùng để **chuẩn hoá dữ liệu ngày tháng** khi làm việc với:

- `CSDatePicker`
- `CSRangePicker`
- Ant Design DatePicker nói chung
- Dayjs objects

Hook này giúp tách riêng phần **format hiển thị** và **format gửi API**, tránh lặp logic ở nhiều nơi trong project.

---

## 🎯 Mục tiêu của Hook

| Nhu cầu                   | Hàm hỗ trợ          |
| ------------------------- | ------------------- |
| Hiển thị ngày ra UI       | `formatPickerValue` |
| Hiển thị khoảng ngày      | `formatRangeValue`  |
| Chuẩn hoá dữ liệu gửi API | `toApiPayload`      |

---

## 📦 Import

```ts
import { useDateUtils } from "@/hooks/useDateUtils";
```

```ts
const { formatPickerValue, formatRangeValue, toApiPayload } = useDateUtils();
```

---

# 1️⃣ formatPickerValue

Format một giá trị ngày đơn lẻ (Single DatePicker)

### 🔹 Cú pháp

```ts
formatPickerValue(value, formatStr?)
```

### 🔹 Tham số

| Tên         | Kiểu                         | Mặc định       | Mô tả                 |
| ----------- | ---------------------------- | -------------- | --------------------- |
| `value`     | `Dayjs \| null \| undefined` | –              | Giá trị từ DatePicker |
| `formatStr` | `string`                     | `"DD/MM/YYYY"` | Định dạng hiển thị    |

### 🔹 Ví dụ

```ts
formatPickerValue(dayjs("2026-02-01"));
// "01/02/2026"

formatPickerValue(dayjs(), "YYYY-MM-DD");
// "2026-02-01"
```

Nếu giá trị không hợp lệ → trả về chuỗi rỗng:

```ts
formatPickerValue(null); // ""
```

---

# 2️⃣ formatRangeValue

Format giá trị từ `CSRangePicker`

### 🔹 Cú pháp

```ts
formatRangeValue(values, formatStr?, separator?)
```

### 🔹 Tham số

| Tên         | Kiểu                                     | Mặc định       | Mô tả           |
| ----------- | ---------------------------------------- | -------------- | --------------- |
| `values`    | `[Dayjs \| null, Dayjs \| null] \| null` | –              | Giá trị range   |
| `formatStr` | `string`                                 | `"DD/MM/YYYY"` | Format hiển thị |
| `separator` | `string`                                 | `" - "`        | Ký tự nối       |

### 🔹 Giá trị trả về

```ts
{
  start: string;
  end: string;
  combined: string;
}
```

### 🔹 Ví dụ

```ts
const range = [dayjs("2026-02-01"), dayjs("2026-02-07")];

formatRangeValue(range);

/*
{
  start: "01/02/2026",
  end: "07/02/2026",
  combined: "01/02/2026 - 07/02/2026"
}
*/
```

---

# 3️⃣ toApiPayload

Chuyển dữ liệu DatePicker thành định dạng **chuẩn để gửi backend**

### 🔹 Cú pháp

```ts
toApiPayload(value);
```

### 🔹 Nhận vào

| Kiểu             | Ý nghĩa          |
| ---------------- | ---------------- |
| `Dayjs`          | Picker đơn       |
| `[Dayjs, Dayjs]` | Range Picker     |
| `null`           | Không có dữ liệu |

### 🔹 Trả về

| Trường hợp  | Kết quả                |
| ----------- | ---------------------- |
| Single Date | `"YYYY-MM-DD"`         |
| Range Date  | `{ fromDate, toDate }` |
| Null        | `null`                 |

### 🔹 Ví dụ

#### Single Date

```ts
toApiPayload(dayjs("2026-02-01"));
// "2026-02-01"
```

#### Range Date

```ts
toApiPayload([dayjs("2026-02-01"), dayjs("2026-02-07")]);

/*
{
  fromDate: "2026-02-01",
  toDate: "2026-02-07"
}
*/
```

---

# 🔄 Use Case thực tế trong Form

```ts
const handleSubmit = () => {
  const payload = {
    startDate: toApiPayload(startDate),
    reportRange: toApiPayload(rangeDate),
  };

  api.post("/report", payload);
};
```

---

# 🧩 Kết hợp với CSDatePicker

```ts
const { formatPickerValue } = useDateUtils();

<Text>{formatPickerValue(selectedDate)}</Text>
```

---

# 🧩 Kết hợp với CSRangePicker

```ts
const { formatRangeValue } = useDateUtils();

const { combined } = formatRangeValue(range);
```

---

# ⚠️ Lưu ý quan trọng

- Hook **không tạo Dayjs mới**, chỉ format từ giá trị có sẵn
- Nên dùng hook này thay vì tự `.format()` rải rác trong project
- Backend nên thống nhất dùng chuẩn `YYYY-MM-DD`

---

# ✅ Best Practice

| Tình huống                | Nên dùng                      |
| ------------------------- | ----------------------------- |
| Hiển thị ngày trong Table | `formatPickerValue`           |
| Hiển thị range trong UI   | `formatRangeValue().combined` |
| Submit form               | `toApiPayload`                |

---

**Scope:** Design System – Date Handling  
**Phụ thuộc:** Dayjs
