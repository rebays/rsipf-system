"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Lock, Mail } from "lucide-react";

import { BrandBar } from "@/components/brand";
import {
  Alert,
  Button,
  Field,
  Icon,
  Input,
  InputGroup,
} from "@/components/ui";
import { useAdminUser } from "@/lib/use-application";

export default function AdminSignInPage() {
  const router = useRouter();
  const { hydrated, adminUser, signIn } = useAdminUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hydrated && adminUser) router.replace("/admin");
  }, [hydrated, adminUser, router]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter your work email and password to continue.");
      return;
    }
    signIn(email.trim());
    router.push("/admin");
  }

  return (
    <>
      <BrandBar
        name="RSIPF · Records Office"
        sub="Staff Portal"
        meta="Records office sign-in"
      />

      <main className="auth-stage">
        <div className="auth-card">
          <div className="auth-card__head">
            <div className="t-eyebrow">★ Staff sign-in</div>
            <h1 className="auth-card__title">Records office portal</h1>
            <p className="auth-card__sub">
              Sign in to review applications and post vetting decisions. Use any
              email and password — this is a simulated login.
            </p>
          </div>

          {error && (
            <div style={{ marginBottom: "var(--sp-4)" }}>
              <Alert variant="danger" dismissible={false} title={error} />
            </div>
          )}

          <form className="stack-5" onSubmit={handleSubmit} noValidate>
            <Field label="Work email" htmlFor="admin-email" required>
              <InputGroup icon={<Icon as={Mail} width={16} height={16} />}>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="records.officer@rsipf.gov"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </Field>

            <Field label="Password" htmlFor="admin-password" required>
              <InputGroup icon={<Icon as={Lock} width={16} height={16} />}>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </Field>

            <Button type="submit" size="lg" style={{ width: "100%" }}>
              Sign in to staff portal
              <Icon as={ArrowRight} />
            </Button>
          </form>

          <div className="auth-card__foot">
            <span>Applicant?</span>
            <Link href="/sign-in" style={{ color: "var(--navy-600)", fontWeight: 600 }}>
              Applicant sign-in →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
