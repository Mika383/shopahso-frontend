import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t-8 border-primary bg-foreground py-16 text-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 p-1">
                <Image
                  src="/logo.png"
                  alt="ShopAHSO"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-black tracking-tight">
                Shop<span className="text-primary">AHSO</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Đối tác tin cậy về vật tư và giải pháp công nghiệp tại Việt Nam. Chuyên cung cấp linh
              kiện điện, thiết bị tự động hóa và cơ khí chính xác.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-semibold tracking-[0.08em] text-primary">Sản phẩm</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/catalog" className="italic transition-colors hover:text-primary">
                  • Thiết bị đóng cắt
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="italic transition-colors hover:text-primary">
                  • Cảm biến & PLC
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="italic transition-colors hover:text-primary">
                  • Dây cáp & Đầu nối
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="italic transition-colors hover:text-primary">
                  • Phụ kiện cơ khí
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-semibold tracking-[0.08em] text-secondary">Hỗ trợ</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/datasheet" className="italic transition-colors hover:text-secondary">
                  • Tra cứu Datasheet
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="italic transition-colors hover:text-secondary">
                  • Chính sách giao hàng
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="italic transition-colors hover:text-secondary">
                  • Bảo hành & Đổi trả
                </Link>
              </li>
              <li>
                <Link href="/faq" className="italic transition-colors hover:text-secondary">
                  • Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-semibold tracking-[0.08em] text-accent">Liên hệ</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-start gap-3">
                <span className="text-accent">Địa chỉ:</span>
                <span>39/15 Đường Cao Bá Quát, Khu Phố Đông Tân, Phường Dĩ An, Thành phố Hồ Chí Minh, Việt Nam.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent">Hotline:</span>
                <span className="font-mono">0901 951 351
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent">Email:</span>
                <span className="lowercase">sales@ahso.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-[10px] text-muted-foreground sm:flex-row">
          <div>© 2026 ShopAHSO. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
