import React, { memo, forwardRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import CSButton, { ButtonColor } from "../CSButton/CSButton";
import "./styles.scss";

export interface CSModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  color?: ButtonColor;
  showCloseButton?: boolean;
  showBorderTop?: boolean;
  showShadow?: boolean;
}

const CSModal = forwardRef<HTMLDivElement, CSModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      description,
      children,
      footer,
      size = "md",
      color = "primary",
      showCloseButton = true,
      showBorderTop = false,
      showShadow = false,
      className = "",
      style,
      ...rest
    },
    ref,
  ) => {
    return (
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <Dialog.Portal>
          <Dialog.Overlay className="cs-modal-overlay" />
          <Dialog.Content
            ref={ref}
            style={style}
            {...rest}
            className={[
              "cs-modal-content",
              `cs-modal--${size}`,
              `cs-modal--${color}`,
              showBorderTop && "cs-modal--with-border",
              showShadow && "cs-modal--with-shadow",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {(title || showCloseButton) && (
              <div className="cs-modal-header">
                <div className="cs-modal-header__info">
                  {title && (
                    <Dialog.Title className="cs-modal-title">
                      {title}
                    </Dialog.Title>
                  )}
                  {description && (
                    <Dialog.Description className="cs-modal-description">
                      {description}
                    </Dialog.Description>
                  )}
                </div>
                {showCloseButton && (
                  <Dialog.Close asChild>
                    <CSButton
                      variant="ghost"
                      color={color}
                      className="cs-modal-close-trigger"
                    >
                      <X size={20} />
                    </CSButton>
                  </Dialog.Close>
                )}
              </div>
            )}

            <div className="cs-modal-body">{children}</div>

            {footer && <div className="cs-modal-footer">{footer}</div>}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
);

CSModal.displayName = "CSModal";
export default memo(CSModal);
