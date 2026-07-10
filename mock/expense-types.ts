import type { ExpenseTypeDefinition } from "@/types/expense-types";

export const mockExpenseTypes: ExpenseTypeDefinition[] = [
  { id: "ET-001", name: "Combustible", category: "Operativo" },
  { id: "ET-002", name: "Mantenimiento", category: "Operativo" },
  { id: "ET-003", name: "Peajes", category: "Logística" },
  { id: "ET-004", name: "Viáticos", category: "Personal" },
];
