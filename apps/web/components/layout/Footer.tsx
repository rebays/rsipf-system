import Link from "next/link";
import { Shield } from "@/components/brand/Shield";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__brand-id">
            <Shield />
            <div>
              <div className="footer__brand-name">RSIPF</div>
              <div className="footer__brand-sub">Royal Solomon Islands Police Force</div>
            </div>
          </div>
          <p className="footer__tagline">
            We protect life and property, prevent crime, and uphold the law with
            fairness and respect for every person we serve.
          </p>
        </div>
        <div className="footer__col">
          <h4>Get help</h4>
          <ul>
            <li><a href="tel:999">Emergency · 999</a></li>
            <li><a href="tel:23666">Non-emergency · 23666</a></li>
            <li><Link href="/contact">Report a crime</Link></li>
            <li><Link href="/contact#stations">Find a station</Link></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>The force</h4>
          <ul>
            <li><Link href="/about">About RSIPF</Link></li>
            <li><Link href="/about#leadership">Leadership</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/news">News & media</Link></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Join us</h4>
          <ul>
            <li><Link href="/careers">Recruitment</Link></li>
            <li><a href="https://rsipf.gov.sb" rel="noreferrer">Government portal</a></li>
            <li><Link href="/contact#feedback">Community feedback</Link></li>
            <li><Link href="/about#integrity">Integrity & complaints</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Royal Solomon Islands Police Force</span>
        <span>v1.0 · Sentinel DS · 2026</span>
      </div>
    </footer>
  );
}
