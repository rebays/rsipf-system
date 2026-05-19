"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";

import { StageHeader } from "@/components/dashboard";
import { IntakeForm, intakeIsValid } from "@/components/admin/IntakeForm";
import { Alert, Button, Icon } from "@/components/ui";
import { newIntake, type Intake } from "@/lib/application";
import { useAdminUser, useIntakes } from "@/lib/use-application";

export default function NewIntakePage() {
  const router = useRouter();
  const { save, intakes } = useIntakes();
  const { adminUser } = useAdminUser();
  const [intake, setIntake] = useState<Intake>(newIntake());
  const [error, setError] = useState<string | null>(null);

  function handleSave() {
    if (!intakeIsValid(intake)) {
      setError(
        "Fill in code, name, and all three dates. Code must be uppercase letters, digits, or hyphens.",
      );
      return;
    }
    if (intakes.some((i) => i.id === intake.id)) {
      setError(`An intake with code ${intake.id} already exists.`);
      return;
    }
    save({ ...intake, createdBy: adminUser?.email });
    router.push(`/admin/intakes/${intake.id}`);
  }

  return (
    <>
      <StageHeader
        crumbs={[
          { label: "Records office", href: "/admin" },
          { label: "Intakes", href: "/admin/intakes" },
          { label: "New intake" },
        ]}
        title="Create an intake"
        lede="Open a new recruit class so applicants can apply against it. Save as a draft first if you need approval before opening."
      />

      <div className="stack-6">
        {error && (
          <Alert variant="danger" dismissible={false} title={error} />
        )}

        <IntakeForm value={intake} onChange={setIntake} />

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
          <Button onClick={handleSave}>
            <Icon as={Save} />
            Create intake
          </Button>
        </div>
      </div>
    </>
  );
}
