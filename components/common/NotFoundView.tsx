import Link from "next/link";
import { Button } from "@/components/ui/button";
import StatusShell from "@/components/common/StatusShell";

export default function NotFoundView() {
  return (
    <StatusShell
      badge="Lỗi 404"
      eyebrow="Điều hướng hệ thống"
      metrics={[
        { label: "Trạng thái", value: "Không tìm thấy tài nguyên" },
        { label: "Khuyến nghị", value: "Quay lại trang chủ hoặc tiếp tục tra cứu danh mục" },
        { label: "Phạm vi", value: "Liên kết đã đổi, đã xóa hoặc không hợp lệ" },
      ]}
      summary="Liên kết này hiện không khả dụng. Trang có thể đã được thay đổi cấu trúc hoặc không còn tồn tại trong hệ thống."
      title="Trang bạn đang tìm không tồn tại"
      actions={[
        {
          key: "home",
          element: (
            <Button asChild size="lg" className="h-11 px-5 text-sm font-semibold">
              <Link href="/">Quay về trang chủ</Link>
            </Button>
          ),
        },
        {
          key: "login",
          element: (
            <Button asChild size="lg" variant="outline" className="h-11 px-5 text-sm font-semibold">
              <Link href="/dang-nhap">Đi tới đăng nhập</Link>
            </Button>
          ),
        },
      ]}
    />
  );
}
