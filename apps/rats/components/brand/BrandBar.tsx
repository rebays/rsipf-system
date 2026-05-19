import type { ReactNode } from "react";
import { Shield } from "./Shield";
import Image from "next/image";
type BrandBarProps = {
  name?: ReactNode;
  sub?: ReactNode;
  meta?: ReactNode;
};

export function BrandBar({
  name = "RATS · Design System",
  sub = "RSIPF Recruits Application Portal",
  meta = "v1.0 · 2026",
}: BrandBarProps) {
  return (
    <header className="brandbar">
      <div className="brandbar__id">
        <Image src="/rsipf-logo.png" alt="RATS logo" width={64} height={68} />
        {/* <Shield /> */}
        <div>
          <div className="brandbar__name">{name}</div>
          <div className="brandbar__sub">{sub}</div>
        </div>
      </div>
      <div className="brandbar__meta">{meta}</div>
    </header>
  );
}
