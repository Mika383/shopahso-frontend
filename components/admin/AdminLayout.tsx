"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ProtectedBackoffice from "@/components/backoffice/ProtectedBackoffice";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
      allowedRoles={["ADMIN"]}
      loadingLabel="Đang xác minh truy cập"
      loadingMessage="Hệ thống đang tải khu quản trị."
    >
      <section className="h-screen overflow-hidden bg-background text-foreground">
        <div className="flex h-full">
          <AdminSidebar
            isMobileOpen={isMobileSidebarOpen}
            isSidebarCollapsed={isSidebarCollapsed}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
            onToggleCollapse={() => setIsSidebarCollapsed((current) => !current)}
          />
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-background">
            <AdminHeader onOpenSidebar={() => setIsMobileSidebarOpen(true)} />
            <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </section>
    </ProtectedBackoffice>
  );
}
