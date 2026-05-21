"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Folder, XCircle } from "lucide-react";

import { StageHeader } from "@/components/dashboard";
import {
  Badge,
  Button,
  Card,
  CardHead,
  CardSub,
  CardTitle,
  Empty,
  Icon,
  Table,
  TableWrap,
} from "@/components/ui";
import { useAdminApplications, useAdminUser } from "@/lib/use-application";
import type { Application, Decision } from "@/lib/application";

function decisionBadge(decision: Decision | undefined) {
  switch (decision) {
    case "selected":
      return <Badge variant="success">Selected</Badge>;
    case "notSelected":
      return <Badge variant="danger">Not selected</Badge>;
    case "onHold":
      return <Badge variant="warn">On hold for next intake</Badge>;
    case "shortlisted":
      return <Badge variant="info">Shortlisted</Badge>;
    default:
      return <Badge variant="neutral">Awaiting review</Badge>;
  }
}

export default function AdminOverview() {
  const { hydrated, applications } = useAdminApplications();
  const { adminUser } = useAdminUser();

  if (!hydrated) {
    return (
      <p className="t-sm" style={{ color: "var(--gray-600)" }}>
        Loading queue…
      </p>
    );
  }

  const total = applications.length;
  const inReview = applications.filter(
    (a) => a.decision === undefined || a.decision === "shortlisted",
  ).length;
  const onHold = applications.filter((a) => a.decision === "onHold").length;
  const selected = applications.filter((a) => a.decision === "selected").length;
  const notSelected = applications.filter((a) => a.decision === "notSelected").length;

  const recents = [...applications]
    .sort((a, b) => (b.submittedAt ?? "").localeCompare(a.submittedAt ?? ""))
    .slice(0, 5);

  return (
    <>
      <StageHeader
        crumbs={[{ label: "Records office" }, { label: "Overview" }]}
        title="Records office overview"
        lede={
          adminUser
            ? `Signed in as ${adminUser.name}. Use this panel to vet incoming applications and post decisions.`
            : "Vet incoming applications and post decisions."
        }
        meta={<Badge variant="solid">2026-B intake</Badge>}
      />

      <div className="stack-6">
        <section>
          <div className="grid-4">
            <StatCard
              icon={Folder}
              label="Total"
              value={total}
              tone="navy"
            />
            <StatCard
              icon={Clock}
              label="In review / on hold"
              value={inReview + onHold}
              tone="warn"
            />
            <StatCard
              icon={CheckCircle2}
              label="Selected"
              value={selected}
              tone="success"
            />
            <StatCard
              icon={XCircle}
              label="Not selected"
              value={notSelected}
              tone="danger"
            />
          </div>
        </section>

        <Card>
          <CardHead>
            <div>
              <CardTitle>Recent submissions</CardTitle>
              <CardSub>The five most recently submitted applications.</CardSub>
            </div>
            <Link href="/admin/applications" style={{ textDecoration: "none" }}>
              <Button variant="ghost">
                View all
                <Icon as={ArrowRight} />
              </Button>
            </Link>
          </CardHead>

          {recents.length === 0 ? (
            <Empty
              icon={Folder}
              title="No applications yet"
              body="Applications submitted from the applicant portal will appear here."
            />
          ) : (
            <TableWrap>
              <Table>
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>Reference</th>
                    <th>Submitted</th>
                    <th>Decision</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {recents.map((a) => (
                    <tr key={a.applicantId}>
                      <td>{a.personal.fullName || a.ownerEmail || "—"}</td>
                      <td className="mono">{a.applicantId}</td>
                      <td style={{ color: "var(--gray-600)" }}>
                        {a.submittedAt
                          ? new Date(a.submittedAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td>{decisionBadge(a.decision)}</td>
                      <td style={{ textAlign: "right" }}>
                        <Link
                          href={`/admin/applications/${a.applicantId}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button size="sm" variant="ghost">
                            Open
                            <Icon as={ArrowRight} />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrap>
          )}
        </Card>
      </div>
    </>
  );
}

type Tone = "navy" | "warn" | "success" | "danger";

function StatCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  tone: Tone;
}) {
  const colour =
    tone === "warn"
      ? "var(--warn-600)"
      : tone === "success"
        ? "var(--success-600)"
        : tone === "danger"
          ? "var(--danger-600)"
          : "var(--navy-600)";
  return (
    <div
      style={{
        background: "var(--white)",
        border: "1px solid var(--gray-200)",
        borderTop: `3px solid ${colour}`,
        borderRadius: "var(--r-sm)",
        padding: "var(--sp-5)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--sp-3)",
          color: colour,
        }}
      >
        <Icon as={icon} />
        <span
          className="t-eyebrow"
          style={{ color: "var(--gray-600)", letterSpacing: "var(--tracking-eyebrow)" }}
        >
          {label}
        </span>
      </div>
      <div
        style={{
          fontSize: "32px",
          fontWeight: 700,
          color: "var(--navy-800)",
          marginTop: "var(--sp-2)",
        }}
      >
        {value}
      </div>
    </div>
  );
}
