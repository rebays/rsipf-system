"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  PauseCircle,
  Save,
  Trash2,
} from "lucide-react";

import { StageHeader } from "@/components/dashboard";
import { IntakeForm, intakeIsValid } from "@/components/admin/IntakeForm";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardHead,
  CardSub,
  CardTitle,
  Icon,
} from "@/components/ui";
import type { Intake, IntakeStatus } from "@/lib/application";
import {
  useAdminApplications,
  useAdminUser,
  useIntake,
  useIntakes,
} from "@/lib/use-application";

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

export default function EditIntakePage() {
  const params = useParams();
  const router = useRouter();
  const id =
    typeof params?.id === "string"
      ? params.id
      : Array.isArray(params?.id)
        ? params.id[0]
        : undefined;
  const { hydrated, intake } = useIntake(id);
  const { save, remove } = useIntakes();
  const { applications } = useAdminApplications();
  const { adminUser } = useAdminUser();

  const [draft, setDraft] = useState<Intake | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (intake) {
      setDraft(intake);
      setSavedAt(intake.updatedAt);
    }
  }, [intake]);

  if (!hydrated) {
    return (
      <p className="t-sm" style={{ color: "var(--gray-600)" }}>
        Loading intake…
      </p>
    );
  }

  if (!intake || !draft) {
    return (
      <>
        <StageHeader
          crumbs={[
            { label: "Records office", href: "/admin" },
            { label: "Intakes", href: "/admin/intakes" },
            { label: "Not found" },
          ]}
          title="Intake not found"
          lede={`No intake matches code ${id ?? ""}.`}
        />
        <Link href="/admin/intakes" style={{ textDecoration: "none" }}>
          <Button>
            <Icon as={ArrowLeft} />
            Back to intakes
          </Button>
        </Link>
      </>
    );
  }

  const linked = applications.filter((a) => a.intakeId === draft.id);
  const offers = linked.filter((a) => a.decision === "offer").length;

  function setStatus(status: IntakeStatus) {
    setDraft((prev) => (prev ? { ...prev, status } : prev));
  }

  function handleSave() {
    if (!draft) return;
    if (!intakeIsValid(draft)) {
      setError(
        "Fill in code, name, and all three dates. Code must be uppercase letters, digits, or hyphens.",
      );
      return;
    }
    setError(null);
    save({ ...draft, createdBy: draft.createdBy ?? adminUser?.email });
    setSavedAt(new Date().toISOString());
  }

  function handleDelete() {
    if (!draft) return;
    if (linked.length > 0) {
      setError(
        `Cannot delete — ${linked.length} application(s) are linked to this intake.`,
      );
      return;
    }
    if (
      typeof window !== "undefined" &&
      !window.confirm(`Delete intake ${draft.id}? This cannot be undone.`)
    ) {
      return;
    }
    remove(draft.id);
    router.push("/admin/intakes");
  }

  return (
    <>
      <StageHeader
        crumbs={[
          { label: "Records office", href: "/admin" },
          { label: "Intakes", href: "/admin/intakes" },
          { label: draft.name || draft.id },
        ]}
        title={draft.name || draft.id}
        lede={
          <>
            Code <span className="t-mono">{draft.id}</span>
            {savedAt
              ? ` · last updated ${new Date(savedAt).toLocaleString()}`
              : ""}
          </>
        }
        meta={
          <div style={{ display: "flex", gap: "var(--sp-2)" }}>
            {statusBadge(draft.status)}
            <Badge variant="info">
              {linked.length} application{linked.length === 1 ? "" : "s"}
              {offers > 0 ? ` · ${offers} offer${offers === 1 ? "" : "s"}` : ""}
            </Badge>
          </div>
        }
      />

      <div className="stack-6">
        <Card accent>
          <CardHead>
            <div>
              <CardTitle>Status</CardTitle>
              <CardSub>
                Set this intake to Open to let applicants apply against it.
              </CardSub>
            </div>
            {statusBadge(draft.status)}
          </CardHead>
          <div className="btn-row">
            <Button
              variant={draft.status === "draft" ? "secondary" : "ghost"}
              onClick={() => setStatus("draft")}
            >
              Draft
            </Button>
            <Button
              variant={draft.status === "open" ? "gold" : "secondary"}
              onClick={() => setStatus("open")}
            >
              <Icon as={CheckCircle2} />
              Open for applications
            </Button>
            <Button
              variant={draft.status === "closed" ? "secondary" : "ghost"}
              onClick={() => setStatus("closed")}
            >
              <Icon as={PauseCircle} />
              Close applications
            </Button>
            <Button
              variant={draft.status === "completed" ? "secondary" : "ghost"}
              onClick={() => setStatus("completed")}
            >
              <Icon as={ArrowRight} />
              Mark completed
            </Button>
          </div>
        </Card>

        {error && (
          <Alert variant="danger" dismissible={false} title={error} />
        )}

        <IntakeForm value={draft} onChange={setDraft} lockId />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "var(--sp-6)",
            borderTop: "1px solid var(--gray-200)",
            gap: "var(--sp-3)",
            flexWrap: "wrap",
          }}
        >
          <Link href="/admin/intakes" style={{ textDecoration: "none" }}>
            <Button variant="ghost">
              <Icon as={ArrowLeft} />
              Back to intakes
            </Button>
          </Link>
          <div style={{ display: "flex", gap: "var(--sp-3)", flexWrap: "wrap" }}>
            <Button variant="danger" onClick={handleDelete}>
              <Icon as={Trash2} />
              Delete intake
            </Button>
            <Button onClick={handleSave}>
              <Icon as={Save} />
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
