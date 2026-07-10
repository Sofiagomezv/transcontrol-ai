import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";

export default function ReportesPage() {
  return (
    <AppShell title="Reportes" description="Vista general de indicadores y resultados operativos.">
      <div className="space-y-6">
        <Card title="Reportes" subtitle="Próximamente se integrarán métricas adicionales.">
          <p className="text-sm text-slate-400">Por ahora, el dashboard y las operaciones ya entregan la información esencial para tomar decisiones.</p>
        </Card>
      </div>
    </AppShell>
  );
}
