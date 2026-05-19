"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  PauseCircle,
  Save,
  XCircle,
} from "lucide-react";

import { StageHeader } from "@/components/dashboard";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardHead,
  CardSub,
  CardTitle,
  Field,
  Icon,
  Table,
  TableWrap,
  Textarea,
} from "@/components/ui";
import { EligibilityCheck } from "@/components/patterns";
import {
  applicationProgress,
  evaluateEligibility,
  stageState,
  type Application,
  type Decision,
  type DocumentRecord,
  type DocumentStatus,
} from "@/lib/application";
import { useAdminApplication, useAdminUser, useIntakes } from "@/lib/use-application";

function decisionBadge(d: Decision | undefined) {
  switch (d) {
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

function docBadge(status: DocumentStatus) {
  switch (status) {
    case "verified":
      return <Badge variant="success">Verified</Badge>;
    case "uploaded":
      return <Badge variant="info">Uploaded</Badge>;
    case "rejected":
      return <Badge variant="danger">Rejected</Badge>;
    default:
      return <Badge variant="warn">Missing</Badge>;
  }
}

function formatBytes(bytes: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function statusToCrit(s: "met" | "fail" | "pending") {
  if (s === "met") return <Badge variant="success">Met</Badge>;
  if (s === "fail") return <Badge variant="danger">Not met</Badge>;
  return <Badge variant="neutral">Pending</Badge>;
}

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : undefined;
  const { hydrated, application, update } = useAdminApplication(id);
  const { adminUser } = useAdminUser();
  const { intakes } = useIntakes();

  const [draft, setDraft] = useState<Application | null>(null);
  const [reviewerNotes, setReviewerNotes] = useState("");
  const [docNoteDrafts, setDocNoteDrafts] = useState<Record<string, string>>({});
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (application) {
      setDraft(application);
      setReviewerNotes(application.reviewerNotes ?? "");
      const notes: Record<string, string> = {};
      for (const d of application.documents) {
        if (d.note) notes[d.type] = d.note;
      }
      setDocNoteDrafts(notes);
      setSavedAt(application.updatedAt ?? null);
    }
  }, [application]);

  if (!hydrated) {
    return (
      <p className="t-sm" style={{ color: "var(--gray-600)" }}>
        Loading application…
      </p>
    );
  }

  if (!application || !draft) {
    return (
      <>
        <StageHeader
          crumbs={[
            { label: "Records office", href: "/admin" },
            { label: "Applications", href: "/admin/applications" },
            { label: "Not found" },
          ]}
          title="Application not found"
          lede={`No application matches reference ${id ?? ""}.`}
        />
        <Link href="/admin/applications" style={{ textDecoration: "none" }}>
          <Button>
            <Icon as={ArrowLeft} />
            Back to list
          </Button>
        </Link>
      </>
    );
  }

  function updateDoc(type: string, patch: Partial<DocumentRecord>) {
    setDraft((prev) =>
      prev
        ? {
            ...prev,
            documents: prev.documents.map((d) =>
              d.type === type ? { ...d, ...patch } : d,
            ),
          }
        : prev,
    );
  }

  function verifyDoc(type: string) {
    updateDoc(type, { status: "verified", note: undefined });
    setDocNoteDrafts((prev) => {
      const next = { ...prev };
      delete next[type];
      return next;
    });
  }
  function rejectDoc(type: string) {
    const note = docNoteDrafts[type]?.trim();
    updateDoc(type, { status: "rejected", note: note || "Document needs to be replaced." });
  }
  function resetDoc(type: string) {
    updateDoc(type, { status: "uploaded", note: undefined });
    setDocNoteDrafts((prev) => {
      const next = { ...prev };
      delete next[type];
      return next;
    });
  }

  function setDecision(d: Decision) {
    setDraft((prev) => (prev ? { ...prev, decision: d } : prev));
  }

  function persist() {
    if (!draft) return;
    const stamped: Application = {
      ...draft,
      reviewerNotes,
      reviewedAt: new Date().toISOString(),
      reviewedBy: adminUser?.email,
    };
    update(stamped);
    setSavedAt(stamped.reviewedAt ?? null);
  }

  const intake = intakes.find((i) => i.id === draft.intakeId) ?? null;
  const eligibility = evaluateEligibility(
    draft.eligibility,
    draft.intakeAcademyStartDate,
  );
  const personal = draft.personal;
  const progress = applicationProgress(draft);
  const docs = draft.documents;
  const fullName = personal.fullName || draft.ownerEmail || draft.applicantId;

  return (
    <>
      <StageHeader
        crumbs={[
          { label: "Records office", href: "/admin" },
          { label: "Applications", href: "/admin/applications" },
          { label: fullName },
        ]}
        title={fullName}
        lede={
          <>
            Reference <span className="t-mono">{draft.applicantId}</span> ·
            applying to{" "}
            <Link
              href={`/admin/intakes/${draft.intakeId}`}
              style={{ color: "var(--navy-600)" }}
            >
              {intake?.name ?? draft.intakeId}
            </Link>{" "}
            · submitted{" "}
            {draft.submittedAt
              ? new Date(draft.submittedAt).toLocaleString()
              : "—"}
          </>
        }
        meta={
          <div style={{ display: "flex", gap: "var(--sp-2)", flexWrap: "wrap" }}>
            <Badge variant={progress.readyToSubmit ? "success" : "warn"}>
              {progress.percent}% complete
            </Badge>
            {decisionBadge(draft.decision)}
          </div>
        }
      />

      <div className="stack-6">
        {/* Decision panel */}
        <Card accent>
          <CardHead>
            <div>
              <CardTitle>Decision</CardTitle>
              <CardSub>
                Select the outcome for this application. Reviewer notes are
                stored alongside the decision for audit.
              </CardSub>
            </div>
            {decisionBadge(draft.decision)}
          </CardHead>
          <div className="btn-row" style={{ marginBottom: "var(--sp-4)" }}>
            <Button
              variant={draft.decision === "offer" ? "gold" : "secondary"}
              onClick={() => setDecision("offer")}
            >
              <Icon as={CheckCircle2} />
              Make offer
            </Button>
            <Button
              variant={draft.decision === "hold" ? "secondary" : "ghost"}
              onClick={() => setDecision("hold")}
            >
              <Icon as={PauseCircle} />
              Place on hold
            </Button>
            <Button
              variant={draft.decision === "reject" ? "danger" : "ghost"}
              onClick={() => setDecision("reject")}
            >
              <Icon as={XCircle} />
              Reject application
            </Button>
            <Button
              variant={draft.decision === "pending" ? "ghost" : "ghost"}
              onClick={() => setDecision("pending")}
            >
              Reset to pending
            </Button>
          </div>
          <Field
            label="Reviewer notes"
            htmlFor="reviewer-notes"
            hint="Visible only inside the records office. Use for context, follow-ups, and audit history."
          >
            <Textarea
              id="reviewer-notes"
              value={reviewerNotes}
              onChange={(e) => setReviewerNotes(e.target.value)}
              placeholder="e.g. Awaiting re-uploaded passport photo before continuing review."
              rows={4}
            />
          </Field>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "var(--sp-4)",
              gap: "var(--sp-3)",
              flexWrap: "wrap",
            }}
          >
            <div className="t-sm" style={{ color: "var(--gray-600)" }}>
              {savedAt
                ? `Last saved ${new Date(savedAt).toLocaleString()}${draft.reviewedBy ? ` · by ${draft.reviewedBy}` : ""}`
                : "Unsaved changes will not appear in the applicant queue until you save."}
            </div>
            <Button onClick={persist}>
              <Icon as={Save} />
              Save changes
            </Button>
          </div>
        </Card>

        {/* Identity */}
        <Card>
          <CardHead>
            <div>
              <CardTitle>Personal details</CardTitle>
              <CardSub>Verify these against the uploaded national ID.</CardSub>
            </div>
            {stageState(draft, "personal").complete ? (
              <Badge variant="success">Complete</Badge>
            ) : (
              <Badge variant="warn">Incomplete</Badge>
            )}
          </CardHead>
          <dl
            style={{
              display: "grid",
              gridTemplateColumns: "max-content 1fr",
              gap: "var(--sp-3) var(--sp-5)",
              margin: 0,
              fontSize: "var(--fs-sm)",
            }}
          >
            <dt style={{ color: "var(--gray-600)" }}>Full legal name</dt>
            <dd style={{ margin: 0, fontWeight: 600 }}>{personal.fullName || "—"}</dd>
            <dt style={{ color: "var(--gray-600)" }}>Preferred name</dt>
            <dd style={{ margin: 0 }}>{personal.preferredName || "—"}</dd>
            <dt style={{ color: "var(--gray-600)" }}>National ID</dt>
            <dd style={{ margin: 0 }} className="mono">
              {personal.nationalId || "—"}
            </dd>
            <dt style={{ color: "var(--gray-600)" }}>Email</dt>
            <dd style={{ margin: 0 }}>{personal.email || draft.ownerEmail || "—"}</dd>
            <dt style={{ color: "var(--gray-600)" }}>Phone</dt>
            <dd style={{ margin: 0 }}>{personal.phone || "—"}</dd>
            <dt style={{ color: "var(--gray-600)" }}>Address</dt>
            <dd style={{ margin: 0 }}>
              {[
                personal.address.street,
                personal.address.city,
                personal.address.region,
                personal.address.postcode,
              ]
                .filter(Boolean)
                .join(", ") || "—"}
            </dd>
          </dl>
        </Card>

        {/* Eligibility */}
        <section>
          <h3
            style={{
              fontSize: "var(--fs-h3)",
              color: "var(--navy-800)",
              fontWeight: 700,
              margin: "0 0 var(--sp-4)",
            }}
          >
            Eligibility self-assessment
          </h3>
          <EligibilityCheck
            title="Eligibility check"
            subtitle="As declared by the applicant — subject to document verification."
            progress={`${eligibility.filter((r) => r.status === "met").length} / ${eligibility.length}`}
            criteria={eligibility.map((r) => ({
              name: r.name,
              detail: r.detail,
              status: r.status,
              badge: statusToCrit(r.status),
            }))}
          />
        </section>

        {/* Education */}
        <Card>
          <CardHead>
            <div>
              <CardTitle>Education</CardTitle>
              <CardSub>{draft.education.length} entr{draft.education.length === 1 ? "y" : "ies"}</CardSub>
            </div>
          </CardHead>
          {draft.education.length === 0 ? (
            <p className="t-sm" style={{ color: "var(--gray-600)", margin: 0 }}>
              No education entries provided.
            </p>
          ) : (
            <TableWrap>
              <Table>
                <thead>
                  <tr>
                    <th>Institution</th>
                    <th>Qualification</th>
                    <th>Years</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {draft.education.map((e) => (
                    <tr key={e.id}>
                      <td>{e.institution || "—"}</td>
                      <td>{e.qualification || "—"}</td>
                      <td className="mono">
                        {e.startYear || "—"} – {e.endYear || "—"}
                      </td>
                      <td>{e.result || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrap>
          )}
        </Card>

        {/* Work history */}
        <Card>
          <CardHead>
            <div>
              <CardTitle>Work history</CardTitle>
              <CardSub>
                {draft.work.length} entr{draft.work.length === 1 ? "y" : "ies"}
              </CardSub>
            </div>
          </CardHead>
          {draft.work.length === 0 ? (
            <p className="t-sm" style={{ color: "var(--gray-600)", margin: 0 }}>
              No work history declared.
            </p>
          ) : (
            <TableWrap>
              <Table>
                <thead>
                  <tr>
                    <th>Employer</th>
                    <th>Role</th>
                    <th>Dates</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {draft.work.map((w) => (
                    <tr key={w.id}>
                      <td>{w.employer || "—"}</td>
                      <td>{w.role || "—"}</td>
                      <td className="mono">
                        {w.startDate || "—"} –{" "}
                        {w.current ? "present" : w.endDate || "—"}
                      </td>
                      <td style={{ color: "var(--gray-700)" }}>{w.description || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrap>
          )}
        </Card>

        {/* Documents — vetting */}
        <section>
          <h3
            style={{
              fontSize: "var(--fs-h3)",
              color: "var(--navy-800)",
              fontWeight: 700,
              margin: "0 0 var(--sp-4)",
            }}
          >
            Documents
          </h3>
          <Alert
            variant="info"
            dismissible={false}
            title="Mark each required document as verified or rejected."
            body="Rejecting a document records a reason that the applicant will see when they re-open their dashboard."
          />
          <div className="stack-3" style={{ marginTop: "var(--sp-5)" }}>
            {docs.map((doc) => (
              <div className="entry-card" key={doc.type}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "44px 1fr auto",
                    gap: "var(--sp-4)",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      background: "var(--navy-50)",
                      color: "var(--navy-700)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "var(--r-xs)",
                    }}
                  >
                    <Icon as={FileText} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--gray-900)" }}>
                      {doc.label}
                    </div>
                    <div
                      className="mono"
                      style={{
                        fontSize: "var(--fs-xs)",
                        color: "var(--gray-600)",
                        marginTop: 2,
                      }}
                    >
                      {doc.status === "missing"
                        ? doc.description
                        : `${doc.filename ?? "—"} · ${formatBytes(doc.sizeBytes)} · uploaded ${doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleString() : "—"}`}
                    </div>
                  </div>
                  {docBadge(doc.status)}
                </div>

                {doc.status !== "missing" && (
                  <div
                    style={{
                      marginTop: "var(--sp-4)",
                      paddingTop: "var(--sp-4)",
                      borderTop: "1px solid var(--gray-100)",
                      display: "grid",
                      gap: "var(--sp-3)",
                    }}
                  >
                    {doc.status === "rejected" && doc.note && (
                      <div className="t-sm" style={{ color: "var(--danger-700)" }}>
                        Reason on file: {doc.note}
                      </div>
                    )}
                    <Field
                      label="Rejection reason (visible to applicant)"
                      htmlFor={`doc-note-${doc.type}`}
                    >
                      <Textarea
                        id={`doc-note-${doc.type}`}
                        rows={2}
                        value={docNoteDrafts[doc.type] ?? ""}
                        onChange={(e) =>
                          setDocNoteDrafts((prev) => ({
                            ...prev,
                            [doc.type]: e.target.value,
                          }))
                        }
                        placeholder="e.g. Image is overexposed — re-upload on a plain background."
                      />
                    </Field>
                    <div className="btn-row" style={{ justifyContent: "flex-end" }}>
                      {doc.status !== "uploaded" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => resetDoc(doc.type)}
                        >
                          Reset
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => rejectDoc(doc.type)}
                      >
                        <Icon as={XCircle} />
                        Reject
                      </Button>
                      <Button size="sm" onClick={() => verifyDoc(doc.type)}>
                        <Icon as={CheckCircle2} />
                        Verify
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Background */}
        <Card>
          <CardHead>
            <div>
              <CardTitle>Background</CardTitle>
              <CardSub>Next-of-kin, references, and declarations.</CardSub>
            </div>
            {stageState(draft, "background").complete ? (
              <Badge variant="success">Complete</Badge>
            ) : (
              <Badge variant="warn">Incomplete</Badge>
            )}
          </CardHead>
          <div className="stack-4">
            <div>
              <div
                className="t-eyebrow"
                style={{ color: "var(--gray-600)", marginBottom: "var(--sp-2)" }}
              >
                Next of kin
              </div>
              <div className="t-sm" style={{ color: "var(--gray-800)" }}>
                <strong>{draft.background.nextOfKin.name || "—"}</strong>{" "}
                ({draft.background.nextOfKin.relationship || "—"}) ·{" "}
                {draft.background.nextOfKin.phone || "—"}
              </div>
            </div>
            <div>
              <div
                className="t-eyebrow"
                style={{ color: "var(--gray-600)", marginBottom: "var(--sp-2)" }}
              >
                References
              </div>
              {draft.background.references.length === 0 ? (
                <p className="t-sm" style={{ color: "var(--gray-600)", margin: 0 }}>
                  No references provided.
                </p>
              ) : (
                <ul
                  style={{
                    paddingLeft: "var(--sp-5)",
                    margin: 0,
                    color: "var(--gray-800)",
                    fontSize: "var(--fs-sm)",
                    lineHeight: "var(--lh-loose)",
                  }}
                >
                  {draft.background.references.map((r) => (
                    <li key={r.id}>
                      <strong>{r.name || "—"}</strong>{" "}
                      ({r.relationship || "—"}, {r.yearsKnown || "?"} yrs known) ·{" "}
                      {r.phone || "—"}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <div
                className="t-eyebrow"
                style={{ color: "var(--gray-600)", marginBottom: "var(--sp-2)" }}
              >
                Declarations
              </div>
              <div className="t-sm" style={{ color: "var(--gray-800)" }}>
                Accuracy: {draft.background.declarations.accurate ? "✓" : "—"} ·
                Consent to checks: {draft.background.declarations.consent ? "✓" : "—"} ·
                Medical assessment: {draft.background.declarations.medical ? "✓" : "—"}
              </div>
            </div>
          </div>
        </Card>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "var(--sp-4)",
            gap: "var(--sp-3)",
            flexWrap: "wrap",
          }}
        >
          <Link href="/admin/applications" style={{ textDecoration: "none" }}>
            <Button variant="ghost">
              <Icon as={ArrowLeft} />
              Back to applications
            </Button>
          </Link>
          <Button onClick={persist}>
            <Icon as={Save} />
            Save all changes
          </Button>
        </div>
      </div>
    </>
  );
}
