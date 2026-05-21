"use client";

import Link from "next/link";

import { StageHeader } from "@/components/dashboard";
import { Alert } from "@/components/ui";

const FAQ = [
  {
    q: "How long does the application take to complete?",
    a: "Most applicants complete every section in under an hour spread across two or three sessions. Your answers save locally as you go, so you can return whenever it suits you.",
  },
  {
    q: "Can I edit my application after I save it?",
    a: "Yes — anything saved as a draft can be edited from your dashboard. Once you submit, the application is locked. If you spot a mistake after submission, contact your recruiter.",
  },
  {
    q: "What documents do I need?",
    a: "At minimum: your Form 5 certificate, proof of citizenship or permanent residency (birth certificate or Solomon Islands passport), two written references, a doctor-signed Medical Fitness Form, and a passport-style photograph. Further academic qualifications can be attached if you have them.",
  },
  {
    q: "What happens after I submit?",
    a: "The Recruitment Panel checks your documents, runs a criminal-record check, and contacts your referees. If you pass pre-selection, you'll be scheduled for the entrance examination (Dictation, Maths, General Knowledge, Reading & Comprehension, and Essay), the Entry Fitness Test (2.4 km run, press-ups, sit-ups), and the selection interview. Successful applicants are announced through the Solomon Star and SIBC.",
  },
  {
    q: "Why do I need two references?",
    a: "Two non-relative references who have known you for at least two years give the records office a broader picture of your character and reliability. We may contact them directly.",
  },
  {
    q: "Is my information secure?",
    a: "This portal is a prototype — for production deployment, all uploads would be encrypted in transit and at rest, and access limited to the records office and your assigned recruiter.",
  },
];

export default function HelpPage() {
  return (
    <>
      <StageHeader
        crumbs={[
          { label: "Application", href: "/dashboard" },
          { label: "Help & FAQ" },
        ]}
        title="Help & FAQ"
        lede="Answers to common questions. If you can't find what you need, message your recruiter directly."
      />

      <div className="stack-6">
        <Alert
          variant="info"
          dismissible={false}
          title="Still stuck?"
          body={
            <>
              Use{" "}
              <Link href="/dashboard/contact" style={{ color: "var(--info-700)" }}>
                Contact recruiter
              </Link>{" "}
              to send a direct message — most recruiters reply within one business day.
            </>
          }
        />

        <div className="stack-4">
          {FAQ.map((item) => (
            <div className="faq-item" key={item.q}>
              <h3 className="faq-item__q">{item.q}</h3>
              <p className="faq-item__a">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
