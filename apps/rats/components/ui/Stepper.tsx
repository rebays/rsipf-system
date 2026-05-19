import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export type StepStatus = "done" | "current" | "todo";

export type StepItem = {
  name: ReactNode;
  sub?: ReactNode;
  status: StepStatus;
  num?: ReactNode;
};

export function Stepper({ steps }: { steps: StepItem[] }) {
  return (
    <div className="stepper">
      {steps.map((step, i) => {
        const number = step.num ?? String(i + 1).padStart(2, "0");
        const modifier =
          step.status === "done"
            ? "step--done"
            : step.status === "current"
              ? "step--current"
              : undefined;
        return (
          <div className={cn("step", modifier)} key={i}>
            <div className="step__num">
              {step.status === "done" ? (
                <Icon as={Check} width={14} height={14} />
              ) : (
                number
              )}
            </div>
            <div>
              <div className="step__name">{step.name}</div>
              {step.sub && <div className="step__sub">{step.sub}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
