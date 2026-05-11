"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import ErrorView from "@/components/common/ErrorView";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
    toast.error("Không thể tải nội dung. Vui lòng thử lại.");
  }, [error]);

  return <ErrorView onRetry={reset} scope="Trang hiện tại" />;
}
