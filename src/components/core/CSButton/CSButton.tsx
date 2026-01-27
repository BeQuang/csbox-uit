import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ClipLoader } from "react-spinners";
import "./styles.scss";

export type ButtonColor = "primary" | "success" | "warning" | "danger" | "info";
export type ButtonVariant = "solid" | "outline" | "ghost";

export interface CSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  width?: "auto" | "full";
  type?: "button" | "submit" | "reset";
  className?: string;
  asChild?: boolean;
}

export default function CSButton({
  children,
  onClick,
  color = "primary",
  variant = "solid",
  size = "md",
  disabled,
  loading,
  width = "auto",
  type = "button",
  className = "",
  asChild = false,
}: CSButtonProps) {
  // Chọn Component để render
  const Comp = asChild ? Slot : "button";

  const classes = [
    "cs-btn",
    `cs-btn--${size}`,
    `cs-btn--${color}`,
    `cs-btn--${variant}`,
    `cs-btn--w-${width}`,
    loading && "cs-btn--loading",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <Comp
      type={!asChild ? type : undefined}
      disabled={!asChild ? disabled || loading : undefined}
      onClick={handleClick}
      className={classes}
    >
      {asChild ? (
        // Khi dùng asChild (Slot), truyền con duy nhất trực tiếp
        // Lưu ý: Không hỗ trợ Loader tự động trong chế độ asChild để tránh lỗi Slot
        children
      ) : (
        <>
          {loading && (
            <span className="cs-btn__loader">
              <ClipLoader size={16} color="currentColor" />
            </span>
          )}
          <span
            className={loading ? "cs-btn__content--hidden" : "cs-btn__content"}
          >
            {children}
          </span>
        </>
      )}
    </Comp>
  );
}
