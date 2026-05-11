import type { ReactNode } from "react";

type StatusAction = {
  element: ReactNode;
  key: string;
};

type StatusMetric = {
  label: string;
  value: string;
};

type StatusShellProps = {
  actions: StatusAction[];
  badge: string;
  eyebrow: string;
  metrics: StatusMetric[];
  summary: string;
  title: string;
};

export default function StatusShell({
  actions,
  badge,
  eyebrow,
  metrics,
  summary,
  title,
}: StatusShellProps) {
  return (
    <section className="border-t border-border bg-background">
      <div className="industrial-grid border-b border-border">
        <div className="container mx-auto px-4 py-5">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {eyebrow}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid gap-0 border border-border bg-background lg:grid-cols-[minmax(0,1.35fr)_320px]">
          <div className="border-b border-border p-8 lg:border-b-0 lg:border-r lg:p-12">
            <div className="inline-flex items-center border border-border bg-muted px-3 py-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {badge}
            </div>

            <h1 className="mt-8 max-w-3xl text-4xl font-black tracking-tight lg:text-5xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground lg:text-lg">{summary}</p>

            <div className="mt-10 flex flex-wrap gap-3">
              {actions.map((action) => (
                <div key={action.key}>{action.element}</div>
              ))}
            </div>
          </div>

          <aside className="grid gap-0 bg-muted/25">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className={index === metrics.length - 1 ? "p-6 lg:p-8" : "border-b border-border p-6 lg:p-8"}
              >
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {metric.label}
                </p>
                <p className="mt-4 text-xl font-black tracking-tight">{metric.value}</p>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
