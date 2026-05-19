import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = ComponentProps<"div"> & {
  accent?: boolean;
};

export function Card({ accent, className, ...rest }: CardProps) {
  return (
    <div
      className={cn("card", accent && "card--accent", className)}
      {...rest}
    />
  );
}

export function CardHead({ children }: { children: ReactNode }) {
  return <div className="card__head">{children}</div>;
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="card__title">{children}</h3>;
}

export function CardSub({ children }: { children: ReactNode }) {
  return <p className="card__sub">{children}</p>;
}
