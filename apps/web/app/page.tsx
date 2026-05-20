import Link from "next/link";
import { Badge, LinkButton } from "@/components/ui";
import {
  AlertIcon,
  ArrowRightIcon,
  BookOpenIcon,
  ClipboardIcon,
  EyeIcon,
  CarIcon,
  FileTextIcon,
  FingerprintIcon,
  HandshakeIcon,
  HomeIcon,
  LightbulbIcon,
  MapPinIcon,
  MegaphoneIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "@/components/icons";

const heroActions = [
  {
    href: "tel:999",
    icon: <AlertIcon width={28} height={28} />,
    title: "Emergency 999",
    sub: "Life or property at risk",
    emergency: true,
  },
  {
    href: "/contact",
    icon: <ClipboardIcon width={28} height={28} />,
    title: "Report a crime",
    sub: "Non-emergency report",
  },
  {
    href: "/contact#stations",
    icon: <MapPinIcon width={28} height={28} />,
    title: "Find a station",
    sub: "Provinces & posts",
  },
  {
    href: "/careers",
    icon: <ShieldCheckIcon width={28} height={28} />,
    title: "Join the force",
    sub: "Recruitment portal",
  },
];

const services = [
  {
    icon: <CarIcon width={40} height={40} />,
    title: "Traffic & road safety",
    body: "Patrols, licensing checks, accident response, and road-safety education across the provinces.",
    href: "/services#traffic",
  },
  {
    icon: <UsersIcon width={40} height={40} />,
    title: "Community policing",
    body: "Neighbourhood watch programmes, school visits, and dialogue with traditional leaders.",
    href: "/services#community",
  },
  {
    icon: <FingerprintIcon width={40} height={40} />,
    title: "Criminal investigations",
    body: "Detective branch, forensics, and serious-crime unit working cases across all nine provinces.",
    href: "/services#investigations",
  },
  {
    icon: <ShieldCheckIcon width={40} height={40} />,
    title: "Police clearance",
    body: "Background checks for employment, travel, and immigration. Apply at any station.",
    href: "/services#clearance",
  },
  {
    icon: <EyeIcon width={40} height={40} />,
    title: "Crime prevention",
    body: "Risk advice for businesses and households. Public awareness campaigns and outreach.",
    href: "/services#prevention",
  },
  {
    icon: <HandshakeIcon width={40} height={40} />,
    title: "Victim support",
    body: "Confidential support for victims of crime and family violence, with referrals to partner agencies.",
    href: "/services#victim",
  },
];

const news = [
  {
    category: "Operations",
    date: "12 May 2026",
    title: "Joint patrol initiative expands to Western Province",
    excerpt:
      "Officers from Honiara and Gizo stations begin coordinated patrols to address rising property offences along the coastal road.",
    href: "/news/joint-patrol-western",
    style: "",
  },
  {
    category: "Community",
    date: "07 May 2026",
    title: "Junior Police Cadet programme opens applications",
    excerpt:
      "Year 11 and 12 students are invited to apply for the cadet programme at Rove Police Headquarters.",
    href: "/news/cadet-programme-2026",
    style: "alt",
  },
  {
    category: "Announcement",
    date: "02 May 2026",
    title: "Commissioner addresses parliament on 2026–2028 strategy",
    excerpt:
      "The new strategic plan focuses on community trust, women in policing, and improved response times in rural posts.",
    href: "/news/strategy-2026-2028",
    style: "gold",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Full-page hero ── */}
      <section className="landing-hero">
        <video
          className="landing-hero__video"
          src="/police-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="landing-hero__content">
          <div className="landing-hero__inner">
            <div>
              <div className="landing-hero__eyebrow">
                ★ Royal Solomon Islands Police Force
              </div>
              <h1>Serve. Protect. Stand with Solomon Islands.</h1>
              <p className="landing-hero__lede">
                Safeguarding lives, property, and rights across every province —
                with professionalism, fairness, and respect for the communities
                we serve.
              </p>
            </div>
          </div>
        </div>

        {/* Quick-action strip anchored to the bottom of the hero */}
        <div className="hero-actions">
          {heroActions.map((a) => (
            <a
              key={a.title}
              href={a.href}
              className={`hero-action${a.emergency ? " hero-action--emergency" : ""}`}
            >
              <span className="hero-action__icon">{a.icon}</span>
              <span className="hero-action__text">
                <span className="hero-action__title">{a.title}</span>
                <span className="hero-action__sub">{a.sub}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Announcements bar ── */}
      <div className="announce-bar">
        <div className="announce-bar__inner">
          <span className="announce-bar__label">
            <MegaphoneIcon width={13} height={13} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
            Announcements
          </span>
          <span className="announce-bar__divider" />
          <ul className="announce-bar__items">
            <li className="announce-bar__item">
              <span className="announce-bar__dot" />
              <a href="/news#announcements">2026 recruit intake opens 1 June — <strong>applications now online</strong></a>
            </li>
            <li className="announce-bar__item">
              <span className="announce-bar__dot" />
              <a href="/news#announcements">New community police post opens in Lata, Temotu Province</a>
            </li>
            <li className="announce-bar__item">
              <span className="announce-bar__dot" />
              <a href="/news#announcements">Commissioner's 2026–2028 Strategic Plan — public summary available</a>
            </li>
          </ul>
          <Link href="/news#announcements" className="announce-bar__all">
            View all <ArrowRightIcon width={13} height={13} />
          </Link>
        </div>
      </div>

      {/* ── Services ── */}
      <section className="landing-section">
        <div className="eyebrow">★ How we serve</div>
        <h2>Public services from the RSIPF</h2>
        <p className="landing-section__lede">
          From traffic safety to criminal investigations, our officers work
          across every province to support the people of Solomon Islands.
        </p>
        <div className="value-grid">
          {services.map((s) => (
            <article key={s.title} className="value-card">
              <span className="value-card__icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <Link href={s.href} className="value-card__link">
                Learn more <ArrowRightIcon />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ── News ── */}
      <section className="landing-section landing-section--tinted">
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "var(--sp-20) var(--sp-8)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "var(--sp-6)",
              marginBottom: "var(--sp-10)",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div className="eyebrow">★ Latest from RSIPF</div>
              <h2  style={{ margin: "var(--sp-2) 0 var(--sp-3)" }}>
                News & Announcements
              </h2>
              <p className="landing-section__lede" style={{ margin: 0 }}>
                Operational updates, community programmes, and official
                statements from RSIPF leadership.
              </p>
            </div>
            <LinkButton href="/news" variant="secondary">
              All news <ArrowRightIcon />
            </LinkButton>
          </div>
          <div className="grid-3">
            {news.map((n) => (
              <article key={n.title} className="news-card">
                <div
                  className={`news-card__media${
                    n.style === "alt"
                      ? " news-card__media--alt"
                      : n.style === "gold"
                        ? " news-card__media--gold"
                        : ""
                  }`}
                >
                  <span className="news-card__category">{n.category}</span>
                </div>
                <div className="news-card__body">
                  <div className="news-card__date">{n.date}</div>
                  <h3 className="news-card__title">{n.title}</h3>
                  <p className="news-card__excerpt">{n.excerpt}</p>
                  <Link href={n.href} className="news-card__link">
                    Read more <ArrowRightIcon />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community awareness + Crime prevention ── */}
      <section className="landing-section">
        <div className="awareness-grid">
          {/* Left: community awareness spotlight */}
          <div className="awareness-card">
            <div className="awareness-card__eyebrow">★ Community awareness</div>
            <p className="awareness-card__title">
              Keeping communities informed and safe.
            </p>
            <p className="awareness-card__body">
              The RSIPF publishes regular safety updates, scam alerts, and
              community notices. Sign up for province-level bulletins through
              your nearest station, or read them online.
            </p>
            <div style={{ display: "flex", gap: "var(--sp-3)", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
              <LinkButton href="/news" variant="gold">
                Read notices <ArrowRightIcon />
              </LinkButton>
              <LinkButton href="/contact" variant="secondary" size="default"
                style={{ background: "transparent", color: "var(--white)", borderColor: "rgba(255,255,255,.25)" }}>
                Subscribe at your station
              </LinkButton>
            </div>
          </div>

          {/* Right: crime prevention tips grid */}
          <div>
            <div className="eyebrow">★ Crime prevention advice</div>
            <h3 style={{ fontSize: "var(--fs-h2)", color: "var(--navy-800)", margin: "var(--sp-2) 0 var(--sp-5)", fontWeight: 700, letterSpacing: "var(--tracking-tight)" }}>
              Practical steps to reduce your risk.
            </h3>
            <div className="tip-list">
              {[
                { num: "01", title: "Secure your home", body: "Lock doors and windows when you leave. Fit bolts on external gates. Don't leave valuables visible." },
                { num: "02", title: "Know your neighbours", body: "Neighbourhood watch groups cut property crime. Talk to your ward officer about starting one." },
                { num: "03", title: "Report suspicious activity", body: "If something feels wrong, call Crime Stoppers on 25555. Anonymous tips are taken seriously." },
                { num: "04", title: "Protect your devices", body: "Use PIN locks on phones. Don't share passwords. Scammers often target social media accounts." },
                { num: "05", title: "Safe travel at night", body: "Travel with others where possible. Stick to lit roads. Inform someone of your route." },
                { num: "06", title: "Guard your documents", body: "Store ID, birth certificates, and bank cards safely. Report loss to police immediately." },
              ].map((t) => (
                <div key={t.num} className="tip-card">
                  <div className="tip-card__num">{t.num}</div>
                  <div>
                    <p className="tip-card__title">{t.title}</p>
                    <p className="tip-card__body">{t.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/services#prevention" className="value-card__link" style={{ marginTop: "var(--sp-5)", display: "inline-flex" }}>
              Full crime prevention guide <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quick-access resources strip ── */}
      <section style={{ background: "var(--gray-50)", borderTop: "1px solid var(--gray-200)", borderBottom: "1px solid var(--gray-200)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "var(--sp-10) var(--sp-8)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--sp-4)", marginBottom: "var(--sp-6)", flexWrap: "wrap" }}>
            <h3 style={{ margin: 0, fontSize: "var(--fs-h3)", color: "var(--navy-800)", fontWeight: 700 }}>
              Forms, reports & resources
            </h3>
            <LinkButton href="/resources" variant="secondary">
              Browse all resources <ArrowRightIcon />
            </LinkButton>
          </div>
          <div className="grid-4">
            {[
              { icon: <FileTextIcon width={28} height={28} />, label: "Clearance application", sub: "PDF · Download & return", href: "/resources#forms" },
              { icon: <BookOpenIcon width={28} height={28} />, label: "Annual Report 2025", sub: "Publication · 88 pages", href: "/resources#publications" },
              { icon: <ClipboardIcon width={28} height={28} />, label: "Accident report form", sub: "PDF · Download & return", href: "/resources#forms" },
              { icon: <HomeIcon width={28} height={28} />, label: "MOUs & partnerships", sub: "6 active agreements", href: "/resources#mous" },
            ].map((r) => (
              <Link key={r.label} href={r.href} style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)", padding: "var(--sp-5)", background: "var(--white)", border: "1px solid var(--gray-200)", borderRadius: "var(--r-sm)", textDecoration: "none", transition: "box-shadow var(--dur) var(--ease), transform var(--dur) var(--ease)" }}
                onMouseOver={undefined}>
                <span style={{ color: "var(--navy-700)" }}>{r.icon}</span>
                <span style={{ fontWeight: 700, color: "var(--navy-800)", fontSize: "var(--fs-sm)" }}>{r.label}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--gray-600)", textTransform: "uppercase", letterSpacing: ".04em" }}>{r.sub}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="landing-section">
        <div className="grid-2" style={{ alignItems: "center", gap: "var(--sp-16)" }}>
          <div>
            <div className="eyebrow">★ Our commitment</div>
            <h2>Policing built on trust, integrity, and partnership.</h2>
            <p
              style={{
                color: "var(--gray-700)",
                fontSize: "var(--fs-lg)",
                lineHeight: "var(--lh-loose)",
                margin: "var(--sp-4) 0 var(--sp-6)",
              }}
            >
              Every officer is held to the same standard: act fairly, respect
              human dignity, and uphold the law without favour.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--sp-4)",
              }}
            >
              {[
                { icon: <ScaleIcon width={22} height={22} />, label: "Lawful", desc: "We act within the law, without fear or favour." },
                { icon: <ShieldCheckIcon width={22} height={22} />, label: "Honest", desc: "Integrity is non-negotiable." },
                { icon: <HandshakeIcon width={22} height={22} />, label: "Respectful", desc: "Every person is treated with dignity." },
                { icon: <EyeIcon width={22} height={22} />, label: "Accountable", desc: "Our work is open to public scrutiny." },
              ].map((v) => (
                <div key={v.label}>
                  <span style={{ color: "var(--gold-700)" }}>{v.icon}</span>
                  <h4 style={{ margin: "var(--sp-2) 0 var(--sp-1)", color: "var(--navy-800)" }}>
                    {v.label}
                  </h4>
                  <p style={{ fontSize: "var(--fs-sm)", color: "var(--gray-700)", margin: 0 }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="card card--accent" style={{ padding: "var(--sp-8)" }}>
              <Badge variant="gold">In focus</Badge>
              <h3
                style={{
                  fontSize: "var(--fs-h2)",
                  color: "var(--navy-800)",
                  margin: "var(--sp-3) 0 var(--sp-4)",
                  letterSpacing: "var(--tracking-tight)",
                }}
              >
                Strategic Plan 2026–2028
              </h3>
              <p
                style={{
                  color: "var(--gray-700)",
                  lineHeight: "var(--lh-loose)",
                  margin: "0 0 var(--sp-5)",
                }}
              >
                Four priorities guide RSIPF over the next three years: community
                trust, women in policing, rural response, and digital evidence
                handling.
              </p>
              <LinkButton href="/about#strategy" variant="primary">
                View strategic priorities <ArrowRightIcon />
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── Careers CTA ── */}
      <section className="cta-strip">
        <div className="cta-strip__inner">
          <div>
            <h3>Considering a career in policing?</h3>
            <p>
              Applications for the next recruit class open soon. Sworn service
              starts with the academy at Rove, with intakes from all nine
              provinces.
            </p>
          </div>
          <div style={{ display: "flex", gap: "var(--sp-3)", flexWrap: "wrap", alignItems: "center" }}>
            <Badge variant="gold">Recruiting · 2026 intake</Badge>
            <LinkButton href="/careers" variant="gold" size="lg">
              Apply to join <ArrowRightIcon />
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
