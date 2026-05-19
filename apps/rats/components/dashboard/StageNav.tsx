"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import type { ReactNode } from "react";

import { Button, Icon } from "@/components/ui";

type StageNavProps = {
  backHref?: string;
  backLabel?: string;
  onSave?: () => void;
  saveLabel?: string;
  onContinue?: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  savedAt?: string | null;
  extra?: ReactNode;
};

export function StageNav({
  backHref,
  backLabel = "Back to overview",
  onSave,
  saveLabel = "Save and exit",
  onContinue,
  continueLabel = "Save and continue",
  continueDisabled = false,
  savedAt,
  extra,
}: StageNavProps) {
  return (
    <div className="stage-nav">
      <div className="stage-nav__left">
        {backHref ? (
          <Link href={backHref} style={{ textDecoration: "none" }}>
            <Button variant="ghost">
              <Icon as={ArrowLeft} />
              {backLabel}
            </Button>
          </Link>
        ) : (
          <span />
        )}
      </div>
      <div className="stage-nav__right">
        {savedAt && (
          <span className="t-sm" style={{ color: "var(--gray-600)" }}>
            Saved {new Date(savedAt).toLocaleTimeString()}
          </span>
        )}
        {extra}
        {onSave && (
          <Button variant="secondary" onClick={onSave}>
            <Icon as={Save} />
            {saveLabel}
          </Button>
        )}
        {onContinue && (
          <Button variant="gold" onClick={onContinue} disabled={continueDisabled}>
            {continueLabel}
            <Icon as={ArrowRight} />
          </Button>
        )}
      </div>
    </div>
  );
}
