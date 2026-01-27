// @/components/core/CSInput/CSInput.tsx
import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Trash2, Eye, EyeOff } from "lucide-react";
import "./styles.scss";

export type CSInputVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info";

// 1. Kế thừa toàn bộ thuộc tính chuẩn của thẻ input
export interface CSInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> {
  label?: string;
  required?: boolean;
  value?: string | number;
  onChange?: (value: string) => void;
  error?: string;
  formatNumber?: boolean;
  decimalSeparator?: "." | ",";
  unit?: string;
  units?: string[];
  selectedUnit?: string;
  onChangeUnit?: (unit: string) => void;
  prependIcon?: React.ReactNode;
  variant?: CSInputVariant;
}

const CSInput = forwardRef<HTMLInputElement, CSInputProps>(
  (
    {
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
      style,
      ...rest
    },
    ref,
  ) => {
    // Sử dụng một ref nội bộ để xử lý logic local
    const internalRef = useRef<HTMLInputElement>(null);
    // Đồng bộ ref từ bên ngoài với internalRef
    useImperativeHandle(ref, () => internalRef.current!);

    const [showPassword, setShowPassword] = useState(false);

    const inputType = useMemo(() => {
      if (type === "password") return showPassword ? "text" : "password";
      return type;
    }, [type, showPassword]);

    const formatDecimal = useCallback(
      (val: string | number) => {
        if (!val && val !== 0) return "";
        const parts = String(val).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
        const regex = decimalSeparator === "." ? /[^\d.]/g : /[^\d,]/g;
        val = val.replace(regex, "");
        const parts = val.split(decimalSeparator);
        if (parts.length > 2) {
          val = parts[0] + decimalSeparator + parts.slice(1).join("");
        }
        const standardVal = val.replace(decimalSeparator, ".");
        onChange?.(standardVal);
      } else {
        onChange?.(val);
      }
    };

    const handleClear = useCallback(() => {
      onChange?.("");
      internalRef.current?.focus();
    }, [onChange]);

    return (
      <div
        style={style}
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
          onClick={() => internalRef.current?.focus()}
        >
          {prependIcon && <div className="cs-input__icon">{prependIcon}</div>}

          <input
            {...rest}
            ref={internalRef}
            type={inputType}
            value={displayValue}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleChange}
          />

          <div
            className="cs-input__actions"
            onClick={(e) => e.stopPropagation()}
          >
            {type === "password" && value && (
              <div
                className="cs-input__action-btn"
                tabIndex={0}
                role="button"
                onClick={() => setShowPassword(!showPassword)}
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
  },
);

CSInput.displayName = "CSInput";
export default React.memo(CSInput);
