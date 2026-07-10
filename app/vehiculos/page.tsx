"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { EntityForm } from "@/components/forms/EntityForm";
import { createVehicleRecord, deleteVehicleRecord, getVehicleRecords, updateVehicleRecord } from "@/lib/vehicle-service";
import type { Vehicle, VehicleFormValues } from "@/types/vehicle";

const emptyValues: VehicleFormValues = {
  plate: "",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  type: "Camión",
  capacity: "",
  currentMileage: 0,
  status: "Disponible",
};

export default function VehiculosPage() {
  const [records, setRecords] = useState<Vehicle[]>(() => getVehicleRecords());
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [notice, setNotice] = useState<{ type: "success" | "error"; title: string; message: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return records.filter((record) => [record.plate, record.brand, record.model, record.status, record.type].join(" ").toLowerCase().includes(term));
  }, [records, searchTerm]);

  const handleSubmit = (values: VehicleFormValues) => {
    try {
      if (editing) {
        updateVehicleRecord(editing.id, values);
        setNotice({ type: "success", title: "Vehículo actualizado", message: "El vehículo quedó guardado correctamente." });
      } else {
        createVehicleRecord(values);
        setNotice({ type: "success", title: "Vehículo creado", message: "El vehículo se registró correctamente." });
      }
      setRecords(getVehicleRecords());
      setIsFormVisible(false);
      setEditing(null);
    } catch (error) {
      setNotice({ type: "error", title: "No se pudo guardar", message: error instanceof Error ? error.message : "Intenta nuevamente." });
    }
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("¿Desea eliminar este vehículo?");
    if (!confirmed) {
      return;
    }
    deleteVehicleRecord(id);
    setRecords(getVehicleRecords());
    setNotice({ type: "success", title: "Vehículo eliminado", message: "El registro se quitó correctamente." });
  };

  return (
    <AppShell title="Vehículos" description="Administra la flota, el estado y la disponibilidad de los vehículos.">
      <div className="space-y-6">
        {notice && <Notice {...notice} />}
        {isFormVisible ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{editing ? "Editar vehículo" : "Nuevo vehículo"}</p>
                <h2 className="text-2xl font-semibold text-white">{editing ? "Actualiza la información del vehículo" : "Registra un nuevo vehículo"}</h2>
              </div>
            </div>
            <EntityForm
              initialValues={editing ?? emptyValues}
              fields={[
                { label: "Placa", name: "plate", required: true },
                { label: "Marca", name: "brand", required: true },
                { label: "Modelo", name: "model", required: true },
                { label: "Año", name: "year", type: "number", required: true, min: 2000 },
                { label: "Tipo", name: "type", type: "select", required: true, options: [{ value: "Camión", label: "Camión" }, { value: "Bus", label: "Bus" }, { value: "Vehículo ligero", label: "Vehículo ligero" }, { value: "Volquete", label: "Volquete" }] },
                { label: "Capacidad", name: "capacity", required: true },
                { label: "Kilometraje actual", name: "currentMileage", type: "number", required: true, min: 0 },
                { label: "Estado", name: "status", type: "select", required: true, options: [{ value: "Disponible", label: "Disponible" }, { value: "En operación", label: "En operación" }, { value: "Mantenimiento", label: "Mantenimiento" }, { value: "Inactivo", label: "Inactivo" }] },
              ]}
              onSubmit={handleSubmit}
              onCancel={() => { setIsFormVisible(false); setEditing(null); }}
              submitLabel={editing ? "Actualizar vehículo" : "Crear vehículo"}
            />
          </div>
        ) : (
          <Card title="Flota registrada" subtitle="Busca y gestiona tus vehículos de forma rápida">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Buscar por placa, marca o modelo" className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none lg:max-w-sm" />
              <button type="button" onClick={() => { setEditing(null); setIsFormVisible(true); }} className="rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]">Nuevo vehículo</button>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-8 text-center">
                <h3 className="text-lg font-semibold text-white">No hay vehículos registrados</h3>
                <p className="mt-2 text-sm text-slate-400">Crea el primero para comenzar a administrar la flota.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((record) => (
                  <div key={record.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                    <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="font-semibold text-white">{record.plate} · {record.brand} {record.model}</p>
                        <p className="text-sm text-slate-400">Tipo: {record.type} · Capacidad: {record.capacity}</p>
                        <p className="text-sm text-slate-400">Kilometraje: {record.currentMileage.toLocaleString("es-CO")} · Estado: {record.status}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => { setEditing(record); setIsFormVisible(true); }} className="rounded-lg border border-amber-500/30 px-3 py-2 text-sm text-amber-400 hover:bg-amber-500/10">Editar</button>
                        <button type="button" onClick={() => handleDelete(record.id)} className="rounded-lg border border-rose-500/30 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10">Eliminar</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>
    </AppShell>
  );
}
