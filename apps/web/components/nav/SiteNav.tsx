"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  BookOpenIcon,
  CarIcon,
  ClipboardIcon,
  EyeIcon,
  FileTextIcon,
  FingerprintIcon,
  GlobeIcon,
  HandshakeIcon,
  LightbulbIcon,
  MapPinIcon,
  MegaphoneIcon,
  NewsIcon,
  PhoneIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "@/components/icons";

function Chevron() {
  return (
    <svg
      className="sitenav__chevron"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="4 6 8 10 12 6" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      width="20"
      height="20"
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </>
      )}
    </svg>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="sitenav" aria-label="Primary" data-open={open ? "true" : "false"}>
      <div className="sitenav__inner">
        <button
          type="button"
          className="sitenav__toggle"
          aria-expanded={open}
          aria-controls="sitenav-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} />
          <span className="sitenav__toggle-label">{open ? "Close" : "Menu"}</span>
        </button>

        <a href="tel:999" className="sitenav__emergency sitenav__emergency--mobile">
          <PhoneIcon width={13} height={13} />
          <strong>999</strong>
        </a>

        <div id="sitenav-panel" className="sitenav__panel">
          <ul className="sitenav__links" onClick={close}>

          {/* ── About ── */}
          <li className="sitenav__item">
            <Link href="/about" className="sitenav__link">
              About <Chevron />
            </Link>
            <div className="mega-menu" role="region" aria-label="About submenu">
              <div className="mega-col">
                <div className="mega-col__head">The Force</div>
                <Link href="/about" className="mega-link">
                  <span className="mega-link__title">
                    <ShieldCheckIcon /> About the RSIPF
                  </span>
                  <span className="mega-link__desc">History, mission, and how we're organised</span>
                </Link>
                <Link href="/about#strategy" className="mega-link">
                  <span className="mega-link__title">
                    <ScaleIcon /> Strategic Plan 2026–2028
                  </span>
                  <span className="mega-link__desc">Four priorities guiding the force over three years</span>
                </Link>
                <Link href="/about#integrity" className="mega-link">
                  <span className="mega-link__title">
                    <EyeIcon /> Integrity & complaints
                  </span>
                  <span className="mega-link__desc">Professional Standards Unit and how to report misconduct</span>
                </Link>
              </div>
              <div className="mega-col">
                <div className="mega-col__head">Leadership & Partnerships</div>
                <Link href="/about#leadership" className="mega-link">
                  <span className="mega-link__title">
                    <UsersIcon /> Commissioner's Office
                  </span>
                  <span className="mega-link__desc">Commissioner, Deputy Commissioners, executive team</span>
                </Link>
                <Link href="/about#mous" className="mega-link">
                  <span className="mega-link__title">
                    <GlobeIcon /> MOUs & partnerships
                  </span>
                  <span className="mega-link__desc">Domestic, regional, and international agreements</span>
                </Link>
                <Link href="/resources#publications" className="mega-link mega-link--featured">
                  <span className="mega-link__title">
                    <BookOpenIcon /> Annual Report 2025
                  </span>
                  <span className="mega-link__desc">Download the latest public report →</span>
                </Link>
              </div>
            </div>
          </li>

          {/* ── Services & Safety ── */}
          <li className="sitenav__item">
            <Link href="/services" className="sitenav__link">
              Services &amp; Safety <Chevron />
            </Link>
            <div className="mega-menu" role="region" aria-label="Services submenu">
              <div className="mega-col">
                <div className="mega-col__head">Public Services</div>
                <Link href="/services#clearance" className="mega-link">
                  <span className="mega-link__title">
                    <FileTextIcon /> Police clearance
                  </span>
                  <span className="mega-link__desc">Background checks for employment, travel & visas</span>
                </Link>
                <Link href="/services#traffic" className="mega-link">
                  <span className="mega-link__title">
                    <CarIcon /> Traffic & road safety
                  </span>
                  <span className="mega-link__desc">Licensing, accidents, road policing</span>
                </Link>
                <Link href="/services#community" className="mega-link">
                  <span className="mega-link__title">
                    <UsersIcon /> Community policing
                  </span>
                  <span className="mega-link__desc">Neighbourhood watch, school & village engagement</span>
                </Link>
                <Link href="/services#investigations" className="mega-link">
                  <span className="mega-link__title">
                    <FingerprintIcon /> Criminal investigations
                  </span>
                  <span className="mega-link__desc">Detective branch, forensics, serious crime</span>
                </Link>
                <Link href="/services#victim" className="mega-link">
                  <span className="mega-link__title">
                    <HandshakeIcon /> Victim support
                  </span>
                  <span className="mega-link__desc">Confidential support and referrals</span>
                </Link>
              </div>
              <div className="mega-col">
                <div className="mega-col__head">Safety & Prevention</div>
                <Link href="/services#prevention" className="mega-link">
                  <span className="mega-link__title">
                    <EyeIcon /> Crime prevention advice
                  </span>
                  <span className="mega-link__desc">Tips for home, community, online & business</span>
                </Link>
                <Link href="/services#awareness" className="mega-link">
                  <span className="mega-link__title">
                    <LightbulbIcon /> Community awareness
                  </span>
                  <span className="mega-link__desc">Safety notices, scam alerts & bulletins</span>
                </Link>
                <Link href="/resources#forms" className="mega-link">
                  <span className="mega-link__title">
                    <ClipboardIcon /> Download forms
                  </span>
                  <span className="mega-link__desc">Clearance, accident report, lost property & more</span>
                </Link>
                <Link href="/contact" className="mega-link mega-link--featured">
                  <span className="mega-link__title">
                    <PhoneIcon /> Request a service
                  </span>
                  <span className="mega-link__desc">Contact a station or submit a request online →</span>
                </Link>
              </div>
            </div>
          </li>

          {/* ── News & Resources ── */}
          <li className="sitenav__item">
            <Link href="/news" className="sitenav__link">
              News &amp; Resources <Chevron />
            </Link>
            <div className="mega-menu mega-menu--wide" role="region" aria-label="News and resources submenu">
              <div className="mega-col">
                <div className="mega-col__head">News & Media</div>
                <Link href="/news#announcements" className="mega-link">
                  <span className="mega-link__title">
                    <MegaphoneIcon /> Announcements
                  </span>
                  <span className="mega-link__desc">Official notices, traffic alerts & public advisories</span>
                </Link>
                <Link href="/news#featured" className="mega-link">
                  <span className="mega-link__title">
                    <NewsIcon /> Featured articles
                  </span>
                  <span className="mega-link__desc">In-depth reporting on RSIPF operations & programmes</span>
                </Link>
                <Link href="/news#latest" className="mega-link">
                  <span className="mega-link__title">
                    <ArrowRightIcon /> Latest news
                  </span>
                  <span className="mega-link__desc">Community, operations & statements</span>
                </Link>
              </div>
              <div className="mega-col">
                <div className="mega-col__head">Documents & Resources</div>
                <Link href="/resources#forms" className="mega-link">
                  <span className="mega-link__title">
                    <FileTextIcon /> Forms & applications
                  </span>
                  <span className="mega-link__desc">Downloadable public forms — all free</span>
                </Link>
                <Link href="/resources#publications" className="mega-link">
                  <span className="mega-link__title">
                    <BookOpenIcon /> Publications & reports
                  </span>
                  <span className="mega-link__desc">Annual reports, strategic plans, policy docs</span>
                </Link>
                <Link href="/resources#mous" className="mega-link">
                  <span className="mega-link__title">
                    <GlobeIcon /> MOUs & partnerships
                  </span>
                  <span className="mega-link__desc">Formal agreements with domestic & international partners</span>
                </Link>
                <Link href="/resources" className="mega-link mega-link--featured">
                  <span className="mega-link__title">
                    <ArrowRightIcon /> All resources
                  </span>
                  <span className="mega-link__desc">Browse the full document library →</span>
                </Link>
              </div>
            </div>
          </li>

          {/* ── Contact ── */}
          <li className="sitenav__item">
            <Link href="/contact" className="sitenav__link">
              Contact
            </Link>
          </li>

          </ul>

          {/* Right-side CTA */}
          <div className="sitenav__cta">
            <Link href="/careers" className="sitenav__careers" onClick={close}>
              Careers
            </Link>
            <a href="tel:999" className="sitenav__emergency">
              <PhoneIcon width={13} height={13} />
              Emergency <strong>999</strong>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
