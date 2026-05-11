import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      eyebrow="Truy cập hệ thống"
      title="Đăng nhập để tiếp tục quy trình mua hàng"
      description="Kết nối tài khoản của bạn với hệ thống ShopAHSO để theo dõi báo giá, lịch sử giao dịch và trạng thái xử lý đơn hàng theo thời gian thực."
      footerHref="/dang-ky"
      footerLabel="Tạo tài khoản mới"
      footerText="Bạn chưa có tài khoản?"
    >
      <LoginForm />
    </AuthLayout>
  );
}
