import type { Metadata } from "next";
import { Alert, Badge, Card, CardTitle, LinkButton } from "@/components/ui";
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact & Report",
  description:
    "Emergency numbers, station finder, and a confidential way to report a crime to the Royal Solomon Islands Police Force.",
};

const stations = [
  {
    name: "Central Police Station — Honiara",
    zone: "Honiara · Headquarters",
    address: "Mendana Avenue, Honiara",
    phone: "23666",
    hours: "24 hours · 7 days",
  },
  {
    name: "Naha Police Station",
    zone: "Honiara · East",
    address: "Naha 3, Honiara",
    phone: "32500",
    hours: "24 hours · 7 days",
  },
  {
    name: "Kukum Police Post",
    zone: "Honiara · East",
    address: "Kukum Highway, Honiara",
    phone: "30454",
    hours: "07:00 – 22:00",
  },
  {
    name: "Auki Police Station",
    zone: "Malaita Province",
    address: "Loboi, Auki",
    phone: "40222",
    hours: "24 hours · 7 days",
  },
  {
    name: "Gizo Police Station",
    zone: "Western Province",
    address: "Middenway Road, Gizo",
    phone: "60222",
    hours: "24 hours · 7 days",
  },
  {
    name: "Lata Community Police Post",
    zone: "Temotu Province",
    address: "Lata Town, Santa Cruz",
    phone: "53003",
    hours: "08:00 – 17:00",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="page-head">
        <div className="page-head__inner">
          <div className="page-head__eyebrow">★ Contact & report</div>
          <h1>If you need us, we are here.</h1>
          <p className="page-head__lede">
            For emergencies, dial <strong>999</strong>. For non-urgent matters,
            use the contacts below or visit your nearest station. Every report
            is taken seriously and treated confidentially.
          </p>
        </div>
      </section>

      <section className="page-body">
        <Alert
          variant="danger"
          title="In an emergency, call 999"
          body="If life is in danger, a crime is in progress, or you need urgent police response, dial 999 from any phone. The call is free."
        />

        <div className="grid-3" style={{ marginTop: "var(--sp-8)" }}>
          <Card accent>
            <span style={{ color: "var(--danger-700)" }}>
              <PhoneIcon width={28} height={28} />
            </span>
            <CardTitle>Emergency</CardTitle>
            <p
              style={{
                fontSize: "var(--fs-display)",
                fontWeight: 700,
                color: "var(--danger-700)",
                margin: "var(--sp-2) 0 var(--sp-1)",
                letterSpacing: "var(--tracking-tight)",
                lineHeight: 1,
                fontFamily: "var(--font-mono)",
              }}
            >
              999
            </p>
            <p style={{ color: "var(--gray-700)", fontSize: "var(--fs-sm)", margin: 0 }}>
              Free from any phone, 24/7
            </p>
          </Card>
          <Card>
            <span style={{ color: "var(--navy-700)" }}>
              <PhoneIcon width={28} height={28} />
            </span>
            <CardTitle>Non-emergency</CardTitle>
            <p
              style={{
                fontSize: "var(--fs-h1)",
                fontWeight: 700,
                color: "var(--navy-800)",
                margin: "var(--sp-2) 0 var(--sp-1)",
                fontFamily: "var(--font-mono)",
              }}
            >
              23666
            </p>
            <p style={{ color: "var(--gray-700)", fontSize: "var(--fs-sm)", margin: 0 }}>
              Central Police Station, Honiara
            </p>
          </Card>
          <Card>
            <span style={{ color: "var(--navy-700)" }}>
              <PhoneIcon width={28} height={28} />
            </span>
            <CardTitle>Crime Stoppers</CardTitle>
            <p
              style={{
                fontSize: "var(--fs-h1)",
                fontWeight: 700,
                color: "var(--navy-800)",
                margin: "var(--sp-2) 0 var(--sp-1)",
                fontFamily: "var(--font-mono)",
              }}
            >
              25555
            </p>
            <p style={{ color: "var(--gray-700)", fontSize: "var(--fs-sm)", margin: 0 }}>
              Anonymous tip-off line
            </p>
          </Card>
        </div>

        <div className="grid-2" style={{ marginTop: "var(--sp-16)", gap: "var(--sp-12)" }}>
          <div>
            <div className="eyebrow">★ Report a crime</div>
            <h2
              style={{
                fontSize: "var(--fs-h1)",
                color: "var(--navy-800)",
                margin: "var(--sp-2) 0 var(--sp-3)",
                letterSpacing: "var(--tracking-tight)",
                fontWeight: 700,
              }}
            >
              Tell us what happened
            </h2>
            <p
              style={{
                color: "var(--gray-700)",
                fontSize: "var(--fs-lg)",
                lineHeight: "var(--lh-loose)",
                margin: "0 0 var(--sp-6)",
              }}
            >
              Use this form for non-emergency reports. Your information goes
              to the duty officer at Central Police Station, who will assign
              it to the relevant unit and respond within 48 hours.
            </p>
            <form
              className="stack-5"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--sp-5)",
              }}
            >
              <div className="field">
                <label className="field__label" htmlFor="ct-name">
                  Your name
                </label>
                <input
                  id="ct-name"
                  type="text"
                  className="input"
                  placeholder="Optional — you can stay anonymous"
                />
                <span className="field__hint">
                  Leave blank to report anonymously.
                </span>
              </div>
              <div className="field">
                <label className="field__label" htmlFor="ct-contact">
                  Contact (phone or email)
                </label>
                <input
                  id="ct-contact"
                  type="text"
                  className="input"
                  placeholder="So we can follow up"
                />
              </div>
              <div className="field">
                <label className="field__label" htmlFor="ct-type">
                  Type of report<span className="req">*</span>
                </label>
                <select id="ct-type" className="select" defaultValue="">
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option>Theft or burglary</option>
                  <option>Assault or threat</option>
                  <option>Family violence</option>
                  <option>Traffic incident</option>
                  <option>Suspicious activity</option>
                  <option>Lost or found property</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="field">
                <label className="field__label" htmlFor="ct-where">
                  Where did this happen?
                </label>
                <input
                  id="ct-where"
                  type="text"
                  className="input"
                  placeholder="Village, ward, or landmark"
                />
              </div>
              <div className="field">
                <label className="field__label" htmlFor="ct-details">
                  Details<span className="req">*</span>
                </label>
                <textarea
                  id="ct-details"
                  className="textarea"
                  placeholder="What happened, when, and anyone involved. The more detail you can give, the better we can respond."
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--sp-3)",
                  flexWrap: "wrap",
                }}
              >
                <button type="submit" className="btn">
                  Submit report
                </button>
                <span style={{ color: "var(--gray-600)", fontSize: "var(--fs-sm)" }}>
                  We respond to non-emergency reports within 48 hours.
                </span>
              </div>
            </form>
          </div>

          <div>
            <Card accent>
              <Badge variant="gold">Honiara HQ</Badge>
              <h3
                style={{
                  fontSize: "var(--fs-h3)",
                  color: "var(--navy-800)",
                  margin: "var(--sp-3) 0 var(--sp-4)",
                  fontWeight: 700,
                }}
              >
                Police Headquarters
              </h3>
              <div className="stack-3">
                <div className="station-card__row">
                  <MapPinIcon />
                  <span>Rove, Honiara, Guadalcanal Province</span>
                </div>
                <div className="station-card__row">
                  <PhoneIcon />
                  <span>
                    Switchboard: <strong>23666</strong>
                  </span>
                </div>
                <div className="station-card__row">
                  <MailIcon />
                  <span>info@rsipf.gov.sb</span>
                </div>
                <div className="station-card__row">
                  <ClockIcon />
                  <span>Front counter 08:00 – 16:30, Mon–Fri</span>
                </div>
              </div>
            </Card>

            <Card style={{ marginTop: "var(--sp-5)" }} id="feedback">
              <CardTitle>Community feedback</CardTitle>
              <p
                style={{
                  color: "var(--gray-700)",
                  margin: "var(--sp-2) 0 var(--sp-4)",
                  fontSize: "var(--fs-sm)",
                  lineHeight: "var(--lh-loose)",
                }}
              >
                Compliments, complaints, or suggestions on how we can serve
                better. Goes to the Professional Standards Unit.
              </p>
              <LinkButton href="mailto:feedback@rsipf.gov.sb" variant="secondary">
                feedback@rsipf.gov.sb
              </LinkButton>
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
          id="stations"
        >
          <div className="eyebrow">★ Stations & posts</div>
          <h2
            style={{
              fontSize: "var(--fs-h1)",
              color: "var(--navy-800)",
              margin: "var(--sp-2) 0 var(--sp-3)",
              fontWeight: 700,
            }}
          >
            Find your nearest station
          </h2>
          <p className="landing-section__lede">
            Selected stations and posts across the country. For a full
            directory of all 30+ posts, call the switchboard on 23666.
          </p>
          <div className="grid-3">
            {stations.map((s) => (
              <article key={s.name} className="station-card">
                <div className="station-card__head">
                  <div>
                    <h3 className="station-card__name">{s.name}</h3>
                    <div className="station-card__zone">{s.zone}</div>
                  </div>
                </div>
                <div className="station-card__row">
                  <MapPinIcon />
                  <span>{s.address}</span>
                </div>
                <div className="station-card__row">
                  <PhoneIcon />
                  <span>
                    <strong>{s.phone}</strong>
                  </span>
                </div>
                <div className="station-card__row">
                  <ClockIcon />
                  <span>{s.hours}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
