import type { ReactNode } from "react";

type AppCardProps = {
  initials: string;
  name: ReactNode;
  applicantId: ReactNode;
  meta?: ReactNode;
  badge?: ReactNode;
};

export function AppCard({ initials, name, applicantId, meta, badge }: AppCardProps) {
  return (
    <div className="app-card">
      <div className="app-card__avatar">{initials}</div>
      <div>
        <div className="app-card__name">{name}</div>
        <div className="app-card__id">{applicantId}</div>
        {meta && <div className="app-card__meta">{meta}</div>}
      </div>
      {badge}
    </div>
  );
}
