import { AppShell } from "@/components/layout/AppShell";
import { DomainSection } from "@/components/settings/DomainSection";
import { getCompanyProfile } from "@/lib/company-service";
import { getExpenseTypeDefinitions } from "@/lib/expense-type-service";
import { getOperationStatusDefinitions } from "@/lib/operation-status-service";
import { getRouteDefinitions } from "@/lib/route-service";
import { getVehicleTypeDefinitions } from "@/lib/vehicle-type-service";

export default function ConfiguracionPage() {
  const company = getCompanyProfile();
  const vehicleTypes = getVehicleTypeDefinitions();
  const expenseTypes = getExpenseTypeDefinitions();
  const routes = getRouteDefinitions();
  const statuses = getOperationStatusDefinitions();

  return (
    <AppShell
      title="Configuración del dominio"
      description="Base funcional para empresa, tipos operativos y rutas del sistema."
    >
      <div className="space-y-6">
        <DomainSection
          title="Empresa"
          description="Información básica de la organización"
          items={[
            { id: company.id, name: company.name, meta: company.nit, detail: company.address },
            { id: "contact", name: company.email, meta: company.phone, detail: "Contacto principal" },
          ]}
        />

        <DomainSection
          title="Tipos de vehículo"
          description="Catálogo base de vehículos"
          items={vehicleTypes.map((item) => ({ id: item.id, name: item.name, detail: item.description }))}
        />

        <DomainSection
          title="Tipos de gasto"
          description="Clasificación de gastos operativos"
          items={expenseTypes.map((item) => ({ id: item.id, name: item.name, meta: item.category }))}
        />

        <DomainSection
          title="Rutas"
          description="Rutas base para la operación"
          items={routes.map((item) => ({ id: item.id, name: item.name, meta: `${item.distanceKm} km`, detail: `${item.origin} → ${item.destination}` }))}
        />

        <DomainSection
          title="Estados de operación"
          description="Estados del ciclo operativo de los viajes"
          items={statuses.map((item) => ({ id: item.id, name: item.name, detail: item.description, meta: item.color }))}
        />
      </div>
    </AppShell>
  );
}
