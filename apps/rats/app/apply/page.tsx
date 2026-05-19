"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarOff, RotateCcw } from "lucide-react";

import { BrandBar } from "@/components/brand";
import { Footer } from "@/components/layout";
import {
  Alert,
  Badge,
  Breadcrumbs,
  Button,
  Empty,
  Field,
  Icon,
  Input,
  Select,
} from "@/components/ui";
import { EligibilityCheck } from "@/components/patterns";
import {
  ACADEMY_START,
  DEFAULT_ELIGIBILITY,
  emptyApplication,
  summarizeEligibility,
  type Application,
  type Citizenship,
  type DriverClass,
  type EligibilityAnswers,
  type Intake,
} from "@/lib/application";
import { useApplication, useIntakes, useUser } from "@/lib/use-application";

function fmtDate(date: string): string {
  if (!date) return "—";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function statusBadge(status: "met" | "fail" | "pending") {
  if (status === "met") return <Badge variant="success">Met</Badge>;
  if (status === "fail") return <Badge variant="danger">Not met</Badge>;
  return <Badge variant="neutral">Pending</Badge>;
}

function yesNoValue(b: boolean | null): string {
  return b === null ? "" : b ? "yes" : "no";
}

function parseYesNo(s: string): boolean | null {
  return s === "" ? null : s === "yes";
}

export default function ApplyPage() {
  return (
    <Suspense fallback={null}>
      <ApplyPageInner />
    </Suspense>
  );
}

function ApplyPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { hydrated, application, save, reset } = useApplication();
  const { hydrated: intakesHydrated, intakes } = useIntakes();
  const { user } = useUser();
  const [answers, setAnswers] = useState<EligibilityAnswers>(DEFAULT_ELIGIBILITY);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const openIntakes = useMemo(
    () => intakes.filter((i) => i.status === "open"),
    [intakes],
  );

  const requestedId = searchParams?.get("intake") ?? null;
  const selectedIntake: Intake | null = useMemo(() => {
    if (requestedId) {
      const found = intakes.find((i) => i.id === requestedId);
      if (found && found.status === "open") return found;
    }
    if (application?.intakeId) {
      const found = intakes.find((i) => i.id === application.intakeId);
      if (found && found.status === "open") return found;
    }
    return openIntakes[0] ?? null;
  }, [requestedId, intakes, application, openIntakes]);

  const intakeStartDate =
    selectedIntake?.academyStartDate ??
    application?.intakeAcademyStartDate ??
    ACADEMY_START;

  useEffect(() => {
    if (application?.eligibility) {
      setAnswers(application.eligibility);
      setSavedAt(application.updatedAt);
    }
  }, [application]);

  function update<K extends keyof EligibilityAnswers>(
    key: K,
    value: EligibilityAnswers[K],
  ) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  const summary = summarizeEligibility(answers, intakeStartDate);

  function persist(): Application {
    const base = application ?? emptyApplication();
    const next: Application = {
      ...base,
      intakeId: selectedIntake?.id ?? base.intakeId,
      intakeAcademyStartDate:
        selectedIntake?.academyStartDate ?? base.intakeAcademyStartDate,
      eligibility: answers,
      ownerEmail: user?.email ?? base.ownerEmail,
    };
    const saved = save(next);
    setSavedAt(saved.updatedAt);
    return saved;
  }

  function handleSaveOnly() {
    persist();
  }

  function handleContinue() {
    persist();
    router.push(user ? "/dashboard" : "/sign-in");
  }

  function handleStartOver() {
    if (
      typeof window !== "undefined" &&
      !window.confirm("Discard your current draft and start a new application?")
    ) {
      return;
    }
    const fresh = reset();
    setAnswers(fresh.eligibility);
    setSavedAt(null);
  }

  if (intakesHydrated && !selectedIntake) {
    return (
      <>
        <BrandBar
          name="Police Service · Recruits"
          sub="Online Application Portal"
          meta="No intake open"
        />
        <header className="page-head">
          <Breadcrumbs
            items={[{ label: "Apply", href: "/" }, { label: "Eligibility check" }]}
          />
          <h1>Applications are currently closed</h1>
          <p className="page-head__lede">
            No recruit class is open for application right now. Sign in to keep
            an existing draft warm — it&apos;ll reactivate when the next intake
            opens.
          </p>
        </header>
        <main className="page-body stack-6">
          <Empty
            icon={CalendarOff}
            title="No intake is open"
            body={
              openIntakes.length === 0
                ? "The records office hasn't opened an intake yet. Check back soon."
                : "The intake you tried to apply against isn't open."
            }
            action={
              <Link href="/" style={{ textDecoration: "none" }}>
                <Button>Back to home</Button>
              </Link>
            }
          />
        </main>
      </>
    );
  }

  return (
    <>
      <BrandBar
        name="Police Service · Recruits"
        sub="Online Application Portal"
        meta={selectedIntake ? `${selectedIntake.name} · Open` : "Online Application Portal"}
      />

      <header className="page-head">
        <Breadcrumbs
          items={[{ label: "Apply", href: "/" }, { label: "Eligibility check" }]}
        />
        <h1>
          Are you eligible for the {selectedIntake?.name ?? "recruit"} class?
        </h1>
        <p className="page-head__lede">
          A short self-assessment against the published criteria. This takes
          about ten minutes. Your answers are saved locally so you can return
          and edit before submitting.
        </p>
      </header>

      <main className="page-body stack-6">
        {selectedIntake && (
          <Alert
            variant="info"
            dismissible={false}
            title={`Applying to ${selectedIntake.name}`}
            body={
              <>
                Applications close {fmtDate(selectedIntake.closeDate)} · academy
                starts {fmtDate(selectedIntake.academyStartDate)}. Age and other
                criteria are evaluated against the academy start date.
              </>
            }
          />
        )}
        {hydrated && application && (
          <Alert
            variant="info"
            dismissible={false}
            title={`Draft loaded — ${application.applicantId}`}
            body={
              <>
                Last updated{" "}
                {new Date(application.updatedAt).toLocaleString()}. You can
                edit any answer below; nothing is final until you submit from
                the dashboard.
              </>
            }
          />
        )}

        <section className="stack-5">
          <header>
            <h2
              style={{
                fontSize: "var(--fs-h2)",
                color: "var(--navy-800)",
                letterSpacing: "var(--tracking-tight)",
                margin: "0 0 var(--sp-2)",
                fontWeight: 700,
              }}
            >
              Tell us about yourself
            </h2>
            <p className="t-sm" style={{ color: "var(--gray-700)", margin: 0 }}>
              We use these answers to confirm you meet each criterion. Nothing
              is submitted on this page.
            </p>
          </header>

          <div className="grid-2">
            <Field label="Citizenship status" htmlFor="ans-citizenship" required>
              <Select
                id="ans-citizenship"
                value={answers.citizenship ?? ""}
                onChange={(e) =>
                  update(
                    "citizenship",
                    e.target.value === ""
                      ? null
                      : (e.target.value as Citizenship),
                  )
                }
              >
                <option value="">Choose…</option>
                <option value="citizen">Citizen by birth</option>
                <option value="naturalised">Naturalised citizen</option>
                <option value="pr">Permanent resident</option>
                <option value="no">None of the above</option>
              </Select>
            </Field>

            <Field
              label="Date of birth"
              htmlFor="ans-dob"
              required
              hint={`Used to compute your age at academy start (${fmtDate(intakeStartDate)}).`}
            >
              <Input
                id="ans-dob"
                type="date"
                value={answers.dob}
                onChange={(e) => update("dob", e.target.value)}
              />
            </Field>

            <Field
              label="Do you hold a Senior Secondary Certificate?"
              htmlFor="ans-edu"
              required
            >
              <Select
                id="ans-edu"
                value={yesNoValue(answers.hasEducation)}
                onChange={(e) =>
                  update("hasEducation", parseYesNo(e.target.value))
                }
              >
                <option value="">Choose…</option>
                <option value="yes">Yes — I hold an SSC or equivalent</option>
                <option value="no">No</option>
              </Select>
            </Field>

            <Field
              label="Height"
              htmlFor="ans-height"
              required
              hint="Enter in centimetres. Minimum 167 cm (1.67 m)."
            >
              <Input
                id="ans-height"
                type="number"
                min={120}
                max={230}
                placeholder="e.g. 172"
                value={answers.heightCm ?? ""}
                onChange={(e) =>
                  update(
                    "heightCm",
                    e.target.value === "" ? null : Number(e.target.value),
                  )
                }
              />
            </Field>

            <Field
              label="No prior felony convictions?"
              htmlFor="ans-felony"
              required
            >
              <Select
                id="ans-felony"
                value={yesNoValue(answers.noFelony)}
                onChange={(e) =>
                  update("noFelony", parseYesNo(e.target.value))
                }
              >
                <option value="">Choose…</option>
                <option value="yes">Yes — I have no felony convictions</option>
                <option value="no">
                  No — I have a prior felony conviction
                </option>
              </Select>
            </Field>

            <Field label="Driver's licence" htmlFor="ans-licence" required>
              <Select
                id="ans-licence"
                value={answers.driverLicence ?? ""}
                onChange={(e) =>
                  update(
                    "driverLicence",
                    e.target.value === ""
                      ? null
                      : (e.target.value as DriverClass),
                  )
                }
              >
                <option value="">Choose…</option>
                <option value="none">None</option>
                <option value="A">Class A (motorcycle)</option>
                <option value="B">Class B (light vehicle)</option>
                <option value="C+">Class C or higher</option>
              </Select>
            </Field>

            <Field
              label="First-aid certification within the last 24 months?"
              htmlFor="ans-firstaid"
              required
              hint="Short course; available at any accredited provider."
            >
              <Select
                id="ans-firstaid"
                value={yesNoValue(answers.firstAid)}
                onChange={(e) =>
                  update("firstAid", parseYesNo(e.target.value))
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
          <h2
            style={{
              fontSize: "var(--fs-h2)",
              color: "var(--navy-800)",
              letterSpacing: "var(--tracking-tight)",
              margin: "0 0 var(--sp-3)",
              fontWeight: 700,
            }}
          >
            Your eligibility result
          </h2>
          <EligibilityCheck
            title="Eligibility check · 2026-B intake"
            subtitle={
              summary.allComplete
                ? summary.allMet
                  ? "All criteria met. You can continue."
                  : `${summary.met} of ${summary.total} criteria met. Resolve the items flagged before continuing.`
                : `${summary.pending} of ${summary.total} questions remaining.`
            }
            progress={`${summary.met} / ${summary.total}`}
            criteria={summary.results.map((r) => ({
              name: r.name,
              detail: r.detail,
              status: r.status,
              badge: statusBadge(r.status),
            }))}
          />
        </section>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "var(--sp-4)",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <Button variant="ghost">
              <Icon as={ArrowLeft} />
              Back to overview
            </Button>
          </Link>
          <div
            style={{
              display: "flex",
              gap: "var(--sp-3)",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {savedAt && (
              <span className="t-sm" style={{ color: "var(--gray-600)" }}>
                Draft saved {new Date(savedAt).toLocaleTimeString()}
              </span>
            )}
            {application && (
              <Button variant="ghost" onClick={handleStartOver}>
                <Icon as={RotateCcw} />
                Start over
              </Button>
            )}
            <Button variant="secondary" onClick={handleSaveOnly}>
              Save and resume later
            </Button>
            <Button
              variant="gold"
              onClick={handleContinue}
              disabled={!summary.allComplete}
            >
              Continue
              <Icon as={ArrowRight} />
            </Button>
          </div>
        </div>
      </main>

      <div className="shell" style={{ paddingTop: 0 }}>
        <Footer
          message={
            <>
              <strong style={{ color: "var(--navy-800)" }}>
                Police Service
              </strong>{" "}
              — recruits application portal. Designed with the{" "}
              <Link href="/design-system">Sentinel system</Link>.
            </>
          }
          id="Portal · v1.0 · 2026"
        />
      </div>
    </>
  );
}
