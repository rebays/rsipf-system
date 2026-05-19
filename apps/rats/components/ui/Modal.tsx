import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Icon } from "./Icon";

type ModalProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export function Modal({ eyebrow, title, children, footer }: ModalProps) {
  return (
    <div className="modal">
      <div className="modal__head">
        <div>
          {eyebrow && (
            <div
              className="t-eyebrow"
              style={{ color: "var(--gold-700)" }}
            >
              {eyebrow}
            </div>
          )}
          <h3 className="modal__title" style={eyebrow ? { marginTop: 6 } : undefined}>
            {title}
          </h3>
        </div>
        <button className="modal__close" aria-label="Close">
          <Icon as={X} />
        </button>
      </div>
      <div className="modal__body">{children}</div>
      {footer && <div className="modal__foot">{footer}</div>}
    </div>
  );
}

export function ModalStage({ children }: { children: ReactNode }) {
  return <div className="modal-stage">{children}</div>;
}
