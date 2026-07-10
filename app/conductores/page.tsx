"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { EntityForm } from "@/components/forms/EntityForm";
import { createDriverRecord, deleteDriverRecord, getDriverRecords, updateDriverRecord } from "@/lib/driver-service";
import type { Driver, DriverFormValues } from "@/types/driver";

const emptyValues: DriverFormValues = {
  fullName: "",
  document: "",
  phone: "",
  licenseNumber: "",
  licenseCategory: "",
  expirationDate: "",
  status: "disponible",
};

export default function ConductoresPage() {
  const [records, setRecords] = useState<Driver[]>(() => getDriverRecords());
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editing, setEditing] = useState<Driver | null>(null);
  const [notice, setNotice] = useState<{ type: "success" | "error"; title: string; message: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return records.filter((record) => [record.fullName, record.document, record.licenseNumber, record.status].join(" ").toLowerCase().includes(term));
  }, [records, searchTerm]);

  const handleSubmit = (values: DriverFormValues) => {
    try {
      if (editing) {
        updateDriverRecord(editing.id, values);
        setNotice({ type: "success", title: "Conductor actualizado", message: "Los cambios quedaron guardados localmente." });
      } else {
        createDriverRecord(values);
        setNotice({ type: "success", title: "Conductor creado", message: "El conductor se registró correctamente." });
      }
      setRecords(getDriverRecords());
      setIsFormVisible(false);
      setEditing(null);
    } catch (error) {
      setNotice({ type: "error", title: "No se pudo guardar", message: error instanceof Error ? error.message : "Intenta nuevamente." });
    }
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("¿Desea eliminar este conductor?");
    if (!confirmed) {
      return;
    }
    deleteDriverRecord(id);
    setRecords(getDriverRecords());
    setNotice({ type: "success", title: "Conductor eliminado", message: "El registro se quitó correctamente." });
  };

  return (
    <AppShell title="Conductores" description="Gestiona la información operativa del personal de conducción.">
      <div className="space-y-6">
        {notice && <Notice {...notice} />}
        {isFormVisible ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{editing ? "Editar conductor" : "Nuevo conductor"}</p>
                <h2 className="text-2xl font-semibold text-white">{editing ? "Actualiza la información del conductor" : "Registra un nuevo conductor"}</h2>
              </div>
            </div>
            <EntityForm
              initialValues={editing ? { ...editing, document: editing.document, phone: editing.phone, licenseNumber: editing.licenseNumber, licenseCategory: editing.licenseCategory, expirationDate: editing.expirationDate, status: editing.status, fullName: editing.fullName } : emptyValues}
              fields={[
                { label: "Nombre completo", name: "fullName", required: true },
                { label: "Cédula", name: "document", required: true },
                { label: "Teléfono", name: "phone", required: true },
                { label: "Número de licencia", name: "licenseNumber", required: true },
                { label: "Categoría de licencia", name: "licenseCategory", required: true },
                { label: "Fecha de vencimiento", name: "expirationDate", type: "date", required: true },
                { label: "Estado", name: "status", type: "select", required: true, options: [{ value: "disponible", label: "Disponible" }, { value: "en operación", label: "En operación" }, { value: "inactivo", label: "Inactivo" }] },
              ]}
              onSubmit={handleSubmit}
              onCancel={() => { setIsFormVisible(false); setEditing(null); }}
              submitLabel={editing ? "Actualizar conductor" : "Crear conductor"}
            />
          </div>
        ) : (
          <Card title="Conductores registrados" subtitle="Busca, actualiza o elimina conductores de forma rápida">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Buscar por nombre, cédula o licencia" className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none lg:max-w-sm" />
              <button type="button" onClick={() => { setEditing(null); setIsFormVisible(true); }} className="rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]">Nuevo conductor</button>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-8 text-center">
                <h3 className="text-lg font-semibold text-white">No hay conductores registrados</h3>
                <p className="mt-2 text-sm text-slate-400">Crea el primero para comenzar a gestionar la operación.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((record) => (
                  <div key={record.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                    <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="font-semibold text-white">{record.fullName}</p>
                        <p className="text-sm text-slate-400">Cédula: {record.document} · Licencia: {record.licenseNumber}</p>
                        <p className="text-sm text-slate-400">Vence: {record.expirationDate} · Estado: {record.status}</p>
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
