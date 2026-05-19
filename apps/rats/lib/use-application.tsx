"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ADMIN_APPLICATIONS_KEY,
  ADMIN_USER_KEY,
  APPLICATION_KEY,
  USER_KEY,
  deleteIntake,
  emptyApplication,
  ensureSeedAdminApplications,
  ensureSeedIntakes,
  loadAdminApplications,
  loadIntakes,
  normalizeApplication,
  saveAdminApplications,
  upsertAdminApplication,
  upsertIntake,
  type AdminUser,
  type Application,
  type Intake,
  type User,
} from "./application";

function safeRead<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : null;
  } catch {
    return null;
  }
}

function safeWrite<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage might be disabled (private mode, quota); fail silently.
  }
}

function safeRemove(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // see above
  }
}

export function useApplication() {
  const [hydrated, setHydrated] = useState(false);
  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    const raw = safeRead<unknown>(APPLICATION_KEY);
    setApplication(raw ? normalizeApplication(raw) : null);
    setHydrated(true);
  }, []);

  const save = useCallback((next: Application): Application => {
    const updated: Application = {
      ...next,
      updatedAt: new Date().toISOString(),
    };
    setApplication(updated);
    safeWrite(APPLICATION_KEY, updated);
    return updated;
  }, []);

  const reset = useCallback((): Application => {
    const fresh = emptyApplication();
    setApplication(fresh);
    safeWrite(APPLICATION_KEY, fresh);
    return fresh;
  }, []);

  const remove = useCallback((): void => {
    setApplication(null);
    safeRemove(APPLICATION_KEY);
  }, []);

  return { hydrated, application, save, reset, remove };
}

export function useUser() {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(safeRead<User>(USER_KEY));
    setHydrated(true);
  }, []);

  const signIn = useCallback((email: string): User => {
    const u: User = { email, signedInAt: new Date().toISOString() };
    setUser(u);
    safeWrite(USER_KEY, u);
    return u;
  }, []);

  const signOut = useCallback((): void => {
    setUser(null);
    safeRemove(USER_KEY);
  }, []);

  return { hydrated, user, signIn, signOut };
}

/* ============================================================
   Admin hooks
   ============================================================ */

function deriveName(email: string): string {
  const local = email.split("@")[0] ?? email;
  return local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join(" ");
}

export function useAdminUser() {
  const [hydrated, setHydrated] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    setAdminUser(safeRead<AdminUser>(ADMIN_USER_KEY));
    setHydrated(true);
  }, []);

  const signIn = useCallback((email: string, role = "records-officer"): AdminUser => {
    const u: AdminUser = {
      email,
      name: deriveName(email),
      role,
      signedInAt: new Date().toISOString(),
    };
    setAdminUser(u);
    safeWrite(ADMIN_USER_KEY, u);
    return u;
  }, []);

  const signOut = useCallback((): void => {
    setAdminUser(null);
    safeRemove(ADMIN_USER_KEY);
  }, []);

  return { hydrated, adminUser, signIn, signOut };
}

export function useAdminApplications() {
  const [hydrated, setHydrated] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);

  const refresh = useCallback((): Application[] => {
    const list = loadAdminApplications();
    setApplications(list);
    return list;
  }, []);

  useEffect(() => {
    const seeded = ensureSeedAdminApplications();
    setApplications(seeded);
    setHydrated(true);
  }, []);

  const save = useCallback((app: Application): Application[] => {
    const next = upsertAdminApplication(app);
    setApplications(next);
    return next;
  }, []);

  const replaceAll = useCallback((list: Application[]): void => {
    saveAdminApplications(list);
    setApplications(list);
  }, []);

  return { hydrated, applications, refresh, save, replaceAll };
}

export function useAdminApplication(applicantId: string | undefined) {
  const { hydrated, applications, save } = useAdminApplications();
  const application = applicantId
    ? applications.find((a) => a.applicantId === applicantId) ?? null
    : null;

  const update = useCallback(
    (next: Application) => save(next),
    [save],
  );

  return { hydrated, application, update };
}

// Re-export the key so client code can clear admin storage cleanly if needed.
export { ADMIN_APPLICATIONS_KEY };

/* ============================================================
   Intake hooks
   ============================================================ */

export function useIntakes() {
  const [hydrated, setHydrated] = useState(false);
  const [intakes, setIntakes] = useState<Intake[]>([]);

  useEffect(() => {
    const seeded = ensureSeedIntakes();
    setIntakes(seeded);
    setHydrated(true);
  }, []);

  const refresh = useCallback((): Intake[] => {
    const list = loadIntakes();
    setIntakes(list);
    return list;
  }, []);

  const save = useCallback((intake: Intake): Intake[] => {
    const next = upsertIntake(intake);
    setIntakes(next);
    return next;
  }, []);

  const remove = useCallback((id: string): Intake[] => {
    const next = deleteIntake(id);
    setIntakes(next);
    return next;
  }, []);

  return { hydrated, intakes, refresh, save, remove };
}

export function useIntake(id: string | undefined) {
  const { hydrated, intakes, save } = useIntakes();
  const intake = id ? intakes.find((i) => i.id === id) ?? null : null;
  return { hydrated, intake, save };
}
