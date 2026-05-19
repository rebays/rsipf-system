import type { ReactNode } from "react";
import { TopNav } from "../nav/TopNav";

type PortalShellProps = {
  sidebar: ReactNode;
  org?: string;
  initials?: string;
  children: ReactNode;
};

export function PortalShell({ sidebar, org, initials, children }: PortalShellProps) {
  return (
    <div className="portal-shell">
      <TopNav org={org} initials={initials} />
      <div className="portal-shell__body">
        {sidebar}
        <div className="portal-shell__main">{children}</div>
      </div>
    </div>
  );
}
