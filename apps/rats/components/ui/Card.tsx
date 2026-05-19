import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  accent?: boolean;
  className?: string;
};

export function Card({ children, accent = false, className }: CardProps) {
  return (
    <div className={cn("card", accent && "card--accent", className)}>{children}</div>
  );
}

export function CardHead({ children }: { children: ReactNode }) {
  return <div className="card__head">{children}</div>;
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h4 className="card__title">{children}</h4>;
}

export function CardSub({ children }: { children: ReactNode }) {
  return <p className="card__sub">{children}</p>;
}
