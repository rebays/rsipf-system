import type { ElementType, ReactNode } from "react";
import { Icon } from "./Icon";

type EmptyProps = {
  icon?: ElementType;
  customIcon?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  action?: ReactNode;
};

export function Empty({ icon, customIcon, title, body, action }: EmptyProps) {
  return (
    <div className="empty">
      {customIcon ?? (icon ? <Icon as={icon} className="empty__icon" /> : null)}
      <div className="empty__title">{title}</div>
      {body && <p className="empty__body">{body}</p>}
      {action}
    </div>
  );
}
