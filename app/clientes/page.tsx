"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { EntityForm } from "@/components/forms/EntityForm";
import { createCustomerRecord, deleteCustomerRecord, getCustomerRecords, updateCustomerRecord } from "@/lib/customer-service";
import type { Customer, CustomerFormValues } from "@/types/customer";

const emptyValues: CustomerFormValues = {
  name: "",
  nit: "",
  phone: "",
  email: "",
  city: "",
  address: "",
  status: "activo",
};

export default function ClientesPage() {
  const [records, setRecords] = useState<Customer[]>(() => getCustomerRecords());
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [notice, setNotice] = useState<{ type: "success" | "error"; title: string; message: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return records.filter((record) => [record.name, record.nit, record.city, record.status].join(" ").toLowerCase().includes(term));
  }, [records, searchTerm]);

  const handleSubmit = (values: CustomerFormValues) => {
    try {
      if (editing) {
        updateCustomerRecord(editing.id, values);
        setNotice({ type: "success", title: "Cliente actualizado", message: "El cliente quedó guardado correctamente." });
      } else {
        createCustomerRecord(values);
        setNotice({ type: "success", title: "Cliente creado", message: "El cliente se registró correctamente." });
      }
      setRecords(getCustomerRecords());
      setIsFormVisible(false);
      setEditing(null);
    } catch (error) {
      setNotice({ type: "error", title: "No se pudo guardar", message: error instanceof Error ? error.message : "Intenta nuevamente." });
    }
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("¿Desea eliminar este cliente?");
    if (!confirmed) {
      return;
    }
    deleteCustomerRecord(id);
    setRecords(getCustomerRecords());
    setNotice({ type: "success", title: "Cliente eliminado", message: "El registro se quitó correctamente." });
  };

  return (
    <AppShell title="Clientes" description="Mantén actualizada la base de clientes de la empresa.">
      <div className="space-y-6">
        {notice && <Notice {...notice} />}
        {isFormVisible ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{editing ? "Editar cliente" : "Nuevo cliente"}</p>
                <h2 className="text-2xl font-semibold text-white">{editing ? "Actualiza la información del cliente" : "Registra un nuevo cliente"}</h2>
              </div>
            </div>
            <EntityForm
              initialValues={editing ?? emptyValues}
              fields={[
                { label: "Nombre o razón social", name: "name", required: true },
                { label: "NIT", name: "nit", required: true },
                { label: "Teléfono", name: "phone", required: true },
                { label: "Correo", name: "email", type: "email", required: true },
                { label: "Ciudad", name: "city", required: true },
                { label: "Dirección", name: "address", required: true },
                { label: "Estado", name: "status", type: "select", required: true, options: [{ value: "activo", label: "Activo" }, { value: "inactivo", label: "Inactivo" }] },
              ]}
              onSubmit={handleSubmit}
              onCancel={() => { setIsFormVisible(false); setEditing(null); }}
              submitLabel={editing ? "Actualizar cliente" : "Crear cliente"}
            />
          </div>
        ) : (
          <Card title="Clientes registrados" subtitle="Busca y gestiona tus clientes desde un solo lugar">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Buscar por nombre, NIT o ciudad" className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none lg:max-w-sm" />
              <button type="button" onClick={() => { setEditing(null); setIsFormVisible(true); }} className="rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]">Nuevo cliente</button>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-8 text-center">
                <h3 className="text-lg font-semibold text-white">No hay clientes registrados</h3>
                <p className="mt-2 text-sm text-slate-400">Agrega el primero para comenzar a operar.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((record) => (
                  <div key={record.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                    <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="font-semibold text-white">{record.name}</p>
                        <p className="text-sm text-slate-400">NIT: {record.nit} · {record.city}</p>
                        <p className="text-sm text-slate-400">{record.phone} · {record.email}</p>
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
