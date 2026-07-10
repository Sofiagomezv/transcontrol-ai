import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type KpiCardProps = {
  label: string;
  value: string;
  change: string;
  icon: ReactNode;
  tone?: "positive" | "negative" | "neutral";
};

export function KpiCard({
  label,
  value,
  change,
  icon,
  tone = "neutral",
}: KpiCardProps) {
  const toneClasses = {
    positive: "text-emerald-400",
    negative: "text-rose-400",
    neutral: "text-sky-400",
  };

  return (
    <Card className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800/70 text-slate-100">
          {icon}
        </div>
        <span className={`text-sm font-medium ${toneClasses[tone]}`}>{change}</span>
      </div>
      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      </div>
    </Card>
  );
}
