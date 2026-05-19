"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, Plus } from "lucide-react";

import { StageHeader } from "@/components/dashboard";
import {
  Badge,
  Button,
  Empty,
  Icon,
  Table,
  TableWrap,
} from "@/components/ui";
import { useAdminApplications, useIntakes } from "@/lib/use-application";
import type { Intake, IntakeStatus } from "@/lib/application";

function statusBadge(s: IntakeStatus) {
  switch (s) {
    case "open":
      return <Badge variant="success">Open</Badge>;
    case "closed":
      return <Badge variant="warn">Closed</Badge>;
    case "completed":
      return <Badge variant="neutral">Completed</Badge>;
    default:
      return <Badge variant="info">Draft</Badge>;
  }
}

function fmt(date: string): string {
  if (!date) return "—";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function IntakesListPage() {
  const { hydrated, intakes } = useIntakes();
  const { applications } = useAdminApplications();

  const sorted = useMemo(
    () =>
      [...intakes].sort((a, b) =>
        (b.openDate ?? "").localeCompare(a.openDate ?? ""),
      ),
    [intakes],
  );

  const counts = useMemo(() => {
    const map = new Map<string, { total: number; offers: number }>();
    for (const a of applications) {
      const prev = map.get(a.intakeId) ?? { total: 0, offers: 0 };
      prev.total += 1;
      if (a.decision === "offer") prev.offers += 1;
      map.set(a.intakeId, prev);
    }
    return map;
  }, [applications]);

  if (!hydrated) {
    return (
      <p className="t-sm" style={{ color: "var(--gray-600)" }}>
        Loading intakes…
      </p>
    );
  }

  return (
    <>
      <StageHeader
        crumbs={[{ label: "Records office", href: "/admin" }, { label: "Intakes" }]}
        title="Intakes"
        lede="Recruit classes the records office opens for application. Set a class to Open to let applicants apply against it."
        meta={
          <Link href="/admin/intakes/new" style={{ textDecoration: "none" }}>
            <Button>
              <Icon as={Plus} />
              New intake
            </Button>
          </Link>
        }
      />

      <div className="stack-5">
        {sorted.length === 0 ? (
          <Empty
            title="No intakes yet"
            body="Create the first intake to start accepting applications."
            action={
              <Link href="/admin/intakes/new" style={{ textDecoration: "none" }}>
                <Button>
                  <Icon as={Plus} />
                  Create intake
                </Button>
              </Link>
            }
          />
        ) : (
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <th>Intake</th>
                  <th>Status</th>
                  <th>Applications open</th>
                  <th>Academy starts</th>
                  <th className="num">Capacity</th>
                  <th className="num">Applications</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {sorted.map((intake: Intake) => {
                  const c = counts.get(intake.id) ?? { total: 0, offers: 0 };
                  return (
                    <tr key={intake.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{intake.name || intake.id}</div>
                        <div
                          className="mono"
                          style={{ color: "var(--gray-600)", fontSize: 11 }}
                        >
                          {intake.id}
                        </div>
                      </td>
                      <td>{statusBadge(intake.status)}</td>
                      <td style={{ color: "var(--gray-700)" }}>
                        {fmt(intake.openDate)} – {fmt(intake.closeDate)}
                      </td>
                      <td style={{ color: "var(--gray-700)" }}>
                        {fmt(intake.academyStartDate)}
                      </td>
                      <td className="num mono">{intake.capacity || "—"}</td>
                      <td className="num mono">
                        {c.total}
                        {c.offers > 0 ? ` · ${c.offers} offer${c.offers === 1 ? "" : "s"}` : ""}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <Link
                          href={`/admin/intakes/${intake.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button size="sm" variant="ghost">
                            Manage
                            <Icon as={ArrowRight} />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </TableWrap>
        )}
      </div>
    </>
  );
}
