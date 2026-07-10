"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import type { Vehicle, VehicleFormValues } from "@/types/vehicle";

type VehicleFormProps = {
  initialValues?: Vehicle;
  onSubmit: (values: VehicleFormValues) => void;
  onCancel: () => void;
  submitLabel?: string;
};

const emptyValues: VehicleFormValues = {
  plate: "",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  type: "Camión",
  capacity: "",
  status: "Disponible",
};

export function VehicleForm({ initialValues, onSubmit, onCancel, submitLabel = "Guardar vehículo" }: VehicleFormProps) {
  const [values, setValues] = useState<VehicleFormValues>(initialValues ?? emptyValues);

  useEffect(() => {
    setValues(initialValues ?? emptyValues);
  }, [initialValues]);

  const handleChange = (field: keyof VehicleFormValues, value: string | number) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(values);
      }}
      className="space-y-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300">
          <span>Placa</span>
          <input
            required
            value={values.plate}
            onChange={(event) => handleChange("plate", event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none"
            placeholder="AX-204"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Marca</span>
          <input
            required
            value={values.brand}
            onChange={(event) => handleChange("brand", event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none"
            placeholder="Volvo"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Modelo</span>
          <input
            required
            value={values.model}
            onChange={(event) => handleChange("model", event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none"
            placeholder="FH16"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Año</span>
          <input
            type="number"
            required
            value={values.year}
            onChange={(event) => handleChange("year", Number(event.target.value))}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Tipo</span>
          <select
            value={values.type}
            onChange={(event) => handleChange("type", event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none"
          >
            <option value="Camión">Camión</option>
            <option value="Bus">Bus</option>
            <option value="Vehículo ligero">Vehículo ligero</option>
            <option value="Volquete">Volquete</option>
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Capacidad</span>
          <input
            required
            value={values.capacity}
            onChange={(event) => handleChange("capacity", event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none"
            placeholder="20 Ton"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300 md:col-span-2">
          <span>Estado</span>
          <select
            value={values.status}
            onChange={(event) => handleChange("status", event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none"
          >
            <option value="Disponible">Disponible</option>
            <option value="En viaje">En viaje</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </label>
      </div>

      <Card title="Vista previa" subtitle="Información del vehículo antes de guardar">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Placa</p>
            <p className="mt-1 font-semibold text-white">{values.plate || "—"}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Marca</p>
            <p className="mt-1 font-semibold text-white">{values.brand || "—"}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Modelo</p>
            <p className="mt-1 font-semibold text-white">{values.model || "—"}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Estado</p>
            <p className="mt-1 font-semibold text-emerald-400">{values.status}</p>
          </div>
        </div>
      </Card>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
