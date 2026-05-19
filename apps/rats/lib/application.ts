/* ============================================================
   Application data model + helpers
   ============================================================ */

export type Citizenship = "citizen" | "naturalised" | "pr" | "no";
export type DriverClass = "none" | "A" | "B" | "C+";

export type EligibilityAnswers = {
  citizenship: Citizenship | null;
  dob: string;
  hasEducation: boolean | null;
  heightCm: number | null;
  noFelony: boolean | null;
  driverLicence: DriverClass | null;
  firstAid: boolean | null;
};

export type Address = {
  street: string;
  city: string;
  region: string;
  postcode: string;
};

export type Personal = {
  fullName: string;
  preferredName: string;
  email: string;
  phone: string;
  nationalId: string;
  address: Address;
};

export type EducationEntry = {
  id: string;
  institution: string;
  qualification: string;
  startYear: string;
  endYear: string;
  result: string;
};

export type WorkEntry = {
  id: string;
  employer: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

export type Reference = {
  id: string;
  name: string;
  relationship: string;
  yearsKnown: string;
  email: string;
  phone: string;
};

export type BackgroundInfo = {
  nextOfKin: {
    name: string;
    relationship: string;
    phone: string;
  };
  references: Reference[];
  declarations: {
    accurate: boolean;
    consent: boolean;
    medical: boolean;
  };
};

export type DocumentStatus =
  | "missing"
  | "uploaded"
  | "verified"
  | "rejected";

export type DocumentRecord = {
  type: string;
  label: string;
  description: string;
  required: boolean;
  filename: string | null;
  sizeBytes: number | null;
  uploadedAt: string | null;
  status: DocumentStatus;
  note?: string;
};

export type ApplicationStatus = "draft" | "submitted";

export type Decision = "pending" | "offer" | "reject" | "hold";

export type AssessmentKey =
  | "written"
  | "physical-run"
  | "physical-pushups"
  | "psychological"
  | "medical";

export type AssessmentResult = {
  key: AssessmentKey;
  name: string;
  date?: string;
  score?: string;
  passMark: string;
  status: "scheduled" | "pass" | "fail" | "pending";
  reference: string;
  note?: string;
};

export type Application = {
  status: ApplicationStatus;
  applicantId: string;
  intakeId: string;
  intakeAcademyStartDate: string;
  eligibility: EligibilityAnswers;
  personal: Personal;
  education: EducationEntry[];
  work: WorkEntry[];
  documents: DocumentRecord[];
  background: BackgroundInfo;
  ownerEmail?: string;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  /* Admin-side fields. Optional because applicant-side never sets them. */
  decision?: Decision;
  reviewerNotes?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  assessments?: AssessmentResult[];
};

export type User = {
  email: string;
  signedInAt: string;
};

export type AdminUser = {
  email: string;
  name: string;
  role: string;
  signedInAt: string;
};

export type IntakeStatus = "draft" | "open" | "closed" | "completed";

export type Intake = {
  id: string;
  name: string;
  description: string;
  status: IntakeStatus;
  capacity: number;
  openDate: string;
  closeDate: string;
  academyStartDate: string;
  createdAt: string;
  createdBy?: string;
  updatedAt: string;
};

/* ─── Constants ─── */

export const ACADEMY_START = "2026-09-01";
export const APPLICATION_KEY = "sentinel:application";
export const USER_KEY = "sentinel:user";
export const ADMIN_USER_KEY = "sentinel:adminUser";
export const ADMIN_APPLICATIONS_KEY = "sentinel:adminApplications";
export const INTAKES_KEY = "sentinel:intakes";
export const DEFAULT_INTAKE_ID = "2026-B";

export const DEFAULT_ELIGIBILITY: EligibilityAnswers = {
  citizenship: null,
  dob: "",
  hasEducation: null,
  heightCm: null,
  noFelony: null,
  driverLicence: null,
  firstAid: null,
};

export const EMPTY_ADDRESS: Address = {
  street: "",
  city: "",
  region: "",
  postcode: "",
};

export const EMPTY_PERSONAL: Personal = {
  fullName: "",
  preferredName: "",
  email: "",
  phone: "",
  nationalId: "",
  address: { ...EMPTY_ADDRESS },
};

export const EMPTY_BACKGROUND: BackgroundInfo = {
  nextOfKin: { name: "", relationship: "", phone: "" },
  references: [],
  declarations: { accurate: false, consent: false, medical: false },
};

export const REQUIRED_DOCUMENTS: Omit<
  DocumentRecord,
  "filename" | "sizeBytes" | "uploadedAt" | "status" | "note"
>[] = [
  {
    type: "national-id",
    label: "National ID — front & back",
    description: "Government-issued identity card or international passport.",
    required: true,
  },
  {
    type: "transcript",
    label: "Secondary school transcript",
    description: "Senior Secondary Certificate or equivalent.",
    required: true,
  },
  {
    type: "address-proof",
    label: "Proof of residential address",
    description: "Utility bill or bank statement issued in the last 3 months.",
    required: true,
  },
  {
    type: "passport-photo",
    label: "Passport photograph",
    description: "Recent front-facing photograph on a plain white background.",
    required: true,
  },
  {
    type: "first-aid",
    label: "First-aid certification",
    description: "Optional if you hold one; required for some specialist units.",
    required: false,
  },
  {
    type: "recommendation",
    label: "Letters of recommendation",
    description: "Up to three letters from non-relatives who have known you for at least two years.",
    required: false,
  },
];

export function initialDocuments(): DocumentRecord[] {
  return REQUIRED_DOCUMENTS.map((d) => ({
    ...d,
    filename: null,
    sizeBytes: null,
    uploadedAt: null,
    status: "missing" as const,
  }));
}

/* ─── ID + factory helpers ─── */

export function generateApplicantId(): string {
  const year = new Date().getFullYear();
  const n = Math.floor(Math.random() * 99999)
    .toString()
    .padStart(5, "0");
  return `APP-${year}-${n}`;
}

function shortId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function newEducationEntry(): EducationEntry {
  return {
    id: shortId(),
    institution: "",
    qualification: "",
    startYear: "",
    endYear: "",
    result: "",
  };
}

export function newWorkEntry(): WorkEntry {
  return {
    id: shortId(),
    employer: "",
    role: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  };
}

export function newReference(): Reference {
  return {
    id: shortId(),
    name: "",
    relationship: "",
    yearsKnown: "",
    email: "",
    phone: "",
  };
}

export function emptyApplication(): Application {
  const now = new Date().toISOString();
  return {
    status: "draft",
    applicantId: generateApplicantId(),
    intakeId: DEFAULT_INTAKE_ID,
    intakeAcademyStartDate: ACADEMY_START,
    eligibility: { ...DEFAULT_ELIGIBILITY },
    personal: { ...EMPTY_PERSONAL, address: { ...EMPTY_ADDRESS } },
    education: [],
    work: [],
    documents: initialDocuments(),
    background: {
      nextOfKin: { ...EMPTY_BACKGROUND.nextOfKin },
      references: [],
      declarations: { ...EMPTY_BACKGROUND.declarations },
    },
    createdAt: now,
    updatedAt: now,
  };
}

/* ─── Migration / normalization ─── */

type Raw = Record<string, unknown>;

function asString(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function asBool(v: unknown): boolean {
  return typeof v === "boolean" ? v : false;
}

function asObject(v: unknown): Raw {
  return typeof v === "object" && v !== null ? (v as Raw) : {};
}

export function normalizeApplication(raw: unknown): Application {
  const r = asObject(raw);
  const now = new Date().toISOString();
  const personal = asObject(r.personal);
  const address = asObject(personal.address);
  const background = asObject(r.background);
  const nok = asObject(background.nextOfKin);
  const decl = asObject(background.declarations);

  const storedDocs = Array.isArray(r.documents) ? (r.documents as Raw[]) : [];
  const documents: DocumentRecord[] = REQUIRED_DOCUMENTS.map((spec) => {
    const found = storedDocs.find((d) => d.type === spec.type);
    return {
      ...spec,
      filename: found ? (typeof found.filename === "string" ? found.filename : null) : null,
      sizeBytes: found && typeof found.sizeBytes === "number" ? found.sizeBytes : null,
      uploadedAt: found && typeof found.uploadedAt === "string" ? found.uploadedAt : null,
      status:
        found && typeof found.status === "string"
          ? (found.status as DocumentStatus)
          : "missing",
      note: found && typeof found.note === "string" ? found.note : undefined,
    };
  });

  const education = Array.isArray(r.education)
    ? (r.education as Raw[]).map((e) => ({
        id: asString(e.id, shortId()),
        institution: asString(e.institution),
        qualification: asString(e.qualification),
        startYear: asString(e.startYear),
        endYear: asString(e.endYear),
        result: asString(e.result),
      }))
    : [];

  const work = Array.isArray(r.work)
    ? (r.work as Raw[]).map((w) => ({
        id: asString(w.id, shortId()),
        employer: asString(w.employer),
        role: asString(w.role),
        startDate: asString(w.startDate),
        endDate: asString(w.endDate),
        current: asBool(w.current),
        description: asString(w.description),
      }))
    : [];

  const references = Array.isArray(background.references)
    ? (background.references as Raw[]).map((ref) => ({
        id: asString(ref.id, shortId()),
        name: asString(ref.name),
        relationship: asString(ref.relationship),
        yearsKnown: asString(ref.yearsKnown),
        email: asString(ref.email),
        phone: asString(ref.phone),
      }))
    : [];

  const eligibility = asObject(r.eligibility);

  return {
    status: r.status === "submitted" ? "submitted" : "draft",
    applicantId: asString(r.applicantId, generateApplicantId()),
    intakeId: asString(r.intakeId, DEFAULT_INTAKE_ID),
    intakeAcademyStartDate: asString(r.intakeAcademyStartDate, ACADEMY_START),
    eligibility: {
      citizenship:
        eligibility.citizenship === "citizen" ||
        eligibility.citizenship === "naturalised" ||
        eligibility.citizenship === "pr" ||
        eligibility.citizenship === "no"
          ? eligibility.citizenship
          : null,
      dob: asString(eligibility.dob),
      hasEducation:
        typeof eligibility.hasEducation === "boolean"
          ? eligibility.hasEducation
          : null,
      heightCm:
        typeof eligibility.heightCm === "number" ? eligibility.heightCm : null,
      noFelony:
        typeof eligibility.noFelony === "boolean" ? eligibility.noFelony : null,
      driverLicence:
        eligibility.driverLicence === "none" ||
        eligibility.driverLicence === "A" ||
        eligibility.driverLicence === "B" ||
        eligibility.driverLicence === "C+"
          ? eligibility.driverLicence
          : null,
      firstAid:
        typeof eligibility.firstAid === "boolean" ? eligibility.firstAid : null,
    },
    personal: {
      fullName: asString(personal.fullName),
      preferredName: asString(personal.preferredName),
      email: asString(personal.email),
      phone: asString(personal.phone),
      nationalId: asString(personal.nationalId),
      address: {
        street: asString(address.street),
        city: asString(address.city),
        region: asString(address.region),
        postcode: asString(address.postcode),
      },
    },
    education,
    work,
    documents,
    background: {
      nextOfKin: {
        name: asString(nok.name),
        relationship: asString(nok.relationship),
        phone: asString(nok.phone),
      },
      references,
      declarations: {
        accurate: asBool(decl.accurate),
        consent: asBool(decl.consent),
        medical: asBool(decl.medical),
      },
    },
    ownerEmail: typeof r.ownerEmail === "string" ? r.ownerEmail : undefined,
    createdAt: asString(r.createdAt, now),
    updatedAt: asString(r.updatedAt, now),
    submittedAt: typeof r.submittedAt === "string" ? r.submittedAt : undefined,
    decision:
      r.decision === "offer" ||
      r.decision === "reject" ||
      r.decision === "hold" ||
      r.decision === "pending"
        ? r.decision
        : undefined,
    reviewerNotes:
      typeof r.reviewerNotes === "string" ? r.reviewerNotes : undefined,
    reviewedAt: typeof r.reviewedAt === "string" ? r.reviewedAt : undefined,
    reviewedBy: typeof r.reviewedBy === "string" ? r.reviewedBy : undefined,
    assessments: Array.isArray(r.assessments)
      ? ((r.assessments as Raw[])
          .map((a) => ({
            key: asString(a.key) as AssessmentKey,
            name: asString(a.name),
            date: typeof a.date === "string" ? a.date : undefined,
            score: typeof a.score === "string" ? a.score : undefined,
            passMark: asString(a.passMark),
            status:
              a.status === "pass" ||
              a.status === "fail" ||
              a.status === "pending"
                ? a.status
                : "scheduled",
            reference: asString(a.reference),
            note: typeof a.note === "string" ? a.note : undefined,
          })) as AssessmentResult[])
      : undefined,
  };
}

/* ─── Eligibility evaluation ─── */

export function calculateAgeAtIntake(
  dobIso: string,
  intakeIso: string = ACADEMY_START,
): number | null {
  if (!dobIso) return null;
  const dob = new Date(dobIso);
  const intake = new Date(intakeIso);
  if (Number.isNaN(dob.getTime()) || Number.isNaN(intake.getTime())) return null;
  let age = intake.getFullYear() - dob.getFullYear();
  const m = intake.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && intake.getDate() < dob.getDate())) age--;
  return age;
}

export type CriterionResult = {
  key: string;
  name: string;
  detail: string;
  status: "met" | "fail" | "pending";
};

function formatAcademyStart(iso: string): string {
  if (!iso) return "academy start";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function evaluateEligibility(
  answers: EligibilityAnswers,
  intakeAcademyStartDate: string = ACADEMY_START,
): CriterionResult[] {
  const age = calculateAgeAtIntake(answers.dob, intakeAcademyStartDate);
  const academyLabel = formatAcademyStart(intakeAcademyStartDate);
  return [
    {
      key: "citizenship",
      name: "Citizenship",
      detail:
        answers.citizenship === "citizen"
          ? "Citizen by birth"
          : answers.citizenship === "naturalised"
            ? "Naturalised citizen"
            : answers.citizenship === "pr"
              ? "Permanent resident"
              : answers.citizenship === "no"
                ? "Not a citizen or permanent resident"
                : "Awaiting answer",
      status:
        answers.citizenship === null
          ? "pending"
          : answers.citizenship === "no"
            ? "fail"
            : "met",
    },
    {
      key: "age",
      name: "Age — at least 21 by start of academy",
      detail: !answers.dob
        ? "Date of birth required"
        : age !== null
          ? `${age} years at academy start (${academyLabel})`
          : "Date of birth required",
      status:
        !answers.dob || age === null ? "pending" : age >= 21 ? "met" : "fail",
    },
    {
      key: "education",
      name: "Education — Senior Secondary Certificate",
      detail:
        answers.hasEducation === true
          ? "SSC confirmed"
          : answers.hasEducation === false
            ? "Does not hold SSC"
            : "Awaiting answer",
      status:
        answers.hasEducation === null
          ? "pending"
          : answers.hasEducation
            ? "met"
            : "fail",
    },
    {
      key: "height",
      name: "Height — minimum 1.67 m",
      detail:
        answers.heightCm !== null
          ? `${(answers.heightCm / 100).toFixed(2)} m`
          : "Awaiting answer",
      status:
        answers.heightCm === null
          ? "pending"
          : answers.heightCm >= 167
            ? "met"
            : "fail",
    },
    {
      key: "felony",
      name: "No felony convictions",
      detail:
        answers.noFelony === true
          ? "Self-declared · subject to background verification"
          : answers.noFelony === false
            ? "Declared a prior felony conviction"
            : "Awaiting answer",
      status:
        answers.noFelony === null ? "pending" : answers.noFelony ? "met" : "fail",
    },
    {
      key: "licence",
      name: "Driver's licence — Class B or higher",
      detail:
        answers.driverLicence === null
          ? "Awaiting answer"
          : answers.driverLicence === "none"
            ? "No licence held"
            : `Class ${answers.driverLicence}`,
      status:
        answers.driverLicence === null
          ? "pending"
          : answers.driverLicence === "B" || answers.driverLicence === "C+"
            ? "met"
            : "fail",
    },
    {
      key: "firstAid",
      name: "First-aid certification (within 24 months)",
      detail:
        answers.firstAid === true
          ? "Current certification held"
          : answers.firstAid === false
            ? "Not held — enrol in a short course before submitting"
            : "Awaiting answer",
      status:
        answers.firstAid === null ? "pending" : answers.firstAid ? "met" : "fail",
    },
  ];
}

export type EligibilitySummary = {
  results: CriterionResult[];
  met: number;
  fail: number;
  pending: number;
  total: number;
  allComplete: boolean;
  allMet: boolean;
};

export function summarizeEligibility(
  answers: EligibilityAnswers,
  intakeAcademyStartDate: string = ACADEMY_START,
): EligibilitySummary {
  const results = evaluateEligibility(answers, intakeAcademyStartDate);
  const met = results.filter((r) => r.status === "met").length;
  const fail = results.filter((r) => r.status === "fail").length;
  const pending = results.filter((r) => r.status === "pending").length;
  return {
    results,
    met,
    fail,
    pending,
    total: results.length,
    allComplete: pending === 0,
    allMet: met === results.length,
  };
}

/* ─── Stage definitions ─── */

export type StageKey =
  | "eligibility"
  | "personal"
  | "education"
  | "work"
  | "documents"
  | "background"
  | "submit";

export type StageMeta = {
  key: StageKey;
  name: string;
  href: string;
  description: string;
  /** Whether this stage counts toward the application percentage. */
  contributesToProgress: boolean;
};

export const STAGES: StageMeta[] = [
  {
    key: "eligibility",
    name: "Eligibility",
    href: "/apply",
    description: "Confirm you meet the published criteria.",
    contributesToProgress: true,
  },
  {
    key: "personal",
    name: "Personal details",
    href: "/dashboard/personal",
    description: "Your legal name, contact, and address.",
    contributesToProgress: true,
  },
  {
    key: "education",
    name: "Education",
    href: "/dashboard/education",
    description: "Schools, certificates, and results.",
    contributesToProgress: true,
  },
  {
    key: "work",
    name: "Work history",
    href: "/dashboard/work",
    description: "Past and current employment.",
    contributesToProgress: true,
  },
  {
    key: "documents",
    name: "Documents",
    href: "/dashboard/documents",
    description: "Upload supporting evidence.",
    contributesToProgress: true,
  },
  {
    key: "background",
    name: "Background check",
    href: "/dashboard/background",
    description: "Next of kin, references, and declarations.",
    contributesToProgress: true,
  },
  {
    key: "submit",
    name: "Review & submit",
    href: "/dashboard/submit",
    description: "Confirm everything is correct before submitting.",
    contributesToProgress: false,
  },
];

export type StageState = {
  complete: boolean;
  passing: boolean;
  detail: string;
};

export function stageState(app: Application, key: StageKey): StageState {
  switch (key) {
    case "eligibility": {
      const s = summarizeEligibility(
        app.eligibility,
        app.intakeAcademyStartDate ?? ACADEMY_START,
      );
      return {
        complete: s.allComplete,
        passing: s.allComplete && s.allMet,
        detail: s.allMet
          ? "All criteria met"
          : s.allComplete
            ? `${s.met} of ${s.total} met`
            : `${s.pending} of ${s.total} unanswered`,
      };
    }
    case "personal": {
      const p = app.personal;
      const required = [
        p.fullName,
        p.email,
        p.phone,
        p.nationalId,
        p.address.street,
        p.address.city,
        p.address.region,
      ];
      const filled = required.filter((v) => v.trim().length > 0).length;
      const complete = filled === required.length;
      return {
        complete,
        passing: complete,
        detail: complete ? "Complete" : `${filled} of ${required.length} fields`,
      };
    }
    case "education": {
      const entries = app.education;
      const validEntries = entries.filter(
        (e) =>
          e.institution.trim() && e.qualification.trim() && e.endYear.trim(),
      );
      const complete = validEntries.length >= 1;
      return {
        complete,
        passing: complete,
        detail: complete
          ? `${validEntries.length} entr${validEntries.length === 1 ? "y" : "ies"}`
          : "Add at least one entry",
      };
    }
    case "work": {
      const entries = app.work;
      const validEntries = entries.filter(
        (w) => w.employer.trim() && w.role.trim() && w.startDate.trim(),
      );
      // Work history is optional but the page must be visited.
      // We mark complete if there's at least one valid entry OR the user has
      // saved an empty page (handled by tracking on save in localStorage; for
      // simplicity, treat any save with no entries as opting out, valid).
      const complete = validEntries.length >= 1 || entries.length === 0;
      return {
        complete,
        passing: true,
        detail:
          validEntries.length > 0
            ? `${validEntries.length} entr${validEntries.length === 1 ? "y" : "ies"}`
            : entries.length === 0
              ? "Not started — optional"
              : "Incomplete entries",
      };
    }
    case "documents": {
      const req = app.documents.filter((d) => d.required);
      const uploaded = req.filter((d) => d.status !== "missing");
      const verified = req.filter(
        (d) => d.status === "verified" || d.status === "uploaded",
      );
      const complete = uploaded.length === req.length;
      return {
        complete,
        passing: verified.length === req.length,
        detail: `${uploaded.length} of ${req.length} required uploaded`,
      };
    }
    case "background": {
      const b = app.background;
      const nokOk =
        b.nextOfKin.name.trim() &&
        b.nextOfKin.relationship.trim() &&
        b.nextOfKin.phone.trim();
      const refsOk =
        b.references.filter((r) => r.name.trim() && r.phone.trim()).length >= 2;
      const declOk = b.declarations.accurate && b.declarations.consent;
      const complete = Boolean(nokOk && refsOk && declOk);
      return {
        complete,
        passing: complete,
        detail: complete
          ? "Complete"
          : !nokOk
            ? "Add next-of-kin contact"
            : !refsOk
              ? "Add at least two references"
              : "Confirm declarations",
      };
    }
    case "submit":
      return {
        complete: app.status === "submitted",
        passing: app.status === "submitted",
        detail: app.status === "submitted" ? "Submitted" : "Not submitted",
      };
  }
}

export function applicationProgress(app: Application): {
  percent: number;
  completedStages: number;
  totalStages: number;
  readyToSubmit: boolean;
} {
  const stages = STAGES.filter((s) => s.contributesToProgress);
  const completed = stages.filter((s) => stageState(app, s.key).complete).length;
  const passing = stages.filter((s) => stageState(app, s.key).passing).length;
  return {
    percent: Math.round((completed / stages.length) * 100),
    completedStages: completed,
    totalStages: stages.length,
    readyToSubmit: passing === stages.length,
  };
}

export function nextIncompleteStage(app: Application): StageMeta | null {
  for (const s of STAGES) {
    if (!s.contributesToProgress) continue;
    if (!stageState(app, s.key).complete) return s;
  }
  return null;
}

/* ============================================================
   Admin queue — list of submitted applications visible to records office
   ============================================================ */

export function loadAdminApplications(): Application[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ADMIN_APPLICATIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeApplication) : [];
  } catch {
    return [];
  }
}

export function saveAdminApplications(list: Application[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ADMIN_APPLICATIONS_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export function upsertAdminApplication(app: Application): Application[] {
  const list = loadAdminApplications();
  const idx = list.findIndex((a) => a.applicantId === app.applicantId);
  const stamped: Application = {
    ...app,
    decision: app.decision ?? "pending",
    updatedAt: new Date().toISOString(),
  };
  if (idx >= 0) list[idx] = stamped;
  else list.push(stamped);
  saveAdminApplications(list);
  return list;
}

export function pushToAdminQueue(app: Application): Application[] {
  return upsertAdminApplication({
    ...app,
    status: "submitted",
    submittedAt: app.submittedAt ?? new Date().toISOString(),
    decision: app.decision ?? "pending",
  });
}

export function ensureSeedAdminApplications(): Application[] {
  if (typeof window === "undefined") return [];
  const existing = loadAdminApplications();
  if (existing.length > 0) return existing;
  const seeded = buildSeedApplications();
  saveAdminApplications(seeded);
  return seeded;
}

/* ============================================================
   Demo seed data — four applications across decision states
   ============================================================ */

function ageDateForYears(years: number): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - years);
  return d.toISOString().slice(0, 10);
}

function buildSeedApplications(): Application[] {
  const now = new Date().toISOString();

  function docsFor(
    overrides: Partial<Record<string, Partial<DocumentRecord>>> = {},
  ): DocumentRecord[] {
    return REQUIRED_DOCUMENTS.map((spec) => {
      const ov = overrides[spec.type] ?? {};
      return {
        ...spec,
        filename:
          ov.filename ??
          (spec.required ? `${spec.type}_${Math.floor(Math.random() * 9000) + 1000}.pdf` : null),
        sizeBytes: ov.sizeBytes ?? (spec.required ? 1_200_000 : null),
        uploadedAt: ov.uploadedAt ?? (spec.required ? now : null),
        status: ov.status ?? (spec.required ? "uploaded" : "missing"),
        note: ov.note,
      };
    });
  }

  const base = (
    applicantId: string,
    overrides: Partial<Application>,
  ): Application => ({
    status: "submitted",
    applicantId,
    intakeId: DEFAULT_INTAKE_ID,
    intakeAcademyStartDate: ACADEMY_START,
    eligibility: { ...DEFAULT_ELIGIBILITY },
    personal: { ...EMPTY_PERSONAL, address: { ...EMPTY_ADDRESS } },
    education: [],
    work: [],
    documents: docsFor(),
    background: {
      nextOfKin: { ...EMPTY_BACKGROUND.nextOfKin },
      references: [],
      declarations: { accurate: true, consent: true, medical: true },
    },
    createdAt: now,
    updatedAt: now,
    submittedAt: now,
    decision: "pending",
    ...overrides,
  });

  const adaeze = base("APP-2026-04713", {
    ownerEmail: "adaeze.okafor@example.com",
    eligibility: {
      citizenship: "citizen",
      dob: ageDateForYears(23),
      hasEducation: true,
      heightCm: 172,
      noFelony: true,
      driverLicence: "B",
      firstAid: true,
    },
    personal: {
      fullName: "Adaeze Okafor",
      preferredName: "Adaeze",
      email: "adaeze.okafor@example.com",
      phone: "+234 803 555 1234",
      nationalId: "12345678901",
      address: {
        street: "14 Oba Akran Avenue",
        city: "Ikeja",
        region: "Lagos",
        postcode: "100271",
      },
    },
    education: [
      {
        id: "e1",
        institution: "Federal Government College Lagos",
        qualification: "Senior Secondary Certificate",
        startYear: "2015",
        endYear: "2021",
        result: "6 credits incl. English & Maths",
      },
    ],
    work: [
      {
        id: "w1",
        employer: "Lagos Metro Co-operative",
        role: "Operations assistant",
        startDate: "2022-06",
        endDate: "",
        current: true,
        description: "Coordinates daily logistics for a 40-person co-operative.",
      },
    ],
    documents: docsFor(),
    background: {
      nextOfKin: {
        name: "Ifeoma Okafor",
        relationship: "Mother",
        phone: "+234 803 555 9876",
      },
      references: [
        {
          id: "r1",
          name: "Mr Adebayo Lawal",
          relationship: "Secondary school principal",
          yearsKnown: "8",
          email: "alawal@fgclagos.edu",
          phone: "+234 802 555 1111",
        },
        {
          id: "r2",
          name: "Ms Funke Adesina",
          relationship: "Co-op manager",
          yearsKnown: "3",
          email: "fadesina@lmc.example",
          phone: "+234 802 555 2222",
        },
      ],
      declarations: { accurate: true, consent: true, medical: true },
    },
    decision: "pending",
    reviewerNotes: "",
  });

  const tunde = base("APP-2026-04692", {
    ownerEmail: "tunde.adesanya@example.com",
    eligibility: {
      citizenship: "citizen",
      dob: ageDateForYears(25),
      hasEducation: true,
      heightCm: 178,
      noFelony: true,
      driverLicence: "C+",
      firstAid: false,
    },
    personal: {
      fullName: "Tunde Adesanya",
      preferredName: "Tunde",
      email: "tunde.adesanya@example.com",
      phone: "+234 805 222 3344",
      nationalId: "22334455667",
      address: {
        street: "8 Ibadan Crescent",
        city: "Ibadan",
        region: "Oyo",
        postcode: "200284",
      },
    },
    education: [
      {
        id: "e1",
        institution: "Government College Ibadan",
        qualification: "Senior Secondary Certificate",
        startYear: "2014",
        endYear: "2020",
        result: "5 credits incl. English",
      },
    ],
    work: [
      {
        id: "w1",
        employer: "Adesanya Transport Ltd",
        role: "Driver",
        startDate: "2021-02",
        endDate: "2023-12",
        current: false,
        description: "Light vehicle deliveries across the south-west.",
      },
    ],
    documents: docsFor({
      "passport-photo": {
        status: "rejected",
        note: "Photo is overexposed — re-upload required.",
      },
    }),
    background: {
      nextOfKin: {
        name: "Bolanle Adesanya",
        relationship: "Sister",
        phone: "+234 805 222 9988",
      },
      references: [
        {
          id: "r1",
          name: "Mr Kunle Ojo",
          relationship: "Former employer",
          yearsKnown: "5",
          email: "kojo@adesanya.example",
          phone: "+234 802 333 1111",
        },
        {
          id: "r2",
          name: "Mrs Yetunde Bello",
          relationship: "Community elder",
          yearsKnown: "10",
          email: "",
          phone: "+234 802 333 2222",
        },
      ],
      declarations: { accurate: true, consent: true, medical: true },
    },
    decision: "hold",
    reviewerNotes:
      "Document rejected; await re-upload before continuing review.",
  });

  const chinma = base("APP-2026-04501", {
    ownerEmail: "chinma.eze@example.com",
    eligibility: {
      citizenship: "naturalised",
      dob: ageDateForYears(24),
      hasEducation: true,
      heightCm: 169,
      noFelony: true,
      driverLicence: "B",
      firstAid: true,
    },
    personal: {
      fullName: "Chinma Eze",
      preferredName: "Chinma",
      email: "chinma.eze@example.com",
      phone: "+234 809 444 5566",
      nationalId: "55667788990",
      address: {
        street: "21 Aba Road",
        city: "Port Harcourt",
        region: "Rivers",
        postcode: "500272",
      },
    },
    education: [
      {
        id: "e1",
        institution: "Federal Science College Port Harcourt",
        qualification: "Senior Secondary Certificate",
        startYear: "2013",
        endYear: "2019",
        result: "Distinction",
      },
      {
        id: "e2",
        institution: "Rivers State University",
        qualification: "Diploma in Public Administration",
        startYear: "2019",
        endYear: "2022",
        result: "Upper class",
      },
    ],
    work: [
      {
        id: "w1",
        employer: "Rivers State Civil Service",
        role: "Administrative officer",
        startDate: "2022-08",
        endDate: "",
        current: true,
        description: "Records management for the state secretariat.",
      },
    ],
    documents: docsFor({
      "national-id": { status: "verified" },
      transcript: { status: "verified" },
      "address-proof": { status: "verified" },
      "passport-photo": { status: "verified" },
      "first-aid": {
        status: "verified",
        filename: "first_aid_cert.pdf",
        sizeBytes: 900_000,
        uploadedAt: now,
      },
    }),
    background: {
      nextOfKin: {
        name: "Dr Obinna Eze",
        relationship: "Father",
        phone: "+234 809 444 7788",
      },
      references: [
        {
          id: "r1",
          name: "Prof. Ngozi Aluko",
          relationship: "University lecturer",
          yearsKnown: "6",
          email: "naluko@rsu.example",
          phone: "+234 803 444 1111",
        },
        {
          id: "r2",
          name: "Mr Tobi Wokoma",
          relationship: "Line manager",
          yearsKnown: "3",
          email: "twokoma@rscs.example",
          phone: "+234 803 444 2222",
        },
      ],
      declarations: { accurate: true, consent: true, medical: true },
    },
    decision: "offer",
    reviewerNotes:
      "All criteria met. Conditional offer extended for 2026-B intake.",
    reviewedAt: now,
    reviewedBy: "records.officer@example.com",
  });

  const bola = base("APP-2026-04778", {
    ownerEmail: "bola.williams@example.com",
    eligibility: {
      citizenship: "citizen",
      dob: ageDateForYears(22),
      hasEducation: true,
      heightCm: 170,
      noFelony: true,
      driverLicence: "B",
      firstAid: false,
    },
    personal: {
      fullName: "Bola Williams",
      preferredName: "Bola",
      email: "bola.williams@example.com",
      phone: "+234 802 666 7788",
      nationalId: "33445566778",
      address: {
        street: "5 Garden City Lane",
        city: "Enugu",
        region: "Enugu",
        postcode: "400281",
      },
    },
    education: [
      {
        id: "e1",
        institution: "Loyola College Enugu",
        qualification: "Senior Secondary Certificate",
        startYear: "2016",
        endYear: "2022",
        result: "5 credits",
      },
    ],
    work: [],
    documents: docsFor({
      "address-proof": { status: "missing", filename: null, sizeBytes: null, uploadedAt: null },
    }),
    background: {
      nextOfKin: {
        name: "Chinedu Williams",
        relationship: "Brother",
        phone: "+234 802 666 1010",
      },
      references: [
        {
          id: "r1",
          name: "Father Anthony Eke",
          relationship: "Parish priest",
          yearsKnown: "12",
          email: "",
          phone: "+234 802 666 1111",
        },
      ],
      declarations: { accurate: true, consent: true, medical: true },
    },
    decision: "pending",
    reviewerNotes: "Waiting on proof of address upload before review.",
  });

  return [chinma, adaeze, tunde, bola];
}

/* ============================================================
   Intakes — recruit classes the records office opens for application
   ============================================================ */

export function newIntake(overrides: Partial<Intake> = {}): Intake {
  const now = new Date().toISOString();
  return {
    id: "",
    name: "",
    description: "",
    status: "draft",
    capacity: 50,
    openDate: now.slice(0, 10),
    closeDate: "",
    academyStartDate: "",
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

function normalizeIntake(raw: unknown): Intake {
  const r = asObject(raw);
  const now = new Date().toISOString();
  const status =
    r.status === "open" ||
    r.status === "closed" ||
    r.status === "completed" ||
    r.status === "draft"
      ? r.status
      : "draft";
  return {
    id: asString(r.id),
    name: asString(r.name),
    description: asString(r.description),
    status,
    capacity:
      typeof r.capacity === "number" && Number.isFinite(r.capacity)
        ? r.capacity
        : 0,
    openDate: asString(r.openDate),
    closeDate: asString(r.closeDate),
    academyStartDate: asString(r.academyStartDate),
    createdAt: asString(r.createdAt, now),
    createdBy: typeof r.createdBy === "string" ? r.createdBy : undefined,
    updatedAt: asString(r.updatedAt, now),
  };
}

export function loadIntakes(): Intake[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(INTAKES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeIntake) : [];
  } catch {
    return [];
  }
}

export function saveIntakes(list: Intake[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(INTAKES_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export function upsertIntake(intake: Intake): Intake[] {
  const list = loadIntakes();
  const idx = list.findIndex((i) => i.id === intake.id);
  const stamped: Intake = { ...intake, updatedAt: new Date().toISOString() };
  if (idx >= 0) list[idx] = stamped;
  else list.push(stamped);
  saveIntakes(list);
  return list;
}

export function deleteIntake(id: string): Intake[] {
  const list = loadIntakes().filter((i) => i.id !== id);
  saveIntakes(list);
  return list;
}

export function getIntake(id: string): Intake | null {
  return loadIntakes().find((i) => i.id === id) ?? null;
}

export function listOpenIntakes(): Intake[] {
  return loadIntakes().filter((i) => i.status === "open");
}

export function ensureSeedIntakes(): Intake[] {
  if (typeof window === "undefined") return [];
  const existing = loadIntakes();
  if (existing.length > 0) return existing;
  const seed = buildSeedIntakes();
  saveIntakes(seed);
  return seed;
}

function buildSeedIntakes(): Intake[] {
  const now = new Date().toISOString();
  return [
    {
      id: "2026-A",
      name: "2026-A intake",
      description:
        "First intake of 2026. Closed for applications; academy class in session.",
      status: "completed",
      capacity: 60,
      openDate: "2025-08-01",
      closeDate: "2025-12-15",
      academyStartDate: "2026-03-01",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "2026-B",
      name: "2026-B intake",
      description:
        "Mid-year intake. Applications are open now and close on 30 June 2026.",
      status: "open",
      capacity: 80,
      openDate: "2026-03-01",
      closeDate: "2026-06-30",
      academyStartDate: "2026-09-01",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "2027-A",
      name: "2027-A intake",
      description:
        "First intake of 2027. Draft — awaiting commissioner approval before opening.",
      status: "draft",
      capacity: 100,
      openDate: "2026-10-01",
      closeDate: "2027-02-01",
      academyStartDate: "2027-04-01",
      createdAt: now,
      updatedAt: now,
    },
  ];
}
