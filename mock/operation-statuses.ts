import type { OperationStatusDefinition } from "@/types/operation-statuses";

export const mockOperationStatuses: OperationStatusDefinition[] = [
  { id: "OS-001", name: "Programado", color: "bg-sky-500/15 text-sky-400", description: "Viaje pendiente por iniciar" },
  { id: "OS-002", name: "En curso", color: "bg-amber-500/15 text-amber-400", description: "Ruta activa en ejecución" },
  { id: "OS-003", name: "Completado", color: "bg-emerald-500/15 text-emerald-400", description: "Viaje finalizado exitosamente" },
  { id: "OS-004", name: "Cancelado", color: "bg-rose-500/15 text-rose-400", description: "Viaje suspendido o cancelado" },
];
