"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  AlertTriangle,
  Briefcase,
  CheckSquare,
  ClipboardList,
  FileText,
  Fingerprint,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  MessageCircle,
  ScrollText,
  Upload,
  User,
} from "lucide-react";

import { Sidebar, type SidebarGroup } from "@/components/nav";
import { useApplication } from "@/lib/use-application";
import { applicationProgress, stageState } from "@/lib/application";

function tickOf(status: "complete" | "partial" | "todo"): string {
  if (status === "complete") return "✓";
  if (status === "partial") return "…";
  return "";
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const { application } = useApplication();

  const groups = useMemo<SidebarGroup[]>(() => {
    const counts = application
      ? {
          personal: stageState(application, "personal"),
          education: stageState(application, "education"),
          work: stageState(application, "work"),
          disclosures: stageState(application, "disclosures"),
          statements: stageState(application, "statements"),
          documents: stageState(application, "documents"),
          background: stageState(application, "background"),
        }
      : null;

    const progress = application ? applicationProgress(application) : null;

    return [
      {
        title: "Your application",
        items: [
          {
            icon: LayoutDashboard,
            label: "Overview",
            href: "/dashboard",
            active: pathname === "/dashboard",
            badge: progress ? `${progress.percent}%` : undefined,
          },
          {
            icon: User,
            label: "Personal particulars",
            href: "/dashboard/personal",
            active: pathname?.startsWith("/dashboard/personal") ?? false,
            badge: counts ? tickOf(counts.personal.complete ? "complete" : "todo") : undefined,
          },
          {
            icon: GraduationCap,
            label: "Education",
            href: "/dashboard/education",
            active: pathname?.startsWith("/dashboard/education") ?? false,
            badge: counts ? tickOf(counts.education.complete ? "complete" : "todo") : undefined,
          },
          {
            icon: Briefcase,
            label: "Employment",
            href: "/dashboard/work",
            active: pathname?.startsWith("/dashboard/work") ?? false,
            badge: counts ? tickOf(counts.work.complete ? "complete" : "todo") : undefined,
          },
          {
            icon: AlertTriangle,
            label: "Disclosures",
            href: "/dashboard/disclosures",
            active: pathname?.startsWith("/dashboard/disclosures") ?? false,
            badge: counts ? tickOf(counts.disclosures.complete ? "complete" : "todo") : undefined,
          },
          {
            icon: ScrollText,
            label: "Statements",
            href: "/dashboard/statements",
            active: pathname?.startsWith("/dashboard/statements") ?? false,
            badge: counts ? tickOf(counts.statements.complete ? "complete" : "todo") : undefined,
          },
          {
            icon: Upload,
            label: "Documents",
            href: "/dashboard/documents",
            active: pathname?.startsWith("/dashboard/documents") ?? false,
            badge: counts ? tickOf(counts.documents.complete ? "complete" : "todo") : undefined,
          },
          {
            icon: Fingerprint,
            label: "Background check",
            href: "/dashboard/background",
            active: pathname?.startsWith("/dashboard/background") ?? false,
            badge: counts ? tickOf(counts.background.complete ? "complete" : "todo") : undefined,
          },
          {
            icon: ClipboardList,
            label: "Assessments",
            href: "/dashboard/assessments",
            active: pathname?.startsWith("/dashboard/assessments") ?? false,
          },
          {
            icon: CheckSquare,
            label: "Review & submit",
            href: "/dashboard/submit",
            active: pathname?.startsWith("/dashboard/submit") ?? false,
          },
        ],
      },
      {
        title: "Support",
        items: [
          {
            icon: HelpCircle,
            label: "Help & FAQ",
            href: "/dashboard/help",
            active: pathname?.startsWith("/dashboard/help") ?? false,
          },
          {
            icon: MessageCircle,
            label: "Contact recruiter",
            href: "/dashboard/contact",
            active: pathname?.startsWith("/dashboard/contact") ?? false,
          },
        ],
      },
    ];
  }, [pathname, application]);
  // FileText reference to satisfy lint when this list grows
  void FileText;

  return <Sidebar groups={groups} />;
}
