"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { AuthField } from "@/components/auth/AuthField";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api/client";

type RegisterFormState = {
  confirmPassword: string;
  dateOfBirth: string;
  email: string;
  fullName: string;
  password: string;
  phoneNumber: string;
};

function validateRegisterForm(values: RegisterFormState) {
  const errors: Partial<Record<keyof RegisterFormState, string>> = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Vui lòng nhập họ và tên.";
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = "Vui lòng chọn ngày sinh.";
  }

  if (!values.email.trim()) {
    errors.email = "Vui lòng nhập email.";
  }

  if (!values.password) {
    errors.password = "Vui lòng nhập mật khẩu.";
  } else if (values.password.length < 10) {
    errors.password = "Mật khẩu phải có ít nhất 10 ký tự.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Mật khẩu xác nhận không khớp.";
  }

  if (values.phoneNumber && !/^\+?[0-9]{9,15}$/.test(values.phoneNumber)) {
    errors.phoneNumber = "Số điện thoại chưa đúng định dạng.";
  }

  return errors;
}

function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return error.details || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Không thể đăng ký tài khoản. Vui lòng thử lại.";
}

export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [values, setValues] = useState<RegisterFormState>({
    confirmPassword: "",
    dateOfBirth: "",
    email: "",
    fullName: "",
    password: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof RegisterFormState, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateRegisterForm(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error("Vui lòng kiểm tra lại thông tin đăng ký.");
      return;
    }

    const loadingToastId = toast.loading("Đang tạo tài khoản...");

    try {
      setIsSubmitting(true);
      const dateOfBirth = new Date(values.dateOfBirth);

      await register({
        dateOfBirth: dateOfBirth.toISOString(),
        email: values.email.trim(),
        fullName: values.fullName.trim(),
        password: values.password,
        phoneNumber: values.phoneNumber.trim() || undefined,
      });

      toast.success("Đăng ký thành công.", {
        id: loadingToastId,
      });
      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error), {
        id: loadingToastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tight">Đăng ký tài khoản</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Tạo tài khoản để theo dõi đơn hàng, yêu cầu báo giá và quản lý thông tin mua hàng.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <AuthField
            autoComplete="name"
            error={errors.fullName}
            label="Họ và tên"
            name="fullName"
            placeholder="Nguyễn Văn A"
            value={values.fullName}
            onChange={(value) => updateField("fullName", value)}
          />
        </div>
        <AuthField
          error={errors.dateOfBirth}
          label="Ngày sinh"
          name="dateOfBirth"
          placeholder=""
          type="date"
          value={values.dateOfBirth}
          onChange={(value) => updateField("dateOfBirth", value)}
        />
        <AuthField
          autoComplete="tel"
          error={errors.phoneNumber}
          label="Số điện thoại"
          name="phoneNumber"
          placeholder="+84901234567"
          type="tel"
          value={values.phoneNumber}
          onChange={(value) => updateField("phoneNumber", value)}
        />
        <div className="md:col-span-2">
          <AuthField
            autoComplete="email"
            error={errors.email}
            label="Email"
            name="email"
            placeholder="nhap-email@doanhnghiep.vn"
            type="email"
            value={values.email}
            onChange={(value) => updateField("email", value)}
          />
        </div>
        <AuthField
          autoComplete="new-password"
          error={errors.password}
          label="Mật khẩu"
          name="password"
          placeholder="Tối thiểu 10 ký tự"
          type="password"
          value={values.password}
          onChange={(value) => updateField("password", value)}
        />
        <AuthField
          autoComplete="new-password"
          error={errors.confirmPassword}
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          placeholder="Nhập lại mật khẩu"
          type="password"
          value={values.confirmPassword}
          onChange={(value) => updateField("confirmPassword", value)}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="lg"
          className="h-12 px-6 text-sm font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang xử lý" : "Tạo tài khoản"}
        </Button>
        <Link href="/dang-nhap" className="text-sm font-semibold text-primary hover:underline">
          Đã có tài khoản? Đăng nhập
        </Link>
      </div>
    </form>
  );
}
