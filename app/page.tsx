"use client";

import { useMemo } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { KpiCard } from "@/components/ui/KpiCard";
import { getOperationRecords } from "@/lib/operation-service";
import { getVehicleRecords } from "@/lib/vehicle-service";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value);
}

function getStatusTone(status: string) {
  switch (status) {
    case "cerrada":
      return "bg-emerald-500/15 text-emerald-400";
    case "en ruta":
      return "bg-sky-500/15 text-sky-400";
    case "programada":
      return "bg-amber-500/15 text-amber-400";
    default:
      return "bg-slate-500/15 text-slate-300";
  }
}

export default function Home() {
  const operations = useMemo(() => getOperationRecords(), []);
  const vehicles = useMemo(() => getVehicleRecords(), []);

  const totalIncome = operations.reduce((sum, operation) => sum + operation.freightValue, 0);
  const totalExpenses = operations.reduce((sum, operation) => sum + operation.totalExpenses, 0);
  const utility = totalIncome - totalExpenses;
  const profitability = totalIncome === 0 ? 0 : (utility / totalIncome) * 100;
  const operationsInRoute = operations.filter((operation) => operation.status === "en ruta").length;
  const pendingClosure = operations.filter((operation) => operation.status !== "cerrada").length;
  const availableVehicles = vehicles.filter((vehicle) => vehicle.status === "Disponible").length;
  const latestOperations = [...operations].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  const categoryExpenses = [
    { label: "Combustible", value: operations.reduce((sum, operation) => sum + operation.fuel, 0), color: "bg-[#2563EB]" },
    { label: "Urea", value: operations.reduce((sum, operation) => sum + operation.urea, 0), color: "bg-[#16A34A]" },
    { label: "Peajes", value: operations.reduce((sum, operation) => sum + operation.tolls, 0), color: "bg-[#DC2626]" },
    { label: "Viáticos", value: operations.reduce((sum, operation) => sum + operation.perDiem, 0), color: "bg-slate-500" },
    { label: "Pago conductor", value: operations.reduce((sum, operation) => sum + operation.driverPayment, 0), color: "bg-amber-500" },
    { label: "Otros", value: operations.reduce((sum, operation) => sum + operation.otherExpenses, 0), color: "bg-violet-500" },
  ];

  const maxValue = Math.max(...categoryExpenses.map((item) => item.value), 1);

  return (
    <AppShell title="Dashboard ejecutivo" description="Control total de ingresos, costos y operación en tiempo real.">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Ingresos" value={formatCurrency(totalIncome)} change="Actual" tone="positive" icon={<span className="text-lg font-semibold">↗</span>} />
          <KpiCard label="Gastos" value={formatCurrency(totalExpenses)} change="Actual" tone="neutral" icon={<span className="text-lg font-semibold">↘</span>} />
          <KpiCard label="Utilidad" value={formatCurrency(utility)} change="Actual" tone="positive" icon={<span className="text-lg font-semibold">◎</span>} />
          <KpiCard label="Rentabilidad" value={`${profitability.toFixed(1)}%`} change="General" tone="positive" icon={<span className="text-lg font-semibold">%</span>} />
        </div>

        <Card title="Resumen operativo" subtitle="Indicadores calculados desde las operaciones registradas">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3"><p className="text-sm text-slate-400">Operaciones</p><p className="mt-2 text-2xl font-semibold text-white">{operations.length}</p></div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3"><p className="text-sm text-slate-400">Vehículos disponibles</p><p className="mt-2 text-2xl font-semibold text-white">{availableVehicles}</p></div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3"><p className="text-sm text-slate-400">Operaciones en ruta</p><p className="mt-2 text-2xl font-semibold text-white">{operationsInRoute}</p></div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3"><p className="text-sm text-slate-400">Pendientes de cierre</p><p className="mt-2 text-2xl font-semibold text-white">{pendingClosure}</p></div>
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card title="Últimas operaciones" subtitle="Seguimiento de la operación reciente">
            {latestOperations.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-8 text-center">
                <h3 className="text-lg font-semibold text-white">No hay operaciones aún</h3>
                <p className="mt-2 text-sm text-slate-400">Crea una nueva operación para ver el historial aquí.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-slate-300">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="px-3 py-3 font-medium">ID</th>
                      <th className="px-3 py-3 font-medium">Cliente</th>
                      <th className="px-3 py-3 font-medium">Ruta</th>
                      <th className="px-3 py-3 font-medium">Estado</th>
                      <th className="px-3 py-3 font-medium">Utilidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestOperations.map((operation) => (
                      <tr key={operation.id} className="border-b border-slate-800/70 text-slate-200 last:border-0">
                        <td className="px-3 py-3 font-medium text-white">{operation.id}</td>
                        <td className="px-3 py-3">{operation.client}</td>
                        <td className="px-3 py-3">{operation.origin} → {operation.destination}</td>
                        <td className="px-3 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusTone(operation.status)}`}>{operation.status}</span></td>
                        <td className="px-3 py-3">{formatCurrency(operation.utility)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          <Card title="Gastos por categoría" subtitle="Distribución de costos del periodo">
            {categoryExpenses.every((item) => item.value === 0) ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-6 text-center text-sm text-slate-400">Aún no hay gastos registrados.</div>
            ) : (
              <div className="space-y-4">
                {categoryExpenses.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-slate-300">{item.label}</span>
                      <span className="font-medium text-white">{formatCurrency(item.value)}</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-800">
                      <div className={`h-2.5 rounded-full ${item.color}`} style={{ width: `${(item.value / maxValue) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
