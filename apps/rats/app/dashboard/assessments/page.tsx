"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { StageHeader } from "@/components/dashboard";
import {
  Alert,
  Badge,
  Empty,
  Table,
  TableWrap,
} from "@/components/ui";
import { CalendarOff } from "lucide-react";

import { useApplication, useUser } from "@/lib/use-application";

const ASSESSMENTS = [
  {
    name: "Entrance examination — Dictation",
    date: "Same sitting as other exam parts",
    score: "—",
    passMark: "≥ 60",
    statusLabel: "Scheduled",
    ref: "EX-1",
  },
  {
    name: "Entrance examination — Mathematics",
    date: "Same sitting",
    score: "—",
    passMark: "≥ 60",
    statusLabel: "Scheduled",
    ref: "EX-2",
  },
  {
    name: "Entrance examination — General knowledge",
    date: "Same sitting",
    score: "—",
    passMark: "≥ 60",
    statusLabel: "Scheduled",
    ref: "EX-3",
  },
  {
    name: "Entrance examination — Reading & comprehension",
    date: "Same sitting",
    score: "—",
    passMark: "≥ 60",
    statusLabel: "Scheduled",
    ref: "EX-4",
  },
  {
    name: "Entrance examination — Essay (600 words)",
    date: "Same sitting",
    score: "—",
    passMark: "≥ 60",
    statusLabel: "Scheduled",
    ref: "EX-5",
  },
  {
    name: "Entry Fitness Test — 2.4 km run",
    date: "Same window as exam",
    score: "—",
    passMark: "≤ 12:00 (M) / 14:00 (F)",
    statusLabel: "Scheduled",
    ref: "EFT-run",
  },
  {
    name: "Entry Fitness Test — Press-ups",
    date: "Same day as run",
    score: "—",
    passMark: "≥ 15 (M) / 8 (F)",
    statusLabel: "Scheduled",
    ref: "EFT-pushups",
  },
  {
    name: "Entry Fitness Test — Sit-ups",
    date: "Same day as run",
    score: "—",
    passMark: "≥ 45 (M) / 35 (F)",
    statusLabel: "Scheduled",
    ref: "EFT-situps",
  },
  {
    name: "Selection interview",
    date: "After exam and fitness clearance",
    score: "—",
    passMark: "All 5 rubrics ≥ 3",
    statusLabel: "Scheduled",
    ref: "INT-1",
  },
];

export default function AssessmentsPage() {
  const router = useRouter();
  const { hydrated, application } = useApplication();
  const { hydrated: userHydrated, user } = useUser();

  useEffect(() => {
    if (userHydrated && !user) router.replace("/sign-in");
  }, [userHydrated, user, router]);

  if (!hydrated || !userHydrated) return null;
  if (!user) return null;

  const isSubmitted = application?.status === "submitted";

  return (
    <>
      <StageHeader
        crumbs={[
          { label: "Application", href: "/dashboard" },
          { label: "Assessments" },
        ]}
        title="Assessments"
        lede="Once your documents are verified, the records office schedules each assessment and posts results here."
        meta={
          isSubmitted ? (
            <Badge variant="info">Pending verification</Badge>
          ) : (
            <Badge variant="neutral">Locked until submission</Badge>
          )
        }
      />

      <div className="stack-6">
        {!application ? (
          <Empty
            icon={CalendarOff}
            title="No application yet"
            body="Start your application to see the assessments timeline appear here."
          />
        ) : !isSubmitted ? (
          <>
            <Alert
              variant="info"
              dismissible={false}
              title="Assessments unlock after you submit."
              body="Complete every section and submit your application from Review & submit. Once verification clears, the records office schedules each assessment and posts results here."
            />
            <TableWrap>
              <Table>
                <thead>
                  <tr>
                    <th>Assessment</th>
                    <th>Date</th>
                    <th className="num">Score</th>
                    <th className="num">Pass mark</th>
                    <th>Status</th>
                    <th>Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {ASSESSMENTS.map((a) => (
                    <tr key={a.name}>
                      <td>{a.name}</td>
                      <td style={{ color: "var(--gray-600)" }}>{a.date}</td>
                      <td className="num mono">{a.score}</td>
                      <td className="num mono">{a.passMark}</td>
                      <td>
                        <Badge variant="neutral">{a.statusLabel}</Badge>
                      </td>
                      <td className="mono">{a.ref}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrap>
          </>
        ) : (
          <>
            <Alert
              variant="info"
              dismissible={false}
              title="Awaiting records office verification."
              body="Your application is in the queue. You'll see assessment dates here as soon as a records officer schedules them — usually within five business days."
            />
            <TableWrap>
              <Table>
                <thead>
                  <tr>
                    <th>Assessment</th>
                    <th>Date</th>
                    <th className="num">Score</th>
                    <th className="num">Pass mark</th>
                    <th>Status</th>
                    <th>Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {ASSESSMENTS.map((a) => (
                    <tr key={a.name}>
                      <td>{a.name}</td>
                      <td style={{ color: "var(--gray-600)" }}>{a.date}</td>
                      <td className="num mono">{a.score}</td>
                      <td className="num mono">{a.passMark}</td>
                      <td>
                        <Badge variant="info">Pending</Badge>
                      </td>
                      <td className="mono">{a.ref}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrap>
          </>
        )}
      </div>
    </>
  );
}
