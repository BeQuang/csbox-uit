import React, { useMemo } from "react";
import "./styles.scss";

export type CSInputVariant = "default" | "success" | "warning" | "danger";

export interface CSInputProps {
  label?: string;
  required?: boolean;

  value?: string | number;
  onChange?: (value: string) => void;

  placeholder?: string;
  error?: string;

  type?: "text" | "number" | "password";
  formatNumber?: boolean;

  unit?: string;
  units?: string[];
  selectedUnit?: string;
  onChangeUnit?: (unit: string) => void;

  prependIcon?: React.ReactNode;
  disabled?: boolean;

  variant?: CSInputVariant;
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
  unit,
  units,
  selectedUnit,
  onChangeUnit,
  prependIcon,
  disabled = false,
  variant = "default",
}: CSInputProps) {
  const displayValue = useMemo(() => {
    if (!formatNumber || value === undefined || value === "")
      return value ?? "";
    const raw = String(value).replace(/,/g, "");
    return isNaN(Number(raw)) ? value : Number(raw).toLocaleString();
  }, [value, formatNumber]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (formatNumber) {
      val = val.replace(/[^\d]/g, "");
    }
    onChange?.(val);
  };

  return (
    <div
      className={[
        "cs-input",
        `cs-input--${variant}`,
        error && "cs-input--error",
        disabled && "cs-input--disabled",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <label className="cs-input__label">
          {label}
          {required && <span>*</span>}
        </label>
      )}

      <div className="cs-input__wrapper">
        {prependIcon && <div className="cs-input__icon">{prependIcon}</div>}

        <input
          type={type}
          value={displayValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
        />

        {(unit || units) && (
          <div className="cs-input__unit">
            {units ? (
              <select
                value={selectedUnit}
                onChange={(e) => onChangeUnit?.(e.target.value)}
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

      {error && <div className="cs-input__error">{error}</div>}
    </div>
  );
}
