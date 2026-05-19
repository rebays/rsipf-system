import type { ComponentProps, ReactNode } from "react";

type CheckboxProps = Omit<ComponentProps<"input">, "type"> & {
  label: ReactNode;
};

export function Checkbox({ label, ...rest }: CheckboxProps) {
  return (
    <label className="check">
      <input type="checkbox" {...rest} />
      <span className="check__box" />
      <span className="check__label">{label}</span>
    </label>
  );
}

type RadioProps = Omit<ComponentProps<"input">, "type"> & {
  label: ReactNode;
};

export function Radio({ label, ...rest }: RadioProps) {
  return (
    <label className="radio">
      <input type="radio" {...rest} />
      <span className="radio__box" />
      <span className="check__label">{label}</span>
    </label>
  );
}

type ToggleProps = Omit<ComponentProps<"input">, "type"> & {
  label: ReactNode;
};

export function Toggle({ label, style, ...rest }: ToggleProps) {
  return (
    <label className="toggle" style={style}>
      <input type="checkbox" {...rest} />
      <span className="toggle__track" />
      <span className="check__label">{label}</span>
    </label>
  );
}
