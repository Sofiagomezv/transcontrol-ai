"use client";

import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/operation-service";
import type { Operation } from "@/types/operation";

type OperationDetailProps = {
  operation: Operation;
  onBack: () => void;
};

export function OperationDetail({ operation, onBack }: OperationDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Detalle de la operación</p>
          <h2 className="text-2xl font-semibold text-white">{operation.id}</h2>
        </div>
        <button type="button" onClick={onBack} className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800">Volver</button>
      </div>

      <Card title="Información general" subtitle="Resumen operativo">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3"><p className="text-sm text-slate-400">Cliente</p><p className="mt-1 text-white">{operation.client}</p></div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3"><p className="text-sm text-slate-400">Vehículo</p><p className="mt-1 text-white">{operation.vehicle}</p></div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3"><p className="text-sm text-slate-400">Conductor</p><p className="mt-1 text-white">{operation.driver}</p></div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3"><p className="text-sm text-slate-400">Ruta</p><p className="mt-1 text-white">{operation.origin} → {operation.destination}</p></div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3"><p className="text-sm text-slate-400">Fecha</p><p className="mt-1 text-white">{operation.date}</p></div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3"><p className="text-sm text-slate-400">Estado</p><p className="mt-1 text-white">{operation.status}</p></div>
        </div>
      </Card>

      <Card title="Finanzas" subtitle="Indicadores del viaje">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3"><p className="text-sm text-slate-400">Valor del flete</p><p className="mt-1 font-semibold text-white">{formatCurrency(operation.freightValue)}</p></div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3"><p className="text-sm text-slate-400">Total de gastos</p><p className="mt-1 font-semibold text-white">{formatCurrency(operation.totalExpenses)}</p></div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3"><p className="text-sm text-slate-400">Utilidad</p><p className="mt-1 font-semibold text-emerald-400">{formatCurrency(operation.utility)}</p></div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3"><p className="text-sm text-slate-400">Rentabilidad</p><p className="mt-1 font-semibold text-sky-400">{operation.profitability.toFixed(1)}%</p></div>
        </div>
      </Card>

      <Card title="Observaciones" subtitle="Notas de la operación">
        <p className="text-sm leading-6 text-slate-300">{operation.observations || "Sin observaciones registradas."}</p>
      </Card>
    </div>
  );
}
