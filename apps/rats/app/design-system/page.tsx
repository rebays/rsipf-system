import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  CalendarOff,
  CheckCircle2,
  ClipboardList,
  Download,
  Eye,
  FileText,
  FileX,
  Fingerprint,
  GraduationCap,
  HelpCircle,
  Layers,
  LayoutDashboard,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  Search,
  Upload as UploadIcon,
  User,
} from "lucide-react";

import { BrandBar, Seal } from "@/components/brand";
import { TopNav, Sidebar } from "@/components/nav";
import { Footer } from "@/components/layout";
import {
  Alert,
  AppCard,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  CardHead,
  CardSub,
  CardTitle,
  Checkbox,
  DocCard,
  Empty,
  Field,
  Icon,
  Input,
  InputGroup,
  Modal,
  ModalStage,
  ProgressBar,
  Radio,
  Select,
  Stepper,
  Table,
  TableWrap,
  Tag,
  Textarea,
  Timeline,
  Toggle,
  Upload,
} from "@/components/ui";
import {
  EligibilityCheck,
  DocumentRow,
  ProgressOverview,
} from "@/components/patterns";

export default function DesignSystemPage() {
  return (
    <>
      <BrandBar />

      <main className="shell">
        {/* Hero */}
        <section className="hero">
          <div>
            <div className="eyebrow">DS-001 · Foundational Release</div>
            <h1>A system for the trust we ask of every applicant.</h1>
            <p>
              Sentinel is the visual and component language of the recruits
              application portal. It carries the institutional weight expected
              of a police service while staying clear, calm, and accessible for
              first-time applicants navigating an unfamiliar process.
            </p>
          </div>
          <Seal />
        </section>

        {/* TOC */}
        <nav className="toc" aria-label="Sections">
          <a href="#color"><span>01</span> Color</a>
          <a href="#type"><span>02</span> Typography</a>
          <a href="#spacing"><span>03</span> Spacing</a>
          <a href="#radii"><span>04</span> Radii</a>
          <a href="#elevation"><span>05</span> Elevation</a>
          <a href="#icons"><span>06</span> Iconography</a>
          <a href="#buttons"><span>07</span> Buttons</a>
          <a href="#forms"><span>08</span> Forms &amp; Inputs</a>
          <a href="#badges"><span>09</span> Badges &amp; Tags</a>
          <a href="#cards"><span>10</span> Cards</a>
          <a href="#alerts"><span>11</span> Alerts</a>
          <a href="#tables"><span>12</span> Tables</a>
          <a href="#nav"><span>13</span> Navigation</a>
          <a href="#stepper"><span>14</span> Stepper</a>
          <a href="#timeline"><span>15</span> Timeline</a>
          <a href="#modal"><span>16</span> Modal</a>
          <a href="#empty"><span>17</span> Empty States</a>
          <a href="#patterns"><span>18</span> Patterns</a>
        </nav>

        {/* 01 — Color */}
        <section className="section" id="color">
          <header className="section__head">
            <div className="section__num">SECTION 01 / 18</div>
            <h2>Color</h2>
            <p className="section__lede">
              A deep navy carries authority. Gold appears only at moments of
              consequence — badges, seals, milestone confirmations. Neutrals do
              the rest of the work.
            </p>
          </header>

          <Swatches
            title="Navy — Primary"
            description={
              <>
                Used for headings, primary actions, top chrome, and
                trust-signalling surfaces. <code className="t-mono">--navy-600</code> is
                the default action color.
              </>
            }
            shades={NAVY_SHADES}
          />

          <Swatches
            title="Gold — Badge Accent"
            description="Reserved for badge moments, seals, and the thin line under the brand bar. Avoid using gold for ordinary UI accents; it loses meaning if it appears too often."
            shades={GOLD_SHADES}
            columns={5}
          />

          <Swatches title="Neutrals" shades={NEUTRAL_SHADES} />

          <div className="subsection">
            <h3>Semantic</h3>
            <div className="semantic-grid">
              {SEMANTIC_CARDS.map((c) => (
                <div key={c.name} className="semantic-card">
                  <div className="semantic-card__bar" style={{ background: c.bg }} />
                  <div className="semantic-card__body">
                    <div className="semantic-card__name">{c.name}</div>
                    <p className="semantic-card__use">{c.use}</p>
                    <div className="semantic-card__hex">{c.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 02 — Typography */}
        <section className="section" id="type">
          <header className="section__head">
            <div className="section__num">SECTION 02 / 18</div>
            <h2>Typography</h2>
            <p className="section__lede">
              Public Sans is the system typeface — designed for government
              interfaces, optimized for clarity at small sizes. Geist Mono labels
              record-keeping data: applicant IDs, document hashes, timestamps.
            </p>
          </header>

          {TYPE_ROWS.map((row, i) => (
            <div className="type-row" key={i}>
              <div className="type-meta">
                <strong>{row.label}</strong>
                {row.meta}
              </div>
              <div className={`type-sample ${row.sampleClass}`}>{row.sample}</div>
            </div>
          ))}
        </section>

        {/* 03 — Spacing */}
        <section className="section" id="spacing">
          <header className="section__head">
            <div className="section__num">SECTION 03 / 18</div>
            <h2>Spacing</h2>
            <p className="section__lede">
              A 4-pixel base scale. Use small steps (1–4) inside controls, mid
              steps (5–8) between elements within a section, and large steps
              (10+) between sections. Stay on the scale.
            </p>
          </header>
          <div className="stack-3" style={{ maxWidth: 560 }}>
            {SPACING_SCALE.map(([token, px]) => (
              <div key={token} className="spacing-row">
                <span className="spacing-row__token">{token}</span>
                <span className="spacing-row__px">{px}px</span>
                <div className="spacing-row__bar" style={{ width: px }} />
              </div>
            ))}
          </div>
        </section>

        {/* 04 — Radii */}
        <section className="section" id="radii">
          <header className="section__head">
            <div className="section__num">SECTION 04 / 18</div>
            <h2>Radii</h2>
            <p className="section__lede">
              Radii are intentionally restrained. The institution this system
              represents is not a consumer product — corners are crisp, edges are
              confident. Pills are reserved for badges and progress indicators.
            </p>
          </header>
          <div className="radii-grid">
            {RADII.map((r) => (
              <div key={r.name} className="radii-card">
                <div className="radii-card__demo" style={{ borderRadius: r.css }} />
                <div className="radii-card__name">{r.name}</div>
                <div className="radii-card__val">{r.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 05 — Elevation */}
        <section className="section" id="elevation">
          <header className="section__head">
            <div className="section__num">SECTION 05 / 18</div>
            <h2>Elevation</h2>
            <p className="section__lede">
              Shadows are tinted with navy, never neutral gray. The system uses
              elevation sparingly — primarily for floating surfaces (modals,
              dropdowns, sticky bars).
            </p>
          </header>
          <div className="elev-grid">
            {ELEVATIONS.map((e) => (
              <div key={e.name} className={`elev-card ${e.className ?? ""}`}>
                <div className="elev-card__name">{e.name}</div>
                <div className="elev-card__val">{e.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 06 — Icons */}
        <section className="section" id="icons">
          <header className="section__head">
            <div className="section__num">SECTION 06 / 18</div>
            <h2>Iconography</h2>
            <p className="section__lede">
              Two icon families work side-by-side. UI icons (Lucide, 1.75 stroke)
              handle the operational vocabulary — upload, edit, search. Badge
              motifs appear at heraldic moments: confirmations, stage
              transitions, certificates.
            </p>
          </header>

          <div className="subsection">
            <h4>UI icons · 16px / 20px / 24px · 1.75 stroke</h4>
            <div className="icon-grid">
              {UI_ICONS.map((u) => (
                <div className="icon-tile" key={u.name}>
                  <Icon as={u.icon} />
                  <span>{u.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="subsection">
            <h4>Badge motifs · used sparingly, for milestone moments</h4>
            <div className="icon-grid" style={{ gridTemplateColumns: "repeat(6, 1fr)" }}>
              <div className="icon-tile badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2 L21 5 V12 C21 18 17 22 12 23 C7 22 3 18 3 12 V5 Z" />
                </svg>
                <span>shield</span>
              </div>
              <div className="icon-tile badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2 L21 5 V12 C21 18 17 22 12 23 C7 22 3 18 3 12 V5 Z" />
                  <path d="M8 12 L11 15 L16 9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>verified</span>
              </div>
              <div className="icon-tile badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="9" r="6" />
                  <path d="M9 14 L7 21 L12 18 L17 21 L15 14" />
                </svg>
                <span>medal</span>
              </div>
              <div className="icon-tile badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3 L14 9 L20 9 L15 13 L17 19 L12 16 L7 19 L9 13 L4 9 L10 9 Z" />
                </svg>
                <span>star</span>
              </div>
              <div className="icon-tile badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 7 L12 4 L20 7 L20 11 C20 16 16 20 12 21 C8 20 4 16 4 11 Z" />
                  <path d="M9 12 L12 14 L15 11" />
                </svg>
                <span>cleared</span>
              </div>
              <div className="icon-tile badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7 L12 12 L15 14" />
                </svg>
                <span>in-review</span>
              </div>
            </div>
          </div>
        </section>

        {/* 07 — Buttons */}
        <section className="section" id="buttons">
          <header className="section__head">
            <div className="section__num">SECTION 07 / 18</div>
            <h2>Buttons</h2>
            <p className="section__lede">
              One primary action per view. Use the gold button only for terminal
              commitments — “Submit application,” “Accept offer.” Secondary,
              ghost, and danger variants handle everything else.
            </p>
          </header>

          <div className="subsection">
            <h4>Variants</h4>
            <div className="btn-row">
              <Button>Continue application</Button>
              <Button variant="secondary">Save draft</Button>
              <Button variant="ghost">Cancel</Button>
              <Button variant="danger">Withdraw application</Button>
              <Button variant="gold">
                <Icon as={CheckCircle2} />
                Submit application
              </Button>
              <Button disabled>Continue application</Button>
            </div>
          </div>

          <div className="subsection">
            <h4>Sizes</h4>
            <div className="btn-row">
              <Button size="sm">Small · 32</Button>
              <Button>Default · 40</Button>
              <Button size="lg">Large · 48</Button>
            </div>
          </div>

          <div className="subsection">
            <h4>With icons</h4>
            <div className="btn-row">
              <Button>
                <Icon as={UploadIcon} />
                Upload document
              </Button>
              <Button variant="secondary">
                <Icon as={Download} />
                Download receipt
              </Button>
              <Button variant="ghost">
                <Icon as={ArrowLeft} />
                Back
              </Button>
              <Button>
                Next step
                <Icon as={ArrowRight} />
              </Button>
            </div>
          </div>
        </section>

        {/* 08 — Forms */}
        <section className="section" id="forms">
          <header className="section__head">
            <div className="section__num">SECTION 08 / 18</div>
            <h2>Forms &amp; Inputs</h2>
            <p className="section__lede">
              Form fields are the heart of this portal. Defaults are calm and
              clear; errors are direct without scolding. Every field carries a
              label, optional hint, and dedicated error region.
            </p>
          </header>

          <div className="grid-2">
            <div className="stack-5">
              <Field
                label="Full legal name"
                htmlFor="ex-name"
                required
                hint="As it appears on your government-issued ID."
              >
                <Input
                  id="ex-name"
                  placeholder="Jane Doe"
                  defaultValue="Jane Adaeze Okafor"
                />
              </Field>

              <Field label="Email address" htmlFor="ex-email" required>
                <InputGroup icon={<Icon as={Mail} width={16} height={16} />}>
                  <Input
                    id="ex-email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </InputGroup>
              </Field>

              <Field
                label="Applicant ID"
                htmlFor="ex-id"
                hint="Assigned automatically. Cannot be edited."
              >
                <Input id="ex-id" defaultValue="APP-2026-04713" disabled />
              </Field>

              <Field
                label="Date of birth"
                htmlFor="ex-err"
                required
                error="Applicants must be at least 21 years old by 1 Sept 2026."
              >
                <Input id="ex-err" defaultValue="2008-03-14" invalid />
              </Field>
            </div>

            <div className="stack-5">
              <Field label="Citizenship status" htmlFor="ex-sel" required>
                <Select id="ex-sel" defaultValue="Citizen by birth">
                  <option>Citizen by birth</option>
                  <option>Naturalised citizen</option>
                  <option>Permanent resident</option>
                </Select>
              </Field>

              <Field
                label="Why do you want to serve?"
                htmlFor="ex-ta"
                hint="200–500 words. You can return to this later."
              >
                <Textarea
                  id="ex-ta"
                  placeholder="Tell us in your own words…"
                  defaultValue="I grew up watching officers help my neighbourhood through hard nights and ordinary mornings. I want to be one of the steady hands on a hard shift."
                />
              </Field>

              <Field label="Will you relocate for the academy?">
                <div className="stack-3" style={{ marginTop: 4 }}>
                  <Radio name="reloc" defaultChecked label="Yes — willing to relocate" />
                  <Radio name="reloc" label="Only within my home province" />
                  <Radio name="reloc" label="No — I require a local posting" />
                </div>
              </Field>

              <Field label="Consent & preferences">
                <div className="stack-3" style={{ marginTop: 4 }}>
                  <Checkbox
                    defaultChecked
                    label="I authorise a background and fingerprint check."
                  />
                  <Checkbox
                    defaultChecked
                    label="Send me application status notifications by email."
                  />
                  <Checkbox label="Send me SMS reminders for upcoming assessments." />
                </div>
              </Field>

              <Field label="Two-factor verification">
                <Toggle
                  style={{ marginTop: 4 }}
                  defaultChecked
                  label="Enabled — verify each sign-in by SMS code"
                />
              </Field>
            </div>
          </div>

          <div className="subsection">
            <h4>File upload</h4>
            <Upload
              title="Drop your government-issued ID here, or click to browse"
              hint="PDF, JPG, PNG · 10 MB max · both sides of card required"
            />
          </div>
        </section>

        {/* 09 — Badges & Tags */}
        <section className="section" id="badges">
          <header className="section__head">
            <div className="section__num">SECTION 09 / 18</div>
            <h2>Badges &amp; Tags</h2>
            <p className="section__lede">
              Status badges communicate where an application — or a piece of
              evidence — sits in the process. Tags are softer, used for skills,
              languages, and categorisation.
            </p>
          </header>
          <div className="subsection">
            <h4>Status badges</h4>
            <div className="btn-row">
              <Badge variant="neutral">Draft</Badge>
              <Badge variant="info">In review</Badge>
              <Badge variant="success">Cleared</Badge>
              <Badge variant="warn">Action required</Badge>
              <Badge variant="danger">Rejected</Badge>
              <Badge variant="gold">Recommended</Badge>
              <Badge variant="solid">Submitted</Badge>
            </div>
          </div>
          <div className="subsection">
            <h4>Tags</h4>
            <div className="btn-row">
              <Tag>English (C2)</Tag>
              <Tag>First-aid certified</Tag>
              <Tag>Driver&apos;s licence — Class B</Tag>
              <Tag>Community volunteer · 200h</Tag>
              <Tag
                removable={false}
                style={{ borderStyle: "dashed", color: "var(--gray-600)" }}
              >
                <Icon as={Plus} width={12} height={12} />
                Add
              </Tag>
            </div>
          </div>
        </section>

        {/* 10 — Cards */}
        <section className="section" id="cards">
          <header className="section__head">
            <div className="section__num">SECTION 10 / 18</div>
            <h2>Cards</h2>
            <p className="section__lede">
              Cards group related information. The accent variant uses a thin
              gold rule to elevate milestone surfaces — offer letters, acceptance
              receipts.
            </p>
          </header>

          <div className="grid-2">
            <Card>
              <CardHead>
                <div>
                  <CardTitle>Written examination</CardTitle>
                  <CardSub>Scheduled · 22 May 2026 · Hall B-3</CardSub>
                </div>
                <Badge variant="info">Upcoming</Badge>
              </CardHead>
              <p className="t-sm" style={{ color: "var(--gray-700)", margin: 0 }}>
                Arrive 30 minutes early with your applicant ID card and a valid
                government photo ID. Calculators and personal devices are not
                permitted.
              </p>
            </Card>

            <Card accent>
              <CardHead>
                <div>
                  <CardTitle>Conditional offer · Academy intake 2026-B</CardTitle>
                  <CardSub>Issued 14 May 2026 · expires 28 May 2026</CardSub>
                </div>
                <Badge variant="gold">Offer</Badge>
              </CardHead>
              <p
                className="t-sm"
                style={{ color: "var(--gray-700)", margin: "0 0 var(--sp-3)" }}
              >
                Pending final medical and fingerprint clearance. Review your
                conditional offer carefully and respond before the deadline.
              </p>
              <div className="btn-row">
                <Button size="sm" variant="gold">
                  Review offer
                </Button>
                <Button size="sm" variant="ghost">
                  Decline
                </Button>
              </div>
            </Card>

            <AppCard
              initials="JO"
              name="Jane Adaeze Okafor"
              applicantId="APP-2026-04713 · Cohort 2026-B"
              meta={
                <>
                  <span>
                    <Icon as={MapPin} />
                    Region 4
                  </span>
                  <span>
                    <Icon as={Calendar} />
                    Started 12 Mar
                  </span>
                  <span>
                    <Icon as={ClipboardList} />4 of 7 stages
                  </span>
                </>
              }
              badge={<Badge variant="success">On track</Badge>}
            />

            <DocCard
              name="National_ID_front.pdf"
              meta="1.4 MB · uploaded 12 May 2026 09:18"
              badge={<Badge variant="success">Verified</Badge>}
            />
          </div>
        </section>

        {/* 11 — Alerts */}
        <section className="section" id="alerts">
          <header className="section__head">
            <div className="section__num">SECTION 11 / 18</div>
            <h2>Alerts</h2>
            <p className="section__lede">
              Four severities. The left rule carries the meaning at a glance; the
              icon reinforces it. Place alerts at the top of the affected scope,
              not site-wide unless truly system-wide.
            </p>
          </header>
          <div className="stack-4">
            <Alert
              variant="info"
              title="Your fingerprint appointment is confirmed."
              body="Bring your applicant ID card and a valid government photo ID. The session lasts approximately 45 minutes."
            />
            <Alert
              variant="success"
              title="Background check cleared."
              body="All checks completed on 11 May 2026. You can proceed to the medical examination stage."
            />
            <Alert
              variant="warn"
              title="Action required — secondary school transcript is missing."
              body="Upload your transcript by 20 May 2026 to keep your application active for the 2026-B intake."
            />
            <Alert
              variant="danger"
              title="Application withdrawn."
              body="This application is closed and cannot be reopened. You may submit a new application in the next intake window (Sept 2026)."
            />
          </div>
        </section>

        {/* 12 — Tables */}
        <section className="section" id="tables">
          <header className="section__head">
            <div className="section__num">SECTION 12 / 18</div>
            <h2>Tables</h2>
            <p className="section__lede">
              Used for test scores, document inventories, and cohort lists. Mono
              numerals keep score columns aligned.
            </p>
          </header>
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <th>Assessment</th>
                  <th>Date</th>
                  <th className="num">Score</th>
                  <th className="num">Pass mark</th>
                  <th>Result</th>
                  <th>Reference</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Written examination — General aptitude</td>
                  <td>22 Apr 2026</td>
                  <td className="num mono">84 / 100</td>
                  <td className="num mono">60</td>
                  <td><Badge variant="success">Cleared</Badge></td>
                  <td className="mono">WE-04713-A</td>
                </tr>
                <tr>
                  <td>Physical fitness — 2.4 km run</td>
                  <td>03 May 2026</td>
                  <td className="num mono">11:42</td>
                  <td className="num mono">≤ 13:00</td>
                  <td><Badge variant="success">Cleared</Badge></td>
                  <td className="mono">PF-04713-R</td>
                </tr>
                <tr>
                  <td>Physical fitness — Push-ups (1 min)</td>
                  <td>03 May 2026</td>
                  <td className="num mono">38</td>
                  <td className="num mono">35</td>
                  <td><Badge variant="success">Cleared</Badge></td>
                  <td className="mono">PF-04713-P</td>
                </tr>
                <tr>
                  <td>Psychological assessment</td>
                  <td>09 May 2026</td>
                  <td className="num mono">— </td>
                  <td className="num mono">—</td>
                  <td><Badge variant="info">In review</Badge></td>
                  <td className="mono">PS-04713</td>
                </tr>
                <tr>
                  <td>Medical examination</td>
                  <td>—</td>
                  <td className="num mono">—</td>
                  <td className="num mono">—</td>
                  <td><Badge variant="neutral">Scheduled</Badge></td>
                  <td className="mono">MD-04713</td>
                </tr>
              </tbody>
            </Table>
          </TableWrap>
        </section>

        {/* 13 — Navigation */}
        <section className="section" id="nav">
          <header className="section__head">
            <div className="section__num">SECTION 13 / 18</div>
            <h2>Navigation</h2>
            <p className="section__lede">
              A persistent top bar identifies the agency. The sidebar carries the
              application stages — sequential, never decorative. Breadcrumbs
              orient applicants inside long forms.
            </p>
          </header>

          <div className="nav-demo">
            <TopNav />
            <Sidebar
              groups={[
                {
                  title: "Your application",
                  items: [
                    { icon: LayoutDashboard, label: "Overview" },
                    {
                      icon: User,
                      label: "Personal details",
                      active: true,
                      badge: "4/4",
                    },
                    { icon: GraduationCap, label: "Education", badge: "2/3" },
                    { icon: Briefcase, label: "Work history" },
                    { icon: UploadIcon, label: "Documents" },
                    { icon: Fingerprint, label: "Background check" },
                    { icon: ClipboardList, label: "Assessments" },
                  ],
                },
                {
                  title: "Support",
                  items: [
                    { icon: HelpCircle, label: "Help & FAQ" },
                    { icon: MessageCircle, label: "Contact recruiter" },
                  ],
                },
              ]}
            />
            <div className="nav-body">
              <Breadcrumbs
                items={[
                  { label: "Application" },
                  { label: "Personal details" },
                  { label: "Address & identity" },
                ]}
              />
              <h3
                style={{
                  margin: "var(--sp-5) 0 var(--sp-3)",
                  color: "var(--navy-800)",
                }}
              >
                Address &amp; identity
              </h3>
              <p
                className="t-sm"
                style={{ color: "var(--gray-700)", margin: "0 0 var(--sp-4)" }}
              >
                Provide your current residential address and your
                government-issued identification numbers. This information is
                verified during the background check.
              </p>
              <div className="grid-2">
                <Field label="Street address">
                  <Input defaultValue="14 Oba Akran Avenue" />
                </Field>
                <Field label="City">
                  <Input defaultValue="Ikeja" />
                </Field>
              </div>
            </div>
          </div>
        </section>

        {/* 14 — Stepper */}
        <section className="section" id="stepper">
          <header className="section__head">
            <div className="section__num">SECTION 14 / 18</div>
            <h2>Stepper</h2>
            <p className="section__lede">
              The application is a journey of seven stages. The stepper makes
              that journey legible — what is done, what is happening now, and
              what is still ahead.
            </p>
          </header>
          <Stepper
            steps={[
              { name: "Eligibility", sub: "Completed 12 Mar", status: "done" },
              {
                name: "Personal details",
                sub: "Completed 14 Mar",
                status: "done",
              },
              { name: "Documents", sub: "All accepted", status: "done" },
              { name: "Written exam", sub: "In progress", status: "current" },
              {
                name: "Physical",
                sub: "Scheduled 22 May",
                status: "todo",
              },
              { name: "Background", sub: "Pending", status: "todo" },
              { name: "Decision", sub: "—", status: "todo" },
            ]}
          />
        </section>

        {/* 15 — Timeline */}
        <section className="section" id="timeline">
          <header className="section__head">
            <div className="section__num">SECTION 15 / 18</div>
            <h2>Application timeline</h2>
            <p className="section__lede">
              The vertical companion to the stepper — used on the dashboard to
              show what has happened and what is next, with timestamps drawn
              from the audit log.
            </p>
          </header>
          <Timeline
            style={{ maxWidth: 680 }}
            items={[
              {
                status: "done",
                title: "Application submitted",
                meta: "12 Mar 2026 · 14:22",
                body: (
                  <>
                    Your application was received and assigned ID{" "}
                    <span className="t-mono">APP-2026-04713</span>. Initial
                    eligibility confirmed automatically.
                  </>
                ),
              },
              {
                status: "done",
                title: "Documents verified",
                meta: "28 Mar 2026 · 09:04",
                body: "National ID, secondary school transcript, and proof of address accepted by the records officer.",
              },
              {
                status: "done",
                title: "Written examination cleared",
                meta: "22 Apr 2026 · score 84/100",
                body: "Above the 60-point threshold. You have advanced to the physical assessment stage.",
              },
              {
                status: "current",
                title: "Physical fitness assessment",
                meta: "In progress · 03 May 2026",
                body: "Two of three components recorded. Final result will be posted within seven business days.",
              },
              {
                status: "pending",
                title: "Background & fingerprint check",
                meta: "Pending",
              },
              {
                status: "pending",
                title: "Final decision",
                meta: "Expected late June 2026",
              },
            ]}
          />
        </section>

        {/* 16 — Modal */}
        <section className="section" id="modal">
          <header className="section__head">
            <div className="section__num">SECTION 16 / 18</div>
            <h2>Modals</h2>
            <p className="section__lede">
              Reserved for actions that interrupt the application — submission,
              withdrawal, identity confirmation. Always offer a clear way out.
            </p>
          </header>
          <ModalStage>
            <Modal
              eyebrow="★ Final step"
              title="Submit your application?"
              footer={
                <>
                  <Button variant="ghost">Keep editing</Button>
                  <Button variant="gold">
                    <Icon as={CheckCircle2} />
                    Submit application
                  </Button>
                </>
              }
            >
              <p style={{ margin: "0 0 var(--sp-3)" }}>
                Once submitted, your application is locked. Changes after this
                point require contacting your recruiter and may delay
                processing.
              </p>
              <Checkbox label="I confirm that all information provided is true and complete to the best of my knowledge." />
            </Modal>
          </ModalStage>
        </section>

        {/* 17 — Empty States */}
        <section className="section" id="empty">
          <header className="section__head">
            <div className="section__num">SECTION 17 / 18</div>
            <h2>Empty states</h2>
            <p className="section__lede">
              An empty state should always tell the applicant what to do next —
              never just confirm that the screen is blank.
            </p>
          </header>
          <div className="grid-2">
            <Empty
              customIcon={
                <svg
                  className="empty__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 2 L21 5 V12 C21 18 17 22 12 23 C7 22 3 18 3 12 V5 Z" />
                  <path d="M8 12 H16 M12 8 V16" strokeLinecap="round" />
                </svg>
              }
              title="No documents uploaded yet"
              body="Start by uploading your national ID, then your secondary school transcript, and finally your proof of residential address."
              action={
                <Button size="sm">
                  <Icon as={UploadIcon} />
                  Upload first document
                </Button>
              }
            />
            <Empty
              icon={CalendarOff}
              title="No assessments scheduled"
              body="Your assessments will appear here once your documents have been verified by a records officer."
              action={
                <Button size="sm" variant="secondary">
                  Check verification status
                </Button>
              }
            />
          </div>
        </section>

        {/* 18 — Patterns */}
        <section className="section" id="patterns">
          <header className="section__head">
            <div className="section__num">SECTION 18 / 18</div>
            <h2>Patterns</h2>
            <p className="section__lede">
              Recurring compositions assembled from the components above. These
              are the screens applicants will encounter most often.
            </p>
          </header>

          <div className="subsection">
            <h3>Eligibility checklist</h3>
            <p
              className="t-sm"
              style={{ color: "var(--gray-600)", margin: "0 0 var(--sp-4)" }}
            >
              The very first screen of the application. Applicants self-assess
              against the published criteria before opening a new application
              file.
            </p>
            <EligibilityCheck
              title="Eligibility check · 2026 intake"
              subtitle="6 of 7 criteria met. Review the remaining item before submitting."
              progress="6 / 7"
              criteria={[
                {
                  name: "Citizenship",
                  detail: "National ID confirmed",
                  status: "met",
                  badge: <Badge variant="success">Met</Badge>,
                },
                {
                  name: "Age — at least 21 by start of academy",
                  detail: "DOB 12 Aug 2003 · 22 years 10 months at intake",
                  status: "met",
                  badge: <Badge variant="success">Met</Badge>,
                },
                {
                  name: "Education — Senior Secondary Certificate",
                  detail: "Federal Government College Lagos · 2021",
                  status: "met",
                  badge: <Badge variant="success">Met</Badge>,
                },
                {
                  name: "Height — minimum 1.67 m",
                  detail: "Recorded 1.72 m at medical screening",
                  status: "met",
                  badge: <Badge variant="success">Met</Badge>,
                },
                {
                  name: "No felony convictions",
                  detail: "Self-declared · subject to background verification",
                  status: "met",
                  badge: <Badge variant="success">Met</Badge>,
                },
                {
                  name: "Driver's licence — Class B or higher",
                  detail: "Class B · expires 2028-04",
                  status: "met",
                  badge: <Badge variant="success">Met</Badge>,
                },
                {
                  name: "First-aid certification (within 24 months)",
                  detail: "Not provided · enrol in a short course before submitting",
                  status: "fail",
                  badge: <Badge variant="warn">Action required</Badge>,
                },
              ]}
            />
          </div>

          <div className="subsection">
            <h3>Document upload &amp; verification</h3>
            <p
              className="t-sm"
              style={{ color: "var(--gray-600)", margin: "0 0 var(--sp-4)" }}
            >
              A single row per required document. Verification status is the
              source of truth, not the upload itself.
            </p>
            <div className="stack-3">
              <DocumentRow
                name="National ID — front & back"
                meta="national_id.pdf · 1.4 MB · uploaded 12 May 2026"
                badge={<Badge variant="success">Verified</Badge>}
                action={
                  <Button size="sm" variant="ghost">
                    <Icon as={Eye} />
                    View
                  </Button>
                }
              />
              <DocumentRow
                name="Secondary school transcript"
                meta="transcript_2021.pdf · 0.8 MB · uploaded 12 May 2026"
                badge={<Badge variant="info">In review</Badge>}
                action={
                  <Button size="sm" variant="ghost">
                    <Icon as={Eye} />
                    View
                  </Button>
                }
              />
              <DocumentRow
                name="Proof of residential address"
                meta="Required · accepted: utility bill, bank statement (last 3 months)"
                badge={<Badge variant="warn">Required</Badge>}
                action={
                  <Button size="sm">
                    <Icon as={UploadIcon} />
                    Upload
                  </Button>
                }
              />
              <DocumentRow
                icon={FileX}
                iconStyle={{
                  background: "var(--danger-50)",
                  color: "var(--danger-700)",
                }}
                name="Passport photograph"
                meta="Rejected — image is blurred. Re-upload a clear front-facing photograph on a white background."
                badge={<Badge variant="danger">Rejected</Badge>}
                action={
                  <Button size="sm">
                    <Icon as={UploadIcon} />
                    Re-upload
                  </Button>
                }
              />
            </div>
          </div>

          <div className="subsection">
            <h3>Application progress overview</h3>
            <ProgressOverview
              eyebrow="★ Your application · 2026-B intake"
              heading="57% complete · 4 of 7 stages"
              badge={<Badge variant="solid">On track</Badge>}
              percent={57}
              footnote={
                <>
                  Next milestone — Physical fitness assessment on{" "}
                  <strong style={{ color: "var(--gray-900)" }}>
                    Friday 22 May 2026
                  </strong>{" "}
                  at Hall B-3. You will receive a reminder 48 hours in advance.
                </>
              }
            />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

/* ─────────── local datasets ─────────── */

type Shade = { label: string; hex: string; bg: string; dark?: boolean };

const NAVY_SHADES: Shade[] = [
  { label: "50", hex: "#EEF3FA", bg: "var(--navy-50)", dark: true },
  { label: "100", hex: "#DBE3EF", bg: "var(--navy-100)", dark: true },
  { label: "200", hex: "#B8C7DD", bg: "var(--navy-200)", dark: true },
  { label: "300", hex: "#8DA3C4", bg: "var(--navy-300)", dark: true },
  { label: "400", hex: "#5D7AA5", bg: "var(--navy-400)" },
  { label: "500", hex: "#2D4F80", bg: "var(--navy-500)" },
  { label: "600 ★", hex: "#1A3A66", bg: "var(--navy-600)" },
  { label: "700", hex: "#102B4F", bg: "var(--navy-700)" },
  { label: "800", hex: "#0A1F3A", bg: "var(--navy-800)" },
  { label: "900", hex: "#061427", bg: "var(--navy-900)" },
  { label: "CREAM", hex: "#FAF8F3", bg: "var(--cream)", dark: true },
];

const GOLD_SHADES: Shade[] = [
  { label: "50", hex: "#FBF6E6", bg: "var(--gold-50)", dark: true },
  { label: "100", hex: "#F4EBD1", bg: "var(--gold-100)", dark: true },
  { label: "300", hex: "#E2CF90", bg: "var(--gold-300)", dark: true },
  { label: "500 ★", hex: "#C9A961", bg: "var(--gold-500)", dark: true },
  { label: "700", hex: "#8C7232", bg: "var(--gold-700)" },
];

const NEUTRAL_SHADES: Shade[] = [
  { label: "WHITE", hex: "#FFFFFF", bg: "var(--white)", dark: true },
  { label: "50", hex: "#F5F6FA", bg: "var(--gray-50)", dark: true },
  { label: "100", hex: "#EEF0F5", bg: "var(--gray-100)", dark: true },
  { label: "200", hex: "#DDE1EA", bg: "var(--gray-200)", dark: true },
  { label: "300", hex: "#C8CEDA", bg: "var(--gray-300)", dark: true },
  { label: "400", hex: "#A4ADBE", bg: "var(--gray-400)", dark: true },
  { label: "500", hex: "#7A8499", bg: "var(--gray-500)" },
  { label: "600", hex: "#5D6A7D", bg: "var(--gray-600)" },
  { label: "700", hex: "#4A5566", bg: "var(--gray-700)" },
  { label: "800", hex: "#2A3140", bg: "var(--gray-800)" },
  { label: "900 ★", hex: "#1A1F2A", bg: "var(--gray-900)" },
];

function Swatches({
  title,
  description,
  shades,
  columns,
}: {
  title: string;
  description?: React.ReactNode;
  shades: Shade[];
  columns?: number;
}) {
  return (
    <div className="subsection">
      <h3>{title}</h3>
      {description && (
        <p className="t-sm" style={{ color: "var(--gray-600)", margin: "0 0 var(--sp-3)" }}>
          {description}
        </p>
      )}
      <div
        className="swatch-grid"
        style={
          columns ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : undefined
        }
      >
        {shades.map((s) => (
          <div
            key={s.label}
            className={`swatch ${s.dark ? "dark" : ""}`}
            style={{
              background: s.bg,
              border: s.hex === "#FFFFFF" ? "1px solid var(--gray-200)" : undefined,
            }}
          >
            <span className="swatch__shade">{s.label}</span>
            <span className="swatch__hex">{s.hex}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SEMANTIC_CARDS = [
  {
    name: "Info",
    use: "Process updates, helpful context, non-urgent notices.",
    hex: "#2563B8 · info-600",
    bg: "var(--info-600)",
  },
  {
    name: "Success",
    use: "Confirmations: documents accepted, stage cleared.",
    hex: "#2D7A4F · success-600",
    bg: "var(--success-600)",
  },
  {
    name: "Warning",
    use: "Action required, deadlines approaching, manual review.",
    hex: "#B87514 · warn-600",
    bg: "var(--warn-600)",
  },
  {
    name: "Danger",
    use: "Failed validation, ineligibility, destructive actions.",
    hex: "#B8302D · danger-600",
    bg: "var(--danger-600)",
  },
];

const TYPE_ROWS = [
  {
    label: "Display",
    meta: (
      <>
        56 / 60 · 700
        <br />
        tracking −1.5%
      </>
    ),
    sample: "Serve with integrity.",
    sampleClass: "t-display",
  },
  {
    label: "H1 · Page title",
    meta: "40 / 48 · 700",
    sample: "Apply to the 2026 recruit class",
    sampleClass: "t-h1",
  },
  {
    label: "H2 · Section",
    meta: "30 / 38 · 700",
    sample: "Background & identity",
    sampleClass: "t-h2",
  },
  {
    label: "H3 · Subsection",
    meta: "22 / 28 · 600",
    sample: "Tell us about your education",
    sampleClass: "t-h3",
  },
  {
    label: "H4 · Card title",
    meta: "17 / 24 · 600",
    sample: "Physical fitness assessment",
    sampleClass: "t-h4",
  },
  {
    label: "Body L",
    meta: "17 / 28 · 400",
    sample:
      "Applicants must be at least 21 years of age at the start of the academy. Citizenship documentation will be verified during the background check.",
    sampleClass: "t-lg",
  },
  {
    label: "Body",
    meta: "15 / 22 · 400",
    sample:
      "Once your written examination is complete, results are typically posted to your applicant dashboard within fourteen business days. We will email you when a status changes.",
    sampleClass: "t-base",
  },
  {
    label: "Body S · Hints",
    meta: "13 / 20 · 400",
    sample:
      "Government-issued ID required. Accepted formats: PDF, JPG, PNG. Maximum 10 MB per file.",
    sampleClass: "t-sm",
  },
  {
    label: "Eyebrow",
    meta: (
      <>
        Mono · 11.5 · uppercase
        <br />
        tracking 14%
      </>
    ),
    sample: "★ Stage 03 of 07 · Background",
    sampleClass: "t-eyebrow",
  },
  {
    label: "Mono",
    meta: (
      <>
        13 · Geist Mono
        <br />
        IDs, timestamps, hashes
      </>
    ),
    sample: "APP-2026-04713 · submitted 14 May 2026 09:42 UTC",
    sampleClass: "t-mono",
  },
];

const SPACING_SCALE: [string, number][] = [
  ["--sp-1", 4],
  ["--sp-2", 8],
  ["--sp-3", 12],
  ["--sp-4", 16],
  ["--sp-5", 20],
  ["--sp-6", 24],
  ["--sp-8", 32],
  ["--sp-10", 40],
  ["--sp-12", 48],
  ["--sp-16", 64],
  ["--sp-20", 80],
];

const RADII = [
  { name: "None", value: "0px", css: 0 },
  { name: "xs · checkboxes", value: "2px", css: "var(--r-xs)" },
  { name: "sm · default", value: "4px", css: "var(--r-sm)" },
  { name: "md · modals", value: "6px", css: "var(--r-md)" },
  { name: "pill", value: "999px", css: "var(--r-pill)" },
];

const ELEVATIONS = [
  { name: "Flat", value: "0 — borders only" },
  { name: "XS · inputs", value: "shadow-xs", className: "elev-xs" },
  { name: "SM · cards", value: "shadow-sm", className: "elev-sm" },
  { name: "MD · popovers", value: "shadow-md", className: "elev-md" },
  { name: "LG · modals", value: "shadow-lg", className: "elev-lg" },
];

const UI_ICONS = [
  { name: "user", icon: User },
  { name: "upload", icon: UploadIcon },
  { name: "file-text", icon: FileText },
  { name: "check", icon: CheckCircle2 },
  { name: "alert", icon: AlertCircle },
  { name: "calendar", icon: Calendar },
  { name: "search", icon: Search },
  { name: "lock", icon: Lock },
  { name: "mail", icon: Mail },
  { name: "phone", icon: Phone },
  { name: "map-pin", icon: MapPin },
  { name: "building", icon: Building2 },
  { name: "education", icon: GraduationCap },
  { name: "work", icon: Briefcase },
  { name: "fingerprint", icon: Fingerprint },
  { name: "checklist", icon: ClipboardList },
  { name: "layers", icon: Layers },
];
