"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { StageHeader, StageNav } from "@/components/dashboard";
import {
  Alert,
  Badge,
  Checkbox,
  Field,
  Input,
  Select,
  Textarea,
} from "@/components/ui";
import {
  EMPTY_ADDRESS,
  EMPTY_DRIVER_LICENCE,
  EMPTY_PERSONAL,
  SI_PROVINCES,
  emptyApplication,
  stageState,
  type Application,
  type Gender,
  type Personal,
} from "@/lib/application";
import { useApplication, useUser } from "@/lib/use-application";

function yesNoValue(b: boolean | null): string {
  return b === null ? "" : b ? "yes" : "no";
}
function parseYesNo(s: string): boolean | null {
  return s === "" ? null : s === "yes";
}

export default function PersonalPage() {
  const router = useRouter();
  const { hydrated, application, save } = useApplication();
  const { hydrated: userHydrated, user } = useUser();
  const [personal, setPersonal] = useState<Personal>({
    ...EMPTY_PERSONAL,
    address: { ...EMPTY_ADDRESS },
    postalAddress: { ...EMPTY_ADDRESS },
    driverLicence: { ...EMPTY_DRIVER_LICENCE },
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
        postalAddress: { ...application.personal.postalAddress },
        driverLicence: { ...application.personal.driverLicence },
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
  function updatePostal<K extends keyof Personal["postalAddress"]>(
    key: K,
    value: Personal["postalAddress"][K],
  ) {
    setPersonal((prev) => ({
      ...prev,
      postalAddress: { ...prev.postalAddress, [key]: value },
    }));
  }
  function updateLicence<K extends keyof Personal["driverLicence"]>(
    key: K,
    value: Personal["driverLicence"][K],
  ) {
    setPersonal((prev) => ({
      ...prev,
      driverLicence: { ...prev.driverLicence, [key]: value },
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
          { label: "Personal particulars" },
        ]}
        title="Personal particulars"
        lede="Your legal name, date and place of birth, contact details, address, and driver's licence. Match the spelling on your government-issued ID exactly."
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
          title="Verified against your ID and birth certificate."
          body="The records officer will check these details when they review your uploaded documents."
        />

        <section>
          <h3 style={sectionHeading}>Identity</h3>
          <div className="grid-2">
            <Field
              label="Full legal name (last + first)"
              htmlFor="pers-fullname"
              required
              hint="As it appears on your birth certificate or passport."
            >
              <Input
                id="pers-fullname"
                value={personal.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="Tagivetua Joycelyn"
                autoComplete="name"
              />
            </Field>
            <Field
              label="Second / middle name(s)"
              htmlFor="pers-secondname"
              hint="Leave blank if you have none."
            >
              <Input
                id="pers-secondname"
                value={personal.secondName}
                onChange={(e) => update("secondName", e.target.value)}
                placeholder="Marina"
                autoComplete="additional-name"
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
                placeholder="Joycelyn"
                autoComplete="nickname"
              />
            </Field>
            <Field label="National ID number" htmlFor="pers-id">
              <Input
                id="pers-id"
                value={personal.nationalId}
                onChange={(e) => update("nationalId", e.target.value)}
                placeholder="As issued"
                inputMode="numeric"
              />
            </Field>
          </div>
        </section>

        <section>
          <h3 style={sectionHeading}>Birth & origin</h3>
          <div className="grid-2">
            <Field label="Date of birth" htmlFor="pers-dob" required>
              <Input
                id="pers-dob"
                type="date"
                value={personal.dob}
                onChange={(e) => update("dob", e.target.value)}
              />
            </Field>
            <Field label="Gender" htmlFor="pers-gender" required>
              <Select
                id="pers-gender"
                value={personal.gender ?? ""}
                onChange={(e) =>
                  update(
                    "gender",
                    e.target.value === "" ? null : (e.target.value as Gender),
                  )
                }
              >
                <option value="">Choose…</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </Field>
            <Field label="Place of birth" htmlFor="pers-birthplace" required>
              <Input
                id="pers-birthplace"
                value={personal.birthPlace}
                onChange={(e) => update("birthPlace", e.target.value)}
                placeholder="Town or village"
              />
            </Field>
            <Field
              label="Province of origin"
              htmlFor="pers-province-origin"
              required
            >
              <Select
                id="pers-province-origin"
                value={personal.provinceOfOrigin}
                onChange={(e) => update("provinceOfOrigin", e.target.value)}
              >
                <option value="">Choose…</option>
                {SI_PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Select>
            </Field>
            <Field
              label="Province of birth"
              htmlFor="pers-province-birth"
              hint="Only if different from your province of origin."
            >
              <Select
                id="pers-province-birth"
                value={personal.provinceOfBirth}
                onChange={(e) => update("provinceOfBirth", e.target.value)}
              >
                <option value="">Same as province of origin</option>
                {SI_PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Select>
            </Field>
            <Field
              label="Religious denomination (church)"
              htmlFor="pers-religion"
              required
            >
              <Input
                id="pers-religion"
                value={personal.religion}
                onChange={(e) => update("religion", e.target.value)}
                placeholder="e.g. Anglican, SDA, Catholic, None"
              />
            </Field>
          </div>
        </section>

        <section>
          <h3 style={sectionHeading}>Contact</h3>
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
                placeholder="+677 000 0000"
                autoComplete="tel"
              />
            </Field>
          </div>
        </section>

        <section>
          <h3 style={sectionHeading}>Current home address</h3>
          <div className="grid-2">
            <Field label="Street address" htmlFor="pers-street" required>
              <Input
                id="pers-street"
                value={personal.address.street}
                onChange={(e) => updateAddress("street", e.target.value)}
                placeholder="House and street"
                autoComplete="address-line1"
              />
            </Field>
            <Field label="Town / village" htmlFor="pers-city" required>
              <Input
                id="pers-city"
                value={personal.address.city}
                onChange={(e) => updateAddress("city", e.target.value)}
                placeholder="Honiara"
                autoComplete="address-level2"
              />
            </Field>
            <Field label="Province" htmlFor="pers-region" required>
              <Select
                id="pers-region"
                value={personal.address.region}
                onChange={(e) => updateAddress("region", e.target.value)}
              >
                <option value="">Choose…</option>
                {SI_PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Postcode" htmlFor="pers-postcode">
              <Input
                id="pers-postcode"
                value={personal.address.postcode}
                onChange={(e) => updateAddress("postcode", e.target.value)}
                placeholder="Optional"
                autoComplete="postal-code"
              />
            </Field>
          </div>
        </section>

        <section>
          <h3 style={sectionHeading}>Postal address</h3>
          <div style={{ marginBottom: "var(--sp-4)" }}>
            <Checkbox
              checked={personal.postalSameAsHome}
              onChange={(e) => update("postalSameAsHome", e.target.checked)}
              label="My postal address is the same as my home address"
            />
          </div>
          {!personal.postalSameAsHome && (
            <div className="grid-2">
              <Field label="Postal street / PO Box" htmlFor="post-street" required>
                <Input
                  id="post-street"
                  value={personal.postalAddress.street}
                  onChange={(e) => updatePostal("street", e.target.value)}
                  placeholder="PO Box 123 or street"
                />
              </Field>
              <Field label="Town" htmlFor="post-city" required>
                <Input
                  id="post-city"
                  value={personal.postalAddress.city}
                  onChange={(e) => updatePostal("city", e.target.value)}
                />
              </Field>
              <Field label="Province" htmlFor="post-region" required>
                <Select
                  id="post-region"
                  value={personal.postalAddress.region}
                  onChange={(e) => updatePostal("region", e.target.value)}
                >
                  <option value="">Choose…</option>
                  {SI_PROVINCES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Postcode" htmlFor="post-postcode">
                <Input
                  id="post-postcode"
                  value={personal.postalAddress.postcode}
                  onChange={(e) => updatePostal("postcode", e.target.value)}
                />
              </Field>
            </div>
          )}
        </section>

        <section>
          <h3 style={sectionHeading}>Driver&apos;s licence</h3>
          <p
            className="t-sm"
            style={{ color: "var(--gray-700)", margin: "0 0 var(--sp-4)" }}
          >
            Informational only — a driver&apos;s licence is not required to apply.
          </p>
          <Field
            label="Do you have a current driver's licence?"
            htmlFor="lic-has"
            required
          >
            <Select
              id="lic-has"
              value={yesNoValue(personal.driverLicence.hasLicence)}
              onChange={(e) =>
                updateLicence("hasLicence", parseYesNo(e.target.value))
              }
            >
              <option value="">Choose…</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
          </Field>
          {personal.driverLicence.hasLicence && (
            <div className="grid-2" style={{ marginTop: "var(--sp-4)" }}>
              <Field label="Licence number" htmlFor="lic-num" required>
                <Input
                  id="lic-num"
                  value={personal.driverLicence.number}
                  onChange={(e) => updateLicence("number", e.target.value)}
                />
              </Field>
              <Field
                label="Class(es)"
                htmlFor="lic-class"
                required
                hint="e.g. A, B, C — list every class on your licence."
              >
                <Input
                  id="lic-class"
                  value={personal.driverLicence.classes}
                  onChange={(e) => updateLicence("classes", e.target.value)}
                />
              </Field>
              <Field label="Expiry" htmlFor="lic-expiry" required>
                <Input
                  id="lic-expiry"
                  type="month"
                  value={personal.driverLicence.expiry}
                  onChange={(e) => updateLicence("expiry", e.target.value)}
                />
              </Field>
            </div>
          )}
        </section>

        <section>
          <h3 style={sectionHeading}>Identifying marks</h3>
          <Field
            label="Marks, scars, tattoos, or other identifying features"
            htmlFor="pers-marks"
            hint="Used by the records office for identity verification. If you have none, write 'None'."
          >
            <Textarea
              id="pers-marks"
              value={personal.marks}
              onChange={(e) => update("marks", e.target.value)}
              placeholder="None / describe any visible marks"
              rows={3}
            />
          </Field>
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
