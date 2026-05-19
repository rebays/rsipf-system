"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Send } from "lucide-react";

import { StageHeader } from "@/components/dashboard";
import {
  Alert,
  Button,
  Field,
  Icon,
  Input,
  Select,
  Textarea,
} from "@/components/ui";
import { useApplication, useUser } from "@/lib/use-application";

type SubjectKey = "documents" | "assessments" | "general" | "withdraw";

export default function ContactPage() {
  const router = useRouter();
  const { application } = useApplication();
  const { hydrated, user } = useUser();
  const [subject, setSubject] = useState<SubjectKey>("general");
  const [body, setBody] = useState("");
  const [sentAt, setSentAt] = useState<string | null>(null);

  useEffect(() => {
    if (hydrated && !user) router.replace("/sign-in");
  }, [hydrated, user, router]);

  if (!hydrated || !user) return null;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setSentAt(new Date().toISOString());
    setBody("");
  }

  return (
    <>
      <StageHeader
        crumbs={[
          { label: "Application", href: "/dashboard" },
          { label: "Contact recruiter" },
        ]}
        title="Contact recruiter"
        lede="Send your recruiter a direct message. Replies arrive in your email inbox — typical turnaround is one business day."
      />

      <div className="stack-6">
        {sentAt && (
          <Alert
            variant="success"
            dismissible={false}
            title="Message queued."
            body={`Sent ${new Date(sentAt).toLocaleString()}. Your recruiter will reply to ${user.email}.`}
          />
        )}

        <form
          onSubmit={handleSubmit}
          className="stack-5"
          style={{
            background: "var(--white)",
            border: "1px solid var(--gray-200)",
            borderRadius: "var(--r-sm)",
            padding: "var(--sp-6)",
          }}
        >
          <Field label="From" htmlFor="contact-from">
            <Input id="contact-from" value={user.email} disabled />
          </Field>
          <Field label="Reference" htmlFor="contact-ref">
            <Input
              id="contact-ref"
              value={application?.applicantId ?? "No application yet"}
              disabled
            />
          </Field>
          <Field label="Subject" htmlFor="contact-subject" required>
            <Select
              id="contact-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value as SubjectKey)}
            >
              <option value="general">General question</option>
              <option value="documents">Question about documents</option>
              <option value="assessments">Question about assessments</option>
              <option value="withdraw">I want to withdraw</option>
            </Select>
          </Field>
          <Field
            label="Message"
            htmlFor="contact-body"
            required
            hint="Two or three sentences is usually enough. Be specific so the reply is useful."
          >
            <Textarea
              id="contact-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Hi — I'm not sure whether my school transcript is accepted in scanned PDF form…"
              rows={5}
            />
          </Field>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit" disabled={!body.trim()}>
              <Icon as={Send} />
              Send message
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
