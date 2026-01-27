import { createContext } from "react";
import { ExternalToast } from "sonner";

export type ToastType = "success" | "error" | "warning" | "info" | "loading";

// Mở rộng ExternalToast của Sonner để cho phép truyền thêm thuộc tính 'type' vào object
export interface CSToastOptions extends ExternalToast {
  type?: ToastType;
}

export interface ToastContextType {
  toast: (
    message: string,
    options?: ToastType | CSToastOptions,
    duration?: number,
  ) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);
