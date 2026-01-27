import React, { useCallback } from "react";
import { Toaster, toast as sonnerToast, ExternalToast } from "sonner";
import { ToastContext, ToastType, CSToastOptions } from "./ToastContext";

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toast = useCallback(
    (
      message: string,
      options?: ToastType | CSToastOptions,
      duration?: number,
    ) => {
      // 1. Nếu options là string (ví dụ: "success", "error")
      if (typeof options === "string") {
        const config: ExternalToast = { duration };
        switch (options) {
          case "success":
            sonnerToast.success(message, config);
            break;
          case "error":
            sonnerToast.error(message, config);
            break;
          case "warning":
            sonnerToast.warning(message, config);
            break;
          case "loading":
            sonnerToast.loading(message, config);
            break;
          default:
            sonnerToast.info(message, config);
            break;
        }
        return;
      }

      // 2. Nếu options là Object (hỗ trợ full tính năng Sonner)
      const { type, ...restOptions } = (options || {}) as CSToastOptions;
      const finalConfig: ExternalToast = {
        duration: duration || restOptions.duration || 3000,
        ...restOptions,
      };

      switch (type) {
        case "success":
          sonnerToast.success(message, finalConfig);
          break;
        case "error":
          sonnerToast.error(message, finalConfig);
          break;
        case "warning":
          sonnerToast.warning(message, finalConfig);
          break;
        case "loading":
          sonnerToast.loading(message, finalConfig);
          break;
        case "info":
          sonnerToast.info(message, finalConfig);
          break;
        default:
          sonnerToast(message, finalConfig);
          break;
      }
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <Toaster
        position="top-right"
        richColors
        closeButton
        theme="light" // Hoặc "dark" / "system"
      />
    </ToastContext.Provider>
  );
};
