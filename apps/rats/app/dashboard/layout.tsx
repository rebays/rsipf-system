import type { ReactNode } from "react";

import { PortalShell } from "@/components/layout";
import { DashboardSidebar } from "./sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <PortalShell
      sidebar={<DashboardSidebar />}
      org="Police Service · Recruits"
      initials="AP"
    >
      {children}
    </PortalShell>
  );
}
