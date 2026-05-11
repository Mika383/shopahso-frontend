import BackendStatus from "@/components/home/BackendStatus";
import Hero from "@/components/home/Hero";

export default function Home() {
  const categories = [
    { name: "Thiết bị đóng cắt", code: "SW-01" },
    { name: "Cảm biến công nghiệp", code: "SN-02" },
    { name: "PLC & Tự động hóa", code: "LC-03" },
    { name: "Cáp & Đầu nối", code: "CB-04" },
  ];

  return (
    <>
      <Hero />
      <BackendStatus />

      <section className="border-t border-border bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex items-end justify-between">
            <div className="space-y-4">
              <h2 className="text-4xl font-black italic tracking-tight">
                Danh mục <span className="text-primary not-italic">nổi bật</span>
              </h2>
              <div className="h-2 w-32 bg-primary" />
            </div>
            <button className="border-b-2 border-primary pb-1 text-sm font-semibold transition-colors hover:text-primary">
              Xem tất cả danh mục
            </button>
          </div>

          <div className="grid grid-cols-1 gap-0 border border-border md:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <div
                key={cat.code}
                className="group relative overflow-hidden border border-border bg-white p-8 transition-all duration-300 hover:bg-muted"
              >
                <div className="absolute top-0 left-0 h-1 w-full bg-border transition-colors group-hover:bg-primary" />

                <div className="mb-6 font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                  {cat.code} / 2026
                </div>
                <h3 className="mb-12 text-xl font-black transition-colors group-hover:text-primary">
                  {cat.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="h-1 w-12 bg-border transition-all duration-500 group-hover:w-20 group-hover:bg-primary" />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-border bg-muted py-12">
        <div className="flex animate-infinite-scroll whitespace-nowrap">
          <div className="flex select-none items-center gap-20 px-10 text-2xl font-black italic tracking-[0.08em] text-border">
            <span>Precision</span> • <span>Performance</span> • <span>Reliability</span> •{" "}
            <span>Innovation</span> • <span>AHSO Industrial</span> • <span>Quality First</span> •{" "}
            <span>Safety standards</span> •
          </div>
          <div className="flex select-none items-center gap-20 px-10 text-2xl font-black italic tracking-[0.08em] text-border">
            <span>Precision</span> • <span>Performance</span> • <span>Reliability</span> •{" "}
            <span>Innovation</span> • <span>AHSO Industrial</span> • <span>Quality First</span> •{" "}
            <span>Safety standards</span> •
          </div>
        </div>
      </section>

      <section className="bg-primary py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-8 text-3xl font-black tracking-tight lg:text-5xl">
            Bạn đang tìm kiếm mã hàng cụ thể?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl font-medium text-primary-foreground/80">
            Sử dụng công cụ tra cứu thông minh của chúng tôi để tìm nhanh Datasheet, giá và tình
            trạng tồn kho của hơn 1 triệu sản phẩm.
          </p>
          <div className="mx-auto flex max-w-2xl">
            <input
              type="text"
              placeholder="Nhập mã SKU, Part Number..."
              className="h-16 flex-1 bg-white px-6 text-foreground focus:outline-none"
            />
            <button className="h-16 bg-foreground px-10 font-semibold text-white transition-colors hover:bg-black">
              Tra cứu
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
