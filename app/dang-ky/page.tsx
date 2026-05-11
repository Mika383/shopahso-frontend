import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      eyebrow="Thiết lập tài khoản"
      title="Đăng ký để quản lý mua hàng chính xác hơn"
      description="Tạo tài khoản ShopAHSO để lưu thông tin liên hệ, nhận báo giá nhanh và đồng bộ lịch sử đặt hàng giữa các lần làm việc với đội ngũ kinh doanh."
      footerHref="/dang-nhap"
      footerLabel="Đăng nhập"
      footerText="Bạn đã có tài khoản?"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
