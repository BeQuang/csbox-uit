import React, { forwardRef } from "react";
import { DatePicker } from "antd";
import type { GetProps, GetRef } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import "./styles.scss";

export type DatePickerColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

// Lấy toàn bộ Props chuẩn của Antd DatePicker
type AntdDatePickerProps = GetProps<typeof DatePicker>;
type DatePickerRef = GetRef<typeof DatePicker>;

export interface CSDatePickerProps extends Omit<
  AntdDatePickerProps,
  "value" | "onChange"
> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  required?: boolean;
  color?: DatePickerColor;
  value?: string | number | Dayjs | Date | null;
  onChange?: (date: Dayjs | null, dateString: string | string[]) => void;
}

const CSDatePicker = forwardRef<DatePickerRef, CSDatePickerProps>(
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
      placeholder = "Chọn ngày",
      format = "DD/MM/YYYY",
      ...props
    },
    ref,
  ) => {
    // Xử lý chuyển đổi value sang Dayjs an toàn (Fix Unexpected any)
    const getValidDayjs = (val: CSDatePickerProps["value"]): Dayjs | null => {
      if (!val) return null;
      const date = dayjs(val);
      return date.isValid() ? date : null;
    };

    const classes = [
      "cs-datepicker-outer",
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

        <DatePicker
          {...props}
          ref={ref}
          value={getValidDayjs(value)}
          onChange={(date, dateString) => {
            // Ép kiểu an toàn để phù hợp với interface của chúng ta
            onChange?.(date as Dayjs | null, dateString);
          }}
          status={error ? "error" : props.status}
          placeholder={placeholder}
          format={format}
          style={{ width: "100%" }}
          popupClassName={`cs-datepicker-dropdown cs-datepicker-dropdown--${color}`}
        />

        {error && <span className="cs-datepicker-error-msg">{error}</span>}
      </div>
    );
  },
);

CSDatePicker.displayName = "CSDatePicker";

export default CSDatePicker;
