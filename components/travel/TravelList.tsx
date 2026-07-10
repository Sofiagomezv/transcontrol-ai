"use client";

import { Card } from "@/components/ui/Card";
import { formatTravelCurrency } from "@/lib/travel-service";
import type { TravelRecord } from "@/types";

type TravelListProps = {
  travels: TravelRecord[];
  onCreate: () => void;
  onEdit: (travel: TravelRecord) => void;
  onDelete: (id: string) => void;
  onView: (travel: TravelRecord) => void;
};

export function TravelList({ travels, onCreate, onEdit, onDelete, onView }: TravelListProps) {
  return (
    <Card title="Viajes registrados" subtitle="Gestiona tus viajes desde una sola vista">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-400">Total de registros: {travels.length}</p>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
        >
          Nuevo viaje
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-300">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="px-3 py-3 font-medium">ID</th>
              <th className="px-3 py-3 font-medium">Fecha</th>
              <th className="px-3 py-3 font-medium">Cliente</th>
              <th className="px-3 py-3 font-medium">Ruta</th>
              <th className="px-3 py-3 font-medium">Flete</th>
              <th className="px-3 py-3 font-medium">Utilidad</th>
              <th className="px-3 py-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {travels.map((travel) => (
              <tr key={travel.id} className="border-b border-slate-800/70 text-slate-200 last:border-0">
                <td className="px-3 py-3 font-medium text-white">{travel.id}</td>
                <td className="px-3 py-3">{travel.date}</td>
                <td className="px-3 py-3">{travel.client}</td>
                <td className="px-3 py-3">{travel.origin} → {travel.destination}</td>
                <td className="px-3 py-3">{formatTravelCurrency(travel.freightValue)}</td>
                <td className="px-3 py-3 text-emerald-400">{formatTravelCurrency(travel.utility)}</td>
                <td className="px-3 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => onView(travel)} className="text-sm text-sky-400 hover:text-sky-300">
                      Ver
                    </button>
                    <button type="button" onClick={() => onEdit(travel)} className="text-sm text-amber-400 hover:text-amber-300">
                      Editar
                    </button>
                    <button type="button" onClick={() => onDelete(travel.id!)} className="text-sm text-rose-400 hover:text-rose-300">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
