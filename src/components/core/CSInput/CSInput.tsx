import React, { useMemo, useRef, useState, useCallback } from "react";
import { Trash2, Eye, EyeOff } from "lucide-react";
import "./styles.scss";

export type CSInputVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface CSInputProps {
  label?: string;
  required?: boolean;
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  type?: "text" | "number" | "password";
  formatNumber?: boolean;
  decimalSeparator?: "." | ","; // Cho phép tùy chỉnh dấu thập phân
  unit?: string;
  units?: string[];
  selectedUnit?: string;
  onChangeUnit?: (unit: string) => void;
  prependIcon?: React.ReactNode;
  disabled?: boolean;
  variant?: CSInputVariant;
  className?: string;
}

export default function CSInput({
  label,
  required,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  formatNumber = false,
  decimalSeparator = ".",
  unit,
  units,
  selectedUnit,
  onChangeUnit,
  prependIcon,
  disabled = false,
  variant = "default",
  className = "",
}: CSInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const inputType = useMemo(() => {
    if (type === "password") return showPassword ? "text" : "password";
    return type;
  }, [type, showPassword]);

  // Hàm helper để format số thập phân
  const formatDecimal = useCallback(
    (val: string | number) => {
      if (!val && val !== 0) return "";
      const parts = String(val).split(".");
      // Format phần nguyên
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // Nối lại với phần thập phân (nếu có)
      return parts.join(decimalSeparator);
    },
    [decimalSeparator],
  );

  const displayValue = useMemo(() => {
    if (!formatNumber || value === undefined || value === "")
      return value ?? "";
    return formatDecimal(value);
  }, [value, formatNumber, formatDecimal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (formatNumber) {
      // 1. Loại bỏ tất cả ký tự không phải số và dấu thập phân
      // Cho phép dấu chấm hoặc phẩy dựa trên cấu hình
      const regex = decimalSeparator === "." ? /[^\d.]/g : /[^\d,]/g;
      val = val.replace(regex, "");

      // 2. Chỉ cho phép một dấu thập phân duy nhất
      const parts = val.split(decimalSeparator);
      if (parts.length > 2) {
        val = parts[0] + decimalSeparator + parts.slice(1).join("");
      }

      // 3. Chuyển đổi về dạng chuẩn (dùng dấu chấm) để lưu vào state (chuẩn số học)
      const standardVal = val.replace(decimalSeparator, ".");
      onChange?.(standardVal);
    } else {
      onChange?.(val);
    }
  };

  const handleClear = useCallback(() => {
    onChange?.("");
    inputRef.current?.focus();
  }, [onChange]);

  // Xử lý phím Enter cho các nút hành động
  const handleKeyDownAction = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <div
      className={[
        "cs-input",
        `cs-input--${variant}`,
        error && "cs-input--error",
        disabled && "cs-input--disabled",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <label className="cs-input__label">
          {label} {required && <span>*</span>}
        </label>
      )}

      <div
        className="cs-input__wrapper"
        onClick={() => inputRef.current?.focus()}
      >
        {prependIcon && <div className="cs-input__icon">{prependIcon}</div>}

        <input
          ref={inputRef}
          type={inputType}
          value={displayValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
        />

        <div className="cs-input__actions" onClick={(e) => e.stopPropagation()}>
          {type === "password" && value && (
            <div
              className="cs-input__action-btn"
              tabIndex={0} // Cho phép focus bằng phím Tab
              role="button"
              onClick={() => setShowPassword(!showPassword)}
              onKeyDown={(e) =>
                handleKeyDownAction(e, () => setShowPassword(!showPassword))
              }
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </div>
          )}

          {!disabled && value && value !== "" && (
            <div
              className="cs-input__action-btn cs-input__clear-btn"
              tabIndex={0}
              role="button"
              onClick={handleClear}
              onKeyDown={(e) => handleKeyDownAction(e, handleClear)}
            >
              <Trash2 size={14} />
            </div>
          )}
        </div>

        {(unit || units) && (
          <div
            className="cs-input__unit-box"
            onClick={(e) => e.stopPropagation()}
          >
            {units ? (
              <select
                value={selectedUnit}
                onChange={(e) => onChangeUnit?.(e.target.value)}
                disabled={disabled}
              >
                {units.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            ) : (
              <span>{unit}</span>
            )}
          </div>
        )}
      </div>

      {error && <div className="cs-input__error-text">{error}</div>}
    </div>
  );
}
