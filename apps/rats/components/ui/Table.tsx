import type { ComponentProps, ReactNode } from "react";

export function TableWrap({ children }: { children: ReactNode }) {
  return <div className="table-wrap">{children}</div>;
}

export function Table(props: ComponentProps<"table">) {
  return <table className="table" {...props} />;
}
