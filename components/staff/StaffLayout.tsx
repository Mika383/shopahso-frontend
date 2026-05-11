"use client";

import { useEffect, useState } from "react";
import ProtectedBackoffice from "@/components/backoffice/ProtectedBackoffice";
import StaffHeader from "@/components/staff/StaffHeader";
import StaffSidebar from "@/components/staff/StaffSidebar";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isMobileSidebarOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileSidebarOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileSidebarOpen]);

  return (
    <ProtectedBackoffice
      allowedRoles={["STAFF", "ADMIN"]}
      loadingLabel="Đang xác minh truy cập"
      loadingMessage="Hệ thống đang tải khu nhân viên."
    >
      <section className="h-screen overflow-hidden bg-background text-foreground">
        <div className="flex h-full">
          <StaffSidebar
            isMobileOpen={isMobileSidebarOpen}
            isSidebarCollapsed={isSidebarCollapsed}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
            onToggleCollapse={() => setIsSidebarCollapsed((current) => !current)}
          />
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-background">
            <StaffHeader onOpenSidebar={() => setIsMobileSidebarOpen(true)} />
            <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </section>
    </ProtectedBackoffice>
  );
}
