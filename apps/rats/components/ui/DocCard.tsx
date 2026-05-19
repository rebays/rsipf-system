import type { ElementType, ReactNode } from "react";
import { FileText } from "lucide-react";
import { Icon } from "./Icon";

type DocCardProps = {
  icon?: ElementType;
  name: ReactNode;
  meta: ReactNode;
  badge?: ReactNode;
};

export function DocCard({ icon, name, meta, badge }: DocCardProps) {
  return (
    <div className="doc-card">
      <div className="doc-card__icon">
        <Icon as={icon ?? FileText} />
      </div>
      <div>
        <div className="doc-card__name">{name}</div>
        <div className="doc-card__meta">{meta}</div>
      </div>
      {badge}
    </div>
  );
}
