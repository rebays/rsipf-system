import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Icon } from "./Icon";

export type Crumb = { label: ReactNode; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const node = isLast ? (
          <span className="current">{item.label}</span>
        ) : item.href ? (
          <a href={item.href}>{item.label}</a>
        ) : (
          <a>{item.label}</a>
        );
        return (
          <span
            key={i}
            style={{ display: "inline-flex", alignItems: "center", gap: "var(--sp-2)" }}
          >
            {node}
            {!isLast && <Icon as={ChevronRight} />}
          </span>
        );
      })}
    </nav>
  );
}
