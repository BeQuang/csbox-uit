import React from "react";
import "./styles.scss";
import { ClipLoader } from "react-spinners";

// 1. Thêm "secondary" hoặc các màu khác nếu cần để đồng bộ hệ thống
type PresetColor = "primary" | "success" | "danger" | "warning" | "info";

export interface CSButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  color?: PresetColor | string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  className?: string;
}

const presetMap: Record<string, string> = {
  primary: "#1677ff",
  success: "#22c55e",
  danger: "#ef4444",
  warning: "#f59e0b",
  info: "#0ea5e9",
};

export default function CSButton({
  children,
  onClick,
  color = "primary",
  size = "md",
  disabled,
  loading,
  type = "button",
  style,
  className = "",
}: CSButtonProps) {
  const isHex = typeof color === "string" && color.startsWith("#");

  // Fallback về primary nếu truyền sai tên preset
  const realColor = isHex
    ? color
    : presetMap[color as string] || presetMap.primary;

  const classes = [
    "cs-btn",
    `cs-btn--${size}`,
    loading && "cs-btn--loading",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // 2. Hàm xử lý Click để ngăn chặn double click khi đang load
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={handleOnClick}
      className={classes}
      data-preset={!isHex ? color : "custom"}
      style={
        {
          ...style,
          "--btn-color": realColor,
        } as React.CSSProperties
      }
    >
      {/* 3. Bọc nội dung vào span để dễ kiểm soát ẩn/hiện khi loading */}
      {loading && <ClipLoader size={18} color="#fff" />}
      <span className={loading ? "cs-btn__content--hidden" : ""}>
        {children}
      </span>
    </button>
  );
}
