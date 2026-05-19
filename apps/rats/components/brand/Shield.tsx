import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type ShieldProps = ComponentProps<"svg"> & {
  withCheck?: boolean;
};

export function Shield({ className, withCheck = true, ...rest }: ShieldProps) {
  return (
    <svg
      className={cn("brandbar__shield", className)}
      viewBox="0 0 36 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M18 1 L34 6 V20 C34 30 26 37 18 39 C10 37 2 30 2 20 V6 Z"
        fill="#0a1f3a"
        stroke="#c9a961"
        strokeWidth="1.5"
      />
      <path
        d="M18 8 L28 11 V20 C28 26 23 31 18 32 C13 31 8 26 8 20 V11 Z"
        fill="none"
        stroke="#c9a961"
        strokeWidth="1"
      />
      {withCheck && (
        <path
          d="M14 18 L17 21 L23 14"
          stroke="#c9a961"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      )}
      <circle cx="18" cy="6" r="1.2" fill="#c9a961" />
    </svg>
  );
}

type SmallShieldProps = ComponentProps<"svg">;

export function SmallShield(props: SmallShieldProps) {
  return (
    <svg viewBox="0 0 22 26" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M11 1 L20 4 V13 C20 19 16 24 11 25 C6 24 2 19 2 13 V4 Z" />
      <path
        d="M8 13 L10 15 L14 10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
