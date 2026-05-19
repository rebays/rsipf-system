"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";

import { StageHeader } from "@/components/dashboard";
import {
  Badge,
  Button,
  Empty,
  Field,
  Icon,
  Input,
  InputGroup,
  Select,
  Table,
  TableWrap,
} from "@/components/ui";
import { useAdminApplications, useIntakes } from "@/lib/use-application";
import {
  applicationProgress,
  stageState,
  type Application,
  type Decision,
} from "@/lib/application";

type DecisionFilter = "all" | Decision;
type IntakeFilter = "all" | string;

function decisionBadge(decision: Decision | undefined) {
  switch (decision) {
    case "offer":
      return <Badge variant="success">Offer</Badge>;
    case "reject":
      return <Badge variant="danger">Reject</Badge>;
    case "hold":
      return <Badge variant="warn">Hold</Badge>;
    default:
      return <Badge variant="info">Pending</Badge>;
  }
}

function docSummary(app: Application): string {
  const required = app.documents.filter((d) => d.required);
  const verified = required.filter((d) => d.status === "verified").length;
  const rejected = required.filter((d) => d.status === "rejected").length;
  const uploaded = required.filter((d) => d.status === "uploaded").length;
  if (rejected > 0) return `${rejected} rejected, ${verified}/${required.length} verified`;
  if (verified === required.length) return "All verified";
  if (uploaded + verified === required.length) return `${verified}/${required.length} verified, rest pending`;
  return `${verified + uploaded}/${required.length} uploaded`;
}

export default function ApplicationsListPage() {
  const { hydrated, applications } = useAdminApplications();
  const { intakes } = useIntakes();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<DecisionFilter>("all");
  const [intakeFilter, setIntakeFilter] = useState<IntakeFilter>("all");

  const filtered = useMemo(() => {
    const lcq = query.trim().toLowerCase();
    return applications
      .filter((a) => {
        const decision: Decision = a.decision ?? "pending";
        if (filter !== "all" && decision !== filter) return false;
        if (intakeFilter !== "all" && a.intakeId !== intakeFilter) return false;
        if (!lcq) return true;
        return (
          a.applicantId.toLowerCase().includes(lcq) ||
          a.personal.fullName.toLowerCase().includes(lcq) ||
          (a.ownerEmail ?? "").toLowerCase().includes(lcq)
        );
      })
      .sort((a, b) => (b.submittedAt ?? "").localeCompare(a.submittedAt ?? ""));
  }, [applications, query, filter, intakeFilter]);

  const intakeNameById = useMemo(() => {
    const map = new Map<string, string>();
    for (const i of intakes) map.set(i.id, i.name || i.id);
    return map;
  }, [intakes]);

  if (!hydrated) {
    return (
      <p className="t-sm" style={{ color: "var(--gray-600)" }}>
        Loading applications…
      </p>
    );
  }

  return (
    <>
      <StageHeader
        crumbs={[
          { label: "Records office", href: "/admin" },
          { label: "Applications" },
        ]}
        title="Applications"
        lede="Every application submitted from the applicant portal lands here. Use search and filters to find the one you need."
        meta={<Badge variant="solid">{applications.length} total</Badge>}
      />

      <div className="stack-5">
        <div className="grid-3">
          <Field label="Search" htmlFor="apps-search">
            <InputGroup icon={<Icon as={Search} width={16} height={16} />}>
              <Input
                id="apps-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Name, email, or reference"
              />
            </InputGroup>
          </Field>
          <Field label="Decision" htmlFor="apps-filter">
            <Select
              id="apps-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value as DecisionFilter)}
            >
              <option value="all">All decisions</option>
              <option value="pending">Pending</option>
              <option value="hold">Hold</option>
              <option value="offer">Offer</option>
              <option value="reject">Reject</option>
            </Select>
          </Field>
          <Field label="Intake" htmlFor="apps-intake-filter">
            <Select
              id="apps-intake-filter"
              value={intakeFilter}
              onChange={(e) => setIntakeFilter(e.target.value as IntakeFilter)}
            >
              <option value="all">All intakes</option>
              {intakes.map((i) => (
                <option value={i.id} key={i.id}>
                  {i.name || i.id}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        {filtered.length === 0 ? (
          <Empty
            icon={Search}
            title="No matches"
            body={
              applications.length === 0
                ? "There are no applications in the queue yet."
                : "Adjust your search or change the decision filter."
            }
          />
        ) : (
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Intake</th>
                  <th>Reference</th>
                  <th>Submitted</th>
                  <th>Documents</th>
                  <th>Progress</th>
                  <th>Decision</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => {
                  const progress = applicationProgress(a);
                  const eligibility = stageState(a, "eligibility");
                  return (
                    <tr key={a.applicantId}>
                      <td>
                        <div style={{ fontWeight: 600 }}>
                          {a.personal.fullName || a.ownerEmail || "—"}
                        </div>
                        <div
                          className="t-mono"
                          style={{ color: "var(--gray-600)", fontSize: 11 }}
                        >
                          {a.ownerEmail ?? ""}
                        </div>
                      </td>
                      <td className="mono">{intakeNameById.get(a.intakeId) ?? a.intakeId}</td>
                      <td className="mono">{a.applicantId}</td>
                      <td style={{ color: "var(--gray-600)" }}>
                        {a.submittedAt
                          ? new Date(a.submittedAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td style={{ color: "var(--gray-700)" }}>{docSummary(a)}</td>
                      <td>
                        {eligibility.passing ? (
                          <Badge variant="success">Eligible · {progress.percent}%</Badge>
                        ) : (
                          <Badge variant="warn">Review · {progress.percent}%</Badge>
                        )}
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
