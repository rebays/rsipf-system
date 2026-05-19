import type { ReactNode } from "react";
import { ProgressBar } from "../ui/ProgressBar";

type ProgressOverviewProps = {
  eyebrow: ReactNode;
  heading: ReactNode;
  badge?: ReactNode;
  percent: number;
  footnote?: ReactNode;
};

export function ProgressOverview({
  eyebrow,
  heading,
  badge,
  percent,
  footnote,
}: ProgressOverviewProps) {
  return (
    <div className="progress-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "var(--sp-4)",
        }}
      >
        <div>
          <div className="t-eyebrow">{eyebrow}</div>
          <div
            style={{
              fontSize: "var(--fs-h3)",
              fontWeight: 700,
              color: "var(--navy-800)",
              marginTop: 4,
            }}
          >
            {heading}
          </div>
        </div>
        {badge}
      </div>
      <ProgressBar value={percent} label="Application progress" />
      {footnote && (
        <div className="t-sm" style={{ color: "var(--gray-600)" }}>
          {footnote}
        </div>
      )}
    </div>
  );
}
