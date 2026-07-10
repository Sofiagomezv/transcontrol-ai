"use client";

import { Card } from "@/components/ui/Card";
import { formatTravelCurrency } from "@/lib/travel-service";
import type { TravelRecord } from "@/types";

type TravelDetailProps = {
  travel: TravelRecord;
  onBack: () => void;
};

export function TravelDetail({ travel, onBack }: TravelDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Detalle del viaje</p>
          <h2 className="text-2xl font-semibold text-white">{travel.id}</h2>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
        >
          Volver
        </button>
      </div>

      <Card title="Información general" subtitle="Resumen del viaje registrado">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Cliente</p>
            <p className="mt-1 text-white">{travel.client}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Ruta</p>
            <p className="mt-1 text-white">{travel.origin} → {travel.destination}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Conductor</p>
            <p className="mt-1 text-white">{travel.driver}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Vehículo</p>
            <p className="mt-1 text-white">{travel.vehicle}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Fecha</p>
            <p className="mt-1 text-white">{travel.date}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Kilómetros</p>
            <p className="mt-1 text-white">{travel.kilometers}</p>
          </div>
        </div>
      </Card>

      <Card title="Finanzas" subtitle="Indicadores de rendimiento del viaje">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Valor del flete</p>
            <p className="mt-1 font-semibold text-white">{formatTravelCurrency(travel.freightValue)}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Total de gastos</p>
            <p className="mt-1 font-semibold text-white">{formatTravelCurrency(travel.totalExpenses)}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Utilidad</p>
            <p className="mt-1 font-semibold text-emerald-400">{formatTravelCurrency(travel.utility)}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Rentabilidad</p>
            <p className="mt-1 font-semibold text-sky-400">{travel.profitability.toFixed(1)}%</p>
          </div>
        </div>
      </Card>

      <Card title="Gastos detallados" subtitle="Desglose operativo del viaje">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Combustible</p>
            <p className="mt-1 text-white">{formatTravelCurrency(travel.fuel)}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Urea</p>
            <p className="mt-1 text-white">{formatTravelCurrency(travel.urea)}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Peajes</p>
            <p className="mt-1 text-white">{formatTravelCurrency(travel.tolls)}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Viáticos</p>
            <p className="mt-1 text-white">{formatTravelCurrency(travel.perDiem)}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Pago del conductor</p>
            <p className="mt-1 text-white">{formatTravelCurrency(travel.driverPayment)}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Otros gastos</p>
            <p className="mt-1 text-white">{formatTravelCurrency(travel.otherExpenses)}</p>
          </div>
        </div>
      </Card>

      <Card title="Observaciones" subtitle="Notas del viaje">
        <p className="text-sm leading-6 text-slate-300">{travel.observations || "Sin observaciones registradas."}</p>
      </Card>
    </div>
  );
}
