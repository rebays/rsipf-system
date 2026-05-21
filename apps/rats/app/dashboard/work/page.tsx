"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { StageHeader, StageNav } from "@/components/dashboard";
import {
  Badge,
  Button,
  Checkbox,
  Field,
  Icon,
  Input,
  Select,
  Textarea,
} from "@/components/ui";
import {
  emptyApplication,
  newWorkEntry,
  stageState,
  type Application,
  type WorkEntry,
} from "@/lib/application";
import { useApplication, useUser } from "@/lib/use-application";

export default function WorkPage() {
  const router = useRouter();
  const { hydrated, application, save } = useApplication();
  const { hydrated: userHydrated, user } = useUser();
  const [entries, setEntries] = useState<WorkEntry[]>([]);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (userHydrated && !user) router.replace("/sign-in");
  }, [userHydrated, user, router]);

  useEffect(() => {
    if (application) {
      setEntries(application.work);
      setSavedAt(application.updatedAt);
    }
  }, [application]);

  if (!hydrated || !userHydrated) return null;
  if (!user) return null;
  if (application?.status === "submitted") {
    router.replace("/dashboard");
    return null;
  }

  function updateEntry(id: string, patch: Partial<WorkEntry>) {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }
  function addEntry() {
    setEntries((prev) => [...prev, newWorkEntry()]);
  }
  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  function persist(): Application {
    const base = application ?? emptyApplication();
    const cleaned = entries.filter((w) => w.employer.trim() || w.role.trim());
    const saved = save({
      ...base,
      work: cleaned,
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
    router.push("/dashboard/disclosures");
  }

  const probe = stageState(
    application
      ? { ...application, work: entries }
      : { ...emptyApplication(), work: entries },
    "work",
  );

  return (
    <>
      <StageHeader
        crumbs={[
          { label: "Application", href: "/dashboard" },
          { label: "Work history" },
        ]}
        title="Work history"
        lede="List your previous and current employment. If you have no work history yet, you can skip this stage."
        meta={
          probe.complete ? (
            <Badge variant="success">Complete</Badge>
          ) : (
            <Badge variant="info">In progress</Badge>
          )
        }
      />

      <div className="stack-5">
        {entries.length === 0 ? (
          <div className="entry-empty">
            No employment recorded yet. Add an entry below, or save and continue
            if you have no work history to declare.
          </div>
        ) : (
          entries.map((entry, idx) => (
            <div className="entry-card" key={entry.id}>
              <div className="entry-card__head">
                <h4 className="entry-card__title">Entry {idx + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEntry(entry.id)}
                >
                  <Icon as={Trash2} />
                  Remove
                </Button>
              </div>
              <div className="grid-2">
                <Field label="Employer / business name" htmlFor={`work-emp-${entry.id}`} required>
                  <Input
                    id={`work-emp-${entry.id}`}
                    value={entry.employer}
                    onChange={(e) => updateEntry(entry.id, { employer: e.target.value })}
                    placeholder="e.g. Solomon Power"
                  />
                </Field>
                <Field label="Role / position" htmlFor={`work-role-${entry.id}`} required>
                  <Input
                    id={`work-role-${entry.id}`}
                    value={entry.role}
                    onChange={(e) => updateEntry(entry.id, { role: e.target.value })}
                    placeholder="Operations assistant"
                  />
                </Field>
                <Field
                  label="Paid or volunteer?"
                  htmlFor={`work-pay-${entry.id}`}
                  required
                >
                  <Select
                    id={`work-pay-${entry.id}`}
                    value={entry.paymentType}
                    onChange={(e) =>
                      updateEntry(entry.id, {
                        paymentType: e.target.value as "paid" | "volunteer" | "",
                      })
                    }
                  >
                    <option value="">Choose…</option>
                    <option value="paid">Paid work</option>
                    <option value="volunteer">Volunteer</option>
                  </Select>
                </Field>
                <Field label="Start date" htmlFor={`work-start-${entry.id}`} required>
                  <Input
                    id={`work-start-${entry.id}`}
                    type="month"
                    value={entry.startDate}
                    onChange={(e) => updateEntry(entry.id, { startDate: e.target.value })}
                  />
                </Field>
                <Field
                  label="End date"
                  htmlFor={`work-end-${entry.id}`}
                  hint={entry.current ? "Currently working here" : "Leave blank if ongoing"}
                >
                  <Input
                    id={`work-end-${entry.id}`}
                    type="month"
                    value={entry.endDate}
                    onChange={(e) => updateEntry(entry.id, { endDate: e.target.value })}
                    disabled={entry.current}
                  />
                </Field>
              </div>
              <div style={{ marginTop: "var(--sp-3)" }}>
                <Checkbox
                  checked={entry.current}
                  onChange={(e) => updateEntry(entry.id, { current: e.target.checked, endDate: e.target.checked ? "" : entry.endDate })}
                  label="I currently work here"
                />
              </div>
              <div style={{ marginTop: "var(--sp-3)" }}>
                <Field
                  label="Brief description"
                  htmlFor={`work-desc-${entry.id}`}
                  hint="Two or three sentences about your responsibilities."
                >
                  <Textarea
                    id={`work-desc-${entry.id}`}
                    value={entry.description}
                    onChange={(e) => updateEntry(entry.id, { description: e.target.value })}
                    placeholder="Coordinated daily logistics for a 40-person co-operative..."
                  />
                </Field>
              </div>
            </div>
          ))
        )}

        <Button variant="secondary" onClick={addEntry}>
          <Icon as={Plus} />
          Add an entry
        </Button>

        <StageNav
          backHref="/dashboard/education"
          backLabel="Back to education"
          onSave={handleSave}
          onContinue={handleContinue}
          continueLabel="Save and continue to disclosures"
          savedAt={savedAt}
        />
      </div>
    </>
  );
}
