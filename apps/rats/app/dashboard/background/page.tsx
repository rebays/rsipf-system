"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { StageHeader, StageNav } from "@/components/dashboard";
import {
  Alert,
  Badge,
  Button,
  Checkbox,
  Field,
  Icon,
  Input,
  Textarea,
} from "@/components/ui";
import {
  EMPTY_BACKGROUND,
  emptyApplication,
  newReference,
  stageState,
  type Application,
  type BackgroundInfo,
  type Reference,
} from "@/lib/application";
import { useApplication, useUser } from "@/lib/use-application";

export default function BackgroundPage() {
  const router = useRouter();
  const { hydrated, application, save } = useApplication();
  const { hydrated: userHydrated, user } = useUser();
  const [bg, setBg] = useState<BackgroundInfo>({
    nextOfKin: { ...EMPTY_BACKGROUND.nextOfKin },
    references: [newReference(), newReference()],
    declarations: { ...EMPTY_BACKGROUND.declarations },
  });
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (userHydrated && !user) router.replace("/sign-in");
  }, [userHydrated, user, router]);

  useEffect(() => {
    if (application) {
      setBg({
        nextOfKin: { ...application.background.nextOfKin },
        references: application.background.references.length
          ? application.background.references
          : [newReference(), newReference()],
        declarations: { ...application.background.declarations },
      });
      setSavedAt(application.updatedAt);
    }
  }, [application]);

  if (!hydrated || !userHydrated) return null;
  if (!user) return null;
  if (application?.status === "submitted") {
    router.replace("/dashboard");
    return null;
  }

  function updateNok<K extends keyof BackgroundInfo["nextOfKin"]>(
    key: K,
    value: BackgroundInfo["nextOfKin"][K],
  ) {
    setBg((prev) => ({
      ...prev,
      nextOfKin: { ...prev.nextOfKin, [key]: value },
    }));
  }

  function updateRef(id: string, patch: Partial<Reference>) {
    setBg((prev) => ({
      ...prev,
      references: prev.references.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    }));
  }

  function addRef() {
    setBg((prev) => ({ ...prev, references: [...prev.references, newReference()] }));
  }

  function removeRef(id: string) {
    setBg((prev) => ({
      ...prev,
      references: prev.references.length > 1
        ? prev.references.filter((r) => r.id !== id)
        : prev.references,
    }));
  }

  function updateDecl<K extends keyof BackgroundInfo["declarations"]>(
    key: K,
    value: BackgroundInfo["declarations"][K],
  ) {
    setBg((prev) => ({
      ...prev,
      declarations: { ...prev.declarations, [key]: value },
    }));
  }

  function persist(): Application {
    const base = application ?? emptyApplication();
    const saved = save({
      ...base,
      background: bg,
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
    router.push("/dashboard/submit");
  }

  const probe = stageState(
    application
      ? { ...application, background: bg }
      : { ...emptyApplication(), background: bg },
    "background",
  );

  return (
    <>
      <StageHeader
        crumbs={[
          { label: "Application", href: "/dashboard" },
          { label: "Background check" },
        ]}
        title="Background check"
        lede="Tell us who we can contact in an emergency, and provide two professional references who have known you for at least two years."
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
          title="What we ask for here"
          body="A next-of-kin contact (in case of emergency), at least two professional references, and three short declarations you must agree to before submitting."
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
            Next of kin
          </h3>
          <div className="grid-2">
            <Field label="Full name" htmlFor="nok-name" required>
              <Input
                id="nok-name"
                value={bg.nextOfKin.name}
                onChange={(e) => updateNok("name", e.target.value)}
                placeholder="Family member or close contact"
              />
            </Field>
            <Field label="Relationship" htmlFor="nok-rel" required>
              <Input
                id="nok-rel"
                value={bg.nextOfKin.relationship}
                onChange={(e) => updateNok("relationship", e.target.value)}
                placeholder="Mother, sibling, spouse, friend…"
              />
            </Field>
            <Field label="Phone number" htmlFor="nok-phone" required>
              <Input
                id="nok-phone"
                type="tel"
                value={bg.nextOfKin.phone}
                onChange={(e) => updateNok("phone", e.target.value)}
                placeholder="+677 000 0000"
              />
            </Field>
            <Field
              label="Address"
              htmlFor="nok-address"
              required
              hint="Full postal or residential address."
            >
              <Textarea
                id="nok-address"
                value={bg.nextOfKin.address}
                onChange={(e) => updateNok("address", e.target.value)}
                placeholder="Street, town, province"
                rows={2}
              />
            </Field>
          </div>
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
            References
          </h3>
          <p
            className="t-sm"
            style={{ color: "var(--gray-700)", margin: "0 0 var(--sp-4)" }}
          >
            At least two non-relatives who have known you for two years or more.
          </p>
          <div className="stack-5">
            {bg.references.map((ref, idx) => (
              <div className="entry-card" key={ref.id}>
                <div className="entry-card__head">
                  <h4 className="entry-card__title">Reference {idx + 1}</h4>
                  {bg.references.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRef(ref.id)}
                    >
                      <Icon as={Trash2} />
                      Remove
                    </Button>
                  )}
                </div>
                <div className="grid-2">
                  <Field label="Full name" htmlFor={`ref-name-${ref.id}`} required>
                    <Input
                      id={`ref-name-${ref.id}`}
                      value={ref.name}
                      onChange={(e) => updateRef(ref.id, { name: e.target.value })}
                    />
                  </Field>
                  <Field label="Relationship" htmlFor={`ref-rel-${ref.id}`}>
                    <Input
                      id={`ref-rel-${ref.id}`}
                      value={ref.relationship}
                      onChange={(e) =>
                        updateRef(ref.id, { relationship: e.target.value })
                      }
                      placeholder="Teacher, employer, mentor…"
                    />
                  </Field>
                  <Field label="Years known" htmlFor={`ref-years-${ref.id}`}>
                    <Input
                      id={`ref-years-${ref.id}`}
                      type="number"
                      min={0}
                      max={80}
                      value={ref.yearsKnown}
                      onChange={(e) =>
                        updateRef(ref.id, { yearsKnown: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Email" htmlFor={`ref-email-${ref.id}`}>
                    <Input
                      id={`ref-email-${ref.id}`}
                      type="email"
                      value={ref.email}
                      onChange={(e) => updateRef(ref.id, { email: e.target.value })}
                    />
                  </Field>
                  <Field label="Phone" htmlFor={`ref-phone-${ref.id}`} required>
                    <Input
                      id={`ref-phone-${ref.id}`}
                      type="tel"
                      value={ref.phone}
                      onChange={(e) => updateRef(ref.id, { phone: e.target.value })}
                    />
                  </Field>
                </div>
              </div>
            ))}
            <Button variant="secondary" onClick={addRef}>
              <Icon as={Plus} />
              Add another reference
            </Button>
          </div>
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
            Declarations
          </h3>
          <div className="stack-3">
            <Checkbox
              checked={bg.declarations.accurate}
              onChange={(e) => updateDecl("accurate", e.target.checked)}
              label="I declare that the information I have provided is true, complete, and accurate to the best of my knowledge."
            />
            <Checkbox
              checked={bg.declarations.consent}
              onChange={(e) => updateDecl("consent", e.target.checked)}
              label="I authorise the police service to verify my identity, references, and any declarations made on this application."
            />
            <Checkbox
              checked={bg.declarations.medical}
              onChange={(e) => updateDecl("medical", e.target.checked)}
              label="I consent to a medical and fitness examination as part of the recruitment process."
            />
          </div>
        </section>

        <StageNav
          backHref="/dashboard/documents"
          backLabel="Back to documents"
          onSave={handleSave}
          onContinue={handleContinue}
          continueLabel="Save and continue to review"
          continueDisabled={!probe.complete}
          savedAt={savedAt}
        />
      </div>
    </>
  );
}
