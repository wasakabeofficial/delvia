import { useEffect } from "react";
import type { ReactNode } from "react";
import "../../styles/ui/Modal.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  showCloseButton?: boolean;
}

export default function Modal({
  open,
  onClose,
  children,
  title,
  showCloseButton = true,
}: ModalProps) {
  // Bloquea scroll del body al abrir modal
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {showCloseButton && (
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ×
          </button>
        )}
        {title && <div className="modal-title">{title}</div>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
