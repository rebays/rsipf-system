import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { AlertIcon } from "@/components/icons";

export type AlertVariant = "info" | "success" | "warn" | "danger";

type AlertProps = {
  variant?: AlertVariant;
  title: ReactNode;
  body?: ReactNode;
  icon?: ReactNode;
  className?: string;
};

export function Alert({ variant = "info", title, body, icon, className }: AlertProps) {
  return (
    <div className={cn("alert", `alert--${variant}`, className)} role="status">
      <span className="alert__icon">{icon ?? <AlertIcon width={20} height={20} />}</span>
      <div>
        <p className="alert__title">{title}</p>
        {body && <p className="alert__body">{body}</p>}
      </div>
      <span />
    </div>
  );
}
