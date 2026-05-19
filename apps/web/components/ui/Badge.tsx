import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant =
  | "neutral"
  | "info"
  | "success"
  | "warn"
  | "danger"
  | "gold"
  | "solid";

type BadgeProps = ComponentProps<"span"> & {
  variant?: BadgeVariant;
};

export function Badge({ variant = "neutral", className, ...rest }: BadgeProps) {
  return (
    <span className={cn("badge", `badge--${variant}`, className)} {...rest} />
  );
}
