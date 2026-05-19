import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui";

type StageHeaderProps = {
  crumbs: Crumb[];
  title: ReactNode;
  lede?: ReactNode;
  meta?: ReactNode;
};

export function StageHeader({ crumbs, title, lede, meta }: StageHeaderProps) {
  return (
    <header style={{ margin: "0 0 var(--sp-6)" }}>
      <Breadcrumbs items={crumbs} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "var(--sp-6)",
          flexWrap: "wrap",
          marginTop: "var(--sp-5)",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "var(--fs-h1)",
              color: "var(--navy-800)",
              letterSpacing: "var(--tracking-tight)",
              margin: "0 0 var(--sp-2)",
              fontWeight: 700,
            }}
          >
            {title}
          </h1>
          {lede && (
            <p
              className="t-lg"
              style={{ color: "var(--gray-700)", margin: 0, maxWidth: "60ch" }}
            >
              {lede}
            </p>
          )}
        </div>
        {meta}
      </div>
    </header>
  );
}
