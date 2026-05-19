import type { ComponentProps, ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type FieldProps = {
  label: ReactNode;
  htmlFor?: string;
  required?: boolean;
  hint?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
};

export function Field({ label, htmlFor, required, hint, error, children }: FieldProps) {
  return (
    <div className="field">
      {htmlFor ? (
        <label className="field__label" htmlFor={htmlFor}>
          {label}
          {required && <span className="req">*</span>}
        </label>
      ) : (
        <span className="field__label">
          {label}
          {required && <span className="req">*</span>}
        </span>
      )}
      {children}
      {error ? (
        <span className="field__err">
          <Icon as={AlertCircle} width={13} height={13} />
          {error}
        </span>
      ) : hint ? (
        <span className="field__hint">{hint}</span>
      ) : null}
    </div>
  );
}

type InputProps = ComponentProps<"input"> & { invalid?: boolean };

export function Input({ invalid, className, type = "text", ...rest }: InputProps) {
  return (
    <input
      type={type}
      className={cn("input", invalid && "input--err", className)}
      {...rest}
    />
  );
}

type SelectProps = ComponentProps<"select">;

export function Select({ className, ...rest }: SelectProps) {
  return <select className={cn("select", className)} {...rest} />;
}

type TextareaProps = ComponentProps<"textarea">;

export function Textarea({ className, ...rest }: TextareaProps) {
  return <textarea className={cn("textarea", className)} {...rest} />;
}

type InputGroupProps = {
  icon: ReactNode;
  children: ReactNode;
};

export function InputGroup({ icon, children }: InputGroupProps) {
  return (
    <div className="input-group">
      <span className="input-group__icon">{icon}</span>
      {children}
    </div>
  );
}
