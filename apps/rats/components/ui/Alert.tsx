import type { ElementType, ReactNode } from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export type AlertVariant = "info" | "success" | "warn" | "danger";

const DEFAULT_ICONS: Record<AlertVariant, ElementType> = {
  info: Info,
  success: CheckCircle2,
  warn: AlertTriangle,
  danger: AlertOctagon,
};

type AlertProps = {
  variant: AlertVariant;
  title: ReactNode;
  body?: ReactNode;
  icon?: ElementType;
  dismissible?: boolean;
  className?: string;
};

export function Alert({
  variant,
  title,
  body,
  icon,
  dismissible = true,
  className,
}: AlertProps) {
  const IconComponent = icon ?? DEFAULT_ICONS[variant];
  return (
    <div className={cn("alert", `alert--${variant}`, className)} role="status">
      <Icon as={IconComponent} className="alert__icon" />
      <div>
        <p className="alert__title">{title}</p>
        {body && <p className="alert__body">{body}</p>}
      </div>
      {dismissible ? (
        <button className="alert__dismiss" aria-label="Dismiss">
          <Icon as={X} />
        </button>
      ) : (
        <span />
      )}
    </div>
  );
}
