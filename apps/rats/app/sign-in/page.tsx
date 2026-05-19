"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Lock, Mail } from "lucide-react";

import { BrandBar } from "@/components/brand";
import {
  Alert,
  Button,
  Checkbox,
  Field,
  Icon,
  Input,
  InputGroup,
} from "@/components/ui";
import { useApplication, useUser } from "@/lib/use-application";

export default function SignInPage() {
  const router = useRouter();
  const { hydrated, application } = useApplication();
  const { user, signIn } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter an email and password to continue.");
      return;
    }
    signIn(email.trim());
    router.push("/dashboard");
  }

  return (
    <>
      <BrandBar
        name="Police Service · Recruits"
        sub="Online Application Portal"
        meta="Sign in"
      />

      <main className="auth-stage">
        <div className="auth-card">
          <div className="auth-card__head">
            <div className="t-eyebrow">★ Applicant sign in</div>
            <h1 className="auth-card__title">Welcome back</h1>
            <p className="auth-card__sub">
              Sign in with any email and password (this is a simulated login)
              to continue your application.
            </p>
          </div>

          {hydrated && application && (
            <div style={{ marginBottom: "var(--sp-5)" }}>
              <Alert
                variant="info"
                dismissible={false}
                title="Draft application waiting"
                body={`Sign in to claim and continue ${application.applicantId}.`}
              />
            </div>
          )}

          {error && (
            <div style={{ marginBottom: "var(--sp-4)" }}>
              <Alert
                variant="danger"
                dismissible={false}
                title={error}
              />
            </div>
          )}

          <form className="stack-5" onSubmit={handleSubmit} noValidate>
            <Field label="Email address" htmlFor="signin-email" required>
              <InputGroup icon={<Icon as={Mail} width={16} height={16} />}>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </Field>

            <Field
              label="Password"
              htmlFor="signin-password"
              required
              hint={
                <Link
                  href="/sign-in"
                  style={{ color: "var(--navy-600)" }}
                >
                  Forgot your password?
                </Link>
              }
            >
              <InputGroup icon={<Icon as={Lock} width={16} height={16} />}>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </Field>

            <Checkbox defaultChecked label="Keep me signed in on this device" />

            <Button type="submit" size="lg" style={{ width: "100%" }}>
              Sign in
              <Icon as={ArrowRight} />
            </Button>
          </form>

          <div className="auth-card__foot">
            <span>New to the portal?</span>
            <Link
              href="/apply"
              style={{ color: "var(--navy-600)", fontWeight: 600 }}
            >
              Start an application →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
