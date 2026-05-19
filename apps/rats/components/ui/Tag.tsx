import type { CSSProperties, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type TagProps = {
  children: ReactNode;
  removable?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function Tag({ children, removable = true, className, style }: TagProps) {
  return (
    <span className={cn("tag", className)} style={style}>
      {children}
      {removable && <Icon as={X} />}
    </span>
  );
}
