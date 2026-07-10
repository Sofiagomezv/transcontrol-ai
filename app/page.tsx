import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { KpiCard } from "@/components/ui/KpiCard";

const kpis = [
  {
    label: "Ingresos",
    value: "$248.4K",
    change: "+12.8%",
    tone: "positive" as const,
    icon: <span className="text-lg font-semibold">↗</span>,
  },
  {
    label: "Gastos",
    value: "$164.2K",
    change: "-3.1%",
    tone: "neutral" as const,
    icon: <span className="text-lg font-semibold">↘</span>,
  },
  {
    label: "Utilidad",
    value: "$84.2K",
    change: "+8.4%",
    tone: "positive" as const,
    icon: <span className="text-lg font-semibold">◎</span>,
  },
  {
    label: "Rentabilidad",
    value: "34.0%",
    change: "+1.2 pts",
    tone: "positive" as const,
    icon: <span className="text-lg font-semibold">%</span>,
  },
];

const recentTrips = [
  { id: "TR-1048", route: "Bogotá → Medellín", driver: "Sofía Pérez", vehicle: "AX-204", status: "Completado", revenue: "$18.400" },
  { id: "TR-1047", route: "Cali → Bucaramanga", driver: "Mateo Ruiz", vehicle: "RT-118", status: "En curso", revenue: "$12.950" },
  { id: "TR-1046", route: "Barranquilla → Cartagena", driver: "Laura Gómez", vehicle: "QW-77", status: "Pendiente", revenue: "$9.800" },
  { id: "TR-1045", route: "Medellín → Pereira", driver: "Daniel Torres", vehicle: "LM-33", status: "Completado", revenue: "$7.600" },
];

export default function Home() {
  return (
    <AppShell
      title="Dashboard ejecutivo"
      description="Control total de ingresos, costos y operación en tiempo real."
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item) => (
            <KpiCard key={item.label} {...item} />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
          <Card title="Gráfico de ingresos" subtitle="Evolución mensual del rendimiento operativo">
            <div className="flex h-64 items-end justify-between gap-3 rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-4">
              {[38, 54, 46, 70, 62, 78, 86].map((height, index) => (
                <div key={`${height}-${index}`} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-xl bg-gradient-to-t from-[#2563EB] to-[#60A5FA]"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-slate-400">{["E", "F", "M", "A", "M", "J", "J"][index]}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Gastos por categoría" subtitle="Distribución de costos del periodo">
            <div className="space-y-4">
              {[
                { label: "Combustible", value: "42%", color: "bg-[#2563EB]" },
                { label: "Mantenimiento", value: "24%", color: "bg-[#16A34A]" },
                { label: "Personal", value: "19%", color: "bg-[#DC2626]" },
                { label: "Operación", value: "15%", color: "bg-slate-500" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-300">{item.label}</span>
                    <span className="font-medium text-white">{item.value}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800">
                    <div className={`h-2.5 rounded-full ${item.color}`} style={{ width: item.value }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card title="Últimos viajes" subtitle="Seguimiento de la operación reciente">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="px-3 py-3 font-medium">ID</th>
                  <th className="px-3 py-3 font-medium">Ruta</th>
                  <th className="px-3 py-3 font-medium">Conductor</th>
                  <th className="px-3 py-3 font-medium">Vehículo</th>
                  <th className="px-3 py-3 font-medium">Estado</th>
                  <th className="px-3 py-3 font-medium">Ingresos</th>
                </tr>
              </thead>
              <tbody>
                {recentTrips.map((trip) => (
                  <tr key={trip.id} className="border-b border-slate-800/70 text-slate-200 last:border-0">
                    <td className="px-3 py-3 font-medium text-white">{trip.id}</td>
                    <td className="px-3 py-3">{trip.route}</td>
                    <td className="px-3 py-3">{trip.driver}</td>
                    <td className="px-3 py-3">{trip.vehicle}</td>
                    <td className="px-3 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        trip.status === "Completado"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : trip.status === "En curso"
                            ? "bg-sky-500/15 text-sky-400"
                            : "bg-amber-500/15 text-amber-400"
                      }`}>
                        {trip.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">{trip.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
