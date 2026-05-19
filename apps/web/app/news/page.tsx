import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui";
import { ArrowRightIcon, MegaphoneIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "News & media",
  description:
    "Operational updates, announcements, featured articles, and official statements from the Royal Solomon Islands Police Force.",
};

const announcements = [
  {
    date: "19 May 2026",
    title: "2026 recruit intake opens 1 June — applications now online",
    body: "The RSIPF recruits portal opens for applications on 1 June 2026. The academy class begins September 2026. All eligible Solomon Islands citizens are encouraged to apply.",
    href: "/careers",
    badge: "Recruitment",
    badgeVariant: "gold" as const,
    pinned: true,
  },
  {
    date: "15 May 2026",
    title: "Temporary road closures — Mendana Avenue, 20–22 May",
    body: "Mendana Avenue between the Central Market and the High Court will be closed 20–22 May for scheduled utility works. Use the Burns Creek bypass. Police will be on point duty.",
    href: "#",
    badge: "Traffic",
    badgeVariant: "warn" as const,
    pinned: false,
  },
  {
    date: "08 May 2026",
    title: "Commissioner's 2026–2028 Strategic Plan — public summary available",
    body: "A public summary of the new strategic plan has been published on the RSIPF website. Print copies are available at all major stations. A public consultation session will be held in Honiara on 28 May.",
    href: "/resources#publications",
    badge: "Announcement",
    badgeVariant: "info" as const,
    pinned: false,
  },
  {
    date: "02 May 2026",
    title: "New community police post opens in Lata, Temotu Province",
    body: "Two officers are now permanently stationed at Lata, with weekly patrol visits to the outer Reef Islands by boat. Community members may contact the post on 53003.",
    href: "#",
    badge: "Operations",
    badgeVariant: "neutral" as const,
    pinned: false,
  },
];

const featured = [
  {
    tag: "★ Feature",
    date: "12 May 2026",
    title: "Joint patrol initiative expands to Western Province",
    excerpt:
      "Officers from Honiara and Gizo stations begin coordinated patrols to address rising property offences along the coastal road. The expanded patrols follow a successful three-month pilot in Honiara's eastern wards, which saw a 22% reduction in break-and-enter reports.",
    href: "#",
    style: "",
  },
  {
    tag: "★ In-depth",
    date: "21 Apr 2026",
    title: "One year of the Family Violence Task Force",
    excerpt:
      "A joint task force with the Family Support Centre marks its first anniversary. A 40% increase in cases reaching court, and a new referral pathway that shortens response time from 72 hours to under 12. The officers and social workers behind it share what they've learned.",
    href: "#",
    style: "alt",
  },
];

const news = [
  {
    category: "Community",
    date: "07 May 2026",
    title: "Junior Police Cadet programme opens applications",
    excerpt:
      "Year 11 and 12 students are invited to apply for the cadet programme, running through the school holidays at Rove Police Headquarters.",
    href: "#",
    style: "",
  },
  {
    category: "Statement",
    date: "14 Apr 2026",
    title: "RSIPF response to the 7 April incident at Henderson",
    excerpt:
      "An update on the police investigation following the incident at Henderson airfield. A man has been charged and remanded.",
    href: "#",
    style: "alt",
  },
  {
    category: "Community",
    date: "21 Apr 2026",
    title: "Road safety week reaches 12,000 students",
    excerpt:
      "Officers visited schools across Guadalcanal and Malaita provinces during the national road safety awareness week.",
    href: "#",
    style: "gold",
  },
  {
    category: "Operations",
    date: "28 Apr 2026",
    title: "Cybercrime unit processes first digital-evidence case",
    excerpt:
      "The newly formed digital evidence team processes its first case using the chain-of-custody procedure adopted from AFP training.",
    href: "#",
    style: "",
  },
  {
    category: "Community",
    date: "17 Apr 2026",
    title: "Neighbourhood watch expands to East Honiara wards",
    excerpt:
      "Three new neighbourhood watch groups registered in Kukum, Henderson, and White River — bringing the national total to 41 active groups.",
    href: "#",
    style: "alt",
  },
  {
    category: "Operations",
    date: "10 Apr 2026",
    title: "Drug interdiction operation seizes contraband at port",
    excerpt:
      "A joint operation with Customs intercepted a shipment at Honiara International Port. Three people are assisting police with inquiries.",
    href: "#",
    style: "gold",
  },
];

export default function NewsPage() {
  return (
    <>
      <section className="page-head">
        <div className="page-head__inner">
          <div className="page-head__eyebrow">★ News & media</div>
          <h1>What's happening at the RSIPF.</h1>
          <p className="page-head__lede">
            Operational updates, community programmes, featured articles, and
            official statements. For media interviews, contact the Media
            Liaison Unit at <strong>media@rsipf.gov.sb</strong>.
          </p>
        </div>
      </section>

      {/* ── Announcements ── */}
      <section className="page-body" style={{ paddingBottom: 0 }} id="announcements">
        <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)", marginBottom: "var(--sp-5)" }}>
          <MegaphoneIcon width={20} height={20} style={{ color: "var(--gold-700)" }} />
          <div className="eyebrow">★ Announcements</div>
        </div>
        <h2 style={{ fontSize: "var(--fs-h1)", color: "var(--navy-800)", margin: "0 0 var(--sp-6)", fontWeight: 700 }}>
          Official notices
        </h2>
        <div className="stack-4">
          {announcements.map((a) => (
            <article
              key={a.title}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "var(--sp-5)",
                padding: "var(--sp-5)",
                background: a.pinned ? "var(--gold-50)" : "var(--white)",
                border: `1px solid ${a.pinned ? "var(--gold-300)" : "var(--gray-200)"}`,
                borderLeft: `3px solid ${a.pinned ? "var(--gold-500)" : "var(--gray-300)"}`,
                borderRadius: "var(--r-sm)",
                alignItems: "flex-start",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)", alignItems: "flex-start" }}>
                <Badge variant={a.badgeVariant}>{a.badge}</Badge>
                {a.pinned && <Badge variant="gold">Pinned</Badge>}
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--gray-600)", marginBottom: "var(--sp-1)", letterSpacing: ".04em" }}>{a.date}</div>
                <h3 style={{ fontWeight: 700, color: "var(--navy-800)", fontSize: "var(--fs-h4)", margin: "0 0 var(--sp-2)" }}>{a.title}</h3>
                <p style={{ color: "var(--gray-700)", fontSize: "var(--fs-sm)", lineHeight: "var(--lh-loose)", margin: 0 }}>{a.body}</p>
              </div>
              <Link href={a.href} className="value-card__link" style={{ whiteSpace: "nowrap", marginTop: "var(--sp-1)" }}>
                View <ArrowRightIcon />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ── Featured articles ── */}
      <section className="page-body" style={{ paddingTop: "var(--sp-12)", paddingBottom: 0 }} id="featured">
        <div className="eyebrow">★ Featured articles</div>
        <h2 style={{ fontSize: "var(--fs-h1)", color: "var(--navy-800)", margin: "var(--sp-2) 0 var(--sp-6)", fontWeight: 700 }}>
          In depth
        </h2>
        <div className="stack-5">
          {featured.map((f) => (
            <article key={f.title} className="feature-article">
              <div className={`feature-article__media${f.style === "alt" ? " feature-article__media--alt" : ""}`}>
                <span className="feature-article__tag">{f.tag}</span>
              </div>
              <div className="feature-article__body">
                <div className="feature-article__date">{f.date}</div>
                <h3 className="feature-article__title">{f.title}</h3>
                <p className="feature-article__excerpt">{f.excerpt}</p>
                <Link href={f.href} className="value-card__link">
                  Read full article <ArrowRightIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Latest news ── */}
      <section className="page-body" id="latest">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "var(--sp-4)", marginBottom: "var(--sp-6)", flexWrap: "wrap" }}>
          <div>
            <div className="eyebrow">★ Latest news</div>
            <h2 style={{ fontSize: "var(--fs-h1)", color: "var(--navy-800)", margin: "var(--sp-2) 0 0", fontWeight: 700 }}>
              News & updates
            </h2>
          </div>
          <div style={{ display: "flex", gap: "var(--sp-2)", flexWrap: "wrap" }}>
            {["All", "Operations", "Community", "Statements"].map((c, i) => (
              <Badge key={c} variant={i === 0 ? "solid" : "neutral"}>{c}</Badge>
            ))}
          </div>
        </div>
        <div className="grid-3">
          {news.map((n) => (
            <article key={n.title} className="news-card">
              <div className={`news-card__media${n.style === "alt" ? " news-card__media--alt" : n.style === "gold" ? " news-card__media--gold" : ""}`}>
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
      </section>
    </>
  );
}
