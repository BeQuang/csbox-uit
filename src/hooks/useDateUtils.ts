import { Dayjs } from "dayjs";

export const useDateUtils = () => {
  // 1. Xử lý Picker đơn (Single)
  const formatPickerValue = (
    value: Dayjs | null | undefined,
    formatStr: string = "DD/MM/YYYY",
  ): string => {
    if (!value || !value.isValid()) return "";
    return value.format(formatStr);
  };

  // 2. Xử lý RangePicker (Array)
  const formatRangeValue = (
    values: [Dayjs | null, Dayjs | null] | null | undefined,
    formatStr: string = "DD/MM/YYYY",
    separator: string = " - ",
  ): { start: string; end: string; combined: string } => {
    if (!values || !values[0] || !values[1]) {
      return { start: "", end: "", combined: "" };
    }

    const start = values[0].format(formatStr);
    const end = values[1].format(formatStr);

    return {
      start,
      end,
      combined: `${start}${separator}${end}`,
    };
  };

  // 3. Hàm nhanh để trả về Object chuẩn API (thường dùng để submit form)
  const toApiPayload = (value: Dayjs | [Dayjs | null, Dayjs | null] | null) => {
    if (!value) return null;

    if (Array.isArray(value)) {
      return {
        fromDate: value[0]?.format("YYYY-MM-DD"),
        toDate: value[1]?.format("YYYY-MM-DD"),
      };
    }

    return value.format("YYYY-MM-DD");
  };

  return { formatPickerValue, formatRangeValue, toApiPayload };
};
