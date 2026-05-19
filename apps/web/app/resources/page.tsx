import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui";
import {
  BookOpenIcon,
  DownloadIcon,
  FileTextIcon,
  GlobeIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Official forms, publications, annual reports, and memoranda of understanding from the Royal Solomon Islands Police Force.",
};

const forms = [
  {
    name: "Police clearance application form",
    meta: "PDF · 2 pages · Updated Jan 2026",
    type: "pdf",
    href: "#",
  },
  {
    name: "Lost property report form",
    meta: "PDF · 1 page · Updated Nov 2025",
    type: "pdf",
    href: "#",
  },
  {
    name: "Vehicle accident report (citizen copy)",
    meta: "PDF · 3 pages · Updated Mar 2026",
    type: "pdf",
    href: "#",
  },
  {
    name: "Firearms licence application",
    meta: "PDF · 4 pages · Updated Jan 2026",
    type: "pdf",
    href: "#",
  },
  {
    name: "Community event security notification",
    meta: "PDF · 1 page · Updated Feb 2026",
    type: "pdf",
    href: "#",
  },
  {
    name: "Victim witness support referral form",
    meta: "PDF · 2 pages · Updated Oct 2025",
    type: "pdf",
    href: "#",
  },
  {
    name: "Crime report (written submission template)",
    meta: "DOCX · 2 pages · Updated Jan 2026",
    type: "word",
    href: "#",
  },
  {
    name: "Officer complaint / feedback form",
    meta: "PDF · 1 page · Updated Jan 2026",
    type: "pdf",
    href: "#",
  },
];

const publications = [
  {
    name: "RSIPF Annual Report 2025",
    meta: "PDF · 88 pages · Published Feb 2026",
    type: "pub",
    badge: "Latest",
    href: "#",
  },
  {
    name: "Strategic Plan 2026–2028",
    meta: "PDF · 32 pages · Published Jan 2026",
    type: "pub",
    badge: "New",
    href: "#",
  },
  {
    name: "Community Policing Framework 2025",
    meta: "PDF · 20 pages · Published Jul 2025",
    type: "pub",
    href: "#",
  },
  {
    name: "RSIPF Annual Report 2024",
    meta: "PDF · 76 pages · Published Mar 2025",
    type: "pub",
    href: "#",
  },
  {
    name: "Family Violence Unit — 2025 Review",
    meta: "PDF · 14 pages · Published Nov 2025",
    type: "pub",
    href: "#",
  },
  {
    name: "Road Safety Campaign Report 2025",
    meta: "PDF · 10 pages · Published Dec 2025",
    type: "pub",
    href: "#",
  },
  {
    name: "Use of Force Policy (public version)",
    meta: "PDF · 8 pages · Published Jun 2024",
    type: "pub",
    href: "#",
  },
  {
    name: "RSIPF Annual Report 2023",
    meta: "PDF · 72 pages · Published Apr 2024",
    type: "pub",
    href: "#",
  },
];

const mous = [
  {
    partner: "Ministry of Education & Human Resource Development",
    type: "Domestic",
    title: "Joint school safety and junior cadet programme",
    scope:
      "Coordination of school visits, road safety education, and the Junior Police Cadet programme across all provinces.",
    signed: "March 2024",
    status: "Active",
  },
  {
    partner: "Family Support Centre (FSC)",
    type: "Domestic",
    title: "Safenet family-violence referral pathway",
    scope:
      "Formalises joint response to family-violence incidents, including victim referral, safe accommodation, and prosecution support.",
    signed: "August 2023",
    status: "Active",
  },
  {
    partner: "Australian Federal Police (AFP)",
    type: "International",
    title: "Capacity building and training assistance",
    scope:
      "AFP advisors embedded at Rove to support detective training, forensics, and leadership development. Renewed annually.",
    signed: "January 2026",
    status: "Active",
  },
  {
    partner: "Pacific Islands Chiefs of Police (PICP)",
    type: "Regional",
    title: "Regional intelligence sharing and mutual assistance",
    scope:
      "Information sharing on transnational crime, human trafficking, and cross-border investigations across the Pacific.",
    signed: "November 2022",
    status: "Active",
  },
  {
    partner: "Solomon Islands Customs & Immigration",
    type: "Domestic",
    title: "Border and port security coordination",
    scope:
      "Joint operations at Henderson Airport and Honiara International Port, including intelligence sharing and interdiction.",
    signed: "June 2023",
    status: "Active",
  },
  {
    partner: "INTERPOL — Oceania National Central Bureau",
    type: "International",
    title: "Access to INTERPOL databases and notices",
    scope:
      "RSIPF participation in INTERPOL databases, red notices, and regional working groups on serious and organised crime.",
    signed: "May 2021",
    status: "Active",
  },
];

function DocIcon({ type }: { type: string }) {
  const cls = `doc-row__icon doc-row__icon--${type === "word" ? "word" : type === "pub" ? "pub" : "pdf"}`;
  return (
    <span className={cls}>
      <FileTextIcon />
    </span>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <section className="page-head">
        <div className="page-head__inner">
          <div className="page-head__eyebrow">★ Resources</div>
          <h1>Official forms, reports & partnerships.</h1>
          <p className="page-head__lede">
            Download public forms, read annual reports and policy publications,
            and view the formal partnerships the RSIPF maintains with domestic
            and international organisations.
          </p>
        </div>
      </section>

      {/* Tab-style section anchors */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-200)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 var(--sp-8)", display: "flex", gap: "var(--sp-1)" }}>
          {[
            { label: "Forms", count: forms.length, href: "#forms" },
            { label: "Publications & Reports", count: publications.length, href: "#publications" },
            { label: "MOUs & Partnerships", count: mous.length, href: "#mous" },
          ].map((t) => (
            <a key={t.href} href={t.href} className="resource-tab">
              {t.label}
              <span className="resource-tab__count">{t.count} items</span>
            </a>
          ))}
        </div>
      </div>

      <section className="page-body">

        {/* ── Forms ── */}
        <div id="forms" style={{ marginBottom: "var(--sp-16)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "var(--sp-4)", marginBottom: "var(--sp-6)", flexWrap: "wrap" }}>
            <div>
              <div className="eyebrow">★ Forms</div>
              <h2 style={{ fontSize: "var(--fs-h1)", color: "var(--navy-800)", margin: "var(--sp-2) 0 var(--sp-2)", fontWeight: 700 }}>
                Public forms & applications
              </h2>
              <p style={{ color: "var(--gray-700)", margin: 0, maxWidth: "60ch" }}>
                Download, complete, and submit at your nearest station. Bring
                photo ID unless stated otherwise. All forms are free.
              </p>
            </div>
          </div>
          <div className="stack-3">
            {forms.map((f) => (
              <div key={f.name} className="doc-row">
                <DocIcon type={f.type} />
                <div>
                  <div className="doc-row__name">{f.name}</div>
                  <div className="doc-row__meta">{f.meta}</div>
                </div>
                <a href={f.href} className="doc-row__action">
                  <DownloadIcon /> Download
                </a>
              </div>
            ))}
          </div>
        </div>

        <hr />

        {/* ── Publications ── */}
        <div id="publications" style={{ margin: "var(--sp-12) 0 var(--sp-16)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "var(--sp-4)", marginBottom: "var(--sp-6)", flexWrap: "wrap" }}>
            <div>
              <div className="eyebrow">★ Publications</div>
              <h2 style={{ fontSize: "var(--fs-h1)", color: "var(--navy-800)", margin: "var(--sp-2) 0 var(--sp-2)", fontWeight: 700 }}>
                Reports & publications
              </h2>
              <p style={{ color: "var(--gray-700)", margin: 0, maxWidth: "60ch" }}>
                Annual reports, strategic plans, policy documents, and research
                publications. All documents are publicly available.
              </p>
            </div>
          </div>
          <div className="stack-3">
            {publications.map((p) => (
              <div key={p.name} className="doc-row">
                <span className="doc-row__icon doc-row__icon--pub">
                  <BookOpenIcon />
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)", flexWrap: "wrap" }}>
                  <div>
                    <div className="doc-row__name">{p.name}</div>
                    <div className="doc-row__meta">{p.meta}</div>
                  </div>
                  {p.badge && <Badge variant="gold">{p.badge}</Badge>}
                </div>
                <a href={p.href} className="doc-row__action">
                  <DownloadIcon /> Download
                </a>
              </div>
            ))}
          </div>
        </div>

        <hr />

        {/* ── MOUs ── */}
        <div id="mous" style={{ marginTop: "var(--sp-12)" }}>
          <div style={{ marginBottom: "var(--sp-6)" }}>
            <div className="eyebrow">★ Partnerships</div>
            <h2 style={{ fontSize: "var(--fs-h1)", color: "var(--navy-800)", margin: "var(--sp-2) 0 var(--sp-2)", fontWeight: 700 }}>
              Memoranda of understanding
            </h2>
            <p style={{ color: "var(--gray-700)", margin: 0, maxWidth: "60ch" }}>
              Formal agreements between the RSIPF and domestic agencies,
              regional bodies, and international partners. All active MOUs are
              reviewed annually.
            </p>
          </div>
          <div className="grid-2">
            {mous.map((m) => (
              <article key={m.title} className="mou-card">
                <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)", marginBottom: "var(--sp-3)" }}>
                  <span className="doc-row__icon doc-row__icon--pub" style={{ width: 36, height: 36, borderRadius: "var(--r-xs)" }}>
                    <GlobeIcon width={18} height={18} />
                  </span>
                  <div className="mou-card__partner">{m.type} · {m.partner}</div>
                </div>
                <h3 className="mou-card__title">{m.title}</h3>
                <p className="mou-card__scope">{m.scope}</p>
                <div className="mou-card__foot">
                  <span>Signed {m.signed}</span>
                  <Badge variant="success">{m.status}</Badge>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{ background: "var(--gray-50)", borderTop: "1px solid var(--gray-200)", borderBottom: "1px solid var(--gray-200)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "var(--sp-12) var(--sp-8)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--sp-8)", flexWrap: "wrap" }}>
          <div>
            <h3 style={{ fontSize: "var(--fs-h3)", color: "var(--navy-800)", margin: "0 0 var(--sp-2)", fontWeight: 700 }}>
              Can't find what you need?
            </h3>
            <p style={{ color: "var(--gray-700)", margin: 0 }}>
              Contact the public affairs office on <strong>23666</strong> or
              email <strong>info@rsipf.gov.sb</strong> — we will direct you to
              the right document or officer.
            </p>
          </div>
          <Link href="/contact" className="btn btn--primary">
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
