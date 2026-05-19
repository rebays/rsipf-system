import type { ElementType, ReactNode } from "react";
import { UploadCloud } from "lucide-react";
import { Icon } from "./Icon";

type UploadProps = {
  title: ReactNode;
  hint?: ReactNode;
  icon?: ElementType;
};

export function Upload({ title, hint, icon }: UploadProps) {
  return (
    <div className="upload">
      <Icon as={icon ?? UploadCloud} className="upload__icon" />
      <div className="upload__title">{title}</div>
      {hint && <div className="upload__hint">{hint}</div>}
    </div>
  );
}
