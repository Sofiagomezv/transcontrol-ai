"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { OperationDetail } from "@/components/forms/OperationDetail";
import { OperationForm } from "@/components/forms/OperationForm";
import { createOperationRecord, deleteOperationRecord, getOperationRecords, updateOperationRecord } from "@/lib/operation-service";
import { getCustomerRecords } from "@/lib/customer-service";
import { getVehicleRecords } from "@/lib/vehicle-service";
import { getDriverRecords } from "@/lib/driver-service";
import type { Operation, OperationFormValues } from "@/types/operation";

export default function OperacionesPage() {
  const [records, setRecords] = useState<Operation[]>(() => getOperationRecords());
  const [customers] = useState(() => getCustomerRecords());
  const [vehicles] = useState(() => getVehicleRecords());
  const [drivers] = useState(() => getDriverRecords());
  const [view, setView] = useState<"list" | "form" | "detail">("list");
  const [selected, setSelected] = useState<Operation | null>(null);
  const [notice, setNotice] = useState<{ type: "success" | "error"; title: string; message: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return records.filter((record) => [record.client, record.vehicle, record.driver, record.status, record.id].join(" ").toLowerCase().includes(term));
  }, [records, searchTerm]);

  const handleCreate = () => {
    setSelected(null);
    setView("form");
    setNotice(null);
  };

  const handleEdit = (operation: Operation) => {
    setSelected(operation);
    setView("form");
    setNotice(null);
  };

  const handleView = (operation: Operation) => {
    setSelected(operation);
    setView("detail");
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("¿Desea eliminar esta operación?");
    if (!confirmed) {
      return;
    }
    deleteOperationRecord(id);
    setRecords(getOperationRecords());
    setNotice({ type: "success", title: "Operación eliminada", message: "El registro se quitó correctamente." });
  };

  const handleSubmit = (values: OperationFormValues) => {
    try {
      if (selected) {
        updateOperationRecord(selected.id, values);
        setNotice({ type: "success", title: "Operación actualizada", message: "Los cambios quedaron guardados localmente." });
      } else {
        createOperationRecord(values);
        setNotice({ type: "success", title: "Operación creada", message: "La operación se registró correctamente." });
      }
      setRecords(getOperationRecords());
      setView("list");
      setSelected(null);
    } catch (error) {
      setNotice({ type: "error", title: "No se pudo guardar", message: error instanceof Error ? error.message : "Intenta nuevamente." });
    }
  };

  return (
    <AppShell title="Operaciones" description="Administra viajes y operaciones con datos reales y cálculos automáticos.">
      <div className="space-y-6">
        {notice && <Notice {...notice} />}
        {view === "list" && (
          <Card title="Operaciones registradas" subtitle="Gestiona y filtra las operaciones de la empresa">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Buscar por cliente, vehículo o estado" className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none lg:max-w-sm" />
              <button type="button" onClick={handleCreate} className="rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]">Nueva operación</button>
            </div>
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-8 text-center">
                <h3 className="text-lg font-semibold text-white">No hay operaciones registradas</h3>
                <p className="mt-2 text-sm text-slate-400">Crea la primera operación para empezar a controlar la operación.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((operation) => (
                  <div key={operation.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                    <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="font-semibold text-white">{operation.id} · {operation.client}</p>
                        <p className="text-sm text-slate-400">{operation.origin} → {operation.destination} · {operation.vehicle}</p>
                        <p className="text-sm text-slate-400">Estado: {operation.status} · Utilidad: {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(operation.utility)}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => handleView(operation)} className="rounded-lg border border-sky-500/30 px-3 py-2 text-sm text-sky-400 hover:bg-sky-500/10">Ver</button>
                        <button type="button" onClick={() => handleEdit(operation)} className="rounded-lg border border-amber-500/30 px-3 py-2 text-sm text-amber-400 hover:bg-amber-500/10">Editar</button>
                        <button type="button" onClick={() => handleDelete(operation.id)} className="rounded-lg border border-rose-500/30 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10">Eliminar</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {view === "form" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{selected ? "Editar operación" : "Nueva operación"}</p>
                <h2 className="text-2xl font-semibold text-white">{selected ? "Actualiza la operación" : "Registra una nueva operación"}</h2>
              </div>
            </div>
            <OperationForm
              initialValues={selected ? ({ ...selected, freightValue: selected.freightValue, kilometers: selected.kilometers, fuel: selected.fuel, urea: selected.urea, tolls: selected.tolls, perDiem: selected.perDiem, driverPayment: selected.driverPayment, otherExpenses: selected.otherExpenses, observations: selected.observations, status: selected.status, date: selected.date, client: selected.client, vehicle: selected.vehicle, driver: selected.driver, origin: selected.origin, destination: selected.destination }) : undefined}
              customers={customers.map((customer) => ({ id: customer.id, name: customer.name }))}
              vehicles={vehicles.map((vehicle) => ({ id: vehicle.id, plate: vehicle.plate }))}
              drivers={drivers.map((driver) => ({ id: driver.id, fullName: driver.fullName }))}
              onSubmit={handleSubmit}
              onCancel={() => { setView("list"); setSelected(null); }}
              submitLabel={selected ? "Actualizar operación" : "Crear operación"}
            />
          </div>
        )}

        {view === "detail" && selected && <OperationDetail operation={selected} onBack={() => setView("list")} />}
      </div>
    </AppShell>
  );
}
