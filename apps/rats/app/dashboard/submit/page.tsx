"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowRight, CheckCircle2, Edit } from "lucide-react";

import { StageHeader, StageNav } from "@/components/dashboard";
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
import {
  STAGES,
  applicationProgress,
  pushToAdminQueue,
  stageState,
  type Application,
  type StageMeta,
} from "@/lib/application";
import { useApplication, useUser } from "@/lib/use-application";

function statusBadge(complete: boolean, passing: boolean) {
  if (passing) return <Badge variant="success">Complete</Badge>;
  if (complete) return <Badge variant="warn">Needs attention</Badge>;
  return <Badge variant="info">In progress</Badge>;
}

function SummaryRow({
  stage,
  application,
}: {
  stage: StageMeta;
  application: Application;
}) {
  const s = stageState(application, stage.key);
  return (
    <div className="summary-row">
      <div>
        <div className="summary-row__name">{stage.name}</div>
        <div className="summary-row__detail">{s.detail}</div>
      </div>
      {statusBadge(s.complete, s.passing)}
      <Link href={stage.href} style={{ textDecoration: "none" }}>
        <Button size="sm" variant="ghost">
          <Icon as={Edit} />
          Edit
        </Button>
      </Link>
    </div>
  );
}

export default function SubmitPage() {
  const router = useRouter();
  const { hydrated, application, save } = useApplication();
  const { hydrated: userHydrated, user } = useUser();

  useEffect(() => {
    if (userHydrated && !user) router.replace("/sign-in");
  }, [userHydrated, user, router]);

  if (!hydrated || !userHydrated) return null;
  if (!user) return null;

  if (!application) {
    return (
      <>
        <StageHeader
          crumbs={[
            { label: "Application", href: "/dashboard" },
            { label: "Review & submit" },
          ]}
          title="Review & submit"
          lede="There's nothing to review yet — start your application from the dashboard."
        />
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <Button>Back to overview</Button>
        </Link>
      </>
    );
  }

  if (application.status === "submitted") {
    router.replace("/dashboard");
    return null;
  }

  const progress = applicationProgress(application);
  const orderedStages = STAGES.filter((s) => s.contributesToProgress);

  function handleSubmit() {
    if (!application) return;
    if (
      typeof window !== "undefined" &&
      !window.confirm(
        "Submit your application now? You won't be able to edit anything after this.",
      )
    ) {
      return;
    }
    const submitted: Application = {
      ...application,
      status: "submitted",
      submittedAt: new Date().toISOString(),
      ownerEmail: application.ownerEmail ?? user?.email,
    };
    save(submitted);
    pushToAdminQueue(submitted);
    router.push("/dashboard");
  }

  return (
    <>
      <StageHeader
        crumbs={[
          { label: "Application", href: "/dashboard" },
          { label: "Review & submit" },
        ]}
        title="Review & submit"
        lede="Confirm every section is correct. Once submitted, your application locks for review and you won't be able to change it."
        meta={
          progress.readyToSubmit ? (
            <Badge variant="success">Ready to submit</Badge>
          ) : (
            <Badge variant="warn">{progress.completedStages} of {progress.totalStages} sections complete</Badge>
          )
        }
      />

      <div className="stack-6">
        {!progress.readyToSubmit && (
          <Alert
            variant="warn"
            dismissible={false}
            title="Not ready to submit yet."
            body="At least one section needs attention. Use the Edit buttons below to resolve each item, then come back here."
          />
        )}

        <section>
          <h3
            style={{
              fontSize: "var(--fs-h3)",
              color: "var(--navy-800)",
              fontWeight: 700,
              margin: "0 0 var(--sp-4)",
            }}
          >
            Application sections
          </h3>
          <div className="stack-3">
            {orderedStages.map((stage) => (
              <SummaryRow
                key={stage.key}
                stage={stage}
                application={application}
              />
            ))}
          </div>
        </section>

        <Card accent>
          <CardHead>
            <div>
              <CardTitle>Submit your application</CardTitle>
              <CardSub>
                Reference {application.applicantId}. After submission, only your
                recruiter can request changes.
              </CardSub>
            </div>
            {progress.readyToSubmit ? (
              <Badge variant="gold">Ready</Badge>
            ) : (
              <Badge variant="warn">Pending</Badge>
            )}
          </CardHead>
          <p
            className="t-sm"
            style={{ color: "var(--gray-700)", margin: "0 0 var(--sp-4)" }}
          >
            By submitting, you confirm the information on this application is
            accurate, you authorise verification of identity and references,
            and you consent to the medical and fitness assessment process.
          </p>
          <Button
            variant="gold"
            size="lg"
            onClick={handleSubmit}
            disabled={!progress.readyToSubmit}
          >
            <Icon as={CheckCircle2} />
            Submit application
          </Button>
        </Card>

        <StageNav
          backHref="/dashboard/background"
          backLabel="Back to background check"
          extra={
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
              <Button variant="ghost">
                Go to overview
                <Icon as={ArrowRight} />
              </Button>
            </Link>
          }
        />
      </div>
    </>
  );
}
