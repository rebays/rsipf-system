/* ============================================================
   Application data model + helpers
   ============================================================ */

export type Citizenship = "citizen" | "naturalised" | "pr" | "no";

/**
 * RSIPF pre-selection requirements (2022 Recruitment Campaign Package, p.8).
 * Each answer is a self-declaration on the eligibility page; medical and
 * criminal-record claims are verified later in the admin pipeline.
 */
export type EligibilityAnswers = {
  citizenship: Citizenship | null;
  noCriminalRecord: boolean | null;
  formFiveCompleted: boolean | null;
  medicallyFit: boolean | null;
  physicallyFit: boolean | null;
};

export type Address = {
  street: string;
  city: string;
  region: string;
  postcode: string;
};

export type Gender = "male" | "female";

/**
 * Driver's licence is informational on the Police Recruit Application form —
 * "Do you have a current driver's licence?" with optional number/classes/expiry.
 * Not a pre-selection requirement.
 */
export type DriverLicence = {
  hasLicence: boolean | null;
  number: string;
  classes: string;
  expiry: string;
};

export type Personal = {
  fullName: string;
  preferredName: string;
  secondName: string;
  dob: string;
  gender: Gender | null;
  email: string;
  phone: string;
  nationalId: string;
  birthPlace: string;
  provinceOfOrigin: string;
  provinceOfBirth: string;
  religion: string;
  marks: string;
  address: Address;
  postalAddress: Address;
  postalSameAsHome: boolean;
  driverLicence: DriverLicence;
};

export type ServiceHistory = {
  previousApplication: boolean | null;
  previouslyPoliceOfficer: boolean | null;
};

/**
 * Six yes/no disclosures from the Police Recruit Application form's
 * "Disclosure of Relevant Information" section. Any 'yes' answer requires
 * full details in the free-text field.
 */
export type Disclosures = {
  everInterviewedForOffence: boolean | null;
  currentlyInCriminalActivity: boolean | null;
  everConvictedCriminal: boolean | null;
  everConvictedOther: boolean | null;
  noConvictionRecorded: boolean | null;
  warrantEverIssued: boolean | null;
  details: string;
};

export type Statements = {
  /** ~200-word summary covering family, school, work, social history. */
  personalStatement: string;
  /** ~100-word summary of why the applicant wants to join the RSIPF. */
  reasonForJoining: string;
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
  /** Required field from the Police Recruit Application form. */
  paymentType: "paid" | "volunteer" | "";
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
    address: string;
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

/**
 * Final classification of an application, using RSIPF vocabulary from the
 * 2022 Recruitment Campaign Package. "On hold for next intake" maps to the
 * 12-month retention rule for unsuccessful applicants.
 */
export type Decision = "shortlisted" | "selected" | "notSelected" | "onHold";

/**
 * Four-stage admin pipeline from the RSIPF recruitment package (p.5).
 * 1. received       — applicant has submitted; Director HR routes to panel
 * 2. preSelection   — Recruitment Panel verifies pre-selection requirements
 * 3. selection      — entrance examination, fitness test, selection interview
 * 4. final          — Final Selection Report → Commissioner → notification
 * 5. closed         — terminal state once decision is communicated
 */
export type PipelineStage =
  | "received"
  | "preSelection"
  | "selection"
  | "final"
  | "closed";

export type StageOutcome = "pending" | "passed" | "failed" | "onHold";

export type CompletenessCheck = {
  allDocsPresent: boolean;
  panelAcknowledged: boolean;
  notes: string;
};

export type PreSelectionCheck = {
  citizenship: StageOutcome;
  criminalRecord: StageOutcome;
  formFive: StageOutcome;
  medical: StageOutcome;
  physical: StageOutcome;
  refereesContacted: boolean;
  notes: string;
};

export type ExamScore = {
  score: number | null;
  status: StageOutcome;
};

export type ExamResults = {
  dictation: ExamScore;
  mathematics: ExamScore;
  generalKnowledge: ExamScore;
  readingComprehension: ExamScore;
  essay: ExamScore;
  date: string;
};

/** Pass mark for every exam part, per RSIPF spec p.9. */
export const EXAM_PASS_MARK = 60;

export type FitnessSubtestResult = {
  /** Raw value: time in seconds for the run, count for push/sit-ups. */
  raw: number | null;
  status: StageOutcome;
};

export type FitnessTestResults = {
  /** 2.4 km run time in seconds. Men ≤ 720s (12 min), women ≤ 840s (14 min). */
  run: FitnessSubtestResult;
  /** Push-ups without stopping. Men ≥ 15, women ≥ 8. */
  pushUps: FitnessSubtestResult;
  /** Sit-ups without stopping. Men ≥ 45, women ≥ 35. */
  sitUps: FitnessSubtestResult;
  date: string;
  note: string;
};

/** Each interview rubric scored 1–5, plus per-rubric comments. */
export type InterviewRating = 1 | 2 | 3 | 4 | 5;

export type InterviewScore = {
  rating: InterviewRating | null;
  comments: string;
};

/** Five rubrics from the RSIPF spec p.13–15 (Interview Selection Requirements). */
export type InterviewResults = {
  goodCharacter: InterviewScore;
  learning: InterviewScore;
  teamMember: InterviewScore;
  thinkingSkills: InterviewScore;
  communication: InterviewScore;
  date: string;
  panelNotes: string;
};

export type SelectionResults = {
  exam: ExamResults;
  fitness: FitnessTestResults;
  interview: InterviewResults;
};

export type FinalRecommendation = "select" | "notSelect" | "onHold" | null;

export type FinalDecision = {
  recommendation: FinalRecommendation;
  commissionerApproved: boolean;
  notifiedAt: string;
  finalReport: string;
};

export type Pipeline = {
  currentStage: PipelineStage;
  received: CompletenessCheck;
  preSelection: PreSelectionCheck;
  selection: SelectionResults;
  final: FinalDecision;
};

/** Pass thresholds for the Entry Fitness Test, per RSIPF spec p.10. */
export const FITNESS_THRESHOLDS = {
  male: { runSeconds: 12 * 60, pushUps: 15, sitUps: 45 },
  female: { runSeconds: 14 * 60, pushUps: 8, sitUps: 35 },
} as const;

export function fitnessThresholdsFor(gender: Gender | null) {
  if (gender === null) return null;
  return FITNESS_THRESHOLDS[gender];
}

export function computeExamStatus(score: number | null): StageOutcome {
  if (score === null) return "pending";
  return score >= EXAM_PASS_MARK ? "passed" : "failed";
}

export function computeFitnessStatus(
  subtest: "run" | "pushUps" | "sitUps",
  raw: number | null,
  gender: Gender | null,
): StageOutcome {
  if (raw === null || gender === null) return "pending";
  const t = FITNESS_THRESHOLDS[gender];
  if (subtest === "run") return raw <= t.runSeconds ? "passed" : "failed";
  if (subtest === "pushUps") return raw >= t.pushUps ? "passed" : "failed";
  return raw >= t.sitUps ? "passed" : "failed";
}

/** Pre-selection passes when every criterion is "passed" AND referees were contacted. */
export function preSelectionOutcome(ps: PreSelectionCheck): StageOutcome {
  const criteria = [
    ps.citizenship,
    ps.criminalRecord,
    ps.formFive,
    ps.medical,
    ps.physical,
  ];
  if (criteria.some((c) => c === "failed")) return "failed";
  if (criteria.some((c) => c === "pending") || !ps.refereesContacted)
    return "pending";
  if (criteria.every((c) => c === "passed")) return "passed";
  return "pending";
}

/** Exam passes when every part scores ≥ EXAM_PASS_MARK. */
export function examOverallOutcome(exam: ExamResults): StageOutcome {
  const parts = [
    exam.dictation,
    exam.mathematics,
    exam.generalKnowledge,
    exam.readingComprehension,
    exam.essay,
  ];
  if (parts.some((p) => p.status === "failed")) return "failed";
  if (parts.some((p) => p.status === "pending")) return "pending";
  return "passed";
}

export function fitnessOverallOutcome(f: FitnessTestResults): StageOutcome {
  const subs = [f.run, f.pushUps, f.sitUps];
  if (subs.some((s) => s.status === "failed")) return "failed";
  if (subs.some((s) => s.status === "pending")) return "pending";
  return "passed";
}

/**
 * Interview overall: pass when every rubric is rated 3+ on the 1-5 scale.
 * 1-2 in any rubric is treated as a failed interview.
 */
export function interviewOverallOutcome(i: InterviewResults): StageOutcome {
  const ratings = [
    i.goodCharacter.rating,
    i.learning.rating,
    i.teamMember.rating,
    i.thinkingSkills.rating,
    i.communication.rating,
  ];
  if (ratings.some((r) => r === null)) return "pending";
  if (ratings.some((r) => (r as number) < 3)) return "failed";
  return "passed";
}

export function selectionOutcome(s: SelectionResults): StageOutcome {
  const outcomes = [
    examOverallOutcome(s.exam),
    fitnessOverallOutcome(s.fitness),
    interviewOverallOutcome(s.interview),
  ];
  if (outcomes.some((o) => o === "failed")) return "failed";
  if (outcomes.some((o) => o === "pending")) return "pending";
  return "passed";
}

export type Application = {
  status: ApplicationStatus;
  applicantId: string;
  intakeId: string;
  intakeAcademyStartDate: string;
  eligibility: EligibilityAnswers;
  personal: Personal;
  education: EducationEntry[];
  work: WorkEntry[];
  serviceHistory: ServiceHistory;
  disclosures: Disclosures;
  statements: Statements;
  documents: DocumentRecord[];
  background: BackgroundInfo;
  ownerEmail?: string;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  /* Admin-side fields. Optional because applicant-side never sets them. */
  decision?: Decision;
  pipeline?: Pipeline;
  reviewerNotes?: string;
  reviewedAt?: string;
  reviewedBy?: string;
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
  noCriminalRecord: null,
  formFiveCompleted: null,
  medicallyFit: null,
  physicallyFit: null,
};

export const EMPTY_ADDRESS: Address = {
  street: "",
  city: "",
  region: "",
  postcode: "",
};

export const EMPTY_DRIVER_LICENCE: DriverLicence = {
  hasLicence: null,
  number: "",
  classes: "",
  expiry: "",
};

export const EMPTY_PERSONAL: Personal = {
  fullName: "",
  preferredName: "",
  secondName: "",
  dob: "",
  gender: null,
  email: "",
  phone: "",
  nationalId: "",
  birthPlace: "",
  provinceOfOrigin: "",
  provinceOfBirth: "",
  religion: "",
  marks: "",
  address: { ...EMPTY_ADDRESS },
  postalAddress: { ...EMPTY_ADDRESS },
  postalSameAsHome: true,
  driverLicence: { ...EMPTY_DRIVER_LICENCE },
};

export const EMPTY_BACKGROUND: BackgroundInfo = {
  nextOfKin: { name: "", relationship: "", phone: "", address: "" },
  references: [],
  declarations: { accurate: false, consent: false, medical: false },
};

export const EMPTY_SERVICE_HISTORY: ServiceHistory = {
  previousApplication: null,
  previouslyPoliceOfficer: null,
};

export const EMPTY_DISCLOSURES: Disclosures = {
  everInterviewedForOffence: null,
  currentlyInCriminalActivity: null,
  everConvictedCriminal: null,
  everConvictedOther: null,
  noConvictionRecorded: null,
  warrantEverIssued: null,
  details: "",
};

export const EMPTY_STATEMENTS: Statements = {
  personalStatement: "",
  reasonForJoining: "",
};

const EMPTY_EXAM_SCORE: ExamScore = { score: null, status: "pending" };
const EMPTY_FITNESS_SUBTEST: FitnessSubtestResult = {
  raw: null,
  status: "pending",
};
const EMPTY_INTERVIEW_SCORE: InterviewScore = { rating: null, comments: "" };

export const EMPTY_PIPELINE: Pipeline = {
  currentStage: "received",
  received: {
    allDocsPresent: false,
    panelAcknowledged: false,
    notes: "",
  },
  preSelection: {
    citizenship: "pending",
    criminalRecord: "pending",
    formFive: "pending",
    medical: "pending",
    physical: "pending",
    refereesContacted: false,
    notes: "",
  },
  selection: {
    exam: {
      dictation: { ...EMPTY_EXAM_SCORE },
      mathematics: { ...EMPTY_EXAM_SCORE },
      generalKnowledge: { ...EMPTY_EXAM_SCORE },
      readingComprehension: { ...EMPTY_EXAM_SCORE },
      essay: { ...EMPTY_EXAM_SCORE },
      date: "",
    },
    fitness: {
      run: { ...EMPTY_FITNESS_SUBTEST },
      pushUps: { ...EMPTY_FITNESS_SUBTEST },
      sitUps: { ...EMPTY_FITNESS_SUBTEST },
      date: "",
      note: "",
    },
    interview: {
      goodCharacter: { ...EMPTY_INTERVIEW_SCORE },
      learning: { ...EMPTY_INTERVIEW_SCORE },
      teamMember: { ...EMPTY_INTERVIEW_SCORE },
      thinkingSkills: { ...EMPTY_INTERVIEW_SCORE },
      communication: { ...EMPTY_INTERVIEW_SCORE },
      date: "",
      panelNotes: "",
    },
  },
  final: {
    recommendation: null,
    commissionerApproved: false,
    notifiedAt: "",
    finalReport: "",
  },
};

/** The 10 Solomon Islands provinces plus Honiara Capital Territory. */
export const SI_PROVINCES = [
  "Choiseul",
  "Western",
  "Isabel",
  "Central",
  "Rennell and Bellona",
  "Guadalcanal",
  "Malaita",
  "Makira-Ulawa",
  "Temotu",
  "Honiara Capital Territory",
] as const;

export const REQUIRED_DOCUMENTS: Omit<
  DocumentRecord,
  "filename" | "sizeBytes" | "uploadedAt" | "status" | "note"
>[] = [
  {
    type: "citizenship-proof",
    label: "Proof of citizenship or permanent residency",
    description:
      "Birth certificate, Solomon Islands passport, or a statutory declaration signed by a Commissioner of Oaths.",
    required: true,
  },
  {
    type: "form-5",
    label: "Form 5 certificate",
    description: "Form 5 certificate or higher. Upload a clear photocopy — keep your originals.",
    required: true,
  },
  {
    type: "further-quals",
    label: "Further qualifications",
    description:
      "Tertiary academic records, other certificates, or short-course records. Optional but recommended.",
    required: false,
  },
  {
    type: "reference-letter-1",
    label: "Reference letter (1 of 2)",
    description:
      "Written reference from someone who knows you well — preferably a community leader, employer, or teacher.",
    required: true,
  },
  {
    type: "reference-letter-2",
    label: "Reference letter (2 of 2)",
    description:
      "Second written reference. Together your two referees should speak to your character and life experience.",
    required: true,
  },
  {
    type: "medical-form-a",
    label: "Medical Fitness Form — Part A",
    description:
      "Part A of the Medical Fitness Form completed and signed by you (the applicant).",
    required: true,
  },
  {
    type: "medical-form-b",
    label: "Medical Fitness Form — Part B",
    description:
      "Part B of the Medical Fitness Form completed and signed by a qualified medical doctor after a full examination.",
    required: true,
  },
  {
    type: "passport-photo",
    label: "Passport-style photograph",
    description: "Recent front-facing photograph on a plain background.",
    required: true,
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
    paymentType: "",
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
    personal: {
      ...EMPTY_PERSONAL,
      address: { ...EMPTY_ADDRESS },
      postalAddress: { ...EMPTY_ADDRESS },
      driverLicence: { ...EMPTY_DRIVER_LICENCE },
    },
    education: [],
    work: [],
    serviceHistory: { ...EMPTY_SERVICE_HISTORY },
    disclosures: { ...EMPTY_DISCLOSURES },
    statements: { ...EMPTY_STATEMENTS },
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

function asBoolOrNull(v: unknown): boolean | null {
  return typeof v === "boolean" ? v : null;
}

function asObject(v: unknown): Raw {
  return typeof v === "object" && v !== null ? (v as Raw) : {};
}

export function normalizeApplication(raw: unknown): Application {
  const r = asObject(raw);
  const now = new Date().toISOString();
  const personal = asObject(r.personal);
  const address = asObject(personal.address);
  const postalAddress = asObject(personal.postalAddress);
  const driverLicence = asObject(personal.driverLicence);
  const background = asObject(r.background);
  const nok = asObject(background.nextOfKin);
  const decl = asObject(background.declarations);
  const serviceHistory = asObject(r.serviceHistory);
  const disclosures = asObject(r.disclosures);
  const statements = asObject(r.statements);

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
        paymentType:
          w.paymentType === "paid"
            ? ("paid" as const)
            : w.paymentType === "volunteer"
              ? ("volunteer" as const)
              : ("" as const),
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
      noCriminalRecord:
        typeof eligibility.noCriminalRecord === "boolean"
          ? eligibility.noCriminalRecord
          : null,
      formFiveCompleted:
        typeof eligibility.formFiveCompleted === "boolean"
          ? eligibility.formFiveCompleted
          : null,
      medicallyFit:
        typeof eligibility.medicallyFit === "boolean"
          ? eligibility.medicallyFit
          : null,
      physicallyFit:
        typeof eligibility.physicallyFit === "boolean"
          ? eligibility.physicallyFit
          : null,
    },
    personal: {
      fullName: asString(personal.fullName),
      preferredName: asString(personal.preferredName),
      secondName: asString(personal.secondName),
      dob: asString(personal.dob),
      gender:
        personal.gender === "male" || personal.gender === "female"
          ? personal.gender
          : null,
      email: asString(personal.email),
      phone: asString(personal.phone),
      nationalId: asString(personal.nationalId),
      birthPlace: asString(personal.birthPlace),
      provinceOfOrigin: asString(personal.provinceOfOrigin),
      provinceOfBirth: asString(personal.provinceOfBirth),
      religion: asString(personal.religion),
      marks: asString(personal.marks),
      address: {
        street: asString(address.street),
        city: asString(address.city),
        region: asString(address.region),
        postcode: asString(address.postcode),
      },
      postalAddress: {
        street: asString(postalAddress.street),
        city: asString(postalAddress.city),
        region: asString(postalAddress.region),
        postcode: asString(postalAddress.postcode),
      },
      postalSameAsHome:
        typeof personal.postalSameAsHome === "boolean"
          ? personal.postalSameAsHome
          : true,
      driverLicence: {
        hasLicence: asBoolOrNull(driverLicence.hasLicence),
        number: asString(driverLicence.number),
        classes: asString(driverLicence.classes),
        expiry: asString(driverLicence.expiry),
      },
    },
    education,
    work,
    serviceHistory: {
      previousApplication: asBoolOrNull(serviceHistory.previousApplication),
      previouslyPoliceOfficer: asBoolOrNull(
        serviceHistory.previouslyPoliceOfficer,
      ),
    },
    disclosures: {
      everInterviewedForOffence: asBoolOrNull(disclosures.everInterviewedForOffence),
      currentlyInCriminalActivity: asBoolOrNull(disclosures.currentlyInCriminalActivity),
      everConvictedCriminal: asBoolOrNull(disclosures.everConvictedCriminal),
      everConvictedOther: asBoolOrNull(disclosures.everConvictedOther),
      noConvictionRecorded: asBoolOrNull(disclosures.noConvictionRecorded),
      warrantEverIssued: asBoolOrNull(disclosures.warrantEverIssued),
      details: asString(disclosures.details),
    },
    statements: {
      personalStatement: asString(statements.personalStatement),
      reasonForJoining: asString(statements.reasonForJoining),
    },
    documents,
    background: {
      nextOfKin: {
        name: asString(nok.name),
        relationship: asString(nok.relationship),
        phone: asString(nok.phone),
        address: asString(nok.address),
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
    decision: normalizeDecision(r.decision),
    pipeline: r.pipeline !== undefined ? normalizePipeline(r.pipeline) : undefined,
    reviewerNotes:
      typeof r.reviewerNotes === "string" ? r.reviewerNotes : undefined,
    reviewedAt: typeof r.reviewedAt === "string" ? r.reviewedAt : undefined,
    reviewedBy: typeof r.reviewedBy === "string" ? r.reviewedBy : undefined,
  };
}

function normalizeDecision(v: unknown): Decision | undefined {
  return v === "shortlisted" ||
    v === "selected" ||
    v === "notSelected" ||
    v === "onHold"
    ? v
    : undefined;
}

function normalizeStageOutcome(v: unknown): StageOutcome {
  return v === "passed" || v === "failed" || v === "onHold" ? v : "pending";
}

function normalizePipelineStage(v: unknown): PipelineStage {
  return v === "preSelection" ||
    v === "selection" ||
    v === "final" ||
    v === "closed"
    ? v
    : "received";
}

function normalizeExamScore(v: unknown): ExamScore {
  const o = asObject(v);
  return {
    score: typeof o.score === "number" ? o.score : null,
    status: normalizeStageOutcome(o.status),
  };
}

function normalizeFitnessSubtest(v: unknown): FitnessSubtestResult {
  const o = asObject(v);
  return {
    raw: typeof o.raw === "number" ? o.raw : null,
    status: normalizeStageOutcome(o.status),
  };
}

function normalizeInterviewScore(v: unknown): InterviewScore {
  const o = asObject(v);
  const r = o.rating;
  const rating: InterviewRating | null =
    r === 1 || r === 2 || r === 3 || r === 4 || r === 5 ? r : null;
  return { rating, comments: asString(o.comments) };
}

function normalizeFinalRecommendation(v: unknown): FinalRecommendation {
  return v === "select" || v === "notSelect" || v === "onHold" ? v : null;
}

function normalizePipeline(v: unknown): Pipeline {
  const o = asObject(v);
  const received = asObject(o.received);
  const ps = asObject(o.preSelection);
  const sel = asObject(o.selection);
  const exam = asObject(sel.exam);
  const fitness = asObject(sel.fitness);
  const interview = asObject(sel.interview);
  const final = asObject(o.final);
  return {
    currentStage: normalizePipelineStage(o.currentStage),
    received: {
      allDocsPresent: asBool(received.allDocsPresent),
      panelAcknowledged: asBool(received.panelAcknowledged),
      notes: asString(received.notes),
    },
    preSelection: {
      citizenship: normalizeStageOutcome(ps.citizenship),
      criminalRecord: normalizeStageOutcome(ps.criminalRecord),
      formFive: normalizeStageOutcome(ps.formFive),
      medical: normalizeStageOutcome(ps.medical),
      physical: normalizeStageOutcome(ps.physical),
      refereesContacted: asBool(ps.refereesContacted),
      notes: asString(ps.notes),
    },
    selection: {
      exam: {
        dictation: normalizeExamScore(exam.dictation),
        mathematics: normalizeExamScore(exam.mathematics),
        generalKnowledge: normalizeExamScore(exam.generalKnowledge),
        readingComprehension: normalizeExamScore(exam.readingComprehension),
        essay: normalizeExamScore(exam.essay),
        date: asString(exam.date),
      },
      fitness: {
        run: normalizeFitnessSubtest(fitness.run),
        pushUps: normalizeFitnessSubtest(fitness.pushUps),
        sitUps: normalizeFitnessSubtest(fitness.sitUps),
        date: asString(fitness.date),
        note: asString(fitness.note),
      },
      interview: {
        goodCharacter: normalizeInterviewScore(interview.goodCharacter),
        learning: normalizeInterviewScore(interview.learning),
        teamMember: normalizeInterviewScore(interview.teamMember),
        thinkingSkills: normalizeInterviewScore(interview.thinkingSkills),
        communication: normalizeInterviewScore(interview.communication),
        date: asString(interview.date),
        panelNotes: asString(interview.panelNotes),
      },
    },
    final: {
      recommendation: normalizeFinalRecommendation(final.recommendation),
      commissionerApproved: asBool(final.commissionerApproved),
      notifiedAt: asString(final.notifiedAt),
      finalReport: asString(final.finalReport),
    },
  };
}

/* ─── Eligibility evaluation ─── */

export type CriterionResult = {
  key: string;
  name: string;
  detail: string;
  status: "met" | "fail" | "pending";
};

/**
 * Five pre-selection requirements from the RSIPF 2022 Recruit Information
 * and Application Package (p.8). Citizenship and Form 5 are documentary;
 * criminal record, medical fitness, and physical fitness start as
 * self-declarations and are verified during Stage 2 of the admin pipeline.
 */
export function evaluateEligibility(answers: EligibilityAnswers): CriterionResult[] {
  return [
    {
      key: "citizenship",
      name: "Citizen or permanent resident of Solomon Islands",
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
      key: "criminal",
      name: "No criminal record",
      detail:
        answers.noCriminalRecord === true
          ? "Self-declared · subject to background verification"
          : answers.noCriminalRecord === false
            ? "Declared a criminal record"
            : "Awaiting answer",
      status:
        answers.noCriminalRecord === null
          ? "pending"
          : answers.noCriminalRecord
            ? "met"
            : "fail",
    },
    {
      key: "education",
      name: "Successfully completed Form 5 or higher",
      detail:
        answers.formFiveCompleted === true
          ? "Form 5 certificate confirmed — copy required at submission"
          : answers.formFiveCompleted === false
            ? "Form 5 not completed"
            : "Awaiting answer",
      status:
        answers.formFiveCompleted === null
          ? "pending"
          : answers.formFiveCompleted
            ? "met"
            : "fail",
    },
    {
      key: "medical",
      name: "Medically fit for police duties",
      detail:
        answers.medicallyFit === true
          ? "Self-declared · doctor-signed Medical Fitness Form required"
          : answers.medicallyFit === false
            ? "Cannot certify medical fitness"
            : "Awaiting answer",
      status:
        answers.medicallyFit === null
          ? "pending"
          : answers.medicallyFit
            ? "met"
            : "fail",
    },
    {
      key: "physical",
      name: "Physically fit for the Entry Fitness Test",
      detail:
        answers.physicallyFit === true
          ? "Confident of passing the 2.4 km run, press-ups, and sit-ups"
          : answers.physicallyFit === false
            ? "Not currently able to attempt the Entry Fitness Test"
            : "Awaiting answer",
      status:
        answers.physicallyFit === null
          ? "pending"
          : answers.physicallyFit
            ? "met"
            : "fail",
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

export function summarizeEligibility(answers: EligibilityAnswers): EligibilitySummary {
  const results = evaluateEligibility(answers);
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
  | "disclosures"
  | "statements"
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
    description: "Confirm you meet the RSIPF pre-selection requirements.",
    contributesToProgress: true,
  },
  {
    key: "personal",
    name: "Personal particulars",
    href: "/dashboard/personal",
    description:
      "Legal name, date of birth, province, address, contact details, and driver's licence.",
    contributesToProgress: true,
  },
  {
    key: "education",
    name: "Education",
    href: "/dashboard/education",
    description: "Form 5 certificate and any further qualifications.",
    contributesToProgress: true,
  },
  {
    key: "work",
    name: "Employment",
    href: "/dashboard/work",
    description: "Past and current paid or volunteer work.",
    contributesToProgress: true,
  },
  {
    key: "disclosures",
    name: "Disclosures",
    href: "/dashboard/disclosures",
    description:
      "Previous police service, prior application, and the six required disclosure questions.",
    contributesToProgress: true,
  },
  {
    key: "statements",
    name: "Personal statements",
    href: "/dashboard/statements",
    description:
      "About yourself (~200 words) and why you want to join the RSIPF (~100 words).",
    contributesToProgress: true,
  },
  {
    key: "documents",
    name: "Documents",
    href: "/dashboard/documents",
    description: "Upload supporting evidence including the Medical Fitness Form.",
    contributesToProgress: true,
  },
  {
    key: "background",
    name: "Background check",
    href: "/dashboard/background",
    description: "Next of kin, two written references, and declarations.",
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

export function wordCount(s: string): number {
  const trimmed = s.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export function stageState(app: Application, key: StageKey): StageState {
  switch (key) {
    case "eligibility": {
      const s = summarizeEligibility(app.eligibility);
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
      const requiredStrings = [
        p.fullName,
        p.dob,
        p.email,
        p.phone,
        p.birthPlace,
        p.provinceOfOrigin,
        p.religion,
        p.address.street,
        p.address.city,
        p.address.region,
      ];
      const filledStrings = requiredStrings.filter((v) => v.trim().length > 0).length;
      const hasGender = p.gender !== null;
      const hasLicenceAnswer = p.driverLicence.hasLicence !== null;
      const postalOk =
        p.postalSameAsHome ||
        (p.postalAddress.street.trim() &&
          p.postalAddress.city.trim() &&
          p.postalAddress.region.trim());
      const totalChecks = requiredStrings.length + 3; // + gender, licence, postal
      const passed =
        filledStrings + (hasGender ? 1 : 0) + (hasLicenceAnswer ? 1 : 0) + (postalOk ? 1 : 0);
      const complete = passed === totalChecks;
      return {
        complete,
        passing: complete,
        detail: complete ? "Complete" : `${passed} of ${totalChecks} required fields`,
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
        (w) =>
          w.employer.trim() &&
          w.role.trim() &&
          w.startDate.trim() &&
          w.paymentType !== "",
      );
      // Work history is optional but the page must be visited.
      // Treat any save with no entries as a valid "no work history to declare".
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
    case "disclosures": {
      const s = app.serviceHistory;
      const d = app.disclosures;
      const yesNoFields = [
        s.previousApplication,
        s.previouslyPoliceOfficer,
        d.everInterviewedForOffence,
        d.currentlyInCriminalActivity,
        d.everConvictedCriminal,
        d.everConvictedOther,
        d.noConvictionRecorded,
        d.warrantEverIssued,
      ];
      const answered = yesNoFields.filter((v) => v !== null).length;
      const anyYes = yesNoFields.some((v) => v === true);
      const detailsOk = !anyYes || d.details.trim().length > 0;
      const complete = answered === yesNoFields.length && detailsOk;
      return {
        complete,
        passing: complete,
        detail: complete
          ? "Complete"
          : answered < yesNoFields.length
            ? `${answered} of ${yesNoFields.length} questions answered`
            : "Provide details for the questions answered Yes",
      };
    }
    case "statements": {
      const st = app.statements;
      const pCount = wordCount(st.personalStatement);
      const rCount = wordCount(st.reasonForJoining);
      const personalOk = pCount >= 100;
      const reasonOk = rCount >= 50;
      const complete = personalOk && reasonOk;
      return {
        complete,
        passing: complete,
        detail: complete
          ? `Personal ${pCount} words · Reason ${rCount} words`
          : !personalOk
            ? `Personal statement: ${pCount}/100 minimum`
            : `Reason for joining: ${rCount}/50 minimum`,
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
        b.nextOfKin.phone.trim() &&
        b.nextOfKin.address.trim();
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
            ? "Add next-of-kin contact (including address)"
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
    personal: {
      ...EMPTY_PERSONAL,
      address: { ...EMPTY_ADDRESS },
      postalAddress: { ...EMPTY_ADDRESS },
      driverLicence: { ...EMPTY_DRIVER_LICENCE },
    },
    education: [],
    work: [],
    serviceHistory: { ...EMPTY_SERVICE_HISTORY },
    disclosures: { ...EMPTY_DISCLOSURES },
    statements: { ...EMPTY_STATEMENTS },
    documents: docsFor(),
    background: {
      nextOfKin: { ...EMPTY_BACKGROUND.nextOfKin },
      references: [],
      declarations: { accurate: true, consent: true, medical: true },
    },
    createdAt: now,
    updatedAt: now,
    submittedAt: now,
    decision: "shortlisted",
    ...overrides,
  });

  const joycelyn = base("APP-2026-04713", {
    ownerEmail: "joycelyn.tagivetua@example.com",
    eligibility: {
      citizenship: "citizen",
      noCriminalRecord: true,
      formFiveCompleted: true,
      medicallyFit: true,
      physicallyFit: true,
    },
    personal: {
      ...EMPTY_PERSONAL,
      fullName: "Tagivetua Joycelyn",
      preferredName: "Joycelyn",
      dob: "2003-08-12",
      gender: "female",
      email: "joycelyn.tagivetua@example.com",
      phone: "+677 7497 1124",
      nationalId: "SI24-00451",
      birthPlace: "Honiara",
      provinceOfOrigin: "Honiara Capital Territory",
      religion: "Anglican (Church of Melanesia)",
      address: {
        street: "5 Vavaea Ridge",
        city: "Honiara",
        region: "Honiara Capital Territory",
        postcode: "",
      },
      postalAddress: { ...EMPTY_ADDRESS },
      postalSameAsHome: true,
      driverLicence: {
        hasLicence: true,
        number: "SI-HCT-1187",
        classes: "B",
        expiry: "2028-04",
      },
    },
    education: [
      {
        id: "e1",
        institution: "King George VI National Secondary School",
        qualification: "Form 5 certificate",
        startYear: "2015",
        endYear: "2021",
        result: "6 credits incl. English & Maths",
      },
    ],
    work: [
      {
        id: "w1",
        employer: "Solomon Telekom",
        role: "Customer service assistant",
        startDate: "2022-06",
        endDate: "",
        current: true,
        description:
          "First point of contact for retail customers; handles SIM activations and account queries.",
        paymentType: "paid",
      },
    ],
    serviceHistory: { previousApplication: false, previouslyPoliceOfficer: false },
    disclosures: {
      everInterviewedForOffence: false,
      currentlyInCriminalActivity: false,
      everConvictedCriminal: false,
      everConvictedOther: false,
      noConvictionRecorded: false,
      warrantEverIssued: false,
      details: "",
    },
    statements: {
      personalStatement:
        "Born and raised in Honiara, I am the eldest of three siblings. My mother is a primary-school teacher at Naha and my father drives for the Solomon Islands Ports Authority. I completed Form 5 at King George VI National Secondary School in 2021 with six credits including English and Maths. Since then I have worked at Solomon Telekom in the retail section, where I am the first person customers meet when they walk in. The work has taught me to be patient with frustrated people and to be careful with private information. Outside work I am part of my church's St John youth fellowship and I volunteer with the weekend feeding programme for street kids in central Honiara. Being trusted and being useful to my community matters to me more than anything else, which is why police work has always been at the back of my mind.",
      reasonForJoining:
        "I want to join the RSIPF because the country needs a police force that people can trust, and I am willing to be one of the officers who earns that trust. I am especially drawn to working with women and children, two groups who too often feel they cannot turn to the police. The recruit programme would give me the discipline and skills I need to do that work properly.",
    },
    documents: docsFor(),
    background: {
      nextOfKin: {
        name: "Anna Tagivetua",
        relationship: "Mother",
        phone: "+677 7421 8867",
        address: "5 Vavaea Ridge, Honiara",
      },
      references: [
        {
          id: "r1",
          name: "Mr Joseph Sade",
          relationship: "Secondary school principal",
          yearsKnown: "8",
          email: "jsade@kgvi.edu.sb",
          phone: "+677 7421 0011",
        },
        {
          id: "r2",
          name: "Ms Lillian Pita",
          relationship: "Team leader",
          yearsKnown: "3",
          email: "lpita@solomontelekom.com.sb",
          phone: "+677 7421 0022",
        },
      ],
      declarations: { accurate: true, consent: true, medical: true },
    },
    decision: "shortlisted",
    pipeline: {
      ...EMPTY_PIPELINE,
      currentStage: "preSelection",
      received: {
        allDocsPresent: true,
        panelAcknowledged: true,
        notes: "Complete package received and routed to Recruitment Panel.",
      },
    },
    reviewerNotes: "",
  });

  const theo = base("APP-2026-04692", {
    ownerEmail: "theo.maeli@example.com",
    eligibility: {
      citizenship: "citizen",
      noCriminalRecord: true,
      formFiveCompleted: true,
      medicallyFit: true,
      physicallyFit: true,
    },
    personal: {
      ...EMPTY_PERSONAL,
      fullName: "Maeli Theo",
      preferredName: "Theo",
      dob: "2001-02-19",
      gender: "male",
      email: "theo.maeli@example.com",
      phone: "+677 7488 3344",
      nationalId: "SI22-00284",
      birthPlace: "Gizo",
      provinceOfOrigin: "Western",
      religion: "United Church",
      address: {
        street: "14 Saeraghi Road",
        city: "Gizo",
        region: "Western",
        postcode: "",
      },
      postalAddress: { ...EMPTY_ADDRESS },
      postalSameAsHome: true,
      driverLicence: {
        hasLicence: true,
        number: "SI-WST-0277",
        classes: "C",
        expiry: "2027-11",
      },
    },
    education: [
      {
        id: "e1",
        institution: "Goldie College",
        qualification: "Form 5 certificate",
        startYear: "2014",
        endYear: "2020",
        result: "5 credits incl. English",
      },
    ],
    work: [
      {
        id: "w1",
        employer: "Western Province Council",
        role: "Transport assistant",
        startDate: "2021-02",
        endDate: "2023-12",
        current: false,
        description:
          "Light vehicle deliveries for council teams across Gizo and outer islands.",
        paymentType: "paid",
      },
    ],
    serviceHistory: { previousApplication: false, previouslyPoliceOfficer: false },
    disclosures: {
      everInterviewedForOffence: false,
      currentlyInCriminalActivity: false,
      everConvictedCriminal: false,
      everConvictedOther: false,
      noConvictionRecorded: false,
      warrantEverIssued: false,
      details: "",
    },
    statements: {
      personalStatement:
        "I grew up in Gizo as one of three boys. After Form 5 at Goldie College in 2020 I worked for nearly three years as a transport assistant for the Western Province Council, mostly driving light vehicles between Gizo and the outer islands. The work taught me to be punctual, to maintain my vehicle properly, and to deal calmly with all sorts of passengers — from school groups to provincial officers. I am a regular at the United Church here and I play rugby on Saturdays for a community side. I have always wanted a job where I am useful to my community in a concrete, daily way. I think my time on the road has prepared me for staying composed in difficult situations, and I am ready to take on the discipline of recruit training.",
      reasonForJoining:
        "Police in Western are a daily presence — at the wharf, on patrol, at school assemblies — and the ones I have respected most treated every person fairly regardless of who they were. I want to be that kind of officer, and I want to learn the law properly so the work I do is fair and stands up in court.",
    },
    documents: docsFor({
      "passport-photo": {
        status: "rejected",
        note: "Photo is overexposed — re-upload required.",
      },
    }),
    background: {
      nextOfKin: {
        name: "Faye Maeli",
        relationship: "Sister",
        phone: "+677 7488 9988",
        address: "14 Saeraghi Road, Gizo, Western",
      },
      references: [
        {
          id: "r1",
          name: "Mr Charles Pais",
          relationship: "Former line manager",
          yearsKnown: "5",
          email: "cpais@wpc.gov.sb",
          phone: "+677 7488 1111",
        },
        {
          id: "r2",
          name: "Mrs Lena Iroga",
          relationship: "Community elder",
          yearsKnown: "10",
          email: "",
          phone: "+677 7488 2222",
        },
      ],
      declarations: { accurate: true, consent: true, medical: true },
    },
    decision: "onHold",
    pipeline: {
      ...EMPTY_PIPELINE,
      currentStage: "received",
      received: {
        allDocsPresent: false,
        panelAcknowledged: false,
        notes: "Passport photo rejected — awaiting re-upload before panel review.",
      },
    },
    reviewerNotes:
      "Document rejected; await re-upload before continuing review.",
  });

  const maryanne = base("APP-2026-04501", {
    ownerEmail: "maryanne.pita@example.com",
    eligibility: {
      citizenship: "citizen",
      noCriminalRecord: true,
      formFiveCompleted: true,
      medicallyFit: true,
      physicallyFit: true,
    },
    personal: {
      ...EMPTY_PERSONAL,
      fullName: "Pita Mary-Anne",
      preferredName: "Mary-Anne",
      dob: "2002-07-04",
      gender: "female",
      email: "maryanne.pita@example.com",
      phone: "+677 7421 5566",
      nationalId: "SI20-00734",
      birthPlace: "Buala",
      provinceOfOrigin: "Isabel",
      religion: "Anglican (Church of Melanesia)",
      address: {
        street: "12 Mission Lane",
        city: "Buala",
        region: "Isabel",
        postcode: "",
      },
      postalAddress: { ...EMPTY_ADDRESS },
      postalSameAsHome: true,
      driverLicence: {
        hasLicence: true,
        number: "SI-ISA-0098",
        classes: "B",
        expiry: "2029-02",
      },
    },
    education: [
      {
        id: "e1",
        institution: "Selwyn College",
        qualification: "Form 5 certificate",
        startYear: "2013",
        endYear: "2019",
        result: "Distinction",
      },
      {
        id: "e2",
        institution: "Solomon Islands National University",
        qualification: "Diploma in Public Administration",
        startYear: "2019",
        endYear: "2022",
        result: "Upper class",
      },
    ],
    work: [
      {
        id: "w1",
        employer: "Isabel Provincial Government",
        role: "Administrative officer",
        startDate: "2022-08",
        endDate: "",
        current: true,
        description: "Records management for the provincial secretariat.",
        paymentType: "paid",
      },
    ],
    serviceHistory: { previousApplication: false, previouslyPoliceOfficer: false },
    disclosures: {
      everInterviewedForOffence: false,
      currentlyInCriminalActivity: false,
      everConvictedCriminal: false,
      everConvictedOther: false,
      noConvictionRecorded: false,
      warrantEverIssued: false,
      details: "",
    },
    statements: {
      personalStatement:
        "I was born and raised in Buala and finished my Form 5 at Selwyn College with a Distinction before going on to a Diploma in Public Administration at the Solomon Islands National University in Honiara. Since 2022 I have worked as an administrative officer at the Isabel Provincial Government, where I run records management for a small team. I am known there for being meticulous with paperwork and for being calm when colleagues are under pressure. Outside work I am active in our church choir and I tutor two younger cousins in Maths every weekend. Both of my parents are public servants and I have grown up understanding that public service is demanding but worthwhile. I am ready to apply that mindset to police work.",
      reasonForJoining:
        "Records management has shown me how much careful, honest work it takes to keep institutions trustworthy. I want to bring the same discipline to police work. I am especially interested in investigations and evidence handling, where my administrative training will be useful from day one.",
    },
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
        name: "Mr Patrick Pita",
        relationship: "Father",
        phone: "+677 7421 7788",
        address: "12 Mission Lane, Buala, Isabel",
      },
      references: [
        {
          id: "r1",
          name: "Prof. Mary Tovo",
          relationship: "University lecturer",
          yearsKnown: "6",
          email: "mtovo@sinu.edu.sb",
          phone: "+677 7421 1111",
        },
        {
          id: "r2",
          name: "Mr Thomas Lonu",
          relationship: "Line manager",
          yearsKnown: "3",
          email: "tlonu@isabel.gov.sb",
          phone: "+677 7421 2222",
        },
      ],
      declarations: { accurate: true, consent: true, medical: true },
    },
    decision: "selected",
    pipeline: {
      currentStage: "closed",
      received: {
        allDocsPresent: true,
        panelAcknowledged: true,
        notes: "Complete package; routed to panel within 24 h.",
      },
      preSelection: {
        citizenship: "passed",
        criminalRecord: "passed",
        formFive: "passed",
        medical: "passed",
        physical: "passed",
        refereesContacted: true,
        notes: "Both referees responded positively. Criminal record check clear.",
      },
      selection: {
        exam: {
          dictation: { score: 78, status: "passed" },
          mathematics: { score: 82, status: "passed" },
          generalKnowledge: { score: 71, status: "passed" },
          readingComprehension: { score: 88, status: "passed" },
          essay: { score: 74, status: "passed" },
          date: "2026-04-15",
        },
        fitness: {
          run: { raw: 13 * 60 + 25, status: "passed" }, // 13:25 — under 14:00 women's threshold
          pushUps: { raw: 18, status: "passed" }, // ≥ 8
          sitUps: { raw: 42, status: "passed" }, // ≥ 35
          date: "2026-04-16",
          note: "Strong overall performance.",
        },
        interview: {
          goodCharacter: { rating: 5, comments: "Honest, fair, gave concrete examples." },
          learning: { rating: 4, comments: "Diploma graduate; eager to keep studying." },
          teamMember: { rating: 5, comments: "Clear teamwork experience from civil service role." },
          thinkingSkills: { rating: 4, comments: "Solid problem framing in scenario question." },
          communication: { rating: 5, comments: "Confident, clear, well-prepared." },
          date: "2026-04-22",
          panelNotes: "Strongest candidate on panel today. Recommended.",
        },
      },
      final: {
        recommendation: "select",
        commissionerApproved: true,
        notifiedAt: "2026-04-29",
        finalReport:
          "Candidate has cleared every stage. Pre-selection clean, entrance exam passed in all five parts (range 71–88), Entry Fitness Test passed with margin, and Selection Interview scored 4–5 across all rubrics. Recommended for the 2026-B intake.",
      },
    },
    reviewerNotes:
      "All criteria met. Final report filed; Commissioner approved on 29 Apr.",
    reviewedAt: now,
    reviewedBy: "records.officer@example.com",
  });

  const wilson = base("APP-2026-04778", {
    ownerEmail: "wilson.ramo@example.com",
    eligibility: {
      citizenship: "citizen",
      noCriminalRecord: true,
      formFiveCompleted: true,
      medicallyFit: true,
      physicallyFit: true,
    },
    personal: {
      ...EMPTY_PERSONAL,
      fullName: "Ramo Wilson",
      preferredName: "Wilson",
      dob: "2004-03-22",
      gender: "male",
      email: "wilson.ramo@example.com",
      phone: "+677 7397 7788",
      nationalId: "SI23-00112",
      birthPlace: "Auki",
      provinceOfOrigin: "Malaita",
      religion: "Seventh-day Adventist",
      address: {
        street: "8 Lilisiana Road",
        city: "Auki",
        region: "Malaita",
        postcode: "",
      },
      postalAddress: { ...EMPTY_ADDRESS },
      postalSameAsHome: true,
      driverLicence: {
        hasLicence: false,
        number: "",
        classes: "",
        expiry: "",
      },
    },
    education: [
      {
        id: "e1",
        institution: "Su'u National Secondary School",
        qualification: "Form 5 certificate",
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
        name: "Eric Ramo",
        relationship: "Brother",
        phone: "+677 7397 1010",
        address: "8 Lilisiana Road, Auki, Malaita",
      },
      references: [
        {
          id: "r1",
          name: "Pastor John Manele",
          relationship: "Local pastor",
          yearsKnown: "12",
          email: "",
          phone: "+677 7397 1111",
        },
      ],
      declarations: { accurate: true, consent: true, medical: true },
    },
    decision: "shortlisted",
    pipeline: {
      ...EMPTY_PIPELINE,
      currentStage: "received",
      received: {
        allDocsPresent: false,
        panelAcknowledged: false,
        notes: "Missing proof of citizenship document — awaiting upload.",
      },
    },
    reviewerNotes: "Waiting on proof of citizenship upload before review.",
  });

  return [maryanne, joycelyn, theo, wilson];
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
