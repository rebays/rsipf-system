"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { StageHeader, StageNav } from "@/components/dashboard";
import { Alert, Badge, Field, Select, Textarea } from "@/components/ui";
import {
  EMPTY_DISCLOSURES,
  EMPTY_SERVICE_HISTORY,
  emptyApplication,
  stageState,
  type Application,
  type Disclosures,
  type ServiceHistory,
} from "@/lib/application";
import { useApplication, useUser } from "@/lib/use-application";

function yesNoValue(b: boolean | null): string {
  return b === null ? "" : b ? "yes" : "no";
}
function parseYesNo(s: string): boolean | null {
  return s === "" ? null : s === "yes";
}

type DisclosureQuestion = {
  key: keyof Disclosures;
  label: string;
};

const QUESTIONS: DisclosureQuestion[] = [
  {
    key: "everInterviewedForOffence",
    label:
      "Have you ever been interviewed, questioned, or investigated in relation to any criminal offence?",
  },
  {
    key: "currentlyInCriminalActivity",
    label: "Are you currently involved in any criminal activities?",
  },
  {
    key: "everConvictedCriminal",
    label: "Have you ever been convicted of any criminal offence?",
  },
  {
    key: "everConvictedOther",
    label: "Have you ever been convicted of any other offence?",
  },
  {
    key: "noConvictionRecorded",
    label:
      "Have you ever appeared before any court which resulted in 'No Conviction' being recorded?",
  },
  {
    key: "warrantEverIssued",
    label: "Has a warrant ever been issued against you?",
  },
];

export default function DisclosuresPage() {
  const router = useRouter();
  const { hydrated, application, save } = useApplication();
  const { hydrated: userHydrated, user } = useUser();
  const [serviceHistory, setServiceHistory] = useState<ServiceHistory>({
    ...EMPTY_SERVICE_HISTORY,
  });
  const [disclosures, setDisclosures] = useState<Disclosures>({
    ...EMPTY_DISCLOSURES,
  });
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (userHydrated && !user) router.replace("/sign-in");
  }, [userHydrated, user, router]);

  useEffect(() => {
    if (application) {
      setServiceHistory({ ...application.serviceHistory });
      setDisclosures({ ...application.disclosures });
      setSavedAt(application.updatedAt);
    }
  }, [application]);

  if (!hydrated || !userHydrated) return null;
  if (!user) return null;
  if (application?.status === "submitted") {
    router.replace("/dashboard");
    return null;
  }

  function updateService<K extends keyof ServiceHistory>(
    key: K,
    value: ServiceHistory[K],
  ) {
    setServiceHistory((prev) => ({ ...prev, [key]: value }));
  }
  function updateDisclosure<K extends keyof Disclosures>(
    key: K,
    value: Disclosures[K],
  ) {
    setDisclosures((prev) => ({ ...prev, [key]: value }));
  }

  function persist(): Application {
    const base = application ?? emptyApplication();
    const saved = save({
      ...base,
      serviceHistory,
      disclosures,
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
    router.push("/dashboard/statements");
  }

  const probe = stageState(
    application
      ? { ...application, serviceHistory, disclosures }
      : { ...emptyApplication(), serviceHistory, disclosures },
    "disclosures",
  );

  const anyYes = QUESTIONS.some((q) => disclosures[q.key] === true);
  const detailsMissing = anyYes && disclosures.details.trim().length === 0;

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
          { label: "Disclosures" },
        ]}
        title="Disclosures"
        lede="Previous police service, prior application, and the six required disclosure questions. Answer every question honestly — false declarations result in disqualification."
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
          variant="warn"
          dismissible={false}
          title="Honesty is mandatory."
          body="The RSIPF runs a criminal-records check on every applicant. Any answer that turns out to be untrue affects the assessment of your honesty and may cost you your place as a recruit."
        />

        <section>
          <h3 style={sectionHeading}>Previous application & service</h3>
          <div className="stack-4">
            <Field
              label="Have you applied to join the RSIPF before?"
              htmlFor="sh-prev-app"
              required
            >
              <Select
                id="sh-prev-app"
                value={yesNoValue(serviceHistory.previousApplication)}
                onChange={(e) =>
                  updateService("previousApplication", parseYesNo(e.target.value))
                }
              >
                <option value="">Choose…</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Select>
            </Field>
            <Field
              label="Have you ever been employed as a police officer?"
              htmlFor="sh-prev-officer"
              required
              hint="Whether with the RSIPF or any other force."
            >
              <Select
                id="sh-prev-officer"
                value={yesNoValue(serviceHistory.previouslyPoliceOfficer)}
                onChange={(e) =>
                  updateService(
                    "previouslyPoliceOfficer",
                    parseYesNo(e.target.value),
                  )
                }
              >
                <option value="">Choose…</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Select>
            </Field>
          </div>
        </section>

        <section>
          <h3 style={sectionHeading}>Disclosure of relevant information</h3>
          <div className="stack-4">
            {QUESTIONS.map((q) => (
              <Field key={q.key} label={q.label} htmlFor={`d-${q.key}`} required>
                <Select
                  id={`d-${q.key}`}
                  value={yesNoValue(disclosures[q.key] as boolean | null)}
                  onChange={(e) =>
                    updateDisclosure(q.key, parseYesNo(e.target.value) as never)
                  }
                >
                  <option value="">Choose…</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Select>
              </Field>
            ))}

            <Field
              label="Details"
              htmlFor="d-details"
              required={anyYes}
              hint={
                anyYes
                  ? "You answered Yes to at least one question above — provide full details, including dates and any case references."
                  : "Only required if you answer Yes to any question above."
              }
            >
              <Textarea
                id="d-details"
                value={disclosures.details}
                onChange={(e) => updateDisclosure("details", e.target.value)}
                placeholder={anyYes ? "Describe the matter in full…" : ""}
                rows={6}
              />
            </Field>
            {detailsMissing && (
              <Alert
                variant="danger"
                dismissible={false}
                title="Details required"
                body="You answered Yes to a disclosure question. Provide details before continuing."
              />
            )}
          </div>
        </section>

        <StageNav
          backHref="/dashboard/work"
          backLabel="Back to employment"
          onSave={handleSave}
          onContinue={handleContinue}
          continueLabel="Save and continue to statements"
          continueDisabled={!probe.complete}
          savedAt={savedAt}
        />
      </div>
    </>
  );
}
