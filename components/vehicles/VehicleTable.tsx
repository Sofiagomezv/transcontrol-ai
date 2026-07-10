"use client";

import { Card } from "@/components/ui/Card";
import type { Vehicle } from "@/types/vehicle";

type VehicleTableProps = {
  vehicles: Vehicle[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCreate: () => void;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
};

export function VehicleTable({
  vehicles,
  searchTerm,
  onSearchChange,
  onCreate,
  onEdit,
  onDelete,
}: VehicleTableProps) {
  return (
    <Card title="Flota registrada" subtitle="Busca y gestiona tus vehículos de forma rápida">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <input
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por placa, marca o modelo"
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none lg:max-w-sm"
        />
        <button
          type="button"
          onClick={onCreate}
          className="rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
        >
          Nuevo Vehículo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-300">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="px-3 py-3 font-medium">Placa</th>
              <th className="px-3 py-3 font-medium">Marca</th>
              <th className="px-3 py-3 font-medium">Modelo</th>
              <th className="px-3 py-3 font-medium">Año</th>
              <th className="px-3 py-3 font-medium">Tipo</th>
              <th className="px-3 py-3 font-medium">Capacidad</th>
              <th className="px-3 py-3 font-medium">Estado</th>
              <th className="px-3 py-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="border-b border-slate-800/70 text-slate-200 last:border-0">
                <td className="px-3 py-3 font-medium text-white">{vehicle.plate}</td>
                <td className="px-3 py-3">{vehicle.brand}</td>
                <td className="px-3 py-3">{vehicle.model}</td>
                <td className="px-3 py-3">{vehicle.year}</td>
                <td className="px-3 py-3">{vehicle.type}</td>
                <td className="px-3 py-3">{vehicle.capacity}</td>
                <td className="px-3 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    vehicle.status === "Disponible"
                      ? "bg-emerald-500/15 text-emerald-400"
                      : vehicle.status === "En viaje"
                        ? "bg-sky-500/15 text-sky-400"
                        : vehicle.status === "Mantenimiento"
                          ? "bg-amber-500/15 text-amber-400"
                          : "bg-slate-500/15 text-slate-300"
                  }`}>
                    {vehicle.status}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => onEdit(vehicle)} className="text-sm text-amber-400 hover:text-amber-300">
                      Editar
                    </button>
                    <button type="button" onClick={() => onDelete(vehicle.id)} className="text-sm text-rose-400 hover:text-rose-300">
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
