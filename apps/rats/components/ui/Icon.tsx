import type { ComponentProps, ElementType } from "react";

type IconProps = Omit<ComponentProps<"svg">, "ref"> & {
  as: ElementType;
};

export function Icon({ as: Component, strokeWidth = 1.75, ...rest }: IconProps) {
  return <Component strokeWidth={strokeWidth} {...rest} />;
}
