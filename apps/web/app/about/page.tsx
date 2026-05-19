import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Card, CardSub, CardTitle, LinkButton } from "@/components/ui";
import { ArrowRightIcon, BookOpenIcon, GlobeIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "History, structure, leadership, and strategic priorities of the Royal Solomon Islands Police Force.",
};

const leaders = [
  {
    initials: "JS",
    name: "Commissioner James Sale",
    rank: "Commissioner of Police",
    bio: "Appointed 2024. Career officer with 28 years' service, formerly Deputy Commissioner (Operations).",
  },
  {
    initials: "MK",
    name: "Mary Kalemia",
    rank: "Deputy Commissioner (Operations)",
    bio: "Oversees frontline operations, traffic, and provincial command across all nine provinces.",
  },
  {
    initials: "DT",
    name: "Daniel Tovua",
    rank: "Deputy Commissioner (National Security)",
    bio: "Responsible for criminal investigations, intelligence, and the Police Response Team.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-head">
        <div className="page-head__inner">
          <div className="page-head__eyebrow">★ About the RSIPF</div>
          <h1>A century of service to Solomon Islands.</h1>
          <p className="page-head__lede">
            The Royal Solomon Islands Police Force has protected our people
            since 1893 — through colonial administration, independence, the
            tensions of the early 2000s, and into a modern, community-focused
            era. We are sworn to act with integrity, fairness, and respect for
            every person we serve.
          </p>
        </div>
      </section>

      <section className="page-body">
        <div className="grid-2" style={{ gap: "var(--sp-12)" }}>
          <div className="prose">
            <h2>Who we are</h2>
            <p>
              The RSIPF is the national policing service of the Solomon
              Islands. Around 1,800 sworn officers and civilian staff serve
              from the headquarters at Rove, and through provincial commands,
              urban stations, and community police posts in remote islands.
            </p>
            <p>
              We are organised under the Police Act and answer to the
              Commissioner of Police, who is appointed by His Majesty's
              Governor-General on advice of the Prime Minister. Officers swear
              an oath to serve the people of Solomon Islands without fear,
              favour, or ill-will.
            </p>
            <h2 id="strategy">Strategic priorities, 2026–2028</h2>
            <p>
              Our three-year plan focuses on four priorities, agreed with the
              Ministry of Police, National Security and Correctional Services
              and shared publicly:
            </p>
            <ul>
              <li>
                <strong>Community trust.</strong> Open communication, visible
                patrols, and accountable conduct in every interaction.
              </li>
              <li>
                <strong>Women in policing.</strong> Lifting the share of women
                officers to 25% by 2028, with targeted recruitment and
                leadership pathways.
              </li>
              <li>
                <strong>Rural response.</strong> Faster, better-equipped
                response in remote islands, including new posts in Temotu and
                Choiseul.
              </li>
              <li>
                <strong>Digital evidence.</strong> Modernised forensic and
                cyber-investigation capability to keep pace with how crimes
                are committed today.
              </li>
            </ul>
            <h2 id="integrity">Integrity & complaints</h2>
            <p>
              The Professional Standards Unit investigates complaints against
              officers and reports independently to the Commissioner. If you
              believe an officer has acted improperly, you can report it at
              any station, by phone on <strong>21000</strong>, or in writing
              to the Professional Standards Unit, PO Box 6, Honiara.
            </p>
          </div>
          <div>
            <Card accent>
              <Badge variant="gold">At a glance</Badge>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "var(--sp-4) 0 0",
                  display: "grid",
                  gap: "var(--sp-4)",
                }}
              >
                <li>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--fs-xs)",
                      color: "var(--gray-600)",
                      textTransform: "uppercase",
                      letterSpacing: ".06em",
                    }}
                  >
                    Established
                  </div>
                  <div style={{ fontSize: "var(--fs-h3)", color: "var(--navy-800)", fontWeight: 700 }}>
                    1893
                  </div>
                </li>
                <li>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--fs-xs)",
                      color: "var(--gray-600)",
                      textTransform: "uppercase",
                      letterSpacing: ".06em",
                    }}
                  >
                    Sworn officers
                  </div>
                  <div style={{ fontSize: "var(--fs-h3)", color: "var(--navy-800)", fontWeight: 700 }}>
                    1,800+
                  </div>
                </li>
                <li>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--fs-xs)",
                      color: "var(--gray-600)",
                      textTransform: "uppercase",
                      letterSpacing: ".06em",
                    }}
                  >
                    Provinces served
                  </div>
                  <div style={{ fontSize: "var(--fs-h3)", color: "var(--navy-800)", fontWeight: 700 }}>
                    All 9 provinces + Honiara
                  </div>
                </li>
                <li>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--fs-xs)",
                      color: "var(--gray-600)",
                      textTransform: "uppercase",
                      letterSpacing: ".06em",
                    }}
                  >
                    Headquarters
                  </div>
                  <div style={{ fontSize: "var(--fs-h3)", color: "var(--navy-800)", fontWeight: 700 }}>
                    Rove, Honiara
                  </div>
                </li>
              </ul>
            </Card>
            <Card style={{ marginTop: "var(--sp-5)" }}>
              <CardTitle>The Sentinel Pledge</CardTitle>
              <CardSub>Recited at every passing-out parade</CardSub>
              <p
                style={{
                  marginTop: "var(--sp-4)",
                  fontSize: "var(--fs-base)",
                  color: "var(--gray-800)",
                  lineHeight: "var(--lh-loose)",
                  fontStyle: "italic",
                }}
              >
                "I will serve the people of Solomon Islands with integrity,
                fairness, and courage. I will protect life and property,
                uphold the law without favour, and act always within the
                trust placed in me."
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="landing-section landing-section--tinted">
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "var(--sp-20) var(--sp-8)",
          }}
        >
          <div className="eyebrow" id="leadership">
            ★ Leadership
          </div>
          <h2 style={{ margin: "var(--sp-2) 0 var(--sp-3)", fontSize: "var(--fs-h1)", color: "var(--navy-800)" }}>
            The Commissioner's Office
          </h2>
          <p className="landing-section__lede">
            The Commissioner of Police is supported by two Deputy
            Commissioners and a small executive team based at Rove.
          </p>
          <div className="grid-3">
            {leaders.map((l) => (
              <article key={l.name} className="leader-card">
                <div className="leader-card__avatar">{l.initials}</div>
                <h3 className="leader-card__name">{l.name}</h3>
                <div className="leader-card__rank">{l.rank}</div>
                <p className="leader-card__bio">{l.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Publications spotlight ── */}
      <section className="landing-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "var(--sp-4)", marginBottom: "var(--sp-8)", flexWrap: "wrap" }}>
          <div>
            <div className="eyebrow">★ Publications</div>
            <h2 style={{ fontSize: "var(--fs-h1)", color: "var(--navy-800)", margin: "var(--sp-2) 0 var(--sp-2)", fontWeight: 700 }}>
              Reports &amp; strategic documents
            </h2>
            <p style={{ color: "var(--gray-700)", margin: 0, maxWidth: "60ch" }}>
              Annual reports, strategic plans, and policy documents — all
              publicly available for download.
            </p>
          </div>
          <LinkButton href="/resources#publications" variant="secondary">
            All publications <ArrowRightIcon />
          </LinkButton>
        </div>
        <div className="grid-3">
          {[
            { name: "RSIPF Annual Report 2025", meta: "PDF · 88 pages · Feb 2026", badge: "Latest" },
            { name: "Strategic Plan 2026–2028", meta: "PDF · 32 pages · Jan 2026", badge: "New" },
            { name: "Community Policing Framework 2025", meta: "PDF · 20 pages · Jul 2025", badge: null },
          ].map((p) => (
            <div key={p.name} style={{ display: "flex", gap: "var(--sp-4)", padding: "var(--sp-5)", background: "var(--white)", border: "1px solid var(--gray-200)", borderRadius: "var(--r-sm)", alignItems: "flex-start" }}>
              <span style={{ width: 44, height: 44, borderRadius: "var(--r-xs)", background: "var(--navy-50)", color: "var(--navy-700)", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
                <BookOpenIcon width={22} height={22} />
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: "var(--gray-900)", fontSize: "var(--fs-sm)", marginBottom: "var(--sp-1)", display: "flex", alignItems: "center", gap: "var(--sp-2)", flexWrap: "wrap" }}>
                  {p.name}
                  {p.badge && <Badge variant="gold">{p.badge}</Badge>}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--gray-600)" }}>{p.meta}</div>
              </div>
              <Link href="/resources#publications" className="doc-row__action">
                <ArrowRightIcon />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── MOUs ── */}
      <section className="landing-section landing-section--tinted" id="mous">
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "var(--sp-20) var(--sp-8)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "var(--sp-4)", marginBottom: "var(--sp-8)", flexWrap: "wrap" }}>
            <div>
              <div className="eyebrow">★ Partnerships</div>
              <h2 style={{ fontSize: "var(--fs-h1)", color: "var(--navy-800)", margin: "var(--sp-2) 0 var(--sp-2)", fontWeight: 700 }}>
                Memoranda of understanding
              </h2>
              <p style={{ color: "var(--gray-700)", margin: 0, maxWidth: "60ch" }}>
                Formal agreements with domestic agencies, regional bodies, and
                international partners — reviewed annually. Full text available
                on request.
              </p>
            </div>
            <LinkButton href="/resources#mous" variant="secondary">
              View all MOUs <ArrowRightIcon />
            </LinkButton>
          </div>
          <div className="grid-3">
            {[
              {
                partner: "Australian Federal Police",
                type: "International",
                title: "Capacity building & training assistance",
                signed: "Jan 2026",
                status: "Active",
              },
              {
                partner: "Pacific Islands Chiefs of Police",
                type: "Regional",
                title: "Regional intelligence sharing",
                signed: "Nov 2022",
                status: "Active",
              },
              {
                partner: "Family Support Centre",
                type: "Domestic",
                title: "Safenet family-violence referral pathway",
                signed: "Aug 2023",
                status: "Active",
              },
            ].map((m) => (
              <article key={m.title} className="mou-card">
                <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)", marginBottom: "var(--sp-3)" }}>
                  <span style={{ width: 36, height: 36, borderRadius: "var(--r-xs)", background: "var(--navy-50)", color: "var(--navy-700)", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
                    <GlobeIcon width={18} height={18} />
                  </span>
                  <div className="mou-card__partner">{m.type} · {m.partner}</div>
                </div>
                <h3 className="mou-card__title">{m.title}</h3>
                <div className="mou-card__foot">
                  <span>Signed {m.signed}</span>
                  <Badge variant="success">{m.status}</Badge>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
