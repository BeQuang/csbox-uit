import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ClipLoader } from "react-spinners";
import "./styles.scss";

export type ButtonColor = "primary" | "success" | "warning" | "danger" | "info";

export interface CSButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  color?: ButtonColor;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  asChild?: boolean;
}

export default function CSButton({
  children,
  onClick,
  color = "primary",
  size = "md",
  disabled,
  loading,
  type = "button",
  className = "",
  asChild = false,
}: CSButtonProps) {
  const Comp = asChild ? Slot : "button";

  const classes = [
    "cs-btn",
    `cs-btn--${size}`,
    `cs-btn--${color}`,
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
      {loading && (
        <span className="cs-btn__loader">
          <ClipLoader size={16} color="#fff" />
        </span>
      )}
      <span className={loading ? "cs-btn__content--hidden" : ""}>
        {children}
      </span>
    </Comp>
  );
}
