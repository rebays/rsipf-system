"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Eye, FileText, FileX, Trash2, Upload as UploadIcon } from "lucide-react";

import { StageHeader, StageNav } from "@/components/dashboard";
import { Alert, Badge, Button, Icon, Upload } from "@/components/ui";
import { DocumentRow } from "@/components/patterns";
import {
  emptyApplication,
  stageState,
  type Application,
  type DocumentRecord,
} from "@/lib/application";
import { useApplication, useUser } from "@/lib/use-application";

function formatBytes(bytes: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function badgeFor(doc: DocumentRecord) {
  switch (doc.status) {
    case "verified":
      return <Badge variant="success">Verified</Badge>;
    case "uploaded":
      return <Badge variant="info">Uploaded</Badge>;
    case "rejected":
      return <Badge variant="danger">Rejected</Badge>;
    default:
      return doc.required ? (
        <Badge variant="warn">Required</Badge>
      ) : (
        <Badge variant="neutral">Optional</Badge>
      );
  }
}

export default function DocumentsPage() {
  const router = useRouter();
  const { hydrated, application, save } = useApplication();
  const { hydrated: userHydrated, user } = useUser();
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (userHydrated && !user) router.replace("/sign-in");
  }, [userHydrated, user, router]);

  useEffect(() => {
    if (application) {
      setDocuments(application.documents);
      setSavedAt(application.updatedAt);
    }
  }, [application]);

  if (!hydrated || !userHydrated) return null;
  if (!user) return null;
  if (application?.status === "submitted") {
    router.replace("/dashboard");
    return null;
  }

  function handleFile(type: string, file: File | null) {
    if (!file) return;
    setDocuments((prev) =>
      prev.map((d) =>
        d.type === type
          ? {
              ...d,
              filename: file.name,
              sizeBytes: file.size,
              uploadedAt: new Date().toISOString(),
              status: "uploaded",
              note: undefined,
            }
          : d,
      ),
    );
  }

  function clear(type: string) {
    if (typeof window !== "undefined" && !window.confirm("Remove this upload?")) return;
    setDocuments((prev) =>
      prev.map((d) =>
        d.type === type
          ? {
              ...d,
              filename: null,
              sizeBytes: null,
              uploadedAt: null,
              status: "missing",
              note: undefined,
            }
          : d,
      ),
    );
  }

  function persist(): Application {
    const base = application ?? emptyApplication();
    const saved = save({
      ...base,
      documents,
      ownerEmail: user?.email ?? base.ownerEmail,
    });
    setSavedAt(saved.updatedAt);
    return saved;
  }
  function handleSave() {
    persist();
  }
  function handleContinue() {
    persist();
    router.push("/dashboard/background");
  }

  const probe = stageState(
    application
      ? { ...application, documents }
      : { ...emptyApplication(), documents },
    "documents",
  );

  const required = documents.filter((d) => d.required);
  const optional = documents.filter((d) => !d.required);

  function row(doc: DocumentRecord) {
    const meta =
      doc.status === "missing"
        ? doc.description
        : `${doc.filename} · ${formatBytes(doc.sizeBytes)} · uploaded ${doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleString() : ""}`;

    const iconStyle =
      doc.status === "rejected"
        ? { background: "var(--danger-50)", color: "var(--danger-700)" }
        : undefined;
    const iconComponent = doc.status === "rejected" ? FileX : FileText;

    const trigger = (
      <input
        type="file"
        ref={(el) => {
          fileInputs.current[doc.type] = el;
        }}
        accept=".pdf,.jpg,.jpeg,.png"
        style={{ display: "none" }}
        onChange={(e) => {
          handleFile(doc.type, e.target.files?.[0] ?? null);
          if (e.target) e.target.value = "";
        }}
      />
    );

    const action =
      doc.status === "missing" ? (
        <>
          {trigger}
          <Button
            size="sm"
            onClick={() => fileInputs.current[doc.type]?.click()}
          >
            <Icon as={UploadIcon} />
            Upload
          </Button>
        </>
      ) : (
        <>
          {trigger}
          <span style={{ display: "flex", gap: "var(--sp-2)" }}>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => fileInputs.current[doc.type]?.click()}
            >
              <Icon as={UploadIcon} />
              Replace
            </Button>
            <Button size="sm" variant="ghost" onClick={() => clear(doc.type)}>
              <Icon as={Trash2} />
              Remove
            </Button>
          </span>
        </>
      );

    return (
      <DocumentRow
        key={doc.type}
        icon={iconComponent}
        iconStyle={iconStyle}
        name={doc.label}
        meta={meta}
        badge={badgeFor(doc)}
        action={action}
      />
    );
  }

  return (
    <>
      <StageHeader
        crumbs={[
          { label: "Application", href: "/dashboard" },
          { label: "Documents" },
        ]}
        title="Documents"
        lede="Upload each required document. Files stay in your browser until you submit — they aren't sent to the server in this prototype."
        meta={
          probe.complete ? (
            <Badge variant="success">Complete</Badge>
          ) : (
            <Badge variant="info">In progress</Badge>
          )
        }
      />

      <div className="stack-6">
        <Alert
          variant="info"
          dismissible={false}
          title="Accepted formats"
          body="PDF, JPG, or PNG. 10 MB maximum per file. Black-and-white scans are fine if legible."
        />

        <Upload
          title="Drop any document here, or click to browse"
          hint="Use the buttons below for specific required documents."
        />

        <section>
          <h3
            style={{
              fontSize: "var(--fs-h3)",
              color: "var(--navy-800)",
              fontWeight: 700,
              margin: "0 0 var(--sp-4)",
            }}
          >
            Required documents
          </h3>
          <div className="stack-3">{required.map(row)}</div>
        </section>

        <section>
          <h3
            style={{
              fontSize: "var(--fs-h3)",
              color: "var(--navy-800)",
              fontWeight: 700,
              margin: "0 0 var(--sp-4)",
            }}
          >
            Optional supporting documents
          </h3>
          <div className="stack-3">{optional.map(row)}</div>
        </section>

        <StageNav
          backHref="/dashboard/work"
          backLabel="Back to work history"
          onSave={handleSave}
          onContinue={handleContinue}
          continueLabel="Save and continue to background check"
          continueDisabled={!probe.complete}
          savedAt={savedAt}
        />
      </div>
    </>
  );
}
