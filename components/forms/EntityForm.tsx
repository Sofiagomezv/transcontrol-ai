"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";

export type EntityFormProps<TValues> = {
  initialValues: TValues;
  fields: Array<{
    label: string;
    name: keyof TValues;
    type?: "text" | "number" | "date" | "email" | "select" | "textarea";
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
    required?: boolean;
    min?: number;
    step?: number;
    className?: string;
    colSpan?: string;
  }>;
  onSubmit: (values: TValues) => void;
  onCancel: () => void;
  submitLabel?: string;
  preview?: React.ReactNode;
};

export function EntityForm<TValues extends Record<string, unknown>>({
  initialValues,
  fields,
  onSubmit,
  onCancel,
  submitLabel = "Guardar",
  preview,
}: EntityFormProps<TValues>) {
  const [values, setValues] = useState<TValues>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (field: keyof TValues, value: string | number) => {
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
      <Card title="Información del registro" subtitle="Completa los campos obligatorios para guardar">
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((field) => {
            const value = values[field.name] as string | number | undefined;
            const baseClassName = "w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none";
            const colSpanClass = field.colSpan ?? "";

            return (
              <label key={String(field.name)} className={`space-y-2 text-sm text-slate-300 ${colSpanClass}`}>
                <span>{field.label}{field.required ? " *" : ""}</span>
                {field.type === "select" ? (
                  <select
                    value={String(value ?? "")}
                    onChange={(event) => handleChange(field.name, event.target.value)}
                    className={baseClassName}
                  >
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    value={String(value ?? "")}
                    onChange={(event) => handleChange(field.name, event.target.value)}
                    className={`${baseClassName} min-h-24`}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    type={field.type ?? "text"}
                    min={field.min}
                    step={field.step}
                    required={field.required}
                    value={String(value ?? "")}
                    onChange={(event) => handleChange(field.name, field.type === "number" ? Number(event.target.value) : event.target.value)}
                    className={baseClassName}
                    placeholder={field.placeholder}
                  />
                )}
              </label>
            );
          })}
        </div>
      </Card>

      {preview && <Card title="Vista previa" subtitle="Revisa los datos antes de guardar">{preview}</Card>}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800">
          Cancelar
        </button>
        <button type="submit" className="rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
