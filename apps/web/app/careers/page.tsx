import type { Metadata } from "next";
import { Alert, Badge, Card, CardSub, CardTitle, LinkButton } from "@/components/ui";
import {
  ArrowRightIcon,
  ClipboardIcon,
  FingerprintIcon,
  ShieldCheckIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Royal Solomon Islands Police Force. Recruit intakes, eligibility, and how to apply.",
};

const stages = [
  {
    icon: <ClipboardIcon width={32} height={32} />,
    num: "1",
    title: "Eligibility check",
    body: "A short self-assessment against the published criteria. Most applicants complete this in under ten minutes.",
  },
  {
    icon: <ShieldCheckIcon width={32} height={32} />,
    num: "2",
    title: "Documents & identity",
    body: "Upload your ID, transcripts, and proof of address. A records officer verifies each item.",
  },
  {
    icon: <FingerprintIcon width={32} height={32} />,
    num: "3",
    title: "Assessments & decision",
    body: "Written, physical, psychological, medical, and background clearance — followed by a conditional offer.",
  },
];

const requirements = [
  "Solomon Islands citizen",
  "Age 18–35 at the time of application",
  "Completed Form 5 or equivalent",
  "No serious criminal convictions",
  "Physically and medically fit",
  "Able to swim (training provided)",
  "Strong character references",
  "Commitment to serve in any province",
];

export default function CareersPage() {
  return (
    <>
      <section className="page-head">
        <div className="page-head__inner">
          <div className="page-head__eyebrow">★ Recruitment</div>
          <h1>A career of meaning. A service that lasts.</h1>
          <p className="page-head__lede">
            Joining the RSIPF means standing alongside the people of Solomon
            Islands — through ordinary days and the hardest ones. Sworn
            service starts with the academy at Rove, with recruits drawn from
            every province.
          </p>
        </div>
      </section>

      <section className="page-body">
        <Alert
          variant="info"
          title="2026 recruit intake opens 1 June 2026"
          body="Applications run online through the RSIPF recruits portal. The academy class begins September 2026 at Rove."
        />

        <div
          className="grid-2"
          style={{ marginTop: "var(--sp-12)", gap: "var(--sp-12)", alignItems: "center" }}
        >
          <div>
            <div className="eyebrow">★ How to apply</div>
            <h2
              style={{
                fontSize: "var(--fs-h1)",
                color: "var(--navy-800)",
                margin: "var(--sp-2) 0 var(--sp-4)",
                letterSpacing: "var(--tracking-tight)",
                fontWeight: 700,
              }}
            >
              Applications run through the online recruits portal.
            </h2>
            <p
              style={{
                color: "var(--gray-700)",
                fontSize: "var(--fs-lg)",
                lineHeight: "var(--lh-loose)",
                margin: "0 0 var(--sp-6)",
              }}
            >
              The portal carries you from first interest to academy entry —
              every stage signposted, every document tracked. It takes seven
              stages and twelve to sixteen weeks end-to-end. You can pause and
              return whenever you need to.
            </p>
            <div style={{ display: "flex", gap: "var(--sp-3)", flexWrap: "wrap" }}>
              <LinkButton href="https://rsipf-ats.vercel.app/" variant="gold" size="lg">
                Start your application <ArrowRightIcon />
              </LinkButton>
              <LinkButton href="/contact" variant="secondary" size="lg">
                Ask a question
              </LinkButton>
            </div>
          </div>
          <Card accent>
            <Badge variant="gold">Eligibility</Badge>
            <h3
              style={{
                fontSize: "var(--fs-h3)",
                color: "var(--navy-800)",
                margin: "var(--sp-3) 0 var(--sp-4)",
                fontWeight: 700,
              }}
            >
              Who can apply
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: "var(--sp-2)",
              }}
            >
              {requirements.map((r) => (
                <li
                  key={r}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "var(--sp-3)",
                    fontSize: "var(--fs-sm)",
                    color: "var(--gray-800)",
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 999,
                      background: "var(--success-100)",
                      color: "var(--success-700)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "0 0 auto",
                      marginTop: 2,
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </Card>
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
          <div className="eyebrow">★ The journey</div>
          <h2
            style={{
              fontSize: "var(--fs-h1)",
              color: "var(--navy-800)",
              margin: "var(--sp-2) 0 var(--sp-3)",
              fontWeight: 700,
            }}
          >
            What to expect from the application
          </h2>
          <p className="landing-section__lede">
            Seven stages. Twelve to sixteen weeks. Every step builds on the
            last.
          </p>
          <div className="grid-3">
            {stages.map((s) => (
              <article key={s.num} className="value-card">
                <span className="value-card__icon" style={{ color: "var(--navy-700)" }}>
                  {s.icon}
                </span>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--fs-xs)",
                    letterSpacing: "var(--tracking-eyebrow)",
                    color: "var(--gold-700)",
                    marginBottom: "var(--sp-2)",
                  }}
                >
                  Stage {s.num}
                </div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <div className="cta-strip__inner">
          <div>
            <h3>Ready to take the next step?</h3>
            <p>
              The eligibility check takes about ten minutes and tells you
              immediately whether to proceed to the full application.
            </p>
          </div>
          <div style={{ display: "flex", gap: "var(--sp-3)", flexWrap: "wrap" }}>
            <Badge variant="gold">2026 intake · opens 01 Jun</Badge>
            <LinkButton href="https://rsipf-ats.vercel.app/" variant="gold" size="lg">
              Check eligibility <ArrowRightIcon />
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
