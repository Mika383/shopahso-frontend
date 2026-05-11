"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import type { AuthRole } from "@/lib/auth/types";

type ProtectedBackofficeProps = {
  allowedRoles: AuthRole[];
  children: React.ReactNode;
  loadingLabel: string;
  loadingMessage: string;
};

export default function ProtectedBackoffice({
  allowedRoles,
  children,
  loadingLabel,
  loadingMessage,
}: ProtectedBackofficeProps) {
  const router = useRouter();
  const { isInitializing, profile } = useAuth();

  useEffect(() => {
    if (!isInitializing && (!profile || !allowedRoles.includes(profile.role))) {
      router.replace("/404");
    }
  }, [allowedRoles, isInitializing, profile, router]);

  if (isInitializing || !profile || !allowedRoles.includes(profile.role)) {
    return (
      <section className="min-h-screen bg-background">
        <div className="grid min-h-screen place-items-center px-4">
          <div className="w-full max-w-xl border border-border bg-muted/30 p-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{loadingLabel}</p>
            <p className="mt-4 text-base text-muted-foreground">{loadingMessage}</p>
          </div>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
