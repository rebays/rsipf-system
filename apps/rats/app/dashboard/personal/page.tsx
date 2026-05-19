"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { StageHeader, StageNav } from "@/components/dashboard";
import { Alert, Badge, Field, Input } from "@/components/ui";
import {
  EMPTY_PERSONAL,
  emptyApplication,
  type Application,
  type Personal,
  stageState,
} from "@/lib/application";
import { useApplication, useUser } from "@/lib/use-application";

export default function PersonalPage() {
  const router = useRouter();
  const { hydrated, application, save } = useApplication();
  const { hydrated: userHydrated, user } = useUser();
  const [personal, setPersonal] = useState<Personal>({
    ...EMPTY_PERSONAL,
    address: { ...EMPTY_PERSONAL.address },
  });
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (userHydrated && !user) router.replace("/sign-in");
  }, [userHydrated, user, router]);

  useEffect(() => {
    if (application?.personal) {
      setPersonal({
        ...application.personal,
        address: { ...application.personal.address },
      });
      setSavedAt(application.updatedAt);
    } else if (user) {
      setPersonal((prev) => ({ ...prev, email: prev.email || user.email }));
    }
  }, [application, user]);

  if (!hydrated || !userHydrated) return null;
  if (!user) return null;
  if (application?.status === "submitted") {
    router.replace("/dashboard");
    return null;
  }

  function update<K extends keyof Personal>(key: K, value: Personal[K]) {
    setPersonal((prev) => ({ ...prev, [key]: value }));
  }
  function updateAddress<K extends keyof Personal["address"]>(
    key: K,
    value: Personal["address"][K],
  ) {
    setPersonal((prev) => ({
      ...prev,
      address: { ...prev.address, [key]: value },
    }));
  }

  function persist(): Application {
    const base = application ?? emptyApplication();
    const saved = save({
      ...base,
      personal,
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
    router.push("/dashboard/education");
  }

  const probe = stageState(
    application
      ? { ...application, personal }
      : { ...emptyApplication(), personal },
    "personal",
  );

  return (
    <>
      <StageHeader
        crumbs={[
          { label: "Application", href: "/dashboard" },
          { label: "Personal details" },
        ]}
        title="Personal details"
        lede="Your legal name, contact, and current address. Match the spelling on your government-issued ID exactly."
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
          title="Verified against your national ID."
          body="The records officer will check these details when they review your uploaded documents."
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
            Identity
          </h3>
          <div className="grid-2">
            <Field
              label="Full legal name"
              htmlFor="pers-fullname"
              required
              hint="As it appears on your government-issued ID."
            >
              <Input
                id="pers-fullname"
                value={personal.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="Jane Adaeze Okafor"
                autoComplete="name"
              />
            </Field>
            <Field
              label="Preferred name"
              htmlFor="pers-preferred"
              hint="Optional — how recruiters should address you."
            >
              <Input
                id="pers-preferred"
                value={personal.preferredName}
                onChange={(e) => update("preferredName", e.target.value)}
                placeholder="Jane"
                autoComplete="nickname"
              />
            </Field>
            <Field label="National ID number" htmlFor="pers-id" required>
              <Input
                id="pers-id"
                value={personal.nationalId}
                onChange={(e) => update("nationalId", e.target.value)}
                placeholder="12345678901"
                inputMode="numeric"
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
            Contact
          </h3>
          <div className="grid-2">
            <Field label="Email address" htmlFor="pers-email" required>
              <Input
                id="pers-email"
                type="email"
                value={personal.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </Field>
            <Field label="Phone number" htmlFor="pers-phone" required>
              <Input
                id="pers-phone"
                type="tel"
                value={personal.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+234 800 000 0000"
                autoComplete="tel"
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
            Address
          </h3>
          <div className="grid-2">
            <Field label="Street address" htmlFor="pers-street" required>
              <Input
                id="pers-street"
                value={personal.address.street}
                onChange={(e) => updateAddress("street", e.target.value)}
                placeholder="14 Oba Akran Avenue"
                autoComplete="address-line1"
              />
            </Field>
            <Field label="City" htmlFor="pers-city" required>
              <Input
                id="pers-city"
                value={personal.address.city}
                onChange={(e) => updateAddress("city", e.target.value)}
                placeholder="Ikeja"
                autoComplete="address-level2"
              />
            </Field>
            <Field label="Region / state" htmlFor="pers-region" required>
              <Input
                id="pers-region"
                value={personal.address.region}
                onChange={(e) => updateAddress("region", e.target.value)}
                placeholder="Lagos"
                autoComplete="address-level1"
              />
            </Field>
            <Field label="Postcode" htmlFor="pers-postcode">
              <Input
                id="pers-postcode"
                value={personal.address.postcode}
                onChange={(e) => updateAddress("postcode", e.target.value)}
                placeholder="100271"
                autoComplete="postal-code"
              />
            </Field>
          </div>
        </section>

        <StageNav
          backHref="/dashboard"
          onSave={handleSave}
          onContinue={handleContinue}
          continueLabel="Save and continue to education"
          continueDisabled={!probe.complete}
          savedAt={savedAt}
        />
      </div>
    </>
  );
}
