"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { calculateTravelMetrics, formatTravelCurrency } from "@/lib/travel-service";
import type { TravelFormValues, TravelRecord } from "@/types";

type TravelFormProps = {
  initialValues?: TravelFormValues;
  onSubmit: (values: TravelFormValues) => void;
  onCancel: () => void;
  submitLabel?: string;
};

const emptyValues: TravelFormValues = {
  date: "",
  vehicle: "",
  driver: "",
  client: "",
  origin: "",
  destination: "",
  kilometers: 0,
  freightValue: 0,
  fuel: 0,
  urea: 0,
  tolls: 0,
  perDiem: 0,
  driverPayment: 0,
  otherExpenses: 0,
  observations: "",
  status: "borrador",
};

export function TravelForm({ initialValues, onSubmit, onCancel, submitLabel = "Guardar viaje" }: TravelFormProps) {
  const [values, setValues] = useState<TravelFormValues>(initialValues ?? emptyValues);

  useEffect(() => {
    setValues(initialValues ?? emptyValues);
  }, [initialValues]);

  const metrics = useMemo(() => calculateTravelMetrics(values), [values]);

  const handleChange = (field: keyof TravelFormValues, value: string | number) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300">
          <span>Fecha</span>
          <input
            type="date"
            required
            value={values.date}
            onChange={(event) => handleChange("date", event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none ring-0"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Vehículo</span>
          <input
            required
            value={values.vehicle}
            onChange={(event) => handleChange("vehicle", event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none ring-0"
            placeholder="AX-204"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Conductor</span>
          <input
            required
            value={values.driver}
            onChange={(event) => handleChange("driver", event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none ring-0"
            placeholder="Nombre del conductor"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Cliente</span>
          <input
            required
            value={values.client}
            onChange={(event) => handleChange("client", event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none ring-0"
            placeholder="Cliente"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Origen</span>
          <input
            required
            value={values.origin}
            onChange={(event) => handleChange("origin", event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none ring-0"
            placeholder="Ciudad de origen"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Destino</span>
          <input
            required
            value={values.destination}
            onChange={(event) => handleChange("destination", event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none ring-0"
            placeholder="Ciudad de destino"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Kilómetros</span>
          <input
            type="number"
            min="0"
            required
            value={values.kilometers}
            onChange={(event) => handleChange("kilometers", Number(event.target.value))}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none ring-0"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Valor del flete</span>
          <input
            type="number"
            min="0"
            required
            value={values.freightValue}
            onChange={(event) => handleChange("freightValue", Number(event.target.value))}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none ring-0"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Combustible</span>
          <input
            type="number"
            min="0"
            value={values.fuel}
            onChange={(event) => handleChange("fuel", Number(event.target.value))}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none ring-0"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Urea</span>
          <input
            type="number"
            min="0"
            value={values.urea}
            onChange={(event) => handleChange("urea", Number(event.target.value))}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none ring-0"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Peajes</span>
          <input
            type="number"
            min="0"
            value={values.tolls}
            onChange={(event) => handleChange("tolls", Number(event.target.value))}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none ring-0"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Viáticos</span>
          <input
            type="number"
            min="0"
            value={values.perDiem}
            onChange={(event) => handleChange("perDiem", Number(event.target.value))}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none ring-0"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Pago del conductor</span>
          <input
            type="number"
            min="0"
            value={values.driverPayment}
            onChange={(event) => handleChange("driverPayment", Number(event.target.value))}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none ring-0"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Otros gastos</span>
          <input
            type="number"
            min="0"
            value={values.otherExpenses}
            onChange={(event) => handleChange("otherExpenses", Number(event.target.value))}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none ring-0"
          />
        </label>
      </div>

      <label className="block space-y-2 text-sm text-slate-300">
        <span>Observaciones</span>
        <textarea
          value={values.observations}
          onChange={(event) => handleChange("observations", event.target.value)}
          className="min-h-24 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none ring-0"
          placeholder="Detalles del viaje"
        />
      </label>

      <Card title="Resumen automático" subtitle="Cálculos en tiempo real para el viaje">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Total de gastos</p>
            <p className="mt-1 text-lg font-semibold text-white">{formatTravelCurrency(metrics.totalExpenses)}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Utilidad</p>
            <p className="mt-1 text-lg font-semibold text-emerald-400">{formatTravelCurrency(metrics.utility)}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Rentabilidad</p>
            <p className="mt-1 text-lg font-semibold text-sky-400">{metrics.profitability.toFixed(1)}%</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-sm text-slate-400">Costo por km</p>
            <p className="mt-1 text-lg font-semibold text-amber-400">{formatTravelCurrency(metrics.costPerKilometer)}</p>
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
