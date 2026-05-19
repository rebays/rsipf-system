"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { PortalShell } from "@/components/layout";
import { useAdminUser } from "@/lib/use-application";
import { AdminSidebar } from "./sidebar";

export default function AdminAuthedLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { hydrated, adminUser } = useAdminUser();

  useEffect(() => {
    if (hydrated && !adminUser) router.replace("/admin/sign-in");
  }, [hydrated, adminUser, router]);

  if (!hydrated) {
    return (
      <p
        className="t-sm"
        style={{ padding: "var(--sp-8)", color: "var(--gray-600)" }}
      >
        Loading the staff portal…
      </p>
    );
  }
  if (!adminUser) return null;

  const initials =
    adminUser.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("") || "RO";

  return (
    <PortalShell
      sidebar={<AdminSidebar />}
      org="RSIPF · Records Office"
      initials={initials}
    >
      {children}
    </PortalShell>
  );
}
