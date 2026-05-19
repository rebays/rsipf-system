"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  Calendar,
  Folder,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { Sidebar, type SidebarGroup } from "@/components/nav";
import { useAdminApplications, useIntakes } from "@/lib/use-application";

export function AdminSidebar() {
  const pathname = usePathname();
  const { applications } = useAdminApplications();
  const { intakes } = useIntakes();

  const openIntakes = intakes.filter((i) => i.status === "open").length;

  const groups = useMemo<SidebarGroup[]>(
    () => [
      {
        title: "Records office",
        items: [
          {
            icon: LayoutDashboard,
            label: "Overview",
            href: "/admin",
            active: pathname === "/admin",
          },
          {
            icon: Calendar,
            label: "Intakes",
            href: "/admin/intakes",
            active: pathname?.startsWith("/admin/intakes") ?? false,
            badge: openIntakes ? `${openIntakes} open` : undefined,
          },
          {
            icon: Folder,
            label: "Applications",
            href: "/admin/applications",
            active: pathname?.startsWith("/admin/applications") ?? false,
            badge: applications.length ? String(applications.length) : undefined,
          },
        ],
      },
      {
        title: "Account",
        items: [
          {
            icon: LogOut,
            label: "Sign out",
            href: "/admin/sign-out",
          },
        ],
      },
    ],
    [pathname, applications.length, openIntakes],
  );

  return <Sidebar groups={groups} />;
}
