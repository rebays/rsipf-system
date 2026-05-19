import type { ReactNode } from "react";
import Link from "next/link";
import { Shield } from "./Shield";

type BrandBarProps = {
  name?: ReactNode;
  sub?: ReactNode;
  meta?: ReactNode;
};

export function BrandBar({
  name = "Royal Solomon Islands Police Force",
  sub = "Serve · Protect · Solomon Islands",
  meta = "Emergency 999 · Non-emergency 23666",
}: BrandBarProps) {
  return (
    <header className="brandbar">
      <Link href="/" className="brandbar__id" style={{ color: "inherit", textDecoration: "none" }}>
        <Shield />
        <div>
          <div className="brandbar__name">{name}</div>
          <div className="brandbar__sub">{sub}</div>
        </div>
      </Link>
      <div className="brandbar__meta">{meta}</div>
    </header>
  );
}
