import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ButtonSize, ButtonVariant } from "./Button";

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
};

export function LinkButton({
  variant = "primary",
  size = "default",
  className,
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      className={cn(
        "btn",
        variant !== "primary" && `btn--${variant}`,
        size !== "default" && `btn--${size}`,
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
