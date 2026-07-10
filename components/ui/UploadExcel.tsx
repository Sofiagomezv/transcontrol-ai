"use client";

import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import * as XLSX from "xlsx";
import { Card } from "@/components/ui/Card";
import { ExcelPreviewTable } from "@/components/ui/ExcelPreviewTable";

type UploadExcelProps = {
  onFileSelected?: (file: File | null) => void;
};

type SheetSummary = {
  name: string;
  rows: Array<Array<string | number | boolean | Date | null>>;
  headers: string[];
  totalRows: number;
};

export function UploadExcel({ onFileSelected }: UploadExcelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sheets, setSheets] = useState<SheetSummary[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateFile = (file: File | null) => {
    if (!file) {
      return null;
    }

    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (!allowedTypes.includes(file.type) && !["xlsx", "xls"].includes(extension ?? "")) {
      return "Solo se permiten archivos Excel (.xlsx o .xls).";
    }

    return null;
  };

  const handleFile = async (file: File | null) => {
    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      setSheets([]);
      setSelectedSheet("");
      onFileSelected?.(null);
      return;
    }

    if (!file) {
      setError("No se seleccionó ningún archivo.");
      setSelectedFile(null);
      setSheets([]);
      setSelectedSheet("");
      onFileSelected?.(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSelectedFile(file);
    setSheets([]);
    setSelectedSheet("");
    onFileSelected?.(file);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      if (!workbook.SheetNames.length) {
        setError("El archivo Excel no contiene hojas válidas.");
        setIsLoading(false);
        return;
      }

      const parsedSheets = workbook.SheetNames.map((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" }) as Array<Array<string | number | boolean | Date | null>>;

        const rawHeaders = rows[0] ?? [];
        const headers = rawHeaders.map((header) => {
          if (header === null || header === undefined || header === "") {
            return "Columna";
          }
          return String(header);
        });

        const dataRows = rows.slice(1).filter((row) => row.some((value) => value !== "" && value !== null));

        return {
          name: sheetName,
          rows: dataRows.slice(0, 10),
          headers,
          totalRows: dataRows.length,
        };
      });

      setSheets(parsedSheets);
      setSelectedSheet(parsedSheets[0]?.name ?? "");
    } catch {
      setError("No se pudo leer el archivo Excel. Verifica que sea un archivo válido.");
    } finally {
      setIsLoading(false);
    }
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    void handleFile(event.target.files?.[0] ?? null);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    void handleFile(event.dataTransfer.files?.[0] ?? null);
  };

  const selectedSheetData = sheets.find((sheet) => sheet.name === selectedSheet);

  return (
    <Card title="Importar archivo Excel" subtitle="Sube un archivo y revisa sus hojas, encabezados y vista previa antes de procesarlo">
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
          {isLoading ? "Procesando..." : "Seleccionar archivo"}
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

      {sheets.length > 0 && (
        <div className="mt-6 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
            <p className="text-sm font-semibold text-white">Hojas disponibles</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sheets.map((sheet) => (
                <button
                  key={sheet.name}
                  type="button"
                  className={`rounded-full px-3 py-1.5 text-sm transition ${
                    selectedSheet === sheet.name
                      ? "bg-[#2563EB] text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                  onClick={() => setSelectedSheet(sheet.name)}
                >
                  {sheet.name}
                </button>
              ))}
            </div>
          </div>

          {selectedSheetData && (
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Hoja seleccionada: {selectedSheetData.name}</p>
                  <p className="text-sm text-slate-400">
                    Encabezados detectados automáticamente y {selectedSheetData.totalRows} filas disponibles para importar.
                  </p>
                </div>
                <div className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-sm text-slate-300">
                  {selectedSheetData.headers.length} columnas
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-3">
                <p className="mb-3 text-sm font-medium text-slate-300">Encabezados</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSheetData.headers.map((header) => (
                    <span key={header} className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                      {header}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-3">
                <p className="mb-3 text-sm font-medium text-slate-300">Vista previa (primeras 10 filas)</p>
                <ExcelPreviewTable headers={selectedSheetData.headers} rows={selectedSheetData.rows} />
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
