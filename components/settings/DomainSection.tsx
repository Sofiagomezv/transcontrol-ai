import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type DomainSectionProps = {
  title: string;
  description: string;
  items: Array<{ id: string; name: string; meta?: string; detail?: string }>;
  action?: ReactNode;
};

export function DomainSection({ title, description, items, action }: DomainSectionProps) {
  return (
    <Card title={title} subtitle={description} action={action}>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-950/60 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-white">{item.name}</p>
              {item.detail && <p className="text-sm text-slate-400">{item.detail}</p>}
            </div>
            {item.meta && <span className="text-sm text-slate-400">{item.meta}</span>}
          </div>
        ))}
      </div>
    </Card>
  );
}
