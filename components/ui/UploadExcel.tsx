"use client";

import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { Card } from "@/components/ui/Card";

type UploadExcelProps = {
  onFileSelected?: (file: File | null) => void;
};

export function UploadExcel({ onFileSelected }: UploadExcelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File | null) => {
    if (!file) {
      return null;
    }

    const allowedTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (!allowedTypes.includes(file.type) && !["xlsx", "xls"].includes(extension ?? "")) {
      return "Solo se permiten archivos Excel (.xlsx o .xls).";
    }

    return null;
  };

  const handleFile = (file: File | null) => {
    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      onFileSelected?.(null);
      return;
    }

    setError(null);
    setSelectedFile(file);
    onFileSelected?.(file);
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0] ?? null);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0] ?? null);
  };

  return (
    <Card title="Importar archivo Excel" subtitle="Arrastra o selecciona un archivo para preparar la carga de datos">
      <div
        className={`rounded-2xl border border-dashed p-8 text-center transition ${
          isDragging
            ? "border-[#2563EB] bg-[#2563EB]/10"
            : "border-slate-700 bg-slate-900/50"
        }`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB]/15 text-[#60A5FA]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
            <path d="M12 16V4" />
            <path d="m7 9 5-5 5 5" />
            <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
          </svg>
        </div>

        <h3 className="mt-4 text-lg font-semibold text-white">Arrastra tu archivo aquí</h3>
        <p className="mt-2 text-sm text-slate-400">o selecciona un archivo desde tu equipo.</p>

        <button
          type="button"
          className="mt-5 rounded-xl bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
          onClick={() => inputRef.current?.click()}
        >
          Seleccionar archivo
        </button>

        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls"
          className="hidden"
          onChange={onInputChange}
        />

        <div className="mt-5 min-h-6 text-sm">
          {selectedFile ? (
            <p className="text-emerald-400">Archivo listo: {selectedFile.name}</p>
          ) : (
            <p className="text-slate-500">Sin archivo seleccionado todavía.</p>
          )}
        </div>

        {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
      </div>

      <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-400">
        <p className="font-medium text-slate-300">Próximo paso</p>
        <p className="mt-1">
          Cuando el archivo esté validado, se preparará la estructura para su procesamiento en el siguiente sprint.
        </p>
      </div>
    </Card>
  );
}
