"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import StatusShell from "@/components/common/StatusShell";

type ErrorViewProps = {
  onRetry: () => void;
  scope?: string;
};

export default function ErrorView({ onRetry, scope = "Hệ thống ứng dụng" }: ErrorViewProps) {
  return (
    <StatusShell
      badge="Lỗi xử lý"
      eyebrow="Giám sát vận hành"
      metrics={[
        { label: "Trạng thái", value: "Yêu cầu chưa hoàn tất" },
        { label: "Khuyến nghị", value: "Thử tải lại tác vụ hoặc quay về vùng an toàn" },
        { label: "Phạm vi", value: scope },
      ]}
      summary="Hệ thống đã gặp sự cố khi xử lý yêu cầu của bạn. Dữ liệu hiện tại chưa được xác nhận, vui lòng thử lại để tiếp tục."
      title="Đã xảy ra lỗi trong quá trình xử lý"
      actions={[
        {
          key: "retry",
          element: (
            <Button size="lg" className="h-11 px-5 text-sm font-semibold" onClick={onRetry}>
              Thử lại
            </Button>
          ),
        },
        {
          key: "home",
          element: (
            <Button asChild size="lg" variant="outline" className="h-11 px-5 text-sm font-semibold">
              <Link href="/">Quay về trang chủ</Link>
            </Button>
          ),
        },
      ]}
    />
  );
}
