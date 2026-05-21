"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  FileText,
  PauseCircle,
  Save,
  ShieldCheck,
  User,
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
  Checkbox,
  Field,
  Icon,
  Input,
  Select,
  Stepper,
  Table,
  TableWrap,
  Textarea,
  type StepItem,
} from "@/components/ui";
import { EligibilityCheck } from "@/components/patterns";
import {
  EMPTY_PIPELINE,
  EXAM_PASS_MARK,
  FITNESS_THRESHOLDS,
  applicationProgress,
  computeExamStatus,
  computeFitnessStatus,
  evaluateEligibility,
  examOverallOutcome,
  fitnessOverallOutcome,
  interviewOverallOutcome,
  preSelectionOutcome,
  selectionOutcome,
  stageState,
  type Application,
  type Decision,
  type DocumentRecord,
  type DocumentStatus,
  type ExamResults,
  type FinalRecommendation,
  type FitnessTestResults,
  type InterviewRating,
  type InterviewResults,
  type Pipeline,
  type PipelineStage,
  type PreSelectionCheck,
  type StageOutcome,
} from "@/lib/application";
import { useAdminApplication, useAdminUser, useIntakes } from "@/lib/use-application";

function decisionBadge(d: Decision | undefined) {
  switch (d) {
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

function outcomeBadge(o: StageOutcome) {
  switch (o) {
    case "passed":
      return <Badge variant="success">Passed</Badge>;
    case "failed":
      return <Badge variant="danger">Failed</Badge>;
    case "onHold":
      return <Badge variant="warn">On hold</Badge>;
    default:
      return <Badge variant="neutral">Pending</Badge>;
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

const PIPELINE_STAGE_META: { key: PipelineStage; label: string }[] = [
  { key: "received", label: "Received" },
  { key: "preSelection", label: "Pre-selection" },
  { key: "selection", label: "Selection" },
  { key: "final", label: "Final" },
  { key: "closed", label: "Closed" },
];

function formatRunTime(seconds: number | null): string {
  if (seconds === null) return "";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function parseRunTime(input: string): number | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const match = trimmed.match(/^(\d+):([0-5]?\d)$/);
  if (match) return parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
  const n = Number(trimmed);
  if (Number.isFinite(n) && n > 0) return Math.round(n);
  return null;
}

const sectionHeading = {
  fontSize: "var(--fs-h3)",
  color: "var(--navy-800)",
  fontWeight: 700,
  margin: "0 0 var(--sp-4)",
} as const;

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--sp-2)",
        padding: "var(--sp-2) var(--sp-4)",
        borderRadius: "var(--r-xs)",
        background: active ? "var(--white)" : "transparent",
        border: 0,
        cursor: "pointer",
        color: active ? "var(--navy-800)" : "var(--gray-700)",
        fontWeight: active ? 600 : 500,
        fontSize: "var(--fs-sm)",
        boxShadow: active ? "var(--shadow-sm)" : "none",
        transition: "background 0.15s, color 0.15s, box-shadow 0.15s",
      }}
    >
      <Icon as={icon} />
      {label}
    </button>
  );
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
  const [tab, setTab] = useState<"submission" | "pipeline">("submission");

  useEffect(() => {
    if (application) {
      setDraft({
        ...application,
        pipeline: application.pipeline ?? { ...EMPTY_PIPELINE },
      });
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

  const pipeline: Pipeline = draft.pipeline ?? { ...EMPTY_PIPELINE };

  function updatePipeline(next: Pipeline) {
    setDraft((prev) => (prev ? { ...prev, pipeline: next } : prev));
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

  function setDecision(d: Decision | undefined) {
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
  const eligibility = evaluateEligibility(draft.eligibility);
  const personal = draft.personal;
  const progress = applicationProgress(draft);
  const docs = draft.documents;
  const fullName = personal.fullName || draft.ownerEmail || draft.applicantId;

  const completenessDone =
    pipeline.received.allDocsPresent && pipeline.received.panelAcknowledged;
  const preSelectOutcome = preSelectionOutcome(pipeline.preSelection);
  const examOutcome = examOverallOutcome(pipeline.selection.exam);
  const fitnessOutcome = fitnessOverallOutcome(pipeline.selection.fitness);
  const interviewOutcome = interviewOverallOutcome(pipeline.selection.interview);
  const overallSelection = selectionOutcome(pipeline.selection);

  const stepperSteps: StepItem[] = PIPELINE_STAGE_META.slice(0, 4).map((meta) => {
    let status: StepItem["status"] = "todo";
    if (meta.key === pipeline.currentStage) status = "current";
    else {
      const idx = PIPELINE_STAGE_META.findIndex((m) => m.key === meta.key);
      const cur = PIPELINE_STAGE_META.findIndex((m) => m.key === pipeline.currentStage);
      if (idx < cur) status = "done";
    }
    let sub = "";
    if (meta.key === "received") sub = completenessDone ? "Complete" : "In progress";
    if (meta.key === "preSelection") sub = outcomeLabel(preSelectOutcome);
    if (meta.key === "selection") sub = outcomeLabel(overallSelection);
    if (meta.key === "final") sub = pipeline.final.commissionerApproved ? "Approved" : "Pending";
    return { name: meta.label, sub, status };
  });

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
              {progress.percent}% submitted
            </Badge>
            {decisionBadge(draft.decision)}
          </div>
        }
      />

      <nav
        role="tablist"
        aria-label="Application sections"
        style={{
          display: "inline-flex",
          gap: "var(--sp-1)",
          padding: "var(--sp-1)",
          background: "var(--gray-50)",
          border: "1px solid var(--gray-200)",
          borderRadius: "var(--r-sm)",
          margin: "0 0 var(--sp-5)",
        }}
      >
        <TabButton
          active={tab === "submission"}
          onClick={() => setTab("submission")}
          icon={User}
          label="Applicant submission"
        />
        <TabButton
          active={tab === "pipeline"}
          onClick={() => setTab("pipeline")}
          icon={ClipboardList}
          label="Pipeline review"
        />
      </nav>

      <div className="stack-6">
        {tab === "pipeline" && (
          <>
        <section>
          <h3 style={sectionHeading}>Recruitment pipeline</h3>
          <Stepper steps={stepperSteps} />
          <div style={{ marginTop: "var(--sp-4)" }}>
            <Field
              label="Current stage"
              htmlFor="cur-stage"
              hint="Move the application forward as each stage completes."
            >
              <Select
                id="cur-stage"
                value={pipeline.currentStage}
                onChange={(e) =>
                  updatePipeline({
                    ...pipeline,
                    currentStage: e.target.value as PipelineStage,
                  })
                }
              >
                {PIPELINE_STAGE_META.map((m) => (
                  <option key={m.key} value={m.key}>
                    {m.label}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
        </section>

        <ReceivedStageCard
          pipeline={pipeline}
          updatePipeline={updatePipeline}
          docsSummary={docsSummary(docs)}
        />

        <PreSelectionStageCard
          pipeline={pipeline}
          updatePipeline={updatePipeline}
          outcome={preSelectOutcome}
        />

        <SelectionStageCard
          pipeline={pipeline}
          updatePipeline={updatePipeline}
          gender={personal.gender}
          examOutcome={examOutcome}
          fitnessOutcome={fitnessOutcome}
          interviewOutcome={interviewOutcome}
        />

        <FinalStageCard
          pipeline={pipeline}
          updatePipeline={updatePipeline}
          decision={draft.decision}
          setDecision={setDecision}
        />

        {/* Reviewer notes */}
        <Card>
          <CardHead>
            <div>
              <CardTitle>Reviewer notes</CardTitle>
              <CardSub>
                Internal notes visible only inside the records office.
              </CardSub>
            </div>
          </CardHead>
          <Field label="Notes" htmlFor="reviewer-notes">
            <Textarea
              id="reviewer-notes"
              value={reviewerNotes}
              onChange={(e) => setReviewerNotes(e.target.value)}
              placeholder="Context, follow-ups, audit history."
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
              Save all changes
            </Button>
          </div>
        </Card>
          </>
        )}

        {tab === "submission" && (
          <>
            <PersonalDetailsCard draft={draft} />

            <section>
              <h3 style={sectionHeading}>Eligibility self-assessment</h3>
              <EligibilityCheck
                title="Eligibility check"
                subtitle="As declared by the applicant — verified during pre-selection."
                progress={`${eligibility.filter((r) => r.status === "met").length} / ${eligibility.length}`}
                criteria={eligibility.map((r) => ({
                  name: r.name,
                  detail: r.detail,
                  status: r.status,
                  badge: statusToCrit(r.status),
                }))}
              />
            </section>

            <EducationCard draft={draft} />
            <WorkCard draft={draft} />
            <DisclosuresCard draft={draft} />
            <StatementsCard draft={draft} />

            {/* Documents — vetting */}
            <section>
              <h3 style={sectionHeading}>Documents</h3>
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

            <BackgroundCard draft={draft} />
          </>
        )}

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

function outcomeLabel(o: StageOutcome): string {
  if (o === "passed") return "Passed";
  if (o === "failed") return "Failed";
  if (o === "onHold") return "On hold";
  return "Pending";
}

function docsSummary(docs: DocumentRecord[]): string {
  const required = docs.filter((d) => d.required);
  const verified = required.filter((d) => d.status === "verified").length;
  const rejected = required.filter((d) => d.status === "rejected").length;
  const uploaded = required.filter((d) => d.status === "uploaded").length;
  if (rejected > 0) return `${rejected} rejected, ${verified}/${required.length} verified`;
  if (verified === required.length) return "All required documents verified";
  if (uploaded + verified === required.length)
    return `${verified}/${required.length} verified, rest awaiting check`;
  return `${verified + uploaded}/${required.length} uploaded`;
}

/* ============================================================
   Stage 1 — Received
   ============================================================ */

function ReceivedStageCard({
  pipeline,
  updatePipeline,
  docsSummary,
}: {
  pipeline: Pipeline;
  updatePipeline: (p: Pipeline) => void;
  docsSummary: string;
}) {
  const r = pipeline.received;
  return (
    <Card accent>
      <CardHead>
        <div>
          <CardTitle>Stage 1 — Received</CardTitle>
          <CardSub>
            Director HR routes the package to the Recruitment Panel. Confirm
            the package is complete before moving on.
          </CardSub>
        </div>
        {r.allDocsPresent && r.panelAcknowledged ? (
          <Badge variant="success">Complete</Badge>
        ) : (
          <Badge variant="warn">In progress</Badge>
        )}
      </CardHead>
      <div className="stack-3">
        <div className="t-sm" style={{ color: "var(--gray-700)" }}>
          <strong>Documents:</strong> {docsSummary}
        </div>
        <Checkbox
          checked={r.allDocsPresent}
          onChange={(e) =>
            updatePipeline({
              ...pipeline,
              received: { ...r, allDocsPresent: e.target.checked },
            })
          }
          label="All required documents present and legible."
        />
        <Checkbox
          checked={r.panelAcknowledged}
          onChange={(e) =>
            updatePipeline({
              ...pipeline,
              received: { ...r, panelAcknowledged: e.target.checked },
            })
          }
          label="Recruitment Panel has acknowledged receipt."
        />
        <Field label="Notes" htmlFor="rec-notes">
          <Textarea
            id="rec-notes"
            value={r.notes}
            onChange={(e) =>
              updatePipeline({
                ...pipeline,
                received: { ...r, notes: e.target.value },
              })
            }
            rows={2}
            placeholder="e.g. Package received via portal; one document needs re-upload."
          />
        </Field>
      </div>
    </Card>
  );
}

/* ============================================================
   Stage 2 — Pre-selection
   ============================================================ */

const PRESELECTION_CRITERIA: {
  key: keyof PreSelectionCheck;
  label: string;
}[] = [
  { key: "citizenship", label: "Citizen or permanent resident verified" },
  { key: "criminalRecord", label: "Criminal record check clear" },
  { key: "formFive", label: "Form 5 certificate verified" },
  { key: "medical", label: "Medical Fitness Form (Part B) accepted" },
  { key: "physical", label: "Cleared to attempt the Entry Fitness Test" },
];

function PreSelectionStageCard({
  pipeline,
  updatePipeline,
  outcome,
}: {
  pipeline: Pipeline;
  updatePipeline: (p: Pipeline) => void;
  outcome: StageOutcome;
}) {
  const ps = pipeline.preSelection;
  function setCriterion(key: keyof PreSelectionCheck, value: StageOutcome) {
    updatePipeline({
      ...pipeline,
      preSelection: { ...ps, [key]: value },
    });
  }
  return (
    <Card accent>
      <CardHead>
        <div>
          <CardTitle>Stage 2 — Pre-selection</CardTitle>
          <CardSub>
            Verify the five RSIPF pre-selection requirements and contact at
            least two referees before shortlisting.
          </CardSub>
        </div>
        {outcomeBadge(outcome)}
      </CardHead>
      <div className="stack-4">
        {PRESELECTION_CRITERIA.map((c) => (
          <div
            key={c.key}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              gap: "var(--sp-4)",
            }}
          >
            <div className="t-sm" style={{ color: "var(--gray-900)" }}>
              {c.label}
            </div>
            <Select
              value={ps[c.key] as StageOutcome}
              onChange={(e) =>
                setCriterion(c.key, e.target.value as StageOutcome)
              }
              style={{ minWidth: 160 }}
            >
              <option value="pending">Pending</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
              <option value="onHold">On hold</option>
            </Select>
          </div>
        ))}
        <Checkbox
          checked={ps.refereesContacted}
          onChange={(e) =>
            updatePipeline({
              ...pipeline,
              preSelection: { ...ps, refereesContacted: e.target.checked },
            })
          }
          label="At least two referees contacted and responded."
        />
        <Field label="Panel notes" htmlFor="ps-notes">
          <Textarea
            id="ps-notes"
            value={ps.notes}
            onChange={(e) =>
              updatePipeline({
                ...pipeline,
                preSelection: { ...ps, notes: e.target.value },
              })
            }
            rows={3}
            placeholder="Background-check summary, referee responses, anything that influenced the verdict."
          />
        </Field>
      </div>
    </Card>
  );
}

/* ============================================================
   Stage 3 — Selection (exam + fitness + interview)
   ============================================================ */

const EXAM_PARTS: { key: keyof ExamResults; label: string }[] = [
  { key: "dictation", label: "Dictation" },
  { key: "mathematics", label: "Mathematics" },
  { key: "generalKnowledge", label: "General knowledge" },
  { key: "readingComprehension", label: "Reading & comprehension" },
  { key: "essay", label: "Essay (600 words)" },
];

const INTERVIEW_RUBRICS: { key: keyof InterviewResults; label: string }[] = [
  { key: "goodCharacter", label: "Good character" },
  { key: "learning", label: "Learning" },
  { key: "teamMember", label: "Team member" },
  { key: "thinkingSkills", label: "Thinking skills" },
  { key: "communication", label: "Communication" },
];

function SelectionStageCard({
  pipeline,
  updatePipeline,
  gender,
  examOutcome,
  fitnessOutcome,
  interviewOutcome,
}: {
  pipeline: Pipeline;
  updatePipeline: (p: Pipeline) => void;
  gender: "male" | "female" | null;
  examOutcome: StageOutcome;
  fitnessOutcome: StageOutcome;
  interviewOutcome: StageOutcome;
}) {
  const sel = pipeline.selection;
  const overall = selectionOutcome(sel);

  return (
    <Card accent>
      <CardHead>
        <div>
          <CardTitle>Stage 3 — Selection</CardTitle>
          <CardSub>
            Entrance examination, Entry Fitness Test, and Selection Interview.
            Every part must pass.
          </CardSub>
        </div>
        {outcomeBadge(overall)}
      </CardHead>
      <div className="stack-6">
        {/* Exam */}
        <section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "var(--sp-3)",
            }}
          >
            <h4 style={{ margin: 0 }}>
              Entrance examination ·{" "}
              <span style={{ color: "var(--gray-600)", fontWeight: 400 }}>
                pass mark {EXAM_PASS_MARK}% per part
              </span>
            </h4>
            {outcomeBadge(examOutcome)}
          </div>
          <Field label="Exam date" htmlFor="exam-date">
            <Input
              id="exam-date"
              type="date"
              value={sel.exam.date}
              onChange={(e) =>
                updatePipeline({
                  ...pipeline,
                  selection: {
                    ...sel,
                    exam: { ...sel.exam, date: e.target.value },
                  },
                })
              }
            />
          </Field>
          <div className="stack-3" style={{ marginTop: "var(--sp-3)" }}>
            {EXAM_PARTS.map((p) => {
              const part = sel.exam[p.key] as { score: number | null; status: StageOutcome };
              return (
                <div
                  key={p.key}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 120px 110px",
                    gap: "var(--sp-3)",
                    alignItems: "center",
                  }}
                >
                  <div className="t-sm">{p.label}</div>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="0–100"
                    value={part.score ?? ""}
                    onChange={(e) => {
                      const score = e.target.value === "" ? null : Number(e.target.value);
                      const next: ExamResults = {
                        ...sel.exam,
                        [p.key]: { score, status: computeExamStatus(score) },
                      };
                      updatePipeline({
                        ...pipeline,
                        selection: { ...sel, exam: next },
                      });
                    }}
                  />
                  {outcomeBadge(part.status)}
                </div>
              );
            })}
          </div>
        </section>

        {/* Fitness */}
        <section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "var(--sp-3)",
            }}
          >
            <h4 style={{ margin: 0 }}>Entry Fitness Test</h4>
            {outcomeBadge(fitnessOutcome)}
          </div>
          {!gender ? (
            <Alert
              variant="warn"
              dismissible={false}
              title="Gender required for fitness thresholds."
              body="Set gender on the applicant's personal particulars page — thresholds differ for men and women."
            />
          ) : (
            <p
              className="t-sm"
              style={{ color: "var(--gray-700)", marginBottom: "var(--sp-3)" }}
            >
              Thresholds applied: 2.4 km run ≤{" "}
              {Math.floor(FITNESS_THRESHOLDS[gender].runSeconds / 60)}:00,
              push-ups ≥ {FITNESS_THRESHOLDS[gender].pushUps}, sit-ups ≥{" "}
              {FITNESS_THRESHOLDS[gender].sitUps}.
            </p>
          )}
          <Field label="Test date" htmlFor="fit-date">
            <Input
              id="fit-date"
              type="date"
              value={sel.fitness.date}
              onChange={(e) =>
                updatePipeline({
                  ...pipeline,
                  selection: {
                    ...sel,
                    fitness: { ...sel.fitness, date: e.target.value },
                  },
                })
              }
            />
          </Field>
          <div className="stack-3" style={{ marginTop: "var(--sp-3)" }}>
            <FitnessRow
              label="2.4 km run (mm:ss)"
              value={formatRunTime(sel.fitness.run.raw)}
              status={sel.fitness.run.status}
              onChange={(v) => {
                const raw = parseRunTime(v);
                const next: FitnessTestResults = {
                  ...sel.fitness,
                  run: { raw, status: computeFitnessStatus("run", raw, gender) },
                };
                updatePipeline({
                  ...pipeline,
                  selection: { ...sel, fitness: next },
                });
              }}
            />
            <FitnessRow
              label="Push-ups (count)"
              value={sel.fitness.pushUps.raw === null ? "" : String(sel.fitness.pushUps.raw)}
              status={sel.fitness.pushUps.status}
              onChange={(v) => {
                const raw = v.trim() === "" ? null : Number(v);
                const next: FitnessTestResults = {
                  ...sel.fitness,
                  pushUps: {
                    raw,
                    status: computeFitnessStatus("pushUps", raw, gender),
                  },
                };
                updatePipeline({
                  ...pipeline,
                  selection: { ...sel, fitness: next },
                });
              }}
            />
            <FitnessRow
              label="Sit-ups (count)"
              value={sel.fitness.sitUps.raw === null ? "" : String(sel.fitness.sitUps.raw)}
              status={sel.fitness.sitUps.status}
              onChange={(v) => {
                const raw = v.trim() === "" ? null : Number(v);
                const next: FitnessTestResults = {
                  ...sel.fitness,
                  sitUps: {
                    raw,
                    status: computeFitnessStatus("sitUps", raw, gender),
                  },
                };
                updatePipeline({
                  ...pipeline,
                  selection: { ...sel, fitness: next },
                });
              }}
            />
            <Field label="Test notes" htmlFor="fit-notes">
              <Textarea
                id="fit-notes"
                value={sel.fitness.note}
                onChange={(e) =>
                  updatePipeline({
                    ...pipeline,
                    selection: {
                      ...sel,
                      fitness: { ...sel.fitness, note: e.target.value },
                    },
                  })
                }
                rows={2}
                placeholder="Conditions, any injuries declared, etc."
              />
            </Field>
          </div>
        </section>

        {/* Interview */}
        <section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "var(--sp-3)",
            }}
          >
            <h4 style={{ margin: 0 }}>
              Selection interview ·{" "}
              <span style={{ color: "var(--gray-600)", fontWeight: 400 }}>
                rate each rubric 1–5 (≥3 passes)
              </span>
            </h4>
            {outcomeBadge(interviewOutcome)}
          </div>
          <Field label="Interview date" htmlFor="int-date">
            <Input
              id="int-date"
              type="date"
              value={sel.interview.date}
              onChange={(e) =>
                updatePipeline({
                  ...pipeline,
                  selection: {
                    ...sel,
                    interview: { ...sel.interview, date: e.target.value },
                  },
                })
              }
            />
          </Field>
          <div className="stack-4" style={{ marginTop: "var(--sp-3)" }}>
            {INTERVIEW_RUBRICS.map((r) => {
              const score = sel.interview[r.key] as { rating: InterviewRating | null; comments: string };
              return (
                <div key={r.key} className="entry-card">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 120px",
                      gap: "var(--sp-3)",
                      alignItems: "center",
                      marginBottom: "var(--sp-3)",
                    }}
                  >
                    <strong>{r.label}</strong>
                    <Select
                      value={score.rating === null ? "" : String(score.rating)}
                      onChange={(e) => {
                        const v = e.target.value;
                        const rating: InterviewRating | null =
                          v === "" ? null : (Number(v) as InterviewRating);
                        const nextInterview: InterviewResults = {
                          ...sel.interview,
                          [r.key]: { ...score, rating },
                        };
                        updatePipeline({
                          ...pipeline,
                          selection: { ...sel, interview: nextInterview },
                        });
                      }}
                    >
                      <option value="">Unrated</option>
                      <option value="1">1 — Poor</option>
                      <option value="2">2 — Weak</option>
                      <option value="3">3 — Adequate</option>
                      <option value="4">4 — Strong</option>
                      <option value="5">5 — Excellent</option>
                    </Select>
                  </div>
                  <Textarea
                    rows={2}
                    placeholder="Comments — what the candidate said, examples given, concerns."
                    value={score.comments}
                    onChange={(e) => {
                      const nextInterview: InterviewResults = {
                        ...sel.interview,
                        [r.key]: { ...score, comments: e.target.value },
                      };
                      updatePipeline({
                        ...pipeline,
                        selection: { ...sel, interview: nextInterview },
                      });
                    }}
                  />
                </div>
              );
            })}
            <Field label="Panel notes" htmlFor="int-notes">
              <Textarea
                id="int-notes"
                value={sel.interview.panelNotes}
                onChange={(e) =>
                  updatePipeline({
                    ...pipeline,
                    selection: {
                      ...sel,
                      interview: {
                        ...sel.interview,
                        panelNotes: e.target.value,
                      },
                    },
                  })
                }
                rows={3}
                placeholder="Overall panel impression, dissenting views, recommendations."
              />
            </Field>
          </div>
        </section>
      </div>
    </Card>
  );
}

function FitnessRow({
  label,
  value,
  status,
  onChange,
}: {
  label: string;
  value: string;
  status: StageOutcome;
  onChange: (v: string) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 160px 110px",
        gap: "var(--sp-3)",
        alignItems: "center",
      }}
    >
      <div className="t-sm">{label}</div>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
      {outcomeBadge(status)}
    </div>
  );
}

/* ============================================================
   Stage 4 — Final decision
   ============================================================ */

function FinalStageCard({
  pipeline,
  updatePipeline,
  decision,
  setDecision,
}: {
  pipeline: Pipeline;
  updatePipeline: (p: Pipeline) => void;
  decision: Decision | undefined;
  setDecision: (d: Decision | undefined) => void;
}) {
  const f = pipeline.final;

  function setRec(rec: FinalRecommendation) {
    updatePipeline({ ...pipeline, final: { ...f, recommendation: rec } });
    if (rec === "select" && f.commissionerApproved) setDecision("selected");
    else if (rec === "select") setDecision("shortlisted");
    else if (rec === "notSelect") setDecision("notSelected");
    else if (rec === "onHold") setDecision("onHold");
    else setDecision(undefined);
  }

  function toggleCommissioner(approved: boolean) {
    updatePipeline({
      ...pipeline,
      final: {
        ...f,
        commissionerApproved: approved,
        notifiedAt: approved && !f.notifiedAt ? new Date().toISOString() : f.notifiedAt,
      },
    });
    if (approved && f.recommendation === "select") setDecision("selected");
  }

  return (
    <Card accent>
      <CardHead>
        <div>
          <CardTitle>Stage 4 — Final selection</CardTitle>
          <CardSub>
            Selection Interview Panel files the Final Selection Report;
            Director Learning &amp; Development receives it; Commissioner
            approves before Director HR notifies the applicant.
          </CardSub>
        </div>
        {decisionBadge(decision)}
      </CardHead>
      <div className="stack-4">
        <div className="btn-row">
          <Button
            variant={f.recommendation === "select" ? "gold" : "secondary"}
            onClick={() => setRec("select")}
          >
            <Icon as={CheckCircle2} />
            Recommend select
          </Button>
          <Button
            variant={f.recommendation === "onHold" ? "secondary" : "ghost"}
            onClick={() => setRec("onHold")}
          >
            <Icon as={PauseCircle} />
            Hold for next intake
          </Button>
          <Button
            variant={f.recommendation === "notSelect" ? "danger" : "ghost"}
            onClick={() => setRec("notSelect")}
          >
            <Icon as={XCircle} />
            Not selected
          </Button>
          {f.recommendation && (
            <Button variant="ghost" onClick={() => setRec(null)}>
              Reset
            </Button>
          )}
        </div>

        <Field
          label="Final Selection Report"
          htmlFor="final-report"
          hint="Written summary submitted to the Director, Learning & Development."
        >
          <Textarea
            id="final-report"
            value={f.finalReport}
            onChange={(e) =>
              updatePipeline({
                ...pipeline,
                final: { ...f, finalReport: e.target.value },
              })
            }
            rows={4}
            placeholder="Summary of every stage, why the candidate is recommended (or not)."
          />
        </Field>

        <div
          style={{
            border: "1px solid var(--gray-200)",
            borderRadius: "var(--r-sm)",
            padding: "var(--sp-4)",
            background: f.commissionerApproved
              ? "var(--success-50)"
              : "var(--white)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "var(--sp-3)",
              flexWrap: "wrap",
            }}
          >
            <div>
              <strong style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)" }}>
                <Icon as={ShieldCheck} />
                Commissioner approval
              </strong>
              <p className="t-sm" style={{ color: "var(--gray-700)", margin: "var(--sp-2) 0 0" }}>
                Required before successful applicants are announced via the
                Solomon Star and SIBC.
              </p>
            </div>
            <Checkbox
              checked={f.commissionerApproved}
              onChange={(e) => toggleCommissioner(e.target.checked)}
              label="Approved by Commissioner of Police"
            />
          </div>
          {f.notifiedAt && (
            <div
              className="t-sm"
              style={{ color: "var(--gray-700)", marginTop: "var(--sp-3)" }}
            >
              Notified {new Date(f.notifiedAt).toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

/* ============================================================
   Read-only context cards
   ============================================================ */

function PersonalDetailsCard({ draft }: { draft: Application }) {
  const p = draft.personal;
  return (
    <Card>
      <CardHead>
        <div>
          <CardTitle>Personal particulars</CardTitle>
          <CardSub>Verify against the uploaded birth certificate or passport.</CardSub>
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
        <dd style={{ margin: 0, fontWeight: 600 }}>{p.fullName || "—"}</dd>
        {p.secondName && (
          <>
            <dt style={{ color: "var(--gray-600)" }}>Second name</dt>
            <dd style={{ margin: 0 }}>{p.secondName}</dd>
          </>
        )}
        <dt style={{ color: "var(--gray-600)" }}>Date of birth</dt>
        <dd style={{ margin: 0 }}>{p.dob || "—"}</dd>
        <dt style={{ color: "var(--gray-600)" }}>Gender</dt>
        <dd style={{ margin: 0 }}>{p.gender ?? "—"}</dd>
        <dt style={{ color: "var(--gray-600)" }}>Birth place</dt>
        <dd style={{ margin: 0 }}>{p.birthPlace || "—"}</dd>
        <dt style={{ color: "var(--gray-600)" }}>Province of origin</dt>
        <dd style={{ margin: 0 }}>{p.provinceOfOrigin || "—"}</dd>
        {p.provinceOfBirth && p.provinceOfBirth !== p.provinceOfOrigin && (
          <>
            <dt style={{ color: "var(--gray-600)" }}>Province of birth</dt>
            <dd style={{ margin: 0 }}>{p.provinceOfBirth}</dd>
          </>
        )}
        <dt style={{ color: "var(--gray-600)" }}>Religion</dt>
        <dd style={{ margin: 0 }}>{p.religion || "—"}</dd>
        <dt style={{ color: "var(--gray-600)" }}>Email</dt>
        <dd style={{ margin: 0 }}>{p.email || draft.ownerEmail || "—"}</dd>
        <dt style={{ color: "var(--gray-600)" }}>Phone</dt>
        <dd style={{ margin: 0 }}>{p.phone || "—"}</dd>
        <dt style={{ color: "var(--gray-600)" }}>Home address</dt>
        <dd style={{ margin: 0 }}>
          {[p.address.street, p.address.city, p.address.region]
            .filter(Boolean)
            .join(", ") || "—"}
        </dd>
        {!p.postalSameAsHome && (
          <>
            <dt style={{ color: "var(--gray-600)" }}>Postal address</dt>
            <dd style={{ margin: 0 }}>
              {[p.postalAddress.street, p.postalAddress.city, p.postalAddress.region]
                .filter(Boolean)
                .join(", ") || "—"}
            </dd>
          </>
        )}
        <dt style={{ color: "var(--gray-600)" }}>Driver&apos;s licence</dt>
        <dd style={{ margin: 0 }}>
          {p.driverLicence.hasLicence === null
            ? "—"
            : p.driverLicence.hasLicence
              ? `${p.driverLicence.number || "?"} · Class ${p.driverLicence.classes || "?"} · expires ${p.driverLicence.expiry || "?"}`
              : "None"}
        </dd>
        {p.marks && (
          <>
            <dt style={{ color: "var(--gray-600)" }}>Marks</dt>
            <dd style={{ margin: 0 }}>{p.marks}</dd>
          </>
        )}
      </dl>
    </Card>
  );
}

function EducationCard({ draft }: { draft: Application }) {
  return (
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
  );
}

function WorkCard({ draft }: { draft: Application }) {
  return (
    <Card>
      <CardHead>
        <div>
          <CardTitle>Employment</CardTitle>
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
                <th>Type</th>
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
                  <td>{w.paymentType || "—"}</td>
                  <td style={{ color: "var(--gray-700)" }}>{w.description || "—"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      )}
    </Card>
  );
}

function DisclosuresCard({ draft }: { draft: Application }) {
  const d = draft.disclosures;
  const s = draft.serviceHistory;
  const rows: { label: string; value: boolean | null }[] = [
    { label: "Applied to RSIPF before", value: s.previousApplication },
    { label: "Previously a police officer", value: s.previouslyPoliceOfficer },
    { label: "Ever interviewed/questioned re criminal offence", value: d.everInterviewedForOffence },
    { label: "Currently in criminal activity", value: d.currentlyInCriminalActivity },
    { label: "Ever convicted of any criminal offence", value: d.everConvictedCriminal },
    { label: "Ever convicted of any other offence", value: d.everConvictedOther },
    { label: "Ever appeared in court with 'No Conviction'", value: d.noConvictionRecorded },
    { label: "Warrant ever issued", value: d.warrantEverIssued },
  ];
  return (
    <Card>
      <CardHead>
        <div>
          <CardTitle>Service history & disclosures</CardTitle>
          <CardSub>Self-declared. Verified during pre-selection.</CardSub>
        </div>
      </CardHead>
      <dl
        style={{
          display: "grid",
          gridTemplateColumns: "1fr max-content",
          gap: "var(--sp-2) var(--sp-5)",
          margin: 0,
          fontSize: "var(--fs-sm)",
        }}
      >
        {rows.map((r) => (
          <span key={r.label} style={{ display: "contents" }}>
            <dt style={{ color: "var(--gray-700)" }}>{r.label}</dt>
            <dd style={{ margin: 0 }}>
              {r.value === null ? "—" : r.value ? "Yes" : "No"}
            </dd>
          </span>
        ))}
      </dl>
      {d.details && (
        <div style={{ marginTop: "var(--sp-3)" }}>
          <div
            className="t-eyebrow"
            style={{ color: "var(--gray-600)", marginBottom: "var(--sp-2)" }}
          >
            Details
          </div>
          <div className="t-sm" style={{ color: "var(--gray-800)", whiteSpace: "pre-wrap" }}>
            {d.details}
          </div>
        </div>
      )}
    </Card>
  );
}

function StatementsCard({ draft }: { draft: Application }) {
  const s = draft.statements;
  return (
    <Card>
      <CardHead>
        <div>
          <CardTitle>Personal statements</CardTitle>
          <CardSub>About yourself, and reason for joining the RSIPF.</CardSub>
        </div>
      </CardHead>
      <div className="stack-4">
        <div>
          <div
            className="t-eyebrow"
            style={{ color: "var(--gray-600)", marginBottom: "var(--sp-2)" }}
          >
            About yourself
          </div>
          <div
            className="t-sm"
            style={{ color: "var(--gray-800)", whiteSpace: "pre-wrap" }}
          >
            {s.personalStatement || "—"}
          </div>
        </div>
        <div>
          <div
            className="t-eyebrow"
            style={{ color: "var(--gray-600)", marginBottom: "var(--sp-2)" }}
          >
            Reason for applying
          </div>
          <div
            className="t-sm"
            style={{ color: "var(--gray-800)", whiteSpace: "pre-wrap" }}
          >
            {s.reasonForJoining || "—"}
          </div>
        </div>
      </div>
    </Card>
  );
}

function BackgroundCard({ draft }: { draft: Application }) {
  return (
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
          {draft.background.nextOfKin.address && (
            <div className="t-sm" style={{ color: "var(--gray-700)" }}>
              {draft.background.nextOfKin.address}
            </div>
          )}
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
  );
}
