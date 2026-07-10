"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";

export type GenericListPageProps<T, TFormValues> = {
  title: string;
  description: string;
  emptyTitle: string;
  emptyMessage: string;
  items: T[];
  searchPlaceholder: string;
  onCreate: () => void;
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  renderForm?: () => React.ReactNode;
  isFormVisible?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
  notice?: { type: "success" | "error"; title: string; message: string } | null;
  searchFields?: (item: T) => string[];
};

export function GenericListPage<T, TFormValues>({
  title,
  description,
  emptyTitle,
  emptyMessage,
  items,
  searchPlaceholder,
  onCreate,
  onEdit,
  onDelete,
  renderItem,
  renderForm,
  isFormVisible = false,
  onCancel,
  notice,
  searchFields,
}: GenericListPageProps<T, TFormValues>) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    const term = searchTerm.toLowerCase();
    if (!term) {
      return items;
    }

    return items.filter((item) => {
      const fields = searchFields ? searchFields(item) : [];
      return fields.join(" ").toLowerCase().includes(term);
    });
  }, [items, searchTerm, searchFields]);

  return (
    <AppShell title={title} description={description}>
      <div className="space-y-6">
        {notice && <Notice {...notice} />}
        {isFormVisible && renderForm ? (
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Formulario</p>
                <h2 className="text-2xl font-semibold text-white">Completa la información requerida</h2>
              </div>
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
                >
                  Cancelar
                </button>
              )}
            </div>
            {renderForm()}
          </div>
        ) : (
          <Card title="Registros" subtitle="Busca, crea y administra los registros del módulo">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none lg:max-w-sm"
              />
              <button
                type="button"
                onClick={onCreate}
                className="rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
              >
                Nuevo registro
              </button>
            </div>

            {filteredItems.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-8 text-center">
                <h3 className="text-lg font-semibold text-white">{emptyTitle}</h3>
                <p className="mt-2 text-sm text-slate-400">{emptyMessage}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredItems.map((item, index) => (
                  <div key={index} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                    {renderItem(item, index)}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button type="button" onClick={() => onEdit(item)} className="rounded-lg border border-amber-500/30 px-3 py-2 text-sm text-amber-400 hover:bg-amber-500/10">
                        Editar
                      </button>
                      <button type="button" onClick={() => onDelete((item as { id: string }).id)} className="rounded-lg border border-rose-500/30 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10">
                        Eliminar
                      </button>
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
