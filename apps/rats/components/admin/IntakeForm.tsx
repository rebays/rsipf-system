"use client";

import { useEffect, useState } from "react";

import {
  Field,
  Input,
  Select,
  Textarea,
} from "@/components/ui";
import type { Intake, IntakeStatus } from "@/lib/application";
import { newIntake } from "@/lib/application";

type IntakeFormProps = {
  value: Intake | null;
  onChange: (next: Intake) => void;
  lockId?: boolean;
};

function clampNumber(s: string): number {
  const n = Number(s);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
}

export function IntakeForm({ value, onChange, lockId = false }: IntakeFormProps) {
  const [intake, setIntake] = useState<Intake>(() => value ?? newIntake());

  useEffect(() => {
    if (value) setIntake(value);
  }, [value]);

  function update<K extends keyof Intake>(key: K, v: Intake[K]) {
    const next = { ...intake, [key]: v };
    setIntake(next);
    onChange(next);
  }

  return (
    <div className="stack-5">
      <div className="grid-2">
        <Field
          label="Intake code"
          htmlFor="intake-id"
          required
          hint="Short identifier like 2026-B. Cannot contain spaces."
        >
          <Input
            id="intake-id"
            value={intake.id}
            onChange={(e) => update("id", e.target.value.trim().toUpperCase())}
            placeholder="2027-A"
            disabled={lockId}
          />
        </Field>
        <Field label="Display name" htmlFor="intake-name" required>
          <Input
            id="intake-name"
            value={intake.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="2027-A intake"
          />
        </Field>
      </div>

      <Field
        label="Description"
        htmlFor="intake-desc"
        hint="One sentence applicants will see on the landing page."
      >
        <Textarea
          id="intake-desc"
          rows={3}
          value={intake.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="First intake of 2027. Applications open in October — academy starts April."
        />
      </Field>

      <div className="grid-2">
        <Field label="Status" htmlFor="intake-status" required>
          <Select
            id="intake-status"
            value={intake.status}
            onChange={(e) => update("status", e.target.value as IntakeStatus)}
          >
            <option value="draft">Draft — invisible to applicants</option>
            <option value="open">Open — accepting applications</option>
            <option value="closed">Closed — no new applicants, still reviewing</option>
            <option value="completed">Completed — academy class finished</option>
          </Select>
        </Field>
        <Field label="Capacity" htmlFor="intake-capacity" hint="Target intake size.">
          <Input
            id="intake-capacity"
            type="number"
            min={0}
            max={2000}
            value={intake.capacity || ""}
            onChange={(e) => update("capacity", clampNumber(e.target.value))}
            placeholder="80"
          />
        </Field>
      </div>

      <div className="grid-2">
        <Field label="Applications open from" htmlFor="intake-open" required>
          <Input
            id="intake-open"
            type="date"
            value={intake.openDate}
            onChange={(e) => update("openDate", e.target.value)}
          />
        </Field>
        <Field label="Applications close on" htmlFor="intake-close" required>
          <Input
            id="intake-close"
            type="date"
            value={intake.closeDate}
            onChange={(e) => update("closeDate", e.target.value)}
          />
        </Field>
        <Field
          label="Academy starts"
          htmlFor="intake-academy"
          required
          hint="Used to compute applicant age at intake start."
        >
          <Input
            id="intake-academy"
            type="date"
            value={intake.academyStartDate}
            onChange={(e) => update("academyStartDate", e.target.value)}
          />
        </Field>
      </div>
    </div>
  );
}

export function intakeIsValid(intake: Intake): boolean {
  return Boolean(
    intake.id.trim() &&
      /^[A-Z0-9-]+$/.test(intake.id) &&
      intake.name.trim() &&
      intake.openDate &&
      intake.closeDate &&
      intake.academyStartDate,
  );
}
