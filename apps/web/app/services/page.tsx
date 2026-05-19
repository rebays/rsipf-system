import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Card, CardHead, CardSub, CardTitle, LinkButton } from "@/components/ui";
import {
  ArrowRightIcon,
  CarIcon,
  CheckCircleIcon,
  ClipboardIcon,
  DownloadIcon,
  EyeIcon,
  FileTextIcon,
  FingerprintIcon,
  HandshakeIcon,
  LightbulbIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Police clearance, community policing, traffic, criminal investigations, crime prevention advice, and public forms from the RSIPF.",
};

const services = [
  {
    id: "clearance",
    icon: <ShieldCheckIcon width={32} height={32} />,
    title: "Police clearance certificates",
    sub: "Background checks for employment, travel & visas",
    body: "Apply at any major station with photo ID, proof of address, and the SBD 50 fee. Most certificates are ready within 10 working days. For overseas visa applications, allow 15 days.",
    badge: "Most requested",
    badgeVariant: "gold" as const,
  },
  {
    id: "traffic",
    icon: <CarIcon width={32} height={32} />,
    title: "Traffic & road safety",
    sub: "Licensing, accidents, road policing",
    body: "Patrols across Honiara and provincial roads, accident response, vehicle licensing checks, and road-safety education for schools and workplaces.",
  },
  {
    id: "community",
    icon: <UsersIcon width={32} height={32} />,
    title: "Community policing",
    sub: "Visible, locally-rooted policing",
    body: "Neighbourhood watch programmes, school engagement, partnerships with traditional leaders, and community awareness on drugs, family violence, and youth offending.",
  },
  {
    id: "investigations",
    icon: <FingerprintIcon width={32} height={32} />,
    title: "Criminal investigations",
    sub: "Detective branch, forensics, serious crime",
    body: "Investigation of all reported offences, with specialised units for sexual offences, family violence, fraud, and homicide. Forensic services based at Rove.",
  },
  {
    id: "victim",
    icon: <HandshakeIcon width={32} height={32} />,
    title: "Victim support",
    sub: "Confidential support and referrals",
    body: "Trained officers support victims of crime, family violence, and sexual offences. We coordinate with the Safenet referral pathway and the Family Support Centre.",
  },
  {
    id: "awareness",
    icon: <LightbulbIcon width={32} height={32} />,
    title: "Community awareness",
    sub: "Safety notices, scam alerts & education",
    body: "Regular safety bulletins, scam alerts, and public-awareness campaigns distributed through stations, community meetings, and the RSIPF website.",
  },
];

const preventionTips = [
  {
    category: "At home",
    tips: [
      { title: "Lock up", detail: "Lock all doors, windows, and gates when you leave or sleep. Don't hide spare keys outside." },
      { title: "Know your neighbours", detail: "Register with a neighbourhood watch group. A community that looks out for each other is harder to target." },
      { title: "Light it up", detail: "Motion-sensitive lights deter nighttime intruders. Keep entry paths well-lit." },
    ],
  },
  {
    category: "In the community",
    tips: [
      { title: "Report suspicious activity", detail: "Call Crime Stoppers on 25555 — anonymous, free, and taken seriously by the duty officer." },
      { title: "Safe travel at night", detail: "Travel with others where possible. Stick to lit roads and inform someone of your route." },
      { title: "Public spaces", detail: "Keep bags secure and valuables out of sight. Be aware of your surroundings in crowded markets and transport hubs." },
    ],
  },
  {
    category: "Online & financial",
    tips: [
      { title: "Recognise scams", detail: "Unexpected calls or messages asking for money or personal details are almost always scams. Hang up and report to police." },
      { title: "Secure your devices", detail: "Use PIN locks and don't share passwords. Enable remote-wipe on phones in case of theft." },
      { title: "Guard your documents", detail: "Store ID, birth certificates, and bank cards safely. Report loss to police immediately — even if you think you just misplaced it." },
    ],
  },
  {
    category: "For businesses",
    tips: [
      { title: "Security assessment", detail: "RSIPF officers can visit your premises and give free advice on security measures. Call your local station." },
      { title: "Staff safety protocols", detail: "Train staff on opening/closing procedures, cash handling, and what to do in a robbery." },
      { title: "CCTV and alarms", detail: "Visible cameras and alarm systems deter opportunistic theft. Ensure footage is stored securely and accessible to police if needed." },
    ],
  },
];

const forms = [
  { name: "Police clearance application form", meta: "PDF · 2 pages", type: "pdf", href: "/resources#forms" },
  { name: "Lost property report form", meta: "PDF · 1 page", type: "pdf", href: "/resources#forms" },
  { name: "Vehicle accident report (citizen copy)", meta: "PDF · 3 pages", type: "pdf", href: "/resources#forms" },
  { name: "Community event security notification", meta: "PDF · 1 page", type: "pdf", href: "/resources#forms" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="page-head">
        <div className="page-head__inner">
          <div className="page-head__eyebrow">★ Public services</div>
          <h1>What the RSIPF can do for you.</h1>
          <p className="page-head__lede">
            From clearance certificates to community awareness programmes — our
            officers and civilian staff deliver a wide range of public
            services. Most are free; some require a small administrative fee.
          </p>
        </div>
      </section>

      {/* ── Core services ── */}
      <section className="page-body" style={{ paddingBottom: 0 }}>
        <div className="eyebrow">★ Core services</div>
        <h2 style={{ fontSize: "var(--fs-h1)", color: "var(--navy-800)", margin: "var(--sp-2) 0 var(--sp-3)", fontWeight: 700 }}>
          How we serve the public
        </h2>
        <p style={{ color: "var(--gray-700)", fontSize: "var(--fs-lg)", margin: "0 0 var(--sp-8)", maxWidth: "60ch", lineHeight: "var(--lh-loose)" }}>
          Our officers work across every province. Each unit is here to support
          the people of Solomon Islands.
        </p>
        <div className="grid-2">
          {services.map((s) => (
            <Card key={s.id} id={s.id} accent={!!s.badge}>
              <CardHead>
                <div style={{ display: "flex", gap: "var(--sp-4)", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--navy-700)", flex: "0 0 auto" }}>{s.icon}</span>
                  <div>
                    <CardTitle>{s.title}</CardTitle>
                    <CardSub>{s.sub}</CardSub>
                  </div>
                </div>
                {s.badge && <Badge variant={s.badgeVariant}>{s.badge}</Badge>}
              </CardHead>
              <p style={{ color: "var(--gray-700)", margin: "var(--sp-3) 0 var(--sp-4)", lineHeight: "var(--lh-loose)", fontSize: "var(--fs-sm)" }}>
                {s.body}
              </p>
              <Link href={`/contact#${s.id}`} className="value-card__link">
                Enquire about this service <ArrowRightIcon />
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Crime prevention advice ── */}
      <section className="page-body" id="prevention" style={{ paddingTop: "var(--sp-12)", paddingBottom: 0 }}>
        <hr style={{ marginBottom: "var(--sp-12)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "var(--sp-4)", marginBottom: "var(--sp-8)", flexWrap: "wrap" }}>
          <div>
            <div className="eyebrow">★ Crime prevention</div>
            <h2 style={{ fontSize: "var(--fs-h1)", color: "var(--navy-800)", margin: "var(--sp-2) 0 var(--sp-2)", fontWeight: 700 }}>
              Practical advice to reduce your risk
            </h2>
            <p style={{ color: "var(--gray-700)", margin: 0, maxWidth: "60ch" }}>
              Small changes in routine significantly reduce the chance of becoming
              a victim. Our crime prevention unit can also visit your home or
              business for a free security assessment.
            </p>
          </div>
          <LinkButton href="/contact" variant="secondary">
            Request a free assessment <ArrowRightIcon />
          </LinkButton>
        </div>
        <div className="grid-2">
          {preventionTips.map((cat) => (
            <div key={cat.category}>
              <h3 style={{ fontSize: "var(--fs-h4)", color: "var(--navy-700)", fontWeight: 700, margin: "0 0 var(--sp-4)", display: "flex", alignItems: "center", gap: "var(--sp-2)" }}>
                <EyeIcon width={18} height={18} /> {cat.category}
              </h3>
              <div className="stack-3">
                {cat.tips.map((t) => (
                  <div key={t.title} style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: "var(--sp-3)", alignItems: "flex-start", padding: "var(--sp-4)", background: "var(--white)", border: "1px solid var(--gray-200)", borderRadius: "var(--r-sm)" }}>
                    <CheckCircleIcon width={18} height={18} style={{ color: "var(--success-600)", marginTop: 2 }} />
                    <div>
                      <p style={{ fontWeight: 700, color: "var(--navy-800)", margin: "0 0 var(--sp-1)", fontSize: "var(--fs-sm)" }}>{t.title}</p>
                      <p style={{ color: "var(--gray-700)", fontSize: "var(--fs-sm)", margin: 0, lineHeight: "var(--lh-loose)" }}>{t.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Common forms quick-access ── */}
      <section className="page-body" id="forms" style={{ paddingTop: "var(--sp-12)" }}>
        <hr style={{ marginBottom: "var(--sp-12)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "var(--sp-4)", marginBottom: "var(--sp-6)", flexWrap: "wrap" }}>
          <div>
            <div className="eyebrow">★ Forms</div>
            <h2 style={{ fontSize: "var(--fs-h1)", color: "var(--navy-800)", margin: "var(--sp-2) 0 var(--sp-2)", fontWeight: 700 }}>
              Commonly used forms
            </h2>
            <p style={{ color: "var(--gray-700)", margin: 0, maxWidth: "60ch" }}>
              Download, complete, and submit at your nearest station. All forms
              are free. Bring photo ID unless the form states otherwise.
            </p>
          </div>
          <LinkButton href="/resources#forms" variant="secondary">
            All forms &amp; documents <ArrowRightIcon />
          </LinkButton>
        </div>
        <div className="stack-3">
          {forms.map((f) => (
            <div key={f.name} className="doc-row">
              <span className="doc-row__icon doc-row__icon--pdf">
                <FileTextIcon />
              </span>
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

        <div style={{ marginTop: "var(--sp-8)", display: "flex", gap: "var(--sp-3)", flexWrap: "wrap" }}>
          <LinkButton href="/resources" variant="primary">
            Browse all resources <ArrowRightIcon />
          </LinkButton>
          <LinkButton href="/contact" variant="secondary">
            Contact us for help
          </LinkButton>
        </div>
      </section>
    </>
  );
}
