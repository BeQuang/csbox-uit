import React, { forwardRef } from "react";
import { DatePicker } from "antd";
import type { GetProps, GetRef } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import "./styles.scss";

const { RangePicker } = DatePicker;

export type DatePickerColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

// Lấy toàn bộ Props và Ref chuẩn từ Antd RangePicker
type AntdRangePickerProps = GetProps<typeof RangePicker>;
type RangePickerRef = GetRef<typeof RangePicker>;

export interface CSRangePickerProps extends Omit<
  AntdRangePickerProps,
  "value" | "onChange"
> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  required?: boolean;
  color?: DatePickerColor;
  // RangePicker nhận mảng 2 giá trị
  value?:
    | [
        Dayjs | string | number | Date | null,
        Dayjs | string | number | Date | null,
      ]
    | null;
  onChange?: (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string],
  ) => void;
}

const CSRangePicker = forwardRef<RangePickerRef, CSRangePickerProps>(
  (
    {
      label,
      error,
      style,
      className,
      fullWidth = true,
      value,
      onChange,
      required,
      color = "primary",
      placeholder = ["Từ ngày", "Đến ngày"],
      format = "DD/MM/YYYY",
      ...props
    },
    ref,
  ) => {
    // Helper chuyển đổi mảng value sang Dayjs
    const getValidRangeValues = (
      val: CSRangePickerProps["value"],
    ): [Dayjs | null, Dayjs | null] | null => {
      if (!val || !Array.isArray(val)) return null;
      const start = val[0] ? dayjs(val[0]) : null;
      const end = val[1] ? dayjs(val[1]) : null;
      return [
        start && start.isValid() ? start : null,
        end && end.isValid() ? end : null,
      ];
    };

    const classes = [
      "cs-datepicker-outer", // Dùng chung class cha để tận dụng CSS
      `cs-datepicker--${color}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        className={classes}
        style={{ width: fullWidth ? "100%" : "auto", ...style }}
      >
        {label && (
          <label className="cs-datepicker-label">
            {label} {required && <span className="required-mark">*</span>}
          </label>
        )}

        <RangePicker
          {...props}
          ref={ref}
          value={getValidRangeValues(value)}
          onChange={(dates, dateStrings) => {
            // Ép kiểu về Dayjs để đồng bộ logic
            onChange?.(
              dates as [Dayjs | null, Dayjs | null] | null,
              dateStrings,
            );
          }}
          status={error ? "error" : props.status}
          placeholder={placeholder}
          format={format}
          style={{ width: "100%" }}
          // Tận dụng popupClassName hiện tại
          popupClassName={`cs-datepicker-dropdown cs-datepicker-dropdown--${color}`}
        />

        {error && <span className="cs-datepicker-error-msg">{error}</span>}
      </div>
    );
  },
);

CSRangePicker.displayName = "CSRangePicker";

export default CSRangePicker;
