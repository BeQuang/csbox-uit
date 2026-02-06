# 📅 CSDatePicker & CSRangePicker

Bộ **Date Components chuẩn Design System**, được xây dựng dựa trên **Ant Design DatePicker** và mở rộng thêm:

- Hệ thống **màu theo semantic** (primary, success, warning…)
- Hỗ trợ **label, required, error message**
- Chuẩn hoá giá trị ngày với **Dayjs**
- Đồng bộ UI với **Design Token / CSS Variables**

Bao gồm:

| Component       | Mô tả                                          |
| --------------- | ---------------------------------------------- |
| `CSDatePicker`  | Chọn **một mốc thời gian**                     |
| `CSRangePicker` | Chọn **khoảng thời gian (từ ngày → đến ngày)** |

---

## ✨ Tính năng nổi bật

✅ Bọc lại từ Antd nên dùng được **toàn bộ props gốc**  
✅ Hỗ trợ nhiều chế độ picker: `date`, `week`, `month`, `quarter`, `year`, `time`  
✅ Chuẩn hoá giá trị đầu vào từ `string | Date | number | Dayjs`  
✅ Hệ thống màu theo Design System  
✅ Tự động hiển thị trạng thái **error**  
✅ Label + Required mark chuẩn form enterprise  
✅ Popup Calendar đồng bộ màu với input

---

## 📦 Cài đặt thư viện cần thiết

```bash
npm install antd dayjs
```

Nếu chưa dùng Ant Design global styles:

```ts
import "antd/dist/reset.css";
```

---

## 🎨 Hệ màu hỗ trợ

```ts
export type DatePickerColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";
```

---

# 📅 CSDatePicker (Single)

## Props chính

| Prop        | Kiểu                                      | Mặc định | Mô tả                  |
| ----------- | ----------------------------------------- | -------- | ---------------------- |
| `label`     | string                                    | –        | Nhãn phía trên input   |
| `required`  | boolean                                   | false    | Hiển thị dấu \* đỏ     |
| `error`     | string                                    | –        | Hiển thị lỗi phía dưới |
| `color`     | DatePickerColor                           | primary  | Màu semantic           |
| `fullWidth` | boolean                                   | true     | Chiếm full chiều ngang |
| `value`     | string \| Date \| Dayjs \| number \| null | –        | Giá trị ngày           |
| `onChange`  | (date, dateString) => void                | –        | Callback khi đổi ngày  |

👉 Ngoài ra hỗ trợ **toàn bộ props gốc của Antd DatePicker** như:  
`picker`, `disabled`, `size`, `showTime`, `format`, `presets`, v.v.

---

## Ví dụ cơ bản

```tsx
import CSDatePicker from "@/components/core/CSDatePicker/CSDatePicker";
import dayjs from "dayjs";

const [date, setDate] = useState(dayjs());

<CSDatePicker label="Ngày bắt đầu" value={date} onChange={setDate} required />;
```

---

## Ví dụ nhiều chế độ Picker

```tsx
<CSDatePicker picker="month" label="Chọn tháng" />
<CSDatePicker picker="year" label="Chọn năm" />
<CSDatePicker picker="time" label="Chọn giờ" showTime />
```

---

# 📆 CSRangePicker (Range)

Dùng khi cần chọn **khoảng thời gian**.

## Props chính

| Prop       | Kiểu                           | Mặc định | Mô tả                 |
| ---------- | ------------------------------ | -------- | --------------------- |
| `label`    | string                         | –        | Nhãn phía trên        |
| `required` | boolean                        | false    | Bắt buộc nhập         |
| `error`    | string                         | –        | Thông báo lỗi         |
| `color`    | DatePickerColor                | primary  | Màu semantic          |
| `value`    | [DateValue, DateValue] \| null | –        | Mảng 2 giá trị        |
| `onChange` | (dates, dateStrings) => void   | –        | Callback trả về range |

---

## Ví dụ cơ bản

```tsx
import CSRangePicker from "@/components/core/CSDatePicker/CSRangerPicker";
import dayjs from "dayjs";

const [range, setRange] = useState<[Dayjs, Dayjs] | null>([
  dayjs(),
  dayjs().add(7, "day"),
]);

<CSRangePicker label="Khoảng thời gian" value={range} onChange={setRange} />;
```

---

## Ví dụ Presets (Báo cáo nhanh)

```tsx
<CSRangePicker
  label="Thống kê"
  presets={[
    { label: "Hôm nay", value: [dayjs(), dayjs()] },
    { label: "7 ngày qua", value: [dayjs().subtract(7, "d"), dayjs()] },
  ]}
/>
```

---

# 🧠 Chuẩn hoá dữ liệu ngày với `useDateUtils`

Hook hỗ trợ format dữ liệu hiển thị & chuẩn API.

```ts
import { useDateUtils } from "@/hooks/useDateUtils";
```

## 1️⃣ Format hiển thị

```ts
formatPickerValue(date, "DD/MM/YYYY");
```

## 2️⃣ Format Range

```ts
formatRangeValue(range).combined;
// "01/01/2026 - 07/01/2026"
```

## 3️⃣ Chuyển sang payload API

```ts
toApiPayload(range);

/*
{
  fromDate: "2026-01-01",
  toDate: "2026-01-07"
}
*/
```

---

# 🎨 CSS Variables cần có trong Design System

```scss
--color-primary
--color-success
--color-warning
--color-danger
--color-info

--color-primary-hover
--color-primary-ring

--radius-md
--radius-sm
```

Component sẽ tự động map màu này vào:

- Border khi hover / focus
- Calendar cell selected
- Range highlight
- Button "Today / Now / OK"

---

# ⚠️ Lưu ý quan trọng

- Component sử dụng **Dayjs nội bộ**, nhưng vẫn nhận `Date | string | number`
- Luôn truyền `value` dạng controlled để tránh warning
- Với `picker="time"` nên dùng `showTime`
- RangePicker không hỗ trợ `picker="time"` trực tiếp từ Antd

---

# 🧪 Demo Playground

Component đã được tích hợp trong màn hình **Date Engine Lab** để test:

✔ Đổi màu realtime  
✔ Đổi loại picker  
✔ Xem format hiển thị  
✔ Xem payload gửi API

Đây là môi trường chuẩn để QA & Dev kiểm tra behavior trước khi dùng vào form thật.

---

**Author:** Frontend Design System Team  
**Stack:** React + Ant Design + Dayjs
