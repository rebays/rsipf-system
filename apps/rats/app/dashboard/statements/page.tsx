"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { StageHeader, StageNav } from "@/components/dashboard";
import { Alert, Badge, Field, Textarea } from "@/components/ui";
import {
  EMPTY_STATEMENTS,
  emptyApplication,
  stageState,
  wordCount,
  type Application,
  type Statements,
} from "@/lib/application";
import { useApplication, useUser } from "@/lib/use-application";

export default function StatementsPage() {
  const router = useRouter();
  const { hydrated, application, save } = useApplication();
  const { hydrated: userHydrated, user } = useUser();
  const [statements, setStatements] = useState<Statements>({
    ...EMPTY_STATEMENTS,
  });
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (userHydrated && !user) router.replace("/sign-in");
  }, [userHydrated, user, router]);

  useEffect(() => {
    if (application) {
      setStatements({ ...application.statements });
      setSavedAt(application.updatedAt);
    }
  }, [application]);

  if (!hydrated || !userHydrated) return null;
  if (!user) return null;
  if (application?.status === "submitted") {
    router.replace("/dashboard");
    return null;
  }

  function update<K extends keyof Statements>(key: K, value: Statements[K]) {
    setStatements((prev) => ({ ...prev, [key]: value }));
  }

  function persist(): Application {
    const base = application ?? emptyApplication();
    const saved = save({
      ...base,
      statements,
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
    router.push("/dashboard/documents");
  }

  const probe = stageState(
    application
      ? { ...application, statements }
      : { ...emptyApplication(), statements },
    "statements",
  );

  const personalWords = wordCount(statements.personalStatement);
  const reasonWords = wordCount(statements.reasonForJoining);

  const personalTarget = 200;
  const personalMinimum = 100;
  const reasonTarget = 100;
  const reasonMinimum = 50;

  const personalBadge =
    personalWords === 0
      ? null
      : personalWords < personalMinimum
        ? { variant: "warn" as const, text: `${personalWords} / ${personalTarget} words — keep going` }
        : personalWords > personalTarget + 80
          ? { variant: "warn" as const, text: `${personalWords} / ${personalTarget} words — too long, trim back` }
          : { variant: "success" as const, text: `${personalWords} / ${personalTarget} words` };

  const reasonBadge =
    reasonWords === 0
      ? null
      : reasonWords < reasonMinimum
        ? { variant: "warn" as const, text: `${reasonWords} / ${reasonTarget} words — keep going` }
        : reasonWords > reasonTarget + 50
          ? { variant: "warn" as const, text: `${reasonWords} / ${reasonTarget} words — too long, trim back` }
          : { variant: "success" as const, text: `${reasonWords} / ${reasonTarget} words` };

  const sectionHeading = {
    fontSize: "var(--fs-h3)",
    color: "var(--navy-800)",
    fontWeight: 700,
    margin: "0 0 var(--sp-4)",
  } as const;

  return (
    <>
      <StageHeader
        crumbs={[
          { label: "Application", href: "/dashboard" },
          { label: "Personal statements" },
        ]}
        title="Personal statements"
        lede="Two short statements — about yourself, and why you want to join the RSIPF. Write in your own words, as if you were handwriting them on the paper application."
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
          title="What good statements look like."
          body="Cover family, school, work, and community involvement in the first statement. The second should explain — distinctly — what draws you to police work. Selection panels read these closely."
        />

        <section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: "var(--sp-3)",
              flexWrap: "wrap",
            }}
          >
            <h3 style={sectionHeading}>About yourself (~200 words)</h3>
            {personalBadge && (
              <Badge variant={personalBadge.variant}>{personalBadge.text}</Badge>
            )}
          </div>
          <Field
            label="Personal statement"
            htmlFor="stmt-personal"
            required
            hint="Family, school, work, and social history."
          >
            <Textarea
              id="stmt-personal"
              value={statements.personalStatement}
              onChange={(e) => update("personalStatement", e.target.value)}
              placeholder="I was born in… My family… I completed Form 5 at…"
              rows={10}
            />
          </Field>
        </section>

        <section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: "var(--sp-3)",
              flexWrap: "wrap",
            }}
          >
            <h3 style={sectionHeading}>Why join the RSIPF? (~100 words)</h3>
            {reasonBadge && (
              <Badge variant={reasonBadge.variant}>{reasonBadge.text}</Badge>
            )}
          </div>
          <Field
            label="Reason for applying"
            htmlFor="stmt-reason"
            required
            hint="Different from the personal statement — focus on what draws you to police work."
          >
            <Textarea
              id="stmt-reason"
              value={statements.reasonForJoining}
              onChange={(e) => update("reasonForJoining", e.target.value)}
              placeholder="I want to join the RSIPF because…"
              rows={6}
            />
          </Field>
        </section>

        <StageNav
          backHref="/dashboard/disclosures"
          backLabel="Back to disclosures"
          onSave={handleSave}
          onContinue={handleContinue}
          continueLabel="Save and continue to documents"
          continueDisabled={!probe.complete}
          savedAt={savedAt}
        />
      </div>
    </>
  );
}
