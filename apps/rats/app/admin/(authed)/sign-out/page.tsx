"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAdminUser } from "@/lib/use-application";

export default function AdminSignOutPage() {
  const router = useRouter();
  const { signOut } = useAdminUser();

  useEffect(() => {
    signOut();
    router.replace("/admin/sign-in");
  }, [signOut, router]);

  return null;
}
