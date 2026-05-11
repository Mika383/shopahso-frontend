import StaffLayout from "@/components/staff/StaffLayout";
import {
  staffModules,
  staffOverviewCards,
  staffPanels,
  staffQueues,
  staffSignals,
} from "@/components/staff/staff-data";

export default function StaffWorkspace() {
  return (
    <StaffLayout>
      <div className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
        <div className="grid gap-0 border border-border sm:grid-cols-3">
          {staffSignals.map((signal) => (
            <div key={signal.label} className="border border-border bg-muted/20 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {signal.label}
              </p>
              <div className="mt-3 text-sm font-semibold">{signal.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-8">
          <section className="grid gap-0 border border-border bg-background md:grid-cols-2 2xl:grid-cols-4">
            {staffOverviewCards.map((card) => (
              <article key={card.label} className="border border-border p-6">
                <p className="text-sm font-semibold text-muted-foreground">{card.label}</p>
                <div className="mt-5 text-4xl font-black tracking-tight">{card.value}</div>
              </article>
            ))}
          </section>

          <section className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_320px]">
            <div className="border border-border bg-background">
              <div className="border-b border-border px-6 py-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Nghiệp vụ chính</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">Khu xử lý cho nhân viên</h2>
              </div>

              <div className="divide-y divide-border">
                {staffModules.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article key={item.title} className="grid gap-4 px-6 py-5 lg:grid-cols-[48px_minmax(0,1fr)_140px] lg:items-start">
                      <div className="flex size-12 items-center justify-center border border-border bg-muted/20">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black tracking-tight">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.summary}</p>
                      </div>
                      <div className="flex items-start lg:justify-end">
                        <span className="border border-border bg-background px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground">
                          {item.status}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <aside className="border border-border bg-background">
              <div className="border-b border-border px-6 py-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Hàng đợi</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">Cần ưu tiên</h2>
              </div>

              <div className="divide-y divide-border">
                {staffQueues.map((item) => (
                  <article key={item.title} className="px-6 py-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-base font-black tracking-tight">{item.title}</h3>
                      <div className="min-w-[72px] border border-border bg-muted/20 px-4 py-3 text-center text-2xl font-black tracking-tight">
                        {item.value}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </aside>
          </section>

          <section className="grid gap-0 border border-border bg-background lg:grid-cols-2 2xl:grid-cols-4">
            {staffPanels.map((panel) => {
              const Icon = panel.icon;

              return (
                <article key={panel.title} className="border border-border p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center border border-border bg-muted/20">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Chức năng</p>
                      <h3 className="mt-1 text-xl font-black tracking-tight">{panel.title}</h3>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {panel.items.map((item) => (
                      <div key={item} className="border border-border px-4 py-3 text-sm text-muted-foreground">
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </div>
    </StaffLayout>
  );
}
