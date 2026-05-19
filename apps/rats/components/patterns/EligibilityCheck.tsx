import type { ReactNode } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon } from "../ui/Icon";

export type EligibilityStatus = "met" | "fail" | "pending";

export type EligibilityCriterion = {
  name: ReactNode;
  detail?: ReactNode;
  status: EligibilityStatus;
  badge?: ReactNode;
};

type EligibilityCheckProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  progress?: ReactNode;
  criteria: EligibilityCriterion[];
};

export function EligibilityCheck({
  title,
  subtitle,
  progress,
  criteria,
}: EligibilityCheckProps) {
  return (
    <div className="eligibility">
      <div className="eligibility__head">
        <div>
          <h4>{title}</h4>
          {subtitle && (
            <p style={{ margin: "4px 0 0", opacity: 0.85, fontSize: 13 }}>
              {subtitle}
            </p>
          )}
        </div>
        {progress && <div className="eligibility__progress">{progress}</div>}
      </div>
      <div className="eligibility__list">
        {criteria.map((c, i) => {
          const statusClass =
            c.status === "met" ? "met" : c.status === "fail" ? "fail" : undefined;
          return (
            <div className={cn("eligibility__row", statusClass)} key={i}>
              <div className="eligibility__check">
                {c.status === "met" ? (
                  <Icon as={Check} />
                ) : c.status === "fail" ? (
                  <Icon as={X} />
                ) : null}
              </div>
              <div>
                <div className="eligibility__name">{c.name}</div>
                {c.detail && <div className="eligibility__detail">{c.detail}</div>}
              </div>
              {c.badge}
            </div>
          );
        })}
      </div>
    </div>
  );
}
