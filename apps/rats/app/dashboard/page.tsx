"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Edit,
  FilePlus,
  LogOut,
  MapPin,
} from "lucide-react";

import {
  Alert,
  AppCard,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  CardHead,
  CardSub,
  CardTitle,
  Empty,
  Icon,
  Stepper,
  type StepItem,
} from "@/components/ui";
import { ProgressOverview } from "@/components/patterns";
import {
  STAGES,
  applicationProgress,
  nextIncompleteStage,
  stageState,
  type Application,
} from "@/lib/application";
import { useApplication, useUser } from "@/lib/use-application";

function initialsFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  const parts = local.split(/[._-]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return (local.slice(0, 2) || "AP").toUpperCase();
}

export default function DashboardOverview() {
  const router = useRouter();
  const { hydrated: appHydrated, application, remove } = useApplication();
  const { hydrated: userHydrated, user, signOut } = useUser();

  useEffect(() => {
    if (userHydrated && !user) router.replace("/sign-in");
  }, [userHydrated, user, router]);

  if (!appHydrated || !userHydrated) {
    return (
      <p className="t-sm" style={{ color: "var(--gray-600)" }}>
        Loading your dashboard…
      </p>
    );
  }

  if (!user) return null;

  function handleDiscard() {
    if (
      typeof window !== "undefined" &&
      !window.confirm("Discard this application and start a new one?")
    ) {
      return;
    }
    remove();
  }

  function handleSignOut() {
    signOut();
    router.push("/");
  }

  const greetingName = user.email.split("@")[0] ?? "applicant";
  const initials = initialsFromEmail(user.email);

  return (
    <>
      <Breadcrumbs items={[{ label: "Application" }, { label: "Overview" }]} />

      <header style={{ margin: "var(--sp-5) 0 var(--sp-6)" }}>
        <div className="t-eyebrow">★ Signed in as {user.email}</div>
        <h1
          style={{
            fontSize: "var(--fs-h1)",
            color: "var(--navy-800)",
            letterSpacing: "var(--tracking-tight)",
            margin: "var(--sp-3) 0 var(--sp-2)",
            fontWeight: 700,
          }}
        >
          Welcome, {greetingName}
        </h1>
        <p
          className="t-lg"
          style={{ color: "var(--gray-700)", margin: 0, maxWidth: "60ch" }}
        >
          Your applicant dashboard. Continue editing your draft, check your
          eligibility result, or submit when you&apos;re ready.
        </p>
      </header>

      {!application ? (
        <NoApplicationView onSignOut={handleSignOut} />
      ) : application.status === "submitted" ? (
        <SubmittedView
          application={application}
          onSignOut={handleSignOut}
          onDiscard={handleDiscard}
        />
      ) : (
        <DraftView
          application={application}
          initials={initials}
          email={user.email}
          onSignOut={handleSignOut}
          onDiscard={handleDiscard}
        />
      )}
    </>
  );
}

function NoApplicationView({ onSignOut }: { onSignOut: () => void }) {
  return (
    <div className="stack-6">
      <Empty
        icon={FilePlus}
        title="No application yet"
        body="Start your application by completing the eligibility check. It takes about ten minutes and your answers are saved automatically."
        action={
          <Link href="/apply" style={{ textDecoration: "none" }}>
            <Button>
              Start eligibility check
              <Icon as={ArrowRight} />
            </Button>
          </Link>
        }
      />
      <div style={{ textAlign: "right" }}>
        <Button variant="ghost" onClick={onSignOut}>
          <Icon as={LogOut} />
          Sign out
        </Button>
      </div>
    </div>
  );
}

function DraftView({
  application,
  initials,
  email,
  onSignOut,
  onDiscard,
}: {
  application: Application;
  initials: string;
  email: string;
  onSignOut: () => void;
  onDiscard: () => void;
}) {
  const progress = applicationProgress(application);
  const next = nextIncompleteStage(application);
  const stages = STAGES.filter((s) => s.contributesToProgress);

  const steps: StepItem[] = stages.map((stage) => {
    const s = stageState(application, stage.key);
    return {
      name: stage.name,
      sub: s.detail,
      status: s.complete ? "done" : next?.key === stage.key ? "current" : "todo",
    };
  });

  return (
    <div className="stack-6">
      <ProgressOverview
        eyebrow="★ Your application · 2026-B intake"
        heading={
          progress.readyToSubmit
            ? "Every section complete — ready to submit"
            : `${progress.completedStages} of ${progress.totalStages} sections complete`
        }
        badge={
          progress.readyToSubmit ? (
            <Badge variant="success">Ready to submit</Badge>
          ) : (
            <Badge variant="solid">In progress</Badge>
          )
        }
        percent={progress.percent}
        footnote={
          progress.readyToSubmit ? (
            <>
              Head to{" "}
              <Link href="/dashboard/submit" style={{ color: "var(--navy-600)" }}>
                Review &amp; submit
              </Link>{" "}
              to lock your application for review.
            </>
          ) : next ? (
            <>
              Next up — <strong style={{ color: "var(--gray-900)" }}>{next.name}</strong>. {next.description}
            </>
          ) : (
            "Pick up wherever you left off."
          )
        }
      />

      <AppCard
        initials={initials}
        name={email}
        applicantId={`${application.applicantId} · Cohort 2026-B`}
        meta={
          <>
            <span>
              <Icon as={MapPin} />
              {application.personal.provinceOfOrigin || "Solomon Islands"}
            </span>
            <span>
              <Icon as={Calendar} />
              Started {new Date(application.createdAt).toLocaleDateString()}
            </span>
            <span>
              <Icon as={ClipboardList} />
              {progress.completedStages} of {progress.totalStages} sections
            </span>
          </>
        }
        badge={
          progress.readyToSubmit ? (
            <Badge variant="success">Ready</Badge>
          ) : (
            <Badge variant="info">Draft</Badge>
          )
        }
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
          Application stages
        </h3>
        <Stepper steps={steps} />
      </section>

      <Card>
        <CardHead>
          <div>
            <CardTitle>What you can do next</CardTitle>
            <CardSub>
              {next
                ? `Continue with ${next.name} when you're ready.`
                : "All sections are complete. Submit your application below."}
            </CardSub>
          </div>
          {progress.readyToSubmit && <Badge variant="gold">Ready to submit</Badge>}
        </CardHead>
        <div className="btn-row">
          {next ? (
            <Link href={next.href} style={{ textDecoration: "none" }}>
              <Button>
                Continue {next.name.toLowerCase()}
                <Icon as={ArrowRight} />
              </Button>
            </Link>
          ) : null}
          <Link href="/dashboard/submit" style={{ textDecoration: "none" }}>
            <Button variant={progress.readyToSubmit ? "gold" : "secondary"}>
              <Icon as={progress.readyToSubmit ? CheckCircle2 : Edit} />
              Review &amp; submit
            </Button>
          </Link>
        </div>
      </Card>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "var(--sp-4)",
          gap: "var(--sp-3)",
          flexWrap: "wrap",
        }}
      >
        <Button variant="ghost" onClick={onDiscard}>
          Discard draft and start over
        </Button>
        <Button variant="ghost" onClick={onSignOut}>
          <Icon as={LogOut} />
          Sign out
        </Button>
      </div>
    </div>
  );
}

function SubmittedView({
  application,
  onSignOut,
  onDiscard,
}: {
  application: Application;
  onSignOut: () => void;
  onDiscard: () => void;
}) {
  return (
    <div className="stack-6">
      <Alert
        variant="success"
        dismissible={false}
        title="Application submitted."
        body={
          <>
            Submitted on{" "}
            {application.submittedAt
              ? new Date(application.submittedAt).toLocaleString()
              : "now"}
            . Reference{" "}
            <span className="t-mono">{application.applicantId}</span>.
            We&apos;ll email you when the next stage opens.
          </>
        }
      />

      <Card accent>
        <CardHead>
          <div>
            <CardTitle>What happens next</CardTitle>
            <CardSub>
              You can&apos;t edit your application now that it&apos;s submitted.
            </CardSub>
          </div>
          <Badge variant="solid">Submitted</Badge>
        </CardHead>
        <ol
          style={{
            paddingLeft: "var(--sp-5)",
            color: "var(--gray-700)",
            margin: 0,
            fontSize: "var(--fs-base)",
            lineHeight: "var(--lh-loose)",
          }}
        >
          <li>
            Director, Human Resources routes your file to the Recruitment Panel,
            who verify documents, run a criminal-record check, and contact your
            referees.
          </li>
          <li>
            If shortlisted, you sit the entrance examination, the Entry Fitness
            Test, and a selection interview. Dates appear in your dashboard.
          </li>
          <li>
            The Final Selection Report goes to the Commissioner of Police.
            Successful applicants are announced through the Solomon Star and
            SIBC.
          </li>
        </ol>
      </Card>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "var(--sp-4)",
          gap: "var(--sp-3)",
          flexWrap: "wrap",
        }}
      >
        <Button variant="ghost" onClick={onDiscard}>
          Withdraw and start over
        </Button>
        <Button variant="ghost" onClick={onSignOut}>
          <Icon as={LogOut} />
          Sign out
        </Button>
      </div>
    </div>
  );
}
