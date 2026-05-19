import type { ReactNode } from "react";

type FooterProps = {
  message?: ReactNode;
  id?: ReactNode;
};

export function Footer({
  message = (
    <>
      <strong style={{ color: "var(--navy-800)" }}>Sentinel</strong> — recruitment
      portal design system. Built for clarity, calm, and the trust the badge
      represents.
    </>
  ),
  id = "DS · v1.0 · 2026",
}: FooterProps) {
  return (
    <footer className="footer">
      <div>{message}</div>
      <div className="footer__id">{id}</div>
    </footer>
  );
}
