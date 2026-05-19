import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type TimelineStatus = "done" | "current" | "pending";

export type TimelineItemProps = {
  title: ReactNode;
  meta: ReactNode;
  body?: ReactNode;
  status: TimelineStatus;
};

export function Timeline({
  items,
  style,
}: {
  items: TimelineItemProps[];
  style?: CSSProperties;
}) {
  return (
    <div className="timeline" style={style}>
      {items.map((item, i) => (
        <TimelineItem key={i} {...item} />
      ))}
    </div>
  );
}

export function TimelineItem({ title, meta, body, status }: TimelineItemProps) {
  return (
    <div className={cn("tl-item", `tl-item--${status}`)}>
      <div className="tl-item__title">{title}</div>
      <div className="tl-item__meta">{meta}</div>
      {body && <p className="tl-item__body">{body}</p>}
    </div>
  );
}
