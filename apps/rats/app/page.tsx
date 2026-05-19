"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarOff,
  ClipboardCheck,
  Fingerprint,
  ShieldCheck,
} from "lucide-react";

import { BrandBar, Seal } from "@/components/brand";
import { Footer } from "@/components/layout";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardHead,
  CardSub,
  CardTitle,
  Empty,
  Icon,
} from "@/components/ui";
import { useIntakes } from "@/lib/use-application";
import type { Intake } from "@/lib/application";

function fmt(date: string): string {
  if (!date) return "—";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function HomePage() {
  const { hydrated, intakes } = useIntakes();
  const open = intakes.filter((i) => i.status === "open");
  const primary: Intake | undefined = open[0];

  return (
    <>
      <BrandBar
        name="Police Service · Recruits"
        sub="Online Application Portal"
        meta={
          hydrated && primary
            ? `${primary.name} · Open`
            : "Online Application Portal"
        }
      />

      <section className="landing-hero">
        <div className="landing-hero__inner">
          <div>
            <div className="landing-hero__eyebrow">
              ★{" "}
              {hydrated && primary
                ? `${primary.name} · applications open`
                : open.length === 0 && hydrated
                  ? "No intake currently open"
                  : "Recruits portal"}
            </div>
            <h1>Serve with integrity. Apply with confidence.</h1>
            <p className="landing-hero__lede">
              The Police Service recruits application portal carries you from
              first interest to academy entry — every stage signposted, every
              document tracked, every decision documented.
            </p>
            <div className="landing-hero__cta">
              {hydrated && primary ? (
                <Link
                  href={`/apply?intake=${primary.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="gold" size="lg">
                    Start your application
                    <Icon as={ArrowRight} />
                  </Button>
                </Link>
              ) : (
                <Button variant="gold" size="lg" disabled>
                  Applications closed
                </Button>
              )}
              <Link href="/sign-in" style={{ textDecoration: "none" }}>
                <Button variant="secondary" size="lg">
                  Sign in to continue
                </Button>
              </Link>
            </div>
          </div>
          <Seal className="landing-hero__seal" />
        </div>
      </section>

      <section className="landing-section">
        <h2>Open intakes</h2>
        <p className="landing-section__lede">
          Recruit classes accepting applications right now. Each intake has its
          own academy start date and closing date.
        </p>

        {!hydrated ? (
          <p className="t-sm" style={{ color: "var(--gray-600)" }}>
            Loading…
          </p>
        ) : open.length === 0 ? (
          <Empty
            icon={CalendarOff}
            title="No intakes are open today"
            body="Applications open ahead of each academy class. Check back soon, or sign in if you already have a draft in progress."
            action={
              <Link href="/sign-in" style={{ textDecoration: "none" }}>
                <Button variant="secondary">Sign in</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid-2">
            {open.map((intake) => (
              <Card key={intake.id} accent>
                <CardHead>
                  <div>
                    <CardTitle>{intake.name}</CardTitle>
                    <CardSub>
                      Applications close {fmt(intake.closeDate)} · academy
                      starts {fmt(intake.academyStartDate)}
                    </CardSub>
                  </div>
                  <Badge variant="gold">Open</Badge>
                </CardHead>
                <p
                  className="t-sm"
                  style={{
                    color: "var(--gray-700)",
                    margin: "0 0 var(--sp-4)",
                  }}
                >
                  {intake.description || "Recruit class accepting applications."}
                </p>
                <Link
                  href={`/apply?intake=${intake.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="gold">
                    Apply to {intake.name}
                    <Icon as={ArrowRight} />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="landing-section">
        <h2>What to expect from the application</h2>
        <p className="landing-section__lede">
          Seven stages, roughly twelve to sixteen weeks end-to-end. Each step
          builds on the last; you can pause and return whenever you need to.
        </p>
        <div className="value-grid">
          <article className="value-card">
            <Icon as={ClipboardCheck} className="value-card__icon" />
            <h3>1. Eligibility</h3>
            <p>
              A short self-assessment against the published criteria. Most
              applicants complete this in under ten minutes.
            </p>
          </article>
          <article className="value-card">
            <Icon as={ShieldCheck} className="value-card__icon" />
            <h3>2. Documents &amp; identity</h3>
            <p>
              Upload your ID, transcripts, and proof of address. A records
              officer verifies each item; we will email you when a status
              changes.
            </p>
          </article>
          <article className="value-card value-card--gold">
            <Icon as={Fingerprint} className="value-card__icon" />
            <h3>3. Assessments &amp; decision</h3>
            <p>
              Written, physical, psychological, medical, and background
              clearance — followed by a conditional offer for the academy class.
            </p>
          </article>
        </div>
      </section>

      <section className="cta-strip">
        <div className="cta-strip__inner">
          <div>
            <h3>Ready when you are.</h3>
            <p>
              Start with the eligibility check — it takes about ten minutes and
              tells you immediately whether to proceed.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: "var(--sp-3)",
              alignItems: "center",
            }}
          >
            {primary && <Badge variant="solid">{primary.id}</Badge>}
            {primary ? (
              <Link
                href={`/apply?intake=${primary.id}`}
                style={{ textDecoration: "none" }}
              >
                <Button variant="gold">
                  Check eligibility
                  <Icon as={ArrowRight} />
                </Button>
              </Link>
            ) : (
              <Button variant="gold" disabled>
                Applications closed
              </Button>
            )}
          </div>
        </div>
      </section>

      {hydrated && open.length === 0 && (
        <div className="shell" style={{ paddingTop: 0 }}>
          <Alert
            variant="info"
            dismissible={false}
            title="How to be notified when an intake opens"
            body="Sign in to the portal and your saved draft will reactivate automatically when the next class opens."
          />
        </div>
      )}

      <div
        className="shell"
        style={{ paddingTop: "var(--sp-12)", paddingBottom: "var(--sp-12)" }}
      >
        <Footer
          message={
            <>
              <strong style={{ color: "var(--navy-800)" }}>Police Service</strong>{" "}
              — recruits application portal. View the underlying{" "}
              <Link href="/design-system">Sentinel design system</Link> or{" "}
              <Link href="/admin/sign-in">staff sign-in</Link>.
            </>
          }
          id="Portal · v1.0 · 2026"
        />
      </div>
    </>
  );
}
