"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { StageHeader, StageNav } from "@/components/dashboard";
import { Badge, Button, Field, Icon, Input } from "@/components/ui";
import {
  emptyApplication,
  newEducationEntry,
  stageState,
  type Application,
  type EducationEntry,
} from "@/lib/application";
import { useApplication, useUser } from "@/lib/use-application";

export default function EducationPage() {
  const router = useRouter();
  const { hydrated, application, save } = useApplication();
  const { hydrated: userHydrated, user } = useUser();
  const [entries, setEntries] = useState<EducationEntry[]>([]);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (userHydrated && !user) router.replace("/sign-in");
  }, [userHydrated, user, router]);

  useEffect(() => {
    if (application) {
      setEntries(application.education.length ? application.education : [newEducationEntry()]);
      setSavedAt(application.updatedAt);
    } else {
      setEntries([newEducationEntry()]);
    }
  }, [application]);

  if (!hydrated || !userHydrated) return null;
  if (!user) return null;
  if (application?.status === "submitted") {
    router.replace("/dashboard");
    return null;
  }

  function updateEntry(
    id: string,
    patch: Partial<EducationEntry>,
  ) {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }
  function addEntry() {
    setEntries((prev) => [...prev, newEducationEntry()]);
  }
  function removeEntry(id: string) {
    setEntries((prev) => (prev.length > 1 ? prev.filter((e) => e.id !== id) : prev));
  }

  function persist(): Application {
    const base = application ?? emptyApplication();
    const cleaned = entries.filter(
      (e) => e.institution.trim() || e.qualification.trim(),
    );
    const saved = save({
      ...base,
      education: cleaned,
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
    router.push("/dashboard/work");
  }

  const probe = stageState(
    application
      ? { ...application, education: entries }
      : { ...emptyApplication(), education: entries },
    "education",
  );

  return (
    <>
      <StageHeader
        crumbs={[
          { label: "Application", href: "/dashboard" },
          { label: "Education" },
        ]}
        title="Education"
        lede="Add every secondary and tertiary qualification you hold. Start with the most recent."
        meta={
          probe.complete ? (
            <Badge variant="success">Complete</Badge>
          ) : (
            <Badge variant="info">In progress</Badge>
          )
        }
      />

      <div className="stack-5">
        {entries.map((entry, idx) => (
          <div className="entry-card" key={entry.id}>
            <div className="entry-card__head">
              <h4 className="entry-card__title">Entry {idx + 1}</h4>
              {entries.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEntry(entry.id)}
                >
                  <Icon as={Trash2} />
                  Remove
                </Button>
              )}
            </div>
            <div className="grid-2">
              <Field label="Institution" htmlFor={`edu-inst-${entry.id}`} required>
                <Input
                  id={`edu-inst-${entry.id}`}
                  value={entry.institution}
                  onChange={(e) => updateEntry(entry.id, { institution: e.target.value })}
                  placeholder="e.g. King George VI National Secondary School"
                />
              </Field>
              <Field
                label="Qualification"
                htmlFor={`edu-qual-${entry.id}`}
                required
              >
                <Input
                  id={`edu-qual-${entry.id}`}
                  value={entry.qualification}
                  onChange={(e) => updateEntry(entry.id, { qualification: e.target.value })}
                  placeholder="Form 5 certificate"
                />
              </Field>
              <Field label="Start year" htmlFor={`edu-start-${entry.id}`}>
                <Input
                  id={`edu-start-${entry.id}`}
                  type="number"
                  min={1970}
                  max={2030}
                  value={entry.startYear}
                  onChange={(e) => updateEntry(entry.id, { startYear: e.target.value })}
                  placeholder="2015"
                />
              </Field>
              <Field
                label="End year"
                htmlFor={`edu-end-${entry.id}`}
                required
                hint="Or expected year of completion"
              >
                <Input
                  id={`edu-end-${entry.id}`}
                  type="number"
                  min={1970}
                  max={2030}
                  value={entry.endYear}
                  onChange={(e) => updateEntry(entry.id, { endYear: e.target.value })}
                  placeholder="2021"
                />
              </Field>
              <Field
                label="Result / grade"
                htmlFor={`edu-result-${entry.id}`}
                hint="Optional — e.g. credits, GPA, or class"
              >
                <Input
                  id={`edu-result-${entry.id}`}
                  value={entry.result}
                  onChange={(e) => updateEntry(entry.id, { result: e.target.value })}
                  placeholder="6 credits including English and Maths"
                />
              </Field>
            </div>
          </div>
        ))}

        <Button variant="secondary" onClick={addEntry}>
          <Icon as={Plus} />
          Add another entry
        </Button>

        <StageNav
          backHref="/dashboard/personal"
          backLabel="Back to personal"
          onSave={handleSave}
          onContinue={handleContinue}
          continueLabel="Save and continue to work history"
          continueDisabled={!probe.complete}
          savedAt={savedAt}
        />
      </div>
    </>
  );
}
