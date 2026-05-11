"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import ErrorView from "@/components/common/ErrorView";

type GlobalErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalErrorPage({ error, reset }: GlobalErrorPageProps) {
  useEffect(() => {
    console.error(error);
    toast.error("Ứng dụng đang gặp sự cố. Vui lòng thử lại.");
  }, [error]);

  return (
    <html lang="vi">
      <body className="min-h-screen bg-background text-foreground font-sans">
        <ErrorView onRetry={reset} scope="Toàn bộ ứng dụng" />
      </body>
    </html>
  );
}
