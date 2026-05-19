import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "../ui/Icon";

export type SidebarItem = {
  icon: ElementType;
  label: ReactNode;
  href?: string;
  active?: boolean;
  badge?: ReactNode;
};

export type SidebarGroup = {
  title: ReactNode;
  items: SidebarItem[];
};

export function Sidebar({ groups }: { groups: SidebarGroup[] }) {
  return (
    <div className="sidebar">
      {groups.map((group, gi) => (
        <div key={gi}>
          <div className="sidebar__group">{group.title}</div>
          {group.items.map((item, ii) => {
            const Wrapper = item.href ? "a" : "div";
            const wrapperProps = item.href ? { href: item.href } : {};
            return (
              <Wrapper
                key={ii}
                className={cn("sidebar__item", item.active && "active")}
                style={item.href ? { textDecoration: "none" } : undefined}
                {...wrapperProps}
              >
                <Icon as={item.icon} />
                {item.label}
                {item.badge && <span className="sidebar__badge">{item.badge}</span>}
              </Wrapper>
            );
          })}
        </div>
      ))}
    </div>
  );
}
