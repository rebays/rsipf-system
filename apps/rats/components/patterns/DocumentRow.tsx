import type { CSSProperties, ElementType, ReactNode } from "react";
import { FileText } from "lucide-react";
import { Icon } from "../ui/Icon";

type DocumentRowProps = {
  icon?: ElementType;
  iconStyle?: CSSProperties;
  name: ReactNode;
  meta: ReactNode;
  badge?: ReactNode;
  action?: ReactNode;
};

export function DocumentRow({
  icon,
  iconStyle,
  name,
  meta,
  badge,
  action,
}: DocumentRowProps) {
  return (
    <div className="doc-row">
      <div className="doc-row__icon" style={iconStyle}>
        <Icon as={icon ?? FileText} />
      </div>
      <div>
        <div className="doc-row__name">{name}</div>
        <div className="doc-row__meta">{meta}</div>
      </div>
      {badge}
      {action}
    </div>
  );
}
