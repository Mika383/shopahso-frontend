import Link from "next/link";

type AuthLayoutProps = {
  children: React.ReactNode;
  description: string;
  eyebrow: string;
  footerHref: string;
  footerLabel: string;
  footerText: string;
  title: string;
};

export function AuthLayout({
  children,
  description,
  eyebrow,
  footerHref,
  footerLabel,
  footerText,
  title,
}: AuthLayoutProps) {
  return (
    <section className="flex min-h-[calc(100vh-10rem)] items-center border-t border-border bg-white">
      <div className="container mx-auto grid gap-10 px-4 py-12 lg:grid-cols-[1fr_520px] lg:items-stretch">
        <div className="flex flex-col justify-between border border-border bg-muted/40 p-8 lg:p-10">
          <div className="space-y-5">
            <p className="text-xs font-semibold tracking-[0.12em] text-primary">
              {eyebrow}
            </p>
            <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-xl border-l-4 border-border pl-5 text-base leading-7 text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="grid gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:grid-cols-3">
            <div>
              <p className="font-semibold text-foreground">Bảo mật</p>
              <p className="mt-2 leading-6">
                Phiên đăng nhập được kiểm tra lại qua API hồ sơ người dùng.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Minh bạch</p>
              <p className="mt-2 leading-6">
                Mọi lỗi xác thực đều được hiển thị rõ ràng, không xử lý ngầm.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Tập trung</p>
              <p className="mt-2 leading-6">
                Giao diện gọn, ưu tiên thao tác nhanh cho người dùng chuyên nghiệp.
              </p>
            </div>
          </div>
        </div>

        <div className="border border-border bg-background p-8 lg:p-10">
          {children}

          <div className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
            {footerText}{" "}
            <Link href={footerHref} className="font-semibold text-primary hover:underline">
              {footerLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
