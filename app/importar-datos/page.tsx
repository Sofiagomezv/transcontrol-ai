import { AppShell } from "@/components/layout/AppShell";
import { UploadExcel } from "@/components/ui/UploadExcel";

export default function ImportarDatosPage() {
  return (
    <AppShell
      title="Importar datos"
      description="Carga tus archivos Excel para preparar la fuente principal de información."
    >
      <div className="mx-auto max-w-3xl">
        <UploadExcel />
      </div>
    </AppShell>
  );
}
