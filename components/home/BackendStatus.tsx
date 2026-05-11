import { getBackendConnectionStatus } from "@/lib/api/services/system.service";

function formatCheckedAt(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
    second: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

export default async function BackendStatus() {
  const status = await getBackendConnectionStatus();

  return (
    <section className="border-y border-border bg-muted/60">
      <div className="container mx-auto grid gap-6 px-4 py-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div
              aria-hidden="true"
              className={`h-3 w-3 border border-border ${
                status.reachable ? "bg-primary" : "bg-destructive"
              }`}
            />
            <p className="text-xs font-semibold tracking-[0.12em] text-muted-foreground">
              Kết nối backend
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight">
              {status.reachable ? "Kết nối backend đã sẵn sàng" : "Chưa kết nối được tới backend"}
            </h2>
            <p className="max-w-2xl border-l-4 border-border pl-4 text-sm leading-6 text-muted-foreground">
              {status.details}
            </p>
          </div>
        </div>

        <dl className="grid gap-3 border border-border bg-background p-5 text-sm">
          <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
            <dt className="font-semibold text-muted-foreground">Base URL</dt>
            <dd className="text-right font-mono">{status.baseUrl}</dd>
          </div>
          <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
            <dt className="font-semibold text-muted-foreground">Endpoint</dt>
            <dd className="text-right font-mono">{status.endpoint}</dd>
          </div>
          <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
            <dt className="font-semibold text-muted-foreground">Trạng thái</dt>
            <dd className="text-right font-mono">
              {status.status ? `${status.status} ${status.statusText}` : status.statusText}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="font-semibold text-muted-foreground">Kiểm tra lúc</dt>
            <dd className="text-right font-mono">{formatCheckedAt(status.checkedAt)}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
